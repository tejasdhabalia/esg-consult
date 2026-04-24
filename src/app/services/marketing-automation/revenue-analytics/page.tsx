import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Revenue analytics and measurement",
  description:
    "Funnel and lifecycle definitions, metric governance, CRM-to-finance alignment, retention analytics and dashboards leaders can trust. Built for B2B and B2C.",
  path: "/services/marketing-automation/revenue-analytics",
});

export default function RevenueAnalyticsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "Marketing Automation and RevOps", item: absUrl("/services/marketing-automation") },
      { "@type": "ListItem", position: 4, name: "Revenue Analytics and Measurement", item: absUrl("/services/marketing-automation/revenue-analytics") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Revenue Analytics and Measurement",
    description:
      "Advisory plus implementation for revenue analytics and measurement. Funnel and lifecycle definitions, metric governance, CRM to finance alignment, retention analytics, and dashboards leaders can trust.",
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "Funnel and lifecycle taxonomy",
      "Metric definitions governance",
      "Pipeline and retention reporting",
      "CRM to finance alignment",
      "Attribution governance",
      "Executive insights workflow",
    ],
    url: absUrl("/services/marketing-automation/revenue-analytics"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why do revenue dashboards become unreliable over time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dashboards fail when stage definitions drift, attribution rules change without governance, CRM and finance use different identifiers, and there is no change control process. We fix the root cause by implementing taxonomy, metric governance, and reporting controls.",
        },
      },
      {
        "@type": "Question",
        name: "What does revenue analytics consulting involve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We define funnel stages, metric taxonomy, and reporting rules. We align CRM data to finance systems, implement retention and pipeline views, and establish a governance cadence so dashboards remain accurate as the business changes.",
        },
      },
      {
        "@type": "Question",
        name: "Is this relevant for B2C as well as B2B?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. B2B analytics focuses on pipeline, velocity, conversion and account retention. B2C analytics covers cohort retention, repeat purchase, LTV, and journey performance. We adapt the framework to your operating model.",
        },
      },
      {
        "@type": "Question",
        name: "Do you build dashboards or govern existing ones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both. We define the measurement model and can implement within your existing BI tools, CRM reporting layers, or help you select and configure the right tooling. Governance of existing dashboards is often the fastest path to reliable reporting.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Revenue analytics and measurement"
        subtitle="Build measurement leaders can trust. Funnel and lifecycle definitions, metric governance, CRM to finance alignment, and dashboards aligned to operating reality across B2B and B2C."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to Marketing Automation", href: "/services/marketing-automation" }}
        imageSrc="/hero/revenue.jpg"
        imageAlt="Revenue analytics and executive dashboard measurement for B2B and B2C organisations"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">When metrics are disputed, execution slows down</h2>
          <p className="mt-6 text-slate-600">
            Dashboards fail when definitions are inconsistent, stage meanings drift, attribution rules change, and finance numbers do not reconcile with CRM performance.
            We stabilise measurement through taxonomy, governance, and reporting controls.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/marketing-automation/crm-architecture-governance">
              CRM governance
            </Link>
            <Link className="underline text-slate-700" href="/services/marketing-automation/lifecycle-lead-management">
              Lifecycle and lead management
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Funnel and lifecycle taxonomy", "Stage definitions, entry rules, required fields, and governance so teams follow the same model."],
              ["Metric definitions governance pack", "Stable definitions for conversion, velocity, retention, CAC efficiency and reporting rules."],
              ["Pipeline and retention reporting", "B2B pipeline visibility and B2C cohort and retention views aligned to operating cadence."],
              ["CRM to finance alignment", "Identifiers, source of truth, and reconciliation logic so leadership reviews do not conflict."],
              ["Attribution governance where relevant", "Practical attribution rules and change control to keep reporting consistent over time."],
              ["Insights workflow", "Repeatable performance review, anomaly checks, and action tracking aligned to owners and cadence."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss measurement scope
            </Link>
            <Link href="/services" className="border px-6 py-3 rounded-lg font-medium text-center">
              Back to Services
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
