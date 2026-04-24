import PageHero from "@/components/PageHero";
import InsightsHubClient from "@/components/InsightsHubClient";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { getAllInsightsNewestFirst } from "@/lib/insights";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Insights, guides and tools",
  description:
    "Practical guides, interactive tools and checklists across ESG readiness, CRM governance and marketing automation. Built for governed execution.",
  path: "/insights",
});

export default function InsightsPage() {
  const items = getAllInsightsNewestFirst();

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
        subtitle="Practical guides and tools for leaders building ESG readiness and revenue visibility. Designed for decision-making, governance, and repeatable execution."
        primaryAction={{ label: "Explore services", href: "/services" }}
        secondaryAction={{ label: "Talk to us", href: "/contact" }}
        imageSrc="/hero/insights.jpg"
        imageAlt="Insights and practical guides for ESG readiness and revenue visibility leaders"
      />

      <InsightsHubClient items={items} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}