import Link from "next/link";
import PageHero from "@/components/PageHero";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "In-house vs outsourced CRM governance",
  description:
    "Building CRM governance in-house vs outsourcing it. Speed, cost, ownership, cross-functional alignment and how to stop CRM firefighting for good.",
  path: "/compare/in-house-vs-outsourced-crm-governance",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Compare", item: absUrl("/compare") },
    {
      "@type": "ListItem",
      position: 3,
      name: "In house vs Outsourced CRM Governance",
      item: absUrl("/compare/in-house-vs-outsourced-crm-governance"),
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is CRM governance in practical terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "CRM governance is how lifecycle definitions, routing, permissions, required fields, change control, and measurement definitions are owned and maintained so the CRM remains reliable over time.",
      },
    },
    {
      "@type": "Question",
      name: "When is in house governance the best choice?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "In house governance works when you have a senior owner with authority across teams, stable definitions, and the ability to enforce standards through a release cadence and change control.",
      },
    },
    {
      "@type": "Question",
      name: "When is outsourced governance the best choice?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Outsourced governance works when teams are firefighting, definitions are disputed, routing changes frequently, dashboards are not trusted, or you need fast stabilisation with implementation accountability.",
      },
    },
    {
      "@type": "Question",
      name: "Does DS Consulting implement or only advise?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We do advisory plus implementation. We design the governance model, implement it, document it, and enable internal owners to run the cadence after go live.",
      },
    },
    {
      "@type": "Question",
      name: "How does governance connect to marketing automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Marketing automation underperforms when lifecycle stages, routing and definitions are unclear. Governance creates the stable foundation so marketing and sales stay aligned and automation becomes predictable.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to stabilise governance?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Early improvements often show within weeks once definitions, routing and change control are stabilised. Sustainable reliability comes from a cadence that continues after implementation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you sell software licenses?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. We do not sell software licenses. We design and implement the operating model and systems around your stack.",
      },
    },
  ],
};

type Winner = "inhouse" | "outsourced" | "depends";

const COMPARISON: Array<{
  factor: string;
  inhouse: string;
  outsourced: string;
  winner: Winner;
}> = [
  {
    factor: "Speed to stabilisation",
    inhouse:
      "Typically slower if there is no existing governance model. Competes with BAU priorities and cross team alignment takes time.",
    outsourced:
      "Typically faster because patterns, documentation and change control mechanisms already exist. Implementation can run in a focused cycle.",
    winner: "outsourced",
  },
  {
    factor: "Cash cost",
    inhouse:
      "Lower visible cash outlay, but uses senior time and can delay improvements. Hidden cost is leakage and rework during the build period.",
    outsourced:
      "Higher visible cash cost, but can reduce leakage quickly and return time to teams. The right comparison is cost vs waste avoided.",
    winner: "inhouse",
  },
  {
    factor: "Governance design expertise",
    inhouse:
      "Strong only if you have a senior RevOps or CRM owner who has built governance models before.",
    outsourced:
      "Higher because you borrow proven playbooks for lifecycle definitions, routing, change control, and measurement discipline.",
    winner: "outsourced",
  },
  {
    factor: "Internal context and adoption",
    inhouse:
      "Strong because internal owners know the culture, constraints and edge cases. Adoption can be better when the owner is trusted.",
    outsourced:
      "Can be strong when the partner runs enablement and co-creates decisions. Requires committed internal owners to sustain.",
    winner: "inhouse",
  },
  {
    factor: "Cross functional alignment",
    inhouse:
      "Can stall if the owner lacks authority across marketing, sales, service and finance. Disputes about definitions can linger.",
    outsourced:
      "Often faster because an external partner provides structure, facilitation and a neutral frame for decision making.",
    winner: "outsourced",
  },
  {
    factor: "Long term sustainability",
    inhouse:
      "Best long term model when there is a named owner, a release cadence, and enforcement of standards.",
    outsourced:
      "Best when external support stabilises quickly, then transitions to internal ownership with documentation and cadence.",
    winner: "depends",
  },
  {
    factor: "Measurement reliability",
    inhouse:
      "Possible, but requires disciplined definitions and reconciliation with finance. Many teams struggle to maintain this under pressure.",
    outsourced:
      "Often faster to stabilise because measurement discipline is designed as part of governance and implemented with controls.",
    winner: "outsourced",
  },
  {
    factor: "Change control and drift prevention",
    inhouse:
      "Strong when you can enforce approvals, release notes, and governance rituals. Weak when changes happen ad hoc.",
    outsourced:
      "Strong when the partner implements change control, documentation standards, and a governance calendar with owners.",
    winner: "depends",
  },
];

