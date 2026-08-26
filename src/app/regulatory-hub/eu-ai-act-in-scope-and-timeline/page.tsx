import Link from "next/link";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import ArticleByline from "@/components/ArticleByline";
import { tejas, personSchema } from "@/lib/authors";

/*
  REGULATORY CONTENT. Verified 26 August 2026.

  Sources:
    Regulation (EU) 2024/1689, the AI Act, in force 1 August 2024
    Regulation (EU) 2026/1744, the Digital Omnibus on AI, published in the
      Official Journal 24 July 2026, in force 27 July 2026
    European Commission, Article 50 transparency obligations FAQ,
      updated 24 July 2026
    Commission final Article 50 guidelines, published 20 July 2026

  Every date on this page:
    2 February 2025  Article 5 prohibitions, Article 4 AI literacy duty
    2 August 2025    GPAI model provider obligations
    2 August 2026    Article 50 transparency duties. NOT deferred
    2 December 2026  Article 50(2) marking extends to systems already on
                     the market before 2 August 2026. New Article 5
                     prohibitions on AI generated NCII and CSAM
    2 August 2027    Article 57 national regulatory sandboxes, and the
                     Commission deadline for Annex I delegated acts
    2 December 2027  Annex III high risk, deferred from 2 August 2026
    2 August 2028    Annex I high risk, deferred from 2 August 2027

  Penalty ceilings: EUR 35M or 7% (Article 5 breaches), EUR 15M or 3%
  (most others including Article 50), EUR 7.5M or 1% (misleading
  information). For SMEs and start-ups the lower figure applies.

  THE SAME DATES APPEAR IN TWO OTHER PLACES. The Obligation dates tab of
  ai-use-case-register-template.xlsx, and the body of
  /insights/ai-use-case-register. All three must agree. Re-verify together
  before republishing. This timetable has moved more than once and being
  right about it is the entire value of this page.
*/

export const metadata = pageMetadata({
  title: "EU AI Act timeline: what applies and when",
  description:
    "The high-risk delay to December 2027 is real but narrow. Article 50 transparency duties applied from 2 August 2026. What is live now and what comes next.",
  path: "/regulatory-hub/eu-ai-act-in-scope-and-timeline",
});

const definitionText =
  "The AI Act applies in stages rather than all at once. Prohibited practices and the AI literacy duty applied from 2 February 2025, obligations for general purpose AI models from 2 August 2025, and transparency duties under Article 50 from 2 August 2026. The Digital Omnibus on AI, Regulation (EU) 2026/1744, deferred high-risk obligations for standalone systems to 2 December 2027 and for AI embedded in regulated products to 2 August 2028. It did not defer the transparency duties.";

const definitionSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "EU AI Act timeline",
  alternateName: "Regulation (EU) 2024/1689 implementation timeline",
  description: definitionText,
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "DS Consulting Regulatory Dictionary",
    url: absUrl("/regulatory-hub"),
  },
};

