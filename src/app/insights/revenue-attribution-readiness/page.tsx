import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import AttributionTool from "./AttributionTool";

export const metadata = pageMetadata({
  title: "Revenue attribution readiness check",
  description:
    "Can your marketing team prove its contribution to revenue? Three sections on attribution model, data connectivity and reporting, with a board-ready rating.",
  path: "/insights/revenue-attribution-readiness",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is revenue attribution in marketing?",
      acceptedAnswer: { "@type": "Answer", text: "Revenue attribution connects marketing activities to the revenue they generate. First-touch models credit the channel that acquired the contact. Multi-touch models distribute credit across the full buyer journey. Data-driven models use algorithmic weighting based on actual conversion data." },
    },
    {
      "@type": "Question",
      name: "How do I start with attribution if we have nothing in place?",
      acceptedAnswer: { "@type": "Answer", text: "Start with UTM governance: enforce consistent UTM parameters across every channel. This is the data foundation everything else depends on. Then connect your MAP and CRM bidirectionally and implement a first-touch or last-touch baseline. An imperfect model in use beats a perfect model that never ships." },
    },
    {
      "@type": "Question",
      name: "What is closed-loop attribution?",
      acceptedAnswer: { "@type": "Answer", text: "Closed-loop attribution connects marketing-sourced leads back to closed revenue. It requires sales to record disposition data in the CRM after lead handoff, and for those dispositions to feed back to marketing reporting. Without it, marketing only knows what happened to leads at handoff, not whether they became revenue." },
    },
    {
      "@type": "Question",
      name: "What does a board-ready attribution model look like?",
      acceptedAnswer: { "@type": "Answer", text: "A board-ready model has sales and finance alignment, a CRM-to-finance reconciliation process, consistent UTM coverage, and a monthly reporting cadence that surfaces CAC, ROAS, and pipeline contribution in the same report. The model does not need to be data-driven to be credible, but it must be documented and agreed on." },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  name: "Revenue Attribution Readiness Check",
  description: "A 3-step assessment that tells you whether your marketing team can prove its contribution to revenue, and what it would take to get there.",
  author: { "@type": "Person", name: "Tejas Dhabalia", jobTitle: "Co-founder and Principal Consultant", url: absUrl("/team"), sameAs: site.linkedin.tejas },
  publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
  url: absUrl("/insights/revenue-attribution-readiness"),
  dateCreated: "2026-04-01",
  dateModified: "2026-04-01",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
    { "@type": "ListItem", position: 3, name: "Revenue Attribution Readiness Check", item: absUrl("/insights/revenue-attribution-readiness") },
  ],
};

export default function RevenueAttributionReadinessPage() {
  return (
    <div className="bg-white">
      <div className="bg-slate-900 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Revenue Attribution Readiness Check</span>
          </nav>
          <div className="inline-block bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Free Readiness Check
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Revenue Attribution Readiness Check
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-8">
            Can your marketing team prove its contribution to revenue? Three sections. Fifteen questions.
            Get your attribution readiness score and a board-confidence rating.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={32} height={32} className="rounded-full object-cover" />
              <div>
                <div className="text-white font-medium">Tejas Dhabalia</div>
                <div className="text-slate-500 text-xs">Co-founder, DS Consulting</div>
              </div>
            </div>
            <span>·</span>
            <span>1 April 2026</span>
            <span>·</span>
            <span>Interactive tool</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10">
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;The failure mode is predictable. Marketing produces an MQL report. Sales disputes the lead quality.
                Finance cannot reconcile the pipeline number with closed revenue. The CMO is asked to justify the budget
                with data that nobody fully trusts. This check surfaces where the data trail breaks down.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">Tejas Dhabalia, Co-founder, DS Consulting</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What the board-confidence rating measures</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Board-level confidence in marketing attribution requires three conditions to be met simultaneously.
                Meeting two out of three still produces a disputed number in every revenue review meeting.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  { n: "1", label: "Sales alignment", desc: "The head of sales has formally agreed to how marketing contribution is measured. Without this, pipeline attribution will always be challenged." },
                  { n: "2", label: "Finance reconciliation", desc: "CRM closed revenue is reconciled against the finance system monthly. The marketing contribution number must trace to the same revenue figure the CFO uses." },
                  { n: "3", label: "Board reporting cadence", desc: "Marketing presents attribution data in board or executive meetings on a defined schedule. A model that produces data nobody sees does not change budget decisions." },
                ].map(({ n, label, desc }) => (
                  <div key={n} className="flex gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{n}</div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm mb-1">{label}</div>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AttributionTool />

            <div className="mt-14 pt-10 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Why most marketing attribution fails at the board level</h2>
              <p className="text-slate-600 leading-relaxed">
                The three most common breakdowns: UTM parameters are inconsistently applied so channel data is unreliable;
                MAP and CRM are not bidirectionally synced so activity data is lost at handoff;
                and there is no closed-loop feedback from sales, so marketing never knows what happened to the leads it generated.
              </p>
              <h3 className="text-lg font-bold text-slate-900">The CFO test</h3>
              <p className="text-slate-600 leading-relaxed">
                A useful benchmark: can your CFO trace a closed deal back to the marketing activity that sourced it?
                If the answer is no, your attribution model is incomplete regardless of how sophisticated it looks in a dashboard.
                The reconciliation between CRM pipeline and finance revenue is the final step that most teams skip,
                and the step that most directly determines whether marketing is treated as a cost centre or a growth function.
              </p>
            </div>

            <div className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((q) => (
                  <div key={q.name}>
                    <h3 className="font-semibold text-slate-900 mb-2">{q.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              <div className="bg-slate-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Get the full readiness report</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Complete the check and enter your work email to receive the full PDF with implementation roadmap and board-confidence framework.
                </p>
                <Link href="#readiness-check" className="block w-full bg-white text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-slate-100 text-center">
                  Take the check
                </Link>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Tejas Dhabalia</div>
                    <div className="text-xs text-slate-500 mb-2">Co-founder, DS Consulting</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Former IBM mainframe engineer turned CMO-level operator. Built CRM and customer intelligence
                      systems at Tata-Tesco. Hands-on attribution experience across regulated-sector B2B clients.
                    </p>
                    <a href={site.linkedin.tejas} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-indigo-600 hover:underline font-medium">
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related services</h4>
                <div className="space-y-2">
                  {[
                    { label: "Revenue Analytics",               href: "/services/crm-and-revenue-operations/revenue-analytics" },
                    { label: "CRM Architecture and Governance", href: "/services/crm-and-revenue-operations/crm-architecture-governance" },
                    { label: "Marketing Automation Services",   href: "/services/crm-and-revenue-operations" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">{link.label} →</Link>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related tools</h4>
                <div className="space-y-3">
                  {[
                    { label: "Marketing Automation Maturity",  href: "/insights/marketing-automation-maturity",  desc: "Benchmark your full automation setup" },
                    { label: "Leaky Funnel Audit",             href: "/insights/leaky-funnel-audit",             desc: "Quantify monthly revenue leakage" },
                    { label: "AI Marketing Readiness",         href: "/insights/ai-marketing-readiness",         desc: "Is your stack ready for AI?" },
                    { label: "CRM Governance Checklist",       href: "/insights/crm-governance-checklist",       desc: "Practitioner SOP template" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="block group">
                      <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">{link.label} →</span>
                      <span className="block text-xs text-slate-500">{link.desc}</span>
                    </Link>
                  ))}
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
