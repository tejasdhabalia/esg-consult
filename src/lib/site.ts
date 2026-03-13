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
    "DS Consulting helps leadership teams build governed ESG reporting systems and revenue visibility through advisory plus implementation. CSRD, BRSR, UK Climate, CRM governance.",

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
  ],

  // Default contact placeholders
  emails: {
    general: "contact@consult-ds.com",
    partners: "partners@consult-ds.com",
    talent: "talent@consult-ds.com",
  },
};