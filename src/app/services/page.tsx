import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pillars } from "@/lib/service-pillars";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "What DS Consulting does for mid-market companies. Business systems covering commerce, ERP, CRM, integration and AI. Sustainability and ESG reporting. Outsourced finance and accounting teams.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why do technology, sustainability and finance operations sit in the same firm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because they meet in the finance function. A sustainability disclosure is a data problem before it is a reporting problem. An outsourced finance team is only as good as the systems it works in. And most technology projects are judged on numbers that come out of finance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you do the consulting and the implementation, or just one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both. We scope the work and we deliver it. The people who scope your project are the people who deliver it, and anyone who will work on delivery is introduced to you during scoping.",
        },
      },
      {
        "@type": "Question",
        name: "Who delivers the finance and accounting work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Offshore delivery runs through a partner firm rather than through our own staff, and you are introduced to the team during scoping. We remain accountable for the systems the function runs in. Our partner is a technology-agnostic offshoring firm rather than a software vendor, so this arrangement does not affect any recommendation we make.",
        },
      },
      {
        "@type": "Question",
        name: "Will you tell us which system to buy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, and we will show you the scoring behind it. We take no commissions, referral fees, reseller margin or partner incentives from any software vendor.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide IT support or manage our infrastructure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not provide IT support, help desk, networking or hardware, and we do not resell software.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. On sustainability work we build the reporting system, the controls and the evidence trail so that assurance can be performed by someone else.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Three kinds of work, one firm"
        subtitle="Technology systems, sustainability reporting and finance operations. They meet in the finance function, which is why running them separately is where things get lost."
        painLine={site.positioning.supporting}
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "Read our insights", href: "/insights" }}
        imageSrc="/hero/services.jpg"
        imageAlt="DS Consulting services across technology, sustainability and finance"
      />

      {pillars.map((pillar, index) => (
        <section
          key={pillar.route}
          className={index % 2 === 0 ? "py-24 bg-white" : "py-24 bg-slate-50"}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-semibold text-indigo-700">0{index + 1}</span>
              <h2 className="text-3xl font-semibold text-slate-900">{pillar.title}</h2>
            </div>

            <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">{pillar.summary}</p>
            <p className="mt-3 text-sm text-slate-500 max-w-3xl leading-relaxed">
              {pillar.rationale}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {pillar.lines.map((line) => (
                <div
                  key={line.route}
                  className={`rounded-2xl border p-8 ${
                    index % 2 === 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
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
      ))}

      {/* HOW WE DELIVER */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver</h2>
          <p className="mt-4 text-slate-300 max-w-3xl">
            The same four stages whichever kind of work it is.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              ["Assess", "What you are trying to do, what you already run and where the two do not meet."],
              ["Decide", "Options scored against your requirements, with the scoring handed over."],
              ["Build", "Configuration, integration, migration and testing, run by the people who scoped it."],
              ["Hand over", "Documentation, enablement and a defined point where your team owns it."],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8"
              >
                <div className="font-semibold text-white">{title}</div>
                <div className="mt-3 text-sm text-slate-300 leading-relaxed">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE ARE PAID */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we are paid</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            {site.positioning.independenceShort}
          </p>

          <div className="mt-10 rounded-2xl border-2 border-slate-900 p-10">
            <h3 className="text-xl font-semibold text-slate-900">What we do not do</h3>
            <div className="mt-7 flex flex-wrap gap-3">
              {site.positioning.doesNotDo.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              {site.assessment.label}
            </Link>
            <Link href="/about" className="border px-6 py-3 rounded-lg font-medium text-center">
              About {site.displayName}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((item) => (
              <details key={item.name} className="bg-white border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {item.name}
                </summary>
                <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </div>
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
