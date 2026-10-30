import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceCarousel from "@/components/ServiceCarousel";
import { site } from "@/lib/site";
import { pillars } from "@/lib/service-pillars";
import { getLatestInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/page-metadata";

const homeMetadata = pageMetadata({
  title: "DS Consulting: independent technology, AI and ESG delivery",
  // Under 155 characters, or Google truncates it in results.
  // Fourth area (sourcing and market entry) added October 2026. Title and
  // description confirmed by the SEO project on 16 October 2026: "for
  // Mid-Market" stays out of the title to keep it under 60 characters.
  // AI stays deliberately: "ai governance consulting" is the highest value
  // term available and the homepage description is prose, not a label.
  // Brief 3, Task 6 (SEO project).
  description:
    "Close the gap between board strategy and system execution. Tech and AI, ESG systems, outsourced finance, market entry. Free 45-minute working session.",
  path: "/",
});

// Title set by the SEO brief of 30 October 2026 to compete on the branded
// query "ds consulting". It already starts with the firm name, so the
// helper's " | DS Consulting" suffix is dropped. Finance and sourcing are
// left out of the title deliberately (Tejas, 30 October 2026); they stay in
// the description and the Organization schema.
const HOME_TITLE = "DS Consulting: independent technology, AI and ESG delivery";
export const metadata: Metadata = {
  ...homeMetadata,
  title: { absolute: HOME_TITLE },
  openGraph: { ...homeMetadata.openGraph, title: HOME_TITLE },
  twitter: { ...homeMetadata.twitter, title: HOME_TITLE },
};


/*
  EVIDENCE. Verified 30 October 2026 under the recency rule in the
  migration-led positioning brief. Windows roll from the date of checking:
    Tier 1: published in the last 90 days
    Tier 2: 91 to 180 days
    Older:  kept only until something newer exists, then replaced

  ADAPTOVATE with Wakefield Research, The Execution Gap, 15 Sep 2026.
    Tier 1 until mid-December 2026. 300 C-suite executives, US and Canada
    only, companies with USD 10m+ revenue. ADAPTOVATE is a consultancy that
    sells the services its survey supports, so the source is always named.
  ServiceNow Enterprise AI Maturity Index 2026, India, 8 Sep 2026, with
    ThoughtLab. Tier 1 until early December 2026. 350 Indian respondents.
  Panorama Consulting, The 2026 ERP Report, 4 Mar 2026. OLDER THAN 180
    DAYS. Replace first when a newer ERP outcomes study appears. The 55%
    and 58% figures previously shown here could not be found in the report
    text and were removed. "More than a quarter" is stated in Panorama's
    own release.

  Removed: Gartner "more than 70%" (2025) and Everest Group (Mar 2026).
*/
const evidence = [
  {
    stat: "19%",
    claim: "have a company-wide plan to scale AI, though 78% say they know what needs to be done",
    source: "ADAPTOVATE with Wakefield Research, Sep 2026. US and Canadian executives",
  },
  {
    stat: "20%",
    claim: "say consultants' advice was implemented effectively, though 96% have hired consultants",
    source: "ADAPTOVATE with Wakefield Research, Sep 2026. US and Canadian executives",
  },
  {
    stat: "18%",
    claim: "of Indian organisations have replaced disconnected legacy systems with an integrated platform",
    source: "ServiceNow Enterprise AI Maturity Index, India, Sep 2026",
  },
  {
    stat: "More than 1 in 4",
    claim: "ERP projects went over budget, most often on technology nobody had scoped",
    source: "Panorama Consulting, 2026 ERP Report, Mar 2026",
  },
];

const sourcing = pillars.find((item) => item.route === "/services/sourcing-and-market-entry")!;

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
    // Company profile first. Add Crunchbase and Clutch here as each profile
    // goes live, with the same name, address and phone as the listing.
    sameAs: [site.linkedin.company, site.linkedin.tejas, site.linkedin.jigar],
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
          text: "Four things. We lead technology projects on your side of the table, across commerce platforms, ERP, CRM, integration and AI. Your implementation partner builds. We make sure what gets built is what the board approved, and that it gets finished. We lead the set-up of sustainability and ESG reporting systems. We provide outsourced finance and accounting teams. And we run sourcing and market entry between India and overseas manufacturers, from supplier qualification to buyer introductions.",
        },
      },
      {
        "@type": "Question",
        name: "Why do these sit in one firm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each one depends on the system underneath it. A sustainability disclosure is a data problem before it is a reporting problem. An outsourced finance team is only as good as the systems it works in. A sourcing channel is a pipeline before it is a relationship. And most technology projects are judged on numbers that come out of finance. Buying them from separate firms is what creates the handoffs where things get lost.",
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
          text: `Technology work starts with ${site.movePlan.session.toLowerCase()}, and you leave with a one-page plan of the move. If you go ahead, week 1 turns it into the full move plan and checks the strategy behind it. Week 1 is included if you continue, and a fixed fee ${site.movePlan.week1Fee.toLowerCase()} if you stop, and you keep the plan. Sustainability, finance and sourcing work starts with a fixed-price assessment.`,
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Closing the gap between board strategy and system execution"
        subtitle="We design and run the engine room for mid-market leaders: enterprise technology and AI integration, audit-ready ESG systems, outsourced finance operations, and sourcing channels between India and overseas manufacturers."
        painLine="High-level strategy often gets lost when translated into technical workflows and daily financial operations. We work right in the middle, so what the board approved is what actually gets built."
        leadLine="You have decided what to change. In one free working session we map what moves, in what order and what breaks if nobody plans for it."
        primaryAction={{ label: site.movePlan.label, href: "/contact" }}
        secondaryAction={{ label: "See what we do", href: "/services" }}
        imageSrc="/hero/home.jpg"
        imageAlt="DS Consulting, technology, sustainability, finance operations and sourcing"
      />

      {/* WHAT WE DO */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we do</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Four kinds of work, and they are less separate than they look. A sustainability
            disclosure is a data problem before it is a reporting problem. An outsourced finance
            team is only as good as the systems it works in. A sourcing channel is a pipeline
            before it is a relationship. And a technology project is judged on numbers that come
            out of finance.
          </p>

          <div className="mt-12">
            <ServiceCarousel />
          </div>

          {/*
            Direct route for overseas manufacturers arriving from sourcing
            outreach. The carousel reaches this area on slide four, which is
            too late for someone who clicked through from an email signature.
          */}
          <Link
            href={sourcing.route}
            className="group mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                For overseas manufacturers and Indian buyers
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{sourcing.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                We take overseas manufacturers to qualified Indian industrial buyers, and help
                Indian companies find and qualify overseas suppliers. Samples, qualification,
                tenders and the CRM that runs the channel.
              </p>
            </div>
            <div className="shrink-0 text-sm font-medium text-indigo-700 transition-transform duration-200 group-hover:translate-x-1">
              How we work →
            </div>
          </Link>

          {/* FORWARD DEPLOYED ENGINEER. Heading confirmed by the SEO
              project, 30 October 2026. */}
          <Link
            href="/services/forward-deployed-engineer"
            className="group mt-6 flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Without the full-time hire
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                Your forward deployed engineer for AI
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Your CTO has set the AI strategy. We embed with your functional teams, put the plan
                into practice and check the strategy as it lands, on retainer or per project.
              </p>
            </div>
            <div className="shrink-0 text-sm font-medium text-indigo-700 transition-transform duration-200 group-hover:translate-x-1">
              How it works →
            </div>
          </Link>

          {/* COMMON MOVES. SEO brief for Batches 3 and 4, 30 October 2026. */}
          <div className="mt-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Common moves
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                ["Outgrown Tally", "/migrations/tally-to-erp"],
                ["Changing CRM", "/migrations/crm"],
                ["A stalled move", "/migrations/implementation-recovery"],
                ["Data for AI", "/migrations/ai-ready-data"],
                ["Replatforming your store", "/migrations/ecommerce-migration"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/migrations"
                className="rounded-full px-4 py-2 text-sm font-medium text-indigo-700 hover:underline"
              >
                All moves →
              </Link>
            </div>
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
          {/* Panorama Consulting, The 2026 ERP Report, 4 Mar 2026: "almost a
              quarter" of organisations over schedule. Same source and expiry as
              the evidence block below. Replaced an unsourced "three in five on
              time, half on budget" line, 30 October 2026. */}
          <p className="mt-4 text-slate-300 max-w-3xl leading-relaxed">
            Most projects now finish on time. In Panorama Consulting&apos;s 2026 ERP Report,
            fewer than one in four ran over schedule. Delivery discipline is not the problem it
            was a decade ago.
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

      {/* HOW ENGAGEMENTS START. Technology offer, October 2026. */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                How engagements start
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 leading-tight">
                A free working session, then a plan you can act on
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                You have decided what to change. In one 45-minute working session we go through
                what you run today, what you are moving to and what usually breaks at that step.
                You leave with a one-page plan of the move, whoever runs it.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                If you want us to run it, week 1 turns that page into the full move plan and
                checks the strategy behind it. It is included if you go ahead. If you stop after
                week 1, you pay a fixed fee and keep the plan.
              </p>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                For sustainability, finance and sourcing work, we still start with a fixed-price
                assessment.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                {site.movePlan.label}
              </Link>
            </div>

            <div className="grid gap-5">
              {[
                ["45 minutes, free", "One working session with the person who would run the move"],
                ["A one-page move plan", "What moves, in what order and what breaks. Yours to keep"],
                ["Week 1, the full plan", "Data, cutover sequence and a check on the strategy behind it"],
                ["Fixed fee if you stop", `${site.movePlan.week1Fee}, agreed in writing before week 1 starts`],
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
            Bring us in before the move, not after it goes wrong
          </h2>
          <p className="mt-4 text-slate-300">
            Moving off Tally or spreadsheets, changing CRM, or part way through a move that has
            drifted and left two systems running. Any of those is a reasonable place to start.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium"
          >
            {site.movePlan.label}
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
