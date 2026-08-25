import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/authors";

/**
 * Byline for regulatory hub pages.
 *
 * Optional by design. Brief 3, Task 5 (SEO project), decision 4 confirmed
 * 25 August 2026. Insights pages already carry an author entity; hub pages
 * did not, and author entity matters most on regulatory topics where the
 * reader is deciding whether to believe a compliance date.
 *
 * A page with no author renders nothing and behaves exactly as before, so
 * existing hub pages are unaffected until someone opts in.
 *
 * Emitting the matching Person schema is the caller's job. Use personSchema
 * from @/lib/authors and add it alongside the page's existing DefinedTerm.
 * The visible byline and the schema should always appear together.
 */
export default function ArticleByline({
  author,
  datePublished,
  dateModified,
  readTime,
  variant = "hero",
}: {
  author?: Author;
  /** ISO date, e.g. "2026-08-25". Rendered as a readable date. */
  datePublished?: string;
  dateModified?: string;
  readTime?: string;
  /** "hero" sits on a dark background, "sidebar" on a light card. */
  variant?: "hero" | "sidebar";
}) {
  if (!author) return null;

  const onDark = variant === "hero";
  const nameClass = onDark ? "text-white" : "text-slate-900";
  const metaClass = onDark ? "text-indigo-200" : "text-slate-500";

  const formatted = (iso?: string) => {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const published = formatted(datePublished);
  const updated = formatted(dateModified);
  const showUpdated = updated && updated !== published;

  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <Image
            src={author.imageSrc}
            alt={author.name}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
          <div>
            <div className={`text-sm font-semibold ${nameClass}`}>{author.name}</div>
            <div className={`text-xs ${metaClass}`}>{author.roleShort}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">{author.bio}</p>
        <Link
          href="/team"
          className="mt-3 inline-block text-xs font-semibold text-indigo-700 hover:underline"
        >
          More about the team
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mt-6">
      <Image
        src={author.imageSrc}
        alt={author.name}
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div className="text-sm">
        <div className={`font-semibold ${nameClass}`}>{author.name}</div>
        <div className={metaClass}>
          {author.roleShort}
          {published && <> &middot; {showUpdated ? `Updated ${updated}` : published}</>}
          {readTime && <> &middot; {readTime}</>}
        </div>
      </div>
    </div>
  );
}
