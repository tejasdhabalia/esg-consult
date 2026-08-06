import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Lifecycle and lead management",
  description:
    "Journey orchestration, lead routing and SLAs, segmentation, prioritisation and omnichannel triggers, with governance for predictable execution.",
  path: "/services/crm-and-revenue-operations/lifecycle-lead-management",
});

export default function LifecycleLeadManagementPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "Marketing Automation and RevOps", item: absUrl("/services/crm-and-revenue-operations") },
      { "@type": "ListItem", position: 4, name: "Lifecycle and Lead Management", item: absUrl("/services/crm-and-revenue-operations/lifecycle-lead-management") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Lifecycle and Lead Management",
    description:
      "Advisory plus implementation for lifecycle and lead management including journey orchestration, routing and SLAs, segmentation, prioritisation, omnichannel triggers, and governance for predictable execution across B2B and B2C.",
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "Lifecycle stage definitions and governance",
      "Routing rules and SLA design",
      "Journey orchestration framework",
      "Segmentation and personalisation governance",
      "Lead scoring and prioritisation",
      "Lifecycle measurement and cadence",
    ],
    url: absUrl("/services/crm-and-revenue-operations/lifecycle-lead-management"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is lifecycle and lead management consulting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lifecycle and lead management consulting defines the stages, routing rules, SLAs, and journey logic that govern how leads and customers move through your systems. We implement the operating model, automation triggers, and measurement so execution becomes predictable.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with B2B and B2C organisations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. B2B work focuses on lead and account lifecycle, routing, SLAs, pipeline visibility and renewals. B2C work covers omnichannel journeys, retention, repeat purchase, and content operations with governance.",
        },
      },
      {
        "@type": "Question",
        name: "What platforms do you work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are platform-agnostic. We design the operating model and governance framework, then implement within your existing tools including Salesforce, HubSpot, Marketo, Braze, and others.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a lifecycle implementation take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most engagements begin with a diagnostic to clarify scope and gaps, followed by a phased design and implementation. Timelines vary by complexity, but most teams see an operational model within 8 to 16 weeks.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Lifecycle and lead management"
        subtitle="Design and implementation of lifecycle stages, routing and SLAs, journey orchestration, segmentation and measurement so execution becomes predictable across marketing, sales and service."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to Marketing Automation", href: "/services/crm-and-revenue-operations" }}
        imageSrc="/hero/lifecycle.jpg"
        imageAlt="Lifecycle orchestration and lead management consulting for B2B and B2C organisations"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">If lifecycle definitions are unclear, teams cannot execute consistently</h2>
          <p className="mt-6 text-slate-600">
            Leaders see the symptoms: too many stages, inconsistent routing, disputes between teams, stalled pipeline, and reporting that does not match reality.
            In B2C contexts, the symptoms show up as fragmented journeys, poor retention, and rising acquisition cost.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/crm-and-revenue-operations/crm-architecture-governance">
              CRM governance
            </Link>
            <Link className="underline text-slate-700" href="/services/crm-and-revenue-operations/revenue-analytics">
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

          <div className="mt-12">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium">
              Book a consultation
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
