import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Partnerships | ${site.legalName}`,
  description:
    "Partner with DS Consulting through referrals, ecosystem collaboration, or structured service alliances. Explore our finance capacity partnership model or contact us to discuss a fit.",
  alternates: { canonical: absUrl("/partners") },
};

const partnerTypes = [
  {
    title: "Advisory and referral partners",
    body:
      "For consultants, fractional leaders, and ecosystem operators who can open the right client conversations and want a clean commercial model around that access.",
  },
  {
    title: "Capability partners",
    body:
      "For specialist firms that want to combine DS Consulting's strategy-to-systems approach with a complementary execution capability, domain strength, or delivery layer.",
  },
  {
    title: "Platform and implementation partners",
    body:
      "For software, data, and workflow partners who want a governance-led consulting layer around implementation, adoption, and operating model design.",
  },
];

const fitSignals = [
  "You already advise CEOs, CFOs, CSOs, RevOps leaders, or operations teams.",
  "You want a clearer commercial structure for collaboration, not an informal referral arrangement.",
  "You value governed delivery, measurable execution, and practical operating models.",
  "You want a partner who can work from advisory through implementation without overselling software or generic transformation language.",
];

const collaborationPaths = [
  {
    title: "Open the right conversation",
    body:
      "You introduce a client need where DS Consulting can add value through ESG readiness, revenue visibility, or an adjacent execution model.",
  },
  {
    title: "Shape the right engagement",
    body:
      "We define the scope, the delivery model, and the commercial structure based on where you want to stay involved.",
  },
  {
    title: "Build repeatable momentum",
    body:
      "When the fit is real, the relationship can grow into repeat referrals, joint pursuits, shared content, or a more strategic collaboration model.",
  },
];

const financeCapacityStats = [
  {
    stat: "100 to 1,000+",
    label: "Typical target company employee range",
    color: "text-indigo-700",
  },
  {
    stat: "8 to 12 weeks",
    label: "Typical onboarding and go-live path",
    color: "text-indigo-700",
  },
  {
    stat: "P2P · O2C · R2R",
    label: "Process coverage across the finance function",
    color: "text-slate-900",
  },
  {
    stat: "10+ seats",
    label: "Typical starting team design",
    color: "text-slate-900",
  },
];

const faqs = [
  {
    q: "Who should reach out about a partnership?",
    a: "Consultants, advisors, fractional leaders, implementation firms, software partners, and ecosystem operators who work with decision-makers and want a clearer way to collaborate with DS Consulting.",
  },
  {
    q: "Does every partnership need to look the same?",
    a: "No. Some relationships are simple referral models. Others can become structured collaboration around delivery, market development, or a specific capability area.",
  },
  {
    q: "What happens after I contact DS Consulting?",
    a: "We start with fit. That usually means understanding your network, the kinds of client situations you see, and whether there is a clear collaboration path worth formalising.",
  },
  {
    q: "Is the finance capacity partnership the only partner model?",
    a: "No. It is the most defined partner program today, but this page is designed to open broader conversations with firms and operators who see a strong fit with DS Consulting.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Partnerships",
  description:
    "Partner with DS Consulting through referrals, ecosystem collaboration, or structured service alliances. Explore our finance capacity partnership model or contact us to discuss a fit.",
  provider: {
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
  },
  url: absUrl("/partners"),
};

export default function PartnersPage() {
  return (
    <div className="bg-white text-slate-900">
      <PageHero
        title="Partnerships built around real client needs"
        subtitle="DS Consulting works with advisors, specialist firms, operators, and ecosystem partners who want a clearer way to collaborate. Some relationships start with referrals. Others grow into structured capability partnerships."
        painLine="Good partnerships need more than a logo exchange. They need a clear fit, a practical commercial model, and delivery that protects both brands."
        primaryAction={{ label: "Email our partnerships team", href: `mailto:${site.emails.partners}` }}
        secondaryAction={{ label: "Explore finance capacity partnership", href: "/partners/strategic-finance-partnership" }}
        
        imageSrc="/hero/services.jpg"
        imageAlt="DS Consulting partnerships"
      />

      <section className="py-20 border-b border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-indigo-700">Why partner with DS Consulting</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">A practical partner model, not a loose introduction network</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              We partner where there is a real operating fit. That may be a specialist who sees ESG, revenue visibility, or systems execution needs in their clients. It may be an implementation firm that wants a stronger governance layer around delivery. It may be an advisor who wants a more structured commercial route into a repeatable offer.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              The goal is simple. Build partnerships that make the client outcome stronger and create a collaboration model both sides can explain with confidence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {partnerTypes.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-emerald-700">Right for you if</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">You want a partnership model with clear commercial potential</h2>
            <div className="mt-8 grid gap-4">
              {fitSignals.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <div className="inline-flex rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-200">
              Partner with DS Consulting
            </div>
            <h3 className="mt-5 text-2xl font-semibold">Start a partnership conversation</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Send us a note on who you work with, where you see overlap, and what kind of partnership you have in mind. We will come back with a practical next step.
            </p>
            <a
              href={`mailto:${site.emails.partners}`}
              className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {site.emails.partners}
            </a>
            <p className="mt-4 text-xs text-slate-400">
              Best used for referral, capability, alliance, and ecosystem partnership enquiries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-indigo-700">How collaboration usually starts</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">A simple path from fit to structured collaboration</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {collaborationPaths.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-indigo-700">Featured partner pathway</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Extended finance capacity through a strategic partnership</h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                When clients need more finance capacity than our core advisory work provides, we can support a partner-led model around dedicated India-based finance teams. The offer is easy to position because it maps to familiar finance problems, clear process value streams, and a visible go-live path.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                The model covers end-to-end transactional finance work across Procure-to-Pay, Order-to-Cash, and Record-to-Report, then extends into close support, control, and planning. It is built for scaling corporates and typically starts as a 10+ seat design, not a one-role patch.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/partners/strategic-finance-partnership"
                  className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
                >
                  Explore the strategic finance partnership program
                </Link>
                <Link
                  href="/partners/strategic-finance-partnership#partnership-program"
                  className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                >
                  View partnership program
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {financeCapacityStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className={`text-3xl font-bold ${item.color}`}>{item.stat}</div>
                  <div className="mt-2 text-sm leading-snug text-slate-600">{item.label}</div>
                </div>
              ))}

              <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="font-semibold text-slate-800">Dedicated India finance capacity for scaling corporates</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Structured across 14 role profiles and organized by transaction, execution, and strategic layers. Built for companies dealing with close pressure, AP and AR growth, reporting complexity, ERP change, or broader India expansion.
                </p>
                <Link
                  href="/partners/strategic-finance-partnership#partnership-program"
                  className="mt-3 inline-block text-sm font-medium text-indigo-700 hover:text-indigo-800"
                >
                  View partnership program →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-indigo-700">Frequently asked questions</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Partnership questions we expect early</h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Interested in forming a partnership with DS Consulting?</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Start with a simple note. Tell us what kind of clients you work with, where you see overlap, and whether you want to explore a referral, capability, or strategic partner relationship.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${site.emails.partners}`}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Contact us at {site.emails.partners}
            </a>
            <Link
              href="/partners/strategic-finance-partnership"
              className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white hover:bg-white/10"
            >
              Explore finance capacity partnership
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
