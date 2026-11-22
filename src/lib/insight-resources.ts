export type InsightResourceKey =
  | "net_zero_roadmap"
  | "climate_risk_register"
  | "scope3_supplier_pack"
  | "cdp_planning_pack"
  | "ecovadis_evidence_matrix"
  | "steering_committee_charter"
  | "esg_tender_question_bank"
  | "ai_use_case_register"
  | "nist_ai_rmf_profile"
  | "erp_demo_scorecard";

export type InsightResource = {
  key: InsightResourceKey;
  title: string;
  shortLabel: string;
  description: string;
  filePath: string;
  fileName: string;
  attachmentName: string;
  accentHex: string;
  notifySubject: string;
  /**
   * Links in the delivery email. Without them the email falls back to the
   * ESG links, which only suit the sustainability resources.
   */
  emailLinks?: { label: string; href: string; desc: string }[];
  /** Sentence after the description in the delivery email. */
  emailUseLine?: string;
};

const AI_EMAIL_LINKS = [
  { label: "AI ROI calculator", href: "https://www.consult-ds.com/insights/ai-roi-calculator", desc: "Check whether an AI use case pays back" },
  { label: "AI use case register", href: "https://www.consult-ds.com/insights/ai-use-case-register", desc: "Know what AI you run and who owns it" },
  { label: "AI governance and adoption", href: "https://www.consult-ds.com/services/ai-governance-and-adoption", desc: "How we help put AI to work safely" },
];

