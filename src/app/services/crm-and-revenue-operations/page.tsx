import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import RelatedResources from "@/components/RelatedResources";

export const metadata = pageMetadata({
  // Title, description and H1 from the SEO brief for Batches 3 and 4,
  // 30 October 2026. The helper appends " | DS Consulting".
  title: "CRM and revenue operations consulting",
  description:
    "CRM and revenue operations for mid-market teams: architecture, governance and reporting, including moves off spreadsheets or another CRM.",
  path: "/services/crm-and-revenue-operations",
});

export default function MarketingAutomationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "Marketing Automation and RevOps", item: absUrl("/services/crm-and-revenue-operations") },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketing Automation and Revenue Operations",
    description:
      "Advisory and delivery leadership for marketing automation and revenue operations including lifecycle orchestration, CRM governance, omnichannel automation, AI-enabled content workflows, and measurement leaders can trust across B2B and B2C.",
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["EU", "United Kingdom", "India"],
    serviceType: [
      "CRM governance and operating model",
      "Lifecycle and lead management",
      "Routing and SLAs",
      "Omnichannel automation",
      "Content operations and AI workflows",
      "Revenue analytics and measurement governance",
    ],
    url: absUrl("/services/crm-and-revenue-operations"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What problems do you solve for CMOs, CROs and CEOs?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We fix revenue execution chaos across CRM, marketing automation, sales, customer success and service. We create lifecycle definitions, governance, routing and measurement so leaders get reliable visibility into pipeline and retention outcomes.",
        },
      },
      {
        "@type": "Question",
        name: "Is this only for B2B, or do you support B2C automation as well?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We support both B2B and B2C. B2B focuses on lead and account lifecycle, routing and SLAs, pipeline visibility and renewals. B2C focuses on omnichannel journeys like onboarding, cart recovery, replenishment, loyalty and win-back with strong governance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you implement, or only advise?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Neither, quite. We lead delivery on your side of the table. We plan and run the project, hold the implementation partner to the business case the board approved, do hands-on work where it helps, and stay until the system is live and working. We are not anyone's implementation partner and we do not resell software.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle messy stacks like CRM plus finance, IVR and support tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We map systems, define source of truth, standardise definitions, and design integrations and workflows so marketing, sales, finance and service signals work together. We then put governance in place so the system stays stable.",
        },
      },
      {
        "@type": "Question",
        name: "Where does AI fit in automation and content operations?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "AI helps when it is governed. We use AI to speed content workflows, maintain brand consistency, improve segmentation and decisioning, and generate insights with guardrails for compliance and measurement.",
        },
      },
      {
        "@type": "Question",
        name: "How do you measure ROI?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We define success metrics up front such as conversion, speed to follow-up, pipeline contribution, stage velocity, retention, repeat purchase, CAC efficiency, data quality, and adoption. We align reporting definitions and governance so metrics remain reliable.",
        },
      },
      {
        "@type": "Question",
        name: "Where should we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a diagnostic audit of lifecycle definitions, CRM governance, routing and SLAs, automation workflows, and measurement. The output is a prioritised roadmap with owners and measurable outcomes.",
        },
      },
      {
        "@type": "Question",
        name: "Which platforms do you work on?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "HubSpot, Salesforce, Zoho, enterprise stacks and in-house CRM builds. Most clients have a mix. We are not a reseller or implementation partner for any of them, so platform choice is assessed on fit rather than on what we are certified in.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Get your CRM and revenue reporting to agree"
        subtitle="Moving CRM, or moving off spreadsheets, is the chance to fix what a qualified lead means, not only to copy records. We lead the move on your side, then set up the definitions and reporting so the board pack matches the system."
        primaryAction={{ label: site.movePlan.label, href: "/contact" }}
        secondaryAction={{ label: "Back to services", href: "/services" }}
        imageSrc="/hero/marketing.jpg"
        imageAlt="Marketing automation and analytics theme"
      />

      {/* CHANGING CRM. Leads with the move. Batch 7, approved 30 October 2026. */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Changing CRM
          </div>
          <h2 className="text-3xl font-semibold text-slate-900">Switch CRMs without losing your pipeline</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
            <p>
              Most CRM moves copy the records and call it done. Duplicates come across, stage
              definitions come across, and the argument about what counts as a qualified lead comes
              across with them. Six months later the new system reports the same disputed numbers as
              the old one.
            </p>
            <p>
              We run the move on your side. Agree the definitions first, clean and map the data, plan
              the cutover so the pipeline is never in two places at once, and hold whoever sets up the
              new CRM to what the business agreed.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-indigo-50 border-y border-indigo-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
                Built on what you already run
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                We work on your stack, not a preferred one
              </h2>
              <p className="mt-4 text-slate-600">
                Most mid-market companies have a mix. A CRM chosen years ago, a marketing tool
                bought by a previous team, a warehouse someone built in between. We design around
                that rather than proposing a rebuild you have no appetite for.
              </p>
              <p className="mt-4 text-slate-600">
                We hold no reseller agreement, certification or partner status with any of these
                vendors. Where a platform is genuinely the wrong fit we will say so, and that
                recommendation costs us nothing either way.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["HubSpot", "CRM architecture, lifecycle design, automation workflows and governed reporting."],
                ["Salesforce", "Data model discipline, lead management governance and measurement frameworks."],
                ["Zoho and mid-market suites", "Practical set-up and hands-on help for teams without a dedicated admin."],
                ["In-house and hybrid stacks", "360-degree customer view design integrating purchase history, survey data and third-party sources."],
              ].map(([t, d]) => (
                <div key={t} className="bg-white border rounded-2xl p-5 shadow-sm">
                  <div className="font-semibold text-indigo-700 text-sm">{t}</div>
                  <div className="mt-2 text-xs text-slate-600">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Key service pathways</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            These pathways cover the foundations leaders need for predictable execution and reliable reporting.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <Link
              href="/services/crm-and-revenue-operations/crm-architecture-governance"
              className="bg-slate-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-indigo-700">CRM architecture and governance</div>
              <p className="mt-3 text-sm text-slate-600">
                Data model discipline, definitions, permissions, hygiene rules, integrations and governance cadence aligned across teams.
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-700">Explore CRM governance →</div>
            </Link>

            <Link
              href="/services/crm-and-revenue-operations/lifecycle-lead-management"
              className="bg-slate-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-indigo-700">Lifecycle and lead management</div>
              <p className="mt-3 text-sm text-slate-600">
                Lifecycle stages, routing and SLAs, journey orchestration, segmentation and operational handoffs for B2B and B2C.
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-700">Explore lifecycle design →</div>
            </Link>

            <Link
              href="/services/crm-and-revenue-operations/revenue-analytics"
              className="bg-slate-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-lg font-semibold text-indigo-700">Revenue analytics and measurement</div>
              <p className="mt-3 text-sm text-slate-600">
                Funnel definitions, metric governance, attribution rules where relevant, and dashboards leaders can trust.
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-700">Explore measurement →</div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            We link strategy to systems through governance, delivery and measurable outcomes.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              ["Operating model and governance", "Lifecycle definitions, ownership, routing, SLAs and change control that keep execution stable."],
              ["CRM discipline and data model", "Field standards, naming conventions, permissions, data hygiene rules, and source of truth alignment."],
              ["Omnichannel lifecycle orchestration", "Email, SMS, WhatsApp, web, app and service signals coordinated into journeys."],
              ["Content operations and AI workflows", "Faster content creation with brand guardrails, controlled personalisation, and measurable performance."],
              ["Delivery and enablement", "We lead the rollout, do hands-on work where it helps, and leave documentation and trained owners behind. Platform experience includes IBM watsonx, HubSpot, Salesforce, Zoho and in-house CRM builds with 360-degree customer view design."],
              ["Measurement governance", "Metric definitions and reporting rules that remain stable across teams and cycles."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about lifecycle governance, CRM discipline, automation workflows, and measurement stability.
          </p>

          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-slate-50 border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">{q.name}</summary>
                <div className="mt-3 text-sm text-slate-600">{q.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedResources
        resources={[
          {
            href: "/insights/crm-governance-checklist",
            label: "The CRM governance SOP template",
            detail:
              "The operating model that stops CRM data degrading again once it has been cleaned up.",
          },
          {
            href: "/insights/marketing-automation-maturity",
            label: "Marketing automation maturity scorecard",
            detail:
              "Four dimensions that separate a governed automation programme from a scheduled email tool.",
          },
          {
            href: "/insights/revenue-attribution-readiness",
            label: "Revenue attribution readiness",
            detail:
              "Whether the pipeline data can support an attribution model, before you buy one.",
          },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}