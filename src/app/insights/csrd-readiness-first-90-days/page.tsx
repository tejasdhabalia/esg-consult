import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import ChecklistDownloadForm from "@/components/ChecklistDownloadForm";

export const metadata = pageMetadata({
  title: "CSRD readiness: the first 90 days",
  description:
    "A practical checklist for CFOs and sustainability leaders preparing for their first CSRD reporting cycle. Scoping, double materiality, data, assurance.",
  path: "/insights/csrd-readiness-first-90-days",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the first thing leadership should confirm for CSRD readiness?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The first step is to confirm whether the entity is in scope, identify the first reporting year, determine which group entities are covered, and clarify whether any subsidiary exemption applies. Without that scoping decision, the rest of the programme will drift.",
      },
    },
    {
      "@type": "Question",
      name: "Why is double materiality central to CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Double materiality is the conceptual core of CSRD. Companies must assess both their impacts on sustainability matters and the effect of sustainability-related risks and opportunities on financial performance. It must be systematic, evidence-based, and documented with stakeholder input.",
      },
    },
    {
      "@type": "Question",
      name: "What does assurance readiness mean under CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assurance readiness means being able to show an auditor how every number and disclosure was prepared, including source data, methodology, controls, approvals, and evidence trails. It is not enough to have the number; the process behind it must also be defensible.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CSRD Readiness Checklist",
  description:
    "What CFOs and CSOs need to confirm before their first reporting cycle under the Corporate Sustainability Reporting Directive.",
  author: {
    "@type": "Person",
    name: "Jigar Dhabalia",
    jobTitle: "Co-founder",
    url: absUrl("/team"),
    sameAs: site.linkedin.jigar,
  },
  publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
  url: absUrl("/insights/csrd-readiness-first-90-days"),
  datePublished: "2026-03-11",
  dateModified: "2026-03-11",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
    { "@type": "ListItem", position: 3, name: "CSRD Readiness Checklist", item: absUrl("/insights/csrd-readiness-first-90-days") },
  ],
};

