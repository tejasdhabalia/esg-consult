"use client";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { trackGenerateLead } from "@/lib/analytics";

/*
  DPDP exposure assessment.

  Scoring design, so nobody has to reverse engineer it later:

  - Sixteen of the eighteen questions score, for 100 points total.
  - Questions 16 and 17 (record volume, platform type) carry no points.
    They set the significant data fiduciary flag instead, because volume
    is not a readiness measure. A large company that has done the work is
    ready; a small one that has not is exposed.
  - Weights follow consequence, not question count. Security safeguards
    and breach notification carry the two highest penalty ceilings in the
    Schedule, so category C is weighted above its question count. Vendor
    contracts carry 15 points on one question because a processor failure
    lands on the fiduciary.
  - "Not applicable" on the children's data questions scores full marks.
    It is a genuine answer for a B2B company with no consumer surface, and
    it is also why no honest respondent lands on zero. The brief asked for
    a floor; this is the floor, arrived at honestly rather than by adding
    a fudge constant.

  VERIFY BEFORE PUBLISHING: the significant data fiduciary flag is
  indicative only. Designation is by Central Government notification and
  no threshold has been published, so the flag prompts a conversation and
  must never be worded as a determination. See the SDF_NOTE constant.

  REGULATORY CONTENT. All dates here are Phase 3, 13 May 2027. The
  commencement mapping is set out on
  /regulatory-hub/dpdp-in-scope-and-timeline. If that page changes, this
  one changes with it.
*/

type Answer = "yes" | "partial" | "no";
/**
 * Null means not yet answered. Defaulting every question to "no" would
 * pre-select the worst option on the user's behalf, which both looks like
 * we answered for them and lets someone click through to a zero they never
 * gave. Unanswered questions block the step instead.
 */
type Maybe = Answer | null;
type Volume = "under50k" | "50k_2m" | "over2m";

interface DpdpData {
  // A. Notice and consent
  standaloneNotice: Maybe;
  itemisedPurposes: Maybe;
  affirmativeConsent: Maybe;
  easyWithdrawal: Maybe;
  // B. Data principal rights
  canProduceData: Maybe;
  correctionErasure: Maybe;
  namedOwner: Maybe;
  // C. Breach readiness
  incidentPlan: Maybe;
  wouldDetect: Maybe;
  ranDrill: Maybe;
  // D. Retention and erasure
  retentionPeriods: Maybe;
  deletionWorks: Maybe;
  // E. Children's and sensitive data
  parentalConsent: Maybe;
  noMinorTargeting: Maybe;
  // F. Vendors and accountability
  vendorContracts: Maybe;
  dataProtectionOwner: Maybe;
  // Profile, unscored
  volume: Volume | null;
  largePlatform: Maybe;
}

const DEFAULT: DpdpData = {
  standaloneNotice: null, itemisedPurposes: null, affirmativeConsent: null, easyWithdrawal: null,
  canProduceData: null, correctionErasure: null, namedOwner: null,
  incidentPlan: null, wouldDetect: null, ranDrill: null,
  retentionPeriods: null, deletionWorks: null,
  parentalConsent: null, noMinorTargeting: null,
  vendorContracts: null, dataProtectionOwner: null,
  volume: null, largePlatform: null,
};

const WEIGHTS: Record<keyof Omit<DpdpData, "volume" | "largePlatform">, number> = {
  standaloneNotice: 5, itemisedPurposes: 5, affirmativeConsent: 5, easyWithdrawal: 5,
  canProduceData: 6, correctionErasure: 5, namedOwner: 4,
  incidentPlan: 8, wouldDetect: 7, ranDrill: 5,
  retentionPeriods: 6, deletionWorks: 4,
  parentalConsent: 5, noMinorTargeting: 5,
  vendorContracts: 15, dataProtectionOwner: 10,
};

const CATEGORIES = [
  { id: "A", name: "Notice and consent", keys: ["standaloneNotice", "itemisedPurposes", "affirmativeConsent", "easyWithdrawal"] },
  { id: "B", name: "Data principal rights", keys: ["canProduceData", "correctionErasure", "namedOwner"] },
  { id: "C", name: "Breach readiness", keys: ["incidentPlan", "wouldDetect", "ranDrill"] },
  { id: "D", name: "Retention and erasure", keys: ["retentionPeriods", "deletionWorks"] },
  { id: "E", name: "Children's data", keys: ["parentalConsent", "noMinorTargeting"] },
  { id: "F", name: "Vendors and accountability", keys: ["vendorContracts", "dataProtectionOwner"] },
] as const;

