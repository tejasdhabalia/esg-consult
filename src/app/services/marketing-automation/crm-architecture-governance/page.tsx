import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `CRM Architecture and Governance | ${site.legalName}`,
  description:
    "Advisory plus implementation for CRM architecture and governance. Data model discipline, source of truth, integrations across finance and service, controls, evidence trails, and reporting definitions leaders can trust.",
  alternates: { canonical: absUrl("/services/marketing-automation/crm-architecture-governance") },
};

export default function CRMGovernancePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "Marketing Automation and RevOps", item: absUrl("/services/marketing-automation") },
      { "@type": "ListItem", position: 4, name: "CRM Architecture and Governance", item: absUrl("/services/marketing-automation/crm-architecture-governance") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CRM Architecture and Governance",
    description:
      "Advisory plus implementation for CRM architecture and governance including data model discipline, integrations across finance and service, controls, evidence trails, and reporting definitions leaders can trust.",
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "CRM governance and operating model",
      "Data model and taxonomy design",
      "Identity and source of truth alignment",
      "Integrations across finance, service and contact centre signals",
      "Data quality controls and evidence trails",
      "Reporting definitions and dashboard governance",
    ],
    url: absUrl("/services/marketing-automation/crm-architecture-governance"),
  };

  return (
    <div>
      <PageHero
        title="CRM architecture and governance"
        subtitle="Build a CRM foundation leaders can trust. Data model discipline, source of truth, integrations across finance and service, controls, and reporting governance that keeps dashboards stable over time."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to Marketing Automation", href: "/services/marketing-automation" }}
        imageSrc="/hero/crm.jpg"
        imageAlt="CRM governance and data architecture theme"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">When CRM becomes chaotic, execution breaks</h2>
          <p className="mt-6 text-slate-600">
            CRM governance fixes drifting definitions, duplicate records, unreliable dashboards, and disconnected workflows.
            Once the foundation is stable, automation and AI can deliver value without compounding chaos.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/marketing-automation/lifecycle-lead-management">
              Lifecycle and lead management
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
              ["Target data model and taxonomy", "Objects, fields, naming conventions, required fields, and ownership standards."],
              ["Source of truth and identity discipline", "Customer and account identifiers, dedupe logic, and reconciliation across tools."],
              ["Permissions and change control", "Role-based access, workflow standards, and change governance to prevent sprawl."],
              ["Integrations across finance and service", "Align billing, tickets, call outcomes and customer status signals to the operating model."],
              ["Data quality controls and evidence trails", "Validation rules, exception handling, monitoring and auditability."],
              ["Reporting definitions governance", "Stable metric definitions and lifecycle taxonomy so dashboards match reality."],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </div>
  );
}