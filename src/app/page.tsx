import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { getLatestInsights } from "@/lib/insights";

export const metadata = {
  title: "ESG Readiness & Revenue Visibility Consulting | DS Consulting",
  description:
    "DS Consulting helps CFOs, CSOs and CMOs build governed ESG reporting systems and revenue visibility. Advisory plus implementation for CSRD, BRSR, UK SECR and SRS, CRM governance and marketing automation.",
  alternates: { canonical: absUrl("/") },
};

export default function HomePage() {
  const latestInsights = getLatestInsights(3);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    url: site.baseUrl,
    description:
      "ESG readiness and Revenue Visibility consulting through advisory plus implementation. Specialists in CSRD, SEBI BRSR, UK SECR and SRS reporting, CRM governance, and marketing automation.",
    founder: [
      { "@type": "Person", name: "Jigar Dhabalia", sameAs: site.linkedin.jigar },
      { "@type": "Person", name: "Tejas Dhabalia", sameAs: site.linkedin.tejas },
    ],
    knowsAbout: [
      "ESG Advisory",
      "CSRD Compliance",
      "SEBI BRSR Reporting",
      "UK SECR and SRS Reporting",
      "CRM Governance",
      "Marketing Automation",
      "Revenue Analytics",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "DS Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ESG Advisory",
            description:
              "CSRD readiness, SEBI BRSR compliance, UK SECR and SRS reporting, and sustainability governance.",
            url: `${site.baseUrl}/services/esg-advisory`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marketing Automation and CRM Governance",
            description:
              "CRM architecture, lifecycle lead management, revenue analytics, and marketing operations.",
            url: `${site.baseUrl}/services/marketing-automation`,
          },
        },
      ],
    },
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
          text: "DS Consulting supports leaders with ESG readiness and Revenue Visibility through advisory plus implementation. We build governed systems across ESG reporting, marketing automation, CRM governance, and measurement discipline.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide advisory only or advisory plus implementation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide advisory plus implementation. We define the operating model, implement workflows and governance, enable teams, and set a cadence that sustains outcomes after go-live.",
        },
      },
      {
        "@type": "Question",
        name: "Who do you typically work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We work with CEOs, CFOs, CMOs, CROs, and Chief Sustainability Officers. We support both B2B and B2C organisations across multi-team, multi-tool environments.",
        },
      },
      {
        "@type": "Question",
        name: "What outcomes do you prioritise most strongly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Two outcomes are prioritised most strongly: ESG readiness and Revenue Visibility. ESG readiness means defensible reporting systems with governance, controls and evidence trails. Revenue Visibility means lifecycle definitions, CRM discipline, and dashboards leaders can trust.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not provide statutory audit or assurance. We prepare organisations for assurance by improving governance, controls, documentation and evidence trails.",
        },
      },
      {
        "@type": "Question",
        name: "How do we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most engagements start with a diagnostic to clarify scope, priorities, data and governance gaps. We then propose a phased plan across design, implementation and governance with measurable success metrics.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Scalable transformation for ESG readiness and Revenue Visibility"
        subtitle="DS Consulting helps leadership teams turn fragmented tools and requirements into governed systems with measurable execution. Advisory plus implementation across ESG reporting systems, marketing automation, CRM governance, and AI-enabled operating models."
        painLine="Most leadership teams are making decisions on data they do not fully trust, and are facing regulatory demands they are not ready for. We fix both."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Explore services", href: "/services" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/home.jpg"
        imageAlt="DS Consulting: ESG readiness and revenue visibility consulting for CFOs, CSOs and CMOs"
      />

      <section className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-6">
            Founded by practitioners from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              "UN Global Compact Network",
              "Deloitte",
              "Tata",
              "Tesco",
              "Godrej",
              "Reliance Industries",
              "Lenzing Group",
              "Workdry International",
            ].map((brand) => (
              <span
                key={brand}
                className="text-slate-500 font-semibold text-sm md:text-base tracking-tight"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we help you deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Most organisations do not need more tools. They need clarity, governance, and an
            operating model that teams can run. We focus on two leader outcomes and build the
            systems behind them.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-14">
            <div className="bg-slate-50 border rounded-2xl p-10">
              <h3 className="text-2xl font-semibold text-emerald-700">ESG readiness</h3>
              <p className="mt-4 text-slate-600">
                Reporting systems with ownership, controls, and evidence trails aligned to
                leadership expectations. Coverage includes CSRD and ESRS, SEBI BRSR, UK
                SECR and SRS reporting, GHG governance, and assurance readiness preparation.
              </p>
              <ul className="mt-5 text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>Scoping, readiness assessment, and disclosure mapping</li>
                <li>ESG data governance, validations, and evidence standards</li>
                <li>GHG methodology governance and repeatable workflows</li>
                <li>
                  Carbon accounting: Scope 1, 2 and 3 inventory, net zero roadmaps, and
                  SBTi-aligned targets
                </li>
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
              <h3 className="text-2xl font-semibold text-indigo-700">Revenue Visibility</h3>
              <p className="mt-4 text-slate-600">
                Lifecycle definitions, CRM discipline, automation workflows, and measurement
                governance so leaders can trust dashboards. Works for B2B pipeline and
                renewals, and B2C retention and lifecycle performance.
              </p>
              <ul className="mt-5 text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>CRM architecture and governance across teams and tools</li>
                <li>Lifecycle orchestration, routing, SLAs, and operating cadence</li>
                <li>Revenue analytics, definitions governance, and executive dashboards</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services/marketing-automation"
                  className="text-indigo-700 font-medium"
                >
                  Explore Marketing Automation →
                </Link>
                <Link
                  href="/services/marketing-automation/revenue-analytics"
                  className="underline text-slate-700"
                >
                  Revenue Analytics
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 bg-white border rounded-2xl p-10 shadow-sm">
            <h3 className="text-xl font-semibold">Extended capabilities</h3>
            <p className="mt-3 text-slate-600 max-w-4xl">
              When needed, we support adjacent transformation work that strengthens delivery
              outcomes.
            </p>
            <div className="grid md:grid-cols-4 gap-8 mt-8">
              {[
                [
                  "AI and data strategy",
                  "Use-case prioritisation, data architecture clarity, and governed AI adoption for measurable outcomes.",
                ],
                [
                  "Growth operating model",
                  "Commercial operating model discipline, performance governance, and execution cadence across teams.",
                ],
                [
                  "Location intelligence",
                  "Catchment analytics and retail network planning built on direct market mapping. We have assessed over 75 geographies across India for location viability, store size, and category assortment fit.",
                ],
                [
                  "AI marketing on existing infrastructure",
                  "AI-powered marketing built on your existing data, whether that data lives in IBM infrastructure, HubSpot, Salesforce, or all three simultaneously. Built for regulated enterprises where compliance and governance are not optional.",
                ],
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

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Right for you if…</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-14">
            We work best with leadership teams who need systems that run, not just slide
            decks that sit on a shelf.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-900/40 border border-emerald-700/40 rounded-2xl p-8">
              <div className="text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-4">
                ESG Track
              </div>
              <p className="text-slate-200 leading-relaxed">
                Whether you are a <strong className="text-white">CFO</strong> navigating financial
                reporting or a <strong className="text-white">CSO</strong> driving sustainability
                strategy, meeting CSRD, SEBI BRSR, or UK SECR and SRS mandates requires more than just
                data. It requires precision.
              </p>
              <p className="text-slate-200 leading-relaxed mt-4">
                From initial materiality assessments to board-ready disclosures, and from supply
                chain risk to social value, we provide the expertise and structural rigor to
                transform your ESG ambition into a verifiable, audit-grade narrative that commands
                stakeholder trust.
              </p>
              <Link
                href="/services/esg-advisory"
                className="mt-6 inline-block text-emerald-400 font-medium text-sm hover:text-emerald-300"
              >
                Explore ESG Advisory →
              </Link>
            </div>
            <div className="bg-indigo-900/40 border border-indigo-700/40 rounded-2xl p-8">
              <div className="text-indigo-400 font-semibold text-sm uppercase tracking-wide mb-4">
                Revenue Track
              </div>
              <p className="text-slate-200 leading-relaxed">
                You are a <strong className="text-white">CMO, CRO or RevOps leader</strong> whose
                dashboards do not reflect operating reality, and whose board has stopped trusting
                the pipeline numbers. You need lifecycle definitions, CRM discipline, and
                measurement governance that holds up under scrutiny.
              </p>
              <Link
                href="/services/marketing-automation"
                className="mt-6 inline-block text-indigo-400 font-medium text-sm hover:text-indigo-300"
              >
                Explore Revenue Visibility →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Why {site.displayName}</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We built {site.displayName} to close the gap between expensive, slow consulting
            and boutique execution that lacks governance and architecture depth. We bring
            systems discipline, implementation capability, and AI-aware operating models.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              [
                "Strategy plus implementation",
                "Not just recommendations. We implement workflows, governance, documentation, and enablement.",
              ],
              [
                "Architecture depth",
                "We connect data, processes, and measurement across CRM, finance, service, and marketing systems.",
              ],
              [
                "AI with guardrails",
                "Faster content and insights with governance for quality, compliance, and measurable performance.",
              ],
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

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we work</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We run transformation as a governed operating model build. This keeps delivery
            practical and repeatable.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              [
                "Diagnose",
                "Clarify scope, priorities, gaps, and risks across systems, data and governance.",
              ],
              [
                "Design",
                "Define operating model, owners, controls, workflows, and success metrics.",
              ],
              [
                "Implement",
                "Hands-on execution, enablement, documentation, and rollout support.",
              ],
              [
                "Govern",
                "Cadence, controls, measurement discipline, and continuous improvement.",
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

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What execution looks like</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Outcomes we have delivered for leadership teams across ESG and revenue
            transformation engagements.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white border-l-4 border-emerald-500 rounded-r-2xl p-8 shadow-sm">
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">
                ESG Readiness · B2B Manufacturing
              </div>
              <p className="text-slate-700 leading-relaxed">
                A B2B manufacturer reduced their <strong>EcoVadis</strong> readiness gap from{" "}
                <strong>18 months to 6 months</strong>, with governed data collection model,
                policies design and implementation, evidence trail, and repeatable workflow
                implemented across Operation, HR and Procurement teams.
              </p>
            </div>
            <div className="bg-white border-l-4 border-indigo-500 rounded-r-2xl p-8 shadow-sm">
              <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-3">
                Revenue Visibility · B2C Retail
              </div>
              <p className="text-slate-700 leading-relaxed">
                A premium food and lifestyle retailer achieved double-digit sales growth by
                consolidating fragmented channel data across physical stores, digital, and phone
                into a governed measurement model, giving leadership the confidence to allocate
                budget and resource without relying on conflicting reports from each channel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                Latest thinking
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Insights</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                Practical guidance for leaders building ESG readiness and Revenue Visibility.
              </p>
            </div>

            <Link
              href="/insights"
              className="inline-flex items-center text-indigo-700 font-medium hover:text-indigo-800"
            >
              View all insights <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {latestInsights.map((item, index) => {
              const isESG = item.category === "ESG";

              return (
                <Link
                  key={item.slug}
                  href={`/insights/${item.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`h-1.5 w-full ${isESG ? "bg-emerald-500" : "bg-indigo-500"}`}
                  />

                  <div className="p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          isESG
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-indigo-50 text-indigo-700"
                        }`}
                      >
                        {item.category}
                      </span>

                      {index === 0 ? (
                        <span className="text-[11px] font-medium text-slate-500">Latest</span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-slate-900 leading-snug group-hover:text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div className="text-xs text-slate-500">
                        {item.readTime} · Updated {item.updated}
                      </div>

                      <div
                        className={`text-sm font-medium transition-transform duration-200 group-hover:translate-x-1 ${
                          isESG ? "text-emerald-700" : "text-indigo-700"
                        }`}
                      >
                        Read →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
		  <div className="max-w-6xl mx-auto px-6">
			<div className="grid md:grid-cols-2 gap-16 items-center">
			  <div>
				<p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
				  Strategic partnership program
				</p>
				<h2 className="text-3xl font-semibold text-slate-900 leading-tight">
				  Extended finance capacity through a strategic partnership
				</h2>
				<p className="mt-5 text-slate-600 leading-relaxed">
				  When clients need more finance capacity than our core advisory work provides, we can
				  support a partner-led model around dedicated India-based finance teams. The offer is easy
				  to position because it maps to familiar finance problems, clear process value streams, and
				  a visible go-live path.
				</p>
				<p className="mt-4 text-slate-600 leading-relaxed">
				  The model covers end-to-end transactional finance work across Procure-to-Pay, Order-to-Cash,
				  and Record-to-Report, then extends into close support, control, and planning. It is built
				  for scaling corporates and typically starts as a 10+ seat design, not a one-role patch.
				</p>
				<div className="mt-8 flex flex-wrap gap-4">
				  <Link
					href="/partners/strategic-finance-partnership"
					className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
				  >
					Explore the strategic finance partnership program
				  </Link>
				  <Link
					href="/partners/strategic-finance-partnership#partnership-program"
					className="border border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium text-center text-slate-700"
				  >
					View partnership program
				  </Link>
				</div>
			  </div>

			  <div className="grid grid-cols-2 gap-5">
				{[
				  {
					stat: "100 to 1,000+",
					label: "Typical target company employee range",
					color: "text-indigo-700",
				  },
				  {
					stat: "8 to 12 weeks",
					label: "Typical onboarding and go-live path",
					color: "text-indigo-700",
				  },
				  {
					stat: "P2P·O2C·R2R",
					label: "Process coverage across the finance function",
					color: "text-slate-900",
				  },
				  {
					stat: "10+ seats",
					label: "Typical starting team design",
					color: "text-slate-900",
				  },
				].map((item) => (
				  <div
					key={item.label}
					className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
				  >
					<div className={`text-3xl font-bold ${item.color}`}>{item.stat}</div>
					<div className="mt-2 text-sm text-slate-600 leading-snug">{item.label}</div>
				  </div>
				))}

				<div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
				  <div className="font-semibold text-slate-800">
					Dedicated India finance capacity for scaling corporates
				  </div>
				  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
					Structured across 14 role profiles and organized by transaction, execution, and
					strategic layers. Built for companies dealing with close pressure, AP and AR growth,
					reporting complexity, ERP change, or broader India expansion.
				  </p>
				  <Link
					href="/partners/strategic-finance-partnership#partnership-program"
					className="mt-3 inline-block text-indigo-700 text-sm font-medium hover:text-indigo-800"
				  >
					View partnership program →
				  </Link>
				</div>
			  </div>
			</div>
		  </div>
	  </section>
      <section className="bg-slate-900 text-white py-20 text-center">
        <h2 className="text-3xl font-semibold">Ready to turn complexity into execution?</h2>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          If your priority is ESG readiness or Revenue Visibility, we can help you structure
          the operating model and implement the systems that teams can run.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium"
        >
          Book a consultation
        </Link>
      </section>

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