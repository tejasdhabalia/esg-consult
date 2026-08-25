// Authors are shared with the regulatory hub bylines. See src/lib/authors.ts
import { jigar } from "@/lib/authors";
import type { InsightResourceKey } from "@/lib/insight-resources";

export type EsgInsightSectionItem = {
  item: string;
  detail: string;
};

export type EsgInsightSection = {
  id: string;
  title: string;
  intro?: string;
  colorClass: string;
  accentClass: string;
  items: EsgInsightSectionItem[];
};

export type EsgInsightFaq = {
  question: string;
  answer: string;
};

export type EsgInsightPageConfig = {
  slug: string;
  title: string;
  breadcrumbLabel?: string;
  description: string;
  badge: string;
  displayDate: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  heroBgClass: string;
  heroBreadcrumbClass: string;
  heroCurrentClass: string;
  heroSummaryClass: string;
  heroMetaClass: string;
  badgeClass: string;
  quoteBoxClass: string;
  numberPillClass: string;
  sidebarCtaClass: string;
  quote: {
    text: string;
    attribution: string;
  };
  author: {
    name: string;
    role: string;
    roleShort: string;
    imageSrc: string;
    linkedin: string;
    bio: string;
  };
  whatYouGetIntro: string;
  whatYouGetCards: Array<{ title: string; description: string }>;
  rightForYou: string[];
  sections: EsgInsightSection[];
  whyItMatters: string[];
  /**
   * One contextual body link into the service page this resource supports.
   * Renders as a closing paragraph under "why it matters", so it reads as
   * part of the argument rather than as a promotional block.
   *
   * The anchor text is the term the target page needs to rank for, so it is
   * descriptive and fixed. Do not change it to "learn more" or "our
   * services". One link per page. Brief 2, Task 3a (SEO project).
   */
  contextualLink?: {
    before: string;
    anchor: string;
    href: string;
    after: string;
  };
  faqs: EsgInsightFaq[];
  resourceKey: InsightResourceKey;
  resourceCtaTitle: string;
  resourceCtaBody: string;
  relatedServices: Array<{ label: string; href: string }>;
  relatedInsights: Array<{ label: string; href: string; description: string }>;
};

const standardInsightTheme = {
  heroBgClass: "bg-indigo-950",
  heroBreadcrumbClass: "text-indigo-300",
  heroCurrentClass: "text-indigo-100",
  heroSummaryClass: "text-indigo-100",
  heroMetaClass: "text-indigo-300",
  badgeClass: "bg-indigo-800 text-indigo-100",
  quoteBoxClass: "bg-indigo-50 border-indigo-100",
  numberPillClass: "bg-indigo-700",
  sidebarCtaClass: "bg-indigo-900",
} as const;

const standardSectionStyles = [
  {
    colorClass: "bg-slate-50 border-slate-200",
    accentClass: "text-slate-900",
  },
  {
    colorClass: "bg-indigo-50 border-indigo-200",
    accentClass: "text-indigo-900",
  },
  {
    colorClass: "bg-violet-50 border-violet-200",
    accentClass: "text-violet-900",
  },
  {
    colorClass: "bg-emerald-50 border-emerald-200",
    accentClass: "text-emerald-900",
  },
] as const;

const applySectionStyles = (sections: EsgInsightSection[]): EsgInsightSection[] =>
  sections.map((section, index) => ({
    ...section,
    ...standardSectionStyles[index % standardSectionStyles.length],
  }));


