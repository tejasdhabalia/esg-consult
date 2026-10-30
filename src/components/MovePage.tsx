import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

/**
 * Shared layout for the move pages under /migrations. SEO brief for
 * Batches 3 and 4, 30 October 2026.
 *
 * Pattern, in order: the situation in the buyer's words, what breaks, how
 * we run the move, week 1, the button.
 *
 * Copy rules for every page built on this:
 * - Visible copy says move, switch or upgrade. "Migration" appears only in
 *   the URL, the title tag and the meta description.
 * - Never "tally migration" anywhere. People search it for upgrading Tally.
 * - No infrastructure language (server, cloud or data centre moves).
 * - Executor voice: we lead the move on the client's side. We do not build
 *   the client's software, except storefronts and interfaces, with the
 *   disclosure on the commerce and integration pages.
 * - The breadcrumb shows "Moves", not "Migrations", agreed 30 October 2026.
 */

export type MoveBreak = { title: string; detail: string };

export type MoveLink = {
  before: string;
  anchor: string;
  href: string;
  after: string;
};

export type MovePageProps = {
  route: string;
  /** Last breadcrumb item, short. */
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  /** Situation in the buyer's words. The first paragraph doubles as the hero subtitle. */
  situation: string[];
  breaksHeading: string;
  breaks: MoveBreak[];
  stepsHeading: string;
  steps: string[];
  /** Links to the matching service page and related pages. Vary the anchor text. */
  links: MoveLink[];
  /** Show the week 1 fee. India-facing pages only (Tally). */
  showPrice?: boolean;
  /** ISO 3166-1 alpha-2 codes, as in the SEO brief's Batch 4 table. */
  areaServed: string[];
  serviceName: string;
  serviceDescription: string;
  /**
   * The 20-second segment video, once rendered. Leave undefined until the
   * file exists in /public: the slot is hidden while it is empty.
   */
  videoSrc?: string;
};

export default function MovePage(props: MovePageProps) {
  const {
    route,
    breadcrumbLabel,
    eyebrow,
    h1,
    situation,
    breaksHeading,
    breaks,
    stepsHeading,
    steps,
    links,
    showPrice = false,
    areaServed,
    serviceName,
    serviceDescription,
    videoSrc,
  } = props;

  const [lead, ...restSituation] = situation;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1,
    url: absUrl(route),
    isPartOf: { "@type": "WebSite", name: site.legalName, url: site.baseUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Moves", item: absUrl("/migrations") },
      { "@type": "ListItem", position: 3, name: breadcrumbLabel, item: absUrl(route) },
    ],
  };

  // Offer only when the price is in the visible copy (SEO brief).
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    url: absUrl(route),
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: areaServed.map((code) => ({ "@type": "Country", identifier: code })),
    ...(showPrice
      ? {
          offers: {
            "@type": "Offer",
            name: "Week 1: the full move plan and a strategy check",
            priceSpecification: {
              "@type": "PriceSpecification",
              // Read from the one fee setting in site.ts, so a fee change
              // there updates the schema too.
              minPrice: Number(site.movePlan.week1Fee.replace(/[^0-9]/g, "")),
              priceCurrency: "INR",
            },
          },
        }
      : {}),
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/migrations" className="hover:text-white">Moves</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{breadcrumbLabel}</span>
          </nav>
          <div className="text-xs font-semibold uppercase tracking-widest text-indigo-300">{eyebrow}</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">{h1}</h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl leading-relaxed">{lead}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium text-center"
            >
              {site.movePlan.label}
            </Link>
            <a
              href="#how-we-run-it"
              className="border border-white hover:bg-white/10 px-6 py-3 rounded-lg text-center"
            >
              How we run the move
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO: hidden until the segment video is rendered and added. */}
      {videoSrc && (
        <section className="bg-slate-900 px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <video
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-2xl border border-slate-700"
            />
          </div>
        </section>
      )}

      {/* SITUATION */}
      {restSituation.length > 0 && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            {restSituation.map((paragraph) => (
              <p key={paragraph} className="text-lg text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* WHAT BREAKS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900 max-w-3xl">{breaksHeading}</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {breaks.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE RUN THE MOVE */}
      <section id="how-we-run-it" className="py-20 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900">{stepsHeading}</h2>
          <ol className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-slate-700 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 space-y-3">
            {links.map((link) => (
              <p key={link.href} className="text-slate-600 leading-relaxed">
                {link.before}{" "}
                <Link href={link.href} className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900">
                  {link.anchor}
                </Link>
                {link.after}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* WEEK 1 */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold">Start with a free working session</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              {site.movePlan.session}, and you leave with a one-page plan of the move, whoever
              runs it. If you want us to run it, week 1 turns that page into the full move plan
              and checks the strategy behind it.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
            >
              {site.movePlan.label}
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8">
            <div className="font-semibold">Week 1: the full move plan and a strategy check</div>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Included if you go ahead. If you stop after week 1, you pay a fixed fee
              {showPrice ? ` ${site.movePlan.week1Fee.toLowerCase()}` : ""}, agreed in writing
              before it starts, and you keep the plan.
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </div>
  );
}
