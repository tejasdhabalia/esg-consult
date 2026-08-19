import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { industries } from "@/lib/industries";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Where technology projects break, by sector. Inventory truth in retail, the Tally ceiling in distribution, costing in manufacturing, and the integration layer underneath financial services.",
  path: "/industries",
});

export default function IndustriesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Industries", item: absUrl("/industries") },
    ],
  };

  return (
    <div>
      <PageHero
        title="Every sector breaks in a different place"
        subtitle="The technology is broadly the same across industries. What differs is which join gives way first, and that is usually predictable once you know the sector."
        painLine={site.positioning.supporting}
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "See what we do", href: "/services" }}
        imageSrc="/hero/services.jpg"
        imageAlt="Industry technology stacks and where they break"
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">Where the money and the pain sit</h2>
          <p className="mt-5 text-slate-600 max-w-3xl leading-relaxed">
            Sector pages are usually a list of logos and a claim to understand your business. This
            is the opposite. Each one names the single point where systems in that industry
            reliably come apart, because naming it is the only way to show we have been there.
          </p>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Pages go up as we can write them from something actually seen rather than from a
            research summary. The ones below without a link are on the list and not yet written.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {industries.map((industry) => {
              const card = (
                <>
                  <h3 className="text-lg font-semibold text-slate-900">{industry.label}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {industry.fracture}
                  </p>
                  {industry.live ? (
                    <div className="mt-5 text-sm font-medium text-indigo-700">Read more →</div>
                  ) : (
                    <div className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Not yet written
                    </div>
                  )}
                </>
              );

              return industry.live ? (
                <Link
                  key={industry.route}
                  href={industry.route}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={industry.route}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-8"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">
            Not in the list, or in two of them at once
          </h2>
          <p className="mt-5 text-slate-300 max-w-3xl leading-relaxed">
            Most companies sit across more than one. A consumer brand that also distributes, a
            manufacturer with a services arm. The fracture points stack up rather than cancel
            out, which is usually why the problem has been hard to describe internally.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
          >
            {site.assessment.label}
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
