import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `UK Climate Reporting Advisory | ${site.legalName}`,
  description:
    "Advisory plus implementation for UK climate reporting including governance, risk alignment, metrics and targets, emissions governance, controls, evidence trails and repeatable reporting workflows.",
  alternates: { canonical: absUrl("/services/esg-advisory/uk-climate-reporting") },
};

export default function UKClimateReportingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG Advisory", item: absUrl("/services/esg-advisory") },
      { "@type": "ListItem", position: 4, name: "UK Climate Reporting", item: absUrl("/services/esg-advisory/uk-climate-reporting") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UK Climate Reporting Advisory",
    description:
      "Advisory plus implementation for UK climate reporting including governance, risk alignment, metrics and targets, emissions governance, controls, evidence trails and repeatable reporting workflows.",
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["United Kingdom"],
    serviceType: [
      "Climate governance and oversight",
      "Climate risk management alignment",
      "Metrics and targets design",
      "Emissions governance and evidence trails",
      "Controls and documentation standards",
      "Reporting workflow and cadence",
      "Assurance readiness preparation",
    ],
    url: absUrl("/services/esg-advisory/uk-climate-reporting"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does UK climate reporting advisory include?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "It includes governance and oversight, climate risk alignment, metrics and targets, emissions governance, data controls, evidence trails, and repeatable reporting workflow aligned to leadership review expectations.",
        },
      },
      {
        "@type": "Question",
        name: "How do you build governance for climate reporting?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We define ownership and decision rights, establish review cadence, implement evidence standards, and set controls so reporting remains repeatable and reviewable.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support emissions reporting and Scope 1, 2 and 3 methodology?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support emissions governance, methodology documentation, and evidence trails. We also define a practical approach for Scope 3 prioritisation and value chain data where relevant.",
        },
      },
      {
        "@type": "Question",
        name: "How do you connect climate risk disclosures to enterprise risk management?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We align climate risks to ERM processes by defining risk taxonomy, ownership, monitoring cadence, and escalation paths, then linking disclosures to risk management evidence and governance.",
        },
      },
      {
        "@type": "Question",
        name: "How do you prepare climate reporting for assurance expectations?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We strengthen controls, documentation, evidence trails, and review cycles so reporting is defensible. We can coordinate early alignment with your assurance practitioner where needed.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not provide statutory audit or assurance. We prepare organisations for assurance by improving governance, controls, documentation and evidence trails.",
        },
      },
      {
        "@type": "Question",
        name: "Where should we start if we need to improve readiness quickly?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a readiness and gap assessment. It clarifies current governance maturity, data gaps, controls, and a practical roadmap for reporting improvements and delivery.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="UK climate reporting advisory"
        subtitle="Advisory plus implementation to strengthen governance, risk alignment, metrics and targets, controls, and evidence trails so climate reporting remains defensible and repeatable."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG Advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/uk-climate.jpg"
        imageAlt="UK climate reporting and governance theme"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Climate reporting requires governance, evidence and cadence</h2>
          <p className="mt-6 text-slate-600">
            Climate disclosures create scrutiny when governance and evidence trails are unclear. Strong reporting requires ownership,
            data definitions, controls, and a review cadence that leadership can rely on.
          </p>

          <p className="mt-4 text-slate-600">
            If you are navigating EU reporting, see{" "}
            <Link className="underline" href="/services/esg-advisory/csrd-advisory">
              CSRD advisory
            </Link>
            . For India listed reporting, see{" "}
            <Link className="underline" href="/services/esg-advisory/brsr-advisory">
              BRSR advisory
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
            We translate climate reporting expectations into an operating model with ownership, controls, and evidence trails.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Readiness and gap assessment", "Clarify governance maturity, data gaps, controls and improvement roadmap."],
              ["Governance and oversight model", "Define ownership, approvals, cadence, evidence expectations and escalation paths."],
              ["Risk alignment to ERM", "Align climate risks to ERM processes, owners, monitoring and evidence."],
              ["Metrics and targets design", "Define KPI set, data definitions, methodology, documentation and review cadence."],
              ["Emissions governance and evidence trails", "Support Scope 1 and 2 governance and a practical Scope 3 approach where relevant."],
              ["Controls and reporting workflow", "Validations, approvals, documentation standards and repeatable reporting process."],
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
              Discuss climate reporting scope
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
          <h2 className="text-3xl font-semibold">How we deliver climate reporting capability</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Diagnose", "Assess governance, risks, metrics, data sources, controls and reporting gaps."],
              ["Design", "Define operating model, evidence standards, controls and reporting workflow."],
              ["Implement", "Hands-on rollout, enablement, documentation and cadence setup."],
              ["Govern", "Quality checks, leadership review cadence and continuous improvement."],
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
            Common questions about climate governance, metrics, emissions methodology, controls, and reporting workflow.
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
            <Link href="/services/esg-advisory" className="border px-6 py-3 rounded-lg font-medium text-center">
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