type ScoreKey = keyof typeof WEIGHTS;

const GAP_TEXT: Record<ScoreKey, string> = {
  standaloneNotice: "No standalone privacy notice. A notice bundled into terms of service does not satisfy the requirement, which asks for a separate document in plain language.",
  itemisedPurposes: "Purposes are not itemised. The notice has to describe the personal data collected and the specific purpose for each, not a general statement about improving the service.",
  affirmativeConsent: "Consent is not captured as a clear affirmative action. Pre-ticked boxes and consent bundled with unrelated terms do not count.",
  easyWithdrawal: "No working withdrawal route. Withdrawal has to be as easy as giving consent, and processing has to stop after it.",
  canProduceData: "You could not produce a complete answer to an access request. The ninety day maximum is spent finding the data, not deciding what to do with it.",
  correctionErasure: "No documented process for correction or erasure. These are separate rights from access and need their own path.",
  namedOwner: "No published grievance officer or privacy contact. The Rules require the contact details of the person who answers questions about your processing to be published where people can find them, and this applies to every data fiduciary.",
  incidentPlan: "No written incident response plan for personal data breaches. The clock starts when you become aware, not when you finish investigating: immediate intimation, then a detailed report to the regulator within 72 hours, and six hours to CERT-In where that applies.",
  wouldDetect: "You would not know quickly if personal data had been accessed without authorisation. You cannot notify a breach you have not detected.",
  ranDrill: "The breach process has never been tested, not even as a tabletop exercise. An untested plan is a document.",
  retentionPeriods: "No defined retention periods. Keeping everything indefinitely is the default state and it is not a defensible one.",
  deletionWorks: "Logs are not retained for a year, or could not reconstruct an incident. One year of logs and traffic data sits inside the security safeguards duty, which carries the highest ceiling in the Schedule at 250 crore.",
  parentalConsent: "No verifiable parental consent where your product or marketing could reach someone under 18. This carries a ceiling of ₹200 crore.",
  noMinorTargeting: "You cannot confirm that marketing does not target minors. Targeted advertising to children is prohibited outright rather than restricted.",
  vendorContracts: "Vendor contracts do not carry DPDP obligations. Your processors hold your data, and accountability stays with you when they fail.",
  dataProtectionOwner: "Nobody is designated as responsible for data protection, even part time. Every other gap on this list needs an owner before it closes.",
};

const SDF_NOTE =
  "Your answers on record volume or platform type suggest significant data fiduciary designation is worth a conversation. Designation is made by Central Government notification and no threshold has been published, so nobody can confirm their own status in advance. If it applies, the additional obligations are structural rather than procedural: an India-based Data Protection Officer, periodic impact assessments, independent audits and algorithmic due diligence. Those are hires and audit cycles, so they change the timeline.";

/*
  Questions where the middle option means "does not apply to us" rather
  than "partly done", so it scores full credit instead of half.

  A B2B company with no consumer surface has no children's data gap. Half
  marking it would penalise the absence of a risk, which is the sort of
  thing that makes a scored tool read as rigged.
*/
const NOT_APPLICABLE_IS_FULL: ReadonlySet<ScoreKey> = new Set([
  "parentalConsent",
  "noMinorTargeting",
]);

function score(a: Maybe, key: ScoreKey): number {
  if (a === "yes") return 1;
  if (a === "no" || a === null) return 0;
  return NOT_APPLICABLE_IS_FULL.has(key) ? 1 : 0.5;
}

