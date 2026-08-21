import PageHero from "@/components/PageHero";
import ContactFormClient from "@/components/ContactFormClient";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Start with an assessment",
  description:
    "Two to four weeks at a fixed price, delivered as a decision document rather than a proposal. Tell us what you are working on and we will come prepared.",
  path: "/contact",
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.legalName}`,
    url: absUrl("/contact"),
    about:
      "Contact DS Consulting about a technology assessment, systems selection, implementation oversight, integration, CRM and revenue operations, AI in operations, or ESG reporting systems.",
    mainEntity: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
  };

  return (
    <div>
      <PageHero
        title="Start with an assessment"
        subtitle="Two to four weeks at a fixed price, delivered as a decision document rather than a proposal. Book a time below and tell us what you are working on, and we will come prepared."
        primaryAction={{ label: "See what we do", href: "/services" }}
        secondaryAction={{ label: "About the firm", href: "/about" }}
        imageSrc="/hero/contact.jpg"
        imageAlt="Contact DS Consulting"
      />

      {/* THE ASSESSMENT */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">What an assessment is</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            A piece of work with its own price, not a sales exercise dressed as one. We look at
            what you are trying to do, what you already run and where the two do not meet. You
            own the output whether or not you carry on with us.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              ["Two to four weeks", "Long enough to see the problem, short enough to act on it"],
              ["Fixed price", "Agreed before we start, no time and materials creep"],
              [
                "A decision document",
                "What to do, what it costs, what happens if you do nothing",
              ],
              ["Yours to keep", "Including the scoring, whoever you go on to work with"],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="font-semibold text-slate-900">{label}</div>
                <div className="mt-2 text-sm text-slate-600 leading-snug">{detail}</div>
              </div>
            ))}
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
                  <div className="font-semibold text-slate-900">1) A 45-minute call</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    What you are trying to do, what is in the way, and who else needs to be in
                    the room. No deck.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">
                    2) A scope and a price for the assessment
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    One page. What we will look at, who we need access to, how long it takes and
                    what it costs. Fixed before we start.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">3) The decision document</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Findings, options with the scoring attached, a recommendation and the case
                    against it. Written to be taken to a board.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">4) Your decision</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Carry on with us, take it to someone else, or do nothing. All three are
                    reasonable outcomes and the document works for each of them.
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
