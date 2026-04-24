/**
 * SEO proposals for public pages.
 *
 * Consumed by scripts/apply-seo-updates.py (not imported by the Next.js app).
 * Update this file by batch, then run the script.
 *
 * Rules when adding entries:
 * - title: 30-44 chars (final rendered title will append " | DS Consulting" = +16)
 * - description: 140-160 chars ideal
 * - isInteractiveTool: true only for pages that are genuinely interactive tools
 *   (e.g., assessments, audits, calculators). Triggers articleSchema -> toolSchema
 *   swap in the page.tsx.
 */

export type SeoProposal = {
  title: string;
  description: string;
  isInteractiveTool?: boolean;
};

export const proposals: Record<string, SeoProposal> = {
  // ============================================================
  // BATCH 1 - Top-level pages (already applied)
  // ============================================================
  "/": {
    title: "ESG readiness and revenue visibility",
    description:
      "Governed ESG reporting and revenue visibility systems for leadership teams. Advisory plus implementation across CSRD, BRSR, marketing automation and CRM governance.",
  },
  "/about": {
    title: "About our ESG and RevOps advisory",
    description:
      "Why DS Consulting exists, who leads the firm and how we pair ESG readiness with revenue visibility through governed advisory plus implementation.",
  },
  "/services": {
    title: "ESG and RevOps advisory services",
    description:
      "The full service catalogue. ESG reporting systems, CRM governance, marketing automation and revenue operations, with governance built into every engagement.",
  },
  "/team": {
    title: "Founders and principal consultants",
    description:
      "Meet the founders Tejas and Jigar Dhabalia, plus the principal consultants leading ESG advisory, CRM governance and revenue operations work.",
  },
  "/partners": {
    title: "Partner with DS Consulting",
    description:
      "Referrals, ecosystem collaboration and structured service alliances. Includes a strategic finance partnership program with an outsourced accounting firm.",
  },
  "/contact": {
    title: "Start a conversation",
    description:
      "Get in touch about ESG readiness, CRM governance or revenue visibility engagements. Separate routes for partner inquiries and talent applications.",
  },
  "/insights": {
    title: "Insights, guides and tools",
    description:
      "Practical guides, interactive tools and checklists across ESG readiness, CRM governance and marketing automation. Built for governed execution.",
  },
  "/regulatory-hub": {
    title: "CSRD, BRSR and UK SECR regulatory hub",
    description:
      "Practical guides for CSRD and ESRS, SEBI BRSR and UK SECR and SRS reporting. Covers scoping, governance, evidence trails and repeatable reporting workflows.",
  },
  "/compare": {
    title: "Compare approaches and partners",
    description:
      "Side-by-side comparisons to help leaders choose between approaches and partners for ESG readiness and revenue visibility. Clarity, tradeoffs, next steps.",
  },
  "/case-studies": {
    title: "Engagement case studies",
    description:
      "Selected engagements from DS Consulting. ESG readiness and revenue visibility outcomes for leadership teams across B2B and B2C organisations.",
  },

  // ============================================================
  // BATCH 2 - Service detail pages (20 pages)
  // ============================================================
  "/services/esg-advisory": {
    title: "ESG advisory and reporting services",
    description:
      "ESG advisory spanning CSRD, BRSR, UK SECR, carbon accounting, net zero, climate risk, CDP, EcoVadis, supplier engagement and sustainability strategy.",
  },
  "/services/esg-advisory/b-corp-certification": {
    title: "B Corp certification advisory",
    description:
      "B Corp certification readiness. Structured assessment across policy, data, evidence trails and operating model, with practical coordination through submission.",
  },
  "/services/esg-advisory/brsr-advisory": {
    title: "BRSR advisory and readiness",
    description:
      "SEBI BRSR readiness for listed companies in India. KPI mapping, ESG data governance, controls, evidence trails and repeatable reporting workflows.",
  },
  "/services/esg-advisory/carbon-accounting": {
    title: "Carbon accounting and GHG inventory",
    description:
      "Defensible Scope 1, 2 and 3 carbon inventories aligned to the GHG Protocol. Compliance with TCFD, CSRD, UK SECR and ISO 14064, with SBTi-aligned targets.",
  },
  "/services/esg-advisory/cdp-reporting": {
    title: "CDP reporting advisory",
    description:
      "Stronger CDP disclosure scores through better evidence quality and a structured response process across climate data, governance and narrative.",
  },
  "/services/esg-advisory/climate-risk": {
    title: "Climate risk advisory",
    description:
      "Physical and transition climate risk assessment, stronger TCFD-aligned disclosure inputs and a practical governance model for climate resilience.",
  },
  "/services/esg-advisory/csrd-advisory": {
    title: "CSRD and ESRS readiness advisory",
    description:
      "CSRD and ESRS readiness. Scoping, double materiality, ESRS disclosure mapping, data governance, controls, evidence trails and assurance preparation.",
  },
  "/services/esg-advisory/ecovadis-readiness": {
    title: "EcoVadis readiness advisory",
    description:
      "A stronger EcoVadis score and a submission-ready evidence trail. We assess gaps, strengthen policies, map evidence and review before you hit send.",
  },
  "/services/esg-advisory/net-zero-and-decarbonisation": {
    title: "Net zero and decarbonisation advisory",
    description:
      "Credible net zero roadmaps, SBTi-aligned target setting and measurable decarbonisation delivery across operations, supply chain and the wider value chain.",
  },
  "/services/esg-advisory/outsourced-sustainability-management": {
    title: "Outsourced sustainability management",
    description:
      "Sustained ESG leadership capacity, programme coordination and governance support without needing to build a full in-house sustainability team.",
  },
  "/services/esg-advisory/product-sustainability": {
    title: "Product sustainability advisory",
    description:
      "Clearer insight into product impacts, stronger customer-facing evidence and a structured basis for product claims and improvement priorities.",
  },
  "/services/esg-advisory/rfp-tender-support": {
    title: "RFP and tender sustainability support",
    description:
      "Stronger responses to buyer sustainability requirements in RFPs and tenders. Evidence libraries and a repeatable way to answer ESG questions under deadline.",
  },
  "/services/esg-advisory/supplier-engagement": {
    title: "Supplier engagement advisory",
    description:
      "Better Scope 3 data from suppliers, stronger procurement governance and a practical way to improve value chain readiness across the supply base.",
  },
  "/services/esg-advisory/sustainability-strategy": {
    title: "Sustainability strategy advisory",
    description:
      "Clearer sustainability priorities, a stronger operating model and a practical route from ambition to governed execution for leadership teams.",
  },
  "/services/esg-advisory/sustainability-training": {
    title: "Sustainability training and enablement",
    description:
      "ESG and sustainability training for leadership, functional teams and programme owners. Shared understanding, better decisions and stronger execution.",
  },
  "/services/esg-advisory/uk-secr-srs-reporting": {
    title: "UK SECR and SRS reporting",
    description:
      "UK SECR and SRS reporting support. Scoping, energy and carbon data, emissions methodology, KPI development, narrative drafting and evidence mapping.",
  },
  "/services/marketing-automation": {
    title: "Marketing automation, RevOps and AI",
    description:
      "Marketing automation, CRM governance, lifecycle orchestration, AI-enabled content and revenue measurement leaders can trust, across B2B and B2C.",
  },
  "/services/marketing-automation/crm-architecture-governance": {
    title: "CRM architecture and governance",
    description:
      "CRM architecture and governance. Data model discipline, single source of truth, integrations with finance and service, controls and reporting definitions.",
  },
  "/services/marketing-automation/lifecycle-lead-management": {
    title: "Lifecycle and lead management",
    description:
      "Journey orchestration, lead routing and SLAs, segmentation, prioritisation and omnichannel triggers, with governance for predictable execution.",
  },
  "/services/marketing-automation/revenue-analytics": {
    title: "Revenue analytics and measurement",
    description:
      "Funnel and lifecycle definitions, metric governance, CRM-to-finance alignment, retention analytics and dashboards leaders can trust. Built for B2B and B2C.",
  },

  // ============================================================
  // BATCH 3 onwards - to be added
  // ============================================================
};
