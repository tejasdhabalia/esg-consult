import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Marketing automation governance that scales | ${site.legalName}`,
  description:
    "Why marketing automation breaks as teams grow, and how governance with ownership, definitions, SLAs, and change control protects performance.",
  alternates: { canonical: absUrl("/insights/marketing-governance-model-for-automation") },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      {
        "@type": "ListItem",
        position: 3,
        name: "Marketing automation governance",
        item: absUrl("/insights/marketing-governance-model-for-automation"),
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The governance model behind marketing automation that actually scales",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/insights/marketing-governance-model-for-automation"),
  };

  return (
    <div>
      <PageHero
        title="The governance model behind marketing automation that actually scales"
        subtitle="Tools do not create scale. Governance does. This guide outlines what leadership should put in place so automation stays reliable as teams, channels, and journeys grow."
        primaryAction={{ label: "Marketing automation services", href: "/services/marketing-automation" }}
        secondaryAction={{ label: "Back to Insights", href: "/insights" }}
        imageSrc="/hero/marketing.jpg"
        imageAlt="Marketing automation and governance"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">The symptoms leaders see</h2>
          <ul className="mt-4 list-disc list-inside text-slate-700 space-y-2">
            <li>Routing breaks and follow-up SLAs drift</li>
            <li>Dashboards do not reconcile with pipeline reality</li>
            <li>Journeys multiply without ownership or change control</li>
            <li>Content becomes inconsistent and personalisation feels random</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-14">The governance model that stabilises execution</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              ["Stage definitions and entry rules", "Define lifecycle stages, entry and exit rules, required fields, and ownership."],
              ["Routing and SLAs", "Document routing logic, SLAs, escalation rules, and how exceptions are handled."],
              ["Change control", "A simple process to approve new fields, stages, journeys, and metric changes."],
              ["Measurement governance", "Metric definitions that remain stable, plus a review cadence leaders trust."],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-6">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-2 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-14">A practical starting point</h2>
          <p className="mt-4 text-slate-700">
            Start with a diagnostic audit across CRM governance, lifecycle definitions, routing, and reporting logic.
            Then implement a phased plan that fixes foundation issues before adding new automation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/services/marketing-automation/crm-architecture-governance" className="border px-6 py-3 rounded-lg font-medium text-center">
              CRM governance
            </Link>
            <Link href="/services/marketing-automation/lifecycle-lead-management" className="border px-6 py-3 rounded-lg font-medium text-center">
              Lifecycle management
            </Link>
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss your stack
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </div>
  );
}