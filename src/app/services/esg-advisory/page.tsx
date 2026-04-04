import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `ESG advisory | ${site.legalName}`,
  description:
    "Advisory plus implementation for ESG readiness, carbon accounting, CSRD, BRSR, EcoVadis readiness, and UK SECR and SRS reporting. Governance, evidence trails, and reporting systems that stand up to scrutiny.",
  alternates: { canonical: absUrl("/services/esg-advisory") },
};

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
      "Advisory plus implementation for ESG readiness, carbon accounting, CSRD, BRSR, EcoVadis readiness, and UK SECR and SRS reporting. Governance, evidence trails, and reporting systems that stand up to scrutiny.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["United Kingdom", "European Union", "India"],
    serviceType: [
      "Carbon accounting",
      "CSRD advisory",
      "BRSR advisory",
      "EcoVadis readiness",
      "UK SECR reporting",
      "UK SRS reporting",
      "ESG data governance",
      "Assurance readiness preparation",
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
            "Our ESG advisory work covers readiness assessment, carbon accounting, reporting design, ESG data governance, policy and evidence mapping, controls, and assurance readiness preparation across the relevant reporting standard or assessment framework.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support both regulatory reporting and buyer assessments?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support regulatory reporting such as CSRD, BRSR, SECR, and SRS, and buyer or procurement-driven assessments such as EcoVadis.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support carbon accounting as a standalone service?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Carbon accounting can be delivered as a focused service or as part of a broader ESG readiness programme.",
        },
      },
      {
        "@type": "Question",
        name: "How do you prepare teams for assurance or scrutiny?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We improve governance, clarify ownership, document methodology, strengthen controls, and create evidence trails so disclosures are more defensible and repeatable.",
        },
      },
      {
        "@type": "Question",
        name: "Can one operating model support multiple ESG requirements?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Ownership, controls, evidence trails, and reporting cadence can be standardised across multiple regulations or assessments. The disclosure mapping changes, but the operating discipline can stay consistent.",
        },
      },
      {
        "@type": "Question",
        name: "Where should we start if our ESG setup is immature?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a readiness and gap assessment. That clarifies priorities, missing data, policy gaps, and the implementation roadmap.",
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
        subtitle="Advisory plus implementation for organisations that need ESG readiness with real governance underneath it. We build the evidence trails, controls, and reporting systems that stand up to scrutiny."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to Services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/esg.jpg"
        imageAlt="ESG readiness, carbon accounting, EcoVadis, and reporting systems advisory"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Build ESG readiness that is defensible, repeatable, and useful to leadership</h2>
          <p className="mt-6 text-slate-600">
            ESG work underperforms when policy, data, evidence, and reporting cadence do not align. We help organisations move from fragmented activity to a structured operating model that leadership can rely on.
          </p>
          <p className="mt-4 text-slate-600">
            Our work covers regulatory reporting, buyer-driven assessments, carbon accounting, and the governance needed to make disclosures credible.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/regulatory-hub">
              Regulatory hub
            </Link>
            <Link className="underline text-slate-700" href="/insights">
              Insights
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">ESG service pathways</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Choose the pathway that matches the disclosure, assessment, or governance challenge you need to solve first.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              {
                href: "/services/esg-advisory/carbon-accounting",
                title: "Carbon accounting",
                desc: "Emissions data, methodology, evidence mapping, and reporting governance for teams that need credible carbon numbers.",
                accent: "text-emerald-700",
              },
              {
                href: "/services/esg-advisory/csrd-advisory",
                title: "CSRD advisory",
                desc: "Readiness, disclosure mapping, governance, and evidence trails for CSRD and ESRS delivery.",
                accent: "text-emerald-700",
              },
              {
                href: "/services/esg-advisory/brsr-advisory",
                title: "BRSR advisory",
                desc: "KPI mapping, ownership, controls, evidence trails, and reporting workflow for India listed reporting.",
                accent: "text-emerald-700",
              },
              {
                href: "/services/esg-advisory/ecovadis-readiness",
                title: "EcoVadis readiness",
                desc: "Gap assessment, policy review, evidence mapping, scoring strategy, and submission support.",
                accent: "text-emerald-700",
              },
              {
                href: "/services/esg-advisory/uk-climate-reporting",
                title: "UK SECR and SRS reporting",
                desc: "SECR and Sustainability Reporting Standard support with methodology, data quality, and board-ready reporting.",
                accent: "text-emerald-700",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className={`text-lg font-semibold ${item.accent}`}>{item.title}</div>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
                <div className="mt-4 text-sm font-medium text-emerald-700">Explore →</div>
              </Link>
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
                "Clarify current state, policy gaps, data gaps, and the fastest route to a stronger reporting or assessment outcome.",
              ],
              [
                "Governance and evidence trail design",
                "Define ownership, controls, review cadence, evidence expectations, and change control.",
              ],
              [
                "Reporting and submission support",
                "Build the workflow so teams are not scrambling at the end of the cycle and leadership can rely on the output.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about ESG readiness, carbon accounting, reporting standards, buyer assessments, and assurance preparation.
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