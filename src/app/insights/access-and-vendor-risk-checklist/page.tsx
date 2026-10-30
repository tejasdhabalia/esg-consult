import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";

const meta = {
  title: "Access and vendor risk checklist: 20 questions for leaders",
  // 145 characters. Brief 3 set a 155 limit so Google does not truncate.
  description:
    "Twenty questions on privileged access, devices, vendors, money movement and incident response. A 15-minute test written after the Binance breach.",
};

const PATH = "/insights/access-and-vendor-risk-checklist";

/*
  VERIFY BEFORE PUBLISHING

  INCIDENT AND REGULATORY CONTENT. Verified 30 October 2026.
  Owner for refresh: Tejas Dhabalia.

  The publish date below drives the byline, the footer note and the schema.
  If this page goes live on a later day, recheck every item in this list on
  that day and change both constants. Delete this comment once published.

  Binance, as at 30 October 2026 (all still moving):
    - about $6.3 billion affected, per Binance's announcement of 29 October
    - initial finding, per Binance on X 30 October: a compromised DevOps
      engineer's laptop, access to a service container, unauthorised
      withdrawal transactions
    - attribution: TRM Labs (high confidence) and Chainalysis (high degree
      of confidence) to a North Korea-linked group. Binance has not named
      an attacker
    - 27 October statement on blocked North Korea-linked attempts using
      fake job interviews: found only in secondary reports (ChainCatcher
      and others). No Binance post located. Used in question 8
  Shipping provider incident in question 12: companies deliberately
    unnamed, so it carries no source link. Check against the provider's own
    statement or cut the sentence
  DPDP: obligations commence 13 May 2027. Ceilings INR 250 crore (security
    safeguards) and INR 200 crore (breach notification), from the Schedule
    to the Act. Must agree with /regulatory-hub/dpdp-in-scope-and-timeline
  Question 11 notice window (24 to 72 hours): Part B wording, kept as final
*/
const PUBLISHED_DISPLAY = "30 October 2026";
const PUBLISHED_ISO = "2026-10-30";

const base = pageMetadata({ ...meta, path: PATH, type: "article" });

// The brief fixes the title tag at 58 characters. The helper's
// " | DS Consulting" suffix would take it past 70, so it is set absolute here.
export const metadata: Metadata = {
  ...base,
  title: { absolute: meta.title },
  openGraph: { ...base.openGraph, title: meta.title },
  twitter: { ...base.twitter, title: meta.title },
};

const BINANCE_STATEMENT_URL =
  "https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7";

type Question = { n: number; question: string; good: string };
type Section = { id: string; title: string; intro: string; questions: Question[] };

