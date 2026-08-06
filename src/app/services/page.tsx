import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceLines } from "@/lib/service-lines";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Six service lines covering mid-market technology projects. Systems selection, delivery oversight, integration, CRM and revenue operations, AI in operations, and ESG reporting systems.",
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.displayName} Services`,
    itemListElement: serviceLines.map((line, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: line.label,
      url: absUrl(line.route),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
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
        name: "What makes you different from a systems integrator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depth on both sides. We have built these systems, so we can tell a configuration from a customisation and design an interface that survives contact with real data. We also read a business case, a close calendar and a board pack, so we can tell which requirement is load bearing and which is a preference.",
        },
      },
      {
        "@type": "Question",
        name: "Can you come in halfway through a project that has already gone wrong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Implementation and delivery oversight is often bought mid-project, once scope has drifted from the original business case. We start by establishing what was actually agreed and what has been built against it.",
        },
      },
      {
        "@type": "Question",
        name: "Will you tell us which system to buy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, and we will show you the scoring behind it. We take no commissions, referral fees, reseller margin or partner incentives from any software vendor, so there is nothing sitting between the recommendation and your interest.",
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
        name: "Do you provide statutory audit or assurance on ESG reports?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We build the reporting system, the data ownership model, the controls and the evidence trail so that assurance can be performed by someone else.",
        },
      },
      {
        "@type": "Question",
        name: "How does an engagement start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With an assessment. Two to four weeks at a fixed price, delivered as a decision document rather than a proposal. You own the output whether or not you continue with us.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Six service lines, one firm"
        subtitle="Technology projects for mid-market companies. ERP, CRM, integration, data and AI. The same people take the work from the decision through to the build."
        painLine={site.positioning.supporting}
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "Read our insights", href: "/insights" }}
        imageSrc="/hero/services.jpg"
        imageAlt="DS Consulting services, technology consulting and implementation"
      />

      {/* SERVICE LINES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What we do</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Each line covers both the thinking and the build. You are not handed to a delivery
            team you have never met once the scope is signed.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {serviceLines.map((line) => (
              <div key={line.route} className="bg-slate-50 border rounded-2xl p-10">
                <h3 className="text-2xl font-semibold text-slate-900">{line.label}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{line.summary}</p>

                <ul className="mt-6 text-sm text-slate-600 space-y-2">
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
                    className="mt-7 inline-block text-indigo-700 font-medium hover:text-indigo-800"
                  >
                    Explore {line.label.toLowerCase()} →
                  </Link>
                ) : (
                  <div className="mt-7 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Detail page in progress
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPTH */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">What you are actually buying</h2>
          <p className="mt-5 text-slate-300 max-w-3xl leading-relaxed">
            The service lines describe the work. This describes the people doing it.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {site.positioning.depth.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE DELIVER */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we deliver</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            The same four stages whichever line the work sits in.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            {[
              [
                "Assess",
                "What you are trying to do, what you already run and where the two do not meet.",
              ],
              [
                "Decide",
                "Options scored against your requirements, with the scoring handed over, not just the answer.",
              ],
              [
                "Build",
                "Configuration, integration, migration and testing, run by the people who scoped it.",
              ],
              [
                "Hand over",
                "Documentation, enablement and a defined point where your team owns it.",
              ],
            ].map(([title, detail]) => (
              <div key={title} className="bg-slate-50 border rounded-2xl p-8">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-3 text-sm text-slate-600 leading-relaxed">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE ARE PAID */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we are paid</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            {site.positioning.independenceShort}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {site.positioning.independenceProof.map((point) => (
              <div key={point} className="bg-white border rounded-2xl p-8 text-slate-700 leading-relaxed">
                {point}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border-2 border-slate-900 bg-white p-10">
            <h3 className="text-xl font-semibold text-slate-900">What we do not do</h3>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Every item here is a revenue line that would give us a reason to recommend one
              thing over another.
            </p>
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
            <Link
              href="/about"
              className="border bg-white px-6 py-3 rounded-lg font-medium text-center"
            >
              About {site.displayName}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>

          <div className="mt-12 grid gap-6">
            {faqSchema.mainEntity.map((item) => (
              <details key={item.name} className="bg-slate-50 border rounded-2xl p-6">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
