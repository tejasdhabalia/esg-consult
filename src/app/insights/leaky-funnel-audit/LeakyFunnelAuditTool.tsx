"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

// ─── Types ────────────────────────────────────────────────────────────────
interface AuditData {
  // Volume
  monthlyLeads: number;
  mqlRate: number;       // % of leads → MQL
  sqlRate: number;       // % of MQL → SQL
  wonRate: number;       // % of SQL → Won
  avgDealSize: number;   // £/$ average
  // Governance
  hasSingleMQLDef: boolean;
  hasRouting: boolean;
  hasChangeControl: boolean;
  hasDashboard: boolean;
  hasMetricDoc: boolean;
  hasCRMOwner: boolean;
  // Stack
  hasCRM: boolean;
  hasMAP: boolean;
  hasBI: boolean;
  hasFinanceLink: boolean;
}

interface Scores {
  revenueVisibility: number;    // 0–100
  leakageEstimate: number;      // £/month
  governanceScore: number;      // 0–100
  biggestGap: string;
  recommendations: string[];
}

const DEFAULT: AuditData = {
  monthlyLeads: 200,
  mqlRate: 25,
  sqlRate: 30,
  wonRate: 20,
  avgDealSize: 15000,
  hasSingleMQLDef: false,
  hasRouting: false,
  hasChangeControl: false,
  hasDashboard: false,
  hasMetricDoc: false,
  hasCRMOwner: false,
  hasCRM: true,
  hasMAP: false,
  hasBI: false,
  hasFinanceLink: false,
};

function computeScores(d: AuditData): Scores {
  const govItems = [d.hasSingleMQLDef, d.hasRouting, d.hasChangeControl, d.hasDashboard, d.hasMetricDoc, d.hasCRMOwner];
  const govScore = Math.round((govItems.filter(Boolean).length / 6) * 100);

  const stackItems = [d.hasCRM, d.hasMAP, d.hasBI, d.hasFinanceLink];
  const stackScore = Math.round((stackItems.filter(Boolean).length / 4) * 100);

  const funnelScore = Math.min(100, Math.round(
    (Math.min(d.mqlRate, 40) / 40) * 30 +
    (Math.min(d.sqlRate, 50) / 50) * 30 +
    (Math.min(d.wonRate, 35) / 35) * 40
  ));

  const revenueVisibility = Math.round(govScore * 0.5 + stackScore * 0.2 + funnelScore * 0.3);

  const wonDeals = (d.monthlyLeads * (d.mqlRate / 100) * (d.sqlRate / 100) * (d.wonRate / 100));
  const currentRevenue = wonDeals * d.avgDealSize;

  const govGaps = govItems.filter((b) => !b).length;
  const stackGaps = stackItems.filter((b) => !b).length;
  const leakagePct = Math.min(0.6, govGaps * 0.12 + stackGaps * 0.06);
  const leakageEstimate = Math.round(currentRevenue * leakagePct);

  const gaps: { label: string; score: number }[] = [
    { label: "CRM governance and data quality controls",        score: govScore },
    { label: "Tool stack coverage and integration depth",       score: stackScore },
    { label: "Funnel conversion rates relative to benchmark",   score: funnelScore },
  ];
  const biggestGap = gaps.sort((a, b) => a.score - b.score)[0].label;

  const recs: string[] = [];
  if (!d.hasSingleMQLDef) recs.push("Define and align on a single written MQL definition across marketing, sales and RevOps.");
  if (!d.hasRouting) recs.push("Implement automated routing rules with SLAs. Unrouted leads are invisible, they exist in the system but in nobody's accountability.");
  if (!d.hasChangeControl) recs.push("Establish a CRM change control register. Undocumented changes are the leading cause of reporting drift.");
  if (!d.hasMetricDoc) recs.push("Publish a single metric definition document that all revenue stakeholders sign off on.");
  if (!d.hasDashboard) recs.push("Build a weekly stage health report showing velocity and SLA adherence. It must run automatically, not manually.");
  if (!d.hasFinanceLink) recs.push("Align CRM pipeline to your finance system with a monthly reconciliation cadence.");
  if (recs.length === 0) recs.push("Your governance foundations are in place. Focus on optimising conversion rates and expanding automation coverage.");

  return { revenueVisibility, leakageEstimate, governanceScore: govScore, biggestGap, recommendations: recs.slice(0, 4) };
}