const SECTIONS: Section[] = [
  {
    id: "privileged-access",
    title: "1. Privileged access",
    intro:
      "Privileged access is the power to change systems, reach production data or approve money. The fewer people and accounts that hold it, the less one mistake can cost.",
    questions: [
      {
        n: 1,
        question: "Can you list everyone who holds admin, production or finance-signing access today?",
        good: "a named list owned by one person and reviewed at least every quarter. Nobody is on it only because they were once on it.",
      },
      {
        n: 2,
        question: "Is multi-factor authentication enforced on every privileged account?",
        good: "enforced by policy and confirmed by a report, preferably with methods that resist phishing. Exceptions are logged with an end date.",
      },
      {
        n: 3,
        question: "How quickly does access end when someone leaves or changes role?",
        good: "the same day for leavers, checked against HR records. A role change triggers a review of what that person can still reach.",
      },
      {
        n: 4,
        question: "Do service accounts, API keys and automated agents have owners and limited permissions?",
        good: "each one has a named owner, the minimum permissions it needs and a rotation or expiry date. They sit in the same review as human accounts, AI agents included.",
      },
    ],
  },
  {
    id: "devices-and-people",
    title: "2. Devices and people",
    intro:
      "Attackers often go through a person and a device rather than the system itself. These questions ask what a single compromised laptop could reach.",
    questions: [
      {
        n: 5,
        question: "Which devices can reach production systems or move money?",
        good: "only company-managed devices that are enrolled, patched and listed. Personal devices and shared machines are excluded.",
      },
      {
        n: 6,
        question: "Can one person on one device complete a sensitive action from start to finish?",
        good: "sensitive actions need a second person or a second approval path. A single stolen session cannot finish the job.",
      },
      {
        n: 7,
        question: "Do people with privileged access get training on targeted lures such as fake recruiters and fake vendor requests?",
        good: "role-specific training at least once a year, a fast way to report a suspicious approach and no penalty for reporting.",
      },
      {
        n: 8,
        question: "What is the rule for running code or opening files that arrive from outside the company?",
        good: "privileged devices do not run outside code or test tasks. That work happens on separate devices or in isolated environments. Binance said on 27 October 2026 that it had blocked North Korea-linked attempts of this kind. It has not said how the laptop in the 29 October breach was compromised.",
      },
    ],
  },
  {
    id: "vendors-and-third-parties",
    title: "3. Vendors and third parties",
    intro:
      "Your exposure includes the vendors that can touch your data, systems or money, and the vendors they rely on.",
    questions: [
      {
        n: 9,
        question: "Do you have a current list of vendors with access to your data or systems, including the vendors they depend on?",
        good: "a register with an owner, the data each vendor holds, the access it has and the main sub-vendors of your critical suppliers.",
      },
      {
        n: 10,
        question: "Does each vendor have only the access it needs, and is that reviewed?",
        good: "scoped accounts, no shared logins and a review at least yearly or whenever the contract changes.",
      },
      {
        n: 11,
        question: "Do contracts set a fixed time for breach notice, and do you know who to call?",
        good: "a stated notice window (commonly 24 to 72 hours), a named contact on each side and a phone call to test that the contact works.",
      },
      {
        n: 12,
        question: "When a vendor says it deleted your data or passed an audit, how do you check?",
        good: "a deletion certificate or a sample check. A security certification is a snapshot of a past period, not a guarantee of today. In one 2026 incident a provider holding a SOC 2 Type II report was breached through a tool it used, and data its contract required it to delete was still held.",
      },
    ],
  },
  {
    id: "money-and-data-movement",
    title: "4. Money and data movement",
    intro:
      "Most losses happen at the moment value moves. These questions ask how much friction sits in front of that moment.",
    questions: [
      {
        n: 13,
        question: "What approval does a large payment, a bank detail change or a bulk data export need?",
        good: "thresholds with two approvers. A change to payee details is confirmed by a call-back to a number you already hold.",
      },
      {
        n: 14,
        question: "Are there limits and alerts for unusual movement?",
        good: "daily limits and alerts for new payees, large exports or odd timing. Alerts go to someone other than the person who made the request.",
      },
      {
        n: 15,
        question: "Can you halt payments or exports within minutes, and who may do it?",
        good: "a documented stop switch, named people who can use it without convening a committee and a test at least once a year.",
      },
      {
        n: 16,
        question: "Are high-value credentials and signing authority kept apart from everyday systems?",
        good: "held in controlled systems separate from the machines used for email and browsing. Access is logged and reviewed.",
      },
    ],
  },
  {
    id: "detection-and-response",
    title: "5. Detection and response",
    intro:
      "You will not prevent every incident. What you control is how fast you see it, how clearly you decide and how well you recover.",
    questions: [
      {
        n: 17,
        question: "Do you keep logs long enough to reconstruct an incident?",
        good: "at least a year of access and admin logs for critical systems, stored where a compromised administrator cannot erase them.",
      },
      {
        n: 18,
        question: "Is there a written breach plan, and has it been tested in the last 12 months?",
        good: "roles, decision rights, contact lists and notification steps for regulators and customers, tested with a tabletop exercise.",
      },
      {
        n: 19,
        question: "Who owns an incident at two in the morning, and do they know it?",
        good: "one named owner and one deputy, with phone numbers that work out of hours.",
      },
      {
        n: 20,
        question: "Could you restore critical systems and data from backups, and have you tried?",
        good: "a restore test at least once a year, with backups kept apart from production credentials.",
      },
    ],
  },
];

