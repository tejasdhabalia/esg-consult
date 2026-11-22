"use client";

import { useEffect, useRef, useState } from "react";
import { trackToolUse } from "@/lib/analytics";

/*
  Interactive ERP demo scorecard. Brief 7 (SEO project), 22 November 2026.
  Built from ERP-demo-scorecard-template.xlsx: same areas, default weights,
  scenarios, criteria, scale and formulas.

  - Scenario weight = area weight / number of scenarios in that area.
  - Points = score / 3 x weight. Total out of 100 per vendor.
  - No download, no email gate, no account. State lives in this browser
    only (localStorage, every access wrapped in try/catch).
  - Analytics: tool_use with tool_key erp-demo-scorecard, once on the first
    score this browser enters and once per print. Never generate_lead.
  - No vendor or product names anywhere in the tool.
*/

const STORAGE_KEY = "ds_erp_demo_scorecard_v1";
const TRACKED_KEY = "ds_erp_demo_scorecard_tracked";
const TOOL_KEY = "erp-demo-scorecard";

type Score = 0 | 1 | 2 | 3 | null;
type Scores = [Score, Score, Score];
type AreaId = "o2c" | "p2p" | "inv" | "fin" | "multi";

const AREAS: { id: AreaId; name: string; weight: number }[] = [
  { id: "o2c", name: "Order to cash", weight: 25 },
  { id: "p2p", name: "Procure to pay", weight: 20 },
  { id: "inv", name: "Inventory management", weight: 20 },
  { id: "fin", name: "Financial management and period close", weight: 20 },
  { id: "multi", name: "Multi-entity, multi-currency and local compliance", weight: 15 },
];

const SCALE: { score: 0 | 1 | 2 | 3; label: string; definition: string }[] = [
  {
    score: 0,
    label: "Not demonstrated",
    definition:
      "The vendor says it can be done but does not show it live. Roadmap items, \"we can configure that\" and promised partner development all score 0.",
  },
  {
    score: 1,
    label: "Partially demonstrated",
    definition: "Some of the process works, but important steps are missing or depend on manual workarounds.",
  },
  {
    score: 2,
    label: "Demonstrated with limitations",
    definition:
      "The end-to-end process works through configuration or a controlled workaround, with limitations or extra effort to note.",
  },
  {
    score: 3,
    label: "Fully demonstrated",
    definition: "The system completes the scenario on realistic data and shows the controls, records and outputs.",
  },
];

const FOLLOW_UP_TYPES = [
  "Not demonstrated",
  "Configuration or custom work",
  "Licence or third-party tool",
  "Upgrade impact",
  "Integration",
  "Reporting",
  "Support",
  "Implementation ownership",
];

type Scenario = { id: string; area: AreaId; name: string; show: string; scores: Scores; note: string };
type Criterion = { id: string; name: string; good: string; weight: number; scores: Scores; note: string };
type FollowUp = { id: string; vendor: 0 | 1 | 2; item: string; type: string; answered: boolean };

type State = {
  v: 1;
  vendors: [string, string, string];
  areaWeights: Record<AreaId, number>;
  scenarios: Scenario[];
  criteria: Criterion[];
  followUps: FollowUp[];
  decisions: { product: string; implementer: string; gaps: string };
};

const EMPTY: Scores = [null, null, null];

