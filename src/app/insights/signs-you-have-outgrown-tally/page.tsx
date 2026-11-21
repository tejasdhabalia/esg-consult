import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";

/*
  Brief 4, SEO project, 21 November 2026. Moved from
  /industries/distribution-and-wholesale, which now redirects here (301).

  Decisions by Tejas, 21 November 2026:
  - Existing copy reused; only the structure changed.
  - No "Where this comes from" section on this article.
  - Bylined to Tejas.
  - Visible copy says "move", never "migration" (site rule, confirmed by
    Tejas for this article 21 November 2026).

  Cannibalisation guard: /migrations/tally-to-erp targets the commercial
  "move off Tally" intent. This article targets the diagnostic "am I there
  yet" intent. The two pages link to each other.
*/
export const metadata = pageMetadata({
  title: "Five signs your business has outgrown Tally",
  description:
    "Multi-entity consolidation in Excel, stock moved by journal entry, credit control in one person's head. Five signs Tally has become the constraint.",
  path: "/insights/signs-you-have-outgrown-tally",
  ogImage: "/og/outgrown-tally-signs.webp",
  type: "article",
});

const PATH = "/insights/signs-you-have-outgrown-tally";
const H1 = "Five signs your business has outgrown Tally";
const PUBLISHED_ISO = "2026-11-21";
const PUBLISHED_DISPLAY = "21 November 2026";
const IMAGE_ALT =
  "Diagram of an accounting system surrounded by spreadsheet workarounds, a sign the business has outgrown Tally";
const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";

const SIGNS: [string, string][] = [
  ["Entities consolidated by hand.", "Multiple entities being consolidated by hand in Excel each month."],
  [
    "Stock moves as journal entries.",
    "Multiple warehouses where stock movement between them is a journal entry rather than a tracked event.",
  ],
  [
    "Credit control in one person's head.",
    "Credit control that lives in one person's memory of who is good for it.",
  ],
  [
    "Schemes reconciled after the fact.",
    "Scheme and discount management that changes every quarter and is reconciled after the fact.",
  ],
  [
    "A month end measured in weeks.",
    "A month end close measured in weeks because the numbers have to be assembled before they can be reviewed.",
  ],
];

const STACK: [string, string][] = [
  ["Core accounting, value tier", "Tally Prime, Busy, Marg ERP in pharma distribution"],
  [
    "Core ERP, above the ceiling",
    "SAP Business One, Oracle NetSuite, Microsoft Dynamics 365 Business Central, Odoo, ERPNext, Acumatica",
  ],
  [
    "Warehouse",
    "A dedicated warehouse system once volumes justify it, or warehouse logic inside the ERP where they do not",
  ],
  [
    "Customer integration",
    "EDI or portal feeds to large customers. EDIFACT, ANSI X12, AS2 and PEPPOL matter more here than most finance teams realise, particularly for anyone shipping to a global retailer",
  ],
  ["Sales and field", "Zoho CRM, LeadSquared, Kylas or a distributor portal built in-house"],
];

const FAQS = [
  {
    q: "Is Tally the problem?",
    a: "Usually not on its own. The problem is a set of processes that have grown around the tool's limits, and those processes travel with you if the move only replaces the software. A meaningful share of the work is deciding which workarounds to stop doing.",
  },
  {
    q: "How long does a move off Tally take?",
    a: "For a mid-market distributor, typically six to twelve months from selection to a stable close on the new system, with parallel running across at least two month ends. Anyone quoting materially less has probably not asked about your entity structure or your scheme calculations.",
  },
  {
    q: "What happens to our history?",
    a: "That is a business decision that gets made by default far too often. Bringing everything is expensive and slows the build. Bringing balances only is cheap and painful the first time someone needs a three year old transaction. We put the options and the costs in front of you rather than deciding it inside the mapping.",
  },
  {
    q: "Our finance team is nervous about this. Is that unreasonable?",
    a: "No, it is the most rational position in the room. They are the ones who absorb the disruption. A plan that treats their concerns as change resistance rather than as risk information is a plan that will surprise you at cutover.",
  },
  {
    q: "Which ERP should we move to?",
    a: "It depends on entity structure, scheme complexity, warehouse volumes and whether you have EDI obligations to large customers. We will score the options against those and hand you the scoring. We take no commission from any of them.",
  },
];

