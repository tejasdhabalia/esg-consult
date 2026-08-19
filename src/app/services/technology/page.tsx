import PillarHub from "@/components/PillarHub";
import { pillars } from "@/lib/service-pillars";
import { pageMetadata } from "@/lib/page-metadata";

const pillar = pillars.find((item) => item.route === "/services/technology")!;

export const metadata = pageMetadata({
  title: "Technology",
  description:
    "Commerce platforms, ERP, CRM, integration and AI governance for mid-market companies. Selection, build and delivery by people who can read both the system and the business case.",
  path: "/services/technology",
});

export default function TechnologyPillarPage() {
  return (
    <PillarHub
      pillar={pillar}
      heroTitle="The systems the company actually runs on"
      heroSubtitle="From the platform that takes the order to the reporting the board reads. We select, build, integrate and govern them, and we are paid only by you."
      heroImage="/hero/services.jpg"
      heroImageAlt="Technology systems for mid-market companies"
      problemHeading="Nobody owns the join"
      problemParagraphs={[
        "A technology project has two halves and they are usually bought from different people. A strategy firm writes the requirements. An implementation partner builds against them. Each does its own half competently.",
        "What nobody owns is the join. Requirements get written by people who will not use the system. The build follows them faithfully, including the parts that made no commercial sense. Scope moves one change request at a time, each reasonable on its own, and no one is reading the cumulative effect against the business case the board approved.",
        "We hold both ends. The same people scope the work and deliver it, which is the only reliable way to stop a design decision quietly becoming something else during the build.",
      ]}
      signals={[
        "A vendor has been recommended to you and you cannot tell whether it is the right one or the one somebody earns from.",
        "The project is reported as on track but the go-live date has moved twice.",
        "Someone spends a day a month moving data between two systems by hand.",
        "Staff are already using AI tools with company data and there is no policy covering it.",
        "Finance and sales report different numbers for the same thing and both are reading their own system correctly.",
      ]}
      faqs={[
        {
          question: "Do you do the consulting and the implementation, or just one?",
          answer:
            "Both. We scope the work and we deliver it. Where a project needs specialists we do not hold in house, they are introduced to you during scoping rather than after you have signed.",
        },
        {
          question: "What makes you different from a systems integrator?",
          answer:
            "Depth on both sides. We have built these systems, so we can tell a configuration from a customisation and design an interface that survives contact with real data. We also read a business case, a close calendar and a board pack, so we can tell which requirement is load bearing and which is a preference somebody wrote down in a workshop.",
        },
        {
          question: "Which platforms do you work on?",
          answer:
            "Whatever you already run, plus whatever the selection points to. We hold no reseller agreement, certification or partner status with any software vendor, so platform choice is assessed on fit rather than on what we are accredited in.",
        },
        {
          question: "Can you come in halfway through a project that has already gone wrong?",
          answer:
            "Yes, and that is often when we are called. We start by establishing what was actually agreed at the outset and what has been built against it. The gap between those two is usually the whole conversation.",
        },
        {
          question: "Do you provide IT support or manage our infrastructure?",
          answer:
            "No. We do not provide IT support, help desk, networking or hardware, and we do not resell software.",
        },
      ]}
    />
  );
}
