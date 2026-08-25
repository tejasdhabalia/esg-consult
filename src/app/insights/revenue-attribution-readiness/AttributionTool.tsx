"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

type ModelType = "none" | "first" | "last" | "linear" | "multitouch" | "datadriven";

interface AttrData {
  hasAttributionModel: boolean;
  modelType: ModelType;
  isSalesAligned: boolean;
  isCFOApproved: boolean;
  hasCRMIntegration: boolean;
  hasOfflineTracking: boolean;
  hasChannelTagging: boolean;
  hasCRMFinanceLink: boolean;
  hasMonthlyReport: boolean;
  reportsToBoard: boolean;
  hasCAC: boolean;
  hasROAS: boolean;
  hasUTMGovernance: boolean;
  hasConversionTracking: boolean;
  hasClosedLoopFeedback: boolean;
}

const DEFAULT: AttrData = {
  hasAttributionModel: false, modelType: "none", isSalesAligned: false, isCFOApproved: false,
  hasCRMIntegration: false, hasOfflineTracking: false, hasChannelTagging: false, hasCRMFinanceLink: false,
  hasMonthlyReport: false, reportsToBoard: false, hasCAC: false, hasROAS: false,
  hasUTMGovernance: false, hasConversionTracking: false, hasClosedLoopFeedback: false,
};

function computeScores(d: AttrData) {
  const modelPts = d.modelType === "datadriven" ? 100 : d.modelType === "multitouch" ? 85 : d.modelType === "linear" ? 65 : (d.modelType === "first" || d.modelType === "last") ? 40 : 0;
  const modelScore = Math.round(modelPts * 0.5 + (d.isSalesAligned ? 25 : 0) + (d.isCFOApproved ? 25 : 0));
  const dataScore  = Math.round(([d.hasCRMIntegration, d.hasOfflineTracking, d.hasChannelTagging, d.hasCRMFinanceLink].filter(Boolean).length / 4) * 100);
  const repScore   = Math.round(([d.hasMonthlyReport, d.reportsToBoard, d.hasCAC, d.hasROAS].filter(Boolean).length / 4) * 100);
  const execScore  = Math.round(([d.hasUTMGovernance, d.hasConversionTracking, d.hasClosedLoopFeedback].filter(Boolean).length / 3) * 100);
  const overall    = Math.round(modelScore * 0.3 + dataScore * 0.3 + repScore * 0.25 + execScore * 0.15);

  const level = (overall >= 75 ? "Best-in-class" : overall >= 50 ? "Functional" : overall >= 25 ? "Basic" : "No attribution") as "No attribution" | "Basic" | "Functional" | "Best-in-class";
  const boardConf = (d.isCFOApproved && d.hasCRMFinanceLink && d.reportsToBoard ? "High" : d.hasMonthlyReport && d.isSalesAligned ? "Medium" : "Low") as "Low" | "Medium" | "High";

  const gaps: string[] = [];
  if (!d.hasAttributionModel)     gaps.push("No attribution model: marketing spend cannot be connected to revenue outcomes.");
  if (!d.isSalesAligned)          gaps.push("Sales has not agreed on how marketing contribution is measured, producing conflicting pipeline narratives.");
  if (!d.hasCRMIntegration)       gaps.push("MAP and CRM are not integrated. Attribution requires a single data trail from first touch to close.");
  if (!d.hasChannelTagging)       gaps.push("Channel tagging is incomplete. Without UTM governance, campaign attribution is unreliable.");
  if (!d.hasCRMFinanceLink)       gaps.push("CRM pipeline is not linked to finance. Marketing ROI numbers will never fully reconcile.");
  if (!d.hasClosedLoopFeedback)   gaps.push("No closed-loop feedback from sales. Marketing has no visibility into what happens after lead handoff.");

  const recs: string[] = [];
  if (level === "No attribution") {
    recs.push("Define a first-touch attribution model as a starting point. Imperfect but infinitely better than no model.");
    recs.push("Implement UTM parameter standards across all campaigns. This is the foundation every attribution method depends on.");
    recs.push("Connect your MAP and CRM bidirectionally and validate the sync weekly before building reporting on top.");
  } else if (level === "Basic") {
    recs.push("Upgrade from single-touch to a linear multi-touch model. It distributes credit across the full journey and removes first/last bias.");
    recs.push("Build a closed-loop feedback mechanism: sales dispositions in the CRM should feed back to marketing within 48 hours of handoff.");
    recs.push("Present a monthly marketing contribution report at leadership level. An imperfect report shared consistently builds budget credibility.");
  } else if (level === "Functional") {
    recs.push("Commission a CRM-to-finance reconciliation. Your board pipeline number and your CFO revenue forecast should agree.");
    recs.push("Test a data-driven attribution model if your volume supports it, typically 1,000 or more conversions per quarter per channel.");
    recs.push("Add ROAS and blended CAC to your board deck. Cost-per-outcome metrics convert marketing from a cost centre to a growth function.");
  } else {
    recs.push("Explore AI-assisted attribution modelling to handle complex, non-linear journeys across digital and offline channels.");
    recs.push("Build a marketing mix modelling layer alongside click-based attribution for channels that resist click tracking.");
    recs.push("Codify your attribution methodology in writing and share it with finance. A documented model survives leadership changes.");
  }

  return { overall, modelScore, dataScore, repScore, execScore, level, boardConf, gaps: gaps.slice(0, 4), recs };
}