const RELATED_SERVICES = [
  {
    route: "/services/systems-selection",
    label: "Systems selection",
    relevance:
      "Working out which system actually fits multi-entity and scheme complexity, and getting the scoring rather than a shortlist that arrived from somewhere.",
  },
  {
    route: "/services/implementation-oversight",
    label: "Implementation and delivery oversight",
    relevance:
      "Holding scope through the move, and being the person who can recommend delaying a cutover when the data is not ready.",
  },
  {
    route: "/services/integration",
    label: "Integration",
    relevance:
      "Designing how the data moves, parallel running, reconciliation between old and new, and the EDI feeds that cannot go dark during cutover.",
  },
];

export default function OutgrownTallyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: H1,
    description: metadata.description,
    image: absUrl("/og/outgrown-tally-signs.webp"),
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
      { "@type": "ListItem", position: 3, name: "Outgrown Tally", item: absUrl(PATH) },
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
            <span className="text-indigo-100">Outgrown Tally</span>
          </nav>

          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Systems
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{H1}</h1>
          <p className="text-lg max-w-2xl mb-8 text-indigo-100">
            The business outgrew Tally years ago. Everyone knows it. The move keeps getting
            deferred, and the reason is almost never technical.
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
            <section className="space-y-6">
              <Image
                src="/og/outgrown-tally-signs.webp"
                alt={IMAGE_ALT}
                width={1200}
                height={630}
                priority
                className="w-full h-auto rounded-2xl border border-slate-200"
              />
              <p>
                Tally is a good product that a very large number of Indian businesses have run well past
                the point it was designed for. The ceiling is real and it arrives in a recognisable order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Five signs the tool has become the constraint</h2>
              <ol className="list-decimal pl-5 space-y-3">
                {SIGNS.map(([label, text]) => (
                  <li key={label}>
                    <strong className="text-slate-900">{label}</strong> {text}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why the move off Tally keeps getting deferred</h2>
              <div className="space-y-4">
                <p>
                  What keeps the move deferred is not cost and not the software. It is that the
                  finance team knows Tally and nothing else, and the person who would have to sponsor the
                  change is the person whose month end gets worse for two quarters while it happens.
                </p>
                <p>
                  That is a legitimate fear and it is usually met with a business case full of benefits
                  and silent on the disruption. So the decision gets pushed to next year, and each year the
                  data set gets larger and the move gets harder.
                </p>
                <p>
                  The honest version says how bad the middle is, how long it lasts, and what specifically
                  is being run in parallel while it does. A move plan that does not describe the worst
                  month is not a plan.
                </p>
                <p>
                  If you are already{" "}
                  <Link href="/migrations/tally-to-erp" className={linkClass}>
                    planning a move off Tally
                  </Link>
                  , this is how we run one, from masters to cutover.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What a distribution stack looks like past the ceiling</h2>
              <p className="mb-6">
                Distribution stacks tend to be layered by growth rather than designed. The tool that was
                right at ₹10Cr is still there at ₹200Cr, with satellites bolted around it.
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
              </ul>
              <p className="mt-5">
                Choosing the system is its own decision:{" "}
                <Link href="/services/erp-systems" className={linkClass}>
                  ERP selection and the move to a new system
                </Link>
                .
              </p>
              <p className="mt-4 text-sm">{site.movePlan.session}, to work out where your move should start.</p>
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
                <h3 className="font-bold text-base mb-2">Planning the move off Tally?</h3>
                <p className="text-sm mb-4 opacity-90 leading-relaxed">
                  {site.movePlan.session} to map your entities, masters and the processes living in
                  Excel.
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
