"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import Script from "next/script";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { trackGenerateLead } from "@/lib/analytics";
import {
  CURRENCIES,
  CURRENCY_LABELS,
  ESTIMATE_LIMITS,
  ESTIMATE_LIMITS_HEADING,
  NEXT_STEPS,
  DEFAULT_INPUTS,
  DEFAULT_QUICK_INPUTS,
  DEPARTMENTS,
  REST_VALUE_OPTIONS,
  computeAiRoi,
  computeQuickRoi,
  resultRows,
  sanitiseInputs,
  sanitiseQuickInputs,
  type AiRoiInputs,
  type AiRoiResult,
  type Currency,
  type QuickInputs,
  type RoiMode,
} from "@/lib/ai-roi";

/*
  Lead-gated calculator, agreed with Tejas 30 October 2026:
  1. Name, work email and company first (lead form type "ai_roi_access").
     Personal email domains are refused, by the same check as every form.
  2. Then the calculator. Results show on screen and are emailed to the
     work address (form type "ai_roi_report"). The server recomputes the
     results from the inputs; the browser never sends numbers to email.
  generate_lead fires once, on the gate, so a person is one lead in GA4.

  Two calculators, added 31 October 2026: after the gate the visitor says
  what numbers they have. "Team and spend figures" opens the quick estimate
  (people, cost, share of time, hiring and outside spend). "Task-level
  numbers" opens the detailed calculator (volumes, minutes, error rates).
*/

type FieldKind = "money" | "percent" | "number" | "text";
type Field = { key: keyof AiRoiInputs; label: string; hint: string; kind: FieldKind };

const GROUPS: { title: string; fields: Field[] }[] = [
  {
    title: "The use case",
    fields: [
      { key: "useCase", label: "Use case", hint: "A short name, matching your AI use case register.", kind: "text" },
      { key: "process", label: "Process it changes", hint: "The business process, not the tool.", kind: "text" },
    ],
  },
  {
    title: "The baseline, before AI",
    fields: [
      { key: "tasksPerMonth", label: "Tasks per month", hint: "How often the task happens, from records.", kind: "number" },
      { key: "minutesBefore", label: "Minutes per task", hint: "Measured average handling time today.", kind: "number" },
      { key: "errorRateBefore", label: "Error rate (%)", hint: "Share of tasks with an error to fix.", kind: "percent" },
      { key: "costPerError", label: "Cost to fix one error", hint: "Rework, refunds or write-offs.", kind: "money" },
      { key: "hourlyCost", label: "People cost per hour", hint: "Salary plus on-costs.", kind: "money" },
    ],
  },
  {
    title: "With AI",
    fields: [
      { key: "plannedAdoption", label: "Planned adoption (%)", hint: "Share of tasks the AI will handle in normal use.", kind: "percent" },
      { key: "minutesWithAi", label: "Minutes per task with AI", hint: "Including any checking by the handler.", kind: "number" },
      { key: "errorRateWithAi", label: "Error rate with AI (%)", hint: "Share of AI-handled tasks with an error.", kind: "percent" },
      { key: "revenueLift", label: "Revenue lift per month", hint: "Only if you can show it. Leave at zero otherwise.", kind: "money" },
    ],
  },
  {
    title: "How sure are you of each kind of value?",
    fields: [
      { key: "confTime", label: "Time released (%)", hint: "Lower it if the hours will not go anywhere.", kind: "percent" },
      { key: "confErrors", label: "Errors avoided (%)", hint: "Higher if error rates come from records.", kind: "percent" },
      { key: "confRevenue", label: "Revenue lift (%)", hint: "Usually the least certain.", kind: "percent" },
    ],
  },
  {
    title: "One-off costs",
    fields: [
      { key: "oneOffData", label: "Data preparation", hint: "Often the largest cost.", kind: "money" },
      { key: "oneOffIntegration", label: "Integration", hint: "Into the systems people already use.", kind: "money" },
      { key: "oneOffChange", label: "Change management", hint: "Training and new procedures.", kind: "money" },
    ],
  },
  {
    title: "Recurring costs per month",
    fields: [
      { key: "licences", label: "Licences (fixed)", hint: "Seats or platform fees.", kind: "money" },
      { key: "usagePerTask", label: "Usage cost per AI-handled task", hint: "Per call or per token, averaged.", kind: "money" },
      { key: "reviewShare", label: "Share of output reviewed (%)", hint: "Never zero for anything that matters.", kind: "percent" },
      { key: "reviewMinutes", label: "Minutes per review", hint: "Time to check one output.", kind: "number" },
      { key: "governance", label: "Governance", hint: "Register upkeep and monitoring.", kind: "money" },
    ],
  },
];

