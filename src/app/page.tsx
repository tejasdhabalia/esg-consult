import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: site.defaultTitle,
  description: site.defaultDescription,
  alternates: { canonical: absUrl("/") },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
    sameAs: [site.linkedin.tejas, site.linkedin.jigar],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${site.displayName} do?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "DS Consulting supports leaders with ESG readiness and revenue visibility through advisory plus implementation. We build governed systems across ESG reporting, marketing automation, CRM governance, and measurement discipline.",
        },
      },
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
        name: "Who do you typically work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We work with CEOs, CFOs, CMOs, CROs, and Chief Sustainability Officers. We support both B2B and B2C organisations across multi-team, multi-tool environments.",
        },
      },
      {
        "@type": "Question",
        name: "What outcomes do you prioritise most strongly?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Two outcomes are prioritised most strongly: ESG readiness and revenue visibility. ESG readiness means defensible reporting systems with governance, controls and evidence trails. Revenue visibility means lifecycle definitions, CRM discipline, and dashboards leaders can trust.",
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
        name: "How do we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Most engagements start with a diagnostic to clarify scope, priorities, data and governance gaps. We then propose a phased plan across design, implementation and governance with measurable success metrics.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Scalable transformation for ESG readiness and revenue visibility"
        subtitle="DS Consulting helps leadership teams turn fragmented tools and requirements into governed systems with measurable execution. Advisory plus implementation across ESG reporting systems, marketing automation, CRM governance, and AI-enabled operating models."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/home.jpg"
        imageAlt="Modern city skyline representing connected systems and governance"
      />

      {/* SERVICES (primary pillars) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we help you deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Most organisations do not need more tools. They need clarity, governance, and an operating model that teams can run.
            We focus on two leader outcomes and build the systems behind them.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-14">
            <div className="bg-slate-50 border rounded-2xl p-10">
              <h3 className="text-2xl font-semibold text-emerald-700">
                ESG readiness
              </h3>
              <p className="mt-4 text-slate-600">
                Reporting systems with ownership, controls, and evidence trails aligned to leadership expectations.
                Coverage includes CSRD and ESRS, SEBI BRSR, UK climate reporting, GHG governance, and assurance readiness preparation.
              </p>
              <ul className="mt-5 text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>Scoping, readiness assessment, and disclosure mapping</li>
                <li>ESG data governance, validations, and evidence standards</li>
                <li>GHG methodology governance and repeatable workflows</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/services/esg-advisory" className="text-emerald-700 font-medium">
                  Explore ESG advisory →
                </Link>
                <Link href="/regulatory-hub" className="underline text-slate-700">
                  Regulatory hub
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-10">
              <h3 className="text-2xl font-semibold text-indigo-700">
                Revenue visibility
              </h3>
              <p className="mt-4 text-slate-600">
                Lifecycle definitions, CRM discipline, automation workflows, and measurement governance so leaders can trust dashboards.
                Works for B2B pipeline and renewals, and B2C retention and lifecycle performance.
              </p>
              <ul className="mt-5 text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>CRM architecture and governance across teams and tools</li>
                <li>Lifecycle orchestration, routing, SLAs, and operating cadence</li>
                <li>Revenue analytics, definitions governance, and executive dashboards</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/services/marketing-automation" className="text-indigo-700 font-medium">
                  Explore marketing automation →
                </Link>
                <Link
                  href="/services/marketing-automation/revenue-analytics"
                  className="underline text-slate-700"
                >
                  Revenue analytics
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 bg-white border rounded-2xl p-10 shadow-sm">
            <h3 className="text-xl font-semibold">Extended capabilities</h3>
            <p className="mt-3 text-slate-600 max-w-4xl">
              When needed, we support adjacent transformation work that strengthens delivery outcomes.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[
                ["AI and data strategy", "Use-case prioritisation, data architecture clarity, and governed AI adoption for measurable outcomes."],
                ["Growth operating model", "Commercial operating model discipline, performance governance, and execution cadence across teams."],
                ["Location intelligence", "Catchment analytics, retail network planning, and expansion decisions backed by data."],
              ].map(([t, d]) => (
                <div key={t} className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">{t}</div>
                  <div className="mt-2 text-sm text-slate-600">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY DS CONSULTING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Why {site.displayName}</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We built {site.displayName} to close the gap between expensive, slow consulting and boutique execution that lacks governance and architecture depth.
            We bring systems discipline, implementation capability, and AI-aware operating models.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              ["Strategy plus implementation", "Not just recommendations. We implement workflows, governance, documentation, and enablement."],
              ["Architecture depth", "We connect data, processes, and measurement across CRM, finance, service, and marketing systems."],
              ["AI with guardrails", "Faster content and insights with governance for quality, compliance, and measurable performance."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/about"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              About {site.displayName}
            </Link>
            <Link
              href="/contact"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we work</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We run transformation as a governed operating model build. This keeps delivery practical and repeatable.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              ["Diagnose", "Clarify scope, priorities, gaps, and risks across systems, data and governance."],
              ["Design", "Define operating model, owners, controls, workflows, and success metrics."],
              ["Implement", "Hands-on execution, enablement, documentation, and rollout support."],
              ["Govern", "Cadence, controls, measurement discipline, and continuous improvement."],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold">Insights</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                Practical guidance for leaders building ESG readiness and revenue visibility.
              </p>
            </div>
            <Link href="/insights" className="text-indigo-700 font-medium">
              View all insights →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              ["Marketing", "Governance for marketing automation", "How ownership, SLAs, and change control stabilise performance as journeys and tools grow.", "/insights"],
              ["ESG", "CSRD readiness fundamentals", "How to translate requirements into owners, workflows, evidence trails, and repeatable delivery.", "/insights"],
              ["Marketing", "Measurement leaders can trust", "Metric definitions and governance so dashboards match operating reality across teams.", "/insights"],
            ].map(([cat, t, d, href]) => (
              <Link
                key={t}
                href={href}
                className="bg-white border rounded-2xl p-7 shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs font-semibold text-slate-500">{cat}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {t}
                </div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
                <div className="mt-5 text-sm font-medium text-indigo-700">
                  Read →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <h2 className="text-3xl font-semibold">
          Ready to turn complexity into execution?
        </h2>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          If your priority is ESG readiness or revenue visibility, we can help you structure the operating model
          and implement the systems that teams can run.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium"
        >
          Book a consultation
        </Link>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}