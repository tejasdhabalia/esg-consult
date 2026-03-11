import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `What is ESRS? European Sustainability Reporting Standards Explained | ${site.legalName}`,
  description:
    "ESRS (European Sustainability Reporting Standards) are the mandatory standards under which companies report under CSRD. Learn the full structure: ESRS 1, ESRS 2, and the topic-specific E, S, and G standards.",
  alternates: { canonical: absUrl("/regulatory-hub/what-is-esrs") },
};

const definitionSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "ESRS",
  alternateName: "European Sustainability Reporting Standards",
  description:
    "ESRS (European Sustainability Reporting Standards) are the mandatory reporting standards developed by EFRAG and adopted by the European Commission under CSRD. The first set includes ESRS 1 (general requirements), ESRS 2 (general disclosures), and topic-specific standards covering environmental (E1-E5), social (S1-S4), and governance (G1) topics. Disclosure requirements within topic-specific standards are subject to the company's double materiality assessment.",
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
      name: "What are ESRS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ESRS (European Sustainability Reporting Standards) are the mandatory standards under which companies report sustainability information under CSRD. Developed by EFRAG and adopted by the European Commission, they set out what companies must disclose, how disclosures should be structured, and what data points are required. The first set of ESRS includes cross-cutting standards (ESRS 1 and ESRS 2) and 10 topic-specific standards covering environment, social, and governance areas.",
      },
    },
    {
      "@type": "Question",
      name: "What is ESRS 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ESRS 1 is the general requirements standard. It sets out the architecture of the ESRS framework, the reporting principles (including double materiality), how to apply materiality to determine which disclosures are required, and the relationship between the standards. ESRS 1 does not contain specific disclosure requirements — it establishes the rules for applying all other ESRS standards.",
      },
    },
    {
      "@type": "Question",
      name: "What is ESRS 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ESRS 2 is the general disclosures standard and is mandatory for all in-scope companies regardless of their double materiality outcome. It covers governance (roles and responsibilities for sustainability), strategy (how sustainability is integrated), impact, risk and opportunity management (including the double materiality process), and metrics and targets. ESRS 2 is the backbone of the CSRD disclosure — all companies must complete it in full.",
      },
    },
    {
      "@type": "Question",
      name: "Which ESRS standards are mandatory and which are optional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ESRS 2 is mandatory for all in-scope companies. ESRS 1 establishes the framework rules and must be followed. The topic-specific standards (E1-E5, S1-S4, G1) are subject to the double materiality assessment — if a topic is assessed as material from either the impact or financial perspective, the corresponding disclosures become mandatory. Companies that determine a topic is not material must explain why in their report. ESRS E1 (climate change) has specific requirements that apply even if a company concludes it is not material.",
      },
    },
    {
      "@type": "Question",
      name: "What is ESRS E1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ESRS E1 covers climate change. It is the environmental standard most companies will need to engage with regardless of their materiality outcome, because EFRAG has included a specific requirement: companies that determine climate is not material must provide a brief explanation of their reasoning. ESRS E1 requires disclosures on transition plans, physical and transition risks and opportunities, GHG emissions (Scope 1, 2, and 3), energy consumption, and climate-related targets.",
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
    { "@type": "ListItem", position: 3, name: "What is ESRS?", item: absUrl("/regulatory-hub/what-is-esrs") },
  ],
};

