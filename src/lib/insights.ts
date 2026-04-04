export type SiteInsightItem = {
  slug: string;
  category: "Marketing" | "ESG";
  title: string;
  summary: string;
  topics: string[];
  audience: string;
  readTime: string;
  updated: string;
  updatedAt: string;
};

export const allInsights: SiteInsightItem[] = [
  {
    slug: "csrd-readiness-first-90-days",
    category: "ESG",
    title: "CSRD Readiness Checklist",
    summary:
      "A practical checklist for CFOs, CSOs, and leadership teams preparing for their first CSRD reporting cycle, from scoping and double materiality to data governance and assurance readiness.",
    topics: ["CSRD", "ESRS", "Double materiality", "Assurance readiness"],
    audience: "CFO, CSO, CEO, Legal",
    readTime: "12 min read",
    updated: "Mar 2026",
    updatedAt: "2026-03-11",
  },
  {
    slug: "crm-governance-checklist",
    category: "Marketing",
    title: "The CRM Governance SOP Template",
    summary:
      "A practitioner checklist for teams who are done with dirty data, broken dashboards, and pipeline numbers that do not match reality.",
    topics: ["CRM governance", "Data quality", "Definitions", "Change control"],
    audience: "RevOps, Sales Ops, Marketing Ops, CIO",
    readTime: "5 min read",
    updated: "Mar 2026",
    updatedAt: "2026-03-11",
  },
  {
    slug: "leaky-funnel-audit",
    category: "Marketing",
    title: "Leaky Funnel Audit Tool",
    summary:
      "An interactive audit to quantify funnel leakage and identify the highest-impact levers across MQL, SQL, win rate, and deal size.",
    topics: ["Funnel audit", "Conversion", "Pipeline", "Lead quality"],
    audience: "CMO, CRO, RevOps, CEO",
    readTime: "Interactive tool",
    updated: "Mar 2026",
    updatedAt: "2026-03-05",
  },
  {
    slug: "marketing-governance-model-for-automation",
    category: "Marketing",
    title: "The governance model behind marketing automation that actually scales",
    summary:
      "Why automation breaks as teams grow, and how to implement ownership, definitions, SLAs, and change control that protects performance.",
    topics: ["Governance", "Operating model", "SLAs", "Change control"],
    audience: "CMO, CRO, RevOps, CEO",
    readTime: "3 min read",
    updated: "Feb 2026",
    updatedAt: "2026-02-14",
  },
  {
    slug: "marketing-automation-maturity",
    category: "Marketing",
    title: "Marketing Automation Maturity Scorecard",
    summary:
      "Four sections. Sixteen questions. See where your marketing automation stands against top-quartile industry benchmarks and get a prioritised action plan.",
    topics: ["Maturity model", "Benchmarking", "Governance", "Attribution"],
    audience: "CMO, CRO, RevOps, Marketing Ops",
    readTime: "Interactive tool",
    updated: "Apr 2026",
    updatedAt: "2026-04-01",
  },
  {
    slug: "revenue-attribution-readiness",
    category: "Marketing",
    title: "Revenue Attribution Readiness Check",
    summary:
      "Can your marketing team prove its contribution to revenue? Three sections covering attribution model, data connectivity, and reporting. Includes a board-confidence rating.",
    topics: ["Attribution", "Revenue visibility", "CRM", "Finance alignment"],
    audience: "CMO, CFO, CRO, RevOps",
    readTime: "Interactive tool",
    updated: "Apr 2026",
    updatedAt: "2026-04-01",
  },
  {
    slug: "ai-marketing-readiness",
    category: "Marketing",
    title: "AI Marketing Readiness Assessment",
    summary:
      "Before your team buys an AI tool, find out whether your data, stack, and governance are ready for it. Covers lead scoring, personalisation, predictive analytics, and AI content use cases.",
    topics: ["AI readiness", "IBM watsonx", "Lead scoring", "Governance"],
    audience: "CMO, CTO, RevOps, Marketing Ops",
    readTime: "Interactive tool",
    updated: "Apr 2026",
    updatedAt: "2026-04-01",
  },
];

function sortByLatest(a: SiteInsightItem, b: SiteInsightItem) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export function getAllInsightsNewestFirst() {
  return [...allInsights].sort(sortByLatest);
}

export function getLatestInsights(limit = 3) {
  return getAllInsightsNewestFirst().slice(0, limit);
}