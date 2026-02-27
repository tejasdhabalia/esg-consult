import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Value chain data collection approach | ${site.legalName}`,
  description:
    "A phased approach for value chain data: prioritisation, supplier workflows, assumptions documentation and cycle-by-cycle improvement through governance.",
  alternates: { canonical: absUrl("/regulatory-hub/brsr-value-chain-data-collection") },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Value chain data: a practical collection approach",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/regulatory-hub/brsr-value-chain-data-collection"),
  };

  return (
    <div>
      <PageHero
        title="Value chain data collection"
        subtitle="A phased approach for value chain data: prioritise material categories, define supplier workflows, document assumptions, and improve quality cycle by cycle through governance."
        primaryAction={{ label: "BRSR advisory services", href: "/services/esg-advisory/brsr-advisory" }}
        secondaryAction={{ label: "Back to Regulatory hub", href: "/regulatory-hub" }}
        imageSrc="/hero/brsr.jpg"
        imageAlt="Value chain data collection governance"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">A phased approach that works</h2>
          <ol className="mt-6 list-decimal list-inside text-slate-700 space-y-2">
            <li>Prioritise the highest-impact partners and categories</li>
            <li>Define data definitions and evidence expectations</li>
            <li>Design supplier collection workflows and responsibilities</li>
            <li>Document assumptions, estimates, and boundary choices</li>
            <li>Improve quality cycle by cycle through governance</li>
          </ol>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss value chain approach
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