import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import type { Pillar } from "@/lib/service-pillars";

export type PillarFaq = {
  question: string;
  answer: string;
};

export type PillarHubProps = {
  pillar: Pillar;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  /** Optional caveat under the hero buttons. */
  heroNote?: string;

  /** Why this pillar exists. Two or three short paragraphs. */
  problemHeading: string;
  problemParagraphs: string[];

  /** Situations that mean it is time to call. */
  signals: string[];

  faqs: PillarFaq[];
};

export default function PillarHub({
  pillar,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  heroNote,
  problemHeading,
  problemParagraphs,
  signals,
  faqs,
}: PillarHubProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: pillar.title, item: absUrl(pillar.route) },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pillar.title,
    serviceType: pillar.title,
    url: absUrl(pillar.route),
    description: pillar.summary,
    provider: {
      "@type": "ProfessionalService",
      name: site.legalName,
      url: site.baseUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${pillar.title} services`,
      itemListElement: pillar.lines.map((line, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: line.label,
        description: line.summary,
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
        secondaryAction={{ label: "All services", href: "/services" }}
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

      {/* SERVICE LINES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What this covers</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">{pillar.rationale}</p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {pillar.lines.map((line) => (
              <div key={line.route} className="bg-white border rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-slate-900">{line.label}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{line.summary}</p>

                <ul className="mt-5 text-sm text-slate-600 space-y-2">
                  {line.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {line.live ? (
                  <Link
                    href={line.route}
                    className="mt-6 inline-block text-indigo-700 font-medium hover:text-indigo-800"
                  >
                    Read more →
                  </Link>
                ) : (
                  <div className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Page in progress
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNALS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">When to call us</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Any one of these is enough. You do not need a defined project first, and the
                assessment exists partly to work out whether there is one.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                {site.assessment.label}
              </Link>
            </div>

            <ul className="space-y-4">
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
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <div className="mt-12 grid gap-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="bg-white border rounded-2xl p-6">
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