type FormValues = Record<keyof AiRoiInputs, string>;

function toForm(i: AiRoiInputs): FormValues {
  const out = {} as FormValues;
  for (const group of GROUPS) {
    for (const f of group.fields) {
      const v = i[f.key];
      out[f.key] = f.kind === "percent" ? String(Math.round((v as number) * 1000) / 10) : String(v);
    }
  }
  out.currency = i.currency;
  return out;
}

function fromForm(v: FormValues): AiRoiInputs {
  const raw: Record<string, unknown> = { currency: v.currency };
  for (const group of GROUPS) {
    for (const f of group.fields) {
      const s = v[f.key];
      raw[f.key] = f.kind === "text" ? s : f.kind === "percent" ? Number(s) / 100 : Number(s);
    }
  }
  return sanitiseInputs(raw);
}

const MODE_CHOICES: { mode: RoiMode; title: string; text: string }[] = [
  {
    mode: "quick",
    title: "Team and spend figures",
    text: "You know how many people do this work, what they cost and what you spend outside the team. Takes about two minutes.",
  },
  {
    mode: "detailed",
    title: "Task-level numbers",
    text: "You know how often the task happens, how long it takes and how often it goes wrong. Usually from a process or quality team.",
  },
];

type QuickField = {
  key: keyof QuickInputs;
  label: string;
  hint: string;
  kind: FieldKind | "select" | "slider";
  options?: { value: string | number; label: string }[];
  max?: number; // sliders, in percent
};

const QUICK_GROUPS: { title: string; fields: QuickField[] }[] = [
  {
    title: "The use case",
    fields: [
      {
        key: "department",
        label: "Department",
        hint: "Where the work happens today.",
        kind: "select",
        options: DEPARTMENTS.map((d) => ({ value: d.id, label: d.label })),
      },
      { key: "useCase", label: "Use case", hint: "Pick a suggestion or type your own.", kind: "text" },
    ],
  },
  {
    title: "The team doing this work today",
    fields: [
      { key: "teamSize", label: "People doing this work", hint: "Count everyone who does it, even for part of their week.", kind: "number" },
      { key: "costPerPerson", label: "Cost per person per month", hint: "Salary plus on-costs, from payroll.", kind: "money" },
      { key: "shareOfTime", label: "Share of their week on this work", hint: "A rough answer is fine.", kind: "slider", max: 100 },
    ],
  },
  {
    title: "With AI",
    fields: [
      { key: "aiEffect", label: "Time the AI saves on this work", hint: "Your assumption, not a benchmark. Net of time spent checking its output.", kind: "slider", max: 80 },
      { key: "plannedAdoption", label: "Share of the team using it", hint: "Who you expect to use it in normal work.", kind: "slider", max: 100 },
    ],
  },
  {
    title: "Where the value shows up",
    fields: [
      { key: "hiresNeeded", label: "Extra people needed without AI", hint: "For this work in the next 12 months. Use 0.5 for part-time or overtime, 0 if none.", kind: "number" },
      { key: "restValue", label: "The rest of the time freed", hint: "Time freed beyond those hires only counts if it goes somewhere.", kind: "select", options: REST_VALUE_OPTIONS },
      { key: "outsideSpend", label: "Spend outside the team per month", hint: "", kind: "money" },
      { key: "outsideReplace", label: "Share of that spend replaced", hint: "What the AI could take over. 0% if none.", kind: "slider", max: 100 },
    ],
  },
  {
    title: "Costs",
    fields: [
      { key: "oneOff", label: "One-off cost", hint: "Setup, integration, data preparation and training.", kind: "money" },
      { key: "licences", label: "Licences per month", hint: "Seats or platform fees.", kind: "money" },
      { key: "otherRunning", label: "Other running costs per month", hint: "Usage fees, monitoring and upkeep.", kind: "money" },
    ],
  },
];