const DEFAULT_SCENARIOS: [AreaId, string, string][] = [
  ["o2c", "Partial shipment and backorder", "Customer orders 100 units, 70 are available. Dispatch 70, hold 30 as a backorder, invoice correctly and complete the balance later."],
  ["o2c", "Credit hold", "Customer exceeds the credit limit after ordering. Processing stops or is restricted, the right approval is triggered and the decision is recorded."],
  ["o2c", "Price change mid-order", "Price changes between order entry and invoice. Agreed commercial terms are kept and the audit trail shows what changed."],
  ["o2c", "Customer return", "Goods returned against an earlier invoice. Stock updated and the financial adjustment created."],
  ["p2p", "Partial goods receipt", "Supplier delivers part of a purchase order. Actual receipt recorded, balance kept open, over-invoicing blocked."],
  ["p2p", "Purchase order and invoice mismatch", "Invoice price or quantity differs from the purchase order and receipt. Discrepancy flagged and routed for approval."],
  ["p2p", "Approval threshold", "Purchase request above the requester's limit routes automatically to the right approver."],
  ["inv", "Stock transfer", "Goods move between locations. Goods in transit tracked and the balance at each location correct."],
  ["inv", "Stock adjustment", "Physical count differs from the system. Adjustment recorded with reason, approval and history."],
  ["inv", "Batch, serial or expiry tracking", "Trace an item from receipt through storage, movement and dispatch."],
  ["fin", "Return against a closed period", "Adjustment for a closed period handled without silently reopening or changing history."],
  ["fin", "Late supplier invoice", "Invoice arrives after period end for goods already received. Accounting, approvals and reporting correct."],
  ["fin", "Reconciliation and audit trail", "Trace a balance to its transactions and show who changed a record and when."],
  ["multi", "Foreign currency receipt", "Customer pays in another currency. Receipt recorded and exchange difference calculated."],
  ["multi", "Intercompany transaction", "Transaction between two group entities recorded on both sides and visible in group reporting."],
  ["multi", "Local tax and e-invoicing", "For each country you trade in: tax calculation, the e-invoice or statutory output and the related report (for example GST e-invoicing in India, VAT e-invoicing in Europe and the Middle East, sales tax in the Americas)."],
];

const DEFAULT_CRITERIA: [string, string, number][] = [
  ["Understanding of our processes", "Plays back your scenarios and exceptions accurately without prompting.", 20],
  ["Quality of answers", "Direct answers, says what is standard, configured or custom, admits limits.", 10],
  ["Proposed implementation approach", "Clear phases, data migration plan, testing on your data, realistic timeline.", 20],
  ["Named delivery team", "The people who will configure, migrate and integrate are named and have done similar projects at your size.", 20],
  ["Risk handling", "Names the risks in your project unprompted and says how they will be managed.", 15],
  ["Support after go-live", "Clear split of vendor and implementer support, escalation path and month-end cover.", 15],
];

function defaultState(): State {
  return {
    v: 1,
    vendors: ["Vendor A", "Vendor B", "Vendor C"],
    areaWeights: Object.fromEntries(AREAS.map((a) => [a.id, a.weight])) as Record<AreaId, number>,
    scenarios: DEFAULT_SCENARIOS.map(([area, name, show], i) => ({
      id: `s${i + 1}`,
      area,
      name,
      show,
      scores: [...EMPTY] as Scores,
      note: "",
    })),
    criteria: DEFAULT_CRITERIA.map(([name, good, weight], i) => ({
      id: `c${i + 1}`,
      name,
      good,
      weight,
      scores: [...EMPTY] as Scores,
      note: "",
    })),
    followUps: [],
    decisions: { product: "", implementer: "", gaps: "" },
  };
}

function isScore(x: unknown): x is Score {
  return x === null || x === 0 || x === 1 || x === 2 || x === 3;
}

function reviveScores(x: unknown): Scores {
  return Array.isArray(x) && x.length === 3 && x.every(isScore) ? (x as Scores) : ([...EMPTY] as Scores);
}

