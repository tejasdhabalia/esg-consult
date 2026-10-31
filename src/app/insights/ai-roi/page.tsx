import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";

/*
  Brief 1, technology content plan. Article companion to the lead-gated AI
  ROI calculator at /insights/ai-roi-calculator. URL proposed 30 October
  2026, pending the SEO project's confirmation (the brief assumed one page).

  Rules: no statistic without an opened source (none is used); the short
  answer in the first 100 words; no services pitch in the body; the worked
  example is labelled illustrative and matches DEFAULT_INPUTS in
  src/lib/ai-roi.ts, so the calculator reproduces it exactly.
*/
export const metadata = pageMetadata({
  title: "AI ROI: framework and calculator",
  description:
    "Most AI pilots stall before they pay back. A practical way to measure the ROI of AI in a mid-market business, with a free calculator to use.",
  path: "/insights/ai-roi",
  type: "article",
});

const PATH = "/insights/ai-roi";
const H1 = "Why your AI pilot is not paying back, and how to tell if it will";
const PUBLISHED_ISO = "2026-10-30";
const PUBLISHED_DISPLAY = "30 October 2026";
const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";
const strong = "text-slate-900";

const VALUE_ROWS: [string, string, string][] = [
  [
    "Time released",
    "Hours a team no longer spends on a task",
    "Only if the hours go somewhere: fewer hires, overtime cut, a backlog cleared. Hours that simply disappear into the day are not a saving",
  ],
  [
    "Errors avoided",
    "Mistakes that no longer happen, and what each one cost to fix",
    "Usually, if the error rate before and after can be shown from records rather than recollection",
  ],
  [
    "Revenue lift",
    "More sales, higher conversion, better retention",
    "The hardest to prove, because so much else moves revenue. Needs a control group or a clear before and after",
  ],
];

const EXAMPLE_ROWS: [string, string, string][] = [
  ["Value per month", "₹55,440", "₹1,10,880"],
  ["Recurring cost per month", "₹52,100", "₹54,200"],
  ["Net value per month", "₹3,340", "₹56,680"],
  ["Payback on ₹8,50,000 one-off cost", "About 21 years", "15 months"],
  ["Net over three years", "−₹7,29,760", "₹11,90,480"],
];

const FAQS = [
  {
    q: "How long should AI take to pay back?",
    a: "For a mid-market business, aim for 12 months or less on a single use case, which is the line the calculator uses for ready to scale. Up to 36 months can still be worth the work. Longer is possible for strategic work, but the case should then rest on something other than savings, and say so.",
  },
  {
    q: "How do you measure the ROI of copilot-style tools?",
    a: "Per process, not per seat. Pick the tasks the tool is meant to speed up, measure them before and after for the people using it, and count only the time that goes somewhere. A licence for everyone with no measured task is a cost, not an investment.",
  },
  {
    q: "Who should own AI ROI?",
    a: "The owner of the process the AI changes, not the technology team. They hold the baseline, they decide whether the new way of working sticks, and the value lands in their numbers.",
  },
];

