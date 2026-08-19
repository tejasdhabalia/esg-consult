/**
 * Industry pages.
 *
 * Derived from the internal industry and software map. Two rules carried
 * over from that document:
 *
 *   1. The fracture point is the only part worth publishing. The stack
 *      list is context, not a capability claim.
 *   2. Every page must be traceable to something actually seen. Name the
 *      employer and the pattern, never a client.
 *
 * `live: false` renders the industry as plain text rather than a link, so
 * the hub can show the full map of where we work without shipping thin
 * pages. Only flip a flag to true once the page has a real provenance
 * section. An industry page with nothing behind it is worse than no page.
 */

export type Industry = {
  route: string;
  label: string;
  /** One line for the hub card. The fracture point, not the sector name. */
  fracture: string;
  live: boolean;
};

export const industries: Industry[] = [
  {
    route: "/industries/retail-and-d2c",
    label: "Retail, D2C and consumer brands",
    fracture:
      "The website, the marketplace, the warehouse and the store each believe a different number.",
    live: true,
  },
  {
    route: "/industries/distribution-and-wholesale",
    label: "Distribution, wholesale and trading",
    fracture:
      "The business outgrew Tally years ago and the migration keeps getting deferred.",
    live: true,
  },
  {
    route: "/industries/discrete-manufacturing",
    label: "Discrete manufacturing and auto components",
    fracture:
      "Costing logic lives in a spreadsheet and the ERP is configured to a different version of the truth.",
    live: false,
  },
  {
    route: "/industries/process-manufacturing",
    label: "Process manufacturing, chemicals and food",
    fracture:
      "Recall readiness exists on paper and not in the system.",
    live: false,
  },
  {
    route: "/industries/pharma-and-life-sciences",
    label: "Pharma and life sciences",
    fracture:
      "Every change costs a qualification cycle, so nothing changes and the system ossifies.",
    live: false,
  },
  {
    route: "/industries/logistics-and-3pl",
    label: "Logistics and 3PL",
    fracture:
      "Contract terms are bespoke per client, the operations system does not carry them, and invoicing runs on spreadsheets.",
    live: false,
  },
  {
    route: "/industries/financial-services",
    label: "Financial services, NBFC and insurance",
    fracture:
      "The integration layer is older than the applications it connects and understood by three people.",
    live: false,
  },
  {
    route: "/industries/professional-services",
    label: "Professional services and accounting firms",
    fracture:
      "Project profitability is known a month after it stopped being fixable.",
    live: false,
  },
  {
    route: "/industries/healthcare-and-diagnostics",
    label: "Healthcare, hospitals and diagnostics",
    fracture:
      "Patient data flows across systems never designed to share it, now under DPDP obligations.",
    live: false,
  },
  {
    route: "/industries/real-estate-and-construction",
    label: "Real estate and construction",
    fracture:
      "Collections are tied to construction milestones living in a different tool, so cash forecasting is guesswork.",
    live: false,
  },
  {
    route: "/industries/education",
    label: "Education",
    fracture:
      "Admissions and the student record are separate systems, so nobody can attribute enrolment cost to outcome.",
    live: false,
  },
  {
    route: "/industries/it-services-and-saas",
    label: "IT services and SaaS",
    fracture:
      "A modern data stack that grew without a plan, and a quote to cash chain nobody owns end to end.",
    live: false,
  },
];

export const liveIndustries = industries.filter((industry) => industry.live);
