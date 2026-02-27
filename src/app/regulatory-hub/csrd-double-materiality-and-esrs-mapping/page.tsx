import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Double materiality and ESRS mapping | ${site.legalName}`,
  description:
    "How to run double materiality as a decision process and convert outcomes into disclosures, owners, KPIs, controls and evidence trails.",
  alternates: { canonical: absUrl("/regulatory-hub/csrd-double-materiality-and-esrs-mapping") },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Double materiality and ESRS mapping: how to structure the work",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/regulatory-hub/csrd-double-materiality-and-esrs-mapping"),
  };

  return (
    <div>
      <PageHero
        title="Double materiality and ESRS mapping"
        subtitle="Materiality is useful only when it drives ownership, controls, and evidence. This guide shows how to convert outcomes into disclosures, KPIs, workflows, and governance."
        primaryAction={{ label: "CSRD advisory services", href: "/services/esg-advisory/csrd-advisory" }}
        secondaryAction={{ label: "Back to Regulatory hub", href: "/regulatory-hub" }}
        imageSrc="/hero/csrd.jpg"
        imageAlt="Double materiality and ESRS mapping"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Convert materiality into an operating system</h2>
          <ol className="mt-6 list-decimal list-inside text-slate-700 space-y-2">
            <li>Translate topics into a disclosure inventory and KPI set</li>
            <li>Assign owners and define data sources per disclosure and KPI</li>
            <li>Define control checks, approvals, and evidence standards</li>
            <li>Design reporting workflow and leadership review cadence</li>
          </ol>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss readiness
            </Link>
            <Link href="/services/esg-advisory" className="border px-6 py-3 rounded-lg font-medium text-center">
              ESG advisory hub
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </div>
  );
}