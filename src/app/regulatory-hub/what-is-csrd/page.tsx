import Link from "next/link";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "What is CSRD? A practical explainer",
  description:
    "CSRD is the EU regulation requiring large companies to report sustainability information under ESRS. Who is in scope, key timelines and what it means for you.",
  path: "/regulatory-hub/what-is-csrd",
});

const definitionSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "CSRD",
  alternateName: "Corporate Sustainability Reporting Directive",
  description:
    "CSRD (EU Directive 2022/2464) is the European Union regulation that requires large companies and listed SMEs to report sustainability information under mandatory European Sustainability Reporting Standards (ESRS). It replaces the Non-Financial Reporting Directive (NFRD) and significantly expands the scope of sustainability disclosure, requiring companies to apply double materiality and obtain limited assurance on sustainability information from the first reporting cycle.",
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "DS Consulting Regulatory Dictionary",
    url: absUrl("/regulatory-hub"),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSRD stands for Corporate Sustainability Reporting Directive (EU Directive 2022/2464). It is the European Union regulation that requires large companies and listed SMEs to report sustainability information under mandatory European Sustainability Reporting Standards (ESRS). It replaces the NFRD and applies a double materiality framework — companies must assess both their impact on sustainability matters and the financial impact of sustainability matters on the company.",
      },
    },
    {
      "@type": "Question",
      name: "Who is in scope for CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSRD applies to: (1) Large EU companies meeting two of three criteria — 250+ employees, EUR 40M+ turnover, EUR 20M+ balance sheet — reporting from FY2024. (2) Listed SMEs on EU regulated markets reporting from FY2026 (with opt-out to FY2028). (3) Non-EU parent companies with significant EU activity (EUR 150M+ net turnover in EU and at least one EU subsidiary or branch) reporting from FY2028.",
      },
    },
    {
      "@type": "Question",
      name: "What is double materiality under CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Double materiality requires companies to assess sustainability topics from two perspectives: impact materiality (how the company affects people and the environment through its operations and value chain) and financial materiality (how sustainability risks and opportunities affect the company's financial performance and prospects). Both assessments must be conducted independently and a topic can be material from one or both perspectives.",
      },
    },
    {
      "@type": "Question",
      name: "What are ESRS under CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ESRS (European Sustainability Reporting Standards) are the mandatory standards under which companies report under CSRD. They are developed by EFRAG and adopted by the European Commission. The first set includes ESRS 1 (general requirements), ESRS 2 (general disclosures), and topic-specific standards covering environment (E1–E5), social (S1–S4), and governance (G1). Disclosure requirements within topic-specific standards are subject to the company's double materiality assessment.",
      },
    },
    {
      "@type": "Question",
      name: "What assurance is required under CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSRD requires limited assurance on sustainability information from the first reporting cycle. The European Commission has a mandate to develop standards for reasonable assurance by 2028, with a trajectory toward reasonable assurance as the long-term standard. Assurance must be provided by an accredited independent assurance provider, which in most member states will be the statutory auditor.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Regulatory Hub", item: absUrl("/regulatory-hub") },
    { "@type": "ListItem", position: 3, name: "What is CSRD?", item: absUrl("/regulatory-hub/what-is-csrd") },
  ],
};

const TIMELINE = [
  { year: "FY2024", label: "Large EU companies (NFRD scope)", note: "Report in 2025" },
  { year: "FY2025", label: "All large EU companies", note: "Report in 2026" },
  { year: "FY2026", label: "Listed SMEs (with opt-out to FY2028)", note: "Report in 2027" },
  { year: "FY2028", label: "Non-EU companies with significant EU operations", note: "Report in 2029" },
];

export default function WhatIsCSRDPage() {
  return (
    <div className="bg-white">
      {/* Hero / Definition banner */}
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/regulatory-hub" className="hover:text-white">Regulatory Hub</Link>
            <span className="mx-2">/</span>
            <span className="text-white">What is CSRD?</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulatory Dictionary
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What is CSRD?</h1>
          <p className="text-indigo-200 text-xl font-medium mb-3">Corporate Sustainability Reporting Directive</p>
          <p className="text-indigo-300 text-base max-w-2xl leading-relaxed">
            The EU regulation requiring large companies and listed SMEs to report sustainability information
            under mandatory European Sustainability Reporting Standards (ESRS), with double materiality
            and limited assurance from the first cycle.
          </p>
        </div>
      </div>

      {/* Core definition box */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl p-6 mb-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Definition</p>
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>CSRD (EU Directive 2022/2464)</strong> is the European Union regulation that requires large
            companies and listed SMEs to report sustainability information under mandatory European Sustainability
            Reporting Standards (ESRS). It replaces the Non-Financial Reporting Directive (NFRD), significantly
            expands reporting scope, and introduces a double materiality framework. Sustainability information must
            be subject to limited assurance from the first reporting cycle.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Quick facts */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key facts at a glance</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Legal basis", value: "EU Directive 2022/2464" },
                  { label: "Replaces", value: "NFRD (2014/95/EU)" },
                  { label: "Standards", value: "ESRS (developed by EFRAG)" },
                  { label: "Materiality", value: "Double materiality required" },
                  { label: "Assurance", value: "Limited assurance (first cycle)" },
                  { label: "First reporters", value: "FY2024 (NFRD companies)" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className="font-semibold text-slate-900 text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is in scope */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Who is in scope?</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                CSRD scope is determined by entity size, listing status, and — for non-EU companies —
                turnover within the EU. The criteria below determine which entities must report.
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "Large EU companies",
                    detail: "Meet at least two of: 250+ employees, EUR 40M+ net turnover, EUR 20M+ balance sheet total.",
                    badge: "FY2024/2025",
                    badgeColor: "bg-red-100 text-red-700",
                  },
                  {
                    label: "Listed SMEs on EU regulated markets",
                    detail: "Smaller listed companies with an opt-out available until FY2028.",
                    badge: "FY2026",
                    badgeColor: "bg-amber-100 text-amber-700",
                  },
                  {
                    label: "Non-EU parent companies",
                    detail: "EUR 150M+ net turnover in the EU with at least one EU subsidiary or branch exceeding the large company threshold.",
                    badge: "FY2028",
                    badgeColor: "bg-blue-100 text-blue-700",
                  },
                ].map(({ label, detail, badge, badgeColor }) => (
                  <div key={label} className="flex gap-3 p-4 border border-slate-200 rounded-xl bg-white">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900 text-sm">{label}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
                      </div>
                      <p className="text-xs text-slate-500">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporting timeline */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Reporting timeline</h2>
              <div className="relative">
                <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-indigo-200" />
                <div className="space-y-4">
                  {TIMELINE.map(({ year, label, note }, i) => (
                    <div key={year} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <div className="font-semibold text-slate-900 text-sm">{year}: {label}</div>
                        <div className="text-xs text-slate-500">{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Frequently asked questions</h2>
              <div className="space-y-5">
                {faqSchema.mainEntity.map((faq: {name: string; acceptedAnswer: {text: string}}, i: number) => (
                  <div key={i} className="border-b border-slate-100 pb-5">
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">CSRD Readiness Checklist</h3>
              <p className="text-indigo-200 text-xs mb-3 leading-relaxed">
                Download our 5-section readiness checklist covering scoping, double materiality, data governance,
                governance structure, and assurance readiness.
              </p>
              <Link href="/insights/csrd-readiness-checklist" className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50">
                Get the checklist
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Related terms</h4>
              <div className="space-y-2">
                {[
                  { label: "What is ESRS?", href: "/regulatory-hub/what-is-esrs" },
                  { label: "What is Double Materiality?", href: "/regulatory-hub/what-is-double-materiality" },
                  { label: "What is SEBI BRSR?", href: "/regulatory-hub/what-is-sebi-brsr" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-2">CSRD advisory</h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                We help CFOs and CSOs build the governance, data, and evidence trails required for CSRD compliance.
              </p>
              <Link href="/services/esg-advisory/csrd-advisory" className="block text-xs font-semibold text-indigo-600 hover:underline">
                View CSRD advisory service →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definitionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