export const esgInsightPages: Record<string, EsgInsightPageConfig> = {
  "net-zero-roadmap-starter": {
    slug: "net-zero-roadmap-starter",
    title: "Net zero roadmap starter",
    description:
      "A practical decision guide for leadership teams who need to move from emissions calculation to a credible decarbonisation roadmap with owners, sequencing and delivery cadence.",
    badge: "Downloadable workbook",
    displayDate: "14 April 2026",
    datePublished: "2026-04-14",
    dateModified: "2026-04-14",
    readTime: "8 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "Many teams can calculate emissions once. Far fewer can turn the result into a delivery plan the CFO, operations team, and procurement team will actually run.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "This workbook is designed for the first serious roadmap discussion. It helps leadership move from an emissions baseline to a staged plan with governance, owner names, and commercial logic.",
    whatYouGetCards: [
      { title: "Baseline framing", description: "A simple way to separate must-measure categories from the few hotspots that will drive the first year of action." },
      { title: "Target-setting decisions", description: "Questions to align ambition level, boundary and dependency before targets are announced externally." },
      { title: "Workstream design", description: "A starter structure for energy, procurement, logistics, product and supplier actions with named owners." },
      { title: "12-month sequencing", description: "A first-year cadence for data improvement, action design, governance reviews, and evidence capture." },
    ],
    rightForYou: [
      "You already have an emissions baseline but no agreed plan for what happens next.",
      "Your leadership team keeps asking for a roadmap, but nobody has translated climate ambition into owner-level workstreams.",
      "You need to align operations, finance and procurement before setting external commitments.",
      "You want a practical decarbonisation plan without buying software first.",
    ],
    sections: applySectionStyles([
      {
        id: "baseline",
        title: "Section 1: Frame the starting point",
        intro: "A roadmap fails when the baseline is treated as a data exercise rather than a management decision. These prompts clarify what leadership is actually steering.",
        colorClass: "bg-emerald-50 border-emerald-200",
        accentClass: "text-emerald-800",
        items: [
          { item: "Separate reporting completeness from operational materiality.", detail: "Not every emissions category deserves equal management attention. Start by identifying the sources that drive the majority of footprint or commercial exposure." },
          { item: "Confirm the boundary leadership will manage against.", detail: "Entity scope, operational boundary, and value chain scope must be agreed before targets or dashboard views are finalised." },
          { item: "Document the data confidence level by hotspot area.", detail: "Leadership needs to know where numbers are measured, where they are estimated, and where supplier assumptions are still weak." },
          { item: "Identify which emissions sources are controllable, influenceable or structural.", detail: "This prevents unrealistic plans. Some actions sit with operations, some with procurement, and some with customer or supplier design choices." },
        ],
      },
      {
        id: "target-decisions",
        title: "Section 2: Make the target-setting decisions explicit",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "Choose the target shape before the target number.", detail: "Intensity targets, absolute reduction targets, or category-specific goals each change how delivery teams behave and report progress." },
          { item: "Define what must be true before any public commitment is made.", detail: "This usually includes baseline quality, owner commitment, financing assumptions, and the first set of approved initiatives." },
          { item: "Map dependencies that sit outside the sustainability team.", detail: "Facility upgrades, renewable procurement, supplier substitutions, and product redesign each sit inside other functions and need sponsorship." },
          { item: "Set the rule for revisiting targets if baseline quality changes.", detail: "As Scope 3 quality improves, targets often need restating logic. Decide this in advance rather than defending ad hoc revisions later." },
        ],
      },
      {
        id: "workstreams",
        title: "Section 3: Translate ambition into delivery workstreams",
        colorClass: "bg-indigo-50 border-indigo-200",
        accentClass: "text-indigo-800",
        items: [
          { item: "Name the workstream owners, not just the sponsors.", detail: "Sponsors provide air cover. Workstream owners run the action plan, cadence and evidence trail." },
          { item: "Break each workstream into decision, design and execution phases.", detail: "This helps leadership understand which actions are still under evaluation and which are ready for operational rollout." },
          { item: "Define the minimum KPI set for each workstream.", detail: "A small KPI set, tied to action and evidence, is usually more useful than a wide dashboard with weak ownership." },
          { item: "Use a common benefits case format across projects.", detail: "Energy savings, capex, supplier cost, and risk reduction should be captured in a comparable format so the portfolio can be prioritised." },
        ],
      },
      {
        id: "governance",
        title: "Section 4: Put a management cadence around the roadmap",
        colorClass: "bg-violet-50 border-violet-200",
        accentClass: "text-violet-800",
        items: [
          { item: "Create a monthly delivery review and a quarterly steering review.", detail: "The monthly cadence drives execution. The quarterly cadence handles escalation, budget and target implications." },
          { item: "Document what evidence each workstream must retain.", detail: "Meeting packs, supplier confirmations, invoices, methodology notes, and approval logs all matter once reporting and assurance expand." },
          { item: "Track decisions that change the emissions baseline or roadmap assumptions.", detail: "A simple decision log prevents confusion when figures move or projects are reprioritised." },
          { item: "Connect the roadmap to external disclosures only after the internal cadence works.", detail: "Reporting should reflect how the roadmap is run, not substitute for management discipline." },
        ],
      },
    ]),
    whyItMatters: [
      "Net zero plans often stall because they start with ambition statements and software demos rather than ownership, sequencing and management rhythm. A roadmap becomes real only when operations and finance recognise it as a delivery programme, not a sustainability side project.",
      "A credible roadmap also protects external positioning. When customers, lenders or boards ask how targets will be delivered, leadership needs more than a baseline and a slide. They need a workstream view, a decision log, and evidence that the programme can actually run.",
    ],
    contextualLink: {
      before:
        "Turning a baseline into a programme with owners, sequencing and a reporting rhythm is",
      anchor: "net zero and decarbonisation advisory",
      href: "/services/esg-advisory/net-zero-and-decarbonisation",
      after: ".",
    },
    faqs: [
      { question: "Do we need perfect Scope 3 data before building a roadmap?", answer: "No. You need enough confidence to identify hotspot categories, major dependencies, and where the data quality still limits decision-making. Waiting for perfect data delays action and usually does not improve governance." },
      { question: "Who should own a decarbonisation roadmap?", answer: "Leadership sponsorship often sits with the CFO, COO or CSO, but the roadmap itself needs distributed ownership across procurement, operations, facilities, logistics and product teams. A sustainability team alone cannot deliver it." },
      { question: "How detailed should the first roadmap be?", answer: "Detailed enough to assign owners, define workstreams, and set a management cadence. It does not need every project fully engineered on day one, but it must be specific enough to run monthly reviews." },
    ],
    resourceKey: "net_zero_roadmap",
    resourceCtaTitle: "Get the workbook",
    resourceCtaBody: "Receive the net zero roadmap starter workbook with hotspot framing, workstream design, and first-year sequencing prompts.",
    relatedServices: [
      { label: "Net zero and decarbonisation", href: "/services/esg-advisory/net-zero-and-decarbonisation" },
      { label: "Carbon accounting", href: "/services/esg-advisory/carbon-accounting" },
      { label: "Sustainability strategy", href: "/services/esg-advisory/sustainability-strategy" },
    ],
    relatedInsights: [
      { label: "Climate risk register template", href: "/insights/climate-risk-register-template", description: "Translate climate exposure into owned risks and actions" },
      { label: "Scope 3 supplier data request pack", href: "/insights/scope-3-supplier-data-request-pack", description: "Improve supplier-side emissions evidence" },
      { label: "CSRD readiness checklist", href: "/insights/csrd-readiness-first-90-days", description: "Governance and evidence for first-cycle CSRD work" },
    ],
  },

  "climate-risk-register-template": {
    slug: "climate-risk-register-template",
    title: "Climate risk register template",
    description:
      "A practical guide to structuring climate risk in a form leadership, finance and operations teams can review, prioritise and connect to action planning.",
    badge: "Downloadable template",
    displayDate: "13 April 2026",
    datePublished: "2026-04-13",
    dateModified: "2026-04-13",
    readTime: "7 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "A climate risk discussion becomes useful only when it moves out of narrative language and into a register with owners, time horizon, evidence and an agreed response path.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "The template is built for teams that need a climate risk register that can survive executive review, internal audit, and disclosure drafting.",
    whatYouGetCards: [
      { title: "Risk structure", description: "A clean way to separate physical and transition risks, short and long time horizons, and direct versus value-chain exposure." },
      { title: "Owner logic", description: "Prompts to assign business owners, not just sustainability reviewers, for each material exposure." },
      { title: "Financial linkage", description: "Fields that help teams connect risk statements to revenue, cost, capex, insurance or supply continuity implications." },
      { title: "Response tracking", description: "A way to log mitigation actions, adaptation responses, dependencies and review cadence." },
    ],
    rightForYou: [
      "You have climate risk language in reports, but no live management register behind it.",
      "Finance, operations and sustainability describe climate risk differently and need a common format.",
      "You are preparing for CSRD, UK climate reporting, or board-level climate risk review.",
      "Your current risk register is too generic to support action ownership or evidence trails.",
    ],
    sections: applySectionStyles([
      {
        id: "scope",
        title: "Section 1: Define the risk register properly",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "Separate climate risk from general ESG commentary.", detail: "A register should capture decision-relevant exposure, not broad sustainability aspirations. Keep the structure tight and operational." },
          { item: "Use consistent categories for physical and transition risk.", detail: "This avoids mixing flood, heat, carbon price, market shift and policy change in one undifferentiated list." },
          { item: "Add a time-horizon field for every risk.", detail: "Short, medium and long horizon views matter because ownership and urgency are different even when the topic sounds similar." },
          { item: "Define the unit of analysis once.", detail: "Decide whether risks will be assessed at enterprise, business unit, site, product line, or supplier level before data collection begins." },
        ],
      },
      {
        id: "evidence",
        title: "Section 2: Make evidence part of the register",
        colorClass: "bg-indigo-50 border-indigo-200",
        accentClass: "text-indigo-800",
        items: [
          { item: "Record the basis for each risk statement.", detail: "Scenario analysis, loss events, site exposure maps, policy analysis, customer requirements, and supplier issues should all be traceable." },
          { item: "Track confidence level and data gaps.", detail: "Leadership needs visibility into which risks are evidenced, which are directional, and where further work is needed." },
          { item: "Link the risk to the relevant asset, process or supplier set.", detail: "Risk entries become more actionable when the affected operation is clearly named." },
          { item: "Log assumptions that could materially change the rating.", detail: "This helps keep future reassessment disciplined rather than impressionistic." },
        ],
      },
      {
        id: "ownership",
        title: "Section 3: Assign ownership and response",
        colorClass: "bg-amber-50 border-amber-200",
        accentClass: "text-amber-800",
        items: [
          { item: "Assign a business owner and a reporting owner.", detail: "Business owners run the response. Reporting owners maintain the disclosure logic and evidence trail." },
          { item: "State whether the response is avoid, reduce, transfer, monitor or adapt.", detail: "A clear response type makes the risk register useful for decision-making, not just ranking." },
          { item: "Capture dependencies and blockers explicitly.", detail: "Insurance renewal, supplier data, capex approval, or product redesign may all sit outside the immediate owner team." },
          { item: "Set a review cadence aligned to the risk horizon.", detail: "Not every climate risk needs monthly review, but each one should have an intentional rhythm." },
        ],
      },
      {
        id: "reporting",
        title: "Section 4: Use the register in governance and reporting",
        colorClass: "bg-emerald-50 border-emerald-200",
        accentClass: "text-emerald-800",
        items: [
          { item: "Connect the register to the enterprise risk process where possible.", detail: "This avoids climate risk living in a parallel document with no management consequence." },
          { item: "Use the register as the source for disclosure drafting.", detail: "Narrative sections in reports should trace back to an owned register rather than ad hoc drafting workshops." },
          { item: "Escalate changes in risk rating through a formal channel.", detail: "Rating movement should follow defined governance, particularly when external disclosure could be affected." },
          { item: "Archive prior versions and decision notes.", detail: "Version history matters once auditors, boards or customers start asking how the view evolved." },
        ],
      },
    ]),
    whyItMatters: [
      "Climate risk is increasingly scrutinised by boards, lenders, customers and reporting frameworks. A high-level narrative may look polished, but without a working register there is little evidence that the risk is being managed systematically.",
      "A good register also improves internal alignment. It gives finance, operations, procurement and sustainability one shared format for discussing exposure, response cost, and ownership. That alone reduces a large amount of reporting friction.",
    ],
    contextualLink: {
      before:
        "Where the register needs to connect to disclosure obligations and to the systems that hold the underlying evidence, that is",
      anchor: "climate risk advisory",
      href: "/services/esg-advisory/climate-risk",
      after: ".",
    },
    faqs: [
      { question: "Should climate risks sit in the main enterprise risk register?", answer: "Where possible, yes. Many organisations still maintain a supporting climate risk register first, but the goal should be to link material climate exposures into the main risk governance structure." },
      { question: "Do we need scenario analysis before creating a register?", answer: "Not necessarily. You can start with a practical risk register using current evidence and then deepen selected risks with scenario analysis where exposure is material." },
      { question: "Who should own the climate risk register?", answer: "The sustainability or finance team often coordinates it, but the register should contain business owners for each material risk and not remain a sustainability-only artifact." },
    ],
    resourceKey: "climate_risk_register",
    resourceCtaTitle: "Get the template",
    resourceCtaBody: "Receive the climate risk register template with fields for risk type, owner, evidence, financial linkage and response action.",
    relatedServices: [
      { label: "Climate risk advisory", href: "/services/esg-advisory/climate-risk" },
      { label: "UK SECR and SRS reporting", href: "/services/esg-advisory/uk-secr-srs-reporting" },
      { label: "CSRD advisory", href: "/services/esg-advisory/csrd-advisory" },
    ],
    relatedInsights: [
      { label: "Net zero roadmap starter", href: "/insights/net-zero-roadmap-starter", description: "Move from baseline to owner-level action plan" },
      { label: "CDP response planning pack", href: "/insights/cdp-response-planning-pack", description: "Structure ownership before the reporting cycle" },
      { label: "What is double materiality", href: "/regulatory-hub/what-is-double-materiality", description: "Understand the logic behind impact and financial materiality" },
    ],
  },

  "scope-3-supplier-data-request-pack": {
    slug: "scope-3-supplier-data-request-pack",
    title: "Scope 3 supplier data request pack",
    description:
      "A working guide for leadership teams that need better supplier data without creating chaos across procurement, sustainability and operations.",
    badge: "Downloadable supplier pack",
    displayDate: "12 April 2026",
    datePublished: "2026-04-12",
    dateModified: "2026-04-12",
    readTime: "9 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "Most Scope 3 data problems are not calculation problems. They are supplier engagement problems with weak ownership, inconsistent asks, and no escalation path.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "The pack gives procurement and sustainability teams a cleaner way to request emissions-related supplier information, define evidence expectations, and run follow-up without burning credibility.",
    whatYouGetCards: [
      { title: "Supplier request template", description: "A structured data request that reduces ambiguity on what is being asked, for which period, and in what format." },
      { title: "Evidence prompts", description: "Guidance on the backup documents, methodology notes, and assumptions suppliers should provide when primary data is available." },
      { title: "Escalation logic", description: "A simple follow-up path for non-response, poor-quality data, or categories where estimates remain necessary." },
      { title: "Governance notes", description: "Owner fields, review cadence, and exception handling prompts to keep the process auditable." },
    ],
    rightForYou: [
      "You have material Scope 3 categories but weak supplier response quality.",
      "Procurement is being asked to collect climate data without a practical process or script.",
      "Different teams are approaching suppliers with inconsistent questions and timelines.",
      "You need a better evidence trail before reporting, assurance or customer disclosure requests expand.",
    ],
    sections: applySectionStyles([
      {
        id: "prioritisation",
        title: "Section 1: Start with the right suppliers and categories",
        colorClass: "bg-indigo-50 border-indigo-200",
        accentClass: "text-indigo-800",
        items: [
          { item: "Prioritise by material category, spend and supplier concentration.", detail: "The first request cycle should focus on suppliers that can materially improve the quality of category estimates or inform action planning." },
          { item: "Segment suppliers by response capability.", detail: "Some suppliers can provide activity data and methodology notes. Others need a lighter request or an education-first approach." },
          { item: "Define the minimum viable data set by category.", detail: "Transport, purchased goods, and capital goods often require different data fields. Avoid sending the same request to everyone." },
          { item: "Align the ask to the reporting period and intended use.", detail: "Suppliers are more likely to respond when they understand what period is needed and whether the data supports reporting, target-setting, or customer requests." },
        ],
      },
      {
        id: "request-design",
        title: "Section 2: Design the supplier request properly",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "State exactly what data is requested and why.", detail: "A supplier pack should explain the field, unit, time period, and the business context for the request in plain language." },
          { item: "Separate data fields from evidence fields.", detail: "Suppliers need to know what number is required and what supporting files or methodology notes will be acceptable." },
          { item: "Include a fallback path when primary data is unavailable.", detail: "This keeps the relationship constructive while still capturing whether industry factors or other estimation methods are being used." },
          { item: "Name the owner on your side.", detail: "Suppliers respond faster when they know who can answer questions and what the escalation route is." },
        ],
      },
      {
        id: "follow-up",
        title: "Section 3: Manage follow-up like a programme",
        colorClass: "bg-amber-50 border-amber-200",
        accentClass: "text-amber-800",
        items: [
          { item: "Set a response calendar with reminders and cut-off points.", detail: "Without defined windows, the request becomes an open loop that nobody closes." },
          { item: "Track reasons for non-response or low-quality data.", detail: "This creates intelligence for supplier enablement, contract discussions, or category-level estimation decisions." },
          { item: "Escalate through procurement where commercial relationships matter.", detail: "Supplier sustainability requests land better when procurement sponsors the process rather than forwarding it late." },
          { item: "Keep a category-level exception log.", detail: "This helps reporting teams explain where estimates remain necessary and what improvement actions are planned." },
        ],
      },
      {
        id: "evidence-governance",
        title: "Section 4: Build an evidence trail, not just a spreadsheet",
        colorClass: "bg-emerald-50 border-emerald-200",
        accentClass: "text-emerald-800",
        items: [
          { item: "Store supplier responses and supporting files consistently.", detail: "Mailbox-only evidence trails break quickly. The pack should be paired with a documented storage location and naming convention." },
          { item: "Record methodology assumptions next to the data.", detail: "This prevents reporting teams from re-litigating the same supplier explanations every cycle." },
          { item: "Log who reviewed the submission and what quality checks were performed.", detail: "A light-touch review log can materially improve assurance readiness later." },
          { item: "Translate the outcome into next-cycle supplier strategy.", detail: "Good supplier response should influence future engagement priority, education and contractual expectations." },
        ],
      },
    ]),
    whyItMatters: [
      "Scope 3 improvement usually depends on supplier engagement quality more than calculation sophistication. If supplier asks are late, unclear or poorly owned, the reporting cycle becomes estimate-heavy and leadership confidence drops.",
      "A better request process also creates commercial value. It reduces internal firefighting, protects supplier relationships, and gives procurement a more structured way to engage on climate performance where it matters most.",
    ],
    contextualLink: {
      before:
        "Designing the request process, the escalation path and the follow-up cycle across a supplier base is",
      anchor: "supplier engagement",
      href: "/services/esg-advisory/supplier-engagement",
      after: " work, and it sits upstream of the reporting cycle rather than inside it.",
    },
    faqs: [
      { question: "Should procurement or sustainability own supplier data requests?", answer: "The most effective model is usually shared. Sustainability defines the data logic and evidence expectations. Procurement anchors the supplier relationship and escalation path." },
      { question: "Do we need primary data from every supplier?", answer: "No. Start with material categories and suppliers where better data will most improve reporting quality or action planning. A targeted approach is usually more credible than an indiscriminate one." },
      { question: "How do we handle suppliers with weak climate maturity?", answer: "Use a lighter request, explain the purpose clearly, and allow structured fallback data while tracking where capability-building is needed in the next cycle." },
    ],
    resourceKey: "scope3_supplier_pack",
    resourceCtaTitle: "Get the supplier pack",
    resourceCtaBody: "Receive the request pack with supplier-facing fields, evidence prompts, escalation logic, and follow-up structure.",
    relatedServices: [
      { label: "Supplier engagement", href: "/services/esg-advisory/supplier-engagement" },
      { label: "Carbon accounting", href: "/services/esg-advisory/carbon-accounting" },
      { label: "EcoVadis readiness", href: "/services/esg-advisory/ecovadis-readiness" },
    ],
    relatedInsights: [
      { label: "EcoVadis evidence matrix", href: "/insights/ecovadis-evidence-matrix", description: "Organise policy, action, metrics and documents" },
      { label: "Net zero roadmap starter", href: "/insights/net-zero-roadmap-starter", description: "Translate hotspot categories into workstreams" },
      { label: "What is CSRD", href: "/regulatory-hub/what-is-csrd", description: "Understand the broader reporting context" },
    ],
  },

  "cdp-response-planning-pack": {
    slug: "cdp-response-planning-pack",
    title: "CDP response planning pack",
    description:
      "A structured way to run CDP response preparation before deadlines compress the work and expose ownership gaps.",
    badge: "Downloadable planning pack",
    displayDate: "11 April 2026",
    datePublished: "2026-04-11",
    dateModified: "2026-04-11",
    readTime: "7 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "The strongest CDP responses are coordinated months before submission. Scores usually fall when ownership, evidence and narrative drafting start too late.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "This pack is designed to help teams assign response ownership, collect evidence early, and make deliberate choices about where score improvement is realistic in the current cycle.",
    whatYouGetCards: [
      { title: "Question ownership map", description: "A way to allocate sections and evidence requests across sustainability, finance, operations, HR, procurement and legal." },
      { title: "Scoring focus prompts", description: "A practical filter to distinguish must-answer questions from the few areas where better evidence can materially improve the score." },
      { title: "Evidence tracker", description: "Simple fields for document location, reviewer, last update date, and gap status." },
      { title: "Submission cadence", description: "A compact project plan for internal review, draft locking, and executive sign-off." },
    ],
    rightForYou: [
      "You have responded to CDP before but want a more controlled process this cycle.",
      "You are preparing for a first response and need a practical internal plan rather than generic guidance.",
      "Your current documentation sits across multiple functions and no one owns the full response flow.",
      "You want to improve score quality without turning the process into a last-minute scramble.",
    ],
    sections: applySectionStyles([
      {
        id: "ownership-map",
        title: "Section 1: Build the ownership map first",
        colorClass: "bg-blue-50 border-blue-200",
        accentClass: "text-blue-800",
        items: [
          { item: "Assign section leads before content drafting begins.", detail: "CDP questions often touch multiple teams. Someone must own the final answer and supporting evidence for each section." },
          { item: "Clarify who is providing data versus who is approving narrative.", detail: "These are different roles. Blurring them creates delays and weak answer quality." },
          { item: "Set an internal deadline ahead of the external one.", detail: "You need time for consistency review, evidence checking, and executive sign-off before submission pressure peaks." },
          { item: "Document unanswered questions and dependencies early.", detail: "This gives leadership time to decide whether to close the gap, explain it, or leave it out of the current cycle." },
        ],
      },
      {
        id: "evidence-plan",
        title: "Section 2: Treat evidence as a workstream",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "Build an evidence list for every material answer.", detail: "Policy documents, board approvals, emissions methodology, supplier data, and target documentation should be logged before drafting starts." },
          { item: "Track evidence freshness and applicability.", detail: "A policy from three years ago or a metric with unclear scope can weaken an otherwise strong answer." },
          { item: "Note where narrative is stronger than the evidence base.", detail: "This is a common failure point. Strong claims without supporting documents create scoring risk." },
          { item: "Keep one shared evidence index.", detail: "Without it, review cycles become a search exercise across inboxes and folders." },
        ],
      },
      {
        id: "score-focus",
        title: "Section 3: Focus your improvement effort deliberately",
        colorClass: "bg-amber-50 border-amber-200",
        accentClass: "text-amber-800",
        items: [
          { item: "Identify the answers most likely to improve score quality this cycle.", detail: "Not every improvement is achievable in the same year. Prioritise where governance, evidence or clarity can materially change the response." },
          { item: "Separate quick documentation wins from structural programme gaps.", detail: "This helps leadership decide what can be fixed now versus what needs a longer implementation plan." },
          { item: "Align the narrative with what the organisation has actually approved.", detail: "It is better to be precise and defensible than broad and vulnerable to challenge." },
          { item: "Keep a carry-forward list for the next cycle.", detail: "A good response process does not end at submission. It creates the backlog for operational improvement." },
        ],
      },
      {
        id: "review-cadence",
        title: "Section 4: Run a defined review cadence",
        colorClass: "bg-emerald-50 border-emerald-200",
        accentClass: "text-emerald-800",
        items: [
          { item: "Use weekly control meetings during the active response period.", detail: "Short, decision-oriented meetings work better than long drafting sessions without ownership clarity." },
          { item: "Lock answer versions and change history.", detail: "This prevents the same answer shifting silently across reviewers and cuts down on inconsistency." },
          { item: "Escalate unresolved gaps before final review.", detail: "Late-stage uncertainty should be a leadership decision, not a drafting accident." },
          { item: "Store the final answer pack for next year.", detail: "A strong archive materially reduces effort in the next cycle and improves response quality over time." },
        ],
      },
    ]),
    whyItMatters: [
      "CDP scoring often reflects the quality of internal coordination as much as the maturity of the programme itself. Teams that assign ownership, evidence and review steps early usually produce more coherent and defensible submissions.",
      "The process can also become a management tool. A well-run response cycle surfaces governance gaps, missing approvals, weak data, and programme dependencies that leadership should address beyond the submission window.",
    ],
    contextualLink: {
      before:
        "Running the cycle with named owners, an evidence trail and a review step before submission is",
      anchor: "CDP reporting support",
      href: "/services/esg-advisory/cdp-reporting",
      after: ".",
    },
    faqs: [
      { question: "Can a first-time responder still build a strong CDP process?", answer: "Yes. A first response does not need to be perfect, but it does need clear ownership, evidence discipline, and realistic scoping of what can be supported this cycle." },
      { question: "Should CDP be owned by one person?", answer: "It needs one overall coordinator, but the content and evidence usually sit across multiple functions. Treating CDP as a one-person exercise is a common failure mode." },
      { question: "How early should preparation start?", answer: "Ideally before the response window opens, particularly if policy, target or emissions evidence still needs internal review or board approval." },
    ],
    resourceKey: "cdp_planning_pack",
    resourceCtaTitle: "Get the planning pack",
    resourceCtaBody: "Receive the CDP planning pack with ownership mapping, evidence tracking, scoring focus prompts, and review cadence.",
    relatedServices: [
      { label: "CDP reporting", href: "/services/esg-advisory/cdp-reporting" },
      { label: "Climate risk advisory", href: "/services/esg-advisory/climate-risk" },
      { label: "Sustainability strategy", href: "/services/esg-advisory/sustainability-strategy" },
    ],
    relatedInsights: [
      { label: "Climate risk register template", href: "/insights/climate-risk-register-template", description: "Strengthen the risk inputs behind disclosures" },
      { label: "EcoVadis evidence matrix", href: "/insights/ecovadis-evidence-matrix", description: "Organise cross-functional evidence for submissions" },
      { label: "What is ESRS", href: "/regulatory-hub/what-is-esrs", description: "Useful context for broader sustainability disclosure design" },
    ],
  },

  "ecovadis-evidence-matrix": {
    slug: "ecovadis-evidence-matrix",
    title: "EcoVadis evidence matrix",
    description:
      "A practical submission-planning guide for teams that need to organise policy, action, metrics and supporting evidence before they start uploading documents.",
    badge: "Downloadable evidence matrix",
    displayDate: "10 April 2026",
    datePublished: "2026-04-10",
    dateModified: "2026-04-10",
    readTime: "8 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "EcoVadis scores evidence, not intent. Strong programmes still underperform when policies, action logs, and metrics cannot be assembled into a defensible submission pack.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "The matrix is designed for teams that want to see the submission as an evidence system, not a last-minute document collection exercise.",
    whatYouGetCards: [
      { title: "Theme-by-theme structure", description: "A single matrix covering environment, labour and human rights, ethics and sustainable procurement." },
      { title: "Evidence typing", description: "Prompts for policy, action, metrics, certification and supporting records, so teams know what kind of document is actually needed." },
      { title: "Gap visibility", description: "A clear way to see where policy exists without action evidence, or where actions exist without measurable metrics." },
      { title: "Review ownership", description: "Fields for owner, reviewer, status and submission-readiness notes." },
    ],
    rightForYou: [
      "You have sustainability activity underway but struggle to package it into a strong EcoVadis submission.",
      "Your policies, records and metrics are spread across HR, procurement, compliance, operations and sustainability.",
      "You want to reduce avoidable evidence gaps before upload starts.",
      "You need a cleaner way to prioritise what is missing versus what simply needs better organisation.",
    ],
    sections: applySectionStyles([
      {
        id: "framework",
        title: "Section 1: Use a matrix, not a document dump",
        colorClass: "bg-emerald-50 border-emerald-200",
        accentClass: "text-emerald-800",
        items: [
          { item: "Map each theme to policy, action, metrics and evidence types.", detail: "This quickly shows whether a topic is genuinely supported or only partially documented." },
          { item: "Log document ownership and source location.", detail: "This prevents review rounds from turning into a search exercise across multiple teams." },
          { item: "Track recency and applicability of each document.", detail: "A document may exist but still be outdated, off-scope, or insufficiently specific for the submission." },
          { item: "Keep a separate note for planned but incomplete evidence.", detail: "This avoids over-claiming while still helping leadership see where investment is needed." },
        ],
      },
      {
        id: "quality",
        title: "Section 2: Test evidence quality, not just presence",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "Check whether the policy is approved, current and accessible.", detail: "A draft or internal-only note may not support the claim you want to make." },
          { item: "Check whether actions are evidenced by records, not just narrative.", detail: "Training logs, supplier engagement records, audit findings, and programme artefacts often matter more than descriptive text." },
          { item: "Check whether metrics are specific and time-bound.", detail: "Weak metric evidence is a common reason strong programmes still look immature in scoring terms." },
          { item: "Check whether the evidence lines up across teams.", detail: "Procurement, HR and sustainability documents should tell a consistent story rather than contradict each other." },
        ],
      },
      {
        id: "prioritisation",
        title: "Section 3: Prioritise high-value fixes",
        colorClass: "bg-indigo-50 border-indigo-200",
        accentClass: "text-indigo-800",
        items: [
          { item: "Identify where a small document fix can unlock a stronger submission.", detail: "Version control, formal approval, metric formatting, or evidence pairing can matter more than creating new content from scratch." },
          { item: "Separate structural gaps from packaging gaps.", detail: "Some issues require programme design. Others simply require better organisation and clearer linkage." },
          { item: "Assign a review owner for each missing item.", detail: "Open gaps should have names and dates attached to them, not just comments in a spreadsheet." },
          { item: "Decide which themes need executive escalation.", detail: "Ethics or procurement gaps often need leadership intervention when evidence is weak or fragmented." },
        ],
      },
      {
        id: "submission",
        title: "Section 4: Prepare the submission pack deliberately",
        colorClass: "bg-amber-50 border-amber-200",
        accentClass: "text-amber-800",
        items: [
          { item: "Lock the evidence list before upload.", detail: "A finalised matrix prevents duplicate uploads, inconsistent documentation, and late confusion." },
          { item: "Review file naming and description quality.", detail: "Clear naming and concise submission notes make the pack easier to defend and reuse later." },
          { item: "Archive the final matrix with score feedback.", detail: "This gives you a stronger base for the next submission cycle and helps connect scoring outcomes to specific evidence gaps." },
          { item: "Turn missing evidence into an operating backlog.", detail: "The submission should feed the next 6 to 12 months of ESG execution, not end as a one-off administrative event." },
        ],
      },
    ]),
    whyItMatters: [
      "EcoVadis rewards evidence maturity. Organisations that already have strong activity can still underperform when the supporting records are inconsistent, outdated or poorly linked to the scoring themes.",
      "A matrix also helps leadership make sharper trade-offs. It shows which gaps are documentation issues, which are programme design issues, and where limited team capacity should be directed first.",
    ],
    contextualLink: {
      before:
        "Working through the scoring themes, the evidence gaps and the sequence to close them is",
      anchor: "EcoVadis readiness",
      href: "/services/esg-advisory/ecovadis-readiness",
      after: ".",
    },
    faqs: [
      { question: "Can we improve our score without creating a lot of new policies?", answer: "Sometimes, yes. Many teams first need better evidence pairing, approvals, metric discipline, and document organisation before they need completely new policies." },
      { question: "Who should own the EcoVadis evidence matrix?", answer: "Usually one coordinator, often in sustainability, procurement or compliance, with named contributors from the functions where the evidence actually sits." },
      { question: "Is EcoVadis only about documents?", answer: "No. It is about documented evidence of policy, action and outcomes. The underlying programme matters, but it must be visible in defensible artefacts." },
    ],
    resourceKey: "ecovadis_evidence_matrix",
    resourceCtaTitle: "Get the evidence matrix",
    resourceCtaBody: "Receive the EcoVadis evidence matrix with theme mapping, owner fields, document logic, and gap tracking prompts.",
    relatedServices: [
      { label: "EcoVadis readiness", href: "/services/esg-advisory/ecovadis-readiness" },
      { label: "Supplier engagement", href: "/services/esg-advisory/supplier-engagement" },
      { label: "Sustainability training", href: "/services/esg-advisory/sustainability-training" },
    ],
    relatedInsights: [
      { label: "Scope 3 supplier data request pack", href: "/insights/scope-3-supplier-data-request-pack", description: "Improve supplier evidence quality upstream" },
      { label: "ESG tender response question bank", href: "/insights/esg-tender-response-question-bank", description: "Reuse evidence in commercial questionnaires" },
      { label: "BRSR value chain data collection", href: "/regulatory-hub/brsr-value-chain-data-collection", description: "Further reading on value chain data discipline" },
    ],
  },

  "sustainability-steering-committee-charter": {
    slug: "sustainability-steering-committee-charter",
    title: "Sustainability steering committee charter",
    description:
      "A practical governance guide for leadership teams that need a real ESG operating cadence, not a vague cross-functional working group.",
    badge: "Downloadable charter",
    displayDate: "9 April 2026",
    datePublished: "2026-04-09",
    dateModified: "2026-04-09",
    readTime: "8 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "ESG programmes drift when everyone attends the meeting but nobody knows who decides, who delivers, what gets escalated, or how evidence is tracked between sessions.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "The charter helps leadership teams move from informal coordination to an owned governance model with defined cadence, decision rights, and issue escalation.",
    whatYouGetCards: [
      { title: "Committee scope", description: "Prompts to define whether the committee governs reporting, target delivery, customer requirements, supplier risk, or all of the above." },
      { title: "Decision rights", description: "A simple way to separate review items, decision items, and escalation items so meetings actually move work forward." },
      { title: "Cadence and pack", description: "Suggested agenda sections, reporting pack fields, and pre-read expectations." },
      { title: "Owner model", description: "Fields for sponsor, chair, secretariat, workstream leads, and escalation owners." },
    ],
    rightForYou: [
      "Your ESG work is spread across multiple teams but there is no effective leadership cadence.",
      "Meetings happen, but decisions, actions and escalations are not consistently documented.",
      "You need clearer roles between finance, sustainability, procurement, HR, operations and legal.",
      "Reporting and programme delivery are starting to overlap and need one governance structure.",
    ],
    sections: applySectionStyles([
      {
        id: "mandate",
        title: "Section 1: Define the committee mandate properly",
        colorClass: "bg-violet-50 border-violet-200",
        accentClass: "text-violet-800",
        items: [
          { item: "State what the committee governs and what it does not.", detail: "A charter should define whether the group owns reporting readiness, programme delivery, customer commitments, or a combination." },
          { item: "Link the committee to named reporting and workstream obligations.", detail: "This keeps the group tied to outcomes rather than turning it into a discussion forum." },
          { item: "Clarify how the committee interacts with board or executive review.", detail: "The steering committee should have a clear escalation path upward rather than acting as a dead end." },
          { item: "Define success in operational terms.", detail: "Meeting regularly is not success. On-time decisions, closed actions, and improved evidence discipline are." },
        ],
      },
      {
        id: "membership",
        title: "Section 2: Set the membership and owner model",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "Name a chair, sponsor and secretariat.", detail: "Without these roles the cadence weakens quickly and follow-up quality drops." },
          { item: "Use standing members only where ongoing decisions are needed.", detail: "Over-large committees dilute accountability and often slow the quality of discussion." },
          { item: "Name workstream owners who are accountable between meetings.", detail: "The committee should review progress, not create work ownership from scratch every month." },
          { item: "Define how subject-matter experts join for specific agenda items.", detail: "This keeps the group lean while still allowing detailed issues to be addressed when needed." },
        ],
      },
      {
        id: "cadence-pack",
        title: "Section 3: Standardise the cadence and meeting pack",
        colorClass: "bg-indigo-50 border-indigo-200",
        accentClass: "text-indigo-800",
        items: [
          { item: "Use a fixed monthly or quarterly cadence with pre-read timing.", detail: "Variable meeting rhythm weakens governance because action cycles become unpredictable." },
          { item: "Split the meeting pack into status, decisions and risks.", detail: "This helps leaders spend time where decisions are needed rather than reviewing long updates without action." },
          { item: "Carry a visible action log between meetings.", detail: "Actions should have owner, due date, and closure status. Otherwise the same issues recycle indefinitely." },
          { item: "Document which metrics and evidence are reviewed each cycle.", detail: "The pack should make it obvious what has changed since the last meeting and where intervention is required." },
        ],
      },
      {
        id: "escalation",
        title: "Section 4: Build escalation and change control into the charter",
        colorClass: "bg-amber-50 border-amber-200",
        accentClass: "text-amber-800",
        items: [
          { item: "Set rules for escalating blocked actions.", detail: "Budget, supplier non-response, policy approval delays, or methodology disputes all need a defined route out of the working level." },
          { item: "Track decisions that change scope, targets or reporting assumptions.", detail: "This creates a governance trail that helps later when the programme is questioned by auditors or customers." },
          { item: "State how urgent matters are handled outside the meeting cycle.", detail: "Not every issue can wait for the next scheduled forum. The charter should define interim approval paths." },
          { item: "Archive meeting outputs consistently.", detail: "Minutes, packs and decision logs form part of the evidence trail for how the programme is actually run." },
        ],
      },
    ]),
    whyItMatters: [
      "Many ESG programmes fail because they rely on goodwill across functions rather than a governance model. A steering committee charter creates the minimum operating structure for decision-making, prioritisation and evidence-backed execution.",
      "It also improves efficiency. When the cadence, pack and escalation rules are clear, leadership time is spent making decisions instead of rediscovering who owns what in every meeting.",
    ],
    faqs: [
      { question: "Should the steering committee be separate from the board?", answer: "Usually yes. The steering committee runs the working governance and escalates to the board or executive committee where major decisions, approvals or disclosures require it." },
      { question: "How often should the committee meet?", answer: "Monthly is common during active build phases. Quarterly can work once the programme stabilises, but only if actions are tracked properly between meetings." },
      { question: "Can one charter cover both reporting and programme delivery?", answer: "Yes, if the scope is clearly defined. The charter should explicitly state which reporting obligations and delivery workstreams fall within the committee remit." },
    ],
    resourceKey: "steering_committee_charter",
    resourceCtaTitle: "Get the charter",
    resourceCtaBody: "Receive the steering committee charter with role definitions, cadence guidance, agenda structure, and escalation prompts.",
    relatedServices: [
      { label: "Sustainability strategy", href: "/services/esg-advisory/sustainability-strategy" },
      { label: "Outsourced sustainability management", href: "/services/esg-advisory/outsourced-sustainability-management" },
      { label: "Sustainability training", href: "/services/esg-advisory/sustainability-training" },
    ],
    relatedInsights: [
      { label: "Net zero roadmap starter", href: "/insights/net-zero-roadmap-starter", description: "Use the committee to govern roadmap delivery" },
      { label: "EcoVadis evidence matrix", href: "/insights/ecovadis-evidence-matrix", description: "Turn submission gaps into committee actions" },
      { label: "CSRD readiness checklist", href: "/insights/csrd-readiness-first-90-days", description: "See how governance and evidence interact in reporting" },
    ],
  },

  "esg-tender-response-question-bank": {
    slug: "esg-tender-response-question-bank",
    title: "ESG tender response question bank",
    description:
      "A commercial-use guide for teams that keep answering ESG questions in customer tenders, procurement forms, and supplier questionnaires with no standard playbook behind them.",
    badge: "Downloadable question bank",
    displayDate: "8 April 2026",
    datePublished: "2026-04-08",
    dateModified: "2026-04-08",
    readTime: "7 min read",
    ...standardInsightTheme,
    quote: {
      text:
        "Commercial teams lose time and consistency when every ESG questionnaire is treated as a new project. A question bank creates repeatability without sacrificing accuracy.",
      attribution: "Jigar Dhabalia, Co-founder, DS Consulting",
    },
    author: jigar,
    whatYouGetIntro:
      "The question bank is structured to help commercial, procurement, compliance and sustainability teams reuse standard answer blocks, route exceptions, and attach the right evidence faster.",
    whatYouGetCards: [
      { title: "Question categories", description: "A grouped bank covering policy, targets, emissions, climate risk, supplier management, governance and training questions." },
      { title: "Answer logic", description: "Prompts to define standard answers, escalation answers, and evidence-linked answers rather than rewriting from scratch." },
      { title: "Owner routing", description: "Fields to route questions to sales, procurement, sustainability, legal or HR depending on subject matter." },
      { title: "Evidence references", description: "A simple way to connect standard answers to policy documents, data packs, and approved statements." },
    ],
    rightForYou: [
      "Your team regularly receives customer or supplier ESG questionnaires.",
      "Sales, bid, procurement and sustainability teams are duplicating effort on similar questions.",
      "You want more consistent responses and less last-minute chasing for evidence.",
      "You need a structured way to handle questions that go beyond what is currently approved or documented.",
    ],
    sections: applySectionStyles([
      {
        id: "taxonomy",
        title: "Section 1: Build the question taxonomy first",
        colorClass: "bg-teal-50 border-teal-200",
        accentClass: "text-teal-800",
        items: [
          { item: "Group questions by theme and response owner.", detail: "This helps identify where the same core answer is being recreated in different commercial contexts." },
          { item: "Separate factual, narrative and commitment-based questions.", detail: "Factual questions can often be standardised. Commitment-based questions usually need tighter approval control." },
          { item: "Track which questions recur most often.", detail: "The highest-frequency questions should be standardised first because they create the biggest efficiency gain." },
          { item: "Flag questions that require escalation or legal review.", detail: "Claims about future targets, supplier coverage, or certifications often need a higher approval threshold." },
        ],
      },
      {
        id: "answer-library",
        title: "Section 2: Create a usable answer library",
        colorClass: "bg-slate-50 border-slate-200",
        accentClass: "text-slate-800",
        items: [
          { item: "Write standard answers in approved language.", detail: "The goal is to reduce rewrite time while keeping claims consistent with what leadership has actually approved." },
          { item: "Attach evidence references next to the answer.", detail: "This improves speed and prevents teams from sending answers that cannot be backed up later." },
          { item: "Include a 'how to customise' note where needed.", detail: "Some answers need tailoring by geography, entity or customer segment. The bank should show where that is allowed." },
          { item: "Version-control sensitive answers.", detail: "Questions about targets, assurance or value chain coverage should be updated with a visible approval history." },
        ],
      },
      {
        id: "routing",
        title: "Section 3: Route and escalate efficiently",
        colorClass: "bg-indigo-50 border-indigo-200",
        accentClass: "text-indigo-800",
        items: [
          { item: "Name a coordination owner for questionnaire intake.", detail: "Without a front-door owner, deadlines get missed and questions scatter across teams." },
          { item: "Define turnaround expectations by question type.", detail: "Simple repeat questions should not wait behind complex policy or disclosure questions." },
          { item: "Escalate unapproved claims quickly.", detail: "Commercial pressure should not result in statements the organisation cannot substantiate later." },
          { item: "Keep a log of unanswered or weakly-supported questions.", detail: "This becomes a useful backlog for programme and evidence development." },
        ],
      },
      {
        id: "reuse",
        title: "Section 4: Turn tender pressure into programme improvement",
        colorClass: "bg-amber-50 border-amber-200",
        accentClass: "text-amber-800",
        items: [
          { item: "Review question trends quarterly.", detail: "This shows what customers and procurement teams increasingly expect and where your evidence base may be lagging." },
          { item: "Connect repeated weak areas to service or programme priorities.", detail: "Tender friction often reveals where policy, metrics or supplier coverage need strengthening." },
          { item: "Archive strong responses for reuse.", detail: "A curated bank becomes more valuable over time and reduces dependence on a few knowledgeable individuals." },
          { item: "Feed the bank from reporting and service updates.", detail: "As disclosures, targets or governance models evolve, the commercial answer library should be refreshed accordingly." },
        ],
      },
    ]),
    whyItMatters: [
      "ESG questions now appear in sales processes, supplier onboarding, customer reviews, and formal tenders. Teams that answer them ad hoc waste time, make inconsistent claims, and create avoidable legal or reputational risk.",
      "A structured question bank shortens response time and improves quality. It also helps leadership see which external asks are becoming commercially important and where the underlying programme needs to catch up.",
    ],
    contextualLink: {
      before:
        "Building the approved answer set and the ownership behind it is",
      anchor: "RFP and tender support",
      href: "/services/esg-advisory/rfp-tender-support",
      after: ".",
    },
    faqs: [
      { question: "Should sales teams answer ESG questionnaires on their own?", answer: "Usually no. Sales may coordinate the response, but factual claims, commitments and evidence references should come from approved owners and standard answer blocks." },
      { question: "How often should a question bank be updated?", answer: "At minimum quarterly, and any time there is a significant change in policy, target, assurance status, or external disclosure language." },
      { question: "Can the same bank support both customer tenders and supplier questionnaires?", answer: "Yes, with careful categorisation. Many topics overlap, but the owner routing and evidence expectations may differ slightly by use case." },
    ],
    resourceKey: "esg_tender_question_bank",
    resourceCtaTitle: "Get the question bank",
    resourceCtaBody: "Receive the ESG tender response question bank with answer categories, owner routing, and evidence-reference fields.",
    relatedServices: [
      { label: "RFP and tender support", href: "/services/esg-advisory/rfp-tender-support" },
      { label: "Outsourced sustainability management", href: "/services/esg-advisory/outsourced-sustainability-management" },
      { label: "EcoVadis readiness", href: "/services/esg-advisory/ecovadis-readiness" },
    ],
    relatedInsights: [
      { label: "EcoVadis evidence matrix", href: "/insights/ecovadis-evidence-matrix", description: "Organise the evidence behind commercial claims" },
      { label: "Sustainability steering committee charter", href: "/insights/sustainability-steering-committee-charter", description: "Govern issues that recur across customer asks" },
      { label: "What is SEBI BRSR", href: "/regulatory-hub/what-is-sebi-brsr", description: "Regulatory context for India-linked disclosure questions" },
    ],
  },
};

export function getEsgInsightPage(slug: string) {
  return esgInsightPages[slug];
}
