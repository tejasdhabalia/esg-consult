import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Privacy policy | ${site.legalName}`,
  description: "How we handle personal data, cookies, and website analytics.",
  alternates: { canonical: absUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        title="Privacy policy"
        subtitle="This page explains what information we collect and how we use it."
        primaryAction={{ label: "Cookies policy", href: "/cookies" }}
        secondaryAction={{ label: "Terms", href: "/terms" }}
        imageSrc="/hero/legal.jpg"
        imageAlt="Privacy and data protection"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-slate-700">
          <div>
            <h2 className="text-2xl font-semibold">Information we collect</h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>Information you provide via forms or email (name, work email, company, message)</li>
              <li>Basic technical information (device, browser, approximate location, IP address)</li>
              <li>Cookie preferences and analytics events (if enabled)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">How we use information</h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>To respond to inquiries and propose next steps</li>
              <li>To improve site performance and user experience</li>
              <li>To measure aggregated usage trends if analytics is enabled</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Cookies and analytics</h2>
            <p className="mt-4">
              We use cookies to operate the site and, if you consent, to measure performance and usage trends.
              See the <a className="underline" href={absUrl("/cookies")}>cookies policy</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Your choices</h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>You can manage cookie preferences using the consent prompt</li>
              <li>You can request access or deletion of your data by contacting us</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-4">
              For privacy questions, contact: <span className="font-medium">{site.emails.general}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}