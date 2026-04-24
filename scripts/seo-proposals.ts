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
 *
 * The script is idempotent. Already-converted pages show "(no changes)" on re-run.
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
  // BATCH 2 - Service detail pages (20 pages, already applied)
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
  // BATCH 3 - Final batch: compare, regulatory hub, insights, legal
  // ============================================================

  // Compare sub-pages (2)
  "/compare/ds-consulting-vs-generalist-agencies": {
    title: "DS Consulting vs generalist agencies",
    description:
      "Which partner is right for ESG and RevOps: a specialist advisory like DS Consulting, or a generalist marketing or ESG agency? Governance, ownership, fit.",
  },
  "/compare/in-house-vs-outsourced-crm-governance": {
    title: "In-house vs outsourced CRM governance",
    description:
      "Building CRM governance in-house vs outsourcing it. Speed, cost, ownership, cross-functional alignment and how to stop CRM firefighting for good.",
  },

  // Regulatory hub sub-pages (10)
  "/regulatory-hub/what-is-csrd": {
    title: "What is CSRD? A practical explainer",
    description:
      "CSRD is the EU regulation requiring large companies to report sustainability information under ESRS. Who is in scope, key timelines and what it means for you.",
  },
  "/regulatory-hub/what-is-esrs": {
    title: "What is ESRS? The CSRD standards",
    description:
      "ESRS are the mandatory standards companies report under for CSRD. The full structure: ESRS 1, ESRS 2, plus the topic-specific E, S and G standards.",
  },
  "/regulatory-hub/what-is-double-materiality": {
    title: "What is double materiality?",
    description:
      "Double materiality requires companies to assess both their impact on sustainability topics and how sustainability topics affect financial performance.",
  },
  "/regulatory-hub/what-is-sebi-brsr": {
    title: "What is SEBI BRSR? A practical guide",
    description:
      "SEBI BRSR is India's mandatory ESG disclosure framework for listed companies. BRSR Core, who must report, the 9 principles and assurance requirements.",
  },
  "/regulatory-hub/csrd-in-scope-and-timeline": {
    title: "CSRD scoping and timeline",
    description:
      "A practical checklist to confirm CSRD scope, reporting timelines, group boundary decisions and the first-cycle readiness priorities that matter most.",
  },
  "/regulatory-hub/csrd-double-materiality-and-esrs-mapping": {
    title: "Double materiality and ESRS mapping",
    description:
      "How to run double materiality as a decision process and convert outcomes into disclosures, owners, KPIs, controls and evidence trails under ESRS.",
  },
  "/regulatory-hub/brsr-core-readiness-kpis-controls": {
    title: "BRSR readiness: KPI mapping and controls",
    description:
      "Convert BRSR Core indicators into a KPI inventory with owners, validations, evidence trails and a governance cadence leaders can rely on each cycle.",
  },
  "/regulatory-hub/brsr-value-chain-data-collection": {
    title: "BRSR value chain data collection",
    description:
      "A phased BRSR value chain approach: prioritisation, supplier workflows, assumptions documentation and cycle-by-cycle improvement through governance.",
  },
  "/regulatory-hub/uk-secr-srs-governance-and-risk-management": {
    title: "UK SECR and SRS governance",
    description:
      "Structure SECR and SRS oversight, decision rights, risk linkage and evidence so climate disclosures remain defensible and repeatable each cycle.",
  },
  "/regulatory-hub/uk-secr-srs-metrics-targets-and-evidence": {
    title: "UK SECR and SRS metrics and targets",
    description:
      "Practical decisions for SECR and SRS metrics, targets, emissions data governance, controls and evidence trails that reduce late-cycle rework.",
  },

  // Insights (13 pages. /insights/ai-marketing-readiness already done manually.
  // /insights/leaky-funnel-audit requires manual layout.tsx - see instructions.)
  "/insights/cdp-response-planning-pack": {
    title: "CDP response planning pack",
    description:
      "Run CDP response preparation in a structured way before deadlines compress the work. Ownership map, evidence workstream and defined review cadence.",
  },
  "/insights/climate-risk-register-template": {
    title: "Climate risk register template",
    description:
      "A practical guide to structuring climate risk in a form leadership, finance and operations teams can review, prioritise and connect to action planning.",
  },
  "/insights/crm-governance-checklist": {
    title: "The CRM governance SOP template",
    description:
      "A practitioner checklist for teams done with dirty data, broken dashboards and pipeline numbers that don't match reality. By Tejas Dhabalia, DS Consulting.",
  },
  "/insights/csrd-readiness-first-90-days": {
    title: "CSRD readiness: the first 90 days",
    description:
      "A practical checklist for CFOs and sustainability leaders preparing for their first CSRD reporting cycle. Scoping, double materiality, data, assurance.",
  },
  "/insights/ecovadis-evidence-matrix": {
    title: "EcoVadis evidence matrix",
    description:
      "A practical submission-planning matrix for teams that need to organise policy, action, metrics and supporting evidence before uploading documents.",
  },
  "/insights/esg-tender-response-question-bank": {
    title: "ESG tender response question bank",
    description:
      "A commercial-use library for teams answering ESG questions in customer tenders, procurement forms and supplier questionnaires without a standard playbook.",
  },
  "/insights/marketing-automation-maturity": {
    title: "Marketing automation maturity scorecard",
    description:
      "Score your marketing automation against top-quartile benchmarks across data, platform, governance and attribution. Free interactive tool from DS Consulting.",
    isInteractiveTool: true,
  },
  "/insights/marketing-governance-model-for-automation": {
    title: "Marketing automation governance model",
    description:
      "Why marketing automation breaks as teams grow, and how governance with ownership, definitions, SLAs and change control protects performance.",
  },
  "/insights/net-zero-roadmap-starter": {
    title: "Net zero roadmap starter",
    description:
      "A practical decision guide for leadership teams ready to move from emissions calculation to a credible decarbonisation roadmap with owners and cadence.",
  },
  "/insights/revenue-attribution-readiness": {
    title: "Revenue attribution readiness check",
    description:
      "Can your marketing team prove its contribution to revenue? Three sections on attribution model, data connectivity and reporting, with a board-ready rating.",
    isInteractiveTool: true,
  },
  "/insights/scope-3-supplier-data-request-pack": {
    title: "Scope 3 supplier data request pack",
    description:
      "A working guide for leadership teams that need better Scope 3 supplier data without creating chaos across procurement, sustainability and operations.",
  },
  "/insights/sustainability-steering-committee-charter": {
    title: "Sustainability steering committee charter",
    description:
      "A practical governance guide for leadership teams that need a real ESG operating cadence, not a vague cross-functional working group meeting monthly.",
  },

  // Legal pages (4). Short descriptions are acceptable for these.
  "/accessibility": {
    title: "Accessibility",
    description:
      "Our accessibility commitment and how to request support, raise accessibility concerns, or request content in alternate formats.",
  },
  "/cookies": {
    title: "Cookies policy",
    description:
      "How DS Consulting uses cookies, which categories are set on this site, and how you can accept, reject or change your preferences at any time.",
  },
  "/privacy": {
    title: "Privacy policy",
    description:
      "How DS Consulting handles personal data, cookies and website analytics. Includes your rights and how to request access, correction or deletion.",
  },
  "/terms": {
    title: "Terms of use",
    description:
      "Website terms of use, disclaimers and acceptable use covering content, attribution, third-party references and limits of liability.",
  },
};
