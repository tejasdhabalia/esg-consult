import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import AIReadinessTool from "./AIReadinessTool";

export const metadata = pageMetadata({
  title: "AI Marketing Readiness Assessment",
  description:
    "Find out whether your marketing data, stack and team are ready for AI. Interactive assessment covering lead scoring, personalisation and AI content.",
  path: "/insights/ai-marketing-readiness",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does AI readiness mean for a marketing team?",
      acceptedAnswer: { "@type": "Answer", text: "AI readiness means having the data quality, system integration, and governance foundations that allow AI tools to produce reliable and compliant outputs. The most common failure point is deploying AI on top of dirty or fragmented data. Output quality is bounded by input data quality." },
    },
    {
      "@type": "Question",
      name: "What is the minimum data requirement for AI lead scoring?",
      acceptedAnswer: { "@type": "Answer", text: "AI lead scoring typically requires at least six months of conversion history with several hundred positive conversion events, clean structured contact data, and a bidirectional CRM and MAP integration so scores can be operationalised in real-time workflows." },
    },
    {
      "@type": "Question",
      name: "Do I need an AI policy before using AI in marketing?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, particularly in regulated industries. An AI usage policy defines what data can be used, what outputs require human review, how AI-generated content is approved, and how model decisions are audited. The EU AI Act introduces transparency and documentation requirements for certain AI applications in marketing." },
    },
    {
      "@type": "Question",
      name: "Can IBM watsonx be used for regulated-sector marketing?",
      acceptedAnswer: { "@type": "Answer", text: "IBM watsonx is designed for enterprise and regulated-sector deployments. watsonx.governance provides model monitoring, explainability, and audit trails, making it suitable for marketing use cases in financial services, healthcare, and other environments where model decisions must be documented and defensible." },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Marketing Readiness Assessment",
  description: "Interactive assessment that evaluates whether your marketing data, stack and team are ready for AI tools. Covers lead scoring, personalisation, predictive analytics and AI content use cases.",
  url: absUrl("/insights/ai-marketing-readiness"),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
    { "@type": "ListItem", position: 3, name: "AI Marketing Readiness Assessment", item: absUrl("/insights/ai-marketing-readiness") },
  ],
};

export default function AIMarketingReadinessPage() {
  return (
    <div className="bg-white">
      <div className="bg-violet-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-violet-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-violet-100">AI Marketing Readiness Assessment</span>
          </nav>
          <div className="inline-block bg-violet-800 text-violet-200 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Free Assessment Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            AI Marketing Readiness Assessment
          </h1>
          <p className="text-lg text-violet-200 max-w-2xl mb-8">
            Before your team buys an AI tool, find out whether your data, stack, and governance are ready for it.
            Three sections covering data quality, integration, and governance, with use-case readiness for lead scoring,
            personalisation, predictive analytics, and AI content.
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
                &ldquo;The failure pattern is consistent: a team selects an AI tool, connects it to their existing CRM or MAP,
                and expects better leads, more relevant content, or sharper predictions. What they get instead is confident-sounding
                outputs that do not convert. The root cause is almost always data, not technology.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-violet-700">Tejas Dhabalia, Co-founder, DS Consulting</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The readiness framework</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                AI readiness for marketing is assessed across three dimensions, weighted by their relative impact on whether
                AI tools produce reliable and compliant outputs. Data quality receives the highest weight at 45% because
                AI output quality is directly bounded by input data quality.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  { label: "Data quality", weight: "45%", color: "bg-violet-100 text-violet-700", desc: "Contact data quality, unified profiles, behavioural data, and historical performance data" },
                  { label: "Stack integration", weight: "35%", color: "bg-slate-100 text-slate-700", desc: "API access, CRM and MAP integration, consent framework, and data governance" },
                  { label: "Team and governance", weight: "20%", color: "bg-emerald-100 text-emerald-700", desc: "Data skills, AI usage policy, change control process, and named AI owner" },
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

            <AIReadinessTool />

            <div className="mt-14 pt-10 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Why most marketing AI pilots fail</h2>
              <p className="text-slate-600 leading-relaxed">
                AI models do not know when the data they are processing is dirty, duplicated, or incomplete.
                They produce outputs based on the patterns they find. If the patterns in your data reflect
                three years of inconsistent field usage, incomplete contact records, and unmapped channel activity,
                the AI will learn those patterns and replicate them at scale.
              </p>
              <h3 className="text-lg font-bold text-slate-900">Regulated industries carry additional risk</h3>
              <p className="text-slate-600 leading-relaxed">
                In financial services, healthcare, and other regulated sectors, AI-driven marketing decisions
                must be explainable. If a lead scoring model deprioritises a contact based on behavioural signals,
                and that contact later raises a complaint, the business needs to explain what data drove that decision
                and whether it constituted fair treatment. Without model governance and audit trails, that explanation does not exist.
              </p>
              <p className="text-slate-600 leading-relaxed">
                IBM watsonx.governance is designed for exactly this context. It provides model monitoring,
                explainability, and documentation capabilities that allow regulated enterprises to deploy AI
                in marketing without creating compliance exposure.
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
                <h3 className="font-bold text-base mb-2">Get the full AI readiness report</h3>
                <p className="text-violet-200 text-sm mb-4">
                  Complete the assessment and enter your work email to receive the full PDF with implementation
                  roadmap and regulated-sector governance framework.
                </p>
                <Link href="#ai-readiness" className="block w-full bg-white text-violet-700 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-violet-50 text-center">
                  Take the assessment
                </Link>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src="/team/tejas.jpg" alt="Tejas Dhabalia" width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Tejas Dhabalia</div>
                    <div className="text-xs text-slate-500 mb-2">Co-founder, DS Consulting</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      IBM watsonx AI marketing practitioner. Former IBM mainframe engineer with hands-on AI governance
                      experience across regulated enterprise environments. Co-founder of DS Consulting.
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
                    { label: "Revenue Analytics",              href: "/services/crm-and-revenue-operations/revenue-analytics" },
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
                    { label: "Revenue Attribution Readiness",  href: "/insights/revenue-attribution-readiness",  desc: "Can marketing prove its contribution?" },
                    { label: "Leaky Funnel Audit",             href: "/insights/leaky-funnel-audit",             desc: "Quantify monthly revenue leakage" },
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
