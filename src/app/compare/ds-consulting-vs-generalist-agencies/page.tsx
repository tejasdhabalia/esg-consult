import Link from "next/link";
import PageHero from "@/components/PageHero";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "DS Consulting vs generalist agencies",
  description:
    "Which partner is right for ESG and RevOps: a specialist advisory like DS Consulting, or a generalist marketing or ESG agency? Governance, ownership, fit.",
  path: "/compare/ds-consulting-vs-generalist-agencies",
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
      name: "DS Consulting vs Generalist Agencies",
      item: absUrl("/compare/ds-consulting-vs-generalist-agencies"),
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between DS Consulting and a generalist marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The primary difference is governance depth and implementation ownership. A generalist marketing agency focuses on campaigns, creative and channels. DS Consulting focuses on the operating model underneath: CRM governance, lifecycle definitions, measurement discipline, and the data infrastructure that makes execution accountable.",
      },
    },
    {
      "@type": "Question",
      name: "What makes DS Consulting different from Big 4 ESG consultants?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Three differences: speed, implementation depth, and cost. Big 4 ESG engagements often run longer with larger teams. DS Consulting operates in shorter implementation cycles focused on specific governance gaps, with senior practitioners who implement directly. For mid-market organisations this improves time to value while keeping governance rigour.",
      },
    },
    {
      "@type": "Question",
      name: "Do you implement, or only advise?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We do advisory plus implementation. We design the operating model and then build it. We document it, set cadence, and enable internal teams to run it.",
      },
    },
    {
      "@type": "Question",
      name: "Can you support Carbon Accounting and ESG reporting systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We support carbon accounting and emissions data governance as part of ESG readiness. The goal is a repeatable system with ownership, controls and an evidence trail, not just a one-time calculation.",
      },
    },
    {
      "@type": "Question",
      name: "When should we choose an agency instead of DS Consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Choose an agency when your governance foundations are stable and you primarily need brand creative, media buying, or campaign execution. If definitions, routing and measurement are unstable, agency activity can look busy while outcomes remain inconsistent.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good starting point if we are unsure?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Start with a diagnostic conversation and short assessment. We clarify scope, owners, definitions, data quality, and decision cadence. That becomes a practical roadmap and implementation plan.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide statutory audit or assurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We do not provide statutory audit or assurance.",
      },
    },
  ],
};

const MATRIX = [
  {
    factor: "Primary focus",
    ds: "Governance design and implementation: CRM, lifecycle, measurement, ESG reporting systems. We fix the operating model.",
    generalist:
      "Campaign execution, creative production, channel management, or broad strategy advisory without implementation depth.",
  },
  {
    factor: "Advisory plus implementation",
    ds: "Both. We define the operating model and then build it. The same practitioners who designed it implement it.",
    generalist:
      "Often advisory only, or implementation without governance design. Rarely both with the same depth.",
  },
  {
    factor: "Governance depth",
    ds: "A core differentiator. We design change control, data ownership, evidence trails, and measurement frameworks built to last.",
    generalist:
      "Governance is rarely the core competence. Recommendations may exist but accountability for execution often does not.",
  },
  {
    factor: "Practitioner seniority on your project",
    ds: "Co-founders and senior practitioners work directly. There is no layer of junior consultants between you and the expertise.",
    generalist:
      "Senior partners pitch, junior teams execute. Continuity and accountability can vary widely.",
  },
  {
    factor: "Systems architecture and integration",
    ds: "We align CRM, marketing automation, finance reporting, data governance, and operational cadence so teams stay on the same page.",
    generalist:
      "Often limited to a single tool or channel. Integration and cross-team operating model is usually not the delivery focus.",
  },
  {
    factor: "Evidence trails and defensibility",
    ds: "Designed in. Controls, documentation and audit-ready evidence trails for ESG and for revenue measurement reliability.",
    generalist:
      "Not typically designed in. Evidence trails are uncommon unless it is an assurance-led engagement.",
  },
  {
    factor: "Carbon accounting and emissions data governance",
    ds: "Supported as part of ESG readiness. Focus is repeatable emissions data governance, controls and reporting workflow.",
    generalist:
      "Often a one-time calculation or a report output without sustained governance model and controls.",
  },
];