// Rendered copy and FAQPage schema are built from this one array, so the
// two cannot drift apart.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was the EU AI Act delayed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partly. The Digital Omnibus on AI, Regulation (EU) 2026/1744, was published in the Official Journal on 24 July 2026 and entered into force on 27 July 2026, six days before the original high-risk deadline. It deferred high-risk obligations for standalone Annex III systems from 2 August 2026 to 2 December 2027, and for AI embedded in regulated products under Annex I to 2 August 2028. It did not defer the Article 50 transparency obligations, the Article 5 prohibitions or the Article 4 AI literacy duty. Reading the delay headline as a general postponement is the most common error in current commentary.",
      },
    },
    {
      "@type": "Question",
      name: "What applies from 2 August 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Article 50 transparency obligations, together with the enforcement powers that sit behind them. Article 50 requires that people are told when they are interacting with an AI system such as a chatbot, that AI-generated or manipulated output carries machine-readable marking, that individuals exposed to emotion recognition or biometric categorisation systems are informed, and that deepfakes and AI-generated text published on matters of public interest are clearly labelled. An organisation with no high-risk AI at all can still have significant obligations here.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI Act apply to companies outside the EU?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, where the output of the system is used inside the Union. Providers established outside the EU are in scope when they place AI systems on the EU market or when system output is used in the EU. Deployers outside the EU are in scope where the output is used in the EU. A business running AI-generated campaigns aimed at European audiences, or operating an assistant that serves customers in the Union, is caught regardless of where it is established.",
      },
    },
    {
      "@type": "Question",
      name: "Who is responsible, the provider or the deployer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both, for different things, and responsibility does not transfer automatically. Marking generated output is the provider's duty. Disclosing a deepfake, and labelling AI-generated text published on matters of public interest, falls on the deployer. So if the chatbot or image generator belongs to an outside vendor, the organisation putting it in front of EU users is still responsible for ensuring the disclosure reaches the user. A machine-readable mark embedded by the provider does not satisfy the deployer's disclosure obligation, because the disclosure must be perceivable without specialist tools.",
      },
    },
    {
      "@type": "Question",
      name: "What are the penalties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Breaches of the Article 5 prohibitions carry fines of up to EUR 35 million or 7% of total worldwide annual turnover, whichever is higher. Most other breaches, including the Article 50 transparency obligations, carry up to EUR 15 million or 3% of worldwide annual turnover. Supplying incorrect or misleading information to authorities carries up to EUR 7.5 million or 1%. For SMEs and start-ups the lower of the two figures applies rather than the higher.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Regulatory Hub", item: absUrl("/regulatory-hub") },
    {
      "@type": "ListItem",
      position: 3,
      name: "EU AI Act timeline",
      item: absUrl("/regulatory-hub/eu-ai-act-in-scope-and-timeline"),
    },
  ],
};

// Person schema ships with the visible byline. A byline with no entity
// gives up the point of adding one.
const personSchemaBlock = {
  "@context": "https://schema.org",
  ...personSchema(tejas),
};

const SCOPE = [
  {
    name: "Providers",
    badge: "LIVE NOW",
    badgeClass: "bg-red-100 text-red-800",
    description:
      "Any organisation developing an AI system or placing one on the EU market under its own name. Providers carry the marking and detection duties for generated content.",
  },
  {
    name: "Deployers",
    badge: "LIVE NOW",
    badgeClass: "bg-red-100 text-red-800",
    description:
      "Any organisation using an AI system in a professional capacity. If you run a customer-facing chatbot or publish AI-generated content, you are a deployer and you carry disclosure duties in your own right.",
  },
  {
    name: "Organisations outside the EU",
    badge: "LIVE NOW",
    badgeClass: "bg-red-100 text-red-800",
    description:
      "Providers and deployers established outside the Union are in scope where the system's output is used inside it. A campaign aimed at European audiences or an assistant serving EU customers is caught.",
  },
  {
    name: "Operators of high-risk systems",
    badge: "DEC 2027",
    badgeClass: "bg-amber-100 text-amber-800",
    description:
      "Standalone Annex III systems, covering uses such as employment decisions, education, credit, insurance and biometrics. Deferred, not cancelled.",
  },
  {
    name: "AI embedded in regulated products",
    badge: "AUG 2028",
    badgeClass: "bg-blue-100 text-blue-800",
    description:
      "Annex I systems embedded in products already covered by EU product safety law.",
  },
];

const TIMELINE = [
  {
    date: "2 February 2025",
    label: "Prohibited practices and the AI literacy duty",
    note: "Article 5 bans and the Article 4 obligation to support AI literacy among staff.",
  },
  {
    date: "2 August 2025",
    label: "General purpose AI models",
    note: "Obligations for providers of GPAI models begin to apply.",
  },
  {
    date: "2 August 2026",
    label: "Article 50 transparency duties and enforcement powers",
    note: "Chatbot disclosure, marking of generated content, notices for emotion recognition and biometric categorisation, and deepfake labelling. Not deferred by the Omnibus.",
  },
  {
    date: "2 December 2026",
    label: "Legacy system marking and new prohibitions",
    note: "Article 50(2) marking duties extend to systems already on the market before 2 August 2026. New Article 5 prohibitions on AI-generated non-consensual intimate imagery and child sexual abuse material apply.",
  },
  {
    date: "2 August 2027",
    label: "Regulatory sandboxes and delegated acts",
    note: "Member States must have at least one national AI regulatory sandbox operating. The Commission's deadline for delegated acts on sectoral rules for Annex I systems.",
  },
  {
    date: "2 December 2027",
    label: "High-risk obligations, standalone systems",
    note: "Annex III high-risk obligations apply. Moved from 2 August 2026 by the Omnibus.",
  },
  {
    date: "2 August 2028",
    label: "High-risk obligations, embedded systems",
    note: "Annex I high-risk obligations apply to AI embedded in regulated products.",
  },
];

