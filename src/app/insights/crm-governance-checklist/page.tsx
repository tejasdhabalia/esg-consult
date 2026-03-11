import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import ChecklistDownloadForm from "@/components/ChecklistDownloadForm";

export const metadata = {
  title: `The CRM Governance SOP Template | ${site.legalName}`,
  description:
    "A practitioner checklist for teams who are done with dirty data, broken dashboards, and pipeline numbers that do not match reality. Written by Tejas Dhabalia, Co-founder of DS Consulting.",
  alternates: { canonical: absUrl("/insights/crm-governance-checklist") },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a CRM governance SOP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A CRM governance SOP (Standard Operating Procedure) is a documented operating model that defines who owns each data object, how fields are created and named, what change control process applies to automation and workflow changes, how lifecycle stages are defined, and how reporting definitions are locked and maintained. Without it, CRM data degrades within 12 to 18 months of go-live regardless of platform.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my CRM governance is broken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The symptoms are consistent: leadership cannot agree on a single pipeline number, marketing and sales use different definitions of a qualified lead, dashboards require manual reconciliation before every board meeting, duplicate records grow faster than they are cleaned, and new automation creates unintended consequences nobody can trace.",
      },
    },
    {
      "@type": "Question",
      name: "Does this checklist apply to HubSpot and Dynamics, or only Salesforce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The governance principles apply to any CRM platform. The terminology in this checklist is platform-agnostic. Whether you run Salesforce, HubSpot, Microsoft Dynamics, or a combination, the same data model discipline, change control, and lifecycle governance is required.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The CRM Governance SOP Template",
  description:
    "A practitioner checklist for teams who are done with dirty data, broken dashboards, and pipeline numbers that do not match reality.",
  author: {
    "@type": "Person",
    name: "Tejas Dhabalia",
    jobTitle: "Co-founder and Principal Consultant",
    url: absUrl("/team"),
    sameAs: site.linkedin.tejas,
  },
  publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
  url: absUrl("/insights/crm-governance-checklist"),
  datePublished: "2025-01-10",
  dateModified: "2025-01-10",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
    { "@type": "ListItem", position: 3, name: "CRM Governance Checklist", item: absUrl("/insights/crm-governance-checklist") },
  ],
};

