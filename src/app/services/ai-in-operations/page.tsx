import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "AI in operations",
  description:
    "Getting AI out of pilot and into operations for mid-market companies. Use case selection, data readiness, usage policy, accountability and a defined path to production.",
  path: "/services/ai-in-operations",
});

export default function AIInOperationsPage() {
  return (
    <ServiceLinePage
      route="/services/ai-in-operations"
      label="AI in operations"
      heroTitle="Most AI work stalls between the pilot and the day job"
      heroSubtitle="We scope where AI earns its place in an operational process, what data it needs, what happens when it is wrong, and who is accountable for that. Then we build it into the process rather than beside it."
      heroImage="/hero/insights.jpg"
      heroImageAlt="AI in operational processes for mid-market companies"
      problemHeading="The pilot worked. That was never the hard part"
      problemParagraphs={[
        "Everest Group's 2026 mid-market research found 57 percent of firms sitting in the pilot stage, 15 percent with something genuinely operationalised, and 7 percent with policies written for agentic systems specifically.",
        "The gap between those first two numbers is not a technology gap. A pilot runs on curated data, with an enthusiast watching the output. Production runs on whatever the source system contains that day, with someone who has a queue to clear and no reason to check.",
        "So the work is mostly unglamorous. Which decision in which process, measured against what. Where the data lives and whether anyone trusts it. What the review step is, who owns the output when it is wrong, and how you would know. Get those right and the model choice tends to matter less than expected.",
      ]}
      scope={[
        {
          title: "Use case selection",
          detail:
            "Assessed against an operational outcome you already measure, and against how much it costs when the answer is wrong. High volume with low cost of error is where this works. The reverse is where pilots go to die.",
        },
        {
          title: "Data readiness",
          detail:
            "What the process needs, where it currently sits, what state it is in, and who is allowed to see it. Frequently this is the whole project, and it is worth doing whether or not the AI part proceeds.",
        },
        {
          title: "Process redesign",
          detail:
            "Where the AI step actually sits, what a human does before and after it, and what the fallback is when it is unavailable. AI added alongside an unchanged process usually just adds a step.",
        },
        {
          title: "Usage policy and accountability",
          detail:
            "What staff may and may not put into which tools, what must be reviewed by a person, and who owns the output. Written to be followed, which means short and specific.",
        },
        {
          title: "Build and integration",
          detail:
            "Connecting the AI step to the systems the process already runs on, with the same error handling, logging and monitoring standards as any other interface.",
        },
        {
          title: "Path to production",
          detail:
            "Defined exit criteria from the pilot, agreed before the pilot starts. Including the criteria that mean you stop, which is the clause most pilots are missing.",
        },
      ]}
      deliverables={[
        "Use case shortlist scored against operational value and cost of error",
        "Data readiness assessment covering quality, access and permissions",
        "Redesigned process showing where the AI step sits and where a human reviews",
        "Written usage policy with named accountable owners",
        "Pilot design with defined exit criteria in both directions",
        "Production build, monitoring and handover documentation",
      ]}
      signals={[
        "You have run a pilot that worked and nobody can explain why it has not been rolled out.",
        "Staff are already using AI tools with company data and there is no policy covering it.",
        "A vendor has quoted for an AI module and you cannot assess whether it does anything your process needs.",
        "The board has asked what your AI strategy is and the honest answer is a list of experiments.",
        "You want to automate a process but the underlying data has never been trusted enough to report on.",
      ]}
      faqs={[
        {
          question: "Do you build models?",
          answer:
            "Rarely, and only where nothing available fits. For most mid-market operational use cases the model is a commodity and the value sits in data access, process design and accountability. If someone is quoting you for a bespoke model, it is worth asking why.",
        },
        {
          question: "Are you tied to a particular AI platform?",
          answer:
            "No. We take no commissions, referral fees or partner incentives from any vendor, including AI vendors. Platform choice is assessed the same way as any other systems selection.",
        },
        {
          question: "What if the answer is that AI is not the right tool here?",
          answer:
            "Then that is the recommendation. A meaningful share of proposed AI use cases are better solved by fixing the data, the process or an existing system's configuration. Those answers are cheaper and they hold up better.",
        },
        {
          question: "How do you handle governance and regulatory exposure?",
          answer:
            "Through the usage policy, the review step and the logging, designed alongside the build rather than added afterwards. Where your sector carries specific obligations we work to those, and we will tell you plainly where you need legal advice rather than ours.",
        },
        {
          question: "How long before something is in production?",
          answer:
            "For a single well chosen operational use case, typically three to five months from assessment to production, with most of that spent on data and process rather than on the AI itself.",
        },
      ]}
    />
  );
}
