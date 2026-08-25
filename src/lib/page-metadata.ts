import type { Metadata } from "next";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

type PageMetadataInput = {
  /**
   * Page-specific title segment. The helper appends " | DS Consulting".
   * Aim for roughly 30-45 characters here so the final title stays under ~60.
   */
  title: string;

  /**
   * Meta description. Aim for 140-160 characters for optimal Google snippet display.
   */
  description: string;

  /**
   * Path beginning with "/" (e.g., "/about", "/insights/ai-marketing-readiness").
   * Used for canonical URL and og:url.
   */
  path: string;

  /**
   * Optional page-specific Open Graph image path (beginning with "/").
   * Defaults to the site-wide default OG image at /og-default.png.
   */
  ogImage?: string;

  /**
   * Optional Open Graph type. Use "article" for insights/blog posts.
   * Defaults to "website".
   */
  type?: "website" | "article";

  /**
   * Keep the page out of search results while leaving it reachable by anyone
   * who has the link. Emits robots noindex, follow: links on the page are
   * still crawled, the page itself is not listed.
   *
   * A page set noindex must also be added to EXCLUDED_ROUTES in
   * scripts/generate-sitemap.mjs, or the sitemap invites Google to index a
   * page that tells it not to.
   *
   * Used where a page has a legitimate audience but the wrong one for the
   * search position it would occupy.
   */
  noindex?: boolean;
};

const DEFAULT_OG_IMAGE = "/og-default.png";

export function pageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${site.legalName}`;
  const url = absUrl(path);
  const imageUrl = absUrl(ogImage);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    ...(noindex
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      type,
      siteName: site.legalName,
      title: fullTitle,
      description,
      url,
      locale: "en_GB",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}