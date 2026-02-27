import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `About | ${site.legalName}`,
  description:
    "Why DS Consulting exists and how we deliver. Scalable transformation partner for ESG readiness and revenue visibility through advisory plus implementation.",
  alternates: { canonical: absUrl("/about") },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "About", item: absUrl("/about") },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
    sameAs: [site.linkedin.tejas, site.linkedin.jigar],
  };

  const foundersSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tejas Dhabalia",
      jobTitle: "Co-founder and Principal Consultant",
      sameAs: [site.linkedin.tejas],
      worksFor: { "@type": "Organization", name: site.legalName },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jigar Dhabalia",
      jobTitle: "Co-founder and Principal Consultant",
      sameAs: [site.linkedin.jigar],
      worksFor: { "@type": "Organization", name: site.legalName },
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Why did ${site.displayName} start?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We started to close the gap between expensive, slow consulting and boutique execution that lacks governance and architecture depth. Tool sprawl across CRM, finance and service creates fragmented execution. AI increases expectations and risk. We help teams build governed systems with measurable outcomes.",
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
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not provide statutory audit or assurance. We prepare organisations for assurance through governance, controls, documentation and evidence trail readiness.",
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
    ],
  };

  return (
    <div>
      <PageHero
        title="Why we exist"
        subtitle="We built DS Consulting to help leaders turn fragmented tools and complex requirements into governed systems with measurable delivery. Advisory plus implementation across ESG readiness and revenue visibility."
        primaryAction={{ label: "Talk to us", href: "/contact" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/about.jpg"
        imageAlt="Leadership and consulting collaboration"
      />

      {/* WHY */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">The gap we saw</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Big consulting can be expensive and slow. Boutique agencies can execute, but often lack governance and architecture depth.
            Tool sprawl across CRM, finance, service and contact centre signals creates fragmented execution.
            AI increases expectations and risk for quality, compliance, and differentiation.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              ["Governance, not just delivery", "Ownership, controls and cadence so work sustains beyond go-live."],
              ["Systems architecture depth", "Data, workflows and measurement connected across teams and tools."],
              ["AI with guardrails", "Speed and insight with governance to protect brand and stakeholder expectations."],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-2 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SANSKRIT */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white border rounded-2xl p-10">
            <div className="text-sm font-semibold text-slate-500">Our principle</div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">
              योगः कर्मसु कौशलम्
            </div>
            <div className="mt-2 text-slate-600">
              <span className="font-semibold">Transliteration:</span> Yogaḥ karmasu kauśalam
            </div>
            <div className="mt-1 text-slate-600">
              <span className="font-semibold">Meaning:</span> Excellence in execution
            </div>
            <div className="mt-5 text-slate-600 max-w-4xl">
              Strategy becomes real only when systems, governance, and teams can execute consistently.
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE FOCUS ON */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we focus on</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Our work is designed around two outcomes leaders consistently demand: ESG readiness and revenue visibility.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="text-xl font-semibold text-emerald-700">ESG readiness</div>
              <p className="mt-3 text-sm text-slate-600">
                Reporting systems, data governance, controls and evidence trails that stand up to leadership review.
              </p>
              <div className="mt-5 flex gap-4 text-sm">
                <Link className="text-emerald-700 font-medium" href="/services/esg-advisory">
                  ESG advisory →
                </Link>
                <Link className="underline text-slate-700" href="/regulatory-hub">
                  Regulatory hub
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="text-xl font-semibold text-indigo-700">Revenue visibility</div>
              <p className="mt-3 text-sm text-slate-600">
                Lifecycle, CRM governance, automation workflows, and measurement discipline so leaders can trust dashboards.
              </p>
              <div className="mt-5 flex gap-4 text-sm">
                <Link className="text-indigo-700 font-medium" href="/services/marketing-automation">
                  Marketing automation →
                </Link>
                <Link className="underline text-slate-700" href="/services/marketing-automation/revenue-analytics">
                  Revenue analytics
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-slate-600">
            Note: We do not provide statutory audit or assurance. We prepare clients for assurance through controls, documentation and evidence trail readiness.
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Leadership</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            DS Consulting is led by practitioners who combine consulting rigour with operator-level execution.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {/* Tejas */}
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/tejas.jpg"
                  alt="Tejas Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="text-xl font-semibold text-slate-900">Tejas Dhabalia</div>
                  <div className="text-sm text-slate-600">Co-founder and Principal Consultant</div>
                  <div className="mt-3 text-sm text-slate-600">
                    Marketing Ops and MarTech leader with experience across Deloitte, Tata, Tesco, and Godrej.
                    Focused on marketing automation, AI architecture, retail analytics, and lead management.
                  </div>

                  <ul className="mt-4 text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Standardised omnichannel operating process across 25 markets</li>
                    <li>Reduced campaign delivery cost by simplifying journey complexity</li>
                    <li>Built conversion-led execution systems across B2B and B2C environments</li>
                  </ul>

                  <div className="mt-5">
                    <a
                      href={site.linkedin.tejas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Jigar */}
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/jigar.jpg"
                  alt="Jigar Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="text-xl font-semibold text-slate-900">Jigar Dhabalia</div>
                  <div className="text-sm text-slate-600">Co-founder and Principal Consultant</div>
                  <div className="mt-3 text-sm text-slate-600">
                    Specialises in ESG readiness and RevOps governance. Works with leadership teams to build reporting capability,
                    operating cadence, and measurable control systems.
                    Industry exposure includes B2B, manufacturing, and oil and gas.
                  </div>

                  <ul className="mt-4 text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Governance and control design for repeatable reporting</li>
                    <li>Bridges ESG requirements with operating systems and ownership</li>
                    <li>Supports leadership visibility through disciplined measurement models</li>
                  </ul>

                  <div className="mt-5">
                    <a
                      href={site.linkedin.jigar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/services" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Explore services
            </Link>
            <Link href="/insights" className="border px-6 py-3 rounded-lg font-medium text-center">
              Read insights
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <div className="mt-10 grid gap-6">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-slate-50 border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">{q.name}</summary>
                <div className="mt-3 text-sm text-slate-600">{q.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}