import PageHero from "@/components/PageHero";
import ContactFormClient from "@/components/ContactFormClient";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Contact | ${site.legalName}`,
  description:
    "Contact DS Consulting for ESG readiness and revenue visibility. For partnerships and talent, use the dedicated email routes.",
  alternates: { canonical: absUrl("/contact") },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.legalName}`,
    url: absUrl("/contact"),
    about: "Contact DS Consulting for ESG readiness and revenue visibility consulting.",
    mainEntity: {
      "@type": "Organization",
      name: site.legalName,
      url: site.baseUrl,
    },
  };

  return (
    <div>
      <PageHero
        title="Contact"
        subtitle="For potential clients, use the form below. For partnerships and talent, use the dedicated email routes so inquiries are routed correctly."
        primaryAction={{ label: "Explore services", href: "/services" }}
        secondaryAction={{ label: "Read insights", href: "/insights" }}
        imageSrc="/hero/contact.jpg"
        imageAlt="Contact and collaboration"
      />

      {/* Potential clients form */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">For potential clients</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Share your context and timeline. We will respond with clarifying questions and a suggested approach.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div className="bg-slate-50 border rounded-2xl p-8">
              <ContactFormClient />
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">What happens next</div>

              <div className="mt-5 grid gap-4">
                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">1) Clarify goals and constraints</div>
                  <p className="mt-2 text-sm text-slate-600">
                    We confirm scope, stakeholders, timeline, and what success looks like.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">2) Diagnostic or roadmap</div>
                  <p className="mt-2 text-sm text-slate-600">
                    We propose a diagnostic to identify gaps in data, governance, and execution, then define a phased roadmap.
                  </p>
                </div>

                <div className="bg-slate-50 border rounded-2xl p-6">
                  <div className="font-semibold text-slate-900">3) Implementation and governance</div>
                  <p className="mt-2 text-sm text-slate-600">
                    Advisory plus implementation with enablement, documentation, and cadence so outcomes sustain.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-sm text-slate-600">
                For ESG readiness, see <a className="underline" href={absUrl("/services/esg-advisory")}>ESG advisory</a>. For revenue visibility, see{" "}
                <a className="underline" href={absUrl("/services/marketing-automation")}>marketing automation</a>.
              </div>

              <div className="mt-6 text-sm text-slate-600">
                Note: We do not provide statutory audit or assurance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners and talent */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Partnerships and talent</h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Please use the email routes below so your inquiry reaches the right team quickly.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">Vendors and influencers</div>
              <p className="mt-3 text-sm text-slate-600">
                Tools, agencies, creators, implementation partners, and collaboration proposals. Include a short overview and relevant links.
              </p>
              <div className="mt-5 text-sm">
                <span className="font-medium text-slate-900">Email:</span>{" "}
                <a className="underline text-slate-700" href={`mailto:${site.emails.partners}`}>
                  {site.emails.partners}
                </a>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">Talent and careers</div>
              <p className="mt-3 text-sm text-slate-600">
                Consultants, analysts, associates, and specialist freelancers. Share your profile and areas of expertise.
              </p>
              <div className="mt-5 text-sm">
                <span className="font-medium text-slate-900">Email:</span>{" "}
                <a className="underline text-slate-700" href={`mailto:${site.emails.talent}`}>
                  {site.emails.talent}
                </a>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="font-semibold text-slate-900">General inquiries</div>
              <p className="mt-3 text-sm text-slate-600">
                Everything else. If you are a client, the form above is the fastest route.
              </p>
              <div className="mt-5 text-sm">
                <span className="font-medium text-slate-900">Email:</span>{" "}
                <a className="underline text-slate-700" href={`mailto:${site.emails.general}`}>
                  {site.emails.general}
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