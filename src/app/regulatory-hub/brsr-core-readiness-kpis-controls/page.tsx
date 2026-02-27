import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `BRSR readiness: KPI mapping and controls | ${site.legalName}`,
  description:
    "Convert BRSR indicators into a KPI inventory with owners, validations, evidence trails and a governance cadence leaders can rely on.",
  alternates: { canonical: absUrl("/regulatory-hub/brsr-core-readiness-kpis-controls") },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "BRSR readiness: KPI mapping, controls and evidence trails",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/regulatory-hub/brsr-core-readiness-kpis-controls"),
  };

  return (
    <div>
      <PageHero
        title="BRSR readiness: KPI mapping and controls"
        subtitle="BRSR becomes manageable when indicators turn into a governed KPI system with definitions, owners, validations, evidence trails and leadership cadence."
        primaryAction={{ label: "BRSR advisory services", href: "/services/esg-advisory/brsr-advisory" }}
        secondaryAction={{ label: "Back to Regulatory hub", href: "/regulatory-hub" }}
        imageSrc="/hero/brsr.jpg"
        imageAlt="BRSR KPI mapping and controls"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">A practical operating model</h2>
          <ul className="mt-6 list-disc list-inside text-slate-700 space-y-2">
            <li>KPI inventory mapped to indicators with clear definitions</li>
            <li>Named data owners and source systems per KPI</li>
            <li>Validation checks, approvals, and evidence standards</li>
            <li>Exceptions process and cycle-by-cycle improvement cadence</li>
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss BRSR readiness
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