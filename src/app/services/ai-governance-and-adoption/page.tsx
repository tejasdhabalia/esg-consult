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
  // Title, description and H1 from the SEO brief for Batches 3 and 4,
  // 30 October 2026. The helper appends " | DS Consulting".
  // Target changed from "ai governance consulting", which the page does not
  // rank for, to "ai and data governance consulting".
  title: "AI and data governance consulting",
  description:
    "AI and data governance for mid-market firms: data readiness, use case registers and EU AI Act duties. Free 45-minute session and a one-page move plan.",
  path: "/services/ai-governance-and-adoption",
});

/*
  EVIDENCE. Verified 30 October 2026.
  Netrio, mid-market AI survey, 15 Jun 2026. Tier 2 (91 to 180 days) until
  mid-December 2026, then older: replace when a newer study appears.
  401 IT leaders at US organisations with 200 to 5,000 employees, fielded
  by Censuswide. Replaced Everest Group (Mar 2026, older than 180 days).
*/
export default function AIGovernanceAndAdoptionPage() {
  return (
    <ServiceLinePage
      route="/services/ai-governance-and-adoption"
      label="AI governance and adoption"
      heroTitle="Get your data ready, then govern the AI built on it"
      // Body copy leads with the move. Batch 7, approved 30 October 2026.
      heroSubtitle="Your AI plans depend on the data, and the data sits in systems that do not talk to each other. Fix that first, ideally during a system move you are already planning, then govern the AI built on it."
      heroImage="/hero/insights.jpg"
      heroImageAlt="AI governance and adoption for mid-market companies"
      problemHeading="Most AI plans are waiting on the data"
      problemParagraphs={[
        "You have picked the use cases. The data they need is spread across a CRM, an ERP, spreadsheets and a support tool, each with its own idea of what a customer is. A pilot hides this, because someone cleaned a sample by hand. Production does not.",
        "The first is adoption. Netrio's June 2026 survey of 401 US mid-market IT leaders found 82 percent with AI in production somewhere in the business, and only 26 percent with it scaled and governed across the company. That gap is not a technology gap. A pilot runs on curated data with an enthusiast watching the output. Production runs on whatever the source system holds that day, with someone who has a queue to clear and no reason to check.",
        "A system move is the cheapest moment to fix it. When data is being extracted, mapped and reconciled anyway, agreeing definitions and owners costs a fraction of what it costs later. Copy it across unchanged and the AI plans inherit the mess.",
        "Then there is governance, and it usually arrives as a surprise. Staff are already using AI tools with company data. Nobody wrote a policy, so there is no record of what went into which tool. Then a customer or an auditor asks a question that requires one.",
        "The regulatory position is also more specific than most current commentary suggests, and getting it wrong in either direction costs money. Rushing to comply with a requirement that has moved wastes budget. Assuming the whole regime was postponed misses obligations that are already live.",
      ]}
      scope={[
        {
          title: "Data readiness and integration",
          detail:
            "What the process needs, where it sits, what state it is in and who may see it. Frequently this is the whole project, and it is worth doing whether or not the AI part proceeds.",
        },
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
        "You have chosen AI use cases, and the data they need is spread across systems that do not talk.",
        "Staff are already using AI tools with company data and there is no policy covering it.",
        "You have run a pilot that worked and nobody can explain why it has not been rolled out.",
        "A customer or insurer has asked what AI you use and you had to go and find out.",
        "You deploy a chatbot or generate synthetic content and have not checked the transparency obligations that took effect in August 2026.",
        "A vendor has quoted for an AI module and you cannot assess whether it does anything your process needs.",
        "The board has asked what your AI strategy is and the honest answer is a list of experiments.",
        "Licences are spread across several teams and nobody can total the AI spend or say what it produced.",
        "When an AI step gets something wrong in a live workflow, no one owns the correction, the audit trail or the rollback.",
      ]}
      callouts={[
        {
          eyebrow: "The first step",
          heading: "Get the data ready",
          body: "Most AI plans wait on data spread across systems that do not talk to each other. Start there, before the governance.",
          href: "/migrations/ai-ready-data",
          label: "Getting your data AI-ready",
        },
        {
          eyebrow: "Putting the plan into practice",
          heading: "A forward deployed engineer for your AI plan",
          body: "Someone to sit with your functional teams and make the CTO's plan land, on retainer or per project, without a full-time hire.",
          href: "/services/forward-deployed-engineer",
          label: "See the FDE service",
        },
      ]}
      relatedResources={[
        {
          href: "/insights/ai-use-case-register",
          label: "AI use case register template",
          detail:
            "A register recording where AI already runs, who owns each use and which obligations attach.",
        },
        {
          href: "/regulatory-hub/eu-ai-act-in-scope-and-timeline",
          label: "EU AI Act timeline",
          detail:
            "What applies now, what moved to December 2027 and what the Digital Omnibus left untouched.",
        },
        {
          href: "/insights/ai-roi-calculator",
          label: "AI ROI calculator",
          detail:
            "Payback, three-year value and whether one AI use case is ready to scale.",
        },
      ]}
      engagement={{
        heading: "How the readiness audit runs",
        intro:
          "Where the starting point is an unclear picture rather than a defined project, we run a four week audit first. Fixed scope, fixed price, and a handover to whoever owns AI from week five.",
        phases: [
          {
            period: "Week 1",
            title: "Readiness scan",
            detail:
              "Interviews with function heads, a tool inventory and a governance review across the business. This is where shadow usage surfaces.",
          },
          {
            period: "Week 2",
            title: "Priority deep dives",
            detail:
              "Two or three functions go further, with workflow walkthroughs and sessions with the people actually doing the work.",
          },
          {
            period: "Week 3",
            title: "Playbook drafting",
            detail:
              "Usage policy, the governance framework with named owners and review points, and a 90 day roadmap the board can track.",
          },
          {
            period: "Week 4",
            title: "Synthesis and handover",
            detail:
              "Board readout, then handover to the appointed owner. You end up holding a report and a playbook, not a slide deck.",
          },
        ],
        note:
          "The audit works where there is real usage, a mandate from the top and someone appointed to own the outcome. If the mandate has not been established yet, it is too early and a call is the better starting point.",
      }}
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
          question: "How long does the readiness audit take?",
          answer:
            "Four weeks end to end. Week one is a readiness scan across functions, week two is deep dives into two or three of them, week three is drafting the policy and roadmap, week four is the board readout and handover. The scope is fixed before it starts, so it does not drift.",
        },
        {
          question: "How is this different from generic AI consulting?",
          answer:
            "The scope is defined and the deliverables are named before the work begins. The focus is governance, data readiness and the path to production, not model selection or tool implementation. Most AI work in mid-market businesses stalls on governance and data access rather than on the model.",
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
