import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

/**
 * REGULATORY CONTENT. CHECK BEFORE EACH PUBLICATION.
 *
 * The EU AI Act position below is accurate as at 18 August 2026 and reflects
 * Regulation (EU) 2026/1744, the Digital Omnibus on AI, in force 27 July 2026:
 *
 *   - Annex III high-risk obligations moved from 2 Aug 2026 to 2 Dec 2027
 *   - Annex I high-risk obligations moved from 2 Aug 2027 to 2 Aug 2028
 *   - Article 57 regulatory sandboxes moved to 2 Aug 2027
 *   - Article 50 transparency obligations were NOT deferred and have applied
 *     since 2 Aug 2026
 *   - Article 50(2) machine-readable marking has a transitional period to
 *     2 Dec 2026, but only for systems already on the EU market before
 *     2 Aug 2026
 *
 * A large amount of competitor content still says the high-risk deadline is
 * August 2026, and a further amount now wrongly reports the whole Act as
 * postponed. Both are wrong. Re-verify against the Official Journal text
 * before republishing or reusing this copy elsewhere.
 */

export const metadata = pageMetadata({
  title: "AI governance and adoption",
  description:
    "AI governance and operational adoption for mid-market companies. Usage policy, human oversight, shadow AI discovery, EU AI Act transparency obligations and a defined path from pilot to production.",
  path: "/services/ai-governance-and-adoption",
});

export default function AIGovernanceAndAdoptionPage() {
  return (
    <ServiceLinePage
      route="/services/ai-governance-and-adoption"
      label="AI governance and adoption"
      heroTitle="The pilot worked. That was never the hard part"
      heroSubtitle="Most AI work stalls between the pilot and the day job, and most policies were written before anyone read the regulation. We handle both ends: what to build, and what has to be true before it runs."
      heroImage="/hero/insights.jpg"
      heroImageAlt="AI governance and adoption for mid-market companies"
      problemHeading="Two problems that are usually treated as one"
      problemParagraphs={[
        "The first is adoption. Everest Group's 2026 mid-market research found 57 percent of firms sitting in the pilot stage and 15 percent with something genuinely operationalised. That gap is not a technology gap. A pilot runs on curated data with an enthusiast watching the output. Production runs on whatever the source system holds that day, with someone who has a queue to clear and no reason to check.",
        "The second is governance, and it usually arrives as a surprise. Staff are already using AI tools with company data. Nobody wrote a policy, so there is no record of what went into which tool. Then a customer or an auditor asks a question that requires one.",
        "These get treated as one problem and they are not. Governance without adoption is a document nobody reads. Adoption without governance is a liability that compounds quietly. The work is to do both at a pace the business can actually absorb.",
        "The regulatory position is also more specific than most current commentary suggests, and getting it wrong in either direction costs money. Rushing to comply with a requirement that has moved wastes budget. Assuming the whole regime was postponed misses obligations that are already live.",
      ]}
      scope={[
        {
          title: "Shadow AI discovery",
          detail:
            "What staff are already using, with what data, and under what terms. This is almost always the first finding and it is usually larger than expected. Nothing else can be designed sensibly until it is known.",
        },
        {
          title: "Use case selection",
          detail:
            "Assessed against an operational outcome you already measure, and against the cost of being wrong. High volume with low cost of error is where this works. The reverse is where pilots go to die.",
        },
        {
          title: "Usage policy and human oversight",
          detail:
            "What may and may not go into which tools, what must be reviewed by a person before it acts, and who owns the output when it is wrong. Written short and specific enough to actually be followed.",
        },
        {
          title: "Regulatory obligations",
          detail:
            "Where the EU AI Act applies, which duties are live now and which have moved. Transparency and disclosure obligations, plus data protection interaction under GDPR or DPDP depending on where you operate.",
        },
        {
          title: "Data readiness and integration",
          detail:
            "What the process needs, where it sits, what state it is in and who may see it. Frequently this is the whole project, and it is worth doing whether or not the AI part proceeds.",
        },
        {
          title: "Pilot to production path",
          detail:
            "Exit criteria agreed before the pilot starts, including the criteria that mean you stop. That clause is the one most pilots are missing, which is why so many neither ship nor die.",
        },
      ]}
      deliverables={[
        "Shadow AI inventory covering tools, data exposure and contractual terms",
        "Use case shortlist scored against operational value and cost of error",
        "Written usage policy with named accountable owners and review points",
        "Applicability assessment against EU AI Act duties, with dates that are current",
        "Redesigned process showing where the AI step sits and where a human reviews",
        "Pilot design with exit criteria in both directions, then the production build",
      ]}
      signals={[
        "Staff are already using AI tools with company data and there is no policy covering it.",
        "You have run a pilot that worked and nobody can explain why it has not been rolled out.",
        "A customer or insurer has asked what AI you use and you had to go and find out.",
        "You deploy a chatbot or generate synthetic content and have not checked the transparency obligations that took effect in August 2026.",
        "A vendor has quoted for an AI module and you cannot assess whether it does anything your process needs.",
        "The board has asked what your AI strategy is and the honest answer is a list of experiments.",
      ]}
      faqs={[
        {
          question: "Was the EU AI Act postponed?",
          answer:
            "Partly, and the distinction matters. Regulation (EU) 2026/1744, the Digital Omnibus on AI, came into force on 27 July 2026 and moved the high-risk obligations for Annex III systems from August 2026 to 2 December 2027, and Annex I systems to 2 August 2028. The Article 50 transparency obligations were not deferred and have applied since 2 August 2026. Reading the Omnibus as a general reprieve is the most common current mistake.",
        },
        {
          question: "Which obligations are actually live right now?",
          answer:
            "The transparency duties under Article 50. In practice that means telling people when they are interacting with an AI system rather than a person, marking AI-generated synthetic content in machine-readable form, and disclosing deepfakes and AI-written text in the situations the Article covers. Systems already on the EU market before 2 August 2026 have until 2 December 2026 for the machine-readable marking requirement specifically.",
        },
        {
          question: "We are not in the EU. Does any of this apply?",
          answer:
            "Possibly, depending on whether your systems are used in the EU or their output reaches people there. It is worth checking rather than assuming, and the check is quick. Separately, most of the governance work has value regardless of jurisdiction, because customers and insurers are asking these questions ahead of regulators.",
        },
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
          question: "Do you provide legal advice on compliance?",
          answer:
            "No. We build the operational side: the inventory, the policy, the oversight design and the evidence. Where a question turns on legal interpretation we will say so plainly and you should take it to a lawyer.",
        },
      ]}
    />
  );
}
