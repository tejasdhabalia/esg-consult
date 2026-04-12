import RegulatoryHubClient, { RegulatoryContentItem } from "@/components/RegulatoryHubClient";
import PageHero from "@/components/PageHero";
import LeadMagnetBanner from "@/components/LeadMagnetBanner";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Regulatory hub | ${site.legalName}`,
  description:
    "Searchable regulatory hub with practical guides for CSRD and ESRS, SEBI BRSR, and UK SECR and SRS reporting. Built for leaders who need scoping clarity, governance, evidence trails, and repeatable reporting workflows.",
  alternates: { canonical: absUrl("/regulatory-hub") },
};

export default function RegulatoryHubPage() {
  const items: RegulatoryContentItem[] = [
    // CSRD foundations
    {
      slug: "what-is-csrd",
      category: "CSRD",
      title: "What is CSRD? The Corporate Sustainability Reporting Directive explained",
      summary:
        "A clear explanation of CSRD, who is in scope, key timelines, and what it means for your organisation.",
      topics: ["CSRD", "Scope", "Timeline", "Applicability"],
      audience: "CFO, CSO, CEO",
      readTime: "6 min read",
      updated: "Mar 2026",
    },
    {
      slug: "what-is-esrs",
      category: "CSRD",
      title: "What is ESRS? European Sustainability Reporting Standards explained",
      summary:
        "How ESRS is structured and what ESRS 1, ESRS 2, and topic standards mean for reporting design and governance.",
      topics: ["ESRS", "Structure", "Disclosures", "Reporting standards"],
      audience: "CFO, CSO, Reporting lead",
      readTime: "6 min read",
      updated: "Mar 2026",
    },
    {
      slug: "what-is-double-materiality",
      category: "CSRD",
      title: "What is Double Materiality? The CSRD concept explained",
      summary:
        "A plain-language explanation of impact materiality and financial materiality, and how to operationalise the assessment.",
      topics: ["Double materiality", "Assessment", "Stakeholders", "Governance"],
      audience: "CSO, CFO, Sustainability lead",
      readTime: "5 min read",
      updated: "Mar 2026",
    },

    // CSRD execution guides
    {
      slug: "csrd-in-scope-and-timeline",
      category: "CSRD",
      title: "CSRD scoping and timeline: what to confirm first",
      summary:
        "A checklist to confirm scope, timing, ownership and first-cycle readiness decisions.",
      topics: ["Scoping", "Timeline", "Applicability", "Governance"],
      audience: "CFO, CSO, CEO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "csrd-double-materiality-and-esrs-mapping",
      category: "CSRD",
      title: "Double materiality and ESRS mapping: how to structure the work",
      summary:
        "Convert materiality outcomes into disclosures, owners, KPIs, controls and evidence trails.",
      topics: ["Double materiality", "ESRS", "Mapping", "Evidence"],
      audience: "CSO, CFO, Reporting lead",
      readTime: "3 min read",
      updated: "Feb 2026",
    },

    // BRSR foundations
    {
      slug: "what-is-sebi-brsr",
      category: "BRSR",
      title: "What is SEBI BRSR? Business Responsibility and Sustainability Report explained",
      summary:
        "An overview of BRSR, who must report, what the 9 principles cover, what BRSR Core is, and the assurance direction.",
      topics: ["SEBI BRSR", "BRSR Core", "Principles", "Applicability"],
      audience: "CFO, CSO, Compliance lead",
      readTime: "6 min read",
      updated: "Mar 2026",
    },

    // BRSR execution guides
    {
      slug: "brsr-core-readiness-kpis-controls",
      category: "BRSR",
      title: "BRSR readiness: KPI mapping, controls and evidence trails",
      summary:
        "Convert BRSR indicators into a KPI inventory with owners, validations, evidence trails and a governance cadence leaders can rely on.",
      topics: ["BRSR", "KPI mapping", "Controls", "Evidence"],
      audience: "CFO, CSO, Compliance lead",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "brsr-value-chain-data-collection",
      category: "BRSR",
      title: "Value chain data: a practical collection approach",
      summary:
        "Prioritisation, supplier workflows, assumptions documentation, and cycle-by-cycle improvement through governance.",
      topics: ["Value chain", "Suppliers", "Scope 3", "Governance"],
      audience: "CSO, Procurement, CFO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },

    // UK SECR and SRS guides
    {
      slug: "uk-secr-srs-governance-and-risk-management",
      category: "UK SECR and SRS",
      title: "UK SECR and SRS disclosures: governance and risk management essentials",
      summary:
        "How to structure oversight, decision rights, risk linkage, and evidence so SECR and SRS disclosures remain defensible and repeatable.",
      topics: ["Governance", "Risk management", "Evidence", "Operating model"],
      audience: "CFO, Risk lead, CSO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "uk-secr-srs-metrics-targets-and-evidence",
      category: "UK SECR and SRS",
      title: "Metrics and targets: emissions, targets, and evidence trails",
      summary:
        "Practical decisions for metrics and targets, emissions data governance, controls and evidence trails that reduce late-cycle rework.",
      topics: ["Metrics", "Targets", "Emissions", "Controls"],
      audience: "CFO, Sustainability lead, Audit committee",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.displayName} Regulatory hub`,
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: absUrl(`/regulatory-hub/${it.slug}`),
      name: it.title,
    })),
  };

  return (
    <div>
      <PageHero
        title="Regulatory hub"
        subtitle="Searchable guides for CSRD and ESRS, SEBI BRSR, and UK SECR and SRS reporting. Built for leaders who need scoping clarity, governance, evidence trails, and repeatable reporting workflows."
        primaryAction={{ label: "ESG advisory services", href: "/services/esg-advisory" }}
        secondaryAction={{ label: "Talk to us", href: "/contact" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/regulatory.jpg"
        imageAlt="CSRD, BRSR and UK SECR and SRS regulatory compliance guidance for CFOs and CSOs"
      />

      <RegulatoryHubClient items={items} />

      <section className="max-w-6xl mx-auto px-6">
        <LeadMagnetBanner />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </div>
  );
}