const CHECKLIST_SECTIONS = [
  {
    id: "data-model",
    title: "Section 1: Data model and taxonomy",
    color: "bg-indigo-50 border-indigo-200",
    accentColor: "text-indigo-700",
    items: [
      {
        item: "Define a single owner for each core object: Lead, Contact, Account, Opportunity.",
        detail: "Ownership means accountability for field standards, required fields, and data quality within that object — not just admin access.",
      },
      {
        item: "Publish a field glossary with approved definitions for all fields used in reporting.",
        detail: "Include: field name, object, definition, who populates it, and acceptable values. A field without a definition is a liability.",
      },
      {
        item: "Agree on a single definition of 'qualified lead' across marketing, sales, and RevOps — in writing.",
        detail: "Store it in the CRM description field and your internal wiki. If it is not written down, it does not exist.",
      },
      {
        item: "Set required fields at each lifecycle stage transition.",
        detail: "A lead should not be able to move to MQL without meeting defined criteria. Enforce this in the platform, not just in policy.",
      },
      {
        item: "Document and enforce a naming convention for all custom fields.",
        detail: "Example: [Team]_[Category]_[Descriptor]. The convention must be enforced before any new field is created, not retroactively.",
      },
    ],
  },
  {
    id: "lifecycle",
    title: "Section 2: Lifecycle stage governance",
    color: "bg-slate-50 border-slate-200",
    accentColor: "text-slate-700",
    items: [
      {
        item: "Document every lifecycle stage with entry criteria, exit criteria, and an SLA.",
        detail: "Entry: what must be true to enter. Exit: what triggers movement. SLA: how long a record can sit before escalation is triggered.",
      },
      {
        item: "Implement automated stage-move rules where the criteria are objective.",
        detail: "Manual stage movement is the leading cause of stage drift and reporting unreliability. Automate what can be automated.",
      },
      {
        item: "Define what happens to a record when it fails to progress past SLA.",
        detail: "Recycle to nurture, reassign, or disqualify — it must be documented, automated, and owned.",
      },
      {
        item: "Set up a weekly stage health report: volume, velocity, and SLA adherence by stage.",
        detail: "This report should go to the revenue leadership team without prompting. If it requires manual assembly, it will not survive.",
      },
      {
        item: "Document lead routing rules by geography, segment, account size, and product line.",
        detail: "Routing exceptions must also be documented. Unrouted leads are invisible leads — they exist in your system but not in anyone's accountability.",
      },
    ],
  },
  {
    id: "change-control",
    title: "Section 3: Change control",
    color: "bg-amber-50 border-amber-200",
    accentColor: "text-amber-700",
    items: [
      {
        item: "No new custom field created without a written request stating the business use case.",
        detail: "Include: requestor, use case, reporting dependency, field owner, approval sign-off. A field request is a data model change.",
      },
      {
        item: "All workflow and automation changes logged in a change register before deployment to production.",
        detail: "Log: change description, expected impact, deployment date, owner, and rollback plan. No exceptions for 'quick fixes.'",
      },
      {
        item: "A sandbox environment exists and all changes are tested there before production.",
        detail: "Zero-day production changes are not acceptable for any workflow that touches revenue data or reporting.",
      },
      {
        item: "A quarterly audit of unused fields, inactive workflows, and orphaned records.",
        detail: "CRM entropy compounds. Without scheduled cleanup, technical debt becomes a migration project within three years.",
      },
      {
        item: "A named admin owns the CRM change control process.",
        detail: "This does not require a full-time role. It requires a named, accountable person. Shared ownership means no ownership.",
      },
    ],
  },
  {
    id: "measurement",
    title: "Section 4: Measurement and reporting governance",
    color: "bg-emerald-50 border-emerald-200",
    accentColor: "text-emerald-700",
    items: [
      {
        item: "Publish a single metric definition document that all teams sign off on.",
        detail: "Include: MQL, SQL, SAL, Opportunity, Win Rate, CAC, LTV, Churn — and the exact CRM logic behind each definition.",
      },
      {
        item: "All executive dashboards source from the same CRM reports, not from manual exports.",
        detail: "If the CEO's pipeline number differs from the CRO's, you have a governance problem, not a data problem.",
      },
      {
        item: "Finance and CRM pipeline reconciliation happens monthly, not quarterly.",
        detail: "The further apart these reconciliations happen, the larger the discrepancy becomes, and the harder it is to trace.",
      },
      {
        item: "All attribution rules are documented, versioned, and approved before any model change.",
        detail: "Changing attribution methodology mid-year without documentation makes all historical comparison invalid.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Section 5: Integrations and data flows",
    color: "bg-violet-50 border-violet-200",
    accentColor: "text-violet-700",
    items: [
      {
        item: "Document every integration: source system, destination system, sync frequency, and field mapping.",
        detail: "If you cannot draw a complete data flow diagram in 30 minutes, you do not have enough documentation.",
      },
      {
        item: "Identify the system of record for each data type: contact data, account data, deal data.",
        detail: "Two systems cannot both be the source of truth for the same field. Decide once, document it, enforce it.",
      },
      {
        item: "Set up integration error monitoring with named ownership and a response SLA.",
        detail: "Silent sync failures are the most dangerous category of data quality problem. By the time someone notices, months of data may be corrupt.",
      },
      {
        item: "Map the data flow from web form to CRM to MAP to finance for your top three lead sources.",
        detail: "Gaps in this map are where leads disappear without anyone knowing. These gaps are invisible by definition until you look.",
      },
    ],
  },
];

export default function CRMGovernanceChecklistPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">CRM Governance Checklist</span>
          </nav>

          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Downloadable Checklist
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            The CRM Governance SOP Template
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mb-8">
            A practitioner checklist for teams who are done with dirty data, broken dashboards,
            and pipeline numbers that do not match reality.
          </p>

          <div className="flex items-center gap-4 text-sm text-indigo-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-sm">T</div>
              <div>
                <div className="text-white font-medium">Tejas Dhabalia</div>
                <div className="text-indigo-400 text-xs">Co-founder, DS Consulting</div>
              </div>
            </div>
            <span>·</span>
            <span>10 January 2025</span>
            <span>·</span>
            <span>12 min read</span>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Author intro */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10">
              <p className="text-slate-700 text-sm leading-relaxed italic">
                "I have spent fifteen years inside marketing ops and RevOps functions at Deloitte, Tesco, Tata, and Godrej.
                The single most consistent failure I saw was not tool selection. It was governance. Teams would invest in Salesforce or HubSpot,
                spend six months configuring it, and then watch it degrade within a year because nobody owned the data model,
                nobody controlled field creation, and nobody could agree on what a qualified lead actually meant.
                This checklist is the operating model I use when I start a CRM governance engagement."
              </p>
              <p className="mt-3 text-sm font-semibold text-indigo-700">— Tejas Dhabalia, Co-founder, DS Consulting</p>
            </div>

            {/* Stats context */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why this matters</h2>
              <p className="text-slate-600 leading-relaxed">
                Recent{" "}
                <a
                  href="https://www.ibm.com/thought-leadership/institute-business-value/report/2025-cdo?utm_source=www.consult-ds.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                >
                  IBM’s 2025–2026 research
                </a>{" "}
                shows that poor data quality is still a major commercial risk. IBM says more than a quarter of
                organizations now estimate annual losses of over USD 5 million from poor data quality, while{" "}
                <a
                  href="https://www.salesforce.com/marketing/resources/state-of-marketing-report/?utm_source=www.consult-ds.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                >
                  Salesforce reports
                </a>{" "}
                that siloed systems and poor data quality remain the top barriers to AI-driven personalization.
                At the execution level, only one in four marketers are satisfied with how they use data for
                personalized engagement, and{" "}
                <a
                  href="https://www.validity.com/resource-center/the-state-of-crm-data-management-in-2025/?utm_source=www.consult-ds.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                >
                  Validity
                </a>{" "}
                found that 76% of CRM users say less than half of their CRM data is accurate and complete.
                This checklist is the operating model I use when I start a CRM governance engagement. It is the
                minimum you need to stop the bleeding and build something sustainable.
              </p>
            </div>

            {/* Checklist sections */}
            <div className="space-y-8">
              {CHECKLIST_SECTIONS.map((section) => (
                <div key={section.id} className={`rounded-2xl border p-6 ${section.color}`}>
                  <h3 className={`text-base font-bold mb-4 ${section.accentColor}`}>{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((row, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 border-2 border-slate-400 rounded bg-white" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{row.item}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{row.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Scoring guide */}
            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">How to score yourself</h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { range: "80–100%", label: "Governed", color: "bg-emerald-500", desc: "You have a defensible operating model. Focus on maintenance and edge cases." },
                  { range: "50–79%", label: "At risk", color: "bg-amber-500", desc: "Visible gaps that will compound. Prioritise Sections 3 and 4 first." },
                  { range: "Under 50%", label: "Leaking", color: "bg-red-500", desc: "Revenue is leaking and you cannot see it. This is the most common state." },
                ].map((band) => (
                  <div key={band.range} className="bg-white/10 rounded-xl p-4">
                    <div className={`text-lg font-bold ${band.color.replace("bg-", "text-")} mb-1`}>{band.range}</div>
                    <div className="font-semibold mb-2">{band.label}</div>
                    <p className="text-sm text-slate-300">{band.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-300 text-sm">
                If you scored below 60%, the gaps in Sections 3 and 5 have the longest remediation lead times.
                Start there before investing in new automation or AI capabilities.
              </p>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common questions</h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq: {name: string; acceptedAnswer: {text: string}}, i: number) => (
                  <div key={i} className="border-b border-slate-100 pb-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              {/* Download CTA */}
              <div className="bg-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Get the PDF checklist</h3>
                <p className="text-indigo-200 text-sm mb-4">
                  Download the complete CRM Governance SOP Template as a PDF — formatted for team use, with
                  fillable checkboxes and methodology notes.
                </p>
                <ChecklistDownloadForm
                  checklistType="crm"
                  theme="dark"
                />
              </div>

              {/* Author card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-base flex-shrink-0">T</div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Tejas Dhabalia</div>
                    <div className="text-xs text-slate-500 mb-2">Co-founder, DS Consulting</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Marketing Ops and MarTech leader. Former Deloitte, Tata, Tesco, and Godrej.
                      Specialises in CRM governance, lifecycle orchestration, and revenue operations.
                    </p>
                    <a
                      href={site.linkedin.tejas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-indigo-600 hover:underline"
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related services</h4>
                <div className="space-y-2">
                  {[
                    { label: "CRM Architecture and Governance", href: "/services/marketing-automation/crm-architecture-governance" },
                    { label: "Lifecycle and Lead Management", href: "/services/marketing-automation/lifecycle-lead-management" },
                    { label: "Revenue Analytics", href: "/services/marketing-automation/revenue-analytics" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-indigo-600 hover:underline"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>

              {/* Audit tool CTA */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
				  <h4 className="font-semibold text-slate-900 text-sm mb-2">Not sure where you stand?</h4>
				  <p className="text-xs text-slate-600 mb-3">
					Take the Leaky Funnel Audit to get your Revenue Visibility Score in under 5 minutes.
				  </p>
				  <Link
					href="/insights/leaky-funnel-audit"
					className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white no-underline text-xs font-medium px-4 py-2 rounded-lg transition-colors"
				  >
					Take the audit
				  </Link>
				</div>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}