function computeScores(d: DpdpData) {
  const categoryScores = CATEGORIES.map((cat) => {
    const keys = cat.keys as readonly ScoreKey[];
    const max = keys.reduce((sum, k) => sum + WEIGHTS[k], 0);
    const got = keys.reduce((sum, k) => sum + WEIGHTS[k] * score(d[k], k), 0);
    return { id: cat.id, name: cat.name, points: got, max, pct: Math.round((got / max) * 100) };
  });

  const points = categoryScores.reduce((sum, c) => sum + c.points, 0);
  const overall = Math.round(points);

  const band =
    overall >= 70 ? "On track" : overall >= 40 ? "Partial readiness" : "High exposure";

  // Gaps ranked by weight, so the biggest consequence surfaces first.
  const gaps = (Object.keys(WEIGHTS) as ScoreKey[])
    .filter((k) => d[k] === "no")
    .sort((x, y) => WEIGHTS[y] - WEIGHTS[x])
    .slice(0, 3)
    .map((k) => GAP_TEXT[k]);

  const weakest = [...categoryScores].sort((x, y) => x.pct - y.pct)[0];
  const sdfFlag = d.volume === "over2m" || d.largePlatform === "yes";

  return { categoryScores, overall, band, gaps, weakest, sdfFlag };
}

const BAND_CFG = {
  "High exposure": {
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    desc: "If the Data Protection Board of India asked to see your process today, there is not much to show. That is the normal position for a mid-market company that has not started, and it is fixable in the time remaining.",
  },
  "Partial readiness": {
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    desc: "Some pieces exist. They would not hold up as a complete answer, usually because the documented parts and the operating parts are different parts.",
  },
  "On track": {
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    desc: "The foundations exist. The gaps named below are still worth closing, because the Schedule attaches penalties to specific failures rather than to an overall posture.",
  },
};

const STEPS = [
  {
    id: "A",
    title: "Notice and consent",
    intro: "Where the evidence of compliance is created. Get this wrong and everything downstream inherits the problem.",
    questions: [
      { key: "standaloneNotice", label: "Do you have a standalone privacy notice, separate from your terms of service, written in plain language?" },
      { key: "itemisedPurposes", label: "Does your notice itemise what data you collect and why, for each purpose separately?" },
      { key: "affirmativeConsent", label: "Is consent captured through a clear affirmative action, with no pre-ticked boxes and no bundling with unrelated terms?" },
      { key: "easyWithdrawal", label: "Can a customer withdraw consent as easily as they gave it?" },
    ],
  },
  {
    id: "B",
    title: "Data principal rights",
    intro: "The Rules set a maximum of ninety days to respond. Most of a first attempt is spent finding the data.",
    questions: [
      { key: "canProduceData", label: "If someone emailed asking what personal data you hold on them, could you produce a complete answer within a defined timeframe?", labels: ["Yes", "We would manage it manually", "No process exists"] },
      { key: "correctionErasure", label: "Do you have a documented process for correcting or erasing a person's data on request?" },
      { key: "namedOwner", label: "Is there a named grievance officer or privacy contact published somewhere people can find it?", labels: ["Yes, published", "Named but not published", "No"] },
    ],
  },
  {
    id: "C",
    title: "Breach readiness",
    intro: "On becoming aware you owe an immediate intimation and a detailed report to the regulator within 72 hours. Where CERT-In also applies, the first clock is six hours.",
    questions: [
      { key: "incidentPlan", label: "Do you have a written incident response plan naming who to notify and when, specifically for personal data breaches?" },
      { key: "wouldDetect", label: "Would you know, within hours, if personal data in one of your systems had been accessed without authorisation?", labels: ["Yes", "Probably not quickly", "No"] },
      { key: "ranDrill", label: "Has anyone actually run a breach notification drill, even a tabletop exercise?", labels: ["Yes", "Discussed but not run", "No"] },
    ],
  },
  {
    id: "D",
    title: "Retention, logs and erasure",
    intro: "Retention periods and the log trail that lets you prove what happened. Both sit behind the two highest penalties in the Schedule.",
    questions: [
      { key: "retentionPeriods", label: "Do you have defined retention periods for different categories of personal data, rather than keeping everything indefinitely?" },
      { key: "deletionWorks", label: "Do you retain access and activity logs for at least a year, and could you actually reconstruct an incident from them?", labels: ["Yes", "We keep some logs", "No"] },
    ],
  },
  {
    id: "E",
    title: "Children's and sensitive data",
    intro: "Targeted advertising to children is prohibited outright rather than restricted. If neither question applies to you, say so and score accordingly.",
    questions: [
      { key: "parentalConsent", label: "If your product, marketing or platform could reach anyone under 18, do you have verifiable parental consent in place?", labels: ["Yes", "Not applicable to us", "No"] },
      { key: "noMinorTargeting", label: "Can you confirm that none of your marketing specifically targets minors?", labels: ["Yes", "Not applicable", "Unsure"] },
    ],
  },
  {
    id: "F",
    title: "Vendors and accountability",
    intro: "Your processors hold your data. Accountability does not transfer with it.",
    questions: [
      { key: "vendorContracts", label: "Do your contracts with vendors who process personal data on your behalf include DPDP-specific obligations?" },
      { key: "dataProtectionOwner", label: "Do you currently have anyone designated as responsible for data protection compliance, even part time?", labels: ["Yes, formally", "Informally", "No"] },
    ],
  },
] as const;

