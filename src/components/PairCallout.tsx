import Link from "next/link";

export type PairCalloutProps = {
  /** Short label above the heading, e.g. "Coming from Tally?" */
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
  /** Link text. Vary it between pages; do not repeat the target keyword. */
  label: string;
};

/**
 * A short block linking a service page to its matching move page, or the
 * other way round. Added for the pairs in the SEO brief of 30 October 2026
 * (Tally and ERP, ecommerce and commerce, AI data and AI governance,
 * recovery and implementation oversight). Real anchors, so crawlable.
 */
export default function PairCallout({ eyebrow, heading, body, href, label }: PairCalloutProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center md:justify-between"
    >
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{eyebrow}</div>
        <div className="mt-2 text-lg font-semibold text-slate-900">{heading}</div>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
      <div className="shrink-0 text-sm font-medium text-indigo-700 transition-transform duration-200 group-hover:translate-x-1">
        {label} →
      </div>
    </Link>
  );
}
