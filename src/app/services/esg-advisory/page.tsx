import Link from "next/link";
import PageHero from "@/components/PageHero";
import { esgServicePathways } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "ESG advisory and reporting services",
  description:
    "ESG advisory spanning CSRD, BRSR, UK SECR, carbon accounting, net zero, climate risk, CDP, EcoVadis, supplier engagement and sustainability strategy.",
  path: "/services/esg-advisory",
});

export default function ESGAdvisoryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG advisory", item: absUrl("/services/esg-advisory") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ESG advisory",
    description:
      "Advisory plus implementation for ESG readiness across carbon accounting, net zero, climate risk, CSRD, BRSR, EcoVadis, CDP, supplier engagement, sustainability strategy, and UK SECR and SRS reporting.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["United Kingdom", "European Union", "India"],
    serviceType: [
      "Carbon accounting",
      "Net zero and decarbonisation",
      "Climate risk advisory",
      "CDP reporting advisory",
      "Product sustainability advisory",
      "CSRD advisory",
      "BRSR advisory",
      "EcoVadis readiness",
      "B Corp certification advisory",
      "Supplier engagement advisory",
      "Sustainability strategy advisory",
      "Sustainability training and enablement",
      "Outsourced sustainability management",
      "RFP and tender sustainability support",
      "UK SECR and SRS reporting",
    ],
    url: absUrl("/services/esg-advisory"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does ESG advisory include?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Our ESG advisory work covers readiness assessment, carbon accounting, reporting design, ESG data governance, policy and evidence mapping, supplier engagement, climate planning, training, and assurance readiness preparation across the relevant reporting standard or assessment framework.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support both regulatory reporting and buyer assessments?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support regulatory reporting such as CSRD, BRSR, SECR, and SRS, and buyer or procurement-driven assessments such as EcoVadis, supplier questionnaires, and sustainability tender responses.",
        },
      },
      {
        "@type": "Question",
        name: "Can you support wider ESG operating model work beyond a single report?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support sustainability strategy, outsourced sustainability management, supplier engagement, training, and related operating model work where organisations need ESG capability that goes beyond one disclosure cycle.",
        },
      },
      {
        "@type": "Question",
        name: "How do you prepare teams for assurance or scrutiny?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We improve governance, clarify ownership, document methodology, strengthen controls, and create evidence trails so disclosures and buyer responses are more defensible and repeatable.",
        },
      },
      {
        "@type": "Question",
        name: "Can one operating model support multiple ESG requirements?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Ownership, controls, evidence trails, and reporting cadence can be standardised across multiple regulations, assessments, and buyer requirements. The detailed mapping changes, but the operating discipline can stay consistent.",
        },
      },
      {
        "@type": "Question",
        name: "Where should we start if our ESG setup is immature?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a readiness and gap assessment. That clarifies priorities, missing data, policy gaps, operating model issues, and the implementation roadmap.",
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

  return (
    <div>
      <PageHero
        title="ESG advisory"
        subtitle="Advisory plus implementation for organisations that need ESG readiness with stronger governance underneath it. We support climate, reporting, procurement, and sustainability operating model work with evidence trails, controls, and measurable execution."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to Services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/esg.jpg"
        imageAlt="ESG advisory across carbon accounting, climate risk, supplier engagement, and reporting systems"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Build ESG readiness that is defensible, repeatable, and useful to leadership</h2>
          <p className="mt-6 text-slate-600">
            ESG work underperforms when policy, data, evidence, supplier inputs, and reporting cadence do not align. We help organisations move from fragmented activity to a structured operating model that leadership can rely on.
          </p>
          <p className="mt-4 text-slate-600">
            Our work covers regulatory reporting, buyer-driven assessments, climate planning, product and supply chain sustainability, and the governance needed to make all of it more credible.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/regulatory-hub">
              Regulatory hub
            </Link>
            <Link className="underline text-slate-700" href="/insights">
              Insights
            </Link>
            <Link className="underline text-slate-700" href="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">ESG service pathways</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Choose the pathway that matches the disclosure, climate, procurement, or operating model challenge you need to solve first.
          </p>

          <div className="mt-14 space-y-10">
            {esgServicePathways.map((group) => (
              <div key={group.title}>
                <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  {group.title}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
                    >
                      <div className="text-lg font-semibold text-emerald-700">{item.title}</div>
                      <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                      <div className="mt-4 text-sm font-medium text-emerald-700">Explore →</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver across ESG engagements</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              [
                "Readiness and gap assessment",
                "Clarify current state, policy gaps, data gaps, supplier gaps, and the fastest route to a stronger reporting or buyer outcome.",
              ],
              [
                "Governance and evidence trail design",
                "Define ownership, controls, review cadence, evidence expectations, and change control across ESG workstreams.",
              ],
              [
                "Execution support",
                "Build the workflow so teams are not scrambling at the end of the cycle and leadership can rely on the output.",
              ],
            ].map(([title, description]) => (
              <div key={title} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-3 text-sm text-slate-600">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Where we usually help first</h2>
          <p className="mt-4 text-slate-300 max-w-4xl">
            Most ESG programmes start in one of four places. We help stabilise the pressure point first, then build the wider operating model behind it.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              ["Climate and carbon", "When leadership needs clearer emissions data, a reduction roadmap, or better climate disclosure inputs."],
              ["Reporting and compliance", "When teams need stronger governance, ownership, and evidence for CSRD, BRSR, SECR, SRS, or CDP."],
              ["Buyer and procurement pressure", "When EcoVadis, supplier requests, or tenders are exposing gaps in evidence and operating discipline."],
              ["Capability and execution", "When sustainability work needs strategy, training, or ongoing programme coordination to keep moving."],
            ].map(([title, description]) => (
              <div key={title} className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                <div className="font-semibold text-emerald-400">{title}</div>
                <div className="mt-3 text-sm text-slate-300">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about our ESG engagement model, scope, and how to start.
          </p>

          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-white border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">{q.name}</summary>
                <div className="mt-3 text-sm text-slate-600">{q.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Book a consultation
            </Link>
            <Link href="/services" className="border px-6 py-3 rounded-lg font-medium text-center">
              Back to Services
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
