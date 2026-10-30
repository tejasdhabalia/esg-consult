import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

// Index for the move pages. Title, description and H1 from the SEO brief
// for Batches 3 and 4, 30 October 2026. Breadcrumb parent for every page
// under /migrations. Visible copy says "moves"; "migration" stays in the
// URL, title tag and meta description only.
export const metadata = pageMetadata({
  title: "Technology migration advisory",
  description:
    "Planning a move to a new ERP, CRM, data platform or store? Independent advice and a free 45-minute session that ends in a one-page move plan.",
  path: "/migrations",
});

const MOVES = [
  {
    href: "/migrations/tally-to-erp",
    name: "Outgrown Tally",
    body: "Books in Tally, operations in Excel and the two never agree. Choosing an ERP, then moving the masters, balances and spreadsheet processes without losing a month end.",
    link: "Plan the move off Tally",
  },
  {
    href: "/migrations/crm",
    name: "Changing CRM",
    body: "Switching CRMs or moving off spreadsheets. Agreeing what a qualified lead means first, so the new system does not inherit the old arguments.",
    link: "How we run a CRM switch",
  },
  {
    href: "/migrations/implementation-recovery",
    name: "A stalled move",
    body: "Two systems running, the move half finished and nobody trusting either number. Getting it finished and the old system switched off.",
    link: "Finishing a stalled move",
  },
  {
    href: "/migrations/ai-ready-data",
    name: "Data for AI",
    body: "The AI use cases are chosen, and the data they need is spread across systems that do not talk. Getting it ready before anything is built.",
    link: "Getting data ready for AI",
  },
  {
    href: "/migrations/ecommerce-migration",
    name: "Replatforming your store",
    body: "Moving to a new platform without losing orders, customer accounts, search rankings or the feeds to the warehouse and marketplaces.",
    link: "Moving your store",
  },
];

export default function MovesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Moves", item: absUrl("/migrations") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technology moves led on the client's side",
    description:
      "Independent advice and delivery leadership for moving to a new ERP, CRM, data platform or ecommerce platform.",
    url: absUrl("/migrations"),
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["IN", "GB", "US"].map((code) => ({ "@type": "Country", identifier: code })),
  };

  return (
    <div className="bg-white">
      <section className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Moves</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Moves we plan</h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl leading-relaxed">
            Most technology work at a mid-market company is a move from something it already runs.
            These are the five we see most. Each starts the same way: a free 45-minute working
            session that ends in a one-page plan of the move.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
          >
            {site.movePlan.label}
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {MOVES.map((move) => (
            <Link
              key={move.href}
              href={move.href}
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-slate-900">{move.name}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{move.body}</p>
              <div className="mt-5 text-sm font-medium text-indigo-700 transition-transform duration-200 group-hover:translate-x-1">
                {move.link} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-slate-900">Choosing the system comes first</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            If you have not yet chosen what you are moving to, start with{" "}
            <Link href="/services/erp-systems" className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900">
              ERP selection
            </Link>
            ,{" "}
            <Link href="/services/crm-and-revenue-operations" className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900">
              CRM and revenue operations
            </Link>{" "}
            or{" "}
            <Link href="/services/commerce-and-digital-platforms" className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900">
              commerce platform selection
            </Link>
            . We lead the move on your side either way, and we are paid only by you.
          </p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </div>
  );
}
