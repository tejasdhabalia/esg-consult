import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `DS Consulting vs Generalist Agencies: Which Partner for ESG and RevOps? | ${site.legalName}`,
  description:
    "A direct comparison of working with DS Consulting vs a generalist marketing or ESG agency. Understand the difference in governance depth, implementation capability, and how each approach performs for mid-market organisations.",
  alternates: { canonical: absUrl("/compare/ds-consulting-vs-generalist-agencies") },
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
        text: "The primary difference is governance depth and implementation ownership. A generalist marketing agency focuses on campaign execution, creative, and channel management. DS Consulting focuses on the operating model underneath — CRM governance, lifecycle definitions, measurement frameworks, and the data infrastructure that makes campaigns accountable. We work on the systems that determine whether marketing can ever produce reliable results.",
      },
    },
    {
      "@type": "Question",
      name: "What makes DS Consulting different from Big 4 ESG consultants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three primary differences: speed, implementation depth, and cost. Big 4 ESG practices typically operate on 12-18 month engagement timelines with large teams and correspondingly large fees. DS Consulting operates on 8-12 week implementation cycles for specific governance gaps, with practitioners who implement directly rather than managing junior consultants. For mid-market organisations, this means faster time-to-value at lower cost without sacrificing governance rigour.",
      },
    },
    {
      "@type": "Question",
      name: "Does DS Consulting work with larger enterprises or only mid-market organisations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DS Consulting works primarily with mid-market and scaling organisations — typically 250 to 5,000 employees — where the governance gap is real but the budget for Big 4 fees is not available. We also work as a specialist implementation partner alongside larger consulting firms who provide strategy but need governance and implementation depth they cannot deliver directly.",
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
    { "@type": "ListItem", position: 3, name: "DS Consulting vs Generalist Agencies", item: absUrl("/compare/ds-consulting-vs-generalist-agencies") },
  ],
};

const MATRIX = [
  {
    factor: "Primary focus",
    ds: "Governance design and implementation: CRM, lifecycle, measurement, ESG reporting systems. We fix the operating model.",
    generalist: "Campaign execution, creative production, channel management, or broad strategy advisory without implementation depth.",
  },
  {
    factor: "Advisory plus implementation",
    ds: "Both. We define the operating model and then build it. The same practitioners who designed it implement it.",
    generalist: "Typically advisory only, or implementation without governance design. Rarely both with the same depth.",
  },
  {
    factor: "Governance depth",
    ds: "Our primary differentiator. We design change control processes, data ownership models, evidence trails, and measurement frameworks built to last.",
    generalist: "Governance is rarely the core competence. Recommendations exist but accountability for execution often does not.",
  },
  {
    factor: "Practitioner seniority on your project",
    ds: "Co-founders and senior practitioners work directly on engagements. There is no layer of junior consultants between you and the expertise.",
    generalist: "Senior partners pitch, junior team delivers. Standard model in agencies and large consultancies.",
  },
  {
    factor: "Time to results",
    ds: "8–12 weeks for a scoped governance implementation. Diagnostic in week one, design by week four, live in week twelve.",
    generalist: "Strategy engagements: 4–8 weeks. Implementation: variable. Governance outcomes: 12+ months if achieved at all.",
  },
  {
    factor: "ESG and sustainability expertise",
    ds: "Deep. Both co-founders have direct ESG implementation experience. CSRD, BRSR, UK climate, GHG governance — not bought-in expertise.",
    generalist: "Most marketing and growth agencies do not offer ESG advisory. ESG-specific generalist firms often lack implementation depth.",
  },
  {
    factor: "Cost for mid-market",
    ds: "Designed for mid-market organisations that cannot justify Big 4 fees. Engagement-based pricing with defined scope and outcomes.",
    generalist: "Marketing agencies: retainer-based, often higher cost for less governance value. Big 4 ESG: higher fees, longer timelines.",
  },
  {
    factor: "AI and data capabilities",
    ds: "AI with guardrails: we design AI adoption that is governed, auditable, and integrated with your operating model — not bolted on.",
    generalist: "AI capabilities are often vendor-driven or limited to specific tools. Governance of AI output is rarely addressed.",
  },
];

export default function DSConsultingVsGeneralistPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Compare</span>
            <span className="mx-2">/</span>
            <span className="text-indigo-200">DS Consulting vs Generalist Agencies</span>
          </nav>
          <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Comparison Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">DS Consulting vs Generalist Agencies</h1>
          <p className="text-indigo-200 text-lg max-w-2xl leading-relaxed">
            An honest comparison for buyers who are deciding between a specialist governance advisory
            firm and a generalist agency — or a Big 4 practice — for ESG readiness or revenue operations.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Positioning callout */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10">
          <p className="text-slate-700 leading-relaxed text-sm">
            <strong>The honest framing:</strong> DS Consulting is not the right choice for every engagement.
            If you need brand creative, media buying, or broad commercial strategy without implementation,
            a generalist agency may serve you better. We exist in a specific gap: organisations that need
            a governed operating model built and delivered, not just described — at mid-market speed and cost.
          </p>
        </div>

        {/* Comparison matrix */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Direct comparison</h2>
        <div className="space-y-4 mb-12">
          {MATRIX.map(({ factor, ds, generalist }) => (
            <div key={factor} className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-3">
                <span className="font-semibold text-sm">{factor}</span>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="p-5 bg-indigo-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">DS Consulting</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{ds}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Generalist Agency / Big 4</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{generalist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Who DS Consulting is right for */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">DS Consulting is the right choice when...</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "You need a governed operating model built, not just a strategy deck delivered",
                "Your CRM or ESG governance gap is costing you visibility, not just efficiency",
                "You want the same senior practitioners on your project from diagnostic to delivery",
                "You are a mid-market organisation that cannot justify Big 4 timelines or fees",
                "You need CSRD, BRSR, or UK climate readiness in one or two reporting cycles",
                "You want AI adoption that is governed and integrated, not bolted on",
              ].map((item, i) => (
                <li key={i} className="flex gap-2"><span className="text-indigo-500 mt-0.5 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4">Consider alternatives when...</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "You primarily need brand, creative, or media buying capability",
                "Your brief is broad commercial strategy without a specific governance outcome",
                "You need a large team of specialists across 10+ disciplines simultaneously",
                "You require statutory audit or independent assurance (we do not provide these)",
                "Your organisation is large enough to justify Big 4 fees and timelines",
              ].map((item, i) => (
                <li key={i} className="flex gap-2"><span className="text-slate-400 mt-0.5 flex-shrink-0">→</span>{item}</li>
              ))}
            </ul>
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
                background: "Deloitte Digital, Tata, Tesco, Godrej. Standardised omnichannel operating processes across 25 markets. Built conversion-led CRM and lifecycle systems across B2B and B2C.",
                linkedin: site.linkedin.tejas,
              },
              {
                name: "Jigar Dhabalia",
                focus: "ESG Readiness",
                background: "Corporate Sustainability specialist. CSRD, BRSR, UK climate, GHG governance across manufacturing, oil and gas, energy and utilities, and financial services.",
                linkedin: site.linkedin.jigar,
              },
            ].map(({ name, focus, background, linkedin }) => (
              <div key={name}>
                <div className="font-bold text-white mb-0.5">{name}</div>
                <div className="text-indigo-300 text-xs mb-2">{focus}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{background}</p>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-300 hover:text-white">
                  LinkedIn →
                </a>
              </div>
            ))}
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
        <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Start with a diagnostic conversation</h2>
          <p className="text-indigo-100 text-sm mb-6 max-w-lg mx-auto">
            We do not do long sales processes. A 45-minute conversation with one of our co-founders
            will tell you whether we are the right fit — and if we are not, we will tell you that too.
          </p>
          <Link href="/contact" className="inline-block bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 text-sm">
            Book a conversation
          </Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
