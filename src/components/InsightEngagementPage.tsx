import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import InsightResourceForm from "@/components/InsightResourceForm";
import type { EsgInsightPageConfig } from "@/lib/esg-insight-pages";

export default function InsightEngagementPage({ config }: { config: EsgInsightPageConfig }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    author: {
      "@type": "Person",
      name: config.author.name,
      jobTitle: config.author.role,
      url: absUrl("/team"),
      sameAs: config.author.linkedin,
    },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    url: absUrl(`/insights/${config.slug}`),
    datePublished: config.datePublished,
    dateModified: config.dateModified,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      { "@type": "ListItem", position: 3, name: config.title, item: absUrl(`/insights/${config.slug}`) },
    ],
  };

  return (
    <div className="bg-white">
      <div className={`${config.heroBgClass} text-white px-6 py-20`}>
        <div className="max-w-4xl mx-auto">
          <nav className={`text-sm ${config.heroBreadcrumbClass} mb-6`}>
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className={config.heroCurrentClass}>{config.breadcrumbLabel ?? config.title}</span>
          </nav>

          <div className={`inline-block ${config.badgeClass} text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide`}>
            {config.badge}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{config.title}</h1>
          <p className={`text-lg max-w-2xl mb-8 ${config.heroSummaryClass}`}>{config.description}</p>

          <div className={`flex items-center gap-4 text-sm ${config.heroMetaClass}`}>
            <div className="flex items-center gap-2">
              <Image src={config.author.imageSrc} alt={config.author.name} width={32} height={32} className="rounded-full object-cover" />
              <div>
                <div className="text-white font-medium">{config.author.name}</div>
                <div className="text-xs opacity-80">{config.author.roleShort}</div>
              </div>
            </div>
            <span>·</span>
            <span>{config.displayDate}</span>
            <span>·</span>
            <span>{config.readTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className={`${config.quoteBoxClass} border rounded-2xl p-6 mb-10`}>
              <p className="text-slate-700 text-sm leading-relaxed italic">&ldquo;{config.quote.text}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-slate-700">{config.quote.attribution}</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What you get</h2>
              <p className="text-slate-600 leading-relaxed mb-4">{config.whatYouGetIntro}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {config.whatYouGetCards.map((card) => (
                  <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="font-semibold text-slate-900 text-sm mb-2">{card.title}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Right for you if</h2>
              <div className="space-y-3">
                {config.rightForYou.map((item, index) => (
                  <div key={item} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
                    <div className={`w-7 h-7 rounded-full ${config.numberPillClass} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              {config.sections.map((section) => (
                <section key={section.id} id={section.id} className={`${section.colorClass} border rounded-2xl p-6`}>
                  <h2 className={`text-2xl font-bold mb-3 ${section.accentClass}`}>{section.title}</h2>
                  {section.intro ? <p className="text-sm text-slate-600 leading-relaxed mb-5">{section.intro}</p> : null}
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.item} className="bg-white/80 border border-white rounded-xl p-4">
                        <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.item}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Why this matters</h2>
              {config.whyItMatters.map((paragraph) => (
                <p key={paragraph} className="text-slate-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                {config.faqs.map((q) => (
                  <div key={q.question}>
                    <h3 className="font-semibold text-slate-900 mb-2">{q.question}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className={`${config.sidebarCtaClass} rounded-2xl p-6 text-white`}>
                <h3 className="font-bold text-base mb-2">{config.resourceCtaTitle}</h3>
                <p className="text-sm mb-4 opacity-90">{config.resourceCtaBody}</p>
                <InsightResourceForm resourceKey={config.resourceKey} theme="dark" />
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-start gap-4">
                  <Image src={config.author.imageSrc} alt={config.author.name} width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">{config.author.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{config.author.roleShort}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{config.author.bio}</p>
                    <a href={config.author.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-indigo-600 hover:underline font-medium">
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related services</h4>
                <div className="space-y-2">
                  {config.relatedServices.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-semibold text-slate-900 text-sm mb-3">Related insights</h4>
                <div className="space-y-3">
                  {config.relatedInsights.map((link) => (
                    <Link key={link.href} href={link.href} className="block group">
                      <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">{link.label} →</span>
                      <span className="block text-xs text-slate-500">{link.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
