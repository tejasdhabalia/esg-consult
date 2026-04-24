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
  // BATCH 1 - Top-level pages
  // ============================================================
  "/": {
    title: "ESG readiness and revenue visibility",
    description:
      "Governed ESG reporting and revenue visibility systems for leadership teams. Advisory plus implementation across CSRD, BRSR, SECR, Marketing Automation and CRM governance.",
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
      "Referrals, ecosystem collaboration and structured service alliances. Includes a strategic finance partnership program with outsource accounting firm.",
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
  // BATCH 2 onwards - to be added
  // ============================================================
};
