import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";

/*
  Brief 4, SEO project, 21 November 2026. Moved from /industries/retail-and-d2c,
  which now redirects here (301).

  Decisions by Tejas, 21 November 2026:
  - Existing copy reused; only the structure changed.
  - The "Where this comes from" section stays, unchanged.
  - Bylined to Tejas.

  Title tag: the brief's "One SKU, four inventory numbers: retail and D2C" is
  63 characters with the " | DS Consulting" suffix, over the 60 limit, so the
  H1 is used as the title. SEO project told.

  Task 3 FAQ ("Which system should own the inventory number?") is waiting
  for Tejas's answer. Add it to FAQS below when it arrives; the FAQPage
  schema picks it up automatically.
*/
export const metadata = pageMetadata({
  title: "One SKU, four inventory numbers",
  description:
    "Your website, marketplace, warehouse and store each show a different stock number. Why multichannel inventory breaks, and where the margin goes.",
  path: "/insights/one-sku-four-inventory-numbers",
  ogImage: "/og/multichannel-inventory-four-numbers.webp",
  type: "article",
});

const PATH = "/insights/one-sku-four-inventory-numbers";
const H1 = "One SKU, four inventory numbers";
const PUBLISHED_ISO = "2026-11-21";
const PUBLISHED_DISPLAY = "21 November 2026";
const IMAGE_ALT =
  "One product showing four different stock numbers across website, marketplace, warehouse and store, a common multichannel inventory problem";
const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";

const STACK: [string, string][] = [
  ["Storefront and commerce", "Shopify and Shopify Plus, Adobe Commerce, WooCommerce, BigCommerce"],
  ["Order and channel management", "Unicommerce, EasyEcom, Vinculum, Browntape"],
  ["Store and point of sale", "Ginesys, GoFrugal, LS Retail"],
  ["Inventory and allocation", "Increff, plus whatever allocation logic sits in the ERP"],
  ["Engagement and lifecycle", "Klaviyo, CleverTap, MoEngage, WebEngage"],
  [
    "Marketplace",
    "Seller panels for Amazon and Flipkart, plus quick commerce partner portals, each with its own API behaviour and its own idea of a business day",
  ],
];

const PROVENANCE = [
  "Operating roles, not client engagements. The customer intelligence and omnichannel systems at Nature's Basket were built in-house across more than a million customers and 25 markets, integrating purchase history, survey data and third-party market share data.",
  "Before that, marketing operations at Tata-Tesco against an ₹800Cr revenue portfolio, and location strategy across more than 75 cities in India covering store viability, size and category assortment.",
  "That is the reason this page describes returns reconciliation rather than digital transformation. It is the part that actually took the margin.",
];

const FAQS = [
  {
    q: "We already have an order management system. Why is inventory still wrong?",
    a: "Usually because it was installed as another participant rather than as the decision maker. If the storefront can still reserve stock on its own logic and the marketplace panel still holds a private buffer, the order management system is reporting on a decision that was made elsewhere. The fix is a governance decision before it is a technical one.",
  },
  {
    q: "Is this an integration problem or a process problem?",
    a: "Both, and the order matters. Decide which system owns the number and what happens when two disagree, then build interfaces that enforce that. Integrating first just synchronises the disagreement faster.",
  },
  {
    q: "How do we quantify what this is costing us?",
    a: "Three numbers are usually available and rarely looked at together: cancellation rate from oversells, the value of returns not matched to an original order within thirty days, and stock written down at end of season against stock that was invisible to the channel that could have sold it. An assessment starts there.",
  },
  {
    q: "Do we need to replace anything?",
    a: "Often not. A meaningful share of this is allocation logic and interface design on the systems already in place. Where a replacement is genuinely needed we will say so, and we take no commission from anyone you buy from.",
  },
];

const RELATED_SERVICES = [
  {
    route: "/services/integration",
    label: "Integration",
    relevance:
      "Deciding which system owns the inventory number, then designing the interfaces and the reconciliation that make every other system defer to it.",
  },
  {
    route: "/services/crm-and-revenue-operations",
    label: "CRM and revenue operations",
    relevance:
      "Customer and order definitions that hold across channels, so lifecycle reporting is not counting the same person three times.",
  },
  {
    route: "/services/systems-selection",
    label: "Systems selection",
    relevance:
      "Choosing the order management or inventory layer on requirements drawn from your actual channel mix rather than from a demo.",
  },
];

