import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Compare approaches and partners",
  description:
    "Side-by-side comparisons to help leaders choose between approaches and partners on business systems, sustainability reporting and finance operations. Clarity, tradeoffs, next steps.",
  path: "/compare",
});

const comparePages = [
  {
    href: "/compare/ds-consulting-vs-generalist-agencies",
    title: "DS Consulting vs Generalist Agencies",
    summary:
      "A practical comparison for leaders deciding between an agency style partner and a systems plus governance partner.",
    audience: "CEO, CFO, CSO, CMO, CRO, RevOps",
  },
  {
    href: "/compare/in-house-vs-outsourced-crm-governance",
    title: "In house vs Outsourced CRM Governance",
    summary:
      "When to build governance internally, when to bring an external partner, and how to avoid ongoing firefighting.",
    audience: "CMO, CRO, RevOps, CIO",
  },
] as const;

export default function CompareHubPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absUrl("/compare") },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.displayName} Comparison Pages`,
    itemListElement: comparePages.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.title,
      url: absUrl(p.href),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who should use these comparison pages?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "These pages are for leaders who must choose a delivery model. They clarify tradeoffs across in house delivery, agencies, and governance plus implementation partners.",
        },
      },
      {
        "@type": "Question",
        name: "What is the main difference between DS Consulting and an agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Agencies typically focus on output and execution. DS Consulting focuses on the operating model underneath so execution becomes repeatable. That includes definitions, governance, handoffs, controls, and measurement discipline.",
        },
      },
      {
        "@type": "Question",
        name: "When does it make sense to build governance in house?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "In house works when you already have clear ownership, strong process discipline, and the ability to maintain systems over time. If teams are firefighting or metrics are disputed, external support can stabilize the foundation faster.",
        },
      },
      {
        "@type": "Question",
        name: "Can you run more than one of these workstreams at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, and it is often the reason to use one firm rather than three. Parallel workstreams share a data model and a set of definitions, so you do not end up with reporting systems that disagree with each other.",
        },
      },
      {
        "@type": "Question",
        name: "How should we choose the right partner?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Choose based on outcomes and constraints. If you need repeatable systems with governance and measurable delivery, prioritize a partner that designs the operating model and implements it end to end.",
        },
      },
      {
        "@type": "Question",
        name: "What is a typical starting point if we are unsure?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with a short diagnostic that clarifies ownership, definitions, data quality, and decision cadence. That becomes the roadmap for implementation.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not provide statutory audit or assurance.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Compare"
        subtitle="Make confident choices between in house delivery, agencies, and governance plus implementation partners. These comparisons are designed to reduce ambiguity and help you decide the next best step."
        primaryAction={{ label: "Explore services", href: "/services" }}
        secondaryAction={{ label: "Talk to us", href: "/contact" }}
        imageSrc="/hero/services.jpg"
        imageAlt="Comparison guides for selecting the right consulting partner and delivery model"
      />

      {/* Compare cards */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Comparison guides</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Each guide is written for decision makers. You will see clear tradeoffs, who each option fits, and what to do next.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {comparePages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-white hover:shadow-sm transition"
              >
                <div className="text-lg font-semibold text-slate-900">{p.title}</div>
                <p className="mt-3 text-sm text-slate-600">{p.summary}</p>
                <div className="mt-4 text-xs text-slate-500">Audience: {p.audience}</div>
                <div className="mt-6 text-sm font-medium text-indigo-700">Read the comparison →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How to use these comparisons</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">Start with constraints</div>
              <p className="mt-3 text-sm text-slate-600">
                Define timeline, internal ownership, and what success must look like. The right model depends on constraints, not preferences.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">Choose repeatability</div>
              <p className="mt-3 text-sm text-slate-600">
                If results are inconsistent, prioritize governance and systems first. Execution improves when the operating model is stable.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">Decide the next step</div>
              <p className="mt-3 text-sm text-slate-600">
                If the comparison highlights a gap, move to a focused diagnostic. That becomes a roadmap and implementation plan.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href="/services/esg-advisory"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium text-center"
            >
              ESG advisory
            </Link>
            <Link
              href="/services/crm-and-revenue-operations"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium text-center"
            >
              Marketing automation and RevOps
            </Link>
            <Link
              href="/contact"
              className="border border-slate-300 px-5 py-3 rounded-lg font-medium text-center"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Quick answers to the most common decision questions we hear from leaders.
          </p>

          <div className="mt-10 grid gap-4">
            {faqSchema.mainEntity.map((q: any) => (
              <details key={q.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <summary className="font-semibold text-slate-900 cursor-pointer">
                  {q.name}
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  {q.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}