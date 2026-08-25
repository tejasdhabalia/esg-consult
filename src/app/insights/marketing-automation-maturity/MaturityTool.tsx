"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

interface MaturityData {
  hasCleanContactData: boolean;
  hasUnifiedProfile: boolean;
  hasConsentFramework: boolean;
  hasDataDictionary: boolean;
  hasMAP: boolean;
  hasCRM: boolean;
  hasCRMIntegration: boolean;
  hasBI: boolean;
  hasChangeControl: boolean;
  hasNamingConventions: boolean;
  hasCampaignOwner: boolean;
  hasSLAs: boolean;
  hasAttributionModel: boolean;
  hasRevenueReporting: boolean;
  hasBenchmarks: boolean;
  hasABTesting: boolean;
}

interface MaturityScores {
  overall: number;
  dataScore: number;
  platformScore: number;
  governanceScore: number;
  performanceScore: number;
  maturityLevel: "Reactive" | "Developing" | "Governed" | "Optimised";
  industryGap: number;
  topGaps: string[];
  nextSteps: string[];
}

const DEFAULT: MaturityData = {
  hasCleanContactData: false,
  hasUnifiedProfile: false,
  hasConsentFramework: false,
  hasDataDictionary: false,
  hasMAP: false,
  hasCRM: true,
  hasCRMIntegration: false,
  hasBI: false,
  hasChangeControl: false,
  hasNamingConventions: false,
  hasCampaignOwner: false,
  hasSLAs: false,
  hasAttributionModel: false,
  hasRevenueReporting: false,
  hasBenchmarks: false,
  hasABTesting: false,
};

const INDUSTRY_BEST = 82;

function computeScores(d: MaturityData): MaturityScores {
  const dataItems    = [d.hasCleanContactData, d.hasUnifiedProfile, d.hasConsentFramework, d.hasDataDictionary];
  const platformItems= [d.hasMAP, d.hasCRM, d.hasCRMIntegration, d.hasBI];
  const govItems     = [d.hasChangeControl, d.hasNamingConventions, d.hasCampaignOwner, d.hasSLAs];
  const perfItems    = [d.hasAttributionModel, d.hasRevenueReporting, d.hasBenchmarks, d.hasABTesting];

  const dataScore        = Math.round((dataItems.filter(Boolean).length / 4) * 100);
  const platformScore    = Math.round((platformItems.filter(Boolean).length / 4) * 100);
  const governanceScore  = Math.round((govItems.filter(Boolean).length / 4) * 100);
  const performanceScore = Math.round((perfItems.filter(Boolean).length / 4) * 100);
  const overall          = Math.round(dataScore * 0.3 + platformScore * 0.25 + governanceScore * 0.25 + performanceScore * 0.2);

  const maturityLevel: MaturityScores["maturityLevel"] =
    overall >= 75 ? "Optimised" : overall >= 55 ? "Governed" : overall >= 30 ? "Developing" : "Reactive";

  const topGaps: string[] = [];
  if (!d.hasCleanContactData)  topGaps.push("Contact data quality: your campaigns reach only the records they can find.");
  if (!d.hasUnifiedProfile)    topGaps.push("No unified contact profile: fragmented data prevents personalisation at scale.");
  if (!d.hasConsentFramework)  topGaps.push("Consent framework missing: a regulatory and deliverability risk.");
  if (!d.hasChangeControl)     topGaps.push("No automation change control: undocumented changes are the leading cause of workflow failures.");
  if (!d.hasAttributionModel)  topGaps.push("No attribution model: the board will always question marketing ROI without one.");
  if (!d.hasMAP)               topGaps.push("No marketing automation platform: manual campaigns cannot scale or be governed.");
  if (!d.hasCRMIntegration)    topGaps.push("MAP and CRM not integrated: attribution gaps will not reconcile.");

  const nextSteps: string[] = [];
  if (maturityLevel === "Reactive") {
    nextSteps.push("Start with data hygiene: deduplicate, standardise field formats, and document your contact schema.");
    nextSteps.push("Implement a basic CRM and map your lead lifecycle stages before investing in a MAP.");
    nextSteps.push("Assign a single owner for marketing data and automation, even part-time.");
  } else if (maturityLevel === "Developing") {
    nextSteps.push("Define and enforce naming conventions across all campaigns, lists and automation workflows.");
    nextSteps.push("Build a change log. Every workflow modification should be documented before going live.");
    nextSteps.push("Connect MAP and CRM bidirectionally and validate the data sync on a weekly cadence.");
  } else if (maturityLevel === "Governed") {
    nextSteps.push("Implement a multi-touch attribution model and align it with your finance system.");
    nextSteps.push("Move from campaign-level reporting to revenue-stage reporting your CFO can read.");
    nextSteps.push("Begin structured A/B testing with a hypothesis-first process, not ad hoc experiments.");
  } else {
    nextSteps.push("Focus on predictive scoring and AI-assisted segmentation to extend your lead.");
    nextSteps.push("Build a centre of excellence model so governance standards transfer to new team members.");
    nextSteps.push("Expand attribution coverage to include offline and partner-sourced revenue.");
  }

  return { overall, dataScore, platformScore, governanceScore, performanceScore, maturityLevel, industryGap: Math.max(0, INDUSTRY_BEST - overall), topGaps: topGaps.slice(0, 4), nextSteps };
}

