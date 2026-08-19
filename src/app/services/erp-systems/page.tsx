import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "ERP systems",
  description:
    "ERP selection, implementation and delivery oversight for mid-market companies. Requirements, scored vendor comparison, data migration and cutover, from the Tally ceiling upward.",
  path: "/services/erp-systems",
});

export default function ErpSystemsPage() {
  return (
    <ServiceLinePage
      route="/services/erp-systems"
      label="ERP systems"
      heroTitle="The ERP decision is cheap to get right and expensive to get wrong"
      heroSubtitle="Selection, implementation and the oversight that keeps the build tied to the business case. We run the evaluation, you make the decision, and the same people are still there at cutover."
      heroImage="/hero/lifecycle.jpg"
      heroImageAlt="ERP selection and implementation for mid-market companies"
      problemHeading="Most selections are decided before the evaluation starts"
      problemParagraphs={[
        "A shortlist arrives from somewhere. Three vendors demo for two hours each, all impressive, all showing the parts of the product they are strongest at. A scoring sheet gets completed afterwards to justify a decision that was already leaning one way.",
        "The cost surfaces eighteen months later, in the workarounds nobody planned and the module that turned out to need a third party to make it usable. By then the switching cost is high enough that you live with it.",
        "Then there is the migration itself, which is where most of the delay actually happens. Cutover gets treated as an event rather than a discipline. There is no rollback position anyone has tested, reconciliation is assumed rather than designed, and the decision about how much history to bring gets made by default inside a mapping spreadsheet.",
        "We slow down the part that is cheap to slow down and add rigour to the part that usually gets compressed.",
      ]}
      scope={[
        {
          title: "Requirements definition",
          detail:
            "Built by sitting with the people who will use the system. Each requirement marked load bearing or preference, because the two get weighted very differently and conflating them is how a shortlist ends up wrong.",
        },
        {
          title: "Scored vendor comparison",
          detail:
            "Weighted scoring against your requirements, with weightings agreed by you before anyone demos. Demo scripts written around your processes, the same script for every vendor, so you compare products rather than sales teams.",
        },
        {
          title: "Commercial and contract review",
          detail:
            "Licence structure, implementation estimate, what is excluded, and what the price does at renewal. This is where a good decision is most often undone.",
        },
        {
          title: "Implementation delivery or oversight",
          detail:
            "We either run the build or hold the implementation partner to the business case the board approved. Scope movement logged cumulatively, acceptance criteria written from requirements rather than from the design.",
        },
        {
          title: "Data migration and cutover",
          detail:
            "Extract, cleanse, map, load, reconcile. A tested rollback position, a defined cutover sequence, and parallel running across at least one full close before anyone declares it done.",
        },
        {
          title: "Multi-entity and sector complexity",
          detail:
            "Consolidation across entities, inter-warehouse stock movement, credit control and scheme management. The parts that break a value-tier tool and get underestimated in every implementation estimate.",
        },
      ]}
      deliverables={[
        "Requirements register marked load bearing or preference, signed off by the business",
        "Weighted scoring matrix with every vendor scored against every requirement",
        "Commercial comparison covering licence, implementation and five year cost",
        "Acceptance criteria mapped back to the original requirements",
        "Migration plan with cutover sequence, rollback position and reconciliation design",
        "Go-live readiness assessment with a go or no go recommendation",
      ]}
      signals={[
        "Multiple entities are consolidated by hand in Excel every month.",
        "A vendor has been recommended to you and you cannot tell whether it is the right one or the one somebody earns from.",
        "The implementation is reported as on track but the go-live date has moved twice.",
        "Change requests keep arriving and nobody can tell you what they add up to against the original business case.",
        "Month end close takes longer than it did two years ago.",
      ]}
      faqs={[
        {
          question: "Do you have preferred ERP vendors?",
          answer:
            "No. We take no commissions, referral fees, reseller margin or partner incentives from any software vendor, so there is no product we do better out of. We do have opinions formed from implementations, and you get those with the reasoning attached.",
        },
        {
          question: "How long does a selection take?",
          answer:
            "Typically eight to fourteen weeks from requirements to recommendation, depending on how many stakeholders are involved and how quickly vendors respond. Requirements takes longest and is the part worth not rushing.",
        },
        {
          question: "How long does the whole migration take?",
          answer:
            "For a mid-market business, typically six to twelve months from selection to a stable close on the new system, with parallel running across at least two month ends. Anyone quoting materially less has probably not asked about your entity structure.",
        },
        {
          question: "What if the answer is to keep the system we have?",
          answer:
            "Then that is the recommendation. It happens, usually when the real problem is process or data rather than software. Finding that out during a selection is far cheaper than finding it out during an implementation.",
        },
        {
          question: "Can you oversee an implementation somebody else is delivering?",
          answer:
            "Yes, and it is often when we are called. We hold scope against the business case, write independent acceptance criteria and run the readiness review. Good implementation partners tend to welcome a client-side counterpart who understands the technology.",
        },
        {
          question: "Our finance team is nervous about migrating. Is that unreasonable?",
          answer:
            "No, it is the most rational position in the room, because they absorb the disruption. A plan that treats their concerns as change resistance rather than as risk information is a plan that will surprise you at cutover.",
        },
      ]}
      engagementModes={[
        {
          route: "/services/systems-selection",
          label: "Systems selection",
          detail:
            "The full selection process in detail. Requirements, scored comparison, structured demos, reference checks and contract review.",
        },
        {
          route: "/services/implementation-oversight",
          label: "Implementation and delivery oversight",
          detail:
            "Client-side oversight when somebody else is building. Scope control against the business case, independent acceptance testing and go-live readiness.",
        },
      ]}
    />
  );
}
