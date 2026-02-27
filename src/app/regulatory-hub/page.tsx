import RegulatoryHubClient, { RegulatoryContentItem } from "@/components/RegulatoryHubClient";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Regulatory hub | ${site.legalName}`,
  description:
    "Searchable regulatory hub with practical guides for CSRD and ESRS, SEBI BRSR, and UK climate reporting. Built for leaders who need governance, evidence trails and repeatable reporting workflows.",
  alternates: { canonical: absUrl("/regulatory-hub") },
};

export default function RegulatoryHubPage() {
  const items: RegulatoryContentItem[] = [
    {
      slug: "csrd-in-scope-and-timeline",
      category: "CSRD",
      title: "CSRD scoping and timeline: what to confirm first",
      summary: "A checklist to confirm scope, timing, ownership and first-cycle readiness decisions.",
      topics: ["Scoping", "Timeline", "Applicability", "Governance"],
      audience: "CFO, CSO, CEO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "csrd-double-materiality-and-esrs-mapping",
      category: "CSRD",
      title: "Double materiality and ESRS mapping: how to structure the work",
      summary: "Convert materiality outcomes into disclosures, owners, KPIs, controls and evidence trails.",
      topics: ["Double materiality", "ESRS", "Disclosure mapping", "Evidence"],
      audience: "CSO, Sustainability lead, CFO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "brsr-core-readiness-kpis-controls",
      category: "BRSR",
      title: "BRSR readiness: KPI mapping, controls and evidence trails",
      summary: "Convert indicators into a KPI inventory with owners, validations, evidence trails and governance cadence.",
      topics: ["BRSR", "KPI mapping", "Controls", "Evidence"],
      audience: "CFO, CSO, Compliance lead",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "brsr-value-chain-data-collection",
      category: "BRSR",
      title: "Value chain data: a practical collection approach",
      summary: "Prioritisation, supplier workflows, assumptions documentation, and cycle-by-cycle improvement.",
      topics: ["Value chain", "Suppliers", "Scope 3", "Governance"],
      audience: "CSO, Procurement, CFO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "uk-climate-governance-and-risk-management",
      category: "UK Climate",
      title: "UK climate disclosures: governance and risk management essentials",
      summary: "Oversight, decision rights, risk linkage and evidence trails for repeatable reporting.",
      topics: ["Governance", "Risk management", "Evidence", "Operating model"],
      audience: "CFO, Risk lead, CSO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "uk-climate-metrics-targets-and-evidence",
      category: "UK Climate",
      title: "Metrics and targets: emissions, targets, and evidence trails",
      summary: "Practical decisions for emissions governance, controls, documentation and review cadence.",
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
        subtitle="Searchable guides for CSRD and ESRS, SEBI BRSR, and UK climate reporting. Built for leaders who need scoping clarity, governance, evidence trails, and repeatable reporting workflows."
        primaryAction={{ label: "ESG advisory services", href: "/services/esg-advisory" }}
        secondaryAction={{ label: "Talk to us", href: "/contact" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/regulatory.jpg"
        imageAlt="Regulatory and compliance readiness"
      />

      <RegulatoryHubClient items={items} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </div>
  );
}