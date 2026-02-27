import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `CSRD scoping and timeline | ${site.legalName}`,
  description:
    "A practical checklist to confirm CSRD scope, reporting timeline, group boundary decisions, and first-cycle readiness priorities.",
  alternates: { canonical: absUrl("/regulatory-hub/csrd-in-scope-and-timeline") },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CSRD scoping and timeline: what to confirm first",
    dateModified: "2026-02-26",
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    mainEntityOfPage: absUrl("/regulatory-hub/csrd-in-scope-and-timeline"),
  };

  return (
    <div>
      <PageHero
        title="CSRD scoping and timeline"
        subtitle="A leader-friendly checklist to confirm scope, timing, ownership and first-cycle readiness decisions so the programme becomes governed delivery, not late-cycle data chasing."
        primaryAction={{ label: "CSRD advisory services", href: "/services/esg-advisory/csrd-advisory" }}
        secondaryAction={{ label: "Back to Regulatory hub", href: "/regulatory-hub" }}
        note="Note: We do not provide statutory audit or assurance."
        imageSrc="/hero/csrd.jpg"
        imageAlt="CSRD scoping and timeline"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">What leaders should confirm first</h2>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              ["Applicability and reporting boundary", "Confirm in-scope entities, group boundary decisions, and who owns boundary approvals."],
              ["Timeline and internal deadlines", "Work backwards from reporting deadlines and set internal milestones for data collection, review, and sign-off."],
              ["Disclosure readiness reality check", "Identify disclosures that require new data sources, new controls, or cross-functional ownership."],
              ["Evidence trail expectations", "Define evidence storage, approvals, validations, and documentation standards early."],
            ].map(([t, d]) => (
              <div key={t} className="bg-slate-50 border rounded-2xl p-6">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="mt-2 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center">
              Discuss CSRD timeline
            </Link>
            <Link href="/services/esg-advisory" className="border px-6 py-3 rounded-lg font-medium text-center">
              ESG advisory hub
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </div>
  );
}