export default function EuAiActTimelinePage() {
  return (
    <div className="bg-white">
      {/* Hero / Definition banner */}
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/regulatory-hub" className="hover:text-white">Regulatory Hub</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EU AI Act timeline</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulatory Dictionary
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">EU AI Act timeline</h1>
          <p className="text-indigo-200 text-xl font-medium mb-3">
            Regulation (EU) 2024/1689, as amended by the Digital Omnibus
          </p>
          <p className="text-indigo-300 text-base max-w-2xl leading-relaxed">
            The staggered timetable that determines when each part of the AI Act applies to your
            organisation, including the July 2026 amendment that moved high-risk obligations to
            December 2027 and left the transparency duties exactly where they were.
          </p>
          <ArticleByline author={tejas} datePublished="2026-08-26" variant="hero" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Definition box */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6 mb-12">
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>The EU AI Act timeline.</strong> {definitionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Quick facts */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key facts at a glance</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Legal basis", value: "Regulation (EU) 2024/1689" },
                  { label: "Amended by", value: "Regulation (EU) 2026/1744" },
                  { label: "In force since", value: "1 August 2024" },
                  { label: "Live obligation now", value: "Article 50 transparency" },
                  { label: "High risk, standalone", value: "2 December 2027" },
                  { label: "Maximum penalty", value: "EUR 35M or 7% of worldwide turnover" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className="font-semibold text-slate-900 text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scope */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Who is in scope?</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Scope under the AI Act is determined by the role you play and by where the output is
                used, not by company size. Most organisations are deployers rather than providers, and
                the assumption that only AI developers are caught is the most frequent scoping error.
              </p>
              <div className="space-y-3">
                {SCOPE.map(({ name, badge, badgeClass, description }) => (
                  <div key={name} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{name}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                        {badge}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance timeline */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Compliance timeline</h2>
              <div className="relative">
                <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-indigo-200" />
                <div className="space-y-4">
                  {TIMELINE.map(({ date, label, note }, i) => (
                    <div key={date} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <div className="font-semibold text-slate-900 text-sm">{date}: {label}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Frequently asked questions</h2>
              <div className="space-y-5">
                {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                  <div key={i} className="border-b border-slate-100 pb-5">
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead magnet */}
            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">AI use case register template</h3>
              <p className="text-indigo-200 text-xs mb-3 leading-relaxed">
                A register that records where AI is used across the business, who owns each use, which
                obligations attach and what evidence exists. The work every AI Act question depends on.
              </p>
              <Link
                href="/insights/ai-use-case-register"
                className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
              >
                Get the template
              </Link>
            </div>

            {/* Author */}
            <ArticleByline author={tejas} variant="sidebar" />

            {/*
              Headed "Related resources" rather than "Related terms" because
              the two other AI Act hub pages are not written yet, and a terms
              box would have to link to sustainability entries that share no
              topic with this page.

              REVERT TO "Related terms" once the other AI Act hub pages exist.
            */}
            <div className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Related resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/insights/ai-marketing-readiness" className="text-indigo-700 hover:underline">
                    AI marketing readiness →
                  </Link>
                </li>
                <li>
                  <Link href="/regulatory-hub/csrd-in-scope-and-timeline" className="text-indigo-700 hover:underline">
                    CSRD in scope and timeline →
                  </Link>
                </li>
                <li>
                  <Link href="/regulatory-hub" className="text-indigo-700 hover:underline">
                    All regulatory terms →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-2">AI governance and adoption</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                We help mid-market teams work out where AI is already in use, which obligations attach
                and what evidence a regulator or customer would expect to see.
              </p>
              <Link
                href="/services/ai-governance-and-adoption"
                className="block text-xs font-semibold text-indigo-600 hover:underline"
              >
                View AI governance and adoption service →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definitionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchemaBlock) }} />
    </div>
  );
}
