import IndustryPage from "@/components/IndustryPage";
import { pageMetadata } from "@/lib/page-metadata";

/**
 * VERIFY BEFORE PUBLISHING.
 *
 * The provenance section below is deliberately narrower than the retail one.
 * It claims migration and cutover experience, not experience of operating a
 * distribution business, because that is what is defensible.
 *
 * Read it and do one of three things:
 *   a) Confirm it as written
 *   b) Replace it with something specific you have actually seen
 *   c) Set live: false for this industry in src/lib/industries.ts
 *
 * Then delete this comment. The rule from the map is that every piece is
 * traceable to something actually seen. This page is the test of it.
 */

export const metadata = pageMetadata({
  title: "Distribution, wholesale and trading",
  description:
    "Five signs your business has outgrown Tally. Why multi-entity, credit control and scheme management break the tool, and what a migration actually involves.",
  path: "/industries/distribution-and-wholesale",
});

export default function DistributionAndWholesalePage() {
  return (
    <IndustryPage
      route="/industries/distribution-and-wholesale"
      label="Distribution, wholesale and trading"
      heroTitle="The business outgrew Tally years ago"
      heroSubtitle="Everyone knows it. The migration keeps getting deferred, and the reason is almost never technical."
      heroImage="/hero/marketing.jpg"
      heroImageAlt="Distribution and wholesale systems"
      fractureHeading="Five signs the tool has become the constraint"
      fractureParagraphs={[
        "Tally is a good product that a very large number of Indian businesses have run well past the point it was designed for. The ceiling is real and it arrives in a recognisable order. Multiple entities being consolidated by hand in Excel each month. Multiple warehouses where stock movement between them is a journal entry rather than a tracked event. Credit control that lives in one person's memory of who is good for it. Scheme and discount management that changes every quarter and is reconciled after the fact. And a month end close that is measured in weeks because the numbers have to be assembled before they can be reviewed.",
        "What keeps the migration deferred is not cost and not the software. It is that the finance team knows Tally and nothing else, and the person who would have to sponsor the change is the person whose month end gets worse for two quarters while it happens.",
        "That is a legitimate fear and it is usually met with a business case full of benefits and silent on the disruption. So the decision gets pushed to next year, and each year the data set gets larger and the migration gets harder.",
        "The honest version says how bad the middle is, how long it lasts, and what specifically is being run in parallel while it does. A migration plan that does not describe the worst month is not a plan.",
      ]}
      stackIntro="Distribution stacks tend to be layered by growth rather than designed. The tool that was right at ₹10Cr is still there at ₹200Cr, with satellites bolted around it."
      stack={[
        {
          layer: "Core accounting, value tier",
          platforms: "Tally Prime, Busy, Marg ERP in pharma distribution",
        },
        {
          layer: "Core ERP, above the ceiling",
          platforms:
            "SAP Business One, Oracle NetSuite, Microsoft Dynamics 365 Business Central, Odoo, ERPNext, Acumatica",
        },
        {
          layer: "Warehouse",
          platforms:
            "A dedicated warehouse system once volumes justify it, or warehouse logic inside the ERP where they do not",
        },
        {
          layer: "Customer integration",
          platforms:
            "EDI or portal feeds to large customers. EDIFACT, ANSI X12, AS2 and PEPPOL matter more here than most finance teams realise, particularly for anyone shipping to a global retailer",
        },
        {
          layer: "Sales and field",
          platforms: "Zoho CRM, LeadSquared, Kylas or a distributor portal built in-house",
        },
      ]}
      relatedServices={[
        {
          route: "/services/systems-selection",
          label: "Systems selection",
          relevance:
            "Working out which system actually fits multi-entity and scheme complexity, and getting the scoring rather than a shortlist that arrived from somewhere.",
        },
        {
          route: "/services/implementation-oversight",
          label: "Implementation and delivery oversight",
          relevance:
            "Holding scope through the migration, and being the person who can recommend delaying a cutover when the data is not ready.",
        },
        {
          route: "/services/integration",
          label: "Integration",
          relevance:
            "Data migration design, parallel running, reconciliation between old and new, and the EDI feeds that cannot go dark during cutover.",
        },
      ]}
      provenanceHeading="Where this comes from"
      provenanceParagraphs={[
        "This one comes from the migration side rather than from running a distribution business, and it is worth being straight about the difference.",
        "The background is systems that could not be allowed to stop. Mainframe engineering in COBOL, DB2, CICS and VSAM, where a cutover has a fixed window, a rollback position that has to be real, and a reconciliation that has to balance before anyone goes home. That discipline is what most mid-market ERP migrations are missing, and it transfers directly.",
        "So the claim on this page is about how migrations succeed or fail, not about knowing your distribution business better than you do. If you want sector operating experience on top of that, ask, and we will tell you honestly where ours stops.",
      ]}
      faqs={[
        {
          question: "Is Tally the problem?",
          answer:
            "Usually not on its own. The problem is a set of processes that have grown around the tool's limits, and those processes travel with you if the migration only replaces the software. A meaningful share of the work is deciding which workarounds to stop doing.",
        },
        {
          question: "How long does a migration take?",
          answer:
            "For a mid-market distributor, typically six to twelve months from selection to a stable close on the new system, with parallel running across at least two month ends. Anyone quoting materially less has probably not asked about your entity structure or your scheme calculations.",
        },
        {
          question: "What happens to our history?",
          answer:
            "That is a business decision that gets made by default far too often. Bringing everything is expensive and slows the build. Bringing balances only is cheap and painful the first time someone needs a three year old transaction. We put the options and the costs in front of you rather than deciding it inside the mapping.",
        },
        {
          question: "Our finance team is nervous about this. Is that unreasonable?",
          answer:
            "No, it is the most rational position in the room. They are the ones who absorb the disruption. A plan that treats their concerns as change resistance rather than as risk information is a plan that will surprise you at cutover.",
        },
        {
          question: "Which ERP should we move to?",
          answer:
            "It depends on entity structure, scheme complexity, warehouse volumes and whether you have EDI obligations to large customers. We will score the options against those and hand you the scoring. We take no commission from any of them.",
        },
      ]}
    />
  );
}
