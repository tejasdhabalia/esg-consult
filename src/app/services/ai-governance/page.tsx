import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "AI governance and readiness audit",
  description:
    "A four-week AI readiness audit for mid-market leadership teams. Board-ready findings, governance gaps and three priorities for the next 90 days.",
  path: "/services/ai-governance",
});

const governanceGaps = [
  {
    title: "Uneven adoption",
    body:
      "Some teams are running ahead with AI. Others have not started. No shared view of what good usage looks like or how to spread it.",
  },
  {
    title: "Spend with no return view",
    body:
      "Multiple licenses across teams. Tools licensed for whole departments and used by three people. No way to see total AI spend or what it produced.",
  },
  {
    title: "Ungoverned tool sprawl",
    body:
      "ChatGPT, Claude, Gemini, copilot tools, embedded AI features across finance, marketing, HR, operations. No central inventory, no usage policy, no owner.	",
  },
  {
    title: "No exception path",
    body:
      "When AI gets something wrong in a workflow, no one owns the correction, the audit trail or the rollback.",
  },
];

const reportContents = [
  "Cross-functional AI usage map across all functions",
  "Governance gap and material risk findings",
  "Three priorities for the next 90 days, ranked, with named owners",
  "Quantified spend leakage and recommended reinvestment",
];

const playbookContents = [
  "AI usage policy your team can apply on Monday",
  "Governance framework with named owners and review cadence",
  "90 day roadmap with milestones the board can track",
];

const auditWeeks = [
  {
    week: "Week 1",
    title: "Readiness scan",
    body: "Function head interviews, tool inventory, governance review across all functions.",
  },
  {
    week: "Week 2",
    title: "Priority deep dives",
    body: "Two or three functions go deeper, with workflow walkthroughs and operating-team sessions.",
  },
  {
    week: "Week 3",
    title: "Playbook drafting",
    body: "Policy, governance framework and 90 day roadmap.",
  },
  {
    week: "Week 4",
    title: "Synthesis",
    body: "Board readout and team handover to the appointed AI lead.",
  },
];

const audienceFit = [
  "You are a CEO, COO or CFO at a 200 to 1,500 person company where the board has asked the AI question.",
  "Your teams are using AI tools today, but no one has a complete map of where, how much, or to what effect.",
  "You need a plan you can fund at the next budget cycle, not a generic strategy deck.",
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI governance and readiness audit",
  serviceType: "AI governance advisory",
  provider: {
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
  },
  description:
    "A four-week AI readiness audit for mid-market leadership teams. Maps AI usage across functions, identifies governance gaps and material risks and produces a board-ready plan with named owners and a 90 day roadmap.",
  url: absUrl("/services/ai-governance"),
  areaServed: { "@type": "Place", name: "Global" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Mid-market leadership teams (200 to 1,500 person companies)",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: absUrl("/contact"),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the AI readiness audit take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Four weeks end to end. Week 1 is a readiness scan across all functions. Week 2 is priority deep dives into two or three functions. Week 3 is playbook drafting. Week 4 is synthesis, board readout and handover.",
      },
    },
    {
      "@type": "Question",
      name: "What does the audit produce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two artifacts. A board-ready report covering cross-functional AI usage, governance and risk findings, three priorities for the next 90 days and quantified spend leakage. An internal playbook covering the AI usage policy, the governance framework with named owners and the 90 day roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the audit for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CEOs, COOs and CFOs at 200 to 1,500 person companies where the board has asked the AI question. Works best where there is real AI usage, a real board mandate and an appointed owner. If there is no top-of-organisation AI mandate yet, the audit is too early. Start with a discovery call instead.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from generic AI consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is a productized audit, not a menu of AI services. The scope is fixed, the deliverables are defined and the engagement is four weeks. The focus is governance and readiness, not model selection or tool implementation. Most AI initiatives in mid-market businesses stall on governance, not on the model.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
    { "@type": "ListItem", position: 3, name: "AI governance and readiness audit", item: absUrl("/services/ai-governance") },
  ],
};

