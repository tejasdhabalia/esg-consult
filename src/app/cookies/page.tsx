import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Cookies policy | ${site.legalName}`,
  description: "How we use cookies and how you can control them.",
  alternates: { canonical: absUrl("/cookies") },
};

export default function CookiesPage() {
  return (
    <div>
      <PageHero
        title="Cookies policy"
        subtitle="This page explains how cookies are used and how you can control preferences."
        primaryAction={{ label: "Privacy policy", href: "/privacy" }}
        secondaryAction={{ label: "Terms", href: "/terms" }}
        imageSrc="/hero/legal.jpg"
        imageAlt="Cookies and consent"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-slate-700">
          <div>
            <h2 className="text-2xl font-semibold">How we use cookies</h2>
            <p className="mt-4">
              Cookies help the site function and, if you consent, help us measure usage trends and improve experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Cookie categories</h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li><span className="font-medium">Necessary:</span> required for core site operation</li>
              <li><span className="font-medium">Analytics:</span> helps us understand aggregated site usage if enabled</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Your choices</h2>
            <p className="mt-4">
              You can manage cookie preferences using the consent prompt. If you need help, contact{" "}
              <span className="font-medium">{site.emails.general}</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}