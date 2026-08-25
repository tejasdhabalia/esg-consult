"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

type UseCase = "scoring" | "personalisation" | "content" | "analytics" | "none";

interface AIData {
  hasCleanData: boolean;
  hasUnifiedProfile: boolean;
  hasBehaviouralData: boolean;
  hasHistoricalData: boolean;
  hasAPIAccess: boolean;
  hasCRMMAP: boolean;
  hasConsent: boolean;
  hasDataGovernance: boolean;
  hasDataSkills: boolean;
  hasAIPolicy: boolean;
  hasChangeProcess: boolean;
  hasOwner: boolean;
  primaryUseCase: UseCase;
}

const DEFAULT: AIData = {
  hasCleanData: false, hasUnifiedProfile: false, hasBehaviouralData: false, hasHistoricalData: false,
  hasAPIAccess: false, hasCRMMAP: false, hasConsent: false, hasDataGovernance: false,
  hasDataSkills: false, hasAIPolicy: false, hasChangeProcess: false, hasOwner: false,
  primaryUseCase: "none",
};

function computeScores(d: AIData) {
  const dataScore  = Math.round(([d.hasCleanData, d.hasUnifiedProfile, d.hasBehaviouralData, d.hasHistoricalData].filter(Boolean).length / 4) * 100);
  const intScore   = Math.round(([d.hasAPIAccess, d.hasCRMMAP, d.hasConsent, d.hasDataGovernance].filter(Boolean).length / 4) * 100);
  const teamScore  = Math.round(([d.hasDataSkills, d.hasAIPolicy, d.hasChangeProcess, d.hasOwner].filter(Boolean).length / 4) * 100);
  const overall    = Math.round(dataScore * 0.45 + intScore * 0.35 + teamScore * 0.2);
  const level      = (overall >= 75 ? "Ready to scale" : overall >= 50 ? "Ready to pilot" : overall >= 25 ? "Foundation building" : "Not ready") as "Not ready" | "Foundation building" | "Ready to pilot" | "Ready to scale";

  const blockers: string[] = [];
  if (!d.hasCleanData)       blockers.push("Data quality is the primary blocker. AI trained on dirty data produces unreliable outputs in marketing: wrong segments, wrong scores, wrong sends.");
  if (!d.hasUnifiedProfile)  blockers.push("No unified contact profile means AI cannot see the full customer picture. Personalisation based on partial data performs worse than rule-based segmentation.");
  if (!d.hasConsent)         blockers.push("Consent framework is incomplete. Using personal data for AI personalisation without auditable consent records creates regulatory exposure.");
  if (!d.hasDataGovernance)  blockers.push("No data governance means AI outputs cannot be explained, audited or challenged. This is a compliance risk in regulated industries.");
  if (!d.hasAPIAccess)       blockers.push("Without API access to your marketing stack, AI tools cannot read or write data programmatically. Integration is a prerequisite, not an optional extra.");

  const useCases = [
    { useCase: "AI-driven lead scoring", ready: d.hasCleanData && d.hasHistoricalData && d.hasCRMMAP, gap: !d.hasCleanData ? "Requires clean, structured contact data as a minimum." : !d.hasHistoricalData ? "Requires at least 6 months of conversion history." : "Requires CRM and MAP integration to operationalise scores." },
    { useCase: "Personalisation at scale", ready: d.hasUnifiedProfile && d.hasBehaviouralData && d.hasConsent, gap: !d.hasUnifiedProfile ? "Requires a unified contact profile across all channels." : !d.hasBehaviouralData ? "Requires behavioural data (web, email, product) for personalisation signals." : "Requires auditable consent to use personal data for personalisation." },
    { useCase: "Predictive campaign analytics", ready: d.hasHistoricalData && d.hasAPIAccess && d.hasCleanData, gap: !d.hasHistoricalData ? "Requires historical campaign performance data across at least 4 quarters." : !d.hasAPIAccess ? "Requires API access to pull campaign data programmatically." : "Requires clean, consistent data for predictive models." },
    { useCase: "AI content generation (governed)", ready: d.hasAIPolicy && d.hasChangeProcess && d.hasOwner, gap: !d.hasAIPolicy ? "Requires a documented AI usage policy covering brand voice and approval workflow." : !d.hasChangeProcess ? "Requires a content change control process." : "Requires a named owner accountable for AI content quality." },
  ];

  const nextSteps: string[] = [];
  if (level === "Not ready") {
    nextSteps.push("Audit your contact database first. AI readiness starts with data quality, not tool selection. Fix duplicates, standardise field formats, validate deliverability.");
    nextSteps.push("Build a unified contact record. Before any AI can personalise at scale, it needs a single view of each contact across all channels and systems.");
    nextSteps.push("Review your consent framework with legal. Any AI personalisation using personal data requires auditable consent that survives a regulatory query.");
  } else if (level === "Foundation building") {
    nextSteps.push("Enable API access to your CRM and MAP. Without programmatic read and write access, AI tools cannot operationalise their outputs into existing workflows.");
    nextSteps.push("Draft an AI usage policy for marketing. Define approved use cases, who approves AI-generated content, and how outputs are quality-checked.");
    nextSteps.push("Start collecting behavioural data systematically. Web behaviour, email engagement, and in-product activity are the signals that make AI personalisation better than rule-based segmentation.");
  } else if (level === "Ready to pilot") {
    nextSteps.push("Run a lead scoring pilot on a defined segment. Use historical conversion data, compare it against existing qualification criteria for 90 days, document the delta.");
    nextSteps.push("Assign a named AI owner. Someone needs accountability for model performance, data quality inputs, and the change control process as you expand AI coverage.");
    nextSteps.push("Document your first AI use case end-to-end: the data inputs, the model logic, the output action, and how results are measured. This becomes your governance template.");
  } else {
    nextSteps.push("Move from single-model to multi-model orchestration. Combine lead scoring, personalisation and content optimisation into a governed AI workflow with a shared data layer.");
    nextSteps.push("Build a model monitoring process. Track model drift quarterly and retrain on fresh conversion data. AI models degrade when their training data goes stale.");
    nextSteps.push("Extend AI governance to partner and agency workflows. If external teams create content or run campaigns, your AI policy must cover their work as well as your own.");
  }

  return { dataScore, intScore, teamScore, overall, level, blockers: blockers.slice(0, 3), useCases, nextSteps };
}