export default function AIGovernancePage() {
  return (
    <div>
      <PageHero
        title="AI governance and readiness audit"
        subtitle="For leadership teams whose AI usage has outgrown their AI policy."
        painLine="Most AI initiatives in mid-market businesses stall on governance, not on the model. We map where AI sits in your functions today, where it is leaking spend, and where it is exposed, then hand you a board-ready plan and a structure your team can run."
        primaryAction={{ label: "Book a 30 minute call", href: "/contact" }}
        secondaryAction={{ label: "See what the audit produces", href: "#what-you-get" }}
        imageSrc="/hero/services.jpg"
        imageAlt="AI governance and readiness audit for leadership teams"
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            The governance gap
          </p>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight max-w-4xl">
            The pattern we keep seeing
          </h2>

          <div className="mt-8 space-y-6 text-slate-600 text-base leading-relaxed max-w-4xl">
		  <p>Leadership teams ask three questions about AI:</p>
		  <ul className="space-y-3 ml-2">
			{[
			  "How do we build an AI culture that actually shows up in the work?",
			  "What is the ROI on our AI spend?",
			  "How are we governing it?	",
			].map((question) => (
			  <li key={question} className="flex items-start gap-3">
				<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
				<span>{question}</span>
			  </li>
			))}
		  </ul>
		  <p>
			Most teams cannot answer any of the three with evidence. AI usage has spread across
			functions through individual subscriptions, shadow tools and embedded features in
			existing software. Policy has not kept up. Boards are starting to ask. Auditors are
			starting to ask. The cost of that gap is no longer theoretical.
		  </p>
		</div>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {governanceGaps.map((gap) => (
              <div
                key={gap.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="font-semibold text-slate-900">{gap.title}</div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{gap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-you-get" className="scroll-mt-24 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Deliverables
          </p>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">What you get</h2>
          <p className="mt-4 text-slate-600 text-lg max-w-3xl">
            Two artifacts, both designed to be used immediately.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-3">
                Artifact 1
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Board-ready report
              </h3>
              <p className="mt-1 text-sm text-slate-500">Four pages, designed to brief the board.</p>
              <ul className="mt-6 space-y-3">
                {reportContents.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="text-xs font-semibold text-indigo-700 uppercase tracking-widest mb-3">
                Artifact 2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Internal playbook</h3>
              <p className="mt-1 text-sm text-slate-500">For the team that owns AI from week five.</p>
              <ul className="mt-6 space-y-3">
                {playbookContents.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            How it runs
          </p>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">The four weeks</h2>
          <p className="mt-4 text-slate-600 text-lg max-w-3xl">
            A fixed scope, a defined cadence, and a clear handover.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {auditWeeks.map((step, idx) => (
              <div key={step.week} className="bg-slate-50 border rounded-2xl p-6">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                  {step.week}
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900">{step.title}</div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
                {idx < auditWeeks.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                Audience
              </p>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">Right for you if</h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                The audit works best where there is real AI usage, a real board mandate, and an
                appointed owner.
              </p>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                If you have not yet established whether there is an AI mandate from the top of the
                organisation, this audit is too early. Start with a discovery call instead.
              </p>
            </div>

            <div className="space-y-4">
              {audienceFit.map((item) => (
                <div
                  key={item}
                  className="bg-white border rounded-2xl p-5 flex items-center gap-4"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Start with a 30 minute call
          </h2>
          <p className="mt-5 text-slate-300 text-lg max-w-2xl mx-auto">
            We will walk you through the audit scope, share examples of the findings format, and
            confirm whether this is the right starting point for your team.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-lg font-semibold"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Related
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/services/esg-advisory"
              className="bg-slate-50 border rounded-2xl p-6 hover:border-indigo-200 transition-colors"
            >
              <div className="font-semibold text-slate-900">ESG advisory →</div>
              <p className="mt-2 text-sm text-slate-600">
                For ESG reporting governance, see ESG advisory.
              </p>
            </Link>
            <Link
              href="/services/marketing-automation"
              className="bg-slate-50 border rounded-2xl p-6 hover:border-indigo-200 transition-colors"
            >
              <div className="font-semibold text-slate-900">
                Marketing automation, RevOps and AI →
              </div>
              <p className="mt-2 text-sm text-slate-600">
                For CRM and revenue governance, see Marketing automation, RevOps and AI.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
