import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import LeakyFunnelAuditTool from "./LeakyFunnelAuditTool";

export const metadata = pageMetadata({
  title: "Leaky funnel audit",
  description:
    "Find where revenue is leaking from your funnel. Interactive audit across volumes, conversion rates, governance and stack, with a monthly leakage estimate.",
  path: "/insights/leaky-funnel-audit",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Revenue Visibility Score mean?",
      acceptedAnswer: { "@type": "Answer", text: "Revenue Visibility Score measures how confidently leadership can trust the numbers coming out of your funnel. It combines governance health, stack coverage and funnel conversion performance into a single 0-100 score. High scores mean pipeline numbers reconcile with finance, stage movement is reliable and forecast quality is defensible. Low scores mean disputed pipeline numbers, unreconciled CRM data and governance drift." },
    },
    {
      "@type": "Question",
      name: "How is the monthly revenue leakage estimate calculated?",
      acceptedAnswer: { "@type": "Answer", text: "The leakage estimate takes your current monthly revenue (leads, conversion rates and deal size) and applies a leakage percentage based on governance and stack gaps. Each unaddressed governance item contributes around 12% leakage and each stack gap contributes around 6%, capped at 60% total. These coefficients are calibrated against patterns we see in mid-market B2B engagements." },
    },
    {
      "@type": "Question",
      name: "Why weight governance higher than stack or funnel rates?",
      acceptedAnswer: { "@type": "Answer", text: "Governance problems create compounding revenue loss that tools alone cannot fix. Without a single MQL definition, routing SLAs, change control and metric ownership, every stack improvement and every conversion rate gain gets eroded by drift. Governance is weighted at 50% of the Revenue Visibility Score because it determines whether the other improvements stick." },
    },
    {
      "@type": "Question",
      name: "Is this a replacement for a full revenue operations review?",
      acceptedAnswer: { "@type": "Answer", text: "No. This audit is a diagnostic, not a remediation plan. It surfaces where the largest gaps are so leadership teams can prioritise. A full revenue operations engagement includes data audit, architecture review, governance framework design, implementation and change control. The audit is a starting point for that conversation, not a substitute." },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Leaky Funnel Audit",
  description: "Interactive audit that quantifies monthly revenue leakage from your funnel. Assesses volumes, conversion rates, governance maturity and stack coverage to produce a Revenue Visibility Score.",
  url: absUrl("/insights/leaky-funnel-audit"),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Tejas Dhabalia", jobTitle: "Co-founder and Principal Consultant", url: absUrl("/team"), sameAs: site.linkedin.tejas },
  publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
  dateCreated: "2026-04-01",
  dateModified: "2026-04-01",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
    { "@type": "ListItem", position: 3, name: "Leaky Funnel Audit", item: absUrl("/insights/leaky-funnel-audit") },
  ],
};

