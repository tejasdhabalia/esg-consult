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
 * Decision rules, stated on the page and in the article:
 *   Scale  payback within 12 months at planned adoption, and three-year net
 *          still positive at half adoption
 *   Fix    payback within 36 months at planned adoption
 *   Stop   otherwise
 */

export const CURRENCIES = ["INR", "GBP", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

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

export type Decision = "Scale" | "Fix" | "Stop";

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
  let decision: Decision;
  let decisionReason: string;
  if (p !== null && p <= 12 && half.net3Years > 0) {
    decision = "Scale";
    decisionReason =
      "Pays back within 12 months at planned adoption, and stays ahead over three years at half that adoption.";
  } else if (p !== null && p <= 36) {
    decision = "Fix";
    decisionReason =
      "Pays back within 36 months at planned adoption but not at half. The case depends on people using it, so fix adoption, data or ownership before spending more.";
  } else {
    decision = "Stop";
    decisionReason =
      "Does not pay back within 36 months even at planned adoption. Record the decision in your AI use case register and move the budget to a use case that passes.";
  }
  return { half, planned, stretch, decision, decisionReason };
}

/** Money in the chosen currency. Rupees use Indian digit grouping. */
export function formatMoney(value: number, currency: Currency): string {
  const locale = currency === "INR" ? "en-IN" : currency === "GBP" ? "en-GB" : "en-US";
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
