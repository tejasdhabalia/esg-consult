import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `ESG Advisory | ${site.legalName}`,
  description:
    "Advisory plus implementation for ESG readiness including CSRD and ESRS, SEBI BRSR, UK climate reporting, GHG governance, ESG data controls, evidence trails and assurance readiness preparation.",
  alternates: { canonical: absUrl("/services/esg-advisory") },
};

export default function ESGAdvisoryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG Advisory", item: absUrl("/services/esg-advisory") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ESG Advisory",
    description:
      "Advisory plus implementation for ESG readiness including CSRD and ESRS, SEBI BRSR, UK climate reporting, GHG governance, ESG data controls, evidence trails and assurance readiness preparation.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "CSRD and ESRS readiness",
      "BRSR readiness",
      "UK climate reporting readiness",
      "GHG governance and reporting systems",
      "ESG data governance and internal controls",
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
            "We provide advisory plus implementation across scoping and readiness, disclosure mapping, data ownership, controls and evidence trails, emissions methodology governance, reporting workflow design, and assurance readiness preparation.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support CSRD and ESRS readiness?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support CSRD readiness including scoping, double materiality support, ESRS disclosure mapping, owner and KPI mapping, controls, evidence trails, and repeatable reporting workflow.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support SEBI BRSR and BRSR Core readiness?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We convert indicators into a KPI inventory with definitions, owners, data sources, validations, evidence trails, and governance cadence to make reporting repeatable.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not provide statutory audit or assurance. We prepare organisations for assurance by improving governance, controls, documentation and evidence trails, and we can coordinate early alignment with your assurance practitioner.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle Scope 3 and value chain complexity?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We take a practical phased approach. We prioritise material categories, define ownership, design supplier workflows, document assumptions, and improve data quality cycle by cycle through governance.",
        },
      },
      {
        "@type": "Question",
        name: "Can one ESG operating model support multiple regulations?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Governance can be shared across regulations by standardising ownership, controls, evidence trails, and review cadence. Disclosure mapping changes by regulation but operating discipline remains consistent.",
        },
      },
      {
        "@type": "Question",
        name: "Where should we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a readiness and gap assessment. It clarifies scope, priorities, critical data gaps, control design needs, and a practical delivery plan for the reporting cycle.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="ESG readiness through governed reporting systems"
        subtitle="Advisory plus implementation to translate regulatory expectations into operating reality. We build ESG reporting capability with data ownership, controls, evidence trails, and review cadence so reporting is repeatable and defensible."
        primaryAction={{ label: "Book an ESG consultation", href: "/contact" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/esg.jpg"
        imageAlt="Modern sustainability and governance theme"
      />

      {/* KEY PATHWAYS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Key ESG pathways</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Choose the route that best matches your reporting environment. Each pathway is designed around governance,
            evidence trails, and repeatable delivery.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <Link
              href="/services/esg-advisory/csrd-advisory"
              className="bg-slate-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-emerald-700">CSRD and ESRS readiness</div>
              <p className="mt-3 text-sm text-slate-600">
                Scoping, double materiality support, ESRS mapping, data owners, controls and evidence trails.
              </p>
              <div className="mt-4 text-sm font-medium text-emerald-700">Explore CSRD advisory →</div>
            </Link>

            <Link
              href="/services/esg-advisory/brsr-advisory"
              className="bg-slate-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-emerald-700">SEBI BRSR readiness</div>
              <p className="mt-3 text-sm text-slate-600">
                KPI mapping to indicators, data ownership, controls, evidence trails, and governance cadence.
              </p>
              <div className="mt-4 text-sm font-medium text-emerald-700">Explore BRSR advisory →</div>
            </Link>

            <Link
              href="/services/esg-advisory/uk-climate-reporting"
              className="bg-slate-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-emerald-700">UK climate reporting</div>
              <p className="mt-3 text-sm text-slate-600">
                Governance, risk alignment, metrics and targets, controls and evidence trails for defensible reporting.
              </p>
              <div className="mt-4 text-sm font-medium text-emerald-700">Explore UK climate reporting →</div>
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/regulatory-hub"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              Regulatory hub
            </Link>
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Discuss your reporting timeline
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            ESG delivery works when regulation connects to data, controls and governance. Engagements typically cover the following.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Readiness and gap assessment", "Clarify scope, timeline, current maturity, critical gaps, and a delivery roadmap."],
              ["Disclosure mapping and ownership model", "Translate requirements into disclosures, KPIs, owners, and data sources."],
              ["GHG methodology and governance", "Define emissions data ownership, methodology documentation, and repeatable collection workflow."],
              ["ESG data governance and internal controls", "Validation checks, approvals, evidence standards and exception handling."],
              ["Reporting workflow and leadership cadence", "Templates, review rhythm, sign-off model, and change control so delivery is repeatable."],
              ["Assurance readiness preparation", "Controls and documentation improvements to reduce late-cycle rework and support external review readiness."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-3 text-sm text-slate-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver ESG capability</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We run ESG readiness as an operating model build with governance, implementation, and measurable outcomes.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Diagnose", "Scoping and readiness assessment across obligations, data, controls and gaps."],
              ["Design", "Disclosure mapping, owner model, controls, evidence standards, workflow and cadence."],
              ["Implement", "Hands-on setup, enablement, documentation, and rollout support."],
              ["Govern", "Quality checks, issue tracking, leadership review rhythm and continuous improvement."],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Book an ESG consultation
            </Link>
            <Link
              href="/services"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about ESG readiness, governance, evidence trails, and how engagements typically start.
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
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}