export default function AiRoiArticlePage() {
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
      { "@type": "ListItem", position: 3, name: "AI ROI", item: absUrl(PATH) },
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
            <span className="text-indigo-100">AI ROI</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            AI
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{H1}</h1>
          <p className="text-lg max-w-2xl mb-8 text-indigo-100">
            Most AI pilots stall before they pay back. Here is how to measure the return on AI in a
            mid-market business, and a calculator to test your own use case.
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
            <span>8 min read</span>
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
                  AI pays back when it is attached to a process with a measured baseline and a named
                  owner. Most pilots have neither. They prove the model works on a clean sample, then
                  stall because nobody can say how much time, error or revenue the process cost before,
                  who will run it differently afterwards, or what the data preparation will cost to do
                  properly.
                </p>
                <p>
                  The model is rarely the problem. The arithmetic around it usually is, and it can be
                  checked before you spend another rupee, pound or dollar.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why pilots stall between the demo and the payback</h2>
              <div className="space-y-4">
                <p>The same four patterns come up again and again, whatever the industry.</p>
                <p>
                  <strong className={strong}>Nobody captured the baseline.</strong> The pilot shows the
                  task now takes four minutes. Nobody measured how long it took before, how often it
                  happened or how many errors it produced. Without that, the saving is an estimate, and
                  finance discounts estimates.
                </p>
                <p>
                  <strong className={strong}>The data preparation was never counted.</strong> The pilot
                  ran on a sample someone cleaned by hand. Production runs on whatever the source systems
                  hold that day: duplicate records, inconsistent fields, three years of unmapped activity.
                  A model does not know the data is dirty. It learns the patterns it finds and repeats
                  them at scale, so the cleaning becomes a project in its own right, with a cost nobody
                  budgeted.
                </p>
                <p>
                  <strong className={strong}>The value lands in someone else&apos;s budget.</strong> The
                  cost sits with the technology team. The time saved shows up in customer service, the
                  errors avoided in finance, the revenue lift in sales. Each team sees a small gain it did
                  not ask for, and nobody adds them up, so the business case never closes.
                </p>
                <p>
                  <strong className={strong}>Nobody owns it after the pilot.</strong> The enthusiast who
                  ran the pilot moves on. The team that owns the process has a queue to clear and no
                  reason to check the output. Usage drifts down, and the AI quietly becomes one more tool
                  that people work around.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The costs people leave out</h2>
              <div className="space-y-4">
                <p>
                  A pilot budget usually covers the licence and a few weeks of someone&apos;s time. The
                  full cost of running AI in a process has two halves.
                </p>
                <p><strong className={strong}>One-off costs</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className={strong}>Data preparation.</strong> Cleaning, de-duplicating and agreeing definitions for the data the use case needs. Often the largest single cost, and the one most often missing.</li>
                  <li><strong className={strong}>Integration.</strong> Getting data in and results back into the systems people already use, so nobody has to copy and paste between screens.</li>
                  <li><strong className={strong}>Change management.</strong> Training, revised procedures and the time it takes a team to trust the output.</li>
                </ul>
                <p><strong className={strong}>Recurring costs</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className={strong}>Licences that scale with use.</strong> Per-seat, per-call or per-token pricing that looks small in a pilot and grows with adoption.</li>
                  <li><strong className={strong}>Human review.</strong> The time people spend checking output, which never falls to zero for anything that matters.</li>
                  <li>
                    <strong className={strong}>Governance.</strong> Keeping the use case in the{" "}
                    <Link href="/insights/ai-use-case-register" className={linkClass}>AI use case register</Link>,
                    monitoring quality and answering the questions customers, auditors and regulators ask.
                    In Europe, some of this is now a legal duty: see the{" "}
                    <Link href="/regulatory-hub/eu-ai-act-in-scope-and-timeline" className={linkClass}>EU AI Act timeline</Link>.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The value a CFO will accept</h2>
              <p className="mb-4">AI creates value in three ways. They are not equally easy to defend.</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="py-3 pr-4 text-slate-900 font-semibold">Kind of value</th>
                      <th className="py-3 pr-4 text-slate-900 font-semibold">What it means</th>
                      <th className="py-3 text-slate-900 font-semibold">Survives a finance review?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VALUE_ROWS.map(([kind, meaning, survives]) => (
                      <tr key={kind} className="border-b border-slate-200 align-top">
                        <th scope="row" className="py-3 pr-4 font-medium text-slate-900">{kind}</th>
                        <td className="py-3 pr-4">{meaning}</td>
                        <td className="py-3">{survives}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                The honest approach is to give each one a confidence level and let the business case
                stand on the value you are most sure of. If it only works with every benefit at full
                value, it does not work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Using the calculator</h2>
              <div className="space-y-4">
                <p>
                  The <Link href="/insights/ai-roi-calculator" className={linkClass}>AI ROI calculator</Link>{" "}
                  takes one use case at a time. Most companies use the quick estimate, built from what
                  they already know: the people doing the work, what they cost, whether they plan to
                  hire and what they spend outside the team. Where task-level numbers exist, a
                  detailed version uses volumes, handling times and error rates. It returns payback in months,
                  net value over three years, the same figures at half and one and a half times the
                  adoption you planned, and a recommendation, and emails you the results. Amounts can be
                  in rupees, dollars, pounds or euros.
                </p>
                <p>
                  <strong className={strong}>A worked example.</strong>{" "}
                  <em>Illustrative only: the figures are invented to show the method, not taken from any business.</em>
                </p>
                <p>
                  A customer service team handles 6,000 emails a month at five minutes each. AI drafts
                  replies for 70% of them, cutting handling to two minutes, and misrouted emails fall from
                  4% to 1%. People cost ₹600 an hour and each error costs ₹400 to fix. The time saved is
                  counted at 60% confidence and the errors avoided at 70%. No revenue lift is claimed.
                </p>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="py-3 pr-4"></th>
                      <th className="py-3 pr-4 text-slate-900 font-semibold">Half planned adoption</th>
                      <th className="py-3 text-slate-900 font-semibold">Planned adoption</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLE_ROWS.map(([label, half, planned]) => (
                      <tr key={label} className="border-b border-slate-200">
                        <th scope="row" className="py-3 pr-4 font-medium text-slate-900">{label}</th>
                        <td className="py-3 pr-4">{half}</td>
                        <td className="py-3">{planned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                The recommendation is <strong className={strong}>needs work first</strong>. At planned adoption the use
                case pays back in 15 months, inside the 36-month line but outside 12. At half adoption it
                barely covers its running costs, because the licences and governance cost the same
                whether people use it or not. The case lives or dies on adoption, so that is what to fix
                before anything is scaled: who owns the inbox process, and what makes the team use the
                drafts rather than work around them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to scale, needs work first or not yet</h2>
              <div className="space-y-4">
                <p>
                  The calculator applies three rules. They are deliberately strict, because a pilot that
                  only pays back in the best case will not pay back.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className={strong}>Ready to scale</strong> when the use case pays back within 12 months at the adoption you planned, and still comes out ahead over three years at half that adoption.</li>
                  <li><strong className={strong}>Needs work first</strong> when it pays back within 36 months at planned adoption but fails the scale test: slower than 12 months, or behind over three years at half adoption. Fix adoption, data, ownership or cost before spending more.</li>
                  <li><strong className={strong}>Not yet</strong> when it does not pay back within 36 months even at planned adoption. Keep the lessons, record the numbers in the register and put the money somewhere it works.</li>
                </ul>
                <p>
                  Not yet is a good outcome. A pilot that ends with a clear answer has done its job, and it
                  frees the budget for a use case that passes.
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
              <h2 className="text-xl font-bold text-slate-900 mb-3">Test your own use case</h2>
              <p>
                Related: <Link href="/insights/ai-use-case-register" className={linkClass}>AI use case register</Link>,{" "}
                <Link href="/migrations/ai-ready-data" className={linkClass}>getting your data AI-ready</Link>,{" "}
                <Link href="/services/ai-governance-and-adoption" className={linkClass}>AI and data governance</Link>.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/insights/ai-roi-calculator"
                  className="inline-block bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-indigo-800"
                >
                  Open the AI ROI calculator
                </Link>
                <Link
                  href="/contact"
                  className="inline-block border border-indigo-300 text-indigo-800 text-sm font-semibold px-5 py-3 rounded-lg hover:bg-white"
                >
                  {site.movePlan.label}
                </Link>
              </div>
            </section>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-indigo-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">AI ROI calculator</h3>
                <p className="text-sm mb-4 opacity-90 leading-relaxed">
                  Payback, three-year value and whether one use case is ready to scale.
                  Results emailed to you.
                </p>
                <Link
                  href="/insights/ai-roi-calculator"
                  className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
                >
                  Open the calculator
                </Link>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src={tejas.imageSrc} alt={tejas.name} width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{tejas.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{tejas.roleShort}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{tejas.bio}</p>
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