function ScoreRing({ score, label, size = 96 }: { score: number; label: string; size?: number }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? "#059669" : score >= 45 ? "#D97706" : "#DC2626";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E8F0" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="text-center -mt-16 mb-8">
        <div className="text-2xl font-bold" style={{ color }}>{score}</div>
        <div className="text-xs text-slate-500 leading-tight max-w-[80px] text-center">{label}</div>
      </div>
    </div>
  );
}

export default function LeakyFunnelAuditTool() {
  const [data, setData] = useState<AuditData>(DEFAULT);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action = "audit_report_submit";
  const emailValidation = validateBusinessEmail(email);

  const scores = computeScores(data);

  const set = (key: keyof AuditData, value: number | boolean) =>
    setData((d) => ({ ...d, [key]: value }));

  const scoreLabel =
    scores.revenueVisibility >= 70 ? "Governed" :
    scores.revenueVisibility >= 45 ? "At risk" : "Leaking";

  const scoreColor =
    scores.revenueVisibility >= 70 ? "text-emerald-600" :
    scores.revenueVisibility >= 45 ? "text-amber-600" : "text-red-500";

  const scoreBg =
    scores.revenueVisibility >= 70 ? "bg-emerald-50 border-emerald-200" :
    scores.revenueVisibility >= 45 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  async function sendReport() {
    setEmailError("");

    if (!emailValidation.ok) {
      setEmailStatus("error");
      setEmailError(emailValidation.message);
      return;
    }

    setEmailStatus("sending");

    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "audit_report",
          email: emailValidation.normalizedEmail,
          captchaToken,
          captchaAction: action,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setEmailStatus("error");
        setEmailError(data?.error || "Failed to send report. Please try again.");
        return;
      }

      setEmailSent(true);
      setEmailStatus("idle");
    } catch (err: unknown) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : "Failed to send report. Please try again.");
    }
  }

  const rangeCls = "w-full accent-violet-600";

  const stackScorePreview = Math.min(100, Math.round(
    (data.hasCRM ? 25 : 0) + (data.hasMAP ? 25 : 0) + (data.hasBI ? 25 : 0) + (data.hasFinanceLink ? 25 : 0)
  ));

  return (
    <div id="leaky-funnel-audit" className="scroll-mt-8">
      {siteKey ? <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" /> : null}

      {!showResults && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {([1, 2, 3, 4] as const).map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  step >= s ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-400"
                }`}>{s}</div>
                {s < 4 && <div className={`h-0.5 flex-1 transition-colors ${step > s ? "bg-violet-600" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Funnel volumes */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Funnel volumes</h3>
              <p className="text-slate-500 text-sm mb-6">Tell us about your current lead flow and deal value.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly inbound leads (approximate)
                    <span className="ml-2 font-bold text-violet-600">{data.monthlyLeads.toLocaleString()}</span>
                  </label>
                  <input type="range" min={10} max={5000} step={10} value={data.monthlyLeads}
                    onChange={e => set("monthlyLeads", +e.target.value)} className={rangeCls} />
                  <div className="flex justify-between text-xs text-slate-400 mt-0.5"><span>10</span><span>5,000</span></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Lead to MQL conversion rate
                    <span className="ml-2 font-bold text-violet-600">{data.mqlRate}%</span>
                    <span className="ml-1 text-xs text-slate-400">(industry avg: 20-25%)</span>
                  </label>
                  <input type="range" min={1} max={80} step={1} value={data.mqlRate}
                    onChange={e => set("mqlRate", +e.target.value)} className={rangeCls} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    MQL to SQL conversion rate
                    <span className="ml-2 font-bold text-violet-600">{data.sqlRate}%</span>
                    <span className="ml-1 text-xs text-slate-400">(industry avg: 25-35%)</span>
                  </label>
                  <input type="range" min={1} max={80} step={1} value={data.sqlRate}
                    onChange={e => set("sqlRate", +e.target.value)} className={rangeCls} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    SQL to Won conversion rate
                    <span className="ml-2 font-bold text-violet-600">{data.wonRate}%</span>
                    <span className="ml-1 text-xs text-slate-400">(B2B avg: 15-25%)</span>
                  </label>
                  <input type="range" min={1} max={70} step={1} value={data.wonRate}
                    onChange={e => set("wonRate", +e.target.value)} className={rangeCls} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Average deal value
                    <span className="ml-2 font-bold text-violet-600">${data.avgDealSize.toLocaleString()}</span>
                  </label>
                  <input type="range" min={500} max={500000} step={500} value={data.avgDealSize}
                    onChange={e => set("avgDealSize", +e.target.value)} className={rangeCls} />
                  <div className="flex justify-between text-xs text-slate-400 mt-0.5"><span>$500</span><span>$500k</span></div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Monthly MQLs",   value: Math.round(data.monthlyLeads * data.mqlRate / 100) },
                  { label: "Monthly SQLs",   value: Math.round(data.monthlyLeads * data.mqlRate / 100 * data.sqlRate / 100) },
                  { label: "Monthly closes", value: Math.round(data.monthlyLeads * data.mqlRate / 100 * data.sqlRate / 100 * data.wonRate / 100) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xl font-bold text-violet-600">{value}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Governance */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Governance health</h3>
              <p className="text-slate-500 text-sm mb-6">Be honest. These items most directly affect revenue visibility.</p>

              <div className="space-y-4">
                {([
                  { key: "hasSingleMQLDef",  label: "We have a single, written MQL definition that marketing, sales and ops all agree on." },
                  { key: "hasRouting",       label: "Lead routing rules are automated and documented with SLAs." },
                  { key: "hasChangeControl", label: "All CRM and automation changes are logged in a change register before deployment." },
                  { key: "hasDashboard",     label: "A weekly pipeline health report runs automatically and goes to the revenue team." },
                  { key: "hasMetricDoc",     label: "A metric definition document exists for MQL, SQL, win rate and CAC, and all teams use the same version." },
                  { key: "hasCRMOwner",      label: "There is a named person accountable for CRM data quality and governance." },
                ] as const).map(({ key, label }) => (
                  <label key={key} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    data[key] ? "bg-violet-50 border-violet-300" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}>
                    <input
                      type="checkbox"
                      checked={data[key] as boolean}
                      onChange={e => set(key, e.target.checked)}
                      className="mt-0.5 accent-violet-600 w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm text-slate-700">{label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-slate-500">
                {govItems(data)} of 6 governance items confirmed
              </div>
            </div>
          )}

          {/* Step 3: Stack */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Tool stack</h3>
              <p className="text-slate-500 text-sm mb-6">Which tools are in active use and properly integrated?</p>

              <div className="space-y-3">
                {([
                  { key: "hasCRM",         label: "CRM (Salesforce, HubSpot, Dynamics or similar)" },
                  { key: "hasMAP",         label: "Marketing Automation Platform (Marketo, Pardot, Braze or similar)" },
                  { key: "hasBI",          label: "BI or reporting layer (Tableau, Looker, Power BI or similar)" },
                  { key: "hasFinanceLink", label: "CRM is linked to the finance system with a reconciliation process" },
                ] as const).map(({ key, label }) => (
                  <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    data[key] ? "bg-violet-50 border-violet-300" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}>
                    <input
                      type="checkbox"
                      checked={data[key] as boolean}
                      onChange={e => set(key, e.target.checked)}
                      className="accent-violet-600 w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm text-slate-700 flex-1">{label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-800">
                  <strong>Note:</strong> Stack coverage affects revenue visibility directly. A CRM without a MAP
                  creates attribution blind spots. A CRM without a finance link means your board pipeline number
                  and your CFO&apos;s revenue forecast will never fully reconcile.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Context */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Final context</h3>
              <p className="text-slate-500 text-sm mb-6">One last question to calibrate your results.</p>

              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">What is your primary challenge right now?</p>
                {[
                  "Our pipeline numbers are disputed in leadership meetings",
                  "We cannot attribute revenue reliably to marketing activities",
                  "Our CRM data quality is deteriorating faster than we can clean it",
                  "We are preparing for a new platform migration",
                  "We need to improve funnel conversion rates",
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-violet-300 cursor-pointer bg-white text-sm text-slate-700">
                    <input type="radio" name="challenge" className="mt-0.5 accent-violet-600 flex-shrink-0" />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button onClick={() => setStep((s) => (s - 1) as 1|2|3|4)}
                className="px-5 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button onClick={() => setStep((s) => (s + 1) as 1|2|3|4)}
                className="px-6 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg">
                Next →
              </button>
            ) : (
              <button onClick={() => setShowResults(true)}
                className="px-6 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg">
                Get my score →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="space-y-6">

          <div className={`rounded-2xl border p-8 text-center ${scoreBg}`}>
            <div className="text-5xl font-black mb-1">
              <span className={scoreColor}>{scores.revenueVisibility}</span>
              <span className="text-slate-400 text-2xl">/100</span>
            </div>
            <div className={`text-lg font-bold mb-2 ${scoreColor}`}>Revenue Visibility Score: {scoreLabel}</div>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              {scores.revenueVisibility >= 70
                ? "Your governance foundations are solid. Focus on optimising conversion rates and expanding automation depth."
                : scores.revenueVisibility >= 45
                ? "Visible governance gaps are costing you revenue. Prioritise the recommendations below."
                : "Your funnel has significant uncontrolled leakage. Every month without governance is compounding the cost."}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Score breakdown</h3>
            <div className="flex justify-around">
              <ScoreRing score={scores.revenueVisibility} label="Revenue Visibility" />
              <ScoreRing score={scores.governanceScore}   label="Governance" />
              <ScoreRing score={stackScorePreview}        label="Stack Coverage" />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-1">Estimated monthly revenue leakage</h3>
            <div className="text-3xl font-black text-red-600 mb-2">
              ${scores.leakageEstimate.toLocaleString()}<span className="text-lg text-red-400">/month</span>
            </div>
            <p className="text-sm text-slate-600">
              Based on your funnel volume, deal size and the governance and stack gaps identified.
              This represents revenue that is currently invisible, misdirected or lost to governance failures.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Your biggest gap</h3>
            <p className="text-amber-800 font-medium">{scores.biggestGap}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Top recommendations</h3>
            <ol className="space-y-4">
              {scores.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-violet-700 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-1">Get the full PDF report</h3>
            <p className="text-violet-200 text-sm mb-4">
              Receive a formatted PDF of your audit results, leakage estimate and a 30-day action plan.
              Includes the CRM Governance Checklist.
            </p>
            {emailSent ? (
              <div className="text-center py-2">
                <p className="font-semibold">Report on its way. Check your inbox.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <label htmlFor="audit-report-email" className="sr-only">Email address</label>
                  <input
                    id="audit-report-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    onClick={sendReport}
                    disabled={!siteKey || !emailValidation.ok || emailStatus === "sending"}
                    className="bg-white text-violet-700 font-semibold text-sm px-5 py-2 rounded-lg hover:bg-violet-50 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {emailStatus === "sending" ? "Sending..." : "Send report"}
                  </button>
                </div>
                {email && !emailValidation.ok ? (
                  <p className="text-sm text-violet-100">{emailValidation.message}</p>
                ) : null}
                {emailStatus === "error" && emailError ? (
                  <p className="text-sm text-violet-100">{emailError}</p>
                ) : null}
                {!siteKey ? (
                  <p className="text-xs text-violet-200">
                    reCAPTCHA is not configured yet. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY.
                  </p>
                ) : (
                  <p className="text-xs text-violet-200">
                    This form is protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { setShowResults(false); setStep(1); setData(DEFAULT); setEmail(""); setEmailSent(false); setEmailStatus("idle"); setEmailError(""); }}
              className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50"
            >
              Start over
            </button>
            <Link
              href="/contact"
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-3 rounded-xl text-center"
            >
              Book a diagnostic conversation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper
function govItems(d: AuditData): number {
  return [d.hasSingleMQLDef, d.hasRouting, d.hasChangeControl, d.hasDashboard, d.hasMetricDoc, d.hasCRMOwner].filter(Boolean).length;
}
