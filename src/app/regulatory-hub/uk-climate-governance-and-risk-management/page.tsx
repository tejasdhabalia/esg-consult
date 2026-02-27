import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `UK climate governance and risk management | ${site.legalName}`,
  description:
    "How to structure oversight, decision rights, risk linkage, and evidence so climate disclosures remain defensible and repeatable.",
  alternates: { canonical: absUrl("/regulatory-hub/uk-climate-governance-and-risk-management") },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "UK climate disclosures: governance and risk management essentials",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/regulatory-hub/uk-climate-governance-and-risk-management"),
  };

  return (
    <div>
      <PageHero
        title="UK climate governance and risk management"
        subtitle="Climate reporting remains defensible when governance and risk processes are explicit: ownership, decision rights, cadence, escalation, and evidence trails."
        primaryAction={{ label: "UK climate reporting services", href: "/services/esg-advisory/uk-climate-reporting" }}
        secondaryAction={{ label: "Back to Regulatory hub", href: "/regulatory-hub" }}
        imageSrc="/hero/uk-climate.jpg"
        imageAlt="UK climate governance and risk management"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">What leaders should put in place</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              ["Ownership and oversight", "Named owner, committee oversight, and defined decision rights for key disclosures."],
              ["Risk linkage", "Climate risks mapped into ERM with owners, monitoring cadence, and escalation paths."],
              ["Evidence trail", "Evidence standards for risk processes, assumptions, and decisions."],
              ["Change control", "A mechanism to track changes in assumptions and methodologies across cycles."],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-6">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-2 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss governance setup
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