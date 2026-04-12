import { llmsManifest as manifest } from "@/generated/llms-manifest";
import { getAllInsightsNewestFirst } from "@/lib/insights";
import { site } from "@/lib/site";

export const PAGE_SECTIONS = [
  "home",
  "services",
  "regulatory",
  "insights",
  "compare",
  "partners",
  "company",
  "legal",
  "other",
] as const;

export type PageSection = (typeof PAGE_SECTIONS)[number];

export type CatalogPage = {
  route: string;
  url: string;
  title: string;
  description: string;
  section: PageSection;
  audience?: string;
  topics?: string[];
  readTime?: string;
  updated?: string;
};

const insightMap = new Map(
  getAllInsightsNewestFirst().map((item) => [item.slug, item] as const)
);

function normalizeRoute(input: string) {
  if (!input) return "/";

  try {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      const pathname = new URL(input).pathname;
      return pathname.replace(/\/+$/, "") || "/";
    }
  } catch {}

  const withSlash = input.startsWith("/") ? input : `/${input}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

export const catalogPages: CatalogPage[] = manifest.pages.map((page) => {
  const slug = page.route.startsWith("/insights/")
    ? page.route.replace("/insights/", "")
    : "";

  const insight = slug ? insightMap.get(slug) : undefined;

  return {
    route: page.route,
    url: page.url,
    title: page.title,
    description: page.description,
    section: page.section,
    audience: insight?.audience,
    topics: insight?.topics,
    readTime: insight?.readTime,
    updated: insight?.updated,
  };
});

export function getSiteOverview() {
  return {
    name: site.displayName,
    legalName: site.legalName,
    baseUrl: site.baseUrl,
    summary:
      site.ai?.summary ||
      `${site.displayName} provides advisory and implementation support across ESG readiness and revenue visibility.`,
    generatedAt: manifest.generatedAt,
    pageCount: manifest.pageCount,
    sections: PAGE_SECTIONS,
    contact: {
      website: site.baseUrl,
      general: site.emails?.general || "",
      partnerships: site.emails?.partners || site.emails?.general || "",
      talent: site.emails?.talent || site.emails?.general || "",
      linkedin:
        site.linkedin?.company ||
        site.linkedin?.tejas ||
        site.linkedin?.jigar ||
        "",
    },
  };
}

export function listPages(options?: { section?: PageSection; limit?: number }) {
  const section = options?.section;
  const limit = Math.max(1, Math.min(options?.limit ?? 25, 100));
  const filtered = section
    ? catalogPages.filter((p) => p.section === section)
    : catalogPages;
  return filtered.slice(0, limit);
}

export function getPage(routeOrUrl: string) {
  const normalized = normalizeRoute(routeOrUrl);
  return catalogPages.find(
    (p) =>
      normalizeRoute(p.route) === normalized || normalizeRoute(p.url) === normalized
  );
}

export function searchPages(options: {
  query: string;
  section?: PageSection;
  limit?: number;
}) {
  const query = options.query.trim().toLowerCase();
  const section = options.section;
  const limit = Math.max(1, Math.min(options.limit ?? 10, 50));
  if (!query) return [];

  const terms = query.split(/\s+/).filter(Boolean);
  const filtered = section
    ? catalogPages.filter((p) => p.section === section)
    : catalogPages;

  const scored = filtered
    .map((page) => {
      const haystack = [
        page.title,
        page.description,
        page.route,
        page.section,
        page.audience ?? "",
        ...(page.topics ?? []),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (page.title.toLowerCase().includes(term)) score += 5;
        if (page.route.toLowerCase().includes(term)) score += 4;
        if (page.description.toLowerCase().includes(term)) score += 3;
        if (haystack.includes(term)) score += 1;
      }
      return { page, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.page);
}

export function listDownloads() {
  return site.downloads ?? [];
}