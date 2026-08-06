import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Systems selection",
  description:
    "Independent ERP, CRM and business systems selection for mid-market companies. Requirements, scored shortlist, structured demos and contract review. No vendor commissions.",
  path: "/services/systems-selection",
});

export default function SystemsSelectionPage() {
  return (
    <ServiceLinePage
      route="/services/systems-selection"
      label="Systems selection"
      heroTitle="Choosing the system is the cheapest part of the project to get right"
      heroSubtitle="We run the selection, you make the decision. Requirements built from how the business actually works, a scored shortlist you keep, and demos that test your processes rather than the vendor's favourite ones."
      heroImage="/hero/services.jpg"
      heroImageAlt="Systems selection for ERP, CRM and business platforms"
      problemHeading="Most selections are decided before the evaluation starts"
      problemParagraphs={[
        "A shortlist arrives from somewhere. Three vendors demo for two hours each, all of them impressive, all of them showing the parts of the product they are strongest at. A scoring sheet gets filled in afterwards to justify a decision that was already leaning one way.",
        "The cost of that shows up eighteen months later, in the workarounds nobody planned and the module that turned out to need a third party to make it usable. By then the switching cost is high enough that you live with it.",
        "We slow down the part that is cheap to slow down. Requirements first, written from how your close runs and how your orders actually flow, then vendors measured against those rather than against each other.",
      ]}
      scope={[
        {
          title: "Requirements definition",
          detail:
            "Built by sitting with the people who will use the system, not by circulating a template. Each requirement is marked load bearing or preference, because the two get treated very differently in scoring.",
        },
        {
          title: "Market scan and longlist",
          detail:
            "Who actually serves companies of your size in your sector, including the ones that do not advertise heavily. We say plainly where a product is a poor fit and why.",
        },
        {
          title: "Scored comparison",
          detail:
            "Weighted scoring against your requirements, with the weightings agreed by you before anyone demos. You keep the full matrix, not a summary slide.",
        },
        {
          title: "Structured demos",
          detail:
            "Scripts written around your processes. Same script for every vendor, so you are comparing like with like instead of comparing sales teams.",
        },
        {
          title: "Reference and viability checks",
          detail:
            "Conversations with comparable customers, plus a look at the vendor's financial position and product roadmap. A good product from a struggling vendor is still a risk.",
        },
        {
          title: "Commercial and contract review",
          detail:
            "Licence structure, implementation estimate, what is excluded, what the price does at renewal. This is where a good decision is most often undone.",
        },
      ]}
      deliverables={[
        "Requirements register, marked load bearing or preference, signed off by the business",
        "Weighted scoring matrix with every vendor scored against every requirement",
        "Demo scripts and the notes taken against them",
        "Reference call summaries",
        "Commercial comparison covering licence, implementation and five year cost",
        "A recommendation with the reasoning, and the case against it stated too",
      ]}
      signals={[
        "A vendor has been recommended to you and you cannot tell whether it is the right one or the one somebody earns from.",
        "Finance and operations disagree about what the new system needs to do, and the disagreement has never been written down.",
        "You have outgrown the current system but nobody can say precisely which part of it is the constraint.",
        "You have a shortlist that arrived without an explanation of how it was arrived at.",
      ]}
      faqs={[
        {
          question: "Do you have preferred vendors?",
          answer:
            "No. We take no commissions, referral fees, reseller margin or partner incentives from any software vendor, so we have no product we do better out of. We do have opinions, formed from implementations, and we will give you those with the reasoning attached.",
        },
        {
          question: "How long does a selection take?",
          answer:
            "Typically eight to fourteen weeks from requirements to recommendation, depending on how many stakeholders need to be involved and how quickly vendors respond. Requirements is the part that takes longest and the part worth not rushing.",
        },
        {
          question: "Can you help with the implementation afterwards?",
          answer:
            "Yes, either delivering it ourselves or overseeing the vendor's implementation partner. We will tell you honestly which of those makes more sense for the system you have chosen. We are not paid differently either way.",
        },
        {
          question: "What if the answer is to keep the system we have?",
          answer:
            "Then that is the recommendation. It happens, usually when the real problem is process or data rather than software. Finding that out in a selection is a far cheaper outcome than finding it out during an implementation.",
        },
        {
          question: "Do we have to run a full selection, or can you sanity check a decision we have already made?",
          answer:
            "Both are reasonable pieces of work. A review of a decision already taken is shorter and focuses on the requirements that were never tested and the commercial terms that were never challenged.",
        },
      ]}
    />
  );
}