/** Accept a saved state only if its shape is what this version expects. */
function revive(raw: unknown): State | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<State>;
  if (r.v !== 1 || !Array.isArray(r.scenarios) || !Array.isArray(r.criteria)) return null;
  const d = defaultState();
  const areaIds = AREAS.map((a) => a.id);
  return {
    v: 1,
    vendors:
      Array.isArray(r.vendors) && r.vendors.length === 3
        ? (r.vendors.map((v) => String(v ?? "")) as [string, string, string])
        : d.vendors,
    areaWeights: Object.fromEntries(
      AREAS.map((a) => [a.id, Number(r.areaWeights?.[a.id] ?? a.weight) || 0]),
    ) as Record<AreaId, number>,
    scenarios: r.scenarios
      .filter((s) => s && areaIds.includes(s.area))
      .map((s) => ({
        id: String(s.id),
        area: s.area,
        name: String(s.name ?? ""),
        show: String(s.show ?? ""),
        scores: reviveScores(s.scores),
        note: String(s.note ?? ""),
      })),
    criteria: r.criteria.map((c, i) => ({
      id: String(c.id ?? `c${i + 1}`),
      name: String(c.name ?? ""),
      good: String(c.good ?? ""),
      weight: Number(c.weight) || 0,
      scores: reviveScores(c.scores),
      note: String(c.note ?? ""),
    })),
    followUps: Array.isArray(r.followUps)
      ? r.followUps.map((f) => ({
          id: String(f.id),
          vendor: ([0, 1, 2].includes(f.vendor) ? f.vendor : 0) as 0 | 1 | 2,
          item: String(f.item ?? ""),
          type: FOLLOW_UP_TYPES.includes(f.type) ? f.type : FOLLOW_UP_TYPES[0],
          answered: Boolean(f.answered),
        }))
      : [],
    decisions: {
      product: String(r.decisions?.product ?? ""),
      implementer: String(r.decisions?.implementer ?? ""),
      gaps: String(r.decisions?.gaps ?? ""),
    },
  };
}

function uid(prefix: string) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** One decimal place, as the spreadsheet shows. */
function one(n: number) {
  return (Math.round(n * 10) / 10).toFixed(1);
}

function points(score: Score, weight: number) {
  return score === null ? null : (score / 3) * weight;
}

const TABS = ["Setup", "Product scorecard", "Implementer scorecard", "Summary", "Follow-ups"] as const;

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none";

function ScoreButtons({
  value,
  onChange,
  label,
}: {
  value: Score;
  onChange: (s: Score) => void;
  label: string;
}) {
  return (
    <div className="flex gap-1.5" role="group" aria-label={label}>
      {SCALE.map(({ score, label: scaleLabel, definition }) => {
        const selected = value === score;
        const style = selected
          ? score === 0
            ? "bg-red-600 border-red-600 text-white"
            : "bg-indigo-600 border-indigo-600 text-white"
          : "bg-white border-slate-300 text-slate-700 hover:border-indigo-400";
        return (
          <button
            key={score}
            type="button"
            title={`${score}: ${scaleLabel}. ${definition}`}
            aria-label={`${score}, ${scaleLabel}`}
            aria-pressed={selected}
            onClick={() => onChange(selected ? null : score)}
            className={`h-9 w-9 rounded-lg border text-sm font-semibold transition ${style}`}
          >
            {score}
          </button>
        );
      })}
    </div>
  );
}