export default function DSConsultingVsGeneralistPage() {
  return (
    <div className="bg-white">
      <PageHero
        title="DS Consulting vs Generalist Agencies"
        subtitle="An honest comparison for buyers deciding between a firm that has built these systems and a generalist agency or large consultancy practice."
        painLine="If your metrics are disputed, routing is inconsistent, or reporting needs defensible evidence trails, foundations matter more than volume of activity."
        primaryAction={{ label: "Talk to us", href: "/contact" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/services.jpg"
        imageAlt="Comparison guide for selecting a technology and reporting systems partner"
      />

      {/* Back link */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <Link
            href="/compare"
            className="text-sm font-medium text-indigo-700 hover:text-indigo-800"
          >
            Back to Compare
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Positioning callout */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10">
          <p className="text-slate-700 leading-relaxed text-sm">
            <strong>The honest framing:</strong> DS Consulting is not the right
            choice for every engagement. If you need brand creative, media
            buying, or broad commercial strategy without implementation, a
            generalist agency may serve you better. We exist in a specific gap:
            organisations that need a governed operating model built and
            delivered, not just described, at mid-market speed and cost.
          </p>
        </div>

        {/* Comparison matrix */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Direct comparison
        </h2>
        <div className="space-y-4 mb-12">
          {MATRIX.map(({ factor, ds, generalist }) => (
            <div
              key={factor}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >
              <div className="bg-slate-900 text-white px-6 py-3">
                <span className="font-semibold text-sm">{factor}</span>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="p-5 bg-indigo-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                      DS Consulting
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{ds}</p>
                </div>
                <div className="p-5 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Generalist Agency or Big 4
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {generalist}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Who DS Consulting is right for */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">
              DS Consulting is the right choice when
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "You need a governed operating model built, not just a strategy deck delivered",
                "Your CRM or ESG governance gap is costing you visibility, not just efficiency",
                "You want the same senior practitioners on your project from diagnostic to delivery",
                "You are a mid-market organisation that cannot justify Big 4 timelines or fees",
                "You need CSRD, BRSR or UK climate readiness inside one or two reporting cycles",
                "You need carbon accounting with ownership, controls and evidence trails",
                "You want AI adoption that is governed and integrated, not bolted on",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500 mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">
              Consider alternatives when
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "You primarily need brand, creative or media buying capability",
                "Your brief is broad commercial strategy without a specific governance outcome",
                "You need a large team of specialists across many disciplines simultaneously",
                "You require statutory audit or independent assurance (we do not provide these)",
                "Your organisation is large enough to justify Big 4 fees and timelines",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-slate-500 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* New: How to evaluate any partner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What to ask any partner before you sign
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            These questions surface whether the partner can deliver repeatable
            outcomes or only outputs. If the answers are vague, expect hidden
            rework later.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              "Who owns definitions and change control after go live?",
              "How will you prevent routing and lifecycle drift over time?",
              "What evidence trail will exist for ESG reporting and key claims?",
              "How will measurement definitions align with finance and sales reality?",
              "What is the operating cadence leaders will run after implementation?",
              "What are the top failure modes you expect, and how will you mitigate them?",
              "How do you document decisions so teams can maintain the system?",
              "What does success look like in 30, 60 and 90 days?",
            ].map((q, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-sm font-semibold text-slate-900">{q}</div>
              </div>
            ))}
          </div>
        </div>

        {/* New: Service map */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Where this comparison connects to our services
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            If you want the governance plus implementation model, start from the
            service hub that matches your immediate outcome. Each page links to
            subpages that go deeper into delivery.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">
                ESG and Sustainability
              </div>
              <div className="grid gap-2 text-sm">
                <Link className="underline" href="/services/esg-advisory">
                  ESG advisory hub
                </Link>
                <Link className="underline" href="/services/esg-advisory/carbon-accounting">
                  Carbon accounting
                </Link>
                <Link className="underline" href="/services/esg-advisory/csrd-advisory">
                  CSRD advisory
                </Link>
                <Link className="underline" href="/services/esg-advisory/brsr-advisory">
                  BRSR advisory
                </Link>
                <Link className="underline" href="/services/esg-advisory/uk-secr-srs-reporting">
                  UK SECR and SRS reporting
                </Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">
                Marketing Automation and RevOps
              </div>
              <div className="grid gap-2 text-sm">
                <Link className="underline" href="/services/crm-and-revenue-operations">
                  Marketing automation hub
                </Link>
                <Link className="underline" href="/services/crm-and-revenue-operations/crm-architecture-governance">
                  CRM architecture and governance
                </Link>
                <Link className="underline" href="/services/crm-and-revenue-operations/lifecycle-lead-management">
                  Lifecycle and lead management
                </Link>
                <Link className="underline" href="/services/crm-and-revenue-operations/revenue-analytics">
                  Revenue analytics and measurement
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Founder credentials */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-xl font-bold mb-6">Where our expertise comes from</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                name: "Tejas Dhabalia",
                focus: "Revenue Operations",
                background:
                  "Deloitte Digital, Tata, Tesco, Godrej. Standardised omnichannel operating processes across markets. Built conversion and lifecycle discipline across complex retail and services environments.",
              },
              {
                name: "Jigar Dhabalia",
                focus: "ESG and Governance",
                background:
                  "ESG readiness and governance delivery across manufacturing and energy-heavy environments. Focus on defensible reporting systems, evidence trails, and stakeholder credibility.",
              },
            ].map((f) => (
              <div key={f.name}>
                <div className="text-sm font-bold text-indigo-200 mb-1">{f.name}</div>
                <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wide mb-3">
                  Focus: {f.focus}
                </div>
                <p className="text-sm text-indigo-100 leading-relaxed">{f.background}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
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
          <h2 className="text-2xl font-bold mb-2">Start with a diagnostic conversation</h2>
          <p className="text-indigo-100 text-sm mb-6 max-w-lg mx-auto">
            We do not do long sales processes. A 45 minute conversation with one of our co-founders
            will tell you whether we are the right fit. If we are not, we will tell you that too.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 text-sm"
          >
            Book a conversation
          </Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}