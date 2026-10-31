/**
 * AI ROI calculator: inputs, defaults and the calculation.
 *
 * Shared by the calculator page (to show results) and the lead capture API
 * route (to recompute them before anything is emailed). The browser sends
 * inputs, never results, so an email can only ever carry numbers this
 * module produced. Brief 1, technology content plan, 30 October 2026.
 *
 * The model, per month:
 *   share handled  = min(1, planned adoption x multiplier)
 *   hours released = tasks x share x (minutes before - minutes with AI) / 60
 *   value          = hours x hourly cost x confidence
 *                  + tasks x share x (error rate before - with AI) x cost per error x confidence
 *                  + revenue lift x (share / planned adoption) x confidence
 *   recurring      = licences + tasks x share x usage cost
 *                  + tasks x share x review share x review minutes / 60 x hourly cost
 *                  + governance
 *   payback        = one-off cost / (value - recurring), "never" if not positive
 *   three years    = (value - recurring) x 36 - one-off cost
 *
 * Decision rules, stated on the page and in the article. Labels agreed by
 * Tejas 31 October 2026, replacing scale, fix and stop:
 *   Ready to scale    payback within 12 months at planned adoption, and
 *                     three-year net still positive at half adoption
 *   Needs work first  payback within 36 months at planned adoption, scale
 *                     test not met
 *   Not yet           otherwise
 */

