import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Author } from "@/lib/authors";

/**
 * The sidebar every insight article uses, in one place, so the widgets look
 * and read the same across the hub. Agreed with Tejas 22 November 2026.
 *
 * Order, always: the call to action, any page-specific extra (a contents
 * list, say), the author card with LinkedIn, related services, related
 * reading. Same classes as the InsightEngagementPage template.
 *
 * The call to action is either a link (href and label) or custom content
 * passed as children, such as a download form.
 */
export type SidebarLink = { label: string; href: string; description?: string };

export type InsightSidebarProps = {
  cta: {
    title: string;
    body: ReactNode;
    href?: string;
    label?: string;
    /** Custom content under the body instead of a link button, e.g. a form. */
    children?: ReactNode;
  };
  author: Author;
  relatedServices: SidebarLink[];
  related?: SidebarLink[];
  relatedHeading?: string;
  /** Optional block shown between the call to action and the author card. */
  extra?: ReactNode;
};

export default function InsightSidebar({
  cta,
  author,
  relatedServices,
  related = [],
  relatedHeading = "Related insights",
  extra,
}: InsightSidebarProps) {
  const ctaIsAnchor = cta.href?.startsWith("#");
  const ctaButtonClass =
    "block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50";

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <div className="bg-indigo-900 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-base mb-2">{cta.title}</h3>
          <div className="text-sm mb-4 opacity-90 leading-relaxed">{cta.body}</div>
          {cta.children}
          {cta.href && cta.label &&
            (ctaIsAnchor ? (
              <a href={cta.href} className={ctaButtonClass}>
                {cta.label}
              </a>
            ) : (
              <Link href={cta.href} className={ctaButtonClass}>
                {cta.label}
              </Link>
            ))}
        </div>

        {extra}

        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <div className="flex items-start gap-4">
            <Image
              src={author.imageSrc}
              alt={author.name}
              width={64}
              height={64}
              className="rounded-xl object-cover flex-shrink-0"
            />
            <div>
              <Link href="/team" className="font-semibold text-slate-900 hover:underline">
                {author.name}
              </Link>
              <div className="text-xs text-slate-500 mb-2">{author.roleShort}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{author.bio}</p>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs text-indigo-600 hover:underline font-medium"
              >
                LinkedIn profile →
              </a>
            </div>
          </div>
        </div>

        {relatedServices.length > 0 && (
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h4 className="font-semibold text-slate-900 text-sm mb-3">Related services</h4>
            <div className="space-y-2">
              {relatedServices.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-indigo-600 hover:underline">
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h4 className="font-semibold text-slate-900 text-sm mb-3">{relatedHeading}</h4>
            <div className="space-y-3">
              {related.map((link) => (
                <Link key={link.href} href={link.href} className="block group">
                  <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">
                    {link.label} →
                  </span>
                  {link.description && <span className="block text-xs text-slate-500">{link.description}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
