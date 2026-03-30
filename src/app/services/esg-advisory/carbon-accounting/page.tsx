import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Carbon Accounting and GHG Inventory | ${site.legalName}`,
  description:
    "Complete, defensible Scope 1, 2 and 3 carbon inventory aligned with the GHG Protocol Corporate Standard. Regulatory compliance across TCFD, CSRD, UK SECR, and ISO 14064. Net zero roadmaps and SBTi-aligned target setting.",
  alternates: { canonical: absUrl("/services/esg-advisory/carbon-accounting") },
};

export default function CarbonAccountingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG Advisory", item: absUrl("/services/esg-advisory") },
      {
        "@type": "ListItem",
        position: 4,
        name: "Carbon Accounting and GHG Inventory",
        item: absUrl("/services/esg-advisory/carbon-accounting"),
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Carbon Accounting and GHG Inventory",
    description:
      "Complete, defensible Scope 1, 2 and 3 carbon inventory aligned with the GHG Protocol Corporate Standard. Regulatory compliance across TCFD, CSRD, UK SECR, and ISO 14064. Net zero roadmaps and SBTi-aligned target setting.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "Scope 1, 2 and 3 GHG inventory",
      "GHG Protocol Corporate Standard alignment",
      "TCFD and CSRD compliance guidance",
      "UK SECR reporting",
      "ISO 14064 alignment",
      "Net zero roadmap development",
      "SBTi-aligned target setting",
      "Carbon reporting and documentation",
    ],
    url: absUrl("/services/esg-advisory/carbon-accounting"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is included in a carbon inventory?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A complete GHG inventory covers Scope 1 (direct emissions), Scope 2 (purchased energy), and Scope 3 (value chain emissions) aligned with the GHG Protocol Corporate Standard. We handle data collection, activity mapping, emissions factor application, and produce a structured, defensible carbon baseline suitable for investors, regulators, and public disclosure.",
        },
      },
      {
        "@type": "Question",
        name: "Which regulatory frameworks do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We provide compliance guidance across TCFD, CSRD, UK SECR, and ISO 14064. Disclosures are structured to be accurate, consistent, and ready for third-party verification.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle Scope 3 value chain complexity?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We take a practical, phased approach. We prioritise material Scope 3 categories, define data ownership, design supplier data collection workflows, document methodology and assumptions, and improve data quality cycle by cycle through governance.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help us set science-based targets?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Once a carbon baseline is established, we develop SBTi-aligned science-based targets, identify priority reduction levers across your operations and value chain, and produce a costed, credible net zero roadmap your leadership can act on.",
        },
      },
      {
        "@type": "Question",
        name: "Who is this service designed for?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "This service is designed for SMEs and mid-market businesses building their first carbon inventory, regulated businesses facing SECR, CSRD, or other obligations, organisations under investor or supply chain scrutiny, and companies working toward SBTi or net zero commitments.",
        },
      },
      {
        "@type": "Question",
        name: "How do you ensure the carbon accounts are audit-ready?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Every engagement produces structured methodology notes, clear evidence trails, validation checks, and documentation standards so your carbon accounts can withstand scrutiny from auditors, investors, or regulators. We also prepare clients for third-party verification readiness where required.",
        },
      },
      {
        "@type": "Question",
        name: "Where should we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a discovery and scoping session. We review your business model, existing data sources, and reporting obligations, then propose a practical carbon inventory and reporting roadmap with clear timelines and deliverables.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Carbon accounting and GHG inventory"
        subtitle="A complete, defensible Scope 1, 2 and 3 carbon inventory aligned with the GHG Protocol Corporate Standard. From baseline to net zero, practical and audit-ready carbon management for regulated enterprises."
        primaryAction={{ label: "Book a carbon accounting consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG Advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/esg.jpg"
        imageAlt="Carbon accounting and sustainability reporting"
      />

      {/* CONTEXT */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Carbon accounts you can trust and explain</h2>
          <p className="mt-6 text-slate-600">
            Most organisations struggle not because they lack commitment to reducing emissions, but because their carbon data is incomplete, inconsistently measured, or not structured for the audiences that matter: regulators, investors, boards, and supply chain partners.
          </p>
          <p className="mt-4 text-slate-600">
            We build carbon inventories with technical rigour and practical clarity. Every engagement starts with understanding your business model and data landscape. We then work systematically to produce carbon accounts you can stand behind in any forum.
          </p>
          <p className="mt-4 text-slate-600">
            Carbon accounting is the measurement foundation that feeds regulatory disclosure. If your priority is reporting compliance, see{" "}
            <Link className="underline" href="/services/esg-advisory/csrd-advisory">CSRD advisory</Link>,{" "}
            <Link className="underline" href="/services/esg-advisory/brsr-advisory">BRSR advisory</Link>, or{" "}
            <Link className="underline" href="/services/esg-advisory/uk-climate-reporting">UK climate reporting</Link>.
            Both services can run in parallel or sequentially depending on where you are in your carbon journey.
          </p>

          <div className="mt-10 grid md:grid-cols-4 gap-4">
            {[
              ["GHG Protocol", "Corporate Standard and Scope 3"],
              ["ISO 14064-1", "Greenhouse gas accounting"],
              ["TCFD / CSRD", "Climate financial disclosures"],
              ["UK SECR", "Streamlined energy and carbon reporting"],
              ["SBTi", "Science-based targets initiative"],
            ].map(([label, desc]) => (
              <div key={label} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div className="font-semibold text-emerald-800 text-sm">{label}</div>
                <div className="mt-1 text-xs text-slate-600">{desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700 text-sm" href="/services/esg-advisory/csrd-advisory">
              CSRD advisory
            </Link>
            <Link className="underline text-slate-700 text-sm" href="/services/esg-advisory/uk-climate-reporting">
              UK climate reporting
            </Link>
            <Link className="underline text-slate-700 text-sm" href="/regulatory-hub">
              Regulatory hub
            </Link>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Who this is for</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-14">
            We work with organisations at different stages of the carbon journey, from first inventory to net zero roadmap.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["SMEs and mid-market", "Building their first carbon inventory and need a defensible, structured baseline."],
              ["Regulated businesses", "Facing SECR, CSRD, or other obligations and need compliance-ready reporting."],
              ["ESG due diligence", "Under investor or supply chain scrutiny requiring verified emissions data."],
              ["Net zero pledgers", "Working toward SBTi or net zero commitments and need a credible roadmap."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="text-emerald-400 font-semibold text-sm mb-2">{title}</div>
                <p className="text-slate-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Each engagement is structured around four core deliverables, from baseline measurement to strategic action.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              [
                "GHG inventory and measurement",
                "Full Scope 1, 2 and 3 emissions assessment per GHG Protocol Corporate Standard. Data collection, activity mapping, and emissions factor application to build your complete, defensible carbon baseline.",
              ],
              [
                "Regulatory compliance guidance",
                "Structured compliance guidance across TCFD, CSRD, UK SECR, and ISO 14064. Disclosures are accurate, consistent, and ready for third-party verification.",
              ],
              [
                "Carbon reporting and documentation",
                "Structured emissions reports for stakeholders, investors, or regulators. Clear methodology notes included for full transparency and auditability.",
              ],
              [
                "Sustainability strategy and net zero roadmap",
                "Science-based targets aligned to SBTi, priority reduction levers across operations and value chain, and a credible, costed net zero roadmap that turns your carbon data into decisive action.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-3 text-sm text-slate-600">{desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Book a carbon accounting consultation
            </Link>
            <Link
              href="/services/esg-advisory"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              Back to ESG Advisory
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver carbon accounting</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Technical rigour with practical clarity. Every engagement follows a structured four-stage process.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              [
                "01 Discovery and scoping",
                "Understand your business model, existing data sources, and reporting obligations. Confirm scope boundaries and prioritise emission sources.",
              ],
              [
                "02 Data collection",
                "Gather activity data across all relevant emission sources. Design collection workflows for ongoing data capture, including Scope 3 supplier engagement where required.",
              ],
              [
                "03 Carbon inventory",
                "Apply GHG Protocol methodology to build your complete baseline. Emissions factor selection, calculation, and quality review with full methodology documentation.",
              ],
              [
                "04 Report and strategy",
                "Deliver audit-ready reports structured for your audiences, alongside a reduction roadmap and net zero pathway with prioritised actions.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-3 text-sm text-slate-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about carbon inventories, GHG Protocol methodology, regulatory compliance, and net zero roadmaps.
          </p>

          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-white border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {q.name}
                </summary>
                <div className="mt-3 text-sm text-slate-600">
                  {q.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Book a carbon accounting consultation
            </Link>
            <Link
              href="/services/esg-advisory"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              Back to ESG Advisory
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}