const LEVEL_CFG = {
  "No attribution": { color: "text-red-600",     bg: "bg-red-50 border-red-200",         desc: "Marketing spend cannot be connected to revenue. Budget decisions are made on intuition, not data." },
  "Basic":          { color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     desc: "Single-touch attribution is in place but data connectivity and alignment gaps limit credibility." },
  "Functional":     { color: "text-blue-600",    bg: "bg-blue-50 border-blue-200",       desc: "Multi-touch attribution is operational. The next step is CFO alignment and a finance reconciliation layer." },
  "Best-in-class":  { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", desc: "Attribution is governed, finance-aligned, and board-ready. You are in the top quartile." },
};

const BOARD_CFG = {
  Low:    { color: "text-red-600",     bg: "bg-red-50 border-red-200",         msg: "Attribution numbers are not yet credible at board level. This limits marketing budget security." },
  Medium: { color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     msg: "Sales alignment exists but finance is not yet connected. Budget discussions will still face challenges." },
  High:   { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", msg: "Finance and sales are aligned. Your attribution numbers are defensible at executive level." },
};

export default function AttributionTool() {
  const [data, setData] = useState<AttrData>(DEFAULT);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action  = "attribution_report_submit";
  const emailVal = validateBusinessEmail(email);
  const s = computeScores(data);
  const lCfg = LEVEL_CFG[s.level];
  const bCfg = BOARD_CFG[s.boardConf];

  const set = <K extends keyof AttrData>(key: K, val: AttrData[K]) => setData((d) => ({ ...d, [key]: val }));

  async function sendReport() {
    setEmailError("");
    if (!emailVal.ok) { setEmailStatus("error"); setEmailError(emailVal.message); return; }
    setEmailStatus("sending");
    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      const res = await fetch("/api/lead-capture", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ formType: "attribution_report", email: emailVal.normalizedEmail, captchaToken, captchaAction: action }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) { setEmailStatus("error"); setEmailError(json?.error || "Failed to send. Please try again."); return; }
      setEmailSent(true); setEmailStatus("idle");
    } catch (err: unknown) { setEmailStatus("error"); setEmailError(err instanceof Error ? err.message : "Failed to send. Please try again."); }
  }

  const chk = (checked: boolean) => `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${checked ? "bg-slate-100 border-slate-400" : "bg-white border-slate-200 hover:border-slate-300"}`;

  return (
    <>
      {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />}
      <div id="readiness-check" className="scroll-mt-8">
        {!showResults && (
          <div className="flex items-center gap-2 mb-6">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${step >= n ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-400"}`}>{n}</div>
                {n < 3 && <div className={`h-0.5 flex-1 transition-colors ${step > n ? "bg-slate-800" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        )}

        {!showResults && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Attribution model</h3>
                <p className="text-slate-500 text-sm mb-5">Your attribution model determines how marketing credit is distributed. The first question is whether one exists.</p>
                <div className="space-y-3">
                  <label className={chk(data.hasAttributionModel)}>
                    <input type="checkbox" checked={data.hasAttributionModel} onChange={e => set("hasAttributionModel", e.target.checked)} className="mt-0.5 accent-slate-800 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-slate-700">We have a documented attribution model that marketing, sales and leadership have agreed on.</span>
                  </label>
                  <div className="pt-2">
                    <p className="text-sm font-medium text-slate-700 mb-3">Which model type best describes what you use?</p>
                    <div className="space-y-2">
                      {([
                        { val: "none",       label: "None: we do not have an attribution model" },
                        { val: "first",      label: "First-touch: all credit goes to the channel that acquired the lead", note: "Simple but ignores the full journey" },
                        { val: "last",       label: "Last-touch: all credit goes to the final interaction before purchase", note: "Biases toward bottom of funnel" },
                        { val: "linear",     label: "Linear: credit split equally across all touchpoints", note: "Balanced but not weighted by impact" },
                        { val: "multitouch", label: "Multi-touch weighted: key touchpoints receive higher credit", note: "Reflects journey complexity" },
                        { val: "datadriven", label: "Data-driven: algorithmic model based on actual conversion data", note: "Most accurate, requires volume" },
                      ] as const).map((item) => (
                        <label key={item.val} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${data.modelType === item.val ? "bg-slate-50 border-slate-400" : "bg-white border-slate-200 hover:border-slate-300"}`}>
                          <input type="radio" name="modelType" value={item.val} checked={data.modelType === item.val} onChange={() => set("modelType", item.val)} className="mt-0.5 accent-slate-800 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-slate-800">{item.label}</span>
                            {"note" in item && <span className="block text-xs text-slate-400 mt-0.5">{(item as {note:string}).note}</span>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 space-y-3">
                    <label className={chk(data.isSalesAligned)}>
                      <input type="checkbox" checked={data.isSalesAligned} onChange={e => set("isSalesAligned", e.target.checked)} className="mt-0.5 accent-slate-800 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Sales leadership has formally agreed to how marketing contribution is measured in this model.</span>
                    </label>
                    <label className={chk(data.isCFOApproved)}>
                      <input type="checkbox" checked={data.isCFOApproved} onChange={e => set("isCFOApproved", e.target.checked)} className="mt-0.5 accent-slate-800 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">Finance / CFO accepts our marketing contribution numbers as part of revenue reporting.</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Data connectivity</h3>
                <p className="text-slate-500 text-sm mb-5">Attribution is only as good as the data trail behind it.</p>
                <div className="space-y-3">
                  {([
                    { key: "hasCRMIntegration",  label: "MAP and CRM are bidirectionally integrated. Contact activity syncs across both systems.", icon: "🔗" },
                    { key: "hasOfflineTracking",  label: "Offline conversions (calls, events, referrals) are captured and connected to the originating digital channel.", icon: "📞" },
                    { key: "hasChannelTagging",   label: "UTM parameters are enforced consistently across all paid, owned and partner channels.", icon: "🏷️" },
                    { key: "hasCRMFinanceLink",   label: "CRM closed revenue is reconciled against the finance system on a monthly cadence.", icon: "💰" },
                  ] as const).map(({ key, label, icon }) => (
                    <label key={key} className={chk(data[key])}>
                      <span className="text-xl flex-shrink-0">{icon}</span>
                      <span className="text-sm text-slate-700 flex-1">{label}</span>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="accent-slate-800 w-4 h-4 flex-shrink-0" />
                    </label>
                  ))}
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-blue-800"><strong>The finance reconciliation gap:</strong> Most marketing teams can prove pipeline contribution but not revenue contribution. The difference is a CRM-to-finance reconciliation that maps closed deals to the marketing activities that sourced them.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Reporting and execution</h3>
                <p className="text-slate-500 text-sm mb-5">Attribution data only creates value when reported consistently and used to close the feedback loop with sales.</p>
                <div className="space-y-3">
                  {([
                    { key: "hasMonthlyReport",      label: "A marketing contribution report is produced monthly and shared with revenue leadership." },
                    { key: "reportsToBoard",         label: "Marketing presents revenue attribution data in board or executive meetings." },
                    { key: "hasCAC",                 label: "Customer Acquisition Cost (CAC) is tracked by channel and reviewed against lifetime value benchmarks." },
                    { key: "hasROAS",                label: "Return on Ad Spend (ROAS) or blended campaign ROI is reported alongside pipeline contribution." },
                    { key: "hasUTMGovernance",       label: "UTM tagging is governed: naming standard, validation process, and URL builder tool in use." },
                    { key: "hasConversionTracking",  label: "Conversion events are tracked end-to-end from first touch through to opportunity creation in the CRM." },
                    { key: "hasClosedLoopFeedback",  label: "Sales disposition data feeds back to marketing within 48 hours of lead handoff." },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className={chk(data[key])}>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="mt-0.5 accent-slate-800 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 ? <button onClick={() => setStep((n) => (n - 1) as 1|2|3)} className="px-5 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">Back</button> : <div />}
              {step < 3
                ? <button onClick={() => setStep((n) => (n + 1) as 1|2|3)} className="px-6 py-2.5 text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg">Next section</button>
                : <button onClick={() => setShowResults(true)} className="px-6 py-2.5 text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg">See my attribution score</button>}
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-5">
            <div className={`rounded-2xl border p-6 text-center ${lCfg.bg}`}>
              <div className="text-5xl font-black mb-1">
                <span className={lCfg.color}>{s.overall}</span>
                <span className="text-slate-400 text-xl">/100</span>
              </div>
              <div className={`text-lg font-bold mb-2 ${lCfg.color}`}>{s.level}</div>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">{lCfg.desc}</p>
            </div>

            <div className={`rounded-2xl border p-4 flex items-center gap-4 ${bCfg.bg}`}>
              <div className="text-2xl">📊</div>
              <div>
                <div className="text-xs font-medium text-slate-500 mb-0.5">Board-level confidence in your marketing numbers</div>
                <div className={`text-lg font-bold ${bCfg.color}`}>{s.boardConf}</div>
                <div className="text-xs text-slate-500 mt-0.5">{bCfg.msg}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900">Score by dimension</h3>
              {[
                { label: "Attribution model", score: s.modelScore, bench: 70 },
                { label: "Data connectivity", score: s.dataScore,  bench: 75 },
                { label: "Reporting cadence", score: s.repScore,   bench: 65 },
                { label: "Execution discipline", score: s.execScore, bench: 70 },
              ].map(({ label, score, bench }) => {
                const color = score >= 75 ? "#059669" : score >= 50 ? "#D97706" : "#EF4444";
                return (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">Benchmark: {bench}%</span>
                        <span className="font-bold" style={{ color }}>{score}%</span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
                      <div className="absolute top-0 h-full w-0.5 bg-slate-500 opacity-50" style={{ left: `${bench}%` }} />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-slate-400">Vertical markers show top-quartile benchmark per dimension.</p>
            </div>

            {s.gaps.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-3">Highest-priority attribution gaps</h3>
                <ul className="space-y-2">
                  {s.gaps.map((gap, i) => (
                    <li key={i} className="flex gap-3 text-sm text-amber-900">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">Recommendations for your readiness level</h3>
              <ol className="space-y-3">
                {s.recs.map((rec, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1">Get the full attribution readiness report</h3>
              <p className="text-slate-300 text-sm mb-4">Formatted PDF with dimension scores, board-confidence rating, and a step-by-step implementation plan for your readiness level.</p>
              {emailSent ? (
                <p className="font-semibold text-center py-2">Report on its way. Check your inbox.</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label htmlFor="attribution-email" className="sr-only">Work email</label>
                    <input id="attribution-email" type="email" name="email" autoComplete="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white" />
                    <button onClick={sendReport} disabled={!siteKey || !emailVal.ok || emailStatus === "sending"}
                      className="bg-white text-slate-800 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-slate-100 whitespace-nowrap disabled:opacity-50">
                      {emailStatus === "sending" ? "Sending..." : "Send report"}
                    </button>
                  </div>
                  {email && !emailVal.ok && <p className="text-sm text-slate-300">{emailVal.message}</p>}
                  {emailStatus === "error" && emailError && <p className="text-sm text-slate-300">{emailError}</p>}
                  <p className="text-xs text-slate-400">{!siteKey ? "reCAPTCHA not configured." : "Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply."}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { setShowResults(false); setStep(1); setData(DEFAULT); setEmail(""); setEmailSent(false); setEmailStatus("idle"); setEmailError(""); }}
                className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50">Start over</button>
              <Link href="/contact" className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold py-3 rounded-xl text-center">Book a diagnostic conversation</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