const LEVEL_CFG = {
  "Not ready":           { color: "text-red-600",     bg: "bg-red-50 border-red-200",         icon: "⛔", desc: "Critical data and governance foundations are missing. AI tools deployed now will produce unreliable outputs and create compliance risk." },
  "Foundation building": { color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     icon: "🔧", desc: "The building blocks are partially in place. Focus on data quality and integration before selecting AI tools." },
  "Ready to pilot":      { color: "text-blue-600",    bg: "bg-blue-50 border-blue-200",       icon: "🚀", desc: "Your stack can support a controlled AI pilot. Start with one use case, measure rigorously, and build governance before expanding." },
  "Ready to scale":      { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: "✅", desc: "You have the data, integration and governance foundations to scale AI across marketing workflows." },
};

export default function AIReadinessTool() {
  const [data, setData] = useState<AIData>(DEFAULT);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  const siteKey  = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action   = "ai_readiness_report";
  const emailVal = validateBusinessEmail(email);
  const s        = computeScores(data);
  const lCfg     = LEVEL_CFG[s.level];

  const set = <K extends keyof AIData>(key: K, val: AIData[K]) => setData((d) => ({ ...d, [key]: val }));

  async function sendReport() {
    setEmailError("");
    if (!emailVal.ok) { setEmailStatus("error"); setEmailError(emailVal.message); return; }
    setEmailStatus("sending");
    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      const res = await fetch("/api/lead-capture", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ formType: "ai_readiness_report", email: emailVal.normalizedEmail, captchaToken, captchaAction: action }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) { setEmailStatus("error"); setEmailError(json?.error || "Failed to send. Please try again."); return; }
      setEmailSent(true); setEmailStatus("idle");
    } catch (err: unknown) { setEmailStatus("error"); setEmailError(err instanceof Error ? err.message : "Failed to send. Please try again."); }
  }

  const chk = (checked: boolean) => `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${checked ? "bg-violet-50 border-violet-300" : "bg-white border-slate-200 hover:border-slate-300"}`;

  return (
    <>
      {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />}
      <div id="ai-readiness" className="scroll-mt-8">
        {!showResults && (
          <div className="flex items-center gap-2 mb-6">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${step >= n ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-400"}`}>{n}</div>
                {n < 3 && <div className={`h-0.5 flex-1 transition-colors ${step > n ? "bg-violet-600" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        )}

        {!showResults && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Data quality</h3>
                <p className="text-slate-500 text-sm mb-5">AI is bounded by the quality of the data it processes. These four items determine whether your data can support reliable AI outputs.</p>
                <div className="space-y-3">
                  {([
                    { key: "hasCleanData",       label: "Our contact database is actively maintained: deduplication runs regularly, field formats are standardised, and bounce rates are below 2%." },
                    { key: "hasUnifiedProfile",  label: "Every contact has a single unified record consolidating activity from all channels including email, web, CRM and offline sources." },
                    { key: "hasBehaviouralData", label: "We capture and store behavioural data: website visits, email engagement, product activity, and event attendance at the contact level." },
                    { key: "hasHistoricalData",  label: "We have at least 12 months of structured campaign performance and conversion data stored in a queryable system." },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className={chk(data[key])}>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="mt-0.5 accent-violet-600 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 bg-violet-50 border border-violet-200 rounded-xl p-4">
                  <p className="text-xs text-violet-800"><strong>The single biggest AI failure point:</strong> organisations deploy AI tools on top of dirty or fragmented data. The AI produces confident outputs that are wrong. In marketing, that means segments that do not convert and scores that do not predict.</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Stack integration</h3>
                <p className="text-slate-500 text-sm mb-5">AI tools need programmatic access to your systems to read data and write outputs back into your workflows.</p>
                <div className="space-y-3">
                  {([
                    { key: "hasAPIAccess",      label: "Our CRM and MAP both have API access enabled with the permissions required for read and write operations.", icon: "🔌" },
                    { key: "hasCRMMAP",         label: "CRM and MAP are bidirectionally integrated with a validated data sync, not a one-way push with known gaps.", icon: "🔗" },
                    { key: "hasConsent",        label: "Consent records are captured at source, stored at the contact level, and auditable for GDPR and equivalent frameworks.", icon: "✅" },
                    { key: "hasDataGovernance", label: "A data governance framework is in place: field ownership is defined, change control exists, and data lineage can be traced.", icon: "🛡️" },
                  ] as const).map(({ key, label, icon }) => (
                    <label key={key} className={chk(data[key])}>
                      <span className="text-xl flex-shrink-0">{icon}</span>
                      <span className="text-sm text-slate-700 flex-1">{label}</span>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="accent-violet-600 w-4 h-4 flex-shrink-0" />
                    </label>
                  ))}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs text-amber-800"><strong>Regulated industry note:</strong> In financial services, healthcare and other regulated sectors, AI-driven marketing decisions must be explainable and auditable. Data governance is a compliance prerequisite for AI deployment, not a nice-to-have.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Team and governance</h3>
                <p className="text-slate-500 text-sm mb-5">Technology without accountable ownership and governance produces compounding risk as AI scope expands.</p>
                <div className="space-y-3 mb-6">
                  {([
                    { key: "hasDataSkills",    label: "At least one person in the marketing team can interpret model outputs, validate data quality, and identify when an AI result is wrong." },
                    { key: "hasAIPolicy",      label: "A documented AI usage policy covers what AI can be used for in marketing, who approves AI-generated content, and how model decisions are reviewed." },
                    { key: "hasChangeProcess", label: "A change control process exists for AI and automation: proposed changes are logged, reviewed and deployed through a structured approval." },
                    { key: "hasOwner",         label: "There is a named owner accountable for AI performance, data quality inputs, model monitoring, and compliance." },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className={chk(data[key])}>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="mt-0.5 accent-violet-600 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">What is your primary AI use case for marketing?</p>
                  <div className="space-y-2">
                    {([
                      { val: "scoring",         label: "AI-driven lead scoring and propensity modelling" },
                      { val: "personalisation", label: "Personalisation at scale across email, web and in-product" },
                      { val: "content",         label: "AI-assisted content generation and optimisation" },
                      { val: "analytics",       label: "Predictive campaign analytics and budget allocation" },
                      { val: "none",            label: "We are still evaluating what AI could do for us" },
                    ] as const).map(({ val, label }) => (
                      <label key={val} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${data.primaryUseCase === val ? "bg-violet-50 border-violet-300" : "bg-white border-slate-200 hover:border-slate-300"}`}>
                        <input type="radio" name="useCase" value={val} checked={data.primaryUseCase === val} onChange={() => set("primaryUseCase", val)} className="accent-violet-600 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 ? <button onClick={() => setStep((n) => (n - 1) as 1|2|3)} className="px-5 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">Back</button> : <div />}
              {step < 3
                ? <button onClick={() => setStep((n) => (n + 1) as 1|2|3)} className="px-6 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg">Next section</button>
                : <button onClick={() => setShowResults(true)} className="px-6 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg">See my AI readiness score</button>}
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-5">
            <div className={`rounded-2xl border p-6 text-center ${lCfg.bg}`}>
              <div className="text-4xl mb-2">{lCfg.icon}</div>
              <div className="text-5xl font-black mb-1">
                <span className={lCfg.color}>{s.overall}</span>
                <span className="text-slate-400 text-xl">/100</span>
              </div>
              <div className={`text-lg font-bold mb-2 ${lCfg.color}`}>{s.level}</div>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">{lCfg.desc}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900">Readiness by dimension</h3>
              {[
                { label: "Data quality (45% weight)", score: s.dataScore },
                { label: "Stack integration (35% weight)", score: s.intScore },
                { label: "Team and governance (20% weight)", score: s.teamScore },
              ].map(({ label, score }) => {
                const color = score >= 75 ? "#7c3aed" : score >= 50 ? "#D97706" : "#EF4444";
                return (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{label}</span>
                      <span className="font-bold" style={{ color }}>{score}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-slate-400">Data quality has the highest weight because AI output quality is bounded by input data quality.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Use case readiness</h3>
              <div className="space-y-3">
                {s.useCases.map(({ useCase, ready, gap }) => (
                  <div key={useCase} className={`p-4 rounded-xl border ${ready ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{ready ? "✅" : "⚠️"}</span>
                      <span className={`text-sm font-semibold ${ready ? "text-emerald-800" : "text-slate-700"}`}>{useCase}</span>
                    </div>
                    {!ready && <p className="text-xs text-slate-500 ml-6">{gap}</p>}
                  </div>
                ))}
              </div>
            </div>

            {s.blockers.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-3">Critical blockers to address first</h3>
                <ul className="space-y-2">
                  {s.blockers.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm text-red-900">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-200 text-red-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">Recommended next steps</h3>
              <ol className="space-y-3">
                {s.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-violet-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1">Get the full AI readiness report</h3>
              <p className="text-violet-200 text-sm mb-4">Full PDF with dimension scores, use-case readiness breakdown, critical blockers, and a sequenced implementation roadmap including IBM watsonx.governance coverage for regulated-sector requirements.</p>
              {emailSent ? (
                <p className="font-semibold text-center py-2">Report on its way. Check your inbox.</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label htmlFor="ai-email" className="sr-only">Work email</label>
                    <input id="ai-email" type="email" name="email" autoComplete="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white" />
                    <button onClick={sendReport} disabled={!siteKey || !emailVal.ok || emailStatus === "sending"}
                      className="bg-white text-violet-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-violet-50 whitespace-nowrap disabled:opacity-50">
                      {emailStatus === "sending" ? "Sending..." : "Send report"}
                    </button>
                  </div>
                  {email && !emailVal.ok && <p className="text-sm text-violet-200">{emailVal.message}</p>}
                  {emailStatus === "error" && emailError && <p className="text-sm text-violet-200">{emailError}</p>}
                  <p className="text-xs text-violet-300">{!siteKey ? "reCAPTCHA not configured." : "Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply."}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { setShowResults(false); setStep(1); setData(DEFAULT); setEmail(""); setEmailSent(false); setEmailStatus("idle"); setEmailError(""); }}
                className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50">Start over</button>
              <Link href="/contact" className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-3 rounded-xl text-center">Talk to us about AI marketing</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