export default function LeakyFunnelAuditPage() {
  return (
    <div className="bg-white">
      <div className="bg-violet-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-violet-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-violet-100">Leaky Funnel Audit</span>
          </nav>
          <div className="inline-block bg-violet-800 text-violet-200 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Free Audit Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Leaky Funnel Audit
          </h1>
          <p className="text-lg text-violet-200 max-w-2xl mb-8">
            Quantify where revenue is leaking out of your funnel before the next board meeting.
            Four short steps across volumes, governance and stack, with a Revenue Visibility Score,
            an estimated monthly leakage figure and prioritised recommendations.
          </p>
          <div className="flex items-center gap-4 text-sm text-violet-300">
            <div className="flex items-center gap-2">
              <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={32} height={32} className="rounded-full object-cover" />
              <div>
                <div className="text-white font-medium">Tejas Dhabalia</div>
                <div className="text-violet-400 text-xs">Co-founder, DS Consulting</div>
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

            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 mb-10">
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;The board asks why pipeline coverage is 4x and the forecast still misses.
                The answer almost never sits in the funnel rates. It sits in the governance between them,
                the unrouted leads, the drifting MQL definition, the missing reconciliation with finance.
                That is where revenue actually leaks.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-violet-700">Tejas Dhabalia, Co-founder, DS Consulting</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The audit framework</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Revenue visibility is assessed across three dimensions, weighted by their impact on whether
                your pipeline numbers are defensible. Governance receives the highest weight at 50% because
                governance gaps compound over time and quietly erode the value of every other improvement.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  { label: "Governance health",  weight: "50%", color: "bg-violet-100 text-violet-700",  desc: "Single MQL definition, routing and SLAs, change control, dashboards, metric ownership and a named CRM owner" },
                  { label: "Funnel performance", weight: "30%", color: "bg-slate-100 text-slate-700",    desc: "Lead to MQL, MQL to SQL and SQL to Won conversion rates relative to B2B benchmarks" },
                  { label: "Stack coverage",     weight: "20%", color: "bg-emerald-100 text-emerald-700", desc: "CRM, marketing automation, BI reporting layer and a finance system link with reconciliation" },
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
            </div>

            <LeakyFunnelAuditTool />

            <div className="mt-14 pt-10 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Why funnels leak</h2>
              <p className="text-slate-600 leading-relaxed">
                Most leaky funnels are not broken at the conversion rates. They are broken at the seams.
                Leads arrive and sit unrouted. Marketing and sales disagree on what an MQL is, so handoff
                data is disputed. A CRM change goes live without a change register entry and half the pipeline
                reports quietly stop matching reality. By the time leadership asks why the number moved,
                no one can reconstruct what happened.
              </p>
              <h3 className="text-lg font-bold text-slate-900">Leakage compounds cycle over cycle</h3>
              <p className="text-slate-600 leading-relaxed">
                Each unaddressed governance gap creates a compounding cost. A missing MQL definition this
                quarter becomes drifting metric definitions next quarter, then pipeline disputes the quarter
                after that, then a forecast miss the quarter after that. The tools are usually fine.
                The problem is that nobody owns the joins between them.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The audit is designed to put a number on that cost and surface the largest gap first,
                so leadership teams can sequence the fix rather than trying to remediate everything at once.
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

              <div className="bg-violet-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Get the full audit report</h3>
                <p className="text-violet-200 text-sm mb-4">
                  Complete the audit and enter your work email to receive the full PDF with your Revenue
                  Visibility Score, leakage estimate and a prioritised 30-day action plan.
                </p>
                <Link href="#leaky-funnel-audit" className="block w-full bg-white text-violet-700 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-violet-50 text-center">
                  Run the audit
                </Link>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Tejas Dhabalia</div>
                    <div className="text-xs text-slate-500 mb-2">Co-founder, DS Consulting</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Twenty years across marketing operations, RevOps and CRM governance. Leads the
                      revenue operations practice at DS Consulting and has rebuilt funnel governance
                      for mid-market B2B and B2C teams on Salesforce, HubSpot and Dynamics.
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
                    { label: "Marketing Automation Services",   href: "/services/crm-and-revenue-operations" },
                    { label: "CRM Architecture and Governance", href: "/services/crm-and-revenue-operations/crm-architecture-governance" },
                    { label: "Revenue Analytics",               href: "/services/crm-and-revenue-operations/revenue-analytics" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">{link.label} →</Link>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related tools</h4>
                <div className="space-y-3">
                  {[
                    { label: "Revenue Attribution Readiness",  href: "/insights/revenue-attribution-readiness",  desc: "Can marketing prove its contribution?" },
                    { label: "Marketing Automation Maturity",  href: "/insights/marketing-automation-maturity",  desc: "Benchmark your full automation setup" },
                    { label: "AI Marketing Readiness",         href: "/insights/ai-marketing-readiness",         desc: "Is your stack ready for AI?" },
                    { label: "CRM Governance Checklist",       href: "/insights/crm-governance-checklist",       desc: "Practitioner SOP template" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="block group">
                      <span className="block text-sm font-medium text-slate-900 group-hover:text-violet-700">{link.label} →</span>
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
