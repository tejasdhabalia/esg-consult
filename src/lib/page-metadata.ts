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
};

const DEFAULT_OG_IMAGE = "/og-default.png";

export function pageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${site.legalName}`;
  const url = absUrl(path);
  const imageUrl = absUrl(ogImage);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
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