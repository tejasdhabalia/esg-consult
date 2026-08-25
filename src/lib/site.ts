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
  defaultTitle: "Technology consulting and delivery | DS Consulting",
  defaultDescription:
    "Consulting and implementation for mid-market companies. Technology and AI, sustainability reporting and finance operations, scoped against the business case and built by the people who scoped it.",

  /**
   * Positioning strings used across pages. Edit here, not in page files,
   * so each claim reads identically everywhere it appears.
   *
   * Order matters. `depth` is the core claim. `independence` is a supporting
   * claim that qualifies how we work, not the reason to choose us.
   */
  positioning: {
    headline:
      "We understand the system and we understand the business it has to run. Most firms are strong at one of those.",
    supporting:
      "Most technology projects fail in the gap between what the board decided and what the system was built to do. We work in that gap.",

    /** Core claim. Technology knowledge with business depth. */
    depth: [
      {
        title: "We have built these systems",
        body: "Data models, interface design, migration, and the difference between a configuration you can upgrade and a customisation you will pay for twice. This is hands-on experience, not a summary of someone else's build.",
      },
      {
        title: "We can read the business case",
        body: "Month end close, order to cash, pipeline reporting, statutory disclosure. We can tell you which requirement is load bearing and which one is a preference somebody wrote down in a workshop.",
      },
      {
        title: "You meet the people who do the work",
        body: "On technology projects the people who scope the work are the people who deliver it. Where delivery involves specialists or a partner firm, you are introduced to them during scoping rather than after you have signed.",
      },
    ],

    /**
     * Supporting claim. Stated in plain words, never softened to
     * "vendor-agnostic approach", but not sold as the primary reason to hire us.
     */
    /**
      * Short form, used in the footer and in call-to-action panels.
      *
      * Deliberately does not mention software resale or how revenue is
      * split. Those belong in the "How we are paid" section, which has room
      * to state them properly. Three stacked negatives in a strapline read
      * as defensive.
      */
    independenceShort:
      "We are an independent consulting firm. Software vendors do not pay us, so our recommendations come with the scoring behind them.",
    independenceProof: [
      "We take no commissions, referral fees, reseller margin or partner incentives from any software vendor.",
      // This card used to read "Every invoice we raise goes to a client. That
      // is the whole revenue model." That claimed completeness, and the
      // finance and accounting partnership interest sits outside it, so the
      // claim was not literally true. Narrowed to the technology work, with
      // the interest disclosed rather than left to be discovered. Volunteering
      // it is what makes the software claim above credible. Do not restore
      // the absolute version.
      "Our technology work is paid for by the client and nobody else. We hold an interest in the finance and accounting partner firm, and would rather you heard that from us.",
      "We still recommend software. You get the scoring behind the recommendation, not only the conclusion.",
    ],
    /**
     * The exclusion list. This is the proof of the claim above it,
     * so it gets real estate on the page and never a footer line.
     */
    doesNotDo: [
      "IT support",
      "Help desk",
      "Networking",
      "Hardware",
      "Software resale",
    ],
  },

  /** Entry offer. Referenced by every primary call to action. */
  assessment: {
    label: "Start with an assessment",
    duration: "Two to four weeks",
    price: "Fixed price",
    output: "A decision document, not a proposal",
  },

  // Social
  linkedin: {
    company: "https://www.linkedin.com/company/consult-ds",
    tejas: "https://www.linkedin.com/in/tejasdhabalia/",
    jigar: "https://www.linkedin.com/in/jigardhabalia/",
  },

  // AI / agent discovery
  ai: {
    /**
     * The single description of the firm given to AI systems and agents.
     * Used verbatim in llms.txt and llms-full.txt.
     *
     * Order matters. Core claim first, structure second, how we are paid
     * last. Independence is a supporting claim in version 3.0 positioning
     * and must not lead. Area names must match service-pillars.ts exactly,
     * which means Technology, not "Technology and AI".
     *
     * Never use "three pillars" here. It is internal shorthand.
     */
    summary:
      "Consulting and implementation firm for mid-market companies. DS Consulting understands the system and the business it has to run, where most firms are strong at one of those. Work covers three areas. Technology, spanning commerce and digital platforms, ERP systems, CRM and revenue operations, integration, and AI governance and adoption. Sustainability, covering ESG and CSRD reporting systems. And finance and accounting outsourcing, where offshore delivery runs through a partner firm rather than DS Consulting staff and clients meet that team during scoping. The firm takes no commissions, referral fees, reseller margin or partner incentives from any software vendor. Technology work is paid for by the client. DS Consulting holds an interest in the finance and accounting partner firm and states this openly.",
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