const STANDARDS = [
  { code: "ESRS 1", title: "General Requirements", area: "Cross-cutting", mandatory: "Always", desc: "Architecture, principles, materiality application, reporting boundary." },
  { code: "ESRS 2", title: "General Disclosures", area: "Cross-cutting", mandatory: "Always", desc: "Governance, strategy, impact/risk/opportunity management, metrics and targets." },
  { code: "ESRS E1", title: "Climate Change", area: "Environment", mandatory: "Materiality*", desc: "Transition plans, GHG emissions (Scope 1, 2, 3), energy, climate risks and opportunities." },
  { code: "ESRS E2", title: "Pollution", area: "Environment", mandatory: "Materiality", desc: "Air, water, soil, substances of concern, microplastics." },
  { code: "ESRS E3", title: "Water and Marine", area: "Environment", mandatory: "Materiality", desc: "Water consumption, withdrawal, discharge, ocean impacts." },
  { code: "ESRS E4", title: "Biodiversity", area: "Environment", mandatory: "Materiality", desc: "Biodiversity strategy, sensitive areas, impacts and dependencies." },
  { code: "ESRS E5", title: "Resource Use and Circular Economy", area: "Environment", mandatory: "Materiality", desc: "Resource inflows and outflows, waste, circular economy alignment." },
  { code: "ESRS S1", title: "Own Workforce", area: "Social", mandatory: "Materiality", desc: "Working conditions, equal treatment, rights, headcount, pay gap data." },
  { code: "ESRS S2", title: "Workers in Value Chain", area: "Social", mandatory: "Materiality", desc: "Suppliers and workers beyond direct employment scope." },
  { code: "ESRS S3", title: "Affected Communities", area: "Social", mandatory: "Materiality", desc: "Local communities, indigenous peoples, land rights." },
  { code: "ESRS S4", title: "Consumers and End-users", area: "Social", mandatory: "Materiality", desc: "Consumer safety, privacy, responsible marketing." },
  { code: "ESRS G1", title: "Business Conduct", area: "Governance", mandatory: "Materiality", desc: "Anti-corruption, lobbying, supplier relationships, payment practices." },
];

export default function WhatIsESRSPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/regulatory-hub" className="hover:text-white">Regulatory Hub</Link>
            <span className="mx-2">/</span>
            <span className="text-white">What is ESRS?</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulatory Dictionary
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">What is ESRS?</h1>
          <p className="text-indigo-200 text-xl font-medium mb-3">European Sustainability Reporting Standards</p>
          <p className="text-indigo-300 text-base max-w-2xl leading-relaxed">
            The mandatory standards under which companies report sustainability information under CSRD.
            12 standards covering cross-cutting requirements, environment, social, and governance —
            with disclosure obligations driven by your double materiality assessment.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl p-6 mb-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Definition</p>
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>ESRS</strong> (European Sustainability Reporting Standards) are the mandatory reporting standards
            developed by EFRAG and adopted by the European Commission under CSRD. The first set includes
            ESRS 1 (general requirements), ESRS 2 (general disclosures, mandatory for all), and 10 topic-specific
            standards covering environmental (E1–E5), social (S1–S4), and governance (G1) topics.
            Topic-specific disclosure requirements are triggered by the company's double materiality assessment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Standards table */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">All ESRS standards at a glance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left p-3 rounded-tl-lg font-semibold">Standard</th>
                      <th className="text-left p-3 font-semibold">Topic</th>
                      <th className="text-left p-3 font-semibold">Area</th>
                      <th className="text-left p-3 rounded-tr-lg font-semibold">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STANDARDS.map((std, i) => (
                      <tr key={std.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="p-3 font-bold text-indigo-700 whitespace-nowrap">{std.code}</td>
                        <td className="p-3 font-medium text-slate-900">{std.title}
                          <div className="text-slate-500 font-normal mt-0.5">{std.desc}</div>
                        </td>
                        <td className="p-3 text-slate-500 whitespace-nowrap">{std.area}</td>
                        <td className="p-3">
                          <span className={`font-semibold ${std.mandatory === "Always" ? "text-emerald-600" : "text-amber-600"}`}>
                            {std.mandatory}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                * ESRS E1: even companies that determine climate is not material must explain their reasoning.
                "Materiality" = required if the topic is material under the double materiality assessment.
              </p>
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
              <h3 className="font-bold mb-2">CSRD Advisory</h3>
              <p className="text-indigo-200 text-xs mb-3 leading-relaxed">We map your material topics to ESRS disclosures, design your data architecture, and build the evidence trails auditors require.</p>
              <Link href="/services/esg-advisory/csrd-advisory" className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50">
                View CSRD advisory
              </Link>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Related terms</h4>
              <div className="space-y-2">
                {[
                  { label: "What is CSRD?", href: "/regulatory-hub/what-is-csrd" },
                  { label: "What is Double Materiality?", href: "/regulatory-hub/what-is-double-materiality" },
                  { label: "What is SEBI BRSR?", href: "/regulatory-hub/what-is-sebi-brsr" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">{link.label} →</Link>
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
