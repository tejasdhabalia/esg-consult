import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `What is Double Materiality? The CSRD Concept Explained | ${site.legalName}`,
  description:
    "Double materiality requires companies to assess both their impact on sustainability topics and how sustainability topics affect their financial performance. A clear explanation of the concept required under CSRD and ESRS.",
  alternates: { canonical: absUrl("/regulatory-hub/what-is-double-materiality") },
};

const definitionSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Double Materiality",
  description:
    "Double materiality is the framework under CSRD and ESRS that requires companies to assess sustainability topics from two perspectives: (1) impact materiality — how the company's operations and value chain affect people, communities, and the environment; and (2) financial materiality — how sustainability-related risks and opportunities affect the company's financial performance, position, and prospects. A topic can be material from one or both perspectives.",
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
      name: "What is double materiality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Double materiality is the CSRD and ESRS framework for determining which sustainability topics a company must disclose. It requires assessment from two angles: impact materiality (how the company affects people and the environment through its own operations and value chain) and financial materiality (how sustainability risks and opportunities affect the company financially). Both dimensions must be assessed independently, and a topic is material if it meets the threshold for either or both.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between impact materiality and financial materiality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Impact materiality looks outward: it asks whether the company has actual or potential, positive or negative impacts on sustainability topics — people, communities, ecosystems, climate. Financial materiality looks inward: it asks whether sustainability topics create risks or opportunities that could affect the company's financial performance, cashflows, access to finance, or cost of capital. These are genuinely different assessments requiring different evidence and stakeholder inputs.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between double materiality and single materiality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Single materiality (used in financial reporting and standards like SASB) assesses sustainability topics only from the perspective of what matters to investors — i.e., the financial impact on the company. Double materiality adds the impact perspective: what the company does to the world, not just what the world does to the company's finances. This is what makes CSRD significantly more comprehensive than prior non-financial reporting frameworks.",
      },
    },
    {
      "@type": "Question",
      name: "How do you conduct a double materiality assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A double materiality assessment typically involves: (1) identifying a long list of sustainability topics relevant to your sector and value chain using ESRS topic lists as a starting point; (2) assessing impact materiality by evaluating the severity (scale, scope, irremediability) and likelihood of your impacts for each topic; (3) assessing financial materiality by evaluating the significance of financial risks and opportunities; (4) conducting stakeholder consultation to inform both assessments; (5) applying thresholds to determine material topics; (6) mapping material topics to ESRS disclosures. The assessment must be documented and approved at board level.",
      },
    },
    {
      "@type": "Question",
      name: "Is double materiality required under standards other than CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Double materiality as a formal requirement is specific to CSRD and ESRS. The GRI Standards use a concept called 'impact materiality' that aligns to the impact materiality dimension of CSRD. ISSB/IFRS S1 and S2 use single materiality (enterprise/financial materiality only). The TNFD also uses a concept of double materiality. Understanding which materiality framework applies to your reporting obligations is therefore important for planning and resource allocation.",
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
    { "@type": "ListItem", position: 3, name: "What is Double Materiality?", item: absUrl("/regulatory-hub/what-is-double-materiality") },
  ],
};

export default function WhatIsDoubleMaterialityPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/regulatory-hub" className="hover:text-white">Regulatory Hub</Link>
            <span className="mx-2">/</span>
            <span className="text-white">What is Double Materiality?</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulatory Dictionary
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">What is Double Materiality?</h1>
          <p className="text-indigo-300 text-base max-w-2xl leading-relaxed">
            The CSRD framework requiring companies to assess both their impact on sustainability topics
            and how sustainability topics affect their financial performance — two independent assessments
            that together determine the scope of ESRS disclosure obligations.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl p-6 mb-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">Definition</p>
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>Double materiality</strong> is the framework under CSRD and ESRS that requires companies to assess
            sustainability topics from two independent perspectives: <strong>impact materiality</strong> (how the company
            affects people and the environment through its operations and value chain) and <strong>financial materiality</strong>
            (how sustainability risks and opportunities affect the company's financial performance and prospects).
            A topic can be material from one or both dimensions — disclosure obligations follow from material topics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Visual explainer */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">The two dimensions explained</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="text-blue-600 font-bold text-xs uppercase tracking-wide mb-2">Dimension 1</div>
                  <h3 className="font-bold text-slate-900 mb-3">Impact Materiality</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    <strong>The outward lens.</strong> How does the company affect people, communities, and the
                    environment through its own operations, products, services, and value chain?
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Actual negative impacts (e.g. GHG emissions, labour conditions)</li>
                    <li>• Potential negative impacts (e.g. supply chain risks)</li>
                    <li>• Actual positive impacts (e.g. jobs created, services provided)</li>
                    <li>• Potential positive impacts</li>
                  </ul>
                  <div className="mt-4 text-xs text-blue-600 font-medium">Severity assessed by: scale, scope, irremediability, likelihood</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="text-emerald-600 font-bold text-xs uppercase tracking-wide mb-2">Dimension 2</div>
                  <h3 className="font-bold text-slate-900 mb-3">Financial Materiality</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    <strong>The inward lens.</strong> How do sustainability risks and opportunities affect the
                    company's financial performance, cashflows, access to finance, or cost of capital?
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Physical risks (e.g. climate-related asset exposure)</li>
                    <li>• Transition risks (e.g. carbon pricing, regulatory change)</li>
                    <li>• Opportunities (e.g. new markets, efficiency gains)</li>
                    <li>• Reputational and relationship risks</li>
                  </ul>
                  <div className="mt-4 text-xs text-emerald-600 font-medium">Significance assessed by: magnitude of financial effect, likelihood</div>
                </div>
              </div>

              <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-slate-700">
                <strong>Key principle:</strong> The two assessments are independent. A topic that does not appear
                financially material to the company may still be material from an impact perspective — and must
                be disclosed. You cannot use financial insignificance to dismiss impact materiality.
              </div>
            </div>

            {/* vs single materiality */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Double vs single materiality</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left p-3 rounded-tl-lg font-semibold">Framework</th>
                      <th className="text-left p-3 font-semibold">Materiality type</th>
                      <th className="text-left p-3 rounded-tr-lg font-semibold">Primary audience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fw: "CSRD / ESRS", type: "Double materiality", audience: "Investors + broader stakeholders" },
                      { fw: "ISSB / IFRS S1–S2", type: "Single (financial)", audience: "Investors only" },
                      { fw: "GRI Standards", type: "Impact materiality", audience: "Broader stakeholders" },
                      { fw: "TCFD", type: "Financial (climate)", audience: "Investors, lenders" },
                      { fw: "SEBI BRSR", type: "Impact + limited financial", audience: "Regulators, investors" },
                    ].map((row, i) => (
                      <tr key={row.fw} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="p-3 font-medium text-slate-900">{row.fw}</td>
                        <td className="p-3 text-slate-600">{row.type}</td>
                        <td className="p-3 text-slate-500">{row.audience}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <h3 className="font-bold mb-2">CSRD Advisory</h3>
              <p className="text-indigo-200 text-xs mb-3 leading-relaxed">We support double materiality assessments including process design, stakeholder engagement, ESRS mapping, and board approval preparation.</p>
              <Link href="/services/esg-advisory/csrd-advisory" className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50">
                View CSRD advisory
              </Link>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Related terms</h4>
              <div className="space-y-2">
                {[
                  { label: "What is CSRD?", href: "/regulatory-hub/what-is-csrd" },
                  { label: "What is ESRS?", href: "/regulatory-hub/what-is-esrs" },
                  { label: "What is SEBI BRSR?", href: "/regulatory-hub/what-is-sebi-brsr" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">{link.label} →</Link>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 text-sm mb-2">Practical guide</h4>
              <Link href="/regulatory-hub/csrd-double-materiality-and-esrs-mapping" className="block text-xs text-indigo-600 hover:underline">
                Double materiality and ESRS mapping guide →
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
