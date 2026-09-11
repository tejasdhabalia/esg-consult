import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import DpdpExposureTool from "./DpdpExposureTool";

/*
  REGULATORY CONTENT. Verified 11 September 2026.

  Every obligation referenced by this assessment commences in Phase 3, on
  13 May 2027. November 2026 is the consent manager framework and is not
  the compliance deadline, despite a great deal of published commentary
  saying otherwise.

  The commencement mapping, the penalty schedule and the primary sources
  all live on /regulatory-hub/dpdp-in-scope-and-timeline. That page is the
  single source of truth for DPDP dates. If it changes, this page and
  public/downloads/dpdp-exposure-report.pdf change with it. All three must
  agree.

  Penalty figures quoted here: INR 250 crore (security safeguards),
  INR 200 crore (breach notification, and children's data). From the
  Schedule to the DPDP Act 2023.
*/

export const metadata = pageMetadata({
  title: "DPDP exposure assessment",
  description:
    "Eighteen questions, five minutes, a straight read on where your business stands against India's DPDP obligations before they commence on 13 May 2027.",
  path: "/insights/dpdp-exposure-assessment",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When do the DPDP obligations actually start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "13 May 2027 for the obligations this assessment covers. The DPDP Rules 2025 were notified on 13 November 2025 with an eighteen month phased timetable. The twelve month mark, November 2026, commences the consent manager framework, which is a supplier category rather than a duty on your business. Notice, consent, security safeguards, breach notification, rights, retention and children's data all commence at the eighteen month mark.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a passing score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The Data Protection Board of India, the regulator created by the Act, does not score organisations and neither does anyone else. The bands here are a way of describing how much of a defence you would have if that regulator asked to see your process, and the useful output is the named gaps rather than the number. Most mid-market companies that have not started land in the high exposure band, which is an accurate reading rather than a scare.",
      },
    },
    {
      "@type": "Question",
      name: "Does this apply to us if we are not an Indian company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you process personal data of people in India in connection with offering them goods or services, yes. The Act reaches processing outside India on that basis, so place of incorporation does not settle the question. A company registered anywhere that runs a signup flow, a support desk or a payment page serving people in India is within scope.",
      },
    },
    {
      "@type": "Question",
      name: "How is the score weighted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By consequence rather than by question count. Breach readiness and vendor accountability carry more weight because the penalty ceilings behind them are higher: up to INR 250 crore for failing to take reasonable security safeguards and up to INR 200 crore for failing to notify a breach. Two questions on record volume and platform type carry no points at all. Holding a lot of records is not a readiness failure, so those set a flag on significant data fiduciary designation instead of moving the score.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DPDP exposure assessment",
  description:
    "Interactive assessment scoring a business against India's Digital Personal Data Protection obligations across notice and consent, data principal rights, breach readiness, retention, children's data and vendor accountability.",
  url: absUrl("/insights/dpdp-exposure-assessment"),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Person",
    name: "Tejas Dhabalia",
    jobTitle: "Co-founder and Principal Consultant",
    url: absUrl("/team"),
    sameAs: site.linkedin.tejas,
  },
  publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
  dateCreated: "2026-09-11",
  dateModified: "2026-09-11",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
    { "@type": "ListItem", position: 3, name: "DPDP exposure assessment", item: absUrl("/insights/dpdp-exposure-assessment") },
  ],
};

export default function DpdpExposureAssessmentPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">DPDP exposure assessment</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Free assessment tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            How exposed is your business under India&rsquo;s DPDP Act?
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mb-8">
            Eighteen questions across six areas, in under five minutes. You get a score, a breakdown by
            area and your three biggest gaps named specifically rather than described in general terms.
          </p>
          <div className="flex items-center gap-4 text-sm text-indigo-300">
            <div className="flex items-center gap-2">
              <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={32} height={32} className="rounded-full object-cover" />
              <div>
                <div className="text-white font-medium">Tejas Dhabalia</div>
                <div className="text-indigo-400 text-xs">Co-founder, DS Consulting</div>
              </div>
            </div>
            <span>·</span>
            <span>11 September 2026</span>
            <span>·</span>
            <span>Interactive tool</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10">
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;Almost every conversation about DPDP starts with the wrong date. People have read
                that the deadline is November 2026, so they either panic about nine weeks they do not have
                or dismiss it because they think they missed nothing. The obligations commence in May 2027.
                That is eight months, which is enough time and only if the work starts with finding the
                data rather than rewriting the privacy policy.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-indigo-700">Tejas Dhabalia, Co-founder, DS Consulting</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Before you start</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There is no passing score here. The Data Protection Board of India, the regulator the Act
                creates, does not rate organisations and neither does anyone else. What this measures is how
                much of a defence you would have if it asked to see your process, and most businesses we talk
                to are further behind than they expect. That is not a failure of intent. The law rewards specific documented practices
                rather than general good intentions, and documentation is the part that gets deferred.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Answer for what is true today, not what is planned. A generous answer produces a
                comfortable score and no useful next step.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  { label: "Notice and consent", weight: "20 pts", color: "bg-indigo-100 text-indigo-700", desc: "Standalone notice, itemised purposes, affirmative consent, working withdrawal" },
                  { label: "Data principal rights", weight: "15 pts", color: "bg-slate-100 text-slate-700", desc: "Access, correction and erasure, and a named owner for requests" },
                  { label: "Breach readiness", weight: "20 pts", color: "bg-red-100 text-red-700", desc: "Written response plan, detection speed, and whether it has ever been tested" },
                  { label: "Retention and erasure", weight: "10 pts", color: "bg-slate-100 text-slate-700", desc: "Defined retention periods, and a process that actually deletes" },
                  { label: "Children's data", weight: "10 pts", color: "bg-amber-100 text-amber-700", desc: "Verifiable parental consent, and no targeted advertising to minors" },
                  { label: "Vendors and accountability", weight: "25 pts", color: "bg-red-100 text-red-700", desc: "DPDP terms in processor contracts, and someone designated as responsible" },
                ].map(({ label, weight, color, desc }) => (
                  <div key={label} className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${color}`}>{weight}</div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm mb-1">{label}</div>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-4">
                Weighting follows the penalty schedule rather than question count. Breach readiness and
                vendor accountability carry more because failing to take reasonable security safeguards
                carries a ceiling of ₹250 crore and failing to notify a breach carries ₹200 crore.
              </p>
            </div>

            <DpdpExposureTool />

            <div className="mt-14 pt-10 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Why the date matters more than the score</h2>
              <p className="text-slate-600 leading-relaxed">
                India has had a data protection law on paper since August 2023. It sat unenforced for two
                years, until the DPDP Rules 2025 were notified on 13 November 2025 with an eighteen month
                phased timetable behind them.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A great deal of published guidance reports that the substantive obligations land at the
                twelve month mark, in November 2026. They do not. November 2026 commences the consent
                manager framework, which creates a registered class of intermediary that individuals can
                use to manage consent across many companies at once. Everything this assessment asks about
                commences at the eighteen month mark, on 13 May 2027.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The practical consequence is that you have roughly eight months rather than two, and also
                that any adviser quoting you the November date has not read the commencement notification.
                The full breakdown of what commences when, with the primary sources, is on the{" "}
                <Link
                  href="/regulatory-hub/dpdp-in-scope-and-timeline"
                  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                >
                  DPDP commencement timeline
                </Link>{" "}
                page.
              </p>
              <p className="text-slate-600 leading-relaxed">
                One caveat worth carrying. The government has been reported as considering a shorter
                compliance timeline than the eighteen months notified. Nothing has been formally amended,
                so plan against May 2027 and treat an earlier date as a risk.
              </p>
            </div>

            <div className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                  <div key={i}>
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sources</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Both primary. Secondary summaries of this timetable disagree with each other, which is why
                this assessment carries its own date rather than borrowing one.
              </p>
              <ul className="space-y-5">
                <li>
                  <a
                    href="https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2190014"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm"
                  >
                    Government notifies DPDP Rules to empower citizens and protect privacy
                  </a>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Press Information Bureau, Ministry of Electronics and Information Technology,
                    14 November 2025. Source for the eighteen month phased timetable, the standalone
                    itemised notice requirement and the ninety day response window for rights requests.
                  </p>
                </li>
                <li>
                  <a
                    href="https://www.meity.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm"
                  >
                    Ministry of Electronics and Information Technology
                  </a>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Publisher of the DPDP Act 2023, the DPDP Rules 2025 and the commencement notifications.
                    The penalty ceilings quoted in this assessment come from the Schedule to the Act.
                  </p>
                </li>
              </ul>
              <p className="text-xs text-slate-500 leading-relaxed mt-6">
                Dates and figures verified 11 September 2026. This is a management tool and not legal
                advice.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-indigo-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">The commencement timeline</h3>
                <p className="text-sm mb-4 opacity-90 leading-relaxed">
                  Three phases, and the one most commentary gets wrong. What is in force now, what
                  November 2026 actually brings, and what commences on 13 May 2027.
                </p>
                <Link
                  href="/regulatory-hub/dpdp-in-scope-and-timeline"
                  className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
                >
                  Read the timeline
                </Link>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related services</h4>
                <div className="space-y-2">
                  <Link href="/services/crm-and-revenue-operations" className="block text-sm text-indigo-600 hover:underline">
                    CRM and revenue operations →
                  </Link>
                  <Link href="/services/integration" className="block text-sm text-indigo-600 hover:underline">
                    Integration →
                  </Link>
                  <Link href="/services/ai-governance-and-adoption" className="block text-sm text-indigo-600 hover:underline">
                    AI governance and adoption →
                  </Link>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related insights</h4>
                <div className="space-y-3">
                  <Link href="/insights/ai-use-case-register" className="block group">
                    <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">AI use case register →</span>
                    <span className="block text-xs text-slate-500">Where AI meets the personal data question</span>
                  </Link>
                  <Link href="/insights/nist-ai-rmf-starter-profile" className="block group">
                    <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">NIST AI RMF starter profile →</span>
                    <span className="block text-xs text-slate-500">The governance operating model around it</span>
                  </Link>
                  <Link href="/insights/crm-governance-checklist" className="block group">
                    <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">CRM governance checklist →</span>
                    <span className="block text-xs text-slate-500">Most personal data sits in the CRM</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
