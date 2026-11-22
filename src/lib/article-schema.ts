import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { personSchema, type Author } from "@/lib/authors";

/**
 * Article structured data, shared by every article page.
 * Brief 6, Task 2 (SEO project), 22 November 2026.
 *
 * Use this for every new article rather than writing the object by hand,
 * so image, publisher logo and dates are never missed. Emit it alongside
 * the page's other schema (FAQPage, BreadcrumbList, DefinedTerm, tool
 * schema), not instead of it.
 *
 * Author attribution, decision 2 of 21 November 2026: every technology and
 * AI piece is bylined to Tejas. The page must show the same author in a
 * visible byline, or the schema and the page disagree.
 */

/** Square logo, 1200 x 1200. Used as the publisher logo and the Organization logo. */
export const LOGO_PATH = "/brand/DSConsultinglogo.png";

/** Publisher entity. Organization, never ProfessionalService (Brief 6, Task 1). */
export function publisherSchema() {
  return {
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
    logo: { "@type": "ImageObject", url: absUrl(LOGO_PATH), width: 1200, height: 1200 },
  };
}

export type ArticleSchemaInput = {
  /** Page path beginning with "/", e.g. "/insights/ai-roi". */
  path: string;
  /** The page H1, as shown. */
  headline: string;
  /** The meta description, word for word. */
  description: string;
  /** Path of the page's Open Graph or hero image, beginning with "/". Required. */
  image: string;
  /**
   * ISO date of first publication, e.g. "2026-10-30". Where the page does
   * not store one, use the date of the page file's first commit.
   */
  datePublished: string;
  /** ISO date of the last content change. Defaults to datePublished. */
  dateModified?: string;
  author: Author;
};

export function articleSchema({
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: ArticleSchemaInput) {
  const url = absUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: [absUrl(image)],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: personSchema(author),
    publisher: publisherSchema(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}
