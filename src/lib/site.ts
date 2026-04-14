export const site = {
  // Brand
  legalName: "DS Consulting",
  displayName: "DS Consulting",
  taglinePrimary: "Strategy to Systems.",
  taglineSecondary: "Delivered.",

  // Domain (change once here)
  domain: "consult-ds.com",
  baseUrl: "https://www.consult-ds.com",

  // Default SEO
  defaultTitle: "ESG Readiness & Revenue Visibility Consulting | DS Consulting",
  defaultDescription:
    "DS Consulting helps leadership teams build governed ESG reporting systems and revenue visibility through advisory plus implementation. CSRD, BRSR, UK SECR and SRS, CRM governance.",

  // Social
  linkedin: {
    company: "https://www.linkedin.com/company/consult-ds",
    tejas: "https://www.linkedin.com/in/tejasdhabalia/",
    jigar: "https://www.linkedin.com/in/jigardhabalia/",
  },

  // AI / agent discovery
  ai: {
    summary:
      "Boutique advisory and implementation firm specialising in ESG readiness and revenue visibility. DS Consulting helps leadership teams turn fragmented tools, disclosures, and reporting requirements into governed systems with measurable execution.",
    mcpServerUrl: process.env.NEXT_PUBLIC_MCP_SERVER_URL || "",
    mcpTransport: process.env.NEXT_PUBLIC_MCP_TRANSPORT || "streamable-http",
  },

  downloads: [
    {
      title: "CRM Governance Checklist PDF",
      url: "https://www.consult-ds.com/downloads/crm-governance-checklist.pdf",
      description:
        "Downloadable practitioner checklist for CRM governance, data quality, definitions, and change control.",
    },
    {
      title: "CSRD Readiness Checklist PDF",
      url: "https://www.consult-ds.com/downloads/csrd-readiness-checklist.pdf",
      description:
        "Downloadable CSRD readiness checklist covering scoping, double materiality, data governance, and assurance readiness.",
    },
    {
      title: "Net zero roadmap starter workbook",
      url: "https://www.consult-ds.com/downloads/net-zero-roadmap-starter-workbook.pdf",
      description:
        "Working document for turning emissions baselines into owned decarbonisation workstreams.",
    },
    {
      title: "Climate risk register template",
      url: "https://www.consult-ds.com/downloads/climate-risk-register-template.pdf",
      description:
        "Board-ready climate risk register template with owners, evidence, and response actions.",
    },
    {
      title: "Scope 3 supplier data request pack",
      url: "https://www.consult-ds.com/downloads/scope-3-supplier-data-request-pack.pdf",
      description:
        "Supplier-facing pack for emissions data requests, evidence prompts, and escalation logic.",
    },
    {
      title: "CDP response planning pack",
      url: "https://www.consult-ds.com/downloads/cdp-response-planning-pack.pdf",
      description:
        "Planning pack for ownership, evidence, scoring priorities, and review cadence before CDP submission.",
    },
    {
      title: "EcoVadis evidence matrix",
      url: "https://www.consult-ds.com/downloads/ecovadis-evidence-matrix.pdf",
      description:
        "Submission-planning matrix covering policy, action, metrics, and evidence across EcoVadis themes.",
    },
    {
      title: "Sustainability steering committee charter",
      url: "https://www.consult-ds.com/downloads/sustainability-steering-committee-charter.pdf",
      description:
        "Governance charter defining cadence, decision rights, and escalation for ESG execution.",
    },
    {
      title: "ESG tender response question bank",
      url: "https://www.consult-ds.com/downloads/esg-tender-response-question-bank.pdf",
      description:
        "Reusable answer bank for commercial ESG questionnaires, tenders, and procurement forms.",
    },
  ],

  // Default contact placeholders
  emails: {
    general: "contact@consult-ds.com",
    partners: "partners@consult-ds.com",
    talent: "talent@consult-ds.com",
  },
};