export default function OneSkuFourNumbersPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: H1,
    description: metadata.description,
    image: absUrl("/og/multichannel-inventory-four-numbers.webp"),
    author: personSchema(tejas),
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    url: absUrl(PATH),
    mainEntityOfPage: absUrl(PATH),
    datePublished: PUBLISHED_ISO,
    dateModified: PUBLISHED_ISO,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      { "@type": "ListItem", position: 3, name: "One SKU, four inventory numbers", item: absUrl(PATH) },
    ],
  };

  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">One SKU, four inventory numbers</span>
          </nav>

          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Systems
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{H1}</h1>
          <p className="text-lg max-w-2xl mb-8 text-indigo-100">
            The website, the marketplace, the warehouse and the store each hold a different number for
            the same product. Every one of them is reading its own system correctly.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-300">
            <div className="flex items-center gap-2">
              <Image src={tejas.imageSrc} alt={tejas.name} width={32} height={32} className="rounded-full object-cover" />
              <div>
                <div className="text-white font-medium">{tejas.name}</div>
                <div className="text-xs opacity-80">{tejas.roleShort}</div>
              </div>
            </div>
            <span>·</span>
            <span>{PUBLISHED_DISPLAY}</span>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2 min-w-0 space-y-12 text-slate-600 leading-relaxed">
            <section>
              <Image
                src="/og/multichannel-inventory-four-numbers.webp"
                alt={IMAGE_ALT}
                width={1200}
                height={630}
                priority
                className="w-full h-auto rounded-2xl border border-slate-200"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why every system shows a different number</h2>
              <div className="space-y-4">
                <p>
                  Add a channel and you add a version of the truth. The storefront reserves stock at
                  checkout. The marketplace panel holds its own buffer and updates on its own schedule.
                  The warehouse system knows what has been picked but not what has been promised. The
                  store knows what is on the shelf and tells nobody.
                </p>
                <p>
                  None of these is wrong. They are answering different questions. The failure is that no
                  system was ever given the job of being the one that decides, so the answer depends on
                  which screen the person asking happens to be looking at.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Where the margin goes: oversells and unmatched returns</h2>
              <div className="space-y-4">
                <p>
                  The commercial damage shows up twice. Once at the front, in oversells and cancellations
                  that cost a customer rather than a sale. Then again at the back, in returns
                  reconciliation, which is where margin quietly disappears because a return that never
                  gets matched to its original order is stock you have paid for twice and can no longer
                  sell at full price.
                </p>
                <p>
                  Deciding which system owns the number is where our{" "}
                  <Link href="/services/integration" className={linkClass}>
                    integration work
                  </Link>{" "}
                  starts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why quick commerce made it worse</h2>
              <div className="space-y-4">
                <p>
                  Quick commerce made this worse rather than better. Replenishment windows that used to be
                  weekly are now measured in hours, against planning systems built on the older
                  assumption. A model that was merely inaccurate becomes actively expensive.
                </p>
                <p>
                  If you are also{" "}
                  <Link href="/migrations/ecommerce-migration" className={linkClass}>
                    moving your store to a new platform
                  </Link>
                  , settle which system owns the number before the move, not after it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The typical retail stack, and where the truth breaks</h2>
              <p className="mb-6">
                Most mid-market retail and consumer businesses run some version of this. The specific
                products matter less than which layer was bought first and therefore ended up as the
                accidental system of record.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="py-3 pr-4 w-[32%] text-slate-900 font-semibold">Layer</th>
                      <th className="py-3 text-slate-900 font-semibold">Typical platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STACK.map(([layer, platforms]) => (
                      <tr key={layer} className="border-b border-slate-200 align-top">
                        <th scope="row" className="py-3 pr-4 font-medium text-slate-900">{layer}</th>
                        <td className="py-3">{platforms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Where this comes from</h2>
              <div className="space-y-4">
                {PROVENANCE.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
              <div className="space-y-6">
                {FAQS.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Where we help</h2>
              <ul className="space-y-4">
                {RELATED_SERVICES.map((s) => (
                  <li key={s.route}>
                    <Link href={s.route} className={`${linkClass} font-semibold`}>
                      {s.label}
                    </Link>
                    <p className="mt-1 text-sm">{s.relevance}</p>
                  </li>
                ))}
                <li>
                  <Link href="/services/commerce-and-digital-platforms" className={`${linkClass} font-semibold`}>
                    Ecommerce platform selection
                  </Link>
                  <p className="mt-1 text-sm">
                    Choosing the storefront and the commerce systems behind it, with the inventory question
                    settled first.
                  </p>
                </li>
              </ul>
              <p className="mt-5 text-sm">{site.movePlan.session}, to work out where your fix should start.</p>
              <Link
                href="/contact"
                className="mt-4 inline-block bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-indigo-800"
              >
                {site.movePlan.label}
              </Link>
            </section>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-indigo-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Stock numbers that never agree?</h3>
                <p className="text-sm mb-4 opacity-90 leading-relaxed">
                  {site.movePlan.session} to map which system should own the number and what breaks
                  today.
                </p>
                <Link
                  href="/contact"
                  className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
                >
                  {site.movePlan.label}
                </Link>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src={tejas.imageSrc} alt={tejas.name} width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{tejas.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{tejas.roleShort}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{tejas.bio}</p>
                    <a href={tejas.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-indigo-600 hover:underline font-medium">
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
