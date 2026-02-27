import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Services | ${site.legalName}`,
  description:
    "Advisory plus implementation across ESG readiness and revenue visibility. Services include ESG reporting systems, marketing automation and RevOps, AI and data architecture, growth operating models, and location intelligence.",
  alternates: { canonical: absUrl("/services") },
};

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.displayName} Services`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ESG Advisory", url: absUrl("/services/esg-advisory") },
      { "@type": "ListItem", position: 2, name: "Marketing Automation and RevOps", url: absUrl("/services/marketing-automation") },
      { "@type": "ListItem", position: 3, name: "AI and Data Architecture", url: absUrl("/services") },
      { "@type": "ListItem", position: 4, name: "Business Growth Operating Model", url: absUrl("/services") },
      { "@type": "ListItem", position: 5, name: "Location Intelligence", url: absUrl("/services") },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide advisory only or advisory plus implementation?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We provide advisory plus implementation. We define the operating model, implement workflows and governance, enable teams, and set a cadence that sustains outcomes after go-live.",
        },
      },
      {
        "@type": "Question",
        name: "Which services should we start with if we want impact quickly?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Most teams start with a diagnostic. For ESG, that clarifies scope, data gaps, controls and evidence trails. For revenue systems, it clarifies lifecycle definitions, CRM governance, routing, and measurement reliability.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with both B2B and B2C organisations?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. B2B work focuses on lead and account lifecycle, routing and SLAs, pipeline visibility and renewals. B2C work focuses on omnichannel journeys, retention, repeat purchase, and content operations with governance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance for ESG reports?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not provide statutory audit or assurance. We prepare organisations for assurance through governance, control design, documentation and evidence trail readiness.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer fixed packages or custom consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We currently start with custom consulting. Once we understand your scope and constraints, we propose a phased plan with clear deliverables and measurable success metrics.",
        },
      },
      {
        "@type": "Question",
        name: "How do you use AI in your work?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We use AI to accelerate content workflows, improve segmentation and insights, and support decisioning. We implement governance so outputs remain compliant, measurable, and aligned to brand and stakeholder expectations.",
        },
      },
      {
        "@type": "Question",
        name: "How do we engage DS Consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Most engagements begin with a diagnostic, then move into design, implementation and governance setup. Use the contact page to share your context and timeline.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Services built for measurable execution"
        subtitle="We help leadership teams build governed systems that teams can run. Advisory plus implementation across ESG readiness, revenue visibility, and the operating models that connect tools, data, and delivery."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Explore insights", href: "/insights" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/services.jpg"
        imageAlt="Modern consulting workshop and collaboration"
      />

      {/* PRIMARY PILLARS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Priority focus areas</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Two areas drive the majority of leadership demand today. We make them operational through governance, controls, and measurable delivery.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-14">
            {/* ESG */}
            <div className="bg-slate-50 border rounded-2xl p-10">
              <h3 className="text-2xl font-semibold text-emerald-700">ESG Advisory</h3>
              <p className="mt-4 text-slate-600">
                ESG readiness through reporting systems, data governance, controls, and evidence trails.
                We support CSRD and ESRS, SEBI BRSR, UK climate reporting, GHG governance, and assurance readiness preparation.
              </p>

              <ul className="mt-5 text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>Scoping, readiness assessment, and disclosure mapping</li>
                <li>Data ownership model, validations, evidence trails</li>
                <li>Governance cadence, review workflows, documentation standards</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link className="text-emerald-700 font-medium" href="/services/esg-advisory">
                  Explore ESG advisory →
                </Link>
                <Link className="underline text-slate-700" href="/services/esg-advisory/csrd-advisory">
                  CSRD advisory
                </Link>
                <Link className="underline text-slate-700" href="/services/esg-advisory/brsr-advisory">
                  BRSR advisory
                </Link>
              </div>
            </div>

            {/* Marketing */}
            <div className="bg-slate-50 border rounded-2xl p-10">
              <h3 className="text-2xl font-semibold text-indigo-700">
                Marketing Automation and RevOps
              </h3>
              <p className="mt-4 text-slate-600">
                Revenue visibility through lifecycle governance, CRM architecture discipline, automation workflows, and measurement that leaders can trust.
                Works for B2B pipeline and renewals, and B2C retention and lifecycle performance.
              </p>

              <ul className="mt-5 text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>Lifecycle definitions, routing, SLAs, and operating cadence</li>
                <li>CRM data model, hygiene rules, integrations and governance</li>
                <li>Measurement discipline and executive reporting stability</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link className="text-indigo-700 font-medium" href="/services/marketing-automation">
                  Explore marketing automation →
                </Link>
                <Link className="underline text-slate-700" href="/services/marketing-automation/crm-architecture-governance">
                  CRM governance
                </Link>
                <Link className="underline text-slate-700" href="/services/marketing-automation/revenue-analytics">
                  Revenue analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 PILLAR STRUCTURE */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Our 5-pillar capability</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We focus on outcomes and build the systems behind them. These pillars support end-to-end transformation without losing governance.
          </p>

          <div className="grid md:grid-cols-5 gap-6 mt-12">
            {[
              ["ESG readiness", "Reporting systems with governance, controls, and evidence trails."],
              ["Revenue visibility", "Lifecycle, CRM discipline, automation, and measurement that leaders trust."],
              ["AI and data architecture", "Use-case prioritisation, data model clarity, and governed AI adoption."],
              ["Business growth operating model", "Execution cadence, process governance, and measurable performance systems."],
              ["Location intelligence", "Catchment analytics, retail planning, and data-backed expansion decisions."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border rounded-2xl p-6 shadow-sm">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-2 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We run engagements as operating model builds with governance, implementation, and measurable outcomes.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Diagnose", "Clarify scope, priorities, current gaps, and what success means for stakeholders."],
              ["Design", "Define owners, controls, workflows, and measurement definitions aligned to operating reality."],
              ["Implement", "Hands-on configuration, enablement, documentation, and rollout support."],
              ["Govern", "Cadence, quality checks, issue tracking, and continuous improvement."],
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
              Discuss scope and timeline
            </Link>
            <Link
              href="/about"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              About {site.displayName}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about our services, engagement model, and how to start.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}