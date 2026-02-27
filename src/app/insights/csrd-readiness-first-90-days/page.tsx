import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `CSRD readiness first 90 days | ${site.legalName}`,
  description:
    "A practical plan from scoping to owners, disclosure mapping, evidence trails, and a reporting workflow that can repeat.",
  alternates: { canonical: absUrl("/insights/csrd-readiness-first-90-days") },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      { "@type": "ListItem", position: 3, name: "CSRD readiness first 90 days", item: absUrl("/insights/csrd-readiness-first-90-days") },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CSRD readiness in the first 90 days: what leaders should operationalise",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/insights/csrd-readiness-first-90-days"),
  };

  return (
    <div>
      <PageHero
        title="CSRD readiness in the first 90 days"
        subtitle="CSRD becomes manageable when you treat it like operating model build. The first 90 days should focus on scoping, ownership, disclosure mapping, controls and evidence trails."
        primaryAction={{ label: "CSRD advisory services", href: "/services/esg-advisory/csrd-advisory" }}
        secondaryAction={{ label: "Back to Insights", href: "/insights" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/csrd.jpg"
        imageAlt="CSRD compliance and reporting readiness"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Days 1 to 30: scope and ownership</h2>
          <ul className="mt-4 list-disc list-inside text-slate-700 space-y-2">
            <li>Confirm scope boundary and internal decision rights</li>
            <li>Set steering cadence and define who signs off on what</li>
            <li>Draft disclosure inventory and assign owners for each disclosure</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-14">Days 31 to 60: mapping to data and controls</h2>
          <ul className="mt-4 list-disc list-inside text-slate-700 space-y-2">
            <li>Map each disclosure to data sources and named data owners</li>
            <li>Identify missing data and define collection method</li>
            <li>Design control checks and evidence trail expectations early</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-14">Days 61 to 90: workflow and repeatability</h2>
          <ul className="mt-4 list-disc list-inside text-slate-700 space-y-2">
            <li>Define workflow: collection, review, approvals, versioning</li>
            <li>Define change control for assumptions and methodologies</li>
            <li>Run a mini dry-run on a subset to surface gaps early</li>
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/services/esg-advisory" className="border px-6 py-3 rounded-lg font-medium text-center">
              ESG advisory hub
            </Link>
            <Link href="/regulatory-hub" className="border px-6 py-3 rounded-lg font-medium text-center">
              Regulatory hub
            </Link>
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss CSRD timeline
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </div>
  );
}