export const CURRENCIES = ["INR", "USD", "GBP", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_LABELS: Record<Currency, string> = {
  INR: "INR (\u20b9)",
  USD: "USD ($)",
  GBP: "GBP (\u00a3)",
  EUR: "EUR (\u20ac)",
};

export type AiRoiInputs = {
  currency: Currency;
  useCase: string;
  process: string;
  tasksPerMonth: number;
  minutesBefore: number;
  errorRateBefore: number; // 0 to 1
  costPerError: number;
  hourlyCost: number;
  plannedAdoption: number; // 0 to 1
  minutesWithAi: number;
  errorRateWithAi: number; // 0 to 1
  revenueLift: number; // per month at planned adoption
  confTime: number; // 0 to 1
  confErrors: number; // 0 to 1
  confRevenue: number; // 0 to 1
  oneOffData: number;
  oneOffIntegration: number;
  oneOffChange: number;
  licences: number; // per month, fixed
  usagePerTask: number;
  reviewShare: number; // 0 to 1
  reviewMinutes: number;
  governance: number; // per month
};

/** The worked example in the article: first-line customer service email triage. */
export const DEFAULT_INPUTS: AiRoiInputs = {
  currency: "INR",
  useCase: "Email triage for first-line customer service",
  process: "Customer service inbox",
  tasksPerMonth: 6000,
  minutesBefore: 5,
  errorRateBefore: 0.04,
  costPerError: 400,
  hourlyCost: 600,
  plannedAdoption: 0.7,
  minutesWithAi: 2,
  errorRateWithAi: 0.01,
  revenueLift: 0,
  confTime: 0.6,
  confErrors: 0.7,
  confRevenue: 0.5,
  oneOffData: 400000,
  oneOffIntegration: 300000,
  oneOffChange: 150000,
  licences: 40000,
  usagePerTask: 0,
  reviewShare: 0.1,
  reviewMinutes: 1,
  governance: 10000,
};

export type Scenario = {
  multiplier: number;
  share: number;
  tasksHandled: number;
  hoursReleased: number;
  valueTime: number;
  valueErrors: number;
  valueRevenue: number;
  totalValue: number;
  costLicences: number;
  costUsage: number;
  costReview: number;
  costGovernance: number;
  totalRecurring: number;
  netMonthly: number;
  oneOff: number;
  paybackMonths: number | null; // null = never
  net3Years: number;
};

export type Decision = "Ready to scale" | "Needs work first" | "Not yet";

/**
 * What to do next, by result. Shown under the results and in the email.
 */
export const NEXT_STEPS: Record<Decision, { heading: string; body: string }> = {
  "Ready to scale": {
    heading: "Before you scale",
    body: "Scaling is where integration, ownership and support break. Before the rollout, agree who owns the process, how the AI connects to the systems it touches and how you will know if it stops working.",
  },
  "Needs work first": {
    heading: "What usually needs the work",
    body: "Usually one of three things. Adoption, because the team works around the tool. Data, because the inputs sit in systems that do not agree. Or ownership, because nobody is accountable for the result. The work is finding which one it is for this use case and what fixing it costs.",
  },
  "Not yet": {
    heading: "Not yet is still a useful result",
    body: "Keep the use case in your AI use case register with today's numbers and revisit it when costs fall or volume grows. Meanwhile, test the next idea on your list. The one that passes is often less ambitious and closer to a process you already measure.",
  },
};

/**
 * The limits of the estimate. Shown under the results and in the email,
 * each pointing at a question the calculator cannot answer on its own.
 */
export const ESTIMATE_LIMITS_HEADING = "What this estimate cannot tell you";
export const ESTIMATE_LIMITS: Array<{ title: string; text: string }> = [
  {
    title: "Whether your adoption figure is realistic.",
    text: "It is the number the result moves on most. Compare the planned and half planned columns to see how much rides on it.",
  },
  {
    title: "Whether your data will support it.",
    text: "Use cases that pass on paper often stall because the data sits in systems that do not agree.",
  },
  {
    title: "Whether this is the right use case to fund first.",
    text: "The calculator scores one idea. Most companies have several, and the order matters more than any single score.",
  },
  {
    title: "What the quote leaves out.",
    text: "Integration, the time people spend checking output and the cost of keeping it running after go live are the lines most often missing.",
  },
];

export type AiRoiResult = {
  half: Scenario;
  planned: Scenario;
  stretch: Scenario;
  decision: Decision;
  decisionReason: string;
};

const MAX_MONEY = 1e12;

function num(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function text(value: unknown, fallback: string, maxLength = 120): string {
  if (typeof value !== "string") return fallback;
  const t = value.replace(/\s+/g, " ").trim().slice(0, maxLength);
  return t || fallback;
}

/** Clamp anything that arrives from a browser into a valid set of inputs. */
export function sanitiseInputs(raw: unknown): AiRoiInputs {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = DEFAULT_INPUTS;
  const currency = CURRENCIES.includes(r.currency as Currency) ? (r.currency as Currency) : d.currency;
  return {
    currency,
    useCase: text(r.useCase, "AI use case"),
    process: text(r.process, "Not stated"),
    tasksPerMonth: num(r.tasksPerMonth, 0, 1e9, d.tasksPerMonth),
    minutesBefore: num(r.minutesBefore, 0, 100000, d.minutesBefore),
    errorRateBefore: num(r.errorRateBefore, 0, 1, d.errorRateBefore),
    costPerError: num(r.costPerError, 0, MAX_MONEY, d.costPerError),
    hourlyCost: num(r.hourlyCost, 0, MAX_MONEY, d.hourlyCost),
    plannedAdoption: num(r.plannedAdoption, 0, 1, d.plannedAdoption),
    minutesWithAi: num(r.minutesWithAi, 0, 100000, d.minutesWithAi),
    errorRateWithAi: num(r.errorRateWithAi, 0, 1, d.errorRateWithAi),
    revenueLift: num(r.revenueLift, 0, MAX_MONEY, d.revenueLift),
    confTime: num(r.confTime, 0, 1, d.confTime),
    confErrors: num(r.confErrors, 0, 1, d.confErrors),
    confRevenue: num(r.confRevenue, 0, 1, d.confRevenue),
    oneOffData: num(r.oneOffData, 0, MAX_MONEY, d.oneOffData),
    oneOffIntegration: num(r.oneOffIntegration, 0, MAX_MONEY, d.oneOffIntegration),
    oneOffChange: num(r.oneOffChange, 0, MAX_MONEY, d.oneOffChange),
    licences: num(r.licences, 0, MAX_MONEY, d.licences),
    usagePerTask: num(r.usagePerTask, 0, MAX_MONEY, d.usagePerTask),
    reviewShare: num(r.reviewShare, 0, 1, d.reviewShare),
    reviewMinutes: num(r.reviewMinutes, 0, 100000, d.reviewMinutes),
    governance: num(r.governance, 0, MAX_MONEY, d.governance),
  };
}

function scenario(i: AiRoiInputs, multiplier: number): Scenario {
  const share = Math.min(1, i.plannedAdoption * multiplier);
  const tasksHandled = i.tasksPerMonth * share;
  const hoursReleased = (tasksHandled * Math.max(0, i.minutesBefore - i.minutesWithAi)) / 60;
  const valueTime = hoursReleased * i.hourlyCost * i.confTime;
  const valueErrors =
    tasksHandled * Math.max(0, i.errorRateBefore - i.errorRateWithAi) * i.costPerError * i.confErrors;
  const valueRevenue =
    i.plannedAdoption > 0 ? i.revenueLift * (share / i.plannedAdoption) * i.confRevenue : 0;
  const totalValue = valueTime + valueErrors + valueRevenue;
  const costLicences = i.licences;
  const costUsage = tasksHandled * i.usagePerTask;
  const costReview = ((tasksHandled * i.reviewShare * i.reviewMinutes) / 60) * i.hourlyCost;
  const costGovernance = i.governance;
  const totalRecurring = costLicences + costUsage + costReview + costGovernance;
  const netMonthly = totalValue - totalRecurring;
  const oneOff = i.oneOffData + i.oneOffIntegration + i.oneOffChange;
  return {
    multiplier,
    share,
    tasksHandled,
    hoursReleased,
    valueTime,
    valueErrors,
    valueRevenue,
    totalValue,
    costLicences,
    costUsage,
    costReview,
    costGovernance,
    totalRecurring,
    netMonthly,
    oneOff,
    paybackMonths: netMonthly > 0 ? oneOff / netMonthly : null,
    net3Years: netMonthly * 36 - oneOff,
  };
}

export function computeAiRoi(inputs: AiRoiInputs): AiRoiResult {
  const half = scenario(inputs, 0.5);
  const planned = scenario(inputs, 1);
  const stretch = scenario(inputs, 1.5);
  const p = planned.paybackMonths;
  const money = (v: number) => formatMoney(v, inputs.currency);
  const plannedPayback = formatPayback(p);
  const halfPayback = formatPayback(half.paybackMonths);
  const halfAhead = half.net3Years > 0;
  const halfPaybackText =
    half.paybackMonths === null ? "it never pays back" : `payback ${halfPayback.toLowerCase()}`;
  let decision: Decision;
  let decisionReason: string;
  // The reason quotes the actual figures, so the 12 and 36 month lines read
  // as thresholds and never as the payback itself.
  if (p !== null && p <= 12 && halfAhead) {
    decision = "Ready to scale";
    decisionReason = `Pays back in ${plannedPayback} at planned adoption, inside the 12 month line for scaling. At half adoption it is still ${money(half.net3Years)} ahead over three years, so the case does not depend on everyone using it.`;
  } else if (p !== null && p <= 36) {
    decision = "Needs work first";
    const speed =
      p > 12
        ? `Pays back in ${plannedPayback} at planned adoption. That is inside the 36 month limit, so the use case is worth keeping, but slower than the 12 months needed to scale.`
        : `Pays back in ${plannedPayback} at planned adoption, fast enough to scale on that test alone.`;
    const adoption = halfAhead
      ? " It still comes out ahead at half adoption, so the work is on cost: reduce the one-off or running cost before spending more."
      : ` At half adoption it does not pay back within three years (${halfPaybackText}), so the case depends on people using it. Fix adoption, data or ownership before spending more.`;
    decisionReason = speed + adoption;
  } else {
    decision = "Not yet";
    const why =
      p === null
        ? "Does not pay back at planned adoption: the running cost is higher than the value it produces."
        : `Pays back in ${plannedPayback} at planned adoption, beyond the 36 month limit.`;
    decisionReason = `${why} Keep it in your AI use case register and revisit it when costs fall or volume grows.`;
  }
  return { half, planned, stretch, decision, decisionReason };
}

/** Money in the chosen currency. Rupees use Indian digit grouping. */
export function formatMoney(value: number, currency: Currency): string {
  const locale =
    currency === "INR" ? "en-IN" : currency === "GBP" ? "en-GB" : currency === "EUR" ? "en-IE" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPayback(months: number | null): string {
  if (months === null) return "Never";
  if (months > 120) return `About ${Math.round(months / 12)} years`;
  return `${months.toFixed(1)} months`;
}
