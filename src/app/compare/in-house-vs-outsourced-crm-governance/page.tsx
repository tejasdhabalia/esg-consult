import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `In-house vs Outsourced CRM Governance: Which is Right? | ${site.legalName}`,
  description:
    "A practical comparison of building CRM governance in-house vs working with an external advisory partner. Covers cost, speed, expertise depth, and the situations where each approach wins.",
  alternates: { canonical: absUrl("/compare/in-house-vs-outsourced-crm-governance") },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Should I build CRM governance in-house or use an external partner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your timeline, internal capability, and the scale of the governance gap. In-house works when you have a senior RevOps or CRM admin with governance design experience and 6-12 months of runway to build the model. External advisory makes more sense when you need to move in 8-12 weeks, when you lack internal precedent for what good looks like, or when you need to borrow credibility to drive cross-functional alignment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average cost of CRM governance consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CRM governance advisory engagements typically range from £20,000 to £80,000 depending on scope, platform complexity, and the number of integrated systems. A diagnostic and design engagement is at the lower end. Full implementation including change control design, lifecycle governance, and measurement framework typically sits in the £40,000–£80,000 range for a mid-market organisation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a CRM governance implementation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most CRM governance implementations run 8 to 16 weeks depending on scope. A diagnostic and design phase typically takes 3-4 weeks. Implementation of the data model, lifecycle governance, and change control process takes a further 4-8 weeks. Measurement framework alignment with finance typically adds 2-4 weeks.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Compare", item: absUrl("/compare") },
    { "@type": "ListItem", position: 3, name: "In-house vs Outsourced CRM Governance", item: absUrl("/compare/in-house-vs-outsourced-crm-governance") },
  ],
};

const COMPARISON = [
  {
    factor: "Speed to governance",
    inhouse: "12–24 months. Building frameworks internally without precedent takes time — especially when competing with BAU priorities.",
    outsourced: "8–12 weeks. An experienced partner brings a proven model, removes the blank-page problem, and can resource the build without competing priorities.",
    winner: "outsourced",
  },
  {
    factor: "Cost",
    inhouse: "Appears cheaper — mainly internal headcount. Hidden costs: time-to-value delay, mistakes that require remediation, and opportunity cost of senior ops talent diverted from growth.",
    outsourced: "Defined engagement cost of £20k–£80k depending on scope. ROI is measured by the leakage stopped, not the advisory fee paid.",
    winner: "depends",
  },
  {
    factor: "Depth of governance expertise",
    inhouse: "Depends entirely on whether you have a senior RevOps or CRM lead with governance design experience. Most organisations do not.",
    outsourced: "Access to practitioners who have built governance models across multiple sectors and platforms. Pattern recognition is the primary value delivered.",
    winner: "outsourced",
  },
  {
    factor: "Cross-functional alignment",
    inhouse: "Internal champions often struggle to get sign-off from marketing, sales, and finance simultaneously. Governance changes are politically difficult without executive mandate.",
    outsourced: "An external partner provides a neutral frame that makes alignment easier. Recommendations from a specialist carry weight that internal proposals sometimes do not.",
    winner: "outsourced",
  },
  {
    factor: "Institutional knowledge retention",
    inhouse: "Governance built internally becomes part of the organisation's DNA over time — if the people who built it stay.",
    outsourced: "A well-run engagement leaves behind documentation, training, and a governance model that does not depend on any individual. Retention depends on deliverable quality.",
    winner: "inhouse",
  },
  {
    factor: "Platform-specific depth",
    inhouse: "An internal admin often has deep familiarity with your specific instance — field history, legacy decisions, technical debt.",
    outsourced: "Strong for cross-platform governance design. Requires a diagnostic phase to understand your specific instance. Partner should be platform-agnostic.",
    winner: "inhouse",
  },
  {
    factor: "Ongoing governance cadence",
    inhouse: "Once the model is built internally, ongoing governance becomes part of normal operations. No dependency on external resource.",
    outsourced: "Implementation engagements deliver the model and transition ownership. Some organisations retain advisory support for quarterly governance reviews.",
    winner: "inhouse",
  },
  {
    factor: "Risk in a time-critical situation",
    inhouse: "Building governance while also operating the CRM under pressure creates compounding risk — changes made without controls while trying to implement controls.",
    outsourced: "A structured engagement with a clear diagnostic before any changes are made significantly reduces implementation risk.",
    winner: "outsourced",
  },
];

