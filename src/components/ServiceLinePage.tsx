import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export type ServiceScopeItem = {
  title: string;
  detail: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceLinePageProps = {
  /** Route of this page, e.g. "/services/integration". Used for breadcrumb and schema. */
  route: string;
  /** Service line name as it appears in navigation. */
  label: string;

  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  /** Optional caveat under the hero buttons. */
  heroNote?: string;

  /** The problem this line exists to solve. Two or three short paragraphs. */
  problemHeading: string;
  problemParagraphs: string[];

  /** What the work covers. Four to six items. */
  scope: ServiceScopeItem[];

  /** Named artefacts the client ends up holding. */
  deliverables: string[];

  /** Situations that mean it is time to call. */
  signals: string[];

  faqs: ServiceFaq[];
};

export default function ServiceLinePage({
  route,
  label,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  heroNote,
  problemHeading,
  problemParagraphs,
  scope,
  deliverables,
  signals,
  faqs,
}: ServiceLinePageProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: label, item: absUrl(route) },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: label,
    serviceType: label,
    url: absUrl(route),
    description: heroSubtitle,
    provider: {
      "@type": "ProfessionalService",
      name: site.legalName,
      url: site.baseUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${label} scope`,
      itemListElement: scope.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
      })),
    },
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
        secondaryAction={{ label: "Back to services", href: "/services" }}
        note={heroNote}
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
      />

      {/* THE PROBLEM */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">{problemHeading}</h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {problemParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What the work covers</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {scope.map((item) => (
              <div key={item.title} className="bg-white border rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES AND SIGNALS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">What you end up holding</h2>
              <p className="mt-3 text-slate-600">
                Named artefacts, handed over. Not a slide deck summarising them.
              </p>
              <ul className="mt-7 space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-slate-900 p-10">
              <h2 className="text-2xl font-semibold text-slate-900">When to call us</h2>
              <p className="mt-3 text-slate-600">
                Any one of these is enough. You do not need a defined project first.
              </p>
              <ul className="mt-7 space-y-4">
                {signals.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ASSESSMENT CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold">An assessment, not a proposal</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                {site.assessment.duration} at a fixed price, delivered as a decision document.
                You own the output whether or not you carry on with us.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
              >
                {site.assessment.label}
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8">
              <p className="text-slate-300 leading-relaxed">
                {site.positioning.independenceShort}
              </p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                We do not provide {site.positioning.doesNotDo.join(", ").toLowerCase()}.
              </p>
            </div>
          </div>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