const SOURCES = [
  {
    label: "Binance, security incident announcement, 29 October 2026",
    href: BINANCE_STATEMENT_URL,
    note: "Binance's own statement. The source for the date of the breach and the figure of about $6.3 billion.",
  },
  {
    label: "Binance on X, initial investigation findings, 30 October 2026",
    href: "https://x.com/binance/status/2115993361517891592",
    note: "Binance's own post. The source for the laptop, the service container and the unauthorised withdrawal transactions.",
  },
  {
    label: "TRM Labs, attribution of the Binance hack, October 2026",
    href: "https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history",
    note: "Attributes the attack with high confidence to TraderTraitor, a North Korea-linked group.",
  },
  {
    label: "Chainalysis on X, attribution of the Binance hack, October 2026",
    href: "https://x.com/chainalysis/status/2116025255965999217",
    note: "States a high degree of confidence that North Korea is responsible.",
  },
  {
    label: "ChainCatcher, Binance on blocked North Korea-linked attacks, 27 October 2026",
    href: "https://www.chaincatcher.com/en/article/2299277",
    note: "Report of Binance's 27 October statement, referenced in question 8. A secondary report, as no original Binance post was located.",
  },
  {
    label: "DS Consulting, DPDP in scope and timeline",
    href: "/regulatory-hub/dpdp-in-scope-and-timeline",
    note: "Commencement date and penalty ceilings, with links to the MeitY notification and the Schedule to the Act.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Access and vendor risk checklist",
  description: meta.description,
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
    { "@type": "ListItem", position: 3, name: "Access and vendor risk checklist", item: absUrl(PATH) },
  ],
};

const SECTION_STYLES = [
  "bg-slate-50 border-slate-200",
  "bg-indigo-50 border-indigo-200",
  "bg-violet-50 border-violet-200",
  "bg-emerald-50 border-emerald-200",
  "bg-amber-50 border-amber-200",
];

const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";

export default function AccessAndVendorRiskChecklistPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">Access and vendor risk checklist</span>
          </nav>

          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Data protection
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Access and vendor risk checklist</h1>
          <p className="text-lg max-w-2xl mb-8 text-indigo-100">
            Twenty questions in five areas, in about fifteen minutes. They ask how far one compromised
            device, account or vendor could reach into your business.
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
            <span>Updated {PUBLISHED_DISPLAY}</span>
            <span>·</span>
            <span>9 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What happened at Binance</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  On 29 October 2026{" "}
                  <a href={BINANCE_STATEMENT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Binance confirmed a security incident
                  </a>{" "}
                  affecting about $6.3 billion of assets. Its initial investigation, published on 30
                  October, found that the incident may involve a compromised engineer&apos;s laptop,
                  which gave an attacker access to a service container used to submit unauthorised
                  withdrawal transactions.
                </p>
                <p>
                  Blockchain analytics firms TRM Labs and Chainalysis attribute the attack with high
                  confidence to a North Korea-linked group. Binance has not named an attacker, and the
                  investigation is continuing. Figures as reported on 30 October 2026.
                </p>
                <p>
                  Sources for each of these facts are listed at the{" "}
                  <a href="#sources" className={linkClass}>end of this page</a>.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why this is not only a crypto problem</h2>
              <p className="text-slate-600 leading-relaxed">
                Most businesses have the same shape. A person, a device, a system and the power to move
                money or data. Add the vendors that sit behind each of them and the same question
                applies: how far could one failure travel?
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to use this checklist</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Answer for what is true today, not what is planned. Score each question Yes, Partial
                  or No. Each one comes with a line on what good looks like.
                </p>
                <p>
                  Run it with your technology lead and your CFO in the same room. They will often answer
                  the same question differently, and that gap is the useful part.
                </p>
              </div>
            </section>

            <div className="space-y-10">
              {SECTIONS.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`${SECTION_STYLES[index % SECTION_STYLES.length]} border rounded-2xl p-6 scroll-mt-24`}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">{section.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{section.intro}</p>
                  <div className="space-y-4">
                    {section.questions.map((q) => (
                      <div key={q.n} className="bg-white/80 border border-white rounded-xl p-4">
                        {/* Anchor per question so posts can link to a single one, e.g. #q12 */}
                        <h3 id={`q${q.n}`} className="font-semibold text-slate-900 text-base mb-2 scroll-mt-24">
                          <a href={`#q${q.n}`} className="hover:text-indigo-700">
                            {q.n}. {q.question}
                          </a>
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-700">Good looks like:</span> {q.good}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to read your answers</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
                <li>Count the No and Partial answers in each section.</li>
                <li>Start with sections 1 and 4. They decide how far one compromised device or account can reach.</li>
                <li>Two or more No answers in any section is a priority for the next 30 days.</li>
                <li>Do not aim for all Yes. Aim to know where one mistake would cost you most.</li>
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Where to start in the next 30 days</h2>
              <ol className="list-decimal pl-5 space-y-2 text-slate-600 leading-relaxed">
                <li>
                  Write the privileged access list from <a href="#q1" className={linkClass}>question 1</a> and
                  remove what nobody can justify.
                </li>
                <li>Put a second approval on the money and data movements that would hurt most.</li>
                <li>
                  Call your three most critical vendors and ask the notice and access questions from{" "}
                  <a href="#vendors-and-third-parties" className={linkClass}>section 3</a>.
                </li>
              </ol>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">If you handle personal data of people in India</h2>
              <p className="text-slate-600 leading-relaxed">
                Several of these questions also test obligations under the DPDP Act, which commence on
                13 May 2027. The ceiling for failing to take reasonable security safeguards is ₹250
                crore, and for failing to notify a breach it is ₹200 crore. The{" "}
                <Link href="/insights/dpdp-exposure-assessment" className={linkClass}>
                  DPDP exposure assessment
                </Link>{" "}
                scores breach readiness and vendor accountability in under six minutes.
              </p>
            </section>

            <section className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">If your answers show gaps</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Start with an assessment. It runs two to four weeks at a fixed price, and you own the
                output whether or not you carry on with us.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-indigo-800"
              >
                Start with an assessment
              </Link>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Related</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/insights/nist-ai-rmf-starter-profile" className={linkClass}>NIST AI RMF starter profile</Link>
                </li>
                <li>
                  <Link href="/insights/ai-use-case-register" className={linkClass}>AI use case register template</Link>
                </li>
                <li>
                  <Link href="/services/integration" className={linkClass}>Integration</Link>
                </li>
                <li>
                  <Link href="/services/ai-governance-and-adoption" className={linkClass}>AI governance and adoption</Link>
                </li>
              </ul>
            </section>

            <section id="sources" className="mt-14 pt-10 border-t border-slate-200 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sources</h2>
              <ul className="space-y-5">
                {SOURCES.map((source) => (
                  <li key={source.href}>
                    {source.href.startsWith("/") ? (
                      <Link href={source.href} className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm">
                        {source.label}
                      </Link>
                    ) : (
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm"
                      >
                        {source.label}
                      </a>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{source.note}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 leading-relaxed mt-8">
                This is a management checklist, not legal advice or a security audit, and it does not
                test your systems. Dates and figures verified on {PUBLISHED_DISPLAY}.
              </p>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-indigo-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">If your answers show gaps</h3>
                <p className="text-sm mb-4 opacity-90 leading-relaxed">
                  A fixed price assessment over two to four weeks. You own the output whether or not you
                  carry on with us.
                </p>
                <Link
                  href="/contact"
                  className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
                >
                  Start with an assessment
                </Link>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">The five areas</h4>
                <div className="space-y-2">
                  {SECTIONS.map((section) => (
                    <a key={section.id} href={`#${section.id}`} className="block text-sm text-indigo-600 hover:underline">
                      {section.title}
                    </a>
                  ))}
                </div>
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
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
