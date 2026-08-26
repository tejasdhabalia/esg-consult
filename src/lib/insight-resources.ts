export type InsightResourceKey =
  | "net_zero_roadmap"
  | "climate_risk_register"
  | "scope3_supplier_pack"
  | "cdp_planning_pack"
  | "ecovadis_evidence_matrix"
  | "steering_committee_charter"
  | "esg_tender_question_bank"
  | "ai_use_case_register";

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
};

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
  },
};
