import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Accessibility | ${site.legalName}`,
  description: "Our accessibility commitment and how to request support.",
  alternates: { canonical: absUrl("/accessibility") },
};

export default function AccessibilityPage() {
  return (
    <div>
      <PageHero
        title="Accessibility"
        subtitle="We aim to make this website usable for as many people as possible."
        primaryAction={{ label: "Contact", href: "/contact" }}
        secondaryAction={{ label: "Privacy policy", href: "/privacy" }}
        imageSrc="/hero/legal.jpg"
        imageAlt="Accessibility and inclusive design"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-slate-700">
          <div>
            <h2 className="text-2xl font-semibold">Our commitment</h2>
            <p className="mt-4">
              We aim to follow good accessibility practices across structure, readability, and navigation. This is an evolving effort.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Feedback and support</h2>
            <p className="mt-4">
              If you have difficulty using this site or want to request content in an alternative format, contact:
              <span className="font-medium"> {site.emails.general}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}