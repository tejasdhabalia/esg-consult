import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `EcoVadis readiness advisory | ${site.legalName}`,
  description:
    "EcoVadis readiness advisory for organisations that need a stronger score and a submission-ready evidence trail. We assess gaps, strengthen policies, map evidence, and review the submission before you hit send.",
  alternates: { canonical: absUrl("/services/esg-advisory/ecovadis-readiness") },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EcoVadis readiness advisory?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EcoVadis readiness advisory helps organisations prepare for an EcoVadis assessment by strengthening policies, mapping evidence, validating data, and identifying the improvements most likely to increase score quality before submission.",
      },
    },
    {
      "@type": "Question",
      name: "What does EcoVadis assess?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EcoVadis assesses four themes: Environment, Labour and Human Rights, Ethics, and Sustainable Procurement. The score depends on the quality of policies, actions, results, and documentation provided as evidence.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help if this is our first EcoVadis request?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We support first-time submissions by clarifying what applies, identifying evidence gaps, strengthening documentation, and building a practical submission plan.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help improve an existing EcoVadis score?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We can review the current score, identify where the strongest uplift opportunities sit, and create a targeted improvement roadmap for the next cycle.",
      },
    },
    {
      "@type": "Question",
      name: "Do you write the submission for us?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "We support submission readiness, evidence mapping, drafting support, and final review. The process remains grounded in your organisation's actual policies, data, and operating reality.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a general sustainability assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EcoVadis is highly documentation-driven. Good intentions and informal practices are not enough. Buyers and procurement teams score your evidence, not your intent.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide assurance or certification?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. We do not provide statutory audit, assurance, or certification. We prepare organisations to submit with stronger documentation, data quality, and governance.",
      },
    },
  ],
};

export default function EcoVadisReadinessPage() {
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
        name: "EcoVadis readiness",
        item: absUrl("/services/esg-advisory/ecovadis-readiness"),
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "EcoVadis readiness advisory",
    description:
      "EcoVadis readiness advisory for organisations that need a stronger score and a submission-ready evidence trail. Covers baseline gap assessment, policy review, evidence mapping, scoring strategy, submission review, and post-assessment roadmap.",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
    areaServed: ["United Kingdom", "European Union", "India"],
    serviceType: [
      "EcoVadis gap assessment",
      "Policy and documentation review",
      "Evidence mapping",
      "Scoring improvement strategy",
      "Submission review",
      "Improvement roadmap",
    ],
    url: absUrl("/services/esg-advisory/ecovadis-readiness"),
  };

  return (
    <div>
      <PageHero
        title="EcoVadis readiness advisory"
        subtitle="Built for organisations that cannot afford a low score. We take you from current state to submission-ready with stronger documentation, clearer evidence, and less guesswork."
        primaryAction={{ label: "Book a consultation", href: "/contact" }}
        secondaryAction={{ label: "Back to ESG advisory", href: "/services/esg-advisory" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/esg.jpg"
        imageAlt="EcoVadis readiness and evidence mapping support for procurement-driven sustainability assessments"
      />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">A strong sustainability story needs evidence that stands up</h2>
          <p className="mt-6 text-slate-600">
            EcoVadis assessments are deceptively demanding. A strong sustainability programme means little without the documentation,
            policies, and data trail to back it up. Buyers and procurement teams are scoring your evidence, not your intentions.
          </p>
          <p className="mt-4 text-slate-600">
            Our EcoVadis readiness service takes you from where you are today to submission-ready, systematically and without guesswork.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="underline text-slate-700" href="/services/esg-advisory">
              ESG advisory hub
            </Link>
            <Link className="underline text-slate-700" href="/services/esg-advisory/carbon-accounting">
              Carbon accounting
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
          <p className="mt-4 text-slate-600 max-w-4xl">
            We focus on the evidence quality, policy depth, and submission discipline that drive the result.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {[
              [
                "Baseline gap assessment",
                "Assessment against all four EcoVadis themes: Environment, Labour and Human Rights, Ethics, and Sustainable Procurement.",
              ],
              [
                "Policy and documentation review",
                "Review existing policies, identify gaps, and strengthen or develop documentation where needed.",
              ],
              [
                "Data collection and evidence mapping",
                "Map evidence and supporting data to EcoVadis methodology so the submission is coherent and defensible.",
              ],
              [
                "Scoring strategy",
                "Identify the highest-impact improvement areas so time is spent where score movement is most likely.",
              ],
              [
                "Submission review",
                "Final review before submission so the package is complete, consistent, and aligned to the methodology.",
              ],
              [
                "Post-assessment roadmap",
                "Debrief on results and define the next improvement cycle if you are targeting stronger performance next time.",
              ],
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
          <h2 className="text-3xl font-semibold">Where this service is most valuable</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              [
                "First submission",
                "When you need to respond to your first EcoVadis request and want a structured, practical route to submission.",
              ],
              [
                "Score improvement",
                "When you want to move from Bronze to Silver, or from Silver to Gold, with focused improvement rather than broad effort.",
              ],
              [
                "Procurement pressure",
                "When a buyer or procurement team expects a stronger score and you need the evidence base to support that expectation.",
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
              Discuss EcoVadis readiness
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
            Common questions about EcoVadis scope, evidence quality, documentation, score improvement, and submission support.
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