export default function InhouseVsOutsourcedPage() {
  const outsourcedWins = COMPARISON.filter(c => c.winner === "outsourced").length;
  const inhouseWins = COMPARISON.filter(c => c.winner === "inhouse").length;

  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Compare</span>
            <span className="mx-2">/</span>
            <span className="text-indigo-200">In-house vs Outsourced CRM Governance</span>
          </nav>
          <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Comparison Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">In-house vs Outsourced CRM Governance</h1>
          <p className="text-indigo-200 text-lg max-w-2xl leading-relaxed">
            A practical, honest breakdown of when to build governance capabilities internally and when
            working with an external advisory partner delivers faster, more reliable results.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Score summary */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-indigo-600 mb-1">{outsourcedWins}</div>
            <div className="text-sm font-semibold text-slate-700">Factors favouring external</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-slate-600 mb-1">{COMPARISON.filter(c => c.winner === "depends").length}</div>
            <div className="text-sm font-semibold text-slate-700">Situation-dependent</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-emerald-600 mb-1">{inhouseWins}</div>
            <div className="text-sm font-semibold text-slate-700">Factors favouring in-house</div>
          </div>
        </div>

        {/* Verdict callout */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white mb-12">
          <h2 className="font-bold text-lg mb-2">The honest answer</h2>
          <p className="text-indigo-100 leading-relaxed text-sm">
            For most organisations with a governance gap and a timeline shorter than 12 months, external
            advisory delivers better outcomes faster. The exceptions are organisations with a senior RevOps leader
            who has built governance models before, or organisations that have the luxury of a 12-month runway
            without a burning revenue visibility problem. If your CEO cannot get a clean pipeline number before
            the next board meeting, build it fast with people who have done it before.
          </p>
        </div>

        {/* Comparison table */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Factor-by-factor comparison</h2>
        <div className="space-y-4 mb-12">
          {COMPARISON.map(({ factor, inhouse, outsourced, winner }) => (
            <div key={factor} className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
                <span className="font-semibold text-sm">{factor}</span>
                {winner === "outsourced" && <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">Outsourced wins</span>}
                {winner === "inhouse" && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">In-house wins</span>}
                {winner === "depends" && <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Situation-dependent</span>}
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="p-5">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">In-house</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{inhouse}</p>
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Outsourced</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{outsourced}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* When to choose each */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">Choose in-house when...</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "You have a senior RevOps lead with governance design experience",
                "Your timeline is 12+ months and BAU pressure allows it",
                "Your governance gap is limited to one system or one process",
                "You have already built the governance model and need to maintain it",
                "Your organisation has strong internal project management capability",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
            <h3 className="font-bold text-slate-900 mb-4">Choose external advisory when...</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "You need results in 8–12 weeks, not 12 months",
                "Your leadership team cannot agree on a shared definition of pipeline",
                "You have tried to fix CRM governance internally before without success",
                "You are planning a platform migration and need a clean architecture before you move",
                "You need to borrow credibility to drive cross-functional alignment",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500 flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Common questions</h2>
        <div className="space-y-5 mb-12">
          {faqSchema.mainEntity.map((faq: {name: string; acceptedAnswer: {text: string}}, i: number) => (
            <div key={i} className="border-b border-slate-100 pb-5">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-indigo-950 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Not sure which approach is right?</h2>
          <p className="text-indigo-200 text-sm mb-6 max-w-lg mx-auto">
            We offer a no-commitment diagnostic conversation where we assess your specific governance gap,
            timeline, and whether external advisory genuinely makes sense for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 text-sm">
              Book a diagnostic conversation
            </Link>
            <Link href="/insights/leaky-funnel-audit" className="border border-indigo-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-900 text-sm">
              Take the Leaky Funnel Audit first
            </Link>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
