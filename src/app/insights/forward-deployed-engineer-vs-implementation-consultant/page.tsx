import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";

/*
  Brief 6, technology content plan. Approved by Tejas 30 October 2026.

  Rules from the brief:
  - Name no firm that sells FDEs. Palantir appears only as the origin of
    the model, verified against Andreessen Horowitz (16 January 2026).
  - Describe the implementation consultant fairly. The argument is fit.
  - No services pitch in the body. The closing block carries the links.
  - Visible copy never says "migration".
*/
export const metadata = pageMetadata({
  title: "Forward deployed engineer vs consultant",
  description:
    "A forward deployed engineer, an implementation consultant or a hire? How each role puts an AI strategy into practice, and how to choose.",
  path: "/insights/forward-deployed-engineer-vs-implementation-consultant",
  type: "article",
});

const PATH = "/insights/forward-deployed-engineer-vs-implementation-consultant";
const H1 = "Forward deployed engineer or implementation consultant: which does your AI plan need?";
const PUBLISHED_ISO = "2026-10-30";
const PUBLISHED_DISPLAY = "30 October 2026";
const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";

const A16Z = "https://www.a16z.com/the-palantirization-of-everything";

const COMPARISON: [string, string, string][] = [
  ["Sits with", "Your functional teams: finance, operations, sales, service", "Your project team and the vendor's product specialists"],
  ["Works from", "The business outcome and the plan behind it", "The statement of work and the specification"],
  ["Who pays them", "You, if independent. The vendor, if employed by one", "Usually you, through the vendor's partner or a systems integrator"],
  ["Measured on", "Whether the outcome lands and the team uses it", "Whether the scope is delivered on time and on budget"],
  ["When the plan is wrong", "Says so and changes it, with the CTO", "Raises a change request"],
  ["When the work ends", "When the process runs without them", "At go-live, or at the end of the support period"],
  ["Best at", "AI and process change that crosses several teams", "Configuring a chosen product well and quickly"],
];

const FAQS = [
  {
    q: "Is a forward deployed engineer just a consultant with a new title?",
    a: "No. A consultant usually advises and leaves, or delivers a defined scope. A forward deployed engineer sits inside the teams and stays until the outcome lands, changing the plan on the way when it needs changing.",
  },
  {
    q: "How is it different from a solutions architect?",
    a: "A solutions architect designs how the systems fit together, usually before the build. A forward deployed engineer works during and after it, in the functions, making the design work for the people who use it.",
  },
  {
    q: "Can one person do both roles?",
    a: "On a small, contained project, sometimes. On anything that crosses several teams, rarely well, because the two roles pull in different directions: one towards finishing the scope, the other towards questioning it.",
  },
];

const SOURCES = [
  {
    label: "Andreessen Horowitz, The Palantirization of everything, 16 January 2026",
    href: A16Z,
    note: "Marc Andrusko. The source for the origin of the model and the rise in job postings for the role.",
  },
  {
    label: "Everest Group on forward deployed software engineers",
    href: "https://www.everestgrp.com/?p=151273",
    note: "How the role differs from post-sales support and advisory consulting.",
  },
];

export default function FdeVsImplementationConsultantPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: H1,
    description: metadata.description,
    author: personSchema(tejas),
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    url: absUrl(PATH),
    mainEntityOfPage: absUrl(PATH),
    datePublished: PUBLISHED_ISO,
    dateModified: PUBLISHED_ISO,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      { "@type": "ListItem", position: 3, name: "FDE or implementation consultant", item: absUrl(PATH) },
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
            <span className="text-indigo-100">FDE or implementation consultant</span>
          </nav>

          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            AI
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{H1}</h1>
          <p className="text-lg max-w-2xl mb-8 text-indigo-100">
            How each role puts an AI strategy into practice, and how to choose between them, or a
            hire.
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
            <span>6 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2 space-y-12 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The short answer</h2>
              <div className="space-y-4">
                <p>
                  If the work is setting up a product you have already chosen, use an implementation
                  consultant. If the work is making an AI plan land inside your teams, so that finance,
                  operations and service actually work differently, you need a forward deployed
                  engineer, full-time or fractional.
                </p>
                <p>
                  The two roles answer different questions. One asks how the product should be
                  configured. The other asks whether the plan works in your business, and changes the
                  plan when it does not. Most AI programmes need both, at different moments, and the
                  expensive mistake is hiring one to do the other&apos;s job.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What a forward deployed engineer actually does</h2>
              <div className="space-y-4">
                <p>
                  A forward deployed engineer works inside the business, not beside it. The model was
                  pioneered by Palantir in the early 2010s, according to{" "}
                  <a href={A16Z} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Andreessen Horowitz
                  </a>
                  , and AI companies have copied it because so many AI projects stall before they reach
                  production.
                </p>
                <p>The job descriptions vary, but the work comes down to four things:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-slate-900">Embed with the teams.</strong> Sit with finance,
                    operations, sales or service until each workflow is understood from the inside,
                    including the exceptions nobody wrote down.
                  </li>
                  <li>
                    <strong className="text-slate-900">Turn the strategy into scoped use cases.</strong>{" "}
                    Translate a plan written at the top into concrete work with owners, data needs and a
                    measure of success.
                  </li>
                  <li>
                    <strong className="text-slate-900">Connect the AI to real data.</strong> The
                    definitions, integrations and hand-offs that decide whether the model sees the
                    business as it is. This is usually where the plan meets the most resistance, which
                    is why{" "}
                    <Link href="/migrations/ai-ready-data" className={linkClass}>
                      getting the data ready
                    </Link>{" "}
                    comes first.
                  </li>
                  <li>
                    <strong className="text-slate-900">Stay until it runs.</strong> Not until the demo.
                    Until the team that owns the process uses it without being asked.
                  </li>
                </ul>
                <p>
                  A forward deployed engineer is measured on whether the outcome lands, not on how much
                  of a product gets configured. One thing to check: many FDEs are employed by a software
                  vendor, and their job is to make that vendor&apos;s product succeed in your business.
                  That is useful, but it is not the same as someone whose only interest is your plan.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What an implementation consultant does</h2>
              <div className="space-y-4">
                <p>
                  An implementation consultant sets up a product to a specification. They usually come
                  from the vendor&apos;s side of the table, often as a certified partner, and they know
                  the product deeply: its configuration options, its limits and the fastest way to get
                  it live.
                </p>
                <p>
                  That is real expertise, and on a defined scope it is the right expertise. A good
                  implementation consultant will tell you when a requirement fights the product, deliver
                  to a plan and hand over a working system.
                </p>
                <p>
                  Their limits are structural rather than personal. They work to the statement of work,
                  so anything outside it becomes a change request. They are paid for effort or for the
                  build, so their commercial interest is in the scope being delivered, not in whether the
                  scope was the right one. And they leave at go-live, which is usually when the business
                  starts to find out whether the plan works.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Side by side</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="py-3 pr-4 w-[22%]"></th>
                      <th className="py-3 pr-4 text-slate-900 font-semibold">Forward deployed engineer</th>
                      <th className="py-3 text-slate-900 font-semibold">Implementation consultant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map(([label, fde, ic]) => (
                      <tr key={label} className="border-b border-slate-200 align-top">
                        <th scope="row" className="py-3 pr-4 font-medium text-slate-900">{label}</th>
                        <td className="py-3 pr-4">{fde}</td>
                        <td className="py-3">{ic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Neither column is better. They are different jobs, and a project that needs both usually
                suffers when one person is asked to do the two.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Three situations, and which role each one needs</h2>
              <div className="space-y-4">
                <p>
                  <strong className="text-slate-900">&ldquo;We have chosen the CRM and need it live by April.&rdquo;</strong>{" "}
                  Use an implementation consultant. The decision is made, the product is known and the
                  work is configuration against a deadline. A forward deployed engineer would cost more
                  and add little.
                </p>
                <p>
                  <strong className="text-slate-900">&ldquo;The board approved an AI plan six months ago. Two pilots worked, and nothing is in daily use.&rdquo;</strong>{" "}
                  You need a forward deployed engineer. The gap is not configuration. It is that nobody
                  owns making the plan land in the teams that run the processes, and nobody is checking
                  whether the plan survives contact with them.
                </p>
                <p>
                  <strong className="text-slate-900">&ldquo;We are replacing the ERP, and we want AI in finance after that.&rdquo;</strong>{" "}
                  You need both, in order. An implementation consultant configures the ERP. Someone on
                  your side, in the forward deployed role, makes sure the move fixes the data your AI
                  plans depend on and holds the consultant to the business case. Leave the second role
                  out and the new ERP inherits the old data, and the AI plans wait another year.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Hire full-time, fractional or per project</h2>
              <div className="space-y-4">
                <p>Once you know you need the forward deployed role, the next question is how to fill it.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-slate-900">Hire full-time</strong> when AI is a permanent
                    part of how the business runs, there are several use cases a year, and you can find
                    and keep someone who knows both the technology and your functions. That last part is
                    the hard one. Andreessen Horowitz reported in January 2026 that job postings for the
                    role had risen by hundreds of percent over 2025, so the market is thin.
                  </li>
                  <li>
                    <strong className="text-slate-900">Fractional, on a retainer</strong> when the plan
                    is live but the work comes in waves: a set number of days each month alongside the
                    CTO, rising and falling with the programme.
                  </li>
                  <li>
                    <strong className="text-slate-900">Per project</strong> when there is one use case or
                    one function to land, from plan to working, with a clear end.
                  </li>
                </ul>
                <p>
                  Hiring is the right call more often than people selling the alternatives tend to admit.
                  If the role will be needed every week for years, build it in. Fractional and project
                  work suit everything before that point, including working out whether the role is
                  needed at all.
                </p>
                <p>
                  I work in the fractional and project models myself, so I have an interest here. The
                  test above is the one I would apply to my own business.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common questions</h2>
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
              <h2 className="text-xl font-bold text-slate-900 mb-3">Have an AI plan that needs to land?</h2>
              <p>
                See how a{" "}
                <Link href="/services/forward-deployed-engineer" className={linkClass}>
                  forward deployed engineer without the full-time hire
                </Link>{" "}
                works, or book a working session. Related:{" "}
                <Link href="/services/ai-governance-and-adoption" className={linkClass}>
                  AI and data governance
                </Link>
                .
              </p>
              <Link
                href={site.headerCta.href}
                className="mt-5 inline-block bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-indigo-800"
              >
                {site.headerCta.label}
              </Link>
            </section>

            <section className="pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sources</h2>
              <ul className="space-y-5">
                {SOURCES.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm"
                    >
                      {source.label}
                    </a>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{source.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-indigo-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Forward deployed engineer, without the full-time hire</h3>
                <p className="text-sm mb-4 opacity-90 leading-relaxed">
                  On retainer or per project, embedded with your teams to put your AI plan to work.
                </p>
                <Link
                  href="/services/forward-deployed-engineer"
                  className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
                >
                  How it works
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
