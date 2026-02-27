import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `CSRD and ESRS Advisory | ${site.legalName}`,
  description:
    "Advisory plus implementation for CSRD and ESRS readiness including scoping, double materiality support, ESRS disclosure mapping, ESG data governance, controls, evidence trails and assurance readiness preparation.",
  alternates: { canonical: absUrl("/services/esg-advisory/csrd-advisory") },
};

export default function CSRDAdvisoryPage() {
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
        name: "CSRD and ESRS Advisory",
        item: absUrl("/services/esg-advisory/csrd-advisory"),
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CSRD and ESRS Advisory",
    description:
      "Advisory plus implementation for CSRD and ESRS readiness including scoping, double materiality support, ESRS disclosure mapping, ESG data governance, controls, evidence trails and assurance readiness preparation.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "CSRD readiness assessment",
      "Double materiality support",
      "ESRS disclosure mapping",
      "ESG data ownership and governance",
      "Controls and evidence trail design",
      "Reporting workflow and leadership cadence",
      "Assurance readiness preparation",
    ],
    url: absUrl("/services/esg-advisory/csrd-advisory"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do we know if we are in scope for CSRD and when we need to report?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We start with scoping and readiness to clarify applicability, reporting timeline, group structure implications, and a practical roadmap for first-cycle delivery.",
        },
      },
      {
        "@type": "Question",
        name: "What is double materiality and how do you support it?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Double materiality evaluates financial materiality and impact materiality. We support stakeholder inputs, evidence capture, topic prioritisation, and mapping outcomes to ESRS disclosures and KPIs.",
        },
      },
      {
        "@type": "Question",
        name: "How do you map ESRS disclosures to data owners and systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We translate ESRS requirements into a disclosure inventory, define owners and data sources, identify gaps, then design controls, validations and evidence trails to support repeatable reporting.",
        },
      },
      {
        "@type": "Question",
        name: "How do you prepare for assurance expectations?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We improve readiness through control design, documentation standards, evidence trails, and review cadence. We can also coordinate early alignment with your assurance practitioner where relevant.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle value chain and Scope 3 data gaps?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We define a practical approach by prioritising material categories, setting ownership, designing supplier workflows, and documenting methodology and assumptions to improve data quality cycle by cycle.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support first year reporting delivery and ongoing operating model setup?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We support first-cycle readiness and reporting execution, then establish the operating model with ownership, cadence, controls, and continuous improvement so reporting remains sustainable.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not provide statutory audit or assurance. We prepare organisations for assurance by improving governance, controls, documentation, and evidence trails.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="CSRD and ESRS advisory"
        subtitle="Advisory plus implementation to make CSRD delivery repeatable. We turn ESRS disclosures into ownership, data governance, controls and evidence trails so leadership can rely on the reporting system year after year."
        primaryAction={{ label: "Book a CSRD consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG Advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/csrd.jpg"
        imageAlt="Modern compliance and governance theme for CSRD readiness"
      />

      {/* CONTEXT */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">CSRD readiness requires systems, not templates</h2>
          <p className="mt-6 text-slate-600">
            CSRD programmes often struggle when disclosure mapping stays disconnected from operating reality.
            Readiness improves when you define ownership, data sources, controls, evidence trails, and a leadership review cadence early.
          </p>

          <p className="mt-4 text-slate-600">
            We focus on building a reporting system that can be repeated, reviewed, and improved each cycle.
            If you are navigating India listed reporting, see{" "}
            <Link className="underline" href="/services/esg-advisory/brsr-advisory">
              BRSR advisory
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

      {/* WHAT WE DELIVER */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We convert CSRD obligations into a practical operating model with disclosures, owners, controls, and evidence trails.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              [
                "Scoping and readiness assessment",
                "Confirm applicability, reporting timeline, key gaps, stakeholder ownership, and first-cycle priorities.",
              ],
              [
                "Double materiality support",
                "Structured stakeholder inputs, evidence capture, topic prioritisation, and linkage to disclosures and KPIs.",
              ],
              [
                "ESRS disclosure inventory and mapping",
                "Translate ESRS into a disclosure set, map to data sources, define owners and identify gaps.",
              ],
              [
                "Data governance, controls and evidence trails",
                "Design validation checks, approvals, documentation standards and evidence trail expectations aligned to review needs.",
              ],
              [
                "Reporting workflow and review cadence",
                "Build repeatable workflow for data collection, review, sign-off and change control across cycles.",
              ],
              [
                "Assurance readiness preparation",
                "Strengthen controls and documentation so assurance expectations do not trigger late-cycle rework.",
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
              Discuss CSRD scope and timeline
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

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver CSRD capability</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Diagnose", "Scope, timeline, readiness gaps across disclosures, data sources, and controls."],
              ["Design", "Disclosure mapping, owner model, controls and evidence standards, and reporting workflow."],
              ["Implement", "Hands-on delivery support, enablement, templates, and governance rollout."],
              ["Govern", "Cadence, quality checks, evidence trail discipline, and continuous improvement each cycle."],
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
            Common questions about CSRD scoping, double materiality, ESRS mapping, governance and assurance readiness.
          </p>

          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-white border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {q.name}
                </summary>
                <div className="mt-3 text-sm text-slate-600">
                  {q.acceptedAnswer.text}{" "}
                  {q.name.includes("scope") ? (
                    <>
                      <Link className="underline" href="/contact">
                        Contact us
                      </Link>{" "}
                      to confirm your timeline.
                    </>
                  ) : null}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Book a CSRD consultation
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