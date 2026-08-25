import PillarHub from "@/components/PillarHub";
import { pillars } from "@/lib/service-pillars";
import { pageMetadata } from "@/lib/page-metadata";

/**
 * VERIFY BEFORE PUBLISHING.
 *
 * This page describes a delivery model that involves a partner firm. Two
 * things need checking against the actual commercial arrangement before it
 * goes live, then delete this comment:
 *
 *   1. That clients are introduced to the offshore team during scoping.
 *      The page states this. If it is not what happens, the line comes out.
 *   2. That the partner is genuinely technology agnostic and takes no
 *      software vendor incentives. The page states this too, and it is the
 *      reason the arrangement does not sit against our independence claim.
 *
 * The partner is deliberately not named. That is a commercial choice and
 * not a disclosure problem: what a buyer needs to know is that delivery is
 * not our own staff, and the page says so plainly.
 */

const pillar = pillars.find((item) => item.route === "/services/finance-and-accounting")!;

export const metadata = pageMetadata({
  title: "Finance and accounting outsourcing",
  description:
    "Offshore finance and accounting teams for mid-market companies. Capacity that scales, with the systems the function runs in built and owned in the same place.",
  path: "/services/finance-and-accounting",
});

export default function FinanceAndAccountingPillarPage() {
  return (
    <PillarHub
      pillar={pillar}
      heroTitle="Most finance problems are capacity problems wearing a systems costume"
      heroSubtitle="Offshore finance and accounting teams for companies that need people rather than another tool. Built alongside the systems the function actually works in."
      heroImage="/hero/revenue.jpg"
      heroImageAlt="Finance and accounting outsourcing"
      heroNote="Offshore delivery runs through a partner firm rather than our own staff. You meet the team during scoping."
      problemHeading="The close takes three weeks and everyone has stopped mentioning it"
      problemParagraphs={[
        "A finance team that is two people short does not fail loudly. It absorbs. Reconciliations move to the end of the quarter, management accounts arrive late enough that nobody acts on them, and the controller spends their week on transaction processing rather than on the things they were hired for.",
        "The usual response is to buy something. A new system, a reporting layer, an automation tool. Sometimes that is right. Often the constraint is simply hours, and adding software to an under-resourced team makes the first six months worse rather than better.",
        "This work exists because we kept finding that during technology assessments. The honest recommendation was frequently people rather than product, and being unable to offer that meant recommending a system we knew would not fix the actual problem.",
      ]}
      signals={[
        "The month end close takes longer than it did two years ago and nobody has said so out loud.",
        "Your controller spends most of their week on transaction processing.",
        "Hiring locally for a finance role has taken more than three months.",
        "Management accounts arrive late enough that they inform nothing.",
        "You are considering a new finance system, and the honest reason is that the current team cannot keep up.",
      ]}
      faqs={[
        {
          question: "Who actually does the work?",
          answer:
            "Offshore delivery runs through a partner firm rather than through our own staff, and you are introduced to the team during scoping rather than after signing. We remain accountable for the systems the function runs in and for the working relationship.",
        },
        {
          question: "Does this affect your independence on software recommendations?",
          answer:
            "No. Our independence rule concerns payments from software vendors, and our partner here is a technology-agnostic offshoring firm rather than a vendor. Nothing about the arrangement gives us a reason to recommend one platform over another.",
        },
        {
          question: "Why would we buy this from a technology firm?",
          answer:
            "Because an outsourced finance team is only as good as the systems it works in, and most outsourcing engagements inherit whatever is already there. Running the function and running the systems underneath it in one place removes the handoff where that usually gets lost.",
        },
        {
          question: "What size company does this suit?",
          answer:
            "It starts making sense at around ten employees in the finance function and scales from there. Below that the coordination overhead usually outweighs the capacity gained, and we will say so.",
        },
        {
          question: "Is this the same as the strategic finance partnership programme?",
          answer:
            "No. That programme is for advisors and consultants who work with CFOs and want a commercial arrangement behind those introductions. This is the client-facing service. If you are an advisor rather than a company looking for finance capacity, that page is the relevant one.",
        },
        {
          question: "Do you provide statutory audit?",
          answer:
            "No. We do not provide audit or assurance of any kind.",
        },
      ]}
    />
  );
}
