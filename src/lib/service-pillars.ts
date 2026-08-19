/**
 * Three pillars, with service lines beneath them.
 *
 * Replaces the flat list of six service lines. The pillars are how the firm
 * is described. The lines beneath are what gets sold and what has pages.
 *
 * `live` gates a link. False renders plain text instead, so the full
 * structure can be shown before every page exists. Never set it true for a
 * route that has no page, or the build ships a 404.
 */

export type ServiceLine = {
  route: string;
  label: string;
  summary: string;
  bullets: string[];
  live: boolean;
};

export type Pillar = {
  /** Pillar hub route. */
  route: string;
  /** Short name used in navigation. */
  label: string;
  /** Full name used as a page heading. */
  title: string;
  /** One sentence. What this pillar is for. */
  summary: string;
  /** The argument for why this sits in the same firm as the others. */
  rationale: string;
  lines: ServiceLine[];
  live: boolean;
};

export const pillars: Pillar[] = [
  {
    route: "/services/technology",
    label: "Technology",
    title: "Technology",
    summary:
      "The systems a company runs on, from the platform that takes the order to the reporting the board reads. Selection, build, integration and the governance around AI.",
    rationale:
      "This is the core of the firm. We have built these systems and we can read the business case behind them, which is the combination most technology projects are missing.",
    live: true,
    lines: [
      {
        route: "/services/commerce-and-digital-platforms",
        label: "Commerce and digital platforms",
        summary:
          "Websites, ecommerce and the systems behind them. We build the front end, and we fix what usually breaks behind it: inventory truth across channels, order flow into finance, and returns reconciliation.",
        bullets: [
          "Website and storefront design and build",
          "Ecommerce and D2C platform selection, build and replatforming",
          "Channel and marketplace integration, including quick commerce",
          "Inventory and order management across store, warehouse and online",
          "Returns reconciliation and margin recovery",
        ],
        live: true,
      },
      {
        route: "/services/erp-systems",
        label: "ERP systems",
        summary:
          "Selection, implementation and the oversight that keeps the build tied to the business case. From the Tally ceiling upward.",
        bullets: [
          "Requirements, scored vendor comparison and contract review",
          "Implementation delivery, or oversight of somebody else's",
          "Data migration, cutover and reconciliation",
          "Multi-entity, multi-warehouse and scheme management complexity",
        ],
        live: true,
      },
      {
        route: "/services/crm-and-revenue-operations",
        label: "CRM and revenue operations",
        summary:
          "Lifecycle definitions, CRM architecture and reporting that survives contact with the sales team. Built so the numbers in the board pack match the numbers in the system.",
        bullets: [
          "CRM data model, hygiene rules and change control",
          "Lifecycle stages, routing and service levels",
          "Revenue reporting and definitions governance",
          "Marketing automation build and handover to your team",
        ],
        live: true,
      },
      {
        route: "/services/integration",
        label: "Integration",
        summary:
          "Systems that pass data to each other without a person in the middle re-keying it. Interface design, middleware selection and the error handling nobody scopes until it breaks.",
        bullets: [
          "Interface mapping across ERP, CRM, finance and operational systems",
          "Middleware and iPaaS selection on an independent basis",
          "Error handling, reconciliation and monitoring",
          "Legacy estate integration, including message brokers and file transfer",
        ],
        live: true,
      },
      {
        route: "/services/ai-governance-and-adoption",
        label: "AI governance and adoption",
        summary:
          "Most AI work stalls between pilot and production, and most policies were written before anyone read the regulation. We handle both ends.",
        bullets: [
          "Use case selection against measurable operational outcomes",
          "Usage policy, human oversight and accountability",
          "Shadow AI discovery and approved tooling",
          "Regulatory obligations, including EU AI Act transparency duties",
        ],
        live: true,
      },
    ],
  },
  {
    route: "/services/sustainability",
    label: "Sustainability",
    title: "Sustainability and ESG reporting",
    summary:
      "Reporting treated as a systems problem. Data ownership, controls and evidence trails, so disclosure becomes a report you run rather than a project you survive.",
    rationale:
      "A disclosure is only as good as the system underneath it. This is a reporting systems practice, which is why it sits in a technology firm rather than beside one.",
    live: true,
    lines: [
      {
        route: "/services/esg-advisory",
        label: "ESG and CSRD reporting systems",
        summary:
          "CSRD and ESRS, SEBI BRSR, UK SECR and SRS. Scoping, double materiality and the data model that makes a number defensible when someone asks where it came from.",
        bullets: [
          "CSRD and ESRS scoping, double materiality and disclosure mapping",
          "SEBI BRSR, UK SECR and SRS reporting",
          "Data ownership model, validation rules and evidence trails",
          "Assurance readiness preparation. We do not provide assurance itself",
        ],
        live: true,
      },
    ],
  },
  {
    route: "/services/finance-and-accounting",
    label: "Finance and accounting",
    title: "Finance and accounting outsourcing",
    summary:
      "Offshore finance and accounting teams for companies that need capacity rather than another tool. Delivered with a partner firm, with us accountable for the systems the function runs in.",
    rationale:
      "Finance teams are where most system problems surface first. Running the function and running the systems underneath it in one place removes the handoff that usually loses both. Our partner here is a technology-agnostic offshoring firm, not a software vendor, so nothing about this arrangement changes what we recommend.",
    live: true,
    lines: [
      {
        route: "/partners/strategic-finance-partnership",
        label: "Strategic finance partnership",
        summary:
          "The existing partner programme for advisors and ecosystem partners working with CFOs and finance leaders.",
        bullets: [
          "Structured commercial model for advisors and ERP partners",
          "Offshore accounting team build and management",
          "Entry point at 10 or more employees, scaling toward 50",
        ],
        live: true,
      },
    ],
  },
];

/** Flattened list of every service line across all pillars. */
export const allServiceLines = pillars.flatMap((pillar) => pillar.lines);

/** Only lines whose pages exist. Safe to link. */
export const liveServiceLines = allServiceLines.filter((line) => line.live);