const LEVEL_CONFIG = {
  Reactive:   { color: "text-red-600",     bg: "bg-red-50 border-red-200",         desc: "Automation is largely manual and ungoverned. Quick wins exist across data, platform and ownership." },
  Developing: { color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     desc: "Some automation in place but governance and measurement gaps are constraining performance." },
  Governed:   { color: "text-blue-600",    bg: "bg-blue-50 border-blue-200",       desc: "Strong foundations. The next step is closing attribution gaps and moving to revenue-stage reporting." },
  Optimised:  { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", desc: "Top quartile. Focus shifts to AI-assisted personalisation and predictive pipeline." },
};

function ScoreBar({ score, label, benchmark }: { score: number; label: string; benchmark: number }) {
  const color = score >= 75 ? "#059669" : score >= 50 ? "#D97706" : "#EF4444";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Benchmark: {benchmark}%</span>
          <span className="font-bold" style={{ color }}>{score}%</span>
        </div>
      </div>
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
        <div className="absolute top-0 h-full w-0.5 bg-slate-500 opacity-50" style={{ left: `${benchmark}%` }} />
      </div>
    </div>
  );
}

export default function MaturityTool() {
  const [data, setData]           = useState<MaturityData>(DEFAULT);
  const [step, setStep]           = useState<1 | 2 | 3 | 4>(1);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail]         = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "error">("idle");
  const [emailError, setEmailError]   = useState("");

  const siteKey       = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action        = "maturity_report_submit";
  const emailVal      = validateBusinessEmail(email);
  const scores        = computeScores(data);
  const levelCfg      = LEVEL_CONFIG[scores.maturityLevel];

  const set = (key: keyof MaturityData, value: boolean) =>
    setData((d) => ({ ...d, [key]: value }));

  async function sendReport() {
    setEmailError("");
    if (!emailVal.ok) { setEmailStatus("error"); setEmailError(emailVal.message); return; }
    setEmailStatus("sending");
    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ formType: "maturity_report", email: emailVal.normalizedEmail, captchaToken, captchaAction: action }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) { setEmailStatus("error"); setEmailError(json?.error || "Failed to send. Please try again."); return; }
      setEmailSent(true); setEmailStatus("idle");
    } catch (err: unknown) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  const chkCls = (checked: boolean) =>
    `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${checked ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200 hover:border-slate-300"}`;

  return (
    <>
      {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />}

      <div id="scorecard" className="scroll-mt-8">
        {/* Progress bar */}
        {!showResults && (
          <div className="flex items-center gap-2 mb-6">
            {([1, 2, 3, 4] as const).map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${step >= s ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-400"}`}>{s}</div>
                {s < 4 && <div className={`h-0.5 flex-1 transition-colors ${step > s ? "bg-indigo-600" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        )}

        {!showResults && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Data foundation</h3>
                <p className="text-slate-500 text-sm mb-5">Automation is only as reliable as the data it runs on.</p>
                <div className="space-y-3">
                  {([
                    { key: "hasCleanContactData",  label: "Our contact database is actively maintained: duplicates managed, fields standardised, bounce rates below 2%." },
                    { key: "hasUnifiedProfile",    label: "Each contact has a single unified record consolidating activity from all channels." },
                    { key: "hasConsentFramework",  label: "Consent records are captured at source, stored in our CRM, and auditable." },
                    { key: "hasDataDictionary",    label: "A documented data dictionary covers field names, ownership and allowed values." },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className={chkCls(data[key])}>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="mt-0.5 accent-indigo-600 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Platform coverage</h3>
                <p className="text-slate-500 text-sm mb-5">Which tools are active, properly configured, and connected to each other?</p>
                <div className="space-y-3">
                  {([
                    { key: "hasMAP",           label: "Marketing Automation Platform (HubSpot, Marketo, Pardot, Braze, Klaviyo) is live and in active use.", icon: "⚙️" },
                    { key: "hasCRM",           label: "CRM is live with an active pipeline, defined opportunity stages, and a named CRM owner.", icon: "📊" },
                    { key: "hasCRMIntegration",label: "MAP and CRM are bidirectionally integrated with a validated data sync, not a one-way push.", icon: "🔗" },
                    { key: "hasBI",            label: "A BI or reporting layer (Looker, Tableau, Power BI) pulls from both systems.", icon: "📈" },
                  ] as const).map(({ key, label, icon }) => (
                    <label key={key} className={chkCls(data[key])}>
                      <span className="text-xl flex-shrink-0">{icon}</span>
                      <span className="text-sm text-slate-700 flex-1">{label}</span>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="accent-indigo-600 w-4 h-4 flex-shrink-0" />
                    </label>
                  ))}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs text-amber-800"><strong>Most common gap:</strong> CRM and MAP both live but not properly integrated, producing attribution blind spots that cannot be reconciled.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Automation governance</h3>
                <p className="text-slate-500 text-sm mb-5">This is where most teams lose performance as they scale.</p>
                <div className="space-y-3">
                  {([
                    { key: "hasChangeControl",     label: "All changes to workflows, scoring models, and nurture sequences are documented before going live." },
                    { key: "hasNamingConventions",  label: "Campaigns, lists, assets and workflows follow documented naming conventions enforced across the team." },
                    { key: "hasCampaignOwner",     label: "Every active campaign and automation workflow has a named owner accountable for its performance and data hygiene." },
                    { key: "hasSLAs",              label: "Service Level Agreements for lead follow-up speed exist and are tracked in the CRM dashboard." },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className={chkCls(data[key])}>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="mt-0.5 accent-indigo-600 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Performance measurement</h3>
                <p className="text-slate-500 text-sm mb-5">Can you prove the value of marketing to your board?</p>
                <div className="space-y-3">
                  {([
                    { key: "hasAttributionModel",   label: "A documented attribution model (first-touch, multi-touch, or data-driven) is agreed on by marketing and sales." },
                    { key: "hasRevenueReporting",   label: "Marketing has a monthly revenue contribution report connecting campaign spend to closed revenue, not just MQL volume." },
                    { key: "hasBenchmarks",         label: "We track conversion rates against published industry benchmarks and review them quarterly." },
                    { key: "hasABTesting",          label: "A/B testing runs on a hypothesis-first basis with documented results that feed back into campaign design." },
                  ] as const).map(({ key, label }) => (
                    <label key={key} className={chkCls(data[key])}>
                      <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)} className="mt-0.5 accent-indigo-600 w-4 h-4 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-xs text-slate-500">Only 22% of B2B marketing teams have a revenue attribution model their CFO trusts. This is the single biggest determinant of marketing budget security.</p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1
                ? <button onClick={() => setStep((s) => (s - 1) as 1|2|3|4)} className="px-5 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">Back</button>
                : <div />}
              {step < 4
                ? <button onClick={() => setStep((s) => (s + 1) as 1|2|3|4)} className="px-6 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Next section</button>
                : <button onClick={() => setShowResults(true)} className="px-6 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">See my maturity score</button>}
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-5">
            <div className={`rounded-2xl border p-6 text-center ${levelCfg.bg}`}>
              <div className="text-5xl font-black mb-1">
                <span className={levelCfg.color}>{scores.overall}</span>
                <span className="text-slate-400 text-xl">/100</span>
              </div>
              <div className={`text-lg font-bold mb-1 ${levelCfg.color}`}>Maturity level: {scores.maturityLevel}</div>
              <div className="text-sm text-slate-500 mb-2">Top-quartile benchmark: {INDUSTRY_BEST}/100{scores.industryGap > 0 && <span className="ml-2 text-amber-600 font-medium">({scores.industryGap} points below benchmark)</span>}</div>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">{levelCfg.desc}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900">Score by dimension</h3>
              <ScoreBar score={scores.dataScore}        label="Data foundation"         benchmark={75} />
              <ScoreBar score={scores.platformScore}    label="Platform coverage"       benchmark={80} />
              <ScoreBar score={scores.governanceScore}  label="Automation governance"   benchmark={70} />
              <ScoreBar score={scores.performanceScore} label="Performance measurement" benchmark={65} />
              <p className="text-xs text-slate-400">Vertical markers show top-quartile benchmark per dimension.</p>
            </div>

            {scores.topGaps.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-3">Highest-impact gaps</h3>
                <ul className="space-y-2">
                  {scores.topGaps.map((gap, i) => (
                    <li key={i} className="flex gap-3 text-sm text-amber-900">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">Recommended next steps for {scores.maturityLevel} teams</h3>
              <ol className="space-y-3">
                {scores.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1">Get the full benchmark report</h3>
              <p className="text-indigo-200 text-sm mb-4">Receive a formatted PDF with your dimension scores, the full industry benchmark comparison, and a 30-day action plan for your maturity level.</p>
              {emailSent ? (
                <p className="font-semibold text-center py-2">Report on its way. Check your inbox.</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label htmlFor="maturity-email" className="sr-only">Work email</label>
                    <input id="maturity-email" type="email" name="email" autoComplete="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white" />
                    <button onClick={sendReport} disabled={!siteKey || !emailVal.ok || emailStatus === "sending"}
                      className="bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-indigo-50 whitespace-nowrap disabled:opacity-50">
                      {emailStatus === "sending" ? "Sending..." : "Send report"}
                    </button>
                  </div>
                  {email && !emailVal.ok && <p className="text-sm text-indigo-100">{emailVal.message}</p>}
                  {emailStatus === "error" && emailError && <p className="text-sm text-indigo-100">{emailError}</p>}
                  <p className="text-xs text-indigo-200">{!siteKey ? "reCAPTCHA not configured." : "Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply."}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { setShowResults(false); setStep(1); setData(DEFAULT); setEmail(""); setEmailSent(false); setEmailStatus("idle"); setEmailError(""); }}
                className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50">Start over</button>
              <Link href="/contact" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-xl text-center">Book a diagnostic conversation</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
