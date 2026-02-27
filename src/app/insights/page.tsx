import PageHero from "@/components/PageHero";
import InsightsHubClient, { InsightItem } from "@/components/InsightsHubClient";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Insights | ${site.legalName}`,
  description:
    "Searchable insights covering ESG readiness and marketing automation. Practical guides for leaders building governance, evidence trails, and measurable systems.",
  alternates: { canonical: absUrl("/insights") },
};

export default function InsightsPage() {
  const items: InsightItem[] = [
    {
      slug: "marketing-governance-model-for-automation",
      category: "Marketing",
      title: "The governance model behind marketing automation that actually scales",
      summary:
        "Why automation breaks as teams grow, and how to implement ownership, definitions, SLAs, and change control that protects performance.",
      topics: ["Governance", "Operating model", "SLAs", "Change control"],
      audience: "CMO, CRO, RevOps, CEO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
    {
      slug: "csrd-readiness-first-90-days",
      category: "ESG",
      title: "CSRD readiness in the first 90 days: what leaders should operationalise",
      summary:
        "A practical plan that moves from scoping to owners, disclosure mapping, evidence trails, and a reporting workflow that can repeat.",
      topics: ["CSRD", "ESRS", "Roadmap", "Evidence"],
      audience: "CFO, CSO, CEO",
      readTime: "3 min read",
      updated: "Feb 2026",
    },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.displayName} Insights`,
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: absUrl(`/insights/${it.slug}`),
      name: it.title,
    })),
  };

  return (
    <div>
      <PageHero
        title="Insights"
        subtitle="Practical guides for leaders building ESG readiness and revenue visibility. Designed for decision-making, governance, and repeatable execution."
        primaryAction={{ label: "Explore services", href: "/services" }}
        secondaryAction={{ label: "Talk to us", href: "/contact" }}
        imageSrc="/hero/insights.jpg"
        imageAlt="Business insights and leadership decision-making"
      />

      <InsightsHubClient items={items} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </div>
  );
}