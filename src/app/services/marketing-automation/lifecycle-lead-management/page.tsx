import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Lifecycle and Lead Management | ${site.legalName}`,
  description:
    "Advisory plus implementation for lifecycle and lead management including journey orchestration, routing and SLAs, segmentation, prioritisation, omnichannel triggers, and governance for predictable execution across B2B and B2C.",
  alternates: { canonical: absUrl("/services/marketing-automation/lifecycle-lead-management") },
};

export default function LifecycleLeadManagementPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "Marketing Automation and RevOps", item: absUrl("/services/marketing-automation") },
      { "@type": "ListItem", position: 4, name: "Lifecycle and Lead Management", item: absUrl("/services/marketing-automation/lifecycle-lead-management") },
    ],
  };

  return (
    <div>
      <PageHero
        title="Lifecycle and lead management"
        subtitle="Design and implementation of lifecycle stages, routing and SLAs, journey orchestration, segmentation and measurement so execution becomes predictable across marketing, sales and service."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to Marketing Automation", href: "/services/marketing-automation" }}
        imageSrc="/hero/lifecycle.jpg"
        imageAlt="Lifecycle orchestration and customer journey theme"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">If lifecycle definitions are unclear, teams cannot execute consistently</h2>
          <p className="mt-6 text-slate-600">
            Leaders see the symptoms: too many stages, inconsistent routing, disputes between teams, stalled pipeline, and reporting that does not match reality.
            In B2C contexts, the symptoms show up as fragmented journeys, poor retention, and rising acquisition cost.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/marketing-automation/crm-architecture-governance">
              CRM governance
            </Link>
            <Link className="underline text-slate-700" href="/services/marketing-automation/revenue-analytics">
              Revenue analytics and measurement
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Lifecycle stages and governance", "Stage definitions, entry and exit rules, ownership, SLAs, and escalation paths."],
              ["Routing and SLAs", "Routing rules by segment, territory, account priority and product line with exception handling."],
              ["Journey orchestration framework", "Trigger events, journey logic, frequency rules, suppression and channel coordination."],
              ["Segmentation and personalisation governance", "Segmentation model, data requirements, consent handling, and targeting discipline."],
              ["Prioritisation logic", "Scoring or prioritisation that reduces noise and focuses teams on what matters."],
              ["Measurement and cadence", "Stage KPIs, velocity metrics, SLA adherence, conversion, and stable reporting definitions."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}