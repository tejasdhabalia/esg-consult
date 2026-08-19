import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export type StackLayer = {
  /** Layer name, e.g. "Storefront and commerce". */
  layer: string;
  /** Platforms commonly seen at this layer. Context, not a capability claim. */
  platforms: string;
};

export type IndustryFaq = {
  question: string;
  answer: string;
};

export type RelatedService = {
  route: string;
  label: string;
  /** Why this service line is the one that touches this fracture point. */
  relevance: string;
};

export type IndustryPageProps = {
  route: string;
  label: string;

  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;

  /** What the stack usually looks like. Naming platforms is credibility. */
  stackIntro: string;
  stack: StackLayer[];

  /** The fracture point. This is the part of the page worth reading. */
  fractureHeading: string;
  fractureParagraphs: string[];

  /** What we actually do about it, mapped to service lines. */
  relatedServices: RelatedService[];

  /**
   * Where the observation comes from. Required, not optional.
   * Name the employer and the pattern, never a client.
   */
  provenanceHeading: string;
  provenanceParagraphs: string[];

  faqs: IndustryFaq[];
};

export default function IndustryPage({
  route,
  label,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  stackIntro,
  stack,
  fractureHeading,
  fractureParagraphs,
  relatedServices,
  provenanceHeading,
  provenanceParagraphs,
  faqs,
}: IndustryPageProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Industries", item: absUrl("/industries") },
      { "@type": "ListItem", position: 3, name: label, item: absUrl(route) },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "All industries", href: "/industries" }}
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
      />

      {/* THE FRACTURE POINT. Lead with it, it is the reason to read on. */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">{fractureHeading}</h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {fractureParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* THE STACK */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What the stack usually looks like</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">{stackIntro}</p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {stack.map((item, index) => (
              <div
                key={item.layer}
                className={`grid md:grid-cols-3 gap-2 md:gap-8 px-8 py-6 ${
                  index > 0 ? "border-t border-slate-200" : ""
                }`}
              >
                <div className="font-semibold text-slate-900">{item.layer}</div>
                <div className="md:col-span-2 text-sm text-slate-600 leading-relaxed">
                  {item.platforms}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500 max-w-3xl leading-relaxed">
            Listed as context, not as a capability claim. We hold no reseller agreement,
            certification or partner status with any of these vendors.
          </p>
        </div>
      </section>

      {/* WHAT WE DO ABOUT IT */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we do about it</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {relatedServices.map((service) => (
              <Link
                key={service.route}
                href={service.route}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900">{service.label}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {service.relevance}
                </p>
                <div className="mt-5 text-sm font-medium text-indigo-700">Read more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">{provenanceHeading}</h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {provenanceParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
          >
            {site.assessment.label}
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>

          <div className="mt-12 grid gap-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="bg-slate-50 border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {faq.question}
                </summary>
                <div className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