const CHECKLIST_SECTIONS = [
  {
    id: "scoping",
    title: "Section 1: Scoping and applicability",
    color: "bg-indigo-50 border-indigo-200",
    accentColor: "text-indigo-700",
    items: [
      {
        item: "Confirmed your entity falls within CSRD scope and identified your first reporting year.",
        detail:
          "Large companies: FY2024. Listed SMEs: FY2026 with opt-out to FY2028. Scope determination must be confirmed early, not assumed later.",
      },
      {
        item: "Identified which group entities are in scope and which consolidation approach applies.",
        detail:
          "CSRD uses a group-level logic. The parent may report for subsidiaries unless exemptions apply. This must be understood before workstreams begin.",
      },
      {
        item: "Determined whether you qualify for the subsidiary exemption.",
        detail:
          "A subsidiary can be exempt if the parent publishes a group sustainability report covering that subsidiary. Document the basis clearly.",
      },
      {
        item: "Confirmed your financial year and the statutory deadline for your first disclosure.",
        detail:
          "CSRD reporting sits alongside the management report and follows the same filing logic. Timelines must be aligned from the start.",
      },
      {
        item: "Identified the competent authority responsible for CSRD oversight in your jurisdiction.",
        detail:
          "Enforcement and oversight vary by EU member state. You need clarity on who will supervise and enforce compliance.",
      },
      {
        item: "Engaged your statutory auditor on the assurance scope and timeline.",
        detail:
          "Limited assurance is required from the first cycle. Waiting too long to engage the auditor creates avoidable delivery risk.",
      },
    ],
  },
  {
    id: "double-materiality",
    title: "Section 2: Double materiality assessment",
    color: "bg-slate-50 border-slate-200",
    accentColor: "text-slate-700",
    intro:
      "Double materiality is the conceptual core of CSRD. You must assess both your impact on sustainability matters and their effect on your financial performance independently, systematically, and with evidence.",
    items: [
      {
        item: "A double materiality assessment process has been designed and documented.",
        detail:
          "The process must be systematic, evidence-based, and repeatable. Ad hoc assessments will not satisfy leadership or auditors.",
      },
      {
        item: "Impact materiality: identified actual and potential impacts across the value chain.",
        detail:
          "This requires mapping operations, supply chain, and downstream activities against relevant ESRS topic areas.",
      },
      {
        item: "Financial materiality: identified sustainability-related risks and opportunities with financial relevance.",
        detail:
          "Use the existing risk register as a starting point, but explicitly connect each risk or opportunity to CSRD and ESRS topics.",
      },
      {
        item: "Stakeholder consultation has been conducted and documented.",
        detail:
          "You need evidence of who was consulted, when they were consulted, and how their input influenced the assessment.",
      },
      {
        item: "Material topics have been mapped to the relevant ESRS disclosure requirements.",
        detail:
          "A material topic does not automatically require every disclosure in that standard. Materiality determines the reporting scope.",
      },
      {
        item: "The materiality outcomes have been reviewed and approved at board or executive committee level.",
        detail:
          "Leadership involvement is a governance requirement, not just a project management preference.",
      },
    ],
  },
  {
    id: "data-governance",
    title: "Section 3: Data governance and collection",
    color: "bg-amber-50 border-amber-200",
    accentColor: "text-amber-700",
    items: [
      {
        item: "A data owner has been assigned for each material ESRS KPI.",
        detail:
          "Data ownership is the most important governance decision. Without named owners, collection quality and accountability will break down.",
      },
      {
        item: "A data collection template exists for each KPI, including methodology, calculation rules, and source.",
        detail:
          "Templates must be precise enough that another person could follow them and produce the same number.",
      },
      {
        item: "GHG emissions data collection covers Scope 1, Scope 2, and material Scope 3 categories.",
        detail:
          "Scope 3 coverage should be determined through materiality, with all 15 categories assessed before exclusions are made.",
      },
      {
        item: "The GHG calculation methodology is documented and aligned to GHG Protocol or ISO 14064.",
        detail:
          "Auditors will ask for the methodology. It cannot live only in one person's head or in an undocumented spreadsheet logic.",
      },
      {
        item: "Data quality controls are in place: validation rules, reasonableness checks, and exception handling.",
        detail:
          "The evidence trail must show that controls were actually applied, not merely described in policy.",
      },
      {
        item: "The data collection timeline is aligned to your financial close process.",
        detail:
          "If sustainability data cannot meet the annual reporting deadline, the whole reporting cycle becomes fragile.",
      },
      {
        item: "A value chain data collection approach has been designed for material Scope 3 categories.",
        detail:
          "Primary supplier data is preferred. Where estimates are used, the methodology must be documented and defensible.",
      },
    ],
  },
  {
    id: "governance-controls",
    title: "Section 4: Governance structure and controls",
    color: "bg-emerald-50 border-emerald-200",
    accentColor: "text-emerald-700",
    items: [
      {
        item: "Board-level sustainability governance is documented: roles, responsibilities, and oversight frequency.",
        detail:
          "You cannot disclose governance credibly unless the governance structure already exists and is documented.",
      },
      {
        item: "A sustainability reporting team has been identified with clear ownership of the reporting process.",
        detail:
          "This usually spans finance, legal, operations, and sustainability. Reporting cannot sit inside one team alone.",
      },
      {
        item: "An internal review process exists for sustainability disclosures before publication.",
        detail:
          "Review steps, approval checkpoints, and sign-off responsibilities should be documented before the first cycle.",
      },
      {
        item: "Evidence trails are maintained for all material KPIs: source data, calculations, and approvals.",
        detail:
          "A reviewer should be able to trace any published number back to its original source without depending on the preparer being present.",
      },
      {
        item: "A CSRD disclosure calendar has been created covering data collection, review, and filing milestones.",
        detail:
          "Work backward from the filing deadline. Most organisations underestimate the time needed for review and revision loops.",
      },
      {
        item: "Legal have reviewed the disclosure requirements and confirmed the report format and filing mechanism.",
        detail:
          "CSRD may require XHTML and iXBRL tagging under ESEF obligations. Format and filing requirements need early legal confirmation.",
      },
    ],
  },
  {
    id: "assurance-readiness",
    title: "Section 5: Assurance readiness",
    color: "bg-violet-50 border-violet-200",
    accentColor: "text-violet-700",
    intro:
      "CSRD requires limited assurance from the first reporting cycle. Assurance readiness means being able to show an auditor how you got to each number, not just that the number exists.",
    items: [
      {
        item: "Your statutory auditor has been briefed on CSRD assurance scope and has confirmed capability.",
        detail:
          "Not all firms are equally prepared for CSRD assurance. Confirm capability and approach early.",
      },
      {
        item: "A pre-assurance readiness review has been scheduled internally or with an advisory firm.",
        detail:
          "A dry run before the formal assurance cycle is one of the highest-value ways to surface gaps early.",
      },
      {
        item: "All data collection processes, controls, and evidence trails are documented in a form an auditor can review.",
        detail:
          "Documentation for internal operations and documentation for assurance are not the same. Prepare for external review standards.",
      },
      {
        item: "Your narrative disclosures are aligned to your quantitative KPIs with no inconsistencies.",
        detail:
          "Narrative claims that cannot be supported by the data will immediately create assurance friction.",
      },
      {
        item: "A policy register exists covering all CSRD-relevant policies across environmental, social, and governance topics.",
        detail:
          "Policies should be approved, dated, current, and accessible. If they do not exist yet, they need to be created before the reporting cycle begins.",
      },
    ],
  },
];

export default function CSRDReadinessChecklistPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">CSRD Readiness Checklist</span>
          </nav>

          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Downloadable Checklist
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            CSRD Readiness Checklist
          </h1>
          <p className="text-lg text-indigo-200 max-w-3xl mb-8">
            What CFOs and CSOs need to confirm before their first reporting cycle under the
            Corporate Sustainability Reporting Directive.
          </p>

          <div className="flex items-center gap-4 text-sm text-indigo-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-sm">J</div>
              <div>
                <div className="text-white font-medium">Jigar Dhabalia</div>
                <div className="text-indigo-400 text-xs">Co-founder, DS Consulting</div>
              </div>
            </div>
            <span>·</span>
            <span>11 March 2026</span>
            <span>·</span>
            <span>12 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10">
              <h2 className="text-base font-bold text-slate-900 mb-3">A note on how to use this checklist</h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                CSRD is not a reporting exercise. It is a governance transformation. The organisations
                that will struggle most are those that treat it as a compliance deadline rather than
                a systems build. This checklist is designed to help leadership teams identify where
                their readiness gaps are before the first disclosure cycle, not after.
              </p>
            </div>
			<div className="mb-10">
			  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why this matters</h2>
			  <p className="text-slate-600 leading-relaxed mb-4">
				According to{" "}
				<a
				  href="https://www.pwc.com/gx/en/issues/esg/global-sustainability-reporting-survey.html?utm_source=www.consult-ds.com"
				  target="_blank"
				  rel="noreferrer"
				  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
				>
				  PwC&apos;s Global Sustainability Reporting Survey 2025
				</a>
				, more than half of respondents say internal and external pressure to provide sustainability
				data and insights has increased over the last year, while more than two-thirds of companies
				already reporting under CSRD or ISSB say they are seeing significant or moderate value beyond
				compliance from the data gathered through the reporting process.
			  </p>
			  <p className="text-slate-600 leading-relaxed mb-4">
				This is reinforced by the{" "}
				<a
				  href="https://www.efrag.org/sites/default/files/media/document/2025-12/Cost-benefit%20Analysis%20on%20Draft%20Amended%20ESRS.pdf?utm_source=consult-ds.com"
				  target="_blank"
				  rel="noreferrer"
				  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
				>
				  Cost-benefit Analysis on Draft Amended ESRS by EFRAG
				</a>
				, which estimates first-year ESRS implementation costs at EUR 287,000 for companies below
				10,000 employees and EUR 1.97 million for those above that threshold, with assurance costs
				alone reaching EUR 115,000 and EUR 1 million respectively. The same analysis also notes that
				indirect assurance costs can add a further 15-25% on top of auditors&apos; fees due to the
				absence of harmonised European assurance guidance.
			  </p>
			  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
				<p className="text-sm text-amber-900">
				  <strong>Note:</strong> DS Consulting does not provide statutory audit or assurance.
				  This checklist is for governance preparation purposes only.
				</p>
			  </div>
			</div>
            

            <div className="space-y-8">
              {CHECKLIST_SECTIONS.map((section) => (
                <div key={section.id} className={`rounded-2xl border p-6 ${section.color}`}>
                  <h3 className={`text-base font-bold mb-4 ${section.accentColor}`}>{section.title}</h3>
                  {"intro" in section && section.intro ? (
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{section.intro}</p>
                  ) : null}
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

            <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Your next step</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                If fewer than 70% of these items are confirmed, your organisation carries material
                assurance risk in its first CSRD reporting cycle. The items in Section 3 and Section 5
                have the longest lead times and should be prioritised first.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                DS Consulting helps leadership teams close these gaps through advisory and implementation:
                scoping, data governance design, evidence trail build, and assurance readiness preparation.
                We do not provide statutory audit or assurance services.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                To discuss your situation, book a diagnostic at{" "}
                <Link href="/contact" className="text-white underline underline-offset-4">
                  consult-ds.com/contact
                </Link>{" "}
                or write to{" "}
                <a href={`mailto:${site.emails.general}`} className="text-white underline underline-offset-4">
                  {site.emails.general}
                </a>
                .
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Common questions</h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map(
                  (faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                    <div key={i} className="border-b border-slate-100 pb-6">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.name}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-12 bg-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Get the PDF checklist</h3>
              <p className="text-indigo-200 text-sm mb-4">
                Download the full CSRD Readiness Checklist as a PDF for internal review,
                leadership alignment, and readiness workshops.
              </p>
              <ChecklistDownloadForm checklistType="csrd" theme="dark" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-base flex-shrink-0">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">Jigar Dhabalia</div>
                    <div className="text-xs text-slate-500 mb-2">Co-founder, DS Consulting</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ESG reporting and governance advisor focused on CSRD readiness,
                      data governance, evidence trails, and assurance preparation.
                    </p>
                    <a
                      href={site.linkedin.jigar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-indigo-600 hover:underline"
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related links</h4>
                <div className="space-y-2">
                  <Link
                    href="/services/esg-advisory/csrd-advisory"
                    className="block text-sm text-indigo-600 hover:underline"
                  >
                    CSRD advisory →
                  </Link>
                  <Link
                    href="/regulatory-hub/csrd-double-materiality-and-esrs-mapping"
                    className="block text-sm text-indigo-600 hover:underline"
                  >
                    Double materiality and ESRS mapping →
                  </Link>
                  <Link
                    href="/regulatory-hub/csrd-in-scope-and-timeline"
                    className="block text-sm text-indigo-600 hover:underline"
                  >
                    CSRD in scope and timeline →
                  </Link>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-2">Need to discuss your first cycle?</h4>
                <p className="text-xs text-slate-600 mb-3">
                  If your team is still defining scope, ownership, controls, and evidence trails,
                  start with a diagnostic conversation.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white no-underline text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Discuss CSRD readiness
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}