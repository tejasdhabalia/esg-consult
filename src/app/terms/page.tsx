import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Terms of use | ${site.legalName}`,
  description: "Website terms, disclaimers, and acceptable use.",
  alternates: { canonical: absUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms of use"
        subtitle="These terms govern your use of this website."
        primaryAction={{ label: "Privacy policy", href: "/privacy" }}
        secondaryAction={{ label: "Cookies policy", href: "/cookies" }}
        imageSrc="/hero/legal.jpg"
        imageAlt="Terms and legal information"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-slate-700">
          <div>
            <h2 className="text-2xl font-semibold">No professional assurance</h2>
            <p className="mt-4">
              We do not provide statutory audit or assurance. Any ESG readiness support is advisory plus implementation for governance,
              controls, documentation and evidence trail readiness.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">No legal advice</h2>
            <p className="mt-4">
              Information on this site is provided for general informational purposes and does not constitute legal advice.
              You should seek appropriate professional advice for your specific circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Use of content</h2>
            <p className="mt-4">
              You may view and share links to our content for informational purposes. You may not reproduce or republish content
              without permission, except where permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">AI-generated visuals</h2>
            <p className="mt-4">
              Some visuals on this website may be AI-generated and are used under our rights to create and publish them.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Limitation of liability</h2>
            <p className="mt-4">
              We are not liable for any loss or damage arising from reliance on information on this site. Use the site at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-4">
              For questions about these terms, contact: <span className="font-medium">{site.emails.general}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}