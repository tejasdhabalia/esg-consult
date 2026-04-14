export type InsightResourceKey =
  | "net_zero_roadmap"
  | "climate_risk_register"
  | "scope3_supplier_pack"
  | "cdp_planning_pack"
  | "ecovadis_evidence_matrix"
  | "steering_committee_charter"
  | "esg_tender_question_bank";

export type InsightResource = {
  key: InsightResourceKey;
  title: string;
  shortLabel: string;
  description: string;
  pdfPath: string;
  pdfFileName: string;
  pdfAttachmentName: string;
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
    pdfPath: "/downloads/net-zero-roadmap-starter-workbook.pdf",
    pdfFileName: "net-zero-roadmap-starter-workbook.pdf",
    pdfAttachmentName: "DS-Consulting-Net-Zero-Roadmap-Starter-Workbook.pdf",
    accentHex: "#059669",
    notifySubject: "New lead: Net zero roadmap starter workbook",
  },
  climate_risk_register: {
    key: "climate_risk_register",
    title: "Climate risk register template",
    shortLabel: "template",
    description:
      "A board-ready template for identifying physical and transition risks, linking them to owners, evidence, time horizon, financial exposure, and response actions.",
    pdfPath: "/downloads/climate-risk-register-template.pdf",
    pdfFileName: "climate-risk-register-template.pdf",
    pdfAttachmentName: "DS-Consulting-Climate-Risk-Register-Template.pdf",
    accentHex: "#0f172a",
    notifySubject: "New lead: Climate risk register template",
  },
  scope3_supplier_pack: {
    key: "scope3_supplier_pack",
    title: "Scope 3 supplier data request pack",
    shortLabel: "supplier pack",
    description:
      "A supplier-facing request pack with data fields, evidence expectations, escalation logic, and follow-up cadence for material Scope 3 categories.",
    pdfPath: "/downloads/scope-3-supplier-data-request-pack.pdf",
    pdfFileName: "scope-3-supplier-data-request-pack.pdf",
    pdfAttachmentName: "DS-Consulting-Scope-3-Supplier-Data-Request-Pack.pdf",
    accentHex: "#4F46E5",
    notifySubject: "New lead: Scope 3 supplier data request pack",
  },
  cdp_planning_pack: {
    key: "cdp_planning_pack",
    title: "CDP response planning pack",
    shortLabel: "planning pack",
    description:
      "A working pack to assign question ownership, evidence sources, scoring priorities, and deadline control before the CDP window opens.",
    pdfPath: "/downloads/cdp-response-planning-pack.pdf",
    pdfFileName: "cdp-response-planning-pack.pdf",
    pdfAttachmentName: "DS-Consulting-CDP-Response-Planning-Pack.pdf",
    accentHex: "#1d4ed8",
    notifySubject: "New lead: CDP response planning pack",
  },
  ecovadis_evidence_matrix: {
    key: "ecovadis_evidence_matrix",
    title: "EcoVadis evidence matrix",
    shortLabel: "evidence matrix",
    description:
      "A submission planning matrix covering policy, action, metrics, and evidence expectations across all four EcoVadis themes.",
    pdfPath: "/downloads/ecovadis-evidence-matrix.pdf",
    pdfFileName: "ecovadis-evidence-matrix.pdf",
    pdfAttachmentName: "DS-Consulting-EcoVadis-Evidence-Matrix.pdf",
    accentHex: "#047857",
    notifySubject: "New lead: EcoVadis evidence matrix",
  },
  steering_committee_charter: {
    key: "steering_committee_charter",
    title: "Sustainability steering committee charter",
    shortLabel: "charter",
    description:
      "A practical charter for leadership teams defining meeting cadence, agenda, decision rights, workstream ownership, and escalation paths for ESG execution.",
    pdfPath: "/downloads/sustainability-steering-committee-charter.pdf",
    pdfFileName: "sustainability-steering-committee-charter.pdf",
    pdfAttachmentName: "DS-Consulting-Sustainability-Steering-Committee-Charter.pdf",
    accentHex: "#7c3aed",
    notifySubject: "New lead: Sustainability steering committee charter",
  },
  esg_tender_question_bank: {
    key: "esg_tender_question_bank",
    title: "ESG tender response question bank",
    shortLabel: "question bank",
    description:
      "A commercial-use question bank with standard answer blocks, evidence prompts, and coordination roles for ESG-heavy customer tenders and supplier questionnaires.",
    pdfPath: "/downloads/esg-tender-response-question-bank.pdf",
    pdfFileName: "esg-tender-response-question-bank.pdf",
    pdfAttachmentName: "DS-Consulting-ESG-Tender-Response-Question-Bank.pdf",
    accentHex: "#0f766e",
    notifySubject: "New lead: ESG tender response question bank",
  },
};