export const insightResources: Record<InsightResourceKey, InsightResource> = {
  net_zero_roadmap: {
    key: "net_zero_roadmap",
    title: "Net zero roadmap starter workbook",
    shortLabel: "workbook",
    description:
      "A practical workbook covering baseline, hotspot mapping, target-setting decisions, workstream ownership, and the first 12 months of delivery planning.",
    filePath: "/downloads/net-zero-roadmap-starter-workbook.pdf",
    fileName: "net-zero-roadmap-starter-workbook.pdf",
    attachmentName: "DS-Consulting-Net-Zero-Roadmap-Starter-Workbook.pdf",
    accentHex: "#059669",
    notifySubject: "New lead: Net zero roadmap starter workbook",
  },
  climate_risk_register: {
    key: "climate_risk_register",
    title: "Climate risk register template",
    shortLabel: "template",
    description:
      "A board-ready template for identifying physical and transition risks, linking them to owners, evidence, time horizon, financial exposure, and response actions.",
    filePath: "/downloads/climate-risk-register-template.pdf",
    fileName: "climate-risk-register-template.pdf",
    attachmentName: "DS-Consulting-Climate-Risk-Register-Template.pdf",
    accentHex: "#0f172a",
    notifySubject: "New lead: Climate risk register template",
  },
  scope3_supplier_pack: {
    key: "scope3_supplier_pack",
    title: "Scope 3 supplier data request pack",
    shortLabel: "supplier pack",
    description:
      "A supplier-facing request pack with data fields, evidence expectations, escalation logic, and follow-up cadence for material Scope 3 categories.",
    filePath: "/downloads/scope-3-supplier-data-request-pack.pdf",
    fileName: "scope-3-supplier-data-request-pack.pdf",
    attachmentName: "DS-Consulting-Scope-3-Supplier-Data-Request-Pack.pdf",
    accentHex: "#4F46E5",
    notifySubject: "New lead: Scope 3 supplier data request pack",
  },
  cdp_planning_pack: {
    key: "cdp_planning_pack",
    title: "CDP response planning pack",
    shortLabel: "planning pack",
    description:
      "A working pack to assign question ownership, evidence sources, scoring priorities, and deadline control before the CDP window opens.",
    filePath: "/downloads/cdp-response-planning-pack.pdf",
    fileName: "cdp-response-planning-pack.pdf",
    attachmentName: "DS-Consulting-CDP-Response-Planning-Pack.pdf",
    accentHex: "#1d4ed8",
    notifySubject: "New lead: CDP response planning pack",
  },
  ecovadis_evidence_matrix: {
    key: "ecovadis_evidence_matrix",
    title: "EcoVadis evidence matrix",
    shortLabel: "evidence matrix",
    description:
      "A submission planning matrix covering policy, action, metrics and evidence expectations across all four EcoVadis themes.",
    filePath: "/downloads/ecovadis-evidence-matrix.pdf",
    fileName: "ecovadis-evidence-matrix.pdf",
    attachmentName: "DS-Consulting-EcoVadis-Evidence-Matrix.pdf",
    accentHex: "#047857",
    notifySubject: "New lead: EcoVadis evidence matrix",
  },
  steering_committee_charter: {
    key: "steering_committee_charter",
    title: "Sustainability steering committee charter",
    shortLabel: "charter",
    description:
      "A practical charter for leadership teams defining meeting cadence, agenda, decision rights, workstream ownership, and escalation paths for ESG execution.",
    filePath: "/downloads/sustainability-steering-committee-charter.pdf",
    fileName: "sustainability-steering-committee-charter.pdf",
    attachmentName: "DS-Consulting-Sustainability-Steering-Committee-Charter.pdf",
    accentHex: "#7c3aed",
    notifySubject: "New lead: Sustainability steering committee charter",
  },
  esg_tender_question_bank: {
    key: "esg_tender_question_bank",
    title: "ESG tender response question bank",
    shortLabel: "question bank",
    description:
      "A commercial-use question bank with standard answer blocks, evidence prompts, and coordination roles for ESG-heavy customer tenders and supplier questionnaires.",
    filePath: "/downloads/esg-tender-response-question-bank.pdf",
    fileName: "esg-tender-response-question-bank.pdf",
    attachmentName: "DS-Consulting-ESG-Tender-Response-Question-Bank.pdf",
    accentHex: "#0f766e",
    notifySubject: "New lead: ESG tender response question bank",
  },
  ai_use_case_register: {
    key: "ai_use_case_register",
    title: "AI use case register template",
    shortLabel: "template",
    description:
      "A register recording where AI is used across the business, who owns each use and which obligations attach, structured around the EU AI Act risk tiers and the Article 50 transparency triggers.",
    filePath: "/downloads/ai-use-case-register-template.xlsx",
    fileName: "ai-use-case-register-template.xlsx",
    attachmentName: "DS-Consulting-AI-Use-Case-Register-Template.xlsx",
    accentHex: "#4F46E5",
    notifySubject: "New lead: AI use case register template",
    emailLinks: AI_EMAIL_LINKS,
    emailUseLine: "Use it as a working document with your technology, risk, legal and functional teams.",
  },
  nist_ai_rmf_profile: {
    key: "nist_ai_rmf_profile",
    title: "NIST AI RMF starter profile",
    shortLabel: "workbook",
    description:
      "A self assessment across the four functions of the NIST AI Risk Management Framework, with a rating scale, an owner and evidence field per outcome, a crosswalk to the EU AI Act, ISO/IEC 42001 and the DPDP Act, and every source linked back to NIST.",
    filePath: "/downloads/nist-ai-rmf-starter-profile.xlsx",
    fileName: "nist-ai-rmf-starter-profile.xlsx",
    attachmentName: "DS-Consulting-NIST-AI-RMF-Starter-Profile.xlsx",
    accentHex: "#4F46E5",
    notifySubject: "New lead: NIST AI RMF starter profile",
    emailLinks: AI_EMAIL_LINKS,
    emailUseLine: "Use it as a working document with your technology, risk, legal and functional teams.",
  },
  // Brief 7 follow-up, agreed with Tejas 22 November 2026: the scorecard
  // template from the SEO project, offered behind the standard form.
  erp_demo_scorecard: {
    key: "erp_demo_scorecard",
    title: "ERP demo scorecard template",
    shortLabel: "template",
    description:
      "The ERP demo scorecard as an Excel workbook: setup and weights, 16 exception scenarios, the 0 to 3 scale, the implementer scorecard, a summary and a follow-up log, with the formulas built in.",
    filePath: "/downloads/erp-demo-scorecard-template.xlsx",
    fileName: "erp-demo-scorecard-template.xlsx",
    attachmentName: "DS-Consulting-ERP-Demo-Scorecard-Template.xlsx",
    accentHex: "#4F46E5",
    notifySubject: "New lead: ERP demo scorecard template",
    emailUseLine: "Give every attendee their own copy before the first demo, and agree the weights first.",
    emailLinks: [
      { label: "ERP demo script and scorecard", href: "https://www.consult-ds.com/insights/erp-demo-script-and-scorecard", desc: "The guide to running scripted demos" },
      { label: "Systems selection", href: "https://www.consult-ds.com/services/systems-selection", desc: "Independent selection with structured demos" },
      { label: "Moving off Tally", href: "https://www.consult-ds.com/migrations/tally-to-erp", desc: "Plan the move to an ERP" },
    ],
  },
};