type QuickFormValues = Record<keyof QuickInputs, string>;

function toQuickForm(i: QuickInputs): QuickFormValues {
  const out = {} as QuickFormValues;
  for (const group of QUICK_GROUPS) {
    for (const f of group.fields) {
      const v = i[f.key];
      out[f.key] =
        f.kind === "percent" || f.kind === "slider" ? String(Math.round((v as number) * 100)) : String(v);
    }
  }
  out.currency = i.currency;
  return out;
}

function fromQuickForm(v: QuickFormValues): QuickInputs {
  const raw: Record<string, unknown> = { currency: v.currency };
  for (const group of QUICK_GROUPS) {
    for (const f of group.fields) {
      const s = v[f.key];
      raw[f.key] =
        f.kind === "text" || f.key === "department"
          ? s
          : f.kind === "percent" || f.kind === "slider"
            ? Number(s) / 100
            : Number(s);
    }
  }
  return sanitiseQuickInputs(raw);
}

const ACCESS_KEY = "ds_ai_roi_access";

export default function AiRoiTool() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Gate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [unlocked, setUnlocked] = useState(false);
  const [gateStatus, setGateStatus] = useState<"idle" | "sending" | "error">("idle");
  const [gateError, setGateError] = useState("");

  // Calculator
  const [mode, setMode] = useState<RoiMode | null>(null);
  const [form, setForm] = useState<FormValues>(() => toForm(DEFAULT_INPUTS));
  const [quickForm, setQuickForm] = useState<QuickFormValues>(() => toQuickForm(DEFAULT_QUICK_INPUTS));
  const [result, setResult] = useState<AiRoiResult | null>(null);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_INPUTS.currency);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sendError, setSendError] = useState("");

  // Keep access for the rest of the browser session. Never required.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(ACCESS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { name?: string; email?: string };
        if (parsed.email) {
          setName(parsed.name || "");
          setEmail(parsed.email);
          setUnlocked(true);
        }
      }
    } catch {
      // Storage unavailable: the person fills the form again.
    }
  }, []);

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    setGateError("");
    if (!name.trim()) {
      setGateStatus("error");
      setGateError("Please enter your name.");
      return;
    }
    const check = validateBusinessEmail(email);
    if (!check.ok) {
      setGateStatus("error");
      setGateError(check.message);
      return;
    }
    setGateStatus("sending");
    try {
      const action = "ai_roi_access";
      const captchaToken = await getRecaptchaToken(siteKey, action);
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "ai_roi_access",
          name: name.trim(),
          email: check.normalizedEmail,
          company: company.trim(),
          website,
          captchaToken,
          captchaAction: action,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        setGateStatus("error");
        setGateError(json?.error || "Something went wrong. Please try again.");
        return;
      }
      setEmail(check.normalizedEmail);
      setUnlocked(true);
      setGateStatus("idle");
      trackGenerateLead("ai_roi_calculator", { resource_key: "ai_roi_calculator" });
      try {
        sessionStorage.setItem(ACCESS_KEY, JSON.stringify({ name: name.trim(), email: check.normalizedEmail }));
      } catch {
        // Not essential.
      }
    } catch (err: unknown) {
      setGateStatus("error");
      setGateError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  async function calculate(e: React.FormEvent) {
    e.preventDefault();
    const isQuick = mode === "quick";
    const inputs = isQuick ? fromQuickForm(quickForm) : fromForm(form);
    setCurrency(inputs.currency);
    setResult(isQuick ? computeQuickRoi(inputs as QuickInputs) : computeAiRoi(inputs as AiRoiInputs));
    setSendStatus("sending");
    setSendError("");
    try {
      const action = "ai_roi_report";
      const captchaToken = await getRecaptchaToken(siteKey, action);
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "ai_roi_report",
          name,
          email,
          captchaToken,
          captchaAction: action,
          roiMode: isQuick ? "quick" : "detailed",
          roiInputs: inputs,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        setSendStatus("error");
        setSendError(json?.error || "Your results are below, but the email did not send.");
        return;
      }
      setSendStatus("sent");
    } catch (err: unknown) {
      setSendStatus("error");
      setSendError(err instanceof Error ? err.message : "Your results are below, but the email did not send.");
    }
    setTimeout(() => document.getElementById("roi-results")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none";

  return (
    <div id="calculator" className="scroll-mt-24">
      {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />}

      {!unlocked ? (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Open the calculator</h2>
          <p className="mt-2 text-slate-600 leading-relaxed">
            Tell us who you are and the calculator opens straight away. Your results are shown on
            screen and emailed to your work address.
          </p>
          <form onSubmit={submitGate} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input className={`${inputClass} mt-1`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Work email</span>
              <input
                className={`${inputClass} mt-1`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Company</span>
              <input className={`${inputClass} mt-1`} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
            </label>
            {/* Honeypot: hidden from people, filled by bots. */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={gateStatus === "sending"}
                className="rounded-lg bg-indigo-700 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
              >
                {gateStatus === "sending" ? "Opening..." : "Open the calculator"}
              </button>
              {gateStatus === "error" && <p className="mt-3 text-sm text-red-700">{gateError}</p>}
              <p className="mt-3 text-xs text-slate-500">
                A work email is needed, so personal addresses such as Gmail are not accepted. We use
                it to send your results and may follow up once. See our{" "}
                <Link href="/privacy" className="underline">privacy notice</Link>.{" "}
                {siteKey ? "Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply." : "reCAPTCHA not configured."}
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">What numbers do you have?</h2>
            <p className="mt-1 text-sm text-slate-600">
              Pick the one closer to what you know. You can switch at any time.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {MODE_CHOICES.map((m) => (
                <button
                  key={m.mode}
                  type="button"
                  aria-pressed={mode === m.mode}
                  onClick={() => {
                    setMode(m.mode);
                    setResult(null);
                    setSendStatus("idle");
                  }}
                  className={`rounded-2xl border p-5 text-left transition ${
                    mode === m.mode
                      ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <span className="block text-base font-semibold text-slate-900">{m.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">{m.text}</span>
                </button>
              ))}
            </div>
          </div>

          {mode && (
            <form onSubmit={calculate} className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Your use case</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Filled with an illustrative example. Replace every value with your own.
                  </p>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Currency</span>
                  <select
                    className={`${inputClass} mt-1 w-36`}
                    value={mode === "quick" ? quickForm.currency : form.currency}
                    onChange={(e) =>
                      mode === "quick"
                        ? setQuickForm({ ...quickForm, currency: e.target.value })
                        : setForm({ ...form, currency: e.target.value })
                    }
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                    ))}
                  </select>
                </label>
              </div>

              {mode === "quick"
                ? QUICK_GROUPS.map((group) => (
                    <fieldset key={group.title} className="rounded-2xl border border-slate-200 p-6">
                      <legend className="px-2 text-sm font-semibold text-slate-900">{group.title}</legend>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {group.fields.map((f) => {
                          const dept = DEPARTMENTS.find((d) => d.id === quickForm.department);
                          const hint =
                            f.key === "outsideSpend"
                              ? `On ${dept?.outside ?? "contractors, agencies or temps"} for this work. 0 if none.`
                              : f.hint;
                          return (
                            <label key={f.key} className="block">
                              <span className="flex items-baseline justify-between gap-3 text-sm font-medium text-slate-700">
                                <span>
                                  {f.label}
                                  {f.kind === "money" ? ` (${quickForm.currency})` : ""}
                                </span>
                                {f.kind === "slider" && (
                                  <span className="text-base font-semibold text-indigo-700">{quickForm[f.key]}%</span>
                                )}
                              </span>
                              {f.kind === "slider" ? (
                                <input
                                  className="mt-3 w-full accent-indigo-600"
                                  type="range"
                                  min={0}
                                  max={f.max ?? 100}
                                  step={5}
                                  value={quickForm[f.key]}
                                  aria-valuetext={`${quickForm[f.key]}%`}
                                  onChange={(e) => setQuickForm({ ...quickForm, [f.key]: e.target.value })}
                                />
                              ) : f.kind === "select" ? (
                                <select
                                  className={`${inputClass} mt-1`}
                                  value={quickForm[f.key]}
                                  onChange={(e) => setQuickForm({ ...quickForm, [f.key]: e.target.value })}
                                >
                                  {f.options?.map((o) => (
                                    <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  className={`${inputClass} mt-1`}
                                  type={f.kind === "text" ? "text" : "number"}
                                  inputMode={f.kind === "text" ? undefined : "decimal"}
                                  min={f.kind === "text" ? undefined : 0}
                                  max={f.kind === "percent" ? 100 : undefined}
                                  step="any"
                                  list={f.key === "useCase" ? "roi-use-cases" : undefined}
                                  value={quickForm[f.key]}
                                  onChange={(e) => setQuickForm({ ...quickForm, [f.key]: e.target.value })}
                                />
                              )}
                              {f.key === "useCase" && (
                                <datalist id="roi-use-cases">
                                  {dept?.useCases.map((u) => <option key={u} value={u} />)}
                                </datalist>
                              )}
                              <span className="mt-1 block text-xs text-slate-500">{hint}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))
                : null}

              {mode === "detailed" && (
                <>
              {GROUPS.map((group) => (
                <fieldset key={group.title} className="rounded-2xl border border-slate-200 p-6">
                  <legend className="px-2 text-sm font-semibold text-slate-900">{group.title}</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {group.fields.map((f) => (
                      <label key={f.key} className="block">
                        <span className="text-sm font-medium text-slate-700">
                          {f.label}
                          {f.kind === "money" ? ` (${form.currency})` : ""}
                        </span>
                        <input
                          className={`${inputClass} mt-1`}
                          type={f.kind === "text" ? "text" : "number"}
                          inputMode={f.kind === "text" ? undefined : "decimal"}
                          min={f.kind === "text" ? undefined : 0}
                          max={f.kind === "percent" ? 100 : undefined}
                          step="any"
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        />
                        <span className="mt-1 block text-xs text-slate-500">{f.hint}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}

                </>
              )}

              <button
                type="submit"
                disabled={sendStatus === "sending"}
                className="rounded-lg bg-indigo-700 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
              >
                {sendStatus === "sending" ? "Calculating..." : "Calculate and email my results"}
              </button>
            </form>
          )}
        </div>
      )}

      {unlocked && result && (
        <section id="roi-results" className="mt-12 scroll-mt-24">
          <div className="rounded-2xl bg-slate-900 p-8 text-white">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-300">Recommendation</div>
            <div className="mt-2 text-3xl md:text-4xl font-bold">{result.decision}</div>
            <p className="mt-3 max-w-2xl text-slate-300 leading-relaxed">{result.decisionReason}</p>
            {sendStatus === "sent" && (
              <p className="mt-4 text-sm text-indigo-200">Your results have also been sent to {email}.</p>
            )}
            {sendStatus === "error" && <p className="mt-4 text-sm text-amber-300">{sendError}</p>}
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-3 pr-4 text-slate-500 font-medium">Per month, {currency}</th>
                  <th className="py-3 pr-4 text-slate-900 font-semibold">Planned adoption</th>
                  <th className="py-3 pr-4 text-slate-900 font-semibold">Half planned</th>
                  <th className="py-3 text-slate-900 font-semibold">1.5 times planned</th>
                </tr>
              </thead>
              <tbody>
                {resultRows(result, currency).map(({ label, get: fmt }) => (
                  <tr key={label} className="border-b border-slate-200">
                    <th scope="row" className="py-3 pr-4 font-medium text-slate-900">{label}</th>
                    <td className="py-3 pr-4 text-slate-900 font-semibold">{fmt(result.planned)}</td>
                    <td className="py-3 pr-4 text-slate-700">{fmt(result.half)}</td>
                    <td className="py-3 text-slate-700">{fmt(result.stretch)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            A management estimate, not financial advice. It is only as good as the baseline you put in.{" "}
            {result.mode === "quick"
              ? "Licences and running costs are treated as fixed; value scales with how many of the team use it."
              : "Licences and governance are treated as fixed; value, usage and review time scale with adoption."}
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">{NEXT_STEPS[result.decision].heading}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{NEXT_STEPS[result.decision].body}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">{ESTIMATE_LIMITS_HEADING}</h3>
            <ul className="mt-3 space-y-3">
              {ESTIMATE_LIMITS.map((l) => (
                <li key={l.title} className="text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{l.title}</strong> {l.text}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-slate-700">These are the questions a working session answers.</p>
            <Link
              href={site.headerCta.href}
              className="mt-4 inline-block rounded-lg bg-indigo-700 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-800"
            >
              {site.headerCta.label}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
