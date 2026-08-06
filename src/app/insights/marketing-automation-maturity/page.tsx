import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import MaturityTool from "./MaturityTool";

export const metadata = pageMetadata({
  title: "Marketing automation maturity scorecard",
  description:
    "Score your marketing automation against top-quartile benchmarks across data, platform, governance and attribution. Free interactive tool from DS Consulting.",
  path: "/insights/marketing-automation-maturity",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is marketing automation maturity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marketing automation maturity describes how systematically a team manages automation across data quality, platform integration, governance controls, and revenue measurement. Reactive teams run ad hoc campaigns with no change control. Optimised teams operate governed pipelines with multi-touch attribution and structured testing.",
      },
    },
    {
      "@type": "Question",
      name: "How do I improve my marketing automation maturity score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Governance wins come faster than platform wins. Assign campaign ownership, implement a change log, and enforce naming conventions before buying additional tools. Platform investments without governance create technical debt that degrades over time.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good marketing automation maturity score for a B2B company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Top-quartile B2B teams score 75 or above across data quality, platform coverage, governance, and attribution. Most mid-market companies score between 30 and 55, with governance and attribution being the most common gaps.",
      },
    },
    {
      "@type": "Question",
      name: "Does this scorecard apply to HubSpot, Marketo, and Pardot equally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The maturity dimensions are platform-agnostic. Governance, data quality, attribution, and integration discipline apply regardless of which MAP or CRM your team runs.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  name: "Marketing Automation Maturity Scorecard",
  description: "Score your marketing automation maturity across data, platform, governance, and performance. Get your score vs top-quartile industry benchmarks in under 5 minutes.",
  author: {
    "@type": "Person",
    name: "Tejas Dhabalia",
    jobTitle: "Co-founder and Principal Consultant",
    url: absUrl("/team"),
    sameAs: site.linkedin.tejas,
  },
  publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
  url: absUrl("/insights/marketing-automation-maturity"),
  dateCreated: "2026-04-01",
  dateModified: "2026-04-01",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
    { "@type": "ListItem", position: 3, name: "Marketing Automation Maturity Scorecard", item: absUrl("/insights/marketing-automation-maturity") },
  ],
};

export default function MarketingAutomationMaturityPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">Marketing Automation Maturity Scorecard</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Free Scorecard Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Marketing Automation Maturity Scorecard
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mb-8">
            Four sections. Sixteen questions. See where your marketing automation stands against
            top-quartile industry benchmarks and get a prioritised action plan.
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
            <span>1 April 2026</span>
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
                &ldquo;Most teams confuse having a MAP with having a mature automation function.
                The scorecard below is the diagnostic I run at the start of every marketing automation engagement.
                It surfaces the governance and measurement gaps that no amount of platform investment will fix on its own.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-indigo-700">Tejas Dhabalia, Co-founder, DS Consulting</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What this scorecard measures</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Marketing automation maturity is assessed across four dimensions, each weighted by its relative
                impact on revenue performance. Data foundation carries the highest weight because every
                automation decision downstream depends on the quality of data it runs on.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {[
                  { label: "Data foundation", weight: "30%", desc: "Contact quality, unified profiles, consent, and data dictionary coverage" },
                  { label: "Platform coverage", weight: "25%", desc: "MAP, CRM, bidirectional integration, and BI layer" },
                  { label: "Automation governance", weight: "25%", desc: "Change control, naming conventions, campaign ownership, and SLAs" },
                  { label: "Performance measurement", weight: "20%", desc: "Attribution model, revenue reporting, benchmarking, and A/B testing" },
                ].map(({ label, weight, desc }) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{label}</span>
                      <span className="text-xs text-indigo-600 font-bold">{weight}</span>
                    </div>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <MaturityTool />

            <div className="mt-14 pt-10 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Why governance is the multiplier, not the platform</h2>
              <p className="text-slate-600 leading-relaxed">
                Most teams conflate marketing automation with sending scheduled emails. Mature automation is a
                different discipline. It is a governed operating model where data flows reliably between systems,
                every campaign has an accountable owner, changes are documented before deployment, and performance
                is measured against revenue contribution, not open rates.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The four dimensions in this scorecard reflect a consistent pattern across clients: governance failures
                are almost always cheaper to fix than platform failures, yet they are the last thing teams address.
                A team running HubSpot with no naming conventions and no change log will produce less revenue than a
                team running a simpler tool with tight governance.
              </p>
              <h3 className="text-lg font-bold text-slate-900">Automation without governance compounds errors</h3>
              <p className="text-slate-600 leading-relaxed">
                An undocumented workflow change triggers a downstream condition nobody can trace. A duplicate
                contact record inflates MQL counts and overstates pipeline. A missing consent flag causes a
                deliverability block that silences an entire nurture sequence for a segment.
                The remediation cost is always higher than the governance cost would have been.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Each governance item in this scorecard, change control, naming conventions, campaign ownership, SLAs,
                is a forcing function that makes every tool you already own more reliable.
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

              <div className="bg-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-base mb-2">Get the full benchmark report</h3>
                <p className="text-indigo-200 text-sm mb-4">
                  Complete the scorecard and enter your work email to receive the full PDF with industry benchmarks and a 30-day action plan.
                </p>
                <Link href="#scorecard" className="block w-full bg-white text-indigo-700 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-indigo-50 text-center">
                  Take the scorecard
                </Link>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Tejas Dhabalia</div>
                    <div className="text-xs text-slate-500 mb-2">Co-founder, DS Consulting</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Former IBM mainframe engineer turned CMO-level marketing operator. Built customer
                      intelligence and CRM systems at Tata-Tesco. Co-founder of DS Consulting.
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
                    { label: "CRM Architecture and Governance", href: "/services/crm-and-revenue-operations/crm-architecture-governance" },
                    { label: "Lifecycle and Lead Management",   href: "/services/crm-and-revenue-operations/lifecycle-lead-management" },
                    { label: "Revenue Analytics",              href: "/services/crm-and-revenue-operations/revenue-analytics" },
                    { label: "Marketing Automation Services",  href: "/services/crm-and-revenue-operations" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">{link.label} →</Link>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related tools</h4>
                <div className="space-y-3">
                  {[
                    { label: "Leaky Funnel Audit",            href: "/insights/leaky-funnel-audit",            desc: "Quantify your monthly revenue leakage" },
                    { label: "Revenue Attribution Readiness", href: "/insights/revenue-attribution-readiness", desc: "Can marketing prove its contribution?" },
                    { label: "AI Marketing Readiness",        href: "/insights/ai-marketing-readiness",        desc: "Is your stack ready for AI?" },
                    { label: "CRM Governance Checklist",      href: "/insights/crm-governance-checklist",      desc: "Practitioner SOP template" },
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
