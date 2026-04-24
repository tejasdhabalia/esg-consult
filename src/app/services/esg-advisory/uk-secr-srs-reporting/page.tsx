import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "UK SECR and SRS reporting",
  description:
    "UK SECR and SRS reporting support. Scoping, energy and carbon data, emissions methodology, KPI development, narrative drafting and evidence mapping.",
  path: "/services/esg-advisory/uk-secr-srs-reporting",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does this service cover for SECR?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We support SECR scoping, energy and carbon data collection, emissions calculations, intensity ratio development, efficiency narrative, and director's report drafting.",
      },
    },
    {
      "@type": "Question",
      name: "What does this service cover for SRS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We support reporting against all five SRS themes: Climate Change, Ecology, Resource Management, Social Value, and Governance, with data framework, KPI benchmarking, narrative drafting, and improvement roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "Do you calculate Scope 1, 2 and 3 emissions?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We support Scope 1, 2, and where relevant Scope 3 calculations using appropriate methodologies and documented assumptions.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help if we are reporting for the first time?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We support first-time reporting by clarifying applicability, setting the boundary, building the data framework, and drafting the narrative so the first cycle is more controlled.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help tighten disclosures that have not kept pace with scrutiny?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We can review the current reporting approach, identify methodology and evidence gaps, and improve the disclosures for future cycles.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide audit or assurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. We do not provide statutory audit or assurance. We strengthen methodology, governance, controls, and evidence trails so reporting is more defensible.",
      },
    },
    {
      "@type": "Question",
      name: "How does this connect to carbon accounting?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Carbon accounting often sits underneath SECR & SRS and other climate disclosures. We can support both as a joined-up workstream so the numbers and the narrative align.",
      },
    },
  ],
};

export default function UKSecrSrsReportingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG advisory", item: absUrl("/services/esg-advisory") },
      {
        "@type": "ListItem",
        position: 4,
        name: "UK SECR and SRS reporting",
        item: absUrl("/services/esg-advisory/uk-secr-srs-reporting"),
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UK SECR and SRS reporting",
    description:
      "Advisory plus implementation for UK SECR and SRS reporting, covering scoping, carbon and energy data, emissions methodology, KPI development, evidence mapping, board-ready drafting, and future-cycle improvement roadmap.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["United Kingdom"],
    serviceType: [
      "SECR scoping",
      "Energy and carbon data collection",
      "Scope 1, 2 and 3 emissions calculation",
      "Intensity ratio development",
      "Director's report drafting",
      "SRS data framework",
      "KPI benchmarking",
      "Board-ready reporting",
    ],
    url: absUrl("/services/esg-advisory/uk-secr-srs-reporting"),
  };

  return (
    <div>
      <PageHero
        title="UK SECR and SRS reporting"
        subtitle="Accurate, auditable, and done properly. We support the full reporting cycle so you are not scrambling at year-end and your numbers hold up to scrutiny."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/uk-climate.jpg"
        imageAlt="UK SECR and SRS reporting support with methodology, evidence, and board-ready drafting"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">UK reporting needs more than a spreadsheet and good intentions</h2>
          <p className="mt-6 text-slate-600">
            Reporting under SECR and SRS demands consistent methodology, reliable data, clear boundary-setting, and disclosure that holds up to scrutiny.
          </p>
          <p className="mt-4 text-slate-600">
            Our service covers the full cycle so you are not scrambling at year-end, and the numbers mean something.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/esg-advisory/carbon-accounting">
              Carbon accounting
            </Link>
            <Link className="underline text-slate-700" href="/services/esg-advisory">
              ESG advisory hub
            </Link>
            <Link className="underline text-slate-700" href="/regulatory-hub">
              Regulatory hub
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we cover</h2>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="text-lg font-semibold text-slate-900">For SECR</div>
              <div className="mt-4 grid gap-4 text-sm text-slate-600">
                <p>Eligibility and scoping, confirming what applies to your organisation.</p>
                <p>Energy and carbon data collection, cleansing, and validation.</p>
                <p>Scope 1, 2, and 3 emissions calculation using appropriate methodologies.</p>
                <p>Intensity ratio development and year-on-year comparability.</p>
                <p>Energy efficiency narrative and actions disclosure.</p>
                <p>Director's report drafting, ready for audit and filing.</p>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="text-lg font-semibold text-slate-900">For SRS</div>
              <div className="mt-4 grid gap-4 text-sm text-slate-600">
                <p>Alignment to all five SRS themes: Climate Change, Ecology, Resource Management, Social Value, and Governance.</p>
                <p>Data collection framework and evidence mapping.</p>
                <p>KPI benchmarking against sector peers.</p>
                <p>Board-ready report drafting with supporting narrative.</p>
                <p>Gap analysis and improvement roadmap for future cycles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Where this service fits</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              [
                "First cycle reporting",
                "When you need to establish methodology, boundaries, and a data framework that can be repeated next year.",
              ],
              [
                "Disclosure tightening",
                "When disclosures exist, but have not kept pace with scrutiny, evidence expectations, or year-on-year comparability.",
              ],
              [
                "Joined-up SECR and SRS reporting",
                "When carbon accounting, reporting narrative, and board confidence all need to improve together.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-3 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss SECR or SRS reporting
            </Link>
            <Link href="/services" className="border px-6 py-3 rounded-lg font-medium text-center">
              Back to Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about UK SECR, SRS, emissions methodology, evidence mapping, and board-ready reporting.
          </p>

          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-white border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">{q.name}</summary>
                <div className="mt-3 text-sm text-slate-600">{q.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}