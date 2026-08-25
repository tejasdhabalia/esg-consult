import Link from "next/link";

export type RelatedResource = {
  /** Internal route. Must resolve directly, not through a redirect. */
  href: string;
  label: string;
  detail: string;
};

/**
 * Related resources block for commercial service pages.
 *
 * Insights and regulatory hub pages rank far better than service pages, so
 * these links exist to pass that strength down to the page that sells the
 * work. Brief 2, Task 3b (SEO project).
 *
 * Rules:
 * - Two or three links. One reads as an afterthought, more reads as a index.
 * - Only link content that genuinely supports the service. Leave the block
 *   off entirely rather than padding it with something unrelated.
 * - Real anchors, never click handlers, or crawlers cannot follow them.
 */
export default function RelatedResources({
  resources,
  heading = "Related reading",
  intro = "Written from the same work. Free, and none of it asks you to talk to us first.",
}: {
  resources: RelatedResource[];
  heading?: string;
  intro?: string;
}) {
  if (!resources || resources.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-slate-900">{heading}</h2>
        <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">{intro}</p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-slate-900">{resource.label}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{resource.detail}</p>
              <div className="mt-5 text-sm font-medium text-indigo-700">Read more →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
