import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `BRSR Advisory | ${site.legalName}`,
  description:
    "Advisory plus implementation for SEBI BRSR readiness including KPI mapping, ESG data governance, controls, evidence trails, value chain approach and repeatable reporting workflows for India listed companies.",
  alternates: { canonical: absUrl("/services/esg-advisory/brsr-advisory") },
};

export default function BRSRAdvisoryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG Advisory", item: absUrl("/services/esg-advisory") },
      { "@type": "ListItem", position: 4, name: "BRSR Advisory", item: absUrl("/services/esg-advisory/brsr-advisory") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEBI BRSR Advisory",
    description:
      "Advisory plus implementation for SEBI BRSR readiness including KPI mapping, ESG data governance, controls, evidence trails, value chain approach and repeatable reporting workflows for India listed companies.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["India"],
    serviceType: [
      "BRSR readiness assessment",
      "KPI mapping and ownership",
      "ESG data governance and controls",
      "Evidence trails and documentation",
      "Value chain readiness approach",
      "Reporting workflow and cadence",
      "Assurance readiness preparation",
    ],
    url: absUrl("/services/esg-advisory/brsr-advisory"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does BRSR advisory typically include?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "BRSR advisory typically includes readiness and gap assessment, KPI mapping, data owner model, data collection workflow, governance cadence, control design, evidence trails, and reporting delivery support.",
        },
      },
      {
        "@type": "Question",
        name: "How do you map BRSR indicators to data owners and systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We create a KPI inventory aligned to BRSR indicators, define the data owner and source for each KPI, identify gaps, design validations and approvals, and document evidence trails for reporting quality.",
        },
      },
      {
        "@type": "Question",
        name: "How do you address value chain data requirements in practice?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We build a phased approach by prioritising material categories, defining supplier engagement workflows, setting evidence expectations, and establishing governance so value chain data improves cycle by cycle.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support emissions governance for BRSR reporting?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support emissions data governance, methodology documentation, and evidence trails. Where relevant, we define a practical approach for Scope 3 prioritisation and value chain data collection.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance for BRSR or BRSR Core?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not provide statutory audit or assurance. We prepare organisations for assurance through controls, documentation, evidence trails, and leadership review cadence.",
        },
      },
      {
        "@type": "Question",
        name: "What is the fastest way to improve BRSR readiness before the reporting cycle?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a readiness and gap assessment. It clarifies priorities, data gaps, owners, control needs, and a practical delivery plan for the reporting cycle.",
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
    ],
  };

  return (
    <div>
      <PageHero
        title="BRSR advisory"
        subtitle="Advisory plus implementation to make BRSR delivery repeatable. We convert indicators into a KPI system with owners, controls, evidence trails, and governance cadence so leadership can rely on the reporting cycle."
        primaryAction={{ label: "Book a BRSR consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG Advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/brsr.jpg"
        imageAlt="BRSR reporting and governance theme"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">BRSR becomes manageable when ownership and evidence are clear</h2>
          <p className="mt-6 text-slate-600">
            BRSR delivery usually struggles when indicators remain disconnected from data ownership and controls.
            Readiness improves when you define KPI definitions, owners, data sources, validations, evidence trails, and a review cadence early.
          </p>

          <p className="mt-4 text-slate-600">
            If your reporting requirement is EU-led, see{" "}
            <Link className="underline" href="/services/esg-advisory/csrd-advisory">
              CSRD advisory
            </Link>
            . For UK climate reporting, see{" "}
            <Link className="underline" href="/services/esg-advisory/uk-climate-reporting">
              UK climate reporting
            </Link>
            .
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
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We convert BRSR indicators into a KPI inventory with definitions, owners, controls, evidence trails, and a repeatable workflow.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Readiness and gap assessment", "Clarify scope, maturity, gaps, priorities, and a delivery roadmap for the reporting cycle."],
              ["KPI inventory and mapping", "Define KPI definitions aligned to indicators and map to owners and data sources."],
              ["Data collection workflow", "Design collection workflow, templates, validations, and escalation paths."],
              ["Controls and evidence trails", "Validation checks, approvals, documentation standards, and evidence trail expectations."],
              ["Value chain approach", "Phased approach for supplier data, prioritisation, workflows, assumptions, and governance."],
              ["Leadership review cadence", "Define review rhythm, sign-off model, change control, and continuous improvement."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border rounded-2xl p-8 shadow-sm">
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
              Discuss BRSR scope and timeline
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

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver BRSR capability</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Diagnose", "Confirm scope, timeline, KPI gaps, data ownership, and control needs."],
              ["Design", "KPI inventory, owner model, controls and evidence standards, and workflow cadence."],
              ["Implement", "Hands-on setup, enablement, documentation, and rollout support."],
              ["Govern", "Quality checks, issue tracking, leadership review rhythm, and improvements each cycle."],
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
            Common questions about BRSR KPI mapping, controls, evidence trails, value chain approach, and assurance readiness.
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
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Book a BRSR consultation
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}