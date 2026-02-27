import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `UK climate metrics and targets | ${site.legalName}`,
  description:
    "Practical decisions for metrics and targets, emissions data governance, controls and evidence trails that reduce late-cycle rework.",
  alternates: { canonical: absUrl("/regulatory-hub/uk-climate-metrics-targets-and-evidence") },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Metrics and targets: emissions, targets, and evidence trails",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/regulatory-hub/uk-climate-metrics-targets-and-evidence"),
  };

  return (
    <div>
      <PageHero
        title="Metrics, targets and evidence trails"
        subtitle="Metrics become credible when leaders agree on definitions, data ownership, controls, approvals and evidence storage. This guide outlines practical decisions that prevent late-cycle rework."
        primaryAction={{ label: "UK climate reporting services", href: "/services/esg-advisory/uk-climate-reporting" }}
        secondaryAction={{ label: "Back to Regulatory hub", href: "/regulatory-hub" }}
        imageSrc="/hero/uk-climate.jpg"
        imageAlt="Climate metrics targets evidence trails"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Decisions that prevent chaos</h2>
          <ul className="mt-6 list-disc list-inside text-slate-700 space-y-2">
            <li>Which metrics leadership will review quarterly and why</li>
            <li>Definitions and boundaries for emissions and operational metrics</li>
            <li>Ownership per metric, plus validations and approvals</li>
            <li>Targets and time horizons, including interim checkpoints</li>
            <li>Evidence storage and change control for methodologies</li>
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss metrics and targets
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