import PageHero from "@/components/PageHero";
import ContactFormClient from "@/components/ContactFormClient";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Book a working session",
  // Two offers since October 2026: a free move plan session for technology
  // work, a fixed-price assessment for everything else.
  description:
    "Changing a system? Book a free 45-minute working session and leave with a one-page move plan. Other work starts with a fixed-price assessment.",
  path: "/contact",
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.legalName}`,
    url: absUrl("/contact"),
    about:
      "Contact DS Consulting about moving to a new system, systems selection, implementation oversight, integration, CRM and revenue operations, AI in operations, or ESG reporting systems.",
    mainEntity: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
  };

  return (
    <div>
      <PageHero
        title="Book a working session"
        subtitle="Changing a system? The first session is free, and you leave with a one-page plan of the move. Book a time below and tell us what you are working on, and we will come prepared."
        primaryAction={{ label: "See what we do", href: "/services" }}
        secondaryAction={{ label: "About the firm", href: "/about" }}
        imageSrc="/hero/contact.jpg"
        imageAlt="Contact DS Consulting"
      />

      {/* HOW WE START. Two offers since October 2026. */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we start</h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8">
              <div className="text-sm font-semibold text-indigo-700 uppercase tracking-widest">
                Technology
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{site.movePlan.label}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-700 leading-relaxed">
                <li>{site.movePlan.session} with the person who would run the move.</li>
                <li>A one-page plan: what moves, in what order and what breaks. Yours to keep.</li>
                <li>Week 1, if you go ahead: the full move plan and a check on the strategy behind it.</li>
                <li>
                  If you stop after week 1, a fixed fee {site.movePlan.week1Fee.toLowerCase()}, agreed
                  in writing first. You keep the plan.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                Sustainability, finance and sourcing
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{site.assessment.label}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-700 leading-relaxed">
                <li>{site.assessment.duration} at a fixed price, agreed before we start.</li>
                <li>We look at what you are trying to do, what you already run and where the two do not meet.</li>
                <li>A decision document: what to do, what it costs and what happens if you do nothing.</li>
                <li>Yours to keep, whoever you go on to work with.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Book a time</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Fill in your details, pick a date and time, and book a 45-minute call in one step.
            Tell us what you are working on and we will come prepared.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div className="bg-white border rounded-2xl p-8">
              <ContactFormClient />
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">What happens next</div>

              <div className="mt-5 grid gap-4">
                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">1) A 45-minute working session</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    What you run today, what you are changing and who else needs to be in the
                    room. For a technology move, you leave with a one-page plan. No deck.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">2) A scope and a fixed price</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    One page. For a move, week 1 and what follows it. For an assessment, what we
                    will look at and how long it takes. Fixed before we start.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">3) The plan or the decision document</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Week 1 produces the full move plan and a check on the strategy behind it. An
                    assessment produces findings, options with the scoring attached and a
                    recommendation.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">4) Your decision</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Carry on with us, take it to someone else, or do nothing. All three are
                    reasonable outcomes and the output works for each of them.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-sm text-slate-600 leading-relaxed">
                {site.positioning.independenceShort}
              </div>

              <div className="mt-3 text-sm text-slate-500 leading-relaxed">
                We do not provide IT support, help desk, networking or hardware, and we do not
                provide statutory audit or assurance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER ROUTES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Other enquiries</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Use these routes so your message reaches the right person.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="font-semibold text-slate-900">Referral and collaboration</div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Services firms and advisors whose clients run into work we cover. Include a short
                overview of who you work with. We do not take vendor commissions, so software
                vendors looking for a reseller will not find one here.
              </p>
              <div className="mt-5 text-sm">
                <span className="font-medium text-slate-900">Email:</span>{" "}
                <a className="underline text-slate-700" href={`mailto:${site.emails.partners}`}>
                  {site.emails.partners}
                </a>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="font-semibold text-slate-900">Specialist freelancers</div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                We bring in specialists for delivery. If that is you, send your profile and the
                platforms you work on. Be specific about what you have actually implemented.
              </p>
              <div className="mt-5 text-sm">
                <span className="font-medium text-slate-900">Email:</span>{" "}
                <a className="underline text-slate-700" href={`mailto:${site.emails.talent}`}>
                  {site.emails.talent}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </div>
  );
}
