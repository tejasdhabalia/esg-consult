import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `What is SEBI BRSR? Business Responsibility and Sustainability Report Explained | ${site.legalName}`,
  description:
    "SEBI BRSR is India's mandatory ESG disclosure framework for listed companies. Learn what BRSR Core is, who must report, what the 9 principles cover, and what assurance is required.",
  alternates: { canonical: absUrl("/regulatory-hub/what-is-sebi-brsr") },
};

const definitionSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "SEBI BRSR",
  alternateName: "Business Responsibility and Sustainability Report",
  description:
    "SEBI BRSR (Business Responsibility and Sustainability Report) is India's mandatory ESG disclosure framework introduced by the Securities and Exchange Board of India (SEBI). It replaced the Business Responsibility Report (BRR) and requires the top 1,000 listed companies by market capitalisation to disclose sustainability performance across 9 principles covering environment, social, and governance dimensions. BRSR Core is a subset of mandatory KPIs within BRSR that are subject to reasonable assurance.",
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
      name: "What is SEBI BRSR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEBI BRSR (Business Responsibility and Sustainability Report) is India's mandatory sustainability disclosure framework required by the Securities and Exchange Board of India. It replaced the earlier Business Responsibility Report (BRR) and applies to the top 1,000 listed companies by market capitalisation. BRSR requires disclosures across 9 principles of the National Guidelines on Responsible Business Conduct (NGRBC), covering environment, social, and governance dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "What is BRSR Core?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BRSR Core is a subset of Key Performance Indicators (KPIs) within the BRSR framework that are subject to mandatory reasonable assurance. SEBI introduced BRSR Core to ensure that the most critical ESG metrics are independently verified. For the top 150 companies by market cap, BRSR Core assurance was required from FY2023-24. It covers indicators across environmental metrics (GHG emissions, energy, water, waste), social metrics (equal pay, turnover), and governance indicators.",
      },
    },
    {
      "@type": "Question",
      name: "Who must file BRSR in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BRSR filing is mandatory for the top 1,000 listed companies by market capitalisation in India. This was phased in: mandatory for the top 1,000 from FY2022-23. BRSR Core assurance requirements apply to the top 150 companies from FY2023-24, expanding to the top 250 from FY2024-25, and the top 500 and 1,000 in subsequent years.",
      },
    },
    {
      "@type": "Question",
      name: "What are the 9 principles of BRSR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 9 BRSR principles align to India's National Guidelines on Responsible Business Conduct (NGRBC): P1 — Businesses should conduct and govern themselves with integrity; P2 — Businesses should provide goods and services sustainably; P3 — Businesses should respect and promote the wellbeing of employees; P4 — Businesses should respect the interests of stakeholders; P5 — Businesses should respect and promote human rights; P6 — Businesses should respect and make efforts to protect the environment; P7 — Businesses should engage in policy advocacy responsibly; P8 — Businesses should promote inclusive growth; P9 — Businesses should engage with and provide value to their consumers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between BRSR and BRSR Core?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BRSR is the full sustainability disclosure report covering all 9 principles and both essential and leadership indicators. BRSR Core is a curated set of quantitative KPIs within BRSR that SEBI has identified as most critical for ESG assessment. BRSR Core indicators are subject to mandatory reasonable assurance — the rest of the BRSR report is not. BRSR Core therefore represents the highest-stakes portion of BRSR from a governance and evidence trail perspective.",
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
    { "@type": "ListItem", position: 3, name: "What is SEBI BRSR?", item: absUrl("/regulatory-hub/what-is-sebi-brsr") },
  ],
};

const PRINCIPLES = [
  { num: "P1", title: "Integrity and governance", short: "Conduct and govern with integrity, ethics, and transparency." },
  { num: "P2", title: "Sustainable products and services", short: "Provide goods and services in a sustainable and safe manner." },
  { num: "P3", title: "Employee wellbeing", short: "Respect and promote the wellbeing of all employees and workers." },
  { num: "P4", title: "Stakeholder responsiveness", short: "Respect the interests of and be responsive to all stakeholders." },
  { num: "P5", title: "Human rights", short: "Respect and promote human rights across operations and value chain." },
  { num: "P6", title: "Environment", short: "Respect and make efforts to protect and restore the environment." },
  { num: "P7", title: "Policy advocacy", short: "Engage in responsible and transparent policy advocacy." },
  { num: "P8", title: "Inclusive growth", short: "Promote inclusive growth and equitable development." },
  { num: "P9", title: "Consumer value", short: "Engage with and provide value to consumers in a responsible manner." },
];

export default function WhatIsSEBIBRSRPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/regulatory-hub" className="hover:text-white">Regulatory Hub</Link>
            <span className="mx-2">/</span>
            <span className="text-white">What is SEBI BRSR?</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulatory Dictionary
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What is SEBI BRSR?</h1>
          <p className="text-indigo-200 text-xl font-medium mb-3">Business Responsibility and Sustainability Report</p>
          <p className="text-indigo-300 text-base max-w-2xl leading-relaxed">
            India's mandatory ESG disclosure framework for the top 1,000 listed companies, covering 9 principles
            of responsible business conduct with BRSR Core indicators subject to reasonable assurance.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl p-6 mb-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Definition</p>
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>SEBI BRSR</strong> is India's mandatory sustainability disclosure framework introduced by the
            Securities and Exchange Board of India (SEBI). Required for the top 1,000 listed companies by market
            capitalisation, it mandates disclosures across 9 principles of the National Guidelines on Responsible
            Business Conduct (NGRBC). <strong>BRSR Core</strong> is the subset of quantitative KPIs subject to
            mandatory reasonable assurance — the highest-stakes component of the framework from a governance
            and evidence trail perspective.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Quick facts */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key facts at a glance</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Regulator", value: "Securities and Exchange Board of India (SEBI)" },
                  { label: "Replaces", value: "Business Responsibility Report (BRR)" },
                  { label: "Who must report", value: "Top 1,000 listed companies by market cap" },
                  { label: "Mandatory from", value: "FY2022-23 (top 1,000)" },
                  { label: "Principles", value: "9 (aligned to NGRBC)" },
                  { label: "BRSR Core assurance", value: "Reasonable assurance (phased by cohort)" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className="font-semibold text-slate-900 text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BRSR Core callout */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">What is BRSR Core?</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                BRSR Core is a curated set of quantitative KPIs that SEBI has identified as most critical for
                ESG assessment. Unlike the rest of BRSR which is disclosed without independent verification,
                BRSR Core indicators are subject to mandatory <strong>reasonable assurance</strong> — the
                highest level of assurance standard, equivalent to audit-level scrutiny.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                BRSR Core covers GHG emissions (Scope 1 and 2), energy consumption, water withdrawal and
                consumption, waste generation, turnover rates, and gender pay ratios, among other indicators.
                For companies within scope, these KPIs require a robust evidence trail from the point of
                data collection through to the published disclosure.
              </p>
            </div>

            {/* 9 Principles */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">The 9 BRSR Principles</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {PRINCIPLES.map(({ num, title, short }) => (
                  <div key={num} className="flex gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {num}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm mb-0.5">{title}</div>
                      <div className="text-xs text-slate-500">{short}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
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
              <h3 className="font-bold mb-2">BRSR Advisory</h3>
              <p className="text-indigo-200 text-xs mb-3 leading-relaxed">
                We help India-listed companies build the KPI governance, evidence trails, and assurance readiness
                required for BRSR Core compliance.
              </p>
              <Link href="/services/esg-advisory/brsr-advisory" className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50">
                View BRSR advisory
              </Link>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Related terms</h4>
              <div className="space-y-2">
                {[
                  { label: "What is CSRD?", href: "/regulatory-hub/what-is-csrd" },
                  { label: "What is Double Materiality?", href: "/regulatory-hub/what-is-double-materiality" },
                  { label: "What is ESRS?", href: "/regulatory-hub/what-is-esrs" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-2">Practical guides</h4>
              <div className="space-y-2">
                {[
                  { label: "BRSR Core KPI mapping and controls", href: "/regulatory-hub/brsr-core-readiness-kpis-controls" },
                  { label: "Value chain data collection", href: "/regulatory-hub/brsr-value-chain-data-collection" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-xs text-indigo-600 hover:underline">
                    {link.label} →
                  </Link>
                ))}
              </div>
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