function ScaleLegend() {
  return (
    <details open className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
      <summary className="cursor-pointer font-semibold text-slate-900">What the scores mean</summary>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        {SCALE.map((s) => (
          <div key={s.score}>
            <dt className="font-semibold text-slate-900">
              <span
                className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white ${
                  s.score === 0 ? "bg-red-600" : "bg-indigo-600"
                }`}
              >
                {s.score}
              </span>
              {s.label}
            </dt>
            <dd className="mt-1 text-slate-600">{s.definition}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-slate-600">Tap a selected score again to clear it.</p>
    </details>
  );
}

function WeightCheck({ total, okText, warnText }: { total: number; okText: string; warnText: string }) {
  const ok = Math.round(total * 10) / 10 === 100;
  return (
    <p
      className={`rounded-lg px-3 py-2 text-sm font-medium ${
        ok ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
      }`}
      role="status"
    >
      Total {one(total)}. {ok ? okText : warnText}
    </p>
  );
}

export default function ErpDemoScorecard() {
  const [state, setState] = useState<State>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState(0);
  const [activeVendor, setActiveVendor] = useState<0 | 1 | 2>(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [newScenario, setNewScenario] = useState<{ area: AreaId; name: string; show: string }>({
    area: "o2c",
    name: "",
    show: "",
  });
  const tracked = useRef(false);

  // Load once, after mount, so the server render and the first client render match.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const revived = revive(JSON.parse(raw));
        if (revived) setState(revived);
      }
      tracked.current = localStorage.getItem(TRACKED_KEY) === "1";
    } catch {
      // Storage unavailable: the tool works for this visit only.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Not essential.
    }
  }, [state, loaded]);

  function noteFirstScore() {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUse(TOOL_KEY, "first_score");
    try {
      localStorage.setItem(TRACKED_KEY, "1");
    } catch {
      // Not essential.
    }
  }

  function update(fn: (s: State) => State) {
    setState((prev) => fn(prev));
  }

  // ---- calculations -------------------------------------------------------
  const areaCounts = Object.fromEntries(
    AREAS.map((a) => [a.id, state.scenarios.filter((s) => s.area === a.id).length]),
  ) as Record<AreaId, number>;
  const areaTotal = AREAS.reduce((sum, a) => sum + state.areaWeights[a.id], 0);
  const scenarioWeight = (s: Scenario) =>
    areaCounts[s.area] > 0 ? state.areaWeights[s.area] / areaCounts[s.area] : 0;
  const scenarioWeightTotal = state.scenarios.reduce((sum, s) => sum + scenarioWeight(s), 0);
  const emptyAreas = AREAS.filter((a) => areaCounts[a.id] === 0 && state.areaWeights[a.id] > 0);

  const product = [0, 1, 2].map((v) => ({
    total: state.scenarios.reduce((sum, s) => sum + (points(s.scores[v], scenarioWeight(s)) ?? 0), 0),
    zeros: state.scenarios.filter((s) => s.scores[v] === 0).length,
    ones: state.scenarios.filter((s) => s.scores[v] === 1).length,
    scored: state.scenarios.filter((s) => s.scores[v] !== null).length,
  }));
  const criteriaWeightTotal = state.criteria.reduce((sum, c) => sum + c.weight, 0);
  const implementer = [0, 1, 2].map((v) =>
    state.criteria.reduce((sum, c) => sum + (points(c.scores[v], c.weight) ?? 0), 0),
  );

  const vendorName = (v: number) => state.vendors[v].trim() || `Vendor ${"ABC"[v]}`;

  // ---- actions ------------------------------------------------------------
  function setScenarioScore(id: string, v: number, score: Score) {
    if (score !== null) noteFirstScore();
    update((s) => ({
      ...s,
      scenarios: s.scenarios.map((sc) =>
        sc.id === id ? { ...sc, scores: sc.scores.map((x, i) => (i === v ? score : x)) as Scores } : sc,
      ),
    }));
  }

  function setCriterionScore(id: string, v: number, score: Score) {
    if (score !== null) noteFirstScore();
    update((s) => ({
      ...s,
      criteria: s.criteria.map((c) =>
        c.id === id ? { ...c, scores: c.scores.map((x, i) => (i === v ? score : x)) as Scores } : c,
      ),
    }));
  }

  function editScenario(id: string, patch: Partial<Scenario>) {
    update((s) => ({ ...s, scenarios: s.scenarios.map((sc) => (sc.id === id ? { ...sc, ...patch } : sc)) }));
  }

  function addScenario() {
    if (!newScenario.name.trim()) return;
    update((s) => ({
      ...s,
      scenarios: [
        ...s.scenarios,
        {
          id: uid("s"),
          area: newScenario.area,
          name: newScenario.name.trim(),
          show: newScenario.show.trim(),
          scores: [...EMPTY] as Scores,
          note: "",
        },
      ],
    }));
    setNewScenario({ area: newScenario.area, name: "", show: "" });
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Not essential.
    }
    setState(defaultState());
    setConfirmReset(false);
    setTab(0);
  }

  function print() {
    trackToolUse(TOOL_KEY, "print");
    window.print();
  }

  // ---- shared pieces ------------------------------------------------------
  const vendorSwitcher = (
    <div className="flex gap-2 md:hidden no-print" role="tablist" aria-label="Vendor to score">
      {[0, 1, 2].map((v) => (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={activeVendor === v}
          onClick={() => setActiveVendor(v as 0 | 1 | 2)}
          className={`flex-1 truncate rounded-lg border px-3 py-2 text-sm font-semibold ${
            activeVendor === v
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white text-slate-700"
          }`}
        >
          {vendorName(v)}
        </button>
      ))}
    </div>
  );

  const vendorCellClass = (v: number) => `${activeVendor === v ? "block" : "hidden"} md:block print:block`;
  const panelClass = (i: number) => `${tab === i ? "block" : "hidden"} print:block space-y-6`;
  const printTitle = (i: number) => (
    <h3 className="hidden print:block text-xl font-bold text-slate-900">{TABS[i]}</h3>
  );

  return (
    <div id="erp-scorecard" className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #erp-scorecard, #erp-scorecard * { visibility: visible; }
          #erp-scorecard { position: absolute; left: 0; top: 0; width: 100%; border: 0; }
          #erp-scorecard .no-print { display: none !important; }
          #erp-scorecard .scorecard-panel { break-inside: auto; page-break-before: always; }
          #erp-scorecard .scorecard-panel:first-of-type { page-break-before: auto; }
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex min-w-0 max-w-full gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Scorecard sections">
          {TABS.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${
                tab === i ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={print}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-400"
          >
            Print
          </button>
          {confirmReset ? (
            <span className="flex items-center gap-2 text-sm">
              <span className="text-slate-700">Clear every entry?</span>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg bg-red-600 px-3 py-2 font-semibold text-white"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-red-400"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 no-print">
        Your entries are saved in this browser only. Nothing is sent to us.
      </p>

      <div className="mt-6">
        {/* SETUP */}
        <section className={`${panelClass(0)} scorecard-panel`}>
          {printTitle(0)}
          <p className="text-slate-600">Agree all of this before the first demo.</p>
          <div>
            <h4 className="font-semibold text-slate-900">Vendors</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((v) => (
                <label key={v} className="block">
                  <span className="text-sm text-slate-600">Vendor {"ABC"[v]} name</span>
                  <input
                    className={`${inputClass} mt-1`}
                    value={state.vendors[v]}
                    maxLength={40}
                    onChange={(e) =>
                      update((s) => ({
                        ...s,
                        vendors: s.vendors.map((x, i) => (i === v ? e.target.value : x)) as [string, string, string],
                      }))
                    }
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Evaluation areas</h4>
            <p className="mt-1 text-sm text-slate-500">
              Illustrative weights only. Set yours with finance, operations and IT.
            </p>
            <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200">
              {AREAS.map((a) => (
                <label key={a.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-slate-800">{a.name}</span>
                  <span className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      inputMode="numeric"
                      aria-label={`Weight for ${a.name}`}
                      className={`${inputClass} w-20 text-right`}
                      value={state.areaWeights[a.id]}
                      onChange={(e) =>
                        update((s) => ({
                          ...s,
                          areaWeights: { ...s.areaWeights, [a.id]: Math.max(0, Number(e.target.value) || 0) },
                        }))
                      }
                    />
                    <span className="text-sm text-slate-500">points</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-3">
              <WeightCheck total={areaTotal} okText="OK" warnText="Area weights must total 100." />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Each scenario&apos;s weight is its area weight shared equally across the scenarios in that
              area. Change an area weight here, or add and remove scenarios, and the scenario weights
              update.
            </p>
          </div>
        </section>

        {/* PRODUCT SCORECARD */}
        <section className={`${panelClass(1)} scorecard-panel`}>
          {printTitle(1)}
          <p className="text-slate-600">Score only what is shown live. Not shown = 0.</p>
          <div className="no-print">
            <ScaleLegend />
          </div>
          <WeightCheck
            total={scenarioWeightTotal}
            okText="Scenario weights OK."
            warnText={
              emptyAreas.length > 0
                ? `Add a scenario to ${emptyAreas.map((a) => a.name.toLowerCase()).join(" and ")}, or set its weight to 0 on Setup.`
                : "Check the area weights on Setup."
            }
          />
          {vendorSwitcher}

          {AREAS.map((a) => {
            const items = state.scenarios.filter((s) => s.area === a.id);
            return (
              <div key={a.id} className="space-y-3">
                <h4 className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-900">{a.name}</span>
                  <span className="text-xs text-slate-500">
                    {state.areaWeights[a.id]} points across {items.length} scenario{items.length === 1 ? "" : "s"}
                  </span>
                </h4>
                {items.length === 0 && <p className="text-sm text-slate-500">No scenarios in this area.</p>}
                {items.map((sc) => {
                  const w = scenarioWeight(sc);
                  return (
                    <div key={sc.id} className="rounded-xl border border-slate-200 p-4 break-inside-avoid">
                      <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                        <input
                          aria-label="Scenario"
                          className="min-w-0 basis-full rounded-md border border-transparent px-1 py-0.5 font-semibold text-slate-900 hover:border-slate-200 focus:border-indigo-500 focus:outline-none sm:flex-1 sm:basis-auto"
                          value={sc.name}
                          onChange={(e) => editScenario(sc.id, { name: e.target.value })}
                        />
                        <span className="whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                          Weight {one(w)}
                        </span>
                        <button
                          type="button"
                          aria-label={`Delete scenario ${sc.name}`}
                          onClick={() =>
                            update((s) => ({ ...s, scenarios: s.scenarios.filter((x) => x.id !== sc.id) }))
                          }
                          className="no-print rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-red-50 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                      <label className="mt-2 block">
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          What the vendor must show live
                        </span>
                        <textarea
                          rows={3}
                          className="mt-1 w-full resize-y rounded-md border border-slate-200 px-2 py-1.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none md:h-16"
                          value={sc.show}
                          onChange={(e) => editScenario(sc.id, { show: e.target.value })}
                        />
                      </label>
                      <label className="mt-2 flex items-center gap-2 text-xs text-slate-500 no-print">
                        Area
                        <select
                          className="min-w-0 max-w-full flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 sm:flex-none"
                          value={sc.area}
                          onChange={(e) => editScenario(sc.id, { area: e.target.value as AreaId })}
                        >
                          {AREAS.map((x) => (
                            <option key={x.id} value={x.id}>{x.name}</option>
                          ))}
                        </select>
                      </label>
                      <div className="mt-3 grid gap-3 md:grid-cols-3">
                        {[0, 1, 2].map((v) => {
                          const p = points(sc.scores[v], w);
                          return (
                            <div key={v} className={`${vendorCellClass(v)} rounded-lg bg-slate-50 p-3`}>
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate text-sm font-semibold text-slate-800">{vendorName(v)}</span>
                                <span className="text-xs text-slate-500">
                                  {p === null ? "Not scored" : `${one(p)} points`}
                                </span>
                              </div>
                              <div className="mt-2">
                                <ScoreButtons
                                  label={`${vendorName(v)} score for ${sc.name}`}
                                  value={sc.scores[v]}
                                  onChange={(score) => setScenarioScore(sc.id, v, score)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <input
                        aria-label={`Notes and evidence for ${sc.name}`}
                        placeholder="Notes and evidence"
                        className={`${inputClass} mt-3`}
                        value={sc.note}
                        onChange={(e) => editScenario(sc.id, { note: e.target.value })}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div className="rounded-xl border border-dashed border-slate-300 p-4 no-print">
            <h4 className="font-semibold text-slate-900">Add your own exception</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr]">
              <label className="block">
                <span className="text-sm text-slate-600">Area</span>
                <select
                  className={`${inputClass} mt-1`}
                  value={newScenario.area}
                  onChange={(e) => setNewScenario({ ...newScenario, area: e.target.value as AreaId })}
                >
                  {AREAS.map((x) => (
                    <option key={x.id} value={x.id}>{x.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-600">Scenario</span>
                <input
                  className={`${inputClass} mt-1`}
                  value={newScenario.name}
                  onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm text-slate-600">What the vendor must show live</span>
                <input
                  className={`${inputClass} mt-1`}
                  value={newScenario.show}
                  onChange={(e) => setNewScenario({ ...newScenario, show: e.target.value })}
                />
              </label>
            </div>
            <button
              type="button"
              onClick={addScenario}
              disabled={!newScenario.name.trim()}
              className="mt-3 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-50"
            >
              Add scenario
            </button>
          </div>

          <div className="rounded-xl bg-indigo-50 p-4">
            <h4 className="font-semibold text-slate-900">Product totals</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((v) => (
                <div key={v} className="rounded-lg bg-white p-3">
                  <div className="truncate text-sm font-semibold text-slate-800">{vendorName(v)}</div>
                  <div className="mt-1 text-sm text-red-700">Scored 0 (not shown): {product[v].zeros}</div>
                  <div className="text-sm text-slate-700">Scored 1 (partial): {product[v].ones}</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">
                    {one(product[v].total)}
                    <span className="text-sm font-medium text-slate-500"> / 100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPLEMENTER SCORECARD */}
        <section className={`${panelClass(2)} scorecard-panel`}>
          {printTitle(2)}
          <p className="text-slate-600">Score the people who will deliver the project, not the presenter.</p>
          <WeightCheck
            total={criteriaWeightTotal}
            okText="Weights OK."
            warnText="Criterion weights must total 100."
          />
          {vendorSwitcher}
          {state.criteria.map((c) => (
            <div key={c.id} className="rounded-xl border border-slate-200 p-4 break-inside-avoid">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <p className="mt-1 text-sm text-slate-600">{c.good}</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-500">
                  Weight
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    inputMode="numeric"
                    aria-label={`Weight for ${c.name}`}
                    className="w-16 rounded-md border border-slate-300 px-2 py-1 text-right text-sm text-slate-900"
                    value={c.weight}
                    onChange={(e) =>
                      update((s) => ({
                        ...s,
                        criteria: s.criteria.map((x) =>
                          x.id === c.id ? { ...x, weight: Math.max(0, Number(e.target.value) || 0) } : x,
                        ),
                      }))
                    }
                  />
                </label>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {[0, 1, 2].map((v) => {
                  const p = points(c.scores[v], c.weight);
                  return (
                    <div key={v} className={`${vendorCellClass(v)} rounded-lg bg-slate-50 p-3`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-slate-800">{vendorName(v)}</span>
                        <span className="text-xs text-slate-500">{p === null ? "Not scored" : `${one(p)} points`}</span>
                      </div>
                      <div className="mt-2">
                        <ScoreButtons
                          label={`${vendorName(v)} score for ${c.name}`}
                          value={c.scores[v]}
                          onChange={(score) => setCriterionScore(c.id, v, score)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <input
                aria-label={`Notes and evidence for ${c.name}`}
                placeholder="Notes and evidence"
                className={`${inputClass} mt-3`}
                value={c.note}
                onChange={(e) =>
                  update((s) => ({
                    ...s,
                    criteria: s.criteria.map((x) => (x.id === c.id ? { ...x, note: e.target.value } : x)),
                  }))
                }
              />
            </div>
          ))}
          <div className="rounded-xl bg-indigo-50 p-4">
            <h4 className="font-semibold text-slate-900">Implementer totals</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((v) => (
                <div key={v} className="rounded-lg bg-white p-3">
                  <div className="truncate text-sm font-semibold text-slate-800">{vendorName(v)}</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">
                    {one(implementer[v])}
                    <span className="text-sm font-medium text-slate-500"> / 100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className={`${panelClass(3)} scorecard-panel`}>
          {printTitle(3)}
          <p className="text-slate-600">
            Two decisions: the product and the implementer. Read the gaps before the totals.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-3 pr-3 font-medium text-slate-500">Measure</th>
                  {[0, 1, 2].map((v) => (
                    <th key={v} className="py-3 pr-3 font-semibold text-slate-900">{vendorName(v)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <th scope="row" className="py-3 pr-3 font-medium text-slate-900">Product scenarios scored 0 (not shown)</th>
                  {[0, 1, 2].map((v) => (
                    <td key={v} className={`py-3 pr-3 text-lg font-bold ${product[v].zeros > 0 ? "text-red-700" : "text-slate-900"}`}>
                      {product[v].zeros}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <th scope="row" className="py-3 pr-3 font-medium text-slate-900">Product scenarios scored 1 (partial)</th>
                  {[0, 1, 2].map((v) => (
                    <td key={v} className="py-3 pr-3 text-lg font-bold text-slate-900">{product[v].ones}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <th scope="row" className="py-3 pr-3 font-medium text-slate-900">Product score (out of 100)</th>
                  {[0, 1, 2].map((v) => (
                    <td key={v} className="py-3 pr-3 text-lg font-bold text-slate-900">{one(product[v].total)}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200">
                  <th scope="row" className="py-3 pr-3 font-medium text-slate-900">Implementer score (out of 100)</th>
                  {[0, 1, 2].map((v) => (
                    <td key={v} className="py-3 pr-3 text-lg font-bold text-slate-900">{one(implementer[v])}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
            A high total can hide a weak score on a critical scenario. Check every 0 and 1 before deciding.
          </p>
          <div className="grid gap-4">
            {(
              [
                ["product", "Preferred product"],
                ["implementer", "Preferred implementer"],
                ["gaps", "Critical gaps to close before signing"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="text-sm font-medium text-slate-800">{label}</span>
                <textarea
                  rows={key === "gaps" ? 4 : 2}
                  className={`${inputClass} mt-1`}
                  value={state.decisions[key]}
                  onChange={(e) =>
                    update((s) => ({ ...s, decisions: { ...s.decisions, [key]: e.target.value } }))
                  }
                />
              </label>
            ))}
          </div>
        </section>

        {/* FOLLOW-UPS */}
        <section className={`${panelClass(4)} scorecard-panel`}>
          {printTitle(4)}
          <p className="text-slate-600">
            Everything not shown, every limitation and every promise, answered in writing.
          </p>
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
            Written answers never change a live score.
          </p>
          {state.followUps.length === 0 && <p className="text-sm text-slate-500">No follow-ups yet.</p>}
          <div className="space-y-3">
            {state.followUps.map((f) => {
              const patch = (p: Partial<FollowUp>) =>
                update((s) => ({ ...s, followUps: s.followUps.map((x) => (x.id === f.id ? { ...x, ...p } : x)) }));
              return (
                <div key={f.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-[10rem_1fr_14rem_auto] break-inside-avoid">
                  <label className="block">
                    <span className="text-xs text-slate-500">Vendor</span>
                    <select
                      className={`${inputClass} mt-1`}
                      value={f.vendor}
                      onChange={(e) => patch({ vendor: Number(e.target.value) as 0 | 1 | 2 })}
                    >
                      {[0, 1, 2].map((v) => (
                        <option key={v} value={v}>{vendorName(v)}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-500">Item not shown, limitation or promise</span>
                    <input className={`${inputClass} mt-1`} value={f.item} onChange={(e) => patch({ item: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-500">Type</span>
                    <select className={`${inputClass} mt-1`} value={f.type} onChange={(e) => patch({ type: e.target.value })}>
                      {FOLLOW_UP_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <div className="flex items-end justify-between gap-3 md:flex-col md:items-end">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={f.answered}
                        onChange={(e) => patch({ answered: e.target.checked })}
                        className="h-4 w-4 accent-indigo-600"
                      />
                      Written answer received
                    </label>
                    <button
                      type="button"
                      onClick={() => update((s) => ({ ...s, followUps: s.followUps.filter((x) => x.id !== f.id) }))}
                      className="no-print text-sm text-slate-400 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              update((s) => ({
                ...s,
                followUps: [
                  ...s.followUps,
                  { id: uid("f"), vendor: 0, item: "", type: FOLLOW_UP_TYPES[0], answered: false },
                ],
              }))
            }
            className="no-print rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-400"
          >
            Add follow-up
          </button>
        </section>
      </div>
    </div>
  );
}
