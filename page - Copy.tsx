import Link from "next/link";

export const metadata = {
  title: "DS Consulting Advisory | ESG, Marketing Automation & AI Transformation",
  description:
    "Strategy to systems-delivered through advisory + implementation across ESG, marketing automation, and AI-driven operating models.",
  alternates: {
    canonical: "https://dsconsultingadvisory.com/",
  },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DS Consulting Advisory",
    url: "https://dsconsultingadvisory.com",
    founders: [
      { "@type": "Person", name: "Tejas Dhabalia" },
      { "@type": "Person", name: "Jigar Dhabalia" },
    ],
  };

  return (
    <div>
      {/* HERO */}
      <section className="bg-slate-900 text-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* TAGLINE (highlighted, bold, larger) */}
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-sm sm:text-base font-bold tracking-tight">
              <span className="text-indigo-300">Strategy to Systems.</span>{" "}
              <span className="text-white">Delivered.</span>
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-bold leading-tight max-w-3xl">
            Scalable ESG, Revenue & AI-Driven Operating Models
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            DS Consulting partners with leadership teams to design and implement
            structured systems across sustainability reporting, marketing automation,
            and modern data-led execution.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium text-center"
            >
              Book a Consultation
            </Link>
            <Link
              href="/services"
              className="border border-white hover:bg-white/10 px-6 py-3 rounded-lg text-center"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-10 text-sm text-slate-400">
            Advisory + Implementation • Governance-led • Outcome-focused
          </div>
        </div>
      </section>

      {/* WHAT WE HELP YOU DELIVER */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">
            Consulting for leaders who need execution, not slides
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            We work with CEOs, CFOs, CMOs and transformation leaders to build operating
            models that are measurable, governed, and implementable.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* ESG */}
            <div className="border-l-4 border-emerald-600 pl-6">
              <h3 className="text-2xl font-semibold text-emerald-700">
                ESG & Sustainability Advisory
              </h3>
              <p className="mt-4 text-slate-600">
                Move from compliance confusion to structured reporting systems:
                CSRD and BRSR readiness, GHG accounting architecture, ESG data governance,
                controls and audit-ready workflows.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services/esg-advisory"
                  className="inline-flex text-emerald-700 font-medium"
                >
                  Explore ESG Services →
                </Link>
                <Link
                  href="/regulatory-hub"
                  className="inline-flex text-slate-700 underline"
                >
                  Visit Regulatory Hub
                </Link>
              </div>
            </div>

            {/* Marketing Automation */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h3 className="text-2xl font-semibold text-indigo-700">
                Marketing Automation & RevOps
              </h3>
              <p className="mt-4 text-slate-600">
                Build revenue systems that scale: lifecycle definitions, CRM governance,
                automation architecture, lead routing and funnel measurement discipline so
                teams execute consistently and outcomes are visible.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services/marketing-automation"
                  className="inline-flex text-indigo-700 font-medium"
                >
                  Explore Revenue Systems →
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex text-slate-700 underline"
                >
                  See engagement examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DS CONSULTING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Why DS Consulting</h2>

          {/* Tagline repeated in a strong way (not overdone) */}
          <p className="mt-4 text-slate-600 max-w-3xl">
            <span className="font-semibold text-slate-900">
              <span className="text-indigo-700">Strategy to Systems.</span> Delivered.
            </span>{" "}
            We bridge the gap between transformation intent and operating reality through
            structured design, hands-on implementation, and governance.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white border rounded-2xl p-6">
              <div className="font-semibold">Advisory + Implementation</div>
              <p className="mt-2 text-sm text-slate-600">
                We don’t stop at recommendations, we build the operating model and help teams execute it.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <div className="font-semibold">Governance-led</div>
              <p className="mt-2 text-sm text-slate-600">
                Clear ownership, controls, and cadence so systems remain consistent after go-live.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <div className="font-semibold">AI-aware, not AI-hype</div>
              <p className="mt-2 text-sm text-slate-600">
                We use AI where it improves signal, speed or decision-making, grounded in data reality.
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <div className="font-semibold">Measured outcomes</div>
              <p className="mt-2 text-sm text-slate-600">
                Success metrics defined upfront: compliance readiness, conversion, speed, data quality, adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we work</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              ["Diagnose", "Audit systems, process, data and governance gaps."],
              ["Design", "Define operating model, architecture and controls."],
              ["Implement", "Hands-on execution with enablement and rollout."],
              ["Optimize", "Measurement cadence, governance and continuous improvement."],
            ].map(([t, d]) => (
              <div key={t} className="border rounded-2xl p-6">
                <div className="font-semibold">{t}</div>
                <div className="mt-2 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              Schedule a Strategy Call
            </Link>
            <Link
              href="/services"
              className="border px-6 py-3 rounded-lg font-medium text-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <h2 className="text-3xl font-semibold">
          Ready to design a system your teams can actually run?
        </h2>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Share your context and we’ll suggest a structured approach, timeline, and next best step.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium"
        >
          Book Consultation
        </Link>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </div>
  );
}