export default function InhouseVsOutsourcedPage() {
  const outsourcedWins = COMPARISON.filter((c) => c.winner === "outsourced").length;
  const inhouseWins = COMPARISON.filter((c) => c.winner === "inhouse").length;
  const dependsCount = COMPARISON.filter((c) => c.winner === "depends").length;

  return (
    <div className="bg-white">
      <PageHero
        title="In house vs Outsourced CRM Governance"
        subtitle="A decision guide for leaders who want a CRM that teams trust. Use this page to choose the right model for speed, ownership and long term reliability."
        painLine="If teams do not trust dashboards and handoffs are inconsistent, stabilise governance before adding more automation."
        primaryAction={{ label: "Talk to us", href: "/contact" }}
        secondaryAction={{ label: "Marketing automation services", href: "/services/crm-and-revenue-operations" }}
        imageSrc="/hero/crm.jpg"
        imageAlt="CRM governance comparison for in house versus outsourced delivery"
      />

      {/* Back to compare */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <Link href="/compare" className="text-sm font-medium text-indigo-700 hover:text-indigo-800">
            Back to Compare
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Signals */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
            <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
              Outsourced signals
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{outsourcedWins}</div>
            <div className="text-sm text-slate-600 mt-1">factors favour external support</div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">
              In house signals
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{inhouseWins}</div>
            <div className="text-sm text-slate-600 mt-1">factors favour internal build</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Depends on maturity
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{dependsCount}</div>
            <div className="text-sm text-slate-600 mt-1">factors depend on owners and cadence</div>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-3">The honest answer</h2>
          <p className="text-indigo-100 text-sm leading-relaxed max-w-3xl">
            In house governance is the best long term model when you have the right owner and enough runway to build.
            Outsourced governance is often the fastest stabilisation path when teams are firefighting and leaders need
            reliable revenue reporting quickly. A common approach is external stabilisation first, then transition to in house ownership.
          </p>
        </div>

        {/* Comparison table */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Factor by factor comparison</h2>
        <div className="space-y-4 mb-12">
          {COMPARISON.map(({ factor, inhouse, outsourced }) => (
            <div key={factor} className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-3">
                <span className="font-semibold text-sm">{factor}</span>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="p-5 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">In house</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{inhouse}</p>
                </div>
                <div className="p-5 bg-indigo-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Outsourced</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{outsourced}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What governance includes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What good CRM governance includes</h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Governance prevents drift. It protects lifecycle definitions, routing and measurement over time so teams stop rework and leaders regain confidence.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              "Lifecycle stages with entry and exit criteria",
              "Routing rules, SLAs and exception handling",
              "Data ownership and required fields",
              "Permissions model and change control",
              "Release cadence and approval workflow",
              "Documentation of definitions and decisions",
              "Measurement definitions aligned with finance",
              "Quality checks for duplicates and completeness",
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-sm font-semibold text-slate-900">{t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Where DS supports */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Where DS Consulting supports this work</h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            CRM governance is delivered through our Marketing Automation and RevOps services. Review the subpages if you want a concrete view of delivery.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
                Marketing Automation and RevOps
              </div>
              <div className="grid gap-2 text-sm">
                <Link className="underline" href="/services/crm-and-revenue-operations">Marketing automation hub</Link>
                <Link className="underline" href="/services/crm-and-revenue-operations/crm-architecture-governance">CRM architecture and governance</Link>
                <Link className="underline" href="/services/crm-and-revenue-operations/lifecycle-lead-management">Lifecycle and lead management</Link>
                <Link className="underline" href="/services/crm-and-revenue-operations/revenue-analytics">Revenue analytics and measurement</Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                Tools and templates
              </div>
              <div className="grid gap-2 text-sm">
                <Link className="underline" href="/insights/crm-governance-checklist">CRM Governance SOP Template</Link>
                <Link className="underline" href="/insights/leaky-funnel-audit">Leaky Funnel Audit Tool</Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Common questions</h2>
        <div className="space-y-5 mb-12">
          {faqSchema.mainEntity.map(
            (faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
              <div key={i} className="border-b border-slate-100 pb-5">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Want a quick diagnostic?</h2>
          <p className="text-indigo-200 text-sm mb-6 max-w-lg mx-auto">
            We will assess your governance gap, timeline and whether external stabilisation makes sense.
          </p>
          <Link
            href="/contact"
            className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 text-sm inline-block"
          >
            Book a diagnostic conversation
          </Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}