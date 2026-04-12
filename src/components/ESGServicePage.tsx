import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import type { ESGServiceConfig } from "@/lib/esgServiceConfigs";

type Props = {
  config: ESGServiceConfig;
};

export default function ESGServicePage({ config }: Props) {
  const route = `/services/esg-advisory/${config.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "ESG advisory", item: absUrl("/services/esg-advisory") },
      { "@type": "ListItem", position: 4, name: config.title, item: absUrl(route) },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.title,
    description: config.description,
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["United Kingdom", "European Union", "India"],
    serviceType: config.serviceTypes,
    url: absUrl(route),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.description,
      },
    })),
  };

  return (
    <div>
      <PageHero
        title={config.title}
        subtitle={config.description}
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/esg.jpg"
        imageAlt={config.heroAlt}
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">{config.introHeading}</h2>

          {config.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-slate-600">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/esg-advisory">
              ESG advisory hub
            </Link>
            {config.introLinks.map((link) => (
              <Link key={link.href} className="underline text-slate-700" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we cover</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">{config.coverageIntro}</p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {config.deliverables.map((item) => (
              <div key={item.title} className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="font-semibold text-slate-900">{item.title}</div>
                <div className="mt-3 text-sm text-slate-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Where this service is most valuable</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">{config.bestFitIntro}</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {config.bestFit.map((item) => (
              <div key={item.title} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{item.title}</div>
                <div className="mt-3 text-sm text-slate-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we work</h2>
          <p className="mt-4 text-slate-300 max-w-4xl">{config.workflowIntro}</p>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {config.workflow.map((item) => (
              <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                <div className="font-semibold text-emerald-400">{item.title}</div>
                <div className="mt-3 text-sm text-slate-300">{item.description}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Book a consultation
            </Link>
            <Link
              href="/services/esg-advisory"
              className="border border-slate-600 px-6 py-3 rounded-lg font-medium text-center"
            >
              View all ESG pathways
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-4xl">
            Common questions about this ESG service and how we support delivery.
          </p>

          <div className="mt-12 grid gap-6">
            {config.faq.map((item) => (
              <details key={item.title} className="bg-white border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">{item.title}</summary>
                <div className="mt-3 text-sm text-slate-600">{item.description}</div>
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
