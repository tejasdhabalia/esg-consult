import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceCarousel from "@/components/ServiceCarousel";
import { site } from "@/lib/site";
import { pillars } from "@/lib/service-pillars";
import { getLatestInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Tech & AI, Sustainability & Finance for Mid-Market",
  description:
    "Close the gap between board strategy and system execution. Technology and AI, audit-ready ESG systems, and outsourced finance operations for mid-market firms.",
  path: "/",
});

/**
 * VERIFY BEFORE PUBLISHING.
 * Gartner and Panorama figures still need publication years added.
 * The Everest Group figure carries its year and is publishable as written.
 */
const evidence = [
  {
    stat: "More than 70%",
    claim: "of recently implemented ERP initiatives will fall short of their original business goals",
    source: "Gartner forecast to 2027",
  },
  {
    stat: "55%",
    claim: "of over-budget projects needed technology nobody had scoped for",
    source: "Panorama Consulting, 2026 ERP Report",
  },
  {
    stat: "58%",
    claim: "of late projects blame organisational issues, ahead of technical ones",
    source: "Panorama Consulting, 2026 ERP Report",
  },
  {
    stat: "15%",
    claim: "of mid-market firms have AI genuinely operationalised",
    source: "Everest Group, 2026",
  },
];

export default function HomePage() {
  const latestInsights = getLatestInsights(3);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    url: site.baseUrl,
    description: site.ai.summary,
    founder: [
      { "@type": "Person", name: "Jigar Dhabalia", sameAs: site.linkedin.jigar },
      { "@type": "Person", name: "Tejas Dhabalia", sameAs: site.linkedin.tejas },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "DS Consulting Services",
      itemListElement: pillars.map((pillar) => ({
        "@type": "OfferCatalog",
        name: pillar.title,
        itemListElement: pillar.lines.map((line) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: line.label,
            description: line.summary,
            url: `${site.baseUrl}${line.route}`,
          },
        })),
      })),
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
          text: "Three things for mid-market companies. We build and fix the business systems they run on, covering commerce platforms, ERP, CRM, integration and AI. We build sustainability and ESG reporting systems. And we provide outsourced finance and accounting teams.",
        },
      },
      {
        "@type": "Question",
        name: "Why do you do all three?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "They meet in the finance function. A sustainability disclosure is a data problem before it is a reporting problem. An outsourced finance team is only as good as the systems it works in. And most technology projects are judged on numbers that come out of finance. Buying them from three firms is what creates the handoffs where things get lost.",
        },
      },
      {
        "@type": "Question",
        name: "What makes you different from a systems integrator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depth on both sides. We have built these systems, so we can tell a configuration from a customisation and design an interface that survives contact with real data. We also read a business case, a close calendar and a board pack, so we can tell which requirement is load bearing and which is a preference.",
        },
      },
      {
        "@type": "Question",
        name: "How are you paid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By the client. We take no commissions, referral fees, reseller margin or partner incentives from any software vendor. We still recommend software, and you get the scoring behind the recommendation rather than only the conclusion.",
        },
      },
      {
        "@type": "Question",
        name: "How do engagements start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With an assessment. Two to four weeks at a fixed price, delivered as a decision document rather than a proposal. You own the output whether or not you continue with us.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Closing the gap between board strategy and system execution"
        subtitle="We design and run the engine room for mid-market leaders: enterprise technology and AI integration, audit-ready ESG systems, and high-performing outsourced finance operations."
        painLine="High-level strategy often gets lost when translated into technical workflows and daily financial operations. We work right in the middle, so what the board approved is what actually gets built."
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "See what we do", href: "/services" }}
        imageSrc="/hero/home.jpg"
        imageAlt="DS Consulting, technology, sustainability and finance operations"
      />

      {/* WHAT WE DO */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we do</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Three kinds of work, and they are less separate than they look. A sustainability
            disclosure is a data problem before it is a reporting problem. An outsourced finance
            team is only as good as the systems it works in. And a technology project is judged
            on numbers that come out of finance.
          </p>

          <div className="mt-12">
            <ServiceCarousel />
          </div>
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">
            The gap between the board decision and the built system
          </h2>
          <p className="mt-5 text-slate-300 max-w-3xl leading-relaxed">
            A board approves a business case. Eighteen months later a system goes live that does
            something adjacent to it. Nobody lied along the way. The requirements were written by
            people who would not use the system, the scope moved in change requests nobody read
            end to end, and the team that sold the project was not the team that built it.
          </p>
		            <p className="mt-4 text-slate-300 max-w-3xl leading-relaxed">
            Most projects now land close to plan. Around three in five finish on time and half
            come in on budget. Delivery discipline is not the problem it was a decade ago.
          </p>
          <p className="mt-8 max-w-3xl border-l-4 border-indigo-400 pl-6 text-xl md:text-2xl font-semibold leading-snug text-white">
            A project can hit every date and still not produce what the board approved.
          </p>
          <p className="mt-4 text-slate-300 max-w-3xl leading-relaxed">
            That gap is where we work. Not the software, the distance between the decision and
            the delivery.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {evidence.map((item) => (
              <div
                key={item.claim}
                className="rounded-2xl border border-slate-700 bg-slate-800/40 p-7"
              >
                <div className="text-3xl font-bold text-indigo-300">{item.stat}</div>
                <div className="mt-3 text-sm text-slate-300 leading-snug">{item.claim}</div>
                <div className="mt-4 text-xs text-slate-500">{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPTH */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">
            Two kinds of depth, in the same room
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Strategy firms write requirements they could not build. Implementation firms build
            exactly what the requirements said, including the parts that made no commercial
            sense. Both are doing their job. The problem is the space between them.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {site.positioning.depth.map((item) => (
              <div key={item.title} className="bg-slate-50 border rounded-2xl p-8">
                <div className="h-1 w-10 rounded-full bg-indigo-600" />
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE ARE PAID */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we are paid</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Worth stating plainly, because it is not the norm in this market and it changes what
            a recommendation from us is worth.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {site.positioning.independenceProof.map((point) => (
              <div key={point} className="bg-white border rounded-2xl p-8">
                <p className="text-slate-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border-2 border-slate-900 bg-white p-10">
            <h3 className="text-2xl font-semibold text-slate-900">What we do not do</h3>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Every item on this list is a revenue line that would give us a reason to recommend
              one thing over another. That is why we do not carry them.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {site.positioning.doesNotDo.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                How engagements start
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 leading-tight">
                An assessment, not a proposal
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Two to four weeks at a fixed price. We look at what you are trying to do, what
                you already run and where the two do not meet. You get a decision document you
                can take to the board.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                It is a piece of work with its own price, not a sales exercise dressed as one.
                You own the output whether or not you carry on with us.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                {site.assessment.label}
              </Link>
            </div>

            <div className="grid gap-5">
              {[
                ["Two to four weeks", "Long enough to see the problem, short enough to act on it"],
                ["Fixed price", "Agreed before we start, no time and materials creep"],
                ["A decision document", "What to do, what it costs, what happens if you do nothing"],
                ["Yours to keep", "Including the scoring, whoever you go on to work with"],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="font-semibold text-slate-900">{label}</div>
                  <div className="mt-2 text-sm text-slate-600 leading-snug">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Insights</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                A position on how these projects should run is only worth something if it is
                written down. This is ours.
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
            {latestInsights.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-1.5 w-full bg-indigo-500" />
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      {item.readTime} · Updated {item.updated}
                    </div>
                    <div className="text-sm font-medium text-indigo-700 transition-transform duration-200 group-hover:translate-x-1">
                      Read →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Bring us in before the decision, not after it goes wrong
          </h2>
          <p className="mt-4 text-slate-300">
            Selecting a system, part way through an implementation that has drifted, or trying to
            work out why two systems still do not talk to each other. Any of those is a
            reasonable place to start.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium"
          >
            {site.assessment.label}
          </Link>
        </div>
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
