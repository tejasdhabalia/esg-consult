export type ServiceLine = {
  /** Route under /services. Used for nav links and cards. */
  route: string;
  /** Short label for navigation and footer. */
  label: string;
  /** One or two sentences. Used on the home page and services hub cards. */
  summary: string;
  /** Three or four scope points. Used on the services hub. */
  bullets: string[];
  /**
   * Whether the page at `route` actually exists yet.
   * Non-live lines render as plain text instead of links, so nothing 404s.
   * Flip to true in Batch 2 as each page ships.
   */
  live: boolean;
};

export const serviceLines: ServiceLine[] = [
  {
    route: "/services/systems-selection",
    label: "Systems selection",
    summary:
      "We run the selection, you make the decision. Requirements, shortlist, scored comparison and the reasoning behind the score. You are the only party paying us.",
    bullets: [
      "Requirements tied to the decisions the business actually needs to make",
      "Scored vendor comparison you keep, not just the conclusion",
      "Demo scripts built around your processes rather than the vendor's",
      "Commercial and contract review before signature",
    ],
    live: true,
  },
  {
    route: "/services/implementation-oversight",
    label: "Implementation and delivery oversight",
    summary:
      "Someone on your side of the table while the implementation partner builds. We hold scope, test what was promised and surface problems while they are still cheap to fix.",
    bullets: [
      "Scope and change control measured against the original business case",
      "Independent test and acceptance criteria",
      "Delivery cadence, risk log and escalation the board can read",
      "Go-live readiness and handover into your team",
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
      "Middleware and iPaaS selection on the same independent basis",
      "Error handling, reconciliation and monitoring",
      "Data migration design and cutover planning",
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
    route: "/services/ai-in-operations",
    label: "AI in operations",
    summary:
      "Most AI work stalls between pilot and production. We scope where it earns its place, what data it needs and who is accountable when it gets something wrong.",
    bullets: [
      "Use case selection against measurable operational outcomes",
      "Data readiness and access design",
      "Usage policy, human review and accountability",
      "Pilot to production path with defined exit criteria",
    ],
    live: true,
  },
  {
    route: "/services/esg-advisory",
    label: "ESG and CSRD reporting systems",
    summary:
      "Reporting treated as a systems problem. Data ownership, controls and evidence trails, so disclosure becomes a report you run rather than a project you survive.",
    bullets: [
      "CSRD and ESRS scoping, double materiality and disclosure mapping",
      "SEBI BRSR, UK SECR and SRS reporting",
      "Data ownership model, validation rules and evidence trails",
      "Assurance readiness preparation. We do not provide assurance itself",
    ],
    live: true,
  },
];

/** Only the service lines whose pages exist. Safe to link. */
export const liveServiceLines = serviceLines.filter((line) => line.live);