/*
  Questions 16 and 17 live on the last step but carry no points. They set
  the significant data fiduciary flag. Keeping them unscored is deliberate:
  holding a lot of records is not a readiness failure.
*/

export default function DpdpExposureTool() {
  const [data, setData] = useState<DpdpData>(DEFAULT);
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  /*
    Partial gate. The band and the weakest category show immediately; the
    score, the category breakdown, the named gaps and the SDF flag unlock
    when the result is emailed.

    Deliberately not a full gate. Question 1 of this assessment asks whether
    the visitor has a standalone notice at the point of collection and
    question 3 asks whether consent is unbundled. Making someone hand over
    an email before they can see their own answers scored would be doing the
    thing the tool penalises. The scoring also runs in the browser, so a
    hard gate stops ordinary visitors and not the ones who would mind.
  */
  const [unlocked, setUnlocked] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action = "dpdp_exposure_report";
  const emailVal = validateBusinessEmail(email);
  const s = computeScores(data);
  const cfg = BAND_CFG[s.band as keyof typeof BAND_CFG];
  const isLast = step === STEPS.length - 1;

  const set = <K extends keyof DpdpData>(key: K, val: DpdpData[K]) =>
    setData((d) => ({ ...d, [key]: val }));

  async function sendReport() {
    setEmailError("");
    if (!emailVal.ok) { setEmailStatus("error"); setEmailError(emailVal.message); return; }
    setEmailStatus("sending");
    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      /*
        The score travels with the email so it lands in the recipient's
        inbox and in the internal notification. It is a self-assessment and
        the API route clamps every field, so nothing here is authoritative.
        It exists so a follow-up can start from what the person answered.
      */
      const res = await fetch("/api/lead-capture", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "dpdp_exposure_report",
          email: emailVal.normalizedEmail,
          captchaToken,
          captchaAction: action,
          assessment: {
            overall: s.overall,
            band: s.band,
            categories: s.categoryScores.map((c) => ({ name: c.name, points: c.points, max: c.max })),
            gaps: s.gaps,
            flags: s.sdfFlag ? ["Significant data fiduciary designation may be worth a conversation, based on record volume or platform type."] : [],
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) { setEmailStatus("error"); setEmailError(json?.error || "Failed to send. Please try again."); return; }
      setEmailSent(true); setEmailStatus("idle"); setUnlocked(true);
      trackGenerateLead("dpdp_exposure_tool");
    } catch (err: unknown) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  const optionClass = (selected: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
      selected ? "bg-indigo-50 border-indigo-300 text-slate-900" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
    }`;

  const current = STEPS[step];

  // A step is complete when every question on it has been answered. The
  // last step also carries the two unscored profile questions.
  const stepComplete =
    current.questions.every((q) => data[q.key as ScoreKey] !== null) &&
    (!isLast || (data.volume !== null && data.largePlatform !== null));

  return (
    <>
      {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />}
      <div id="dpdp-assessment" className="scroll-mt-8">
        {!showResults && (
          <>
            <div className="flex items-center gap-1.5 mb-6">
              {STEPS.map((st, n) => (
                <div key={st.id} className="flex items-center gap-1.5 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${step >= n ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-400"}`}>
                    {st.id}
                  </div>
                  {n < STEPS.length - 1 && <div className={`h-0.5 flex-1 transition-colors ${step > n ? "bg-indigo-600" : "bg-slate-200"}`} />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{current.title}</h3>
              <p className="text-slate-500 text-sm mb-5">{current.intro}</p>

              <div className="space-y-5">
                {current.questions.map((q) => {
                  const key = q.key as ScoreKey;
                  const labels = ("labels" in q ? q.labels : ["Yes", "Partial", "No"]) as readonly string[];
                  return (
                    <div key={key}>
                      <p className="text-sm text-slate-700 mb-2 leading-relaxed">{q.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {(["yes", "partial", "no"] as const).map((val, i) => (
                          <label key={val} className={optionClass(data[key] === val)}>
                            <input
                              type="radio"
                              name={key}
                              value={val}
                              checked={data[key] === val}
                              onChange={() => set(key, val)}
                              className="accent-indigo-600 flex-shrink-0"
                            />
                            <span>{labels[i]}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {isLast && (
                  <div className="border-t border-slate-200 pt-5 space-y-5">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      These last two do not affect your score. Holding a lot of records is not a readiness
                      failure. They set a flag on whether significant data fiduciary designation is worth
                      a conversation.
                    </p>
                    <div>
                      <p className="text-sm text-slate-700 mb-2 leading-relaxed">
                        Roughly how many individuals&rsquo; personal data do you hold or process?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {([
                          { val: "under50k", label: "Under 50,000" },
                          { val: "50k_2m", label: "50,000 to 2 million" },
                          { val: "over2m", label: "Over 2 million" },
                        ] as const).map(({ val, label }) => (
                          <label key={val} className={optionClass(data.volume === val)}>
                            <input type="radio" name="volume" value={val} checked={data.volume === val} onChange={() => set("volume", val)} className="accent-indigo-600 flex-shrink-0" />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 mb-2 leading-relaxed">
                        Does your business involve large-scale platforms such as e-commerce, social or gaming functionality?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {([
                          { val: "yes", label: "Yes" },
                          { val: "partial", label: "In part" },
                          { val: "no", label: "No" },
                        ] as const).map(({ val, label }) => (
                          <label key={val} className={optionClass(data.largePlatform === val)}>
                            <input type="radio" name="largePlatform" value={val} checked={data.largePlatform === val} onChange={() => set("largePlatform", val)} className="accent-indigo-600 flex-shrink-0" />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-7">
                {step > 0
                  ? <button onClick={() => setStep((n) => n - 1)} className="px-5 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">Back</button>
                  : <div />}
                <div className="flex items-center gap-3">
                  {!stepComplete && <span className="text-xs text-slate-400">Answer every question to continue</span>}
                  {!isLast
                    ? <button onClick={() => setStep((n) => n + 1)} disabled={!stepComplete} className="px-6 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed">Next section</button>
                    : <button onClick={() => setShowResults(true)} disabled={!stepComplete} className="px-6 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed">See my exposure score</button>}
                </div>
              </div>
            </div>
          </>
        )}

        {showResults && (
          <div className="space-y-5">
            <div className={`rounded-2xl border p-6 text-center ${cfg.bg}`}>
              {unlocked ? (
                <div className="text-5xl font-black mb-1">
                  <span className={cfg.color}>{s.overall}</span>
                  <span className="text-slate-400 text-xl">/100</span>
                </div>
              ) : (
                <div className="text-5xl font-black mb-1 select-none" aria-hidden="true">
                  <span className="text-slate-300">&bull;&bull;</span>
                  <span className="text-slate-300 text-xl">/100</span>
                </div>
              )}
              <div className={`text-lg font-bold mb-2 ${cfg.color}`}>{s.band}</div>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">{cfg.desc}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900">Exposure by category</h3>
              {s.categoryScores.map(({ id, name, pct, points, max }) => {
                const color = pct >= 70 ? "#059669" : pct >= 40 ? "#D97706" : "#EF4444";
                return (
                  <div key={id} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{name}</span>
                      {unlocked
                        ? <span className="font-bold" style={{ color }}>{Math.round(points)} of {max}</span>
                        : <span className="font-bold text-slate-300">&mdash; of {max}</span>}
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: unlocked ? `${pct}%` : "0%", backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-slate-400 leading-relaxed">
                Weighting follows the penalty schedule rather than question count. Breach readiness and
                vendor accountability carry more because the ceilings behind them are higher.
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 mb-2">Start here</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Your weakest category is <strong>{s.weakest.name}</strong>
                {unlocked ? `, at ${Math.round(s.weakest.points)} of ${s.weakest.max}` : ""}. That is where
                the first block of work sits, unless something in the gap list below affects a system you
                cannot afford to get wrong.
              </p>
            </div>

            {unlocked && s.gaps.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-3">Your three biggest gaps</h3>
                <ul className="space-y-3">
                  {s.gaps.map((g, i) => (
                    <li key={i} className="flex gap-3 text-sm text-red-900 leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-200 text-red-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {unlocked && s.gaps.length === 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">No outright gaps</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Nothing scored a flat no. Look at the categories above that sit below full marks, because
                  partial credit usually means the thing is documented but not operating.
                </p>
              </div>
            )}

            {unlocked && s.sdfFlag && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">Significant data fiduciary: worth a conversation</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{SDF_NOTE}</p>
              </div>
            )}

            {!unlocked && (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">Still to come</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Your score out of 100, the points behind each of the six categories, and your three
                  biggest gaps named specifically rather than described in general terms. Enter a work
                  email below and it unlocks here and arrives in your inbox.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nothing is sent anywhere else and you can close this page without giving an email. The
                  band and the weakest category above are yours either way.
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900 mb-3">What you are working towards</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                The obligations behind every question above commence on 13 May 2027, at the eighteen month
                mark from the notification of the DPDP Rules 2025. November 2026 is the consent manager
                framework and is not your deadline, whatever else you have read. That leaves roughly eight
                months.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                One exemption worth raising if it applies to you. Where an Indian business processes the
                personal data of people outside India under a contract with a company outside India, most of
                the Act&rsquo;s obligations do not reach that work. If all your processing is outsourced
                delivery for an overseas client, your real exposure may be narrower than this score
                suggests. It is a boundary question rather than something a scored tool can settle.
              </p>
              <Link href="/regulatory-hub/dpdp-in-scope-and-timeline" className="text-sm font-semibold text-indigo-600 hover:underline">
                The three commencement phases, set out in full →
              </Link>
            </div>

            <div className="bg-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1">{unlocked ? "Result sent" : "Unlock your full result"}</h3>
              <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                {unlocked
                  ? "Your score, the category breakdown and your named gaps are now shown above and have been emailed to you, with a link to the full report."
                  : "Enter a work email to reveal your score, the category breakdown and your three biggest gaps. The same result goes to your inbox with a link to the full report covering the three commencement phases, the penalty schedule and the order to close gaps in."}
              </p>
              {emailSent ? (
                <p className="font-semibold text-center py-2">Unlocked, and on its way to your inbox.</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label htmlFor="dpdp-email" className="sr-only">Work email</label>
                    <input
                      id="dpdp-email" type="email" name="email" autoComplete="email"
                      placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                      onClick={sendReport}
                      disabled={!siteKey || !emailVal.ok || emailStatus === "sending"}
                      className="bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-indigo-50 whitespace-nowrap disabled:opacity-50"
                    >
                      {emailStatus === "sending" ? "Sending..." : "Show my result"}
                    </button>
                  </div>
                  {email && !emailVal.ok && <p className="text-sm text-indigo-200">{emailVal.message}</p>}
                  {emailStatus === "error" && emailError && <p className="text-sm text-indigo-200">{emailError}</p>}
                  {/*
                    Consent copy. An assessment collects answers as well as an
                    email, so the notice has to cover both. Saying what we do
                    with the answers is the part most tools skip.
                  */}
                  <p className="text-xs text-indigo-300 leading-relaxed">
                    We use your email to send this result and to follow up once. Your answers are
                    self-reported, are never shared or sold, and help us see which questions people
                    struggle with. Kept for 24 months. Ask for a copy or deletion any time at{" "}
                    <a href="/privacy/request" className="underline underline-offset-2 hover:text-white">
                      consult-ds.com/privacy/request
                    </a>
                    .
                  </p>
                  <p className="text-xs text-indigo-300">
                    {!siteKey ? "reCAPTCHA not configured." : "Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply."}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setShowResults(false); setStep(0); setData(DEFAULT); setEmail(""); setEmailSent(false); setUnlocked(false); setEmailStatus("idle"); setEmailError(""); }}
                className="flex-1 border border-slate-300 text-slate-600 text-sm font-medium py-3 rounded-xl hover:bg-slate-50"
              >
                Start over
              </button>
              <Link
                href="/meet?mins=30&subject=DPDP%20exposure%20assessment&src=dpdp-assessment"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-xl text-center"
              >
                Walk through this with someone
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
