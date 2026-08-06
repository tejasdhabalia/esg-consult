import { llmsManifest as manifest } from "@/generated/llms-manifest";
import { getAllInsightsNewestFirst } from "@/lib/insights";
import { site } from "@/lib/site";

type ManifestPage = (typeof manifest.pages)[number];

/**
 * Fixed list of section keys.
 *
 * Do not derive this from the generated manifest. If you do, deleting the
 * last page in any section narrows the type and breaks the build, which is
 * a confusing failure a long way from its cause.
 */
type SectionKey =
  | "home"
  | "services"
  | "regulatory"
  | "insights"
  | "compare"
  | "partners"
  | "company"
  | "legal"
  | "other";

const SECTION_LABELS: Record<SectionKey, string> = {
  home: "Overview",
  services: "Services",
  regulatory: "Regulatory hub",
  insights: "Insights and tools",
  compare: "Comparison pages",
  partners: "Partners",
  company: "Company",
  legal: "Policies and trust",
  other: "Other pages",
};

const FEATURED_ROUTE_ORDER = [
  "/",
  "/services",
  "/services/systems-selection",
  "/services/implementation-oversight",
  "/services/integration",
  "/services/crm-and-revenue-operations",
  "/services/ai-in-operations",
  "/services/esg-advisory",
  "/regulatory-hub",
  "/insights",
  "/about",
  "/contact",
] as const;

const FEATURED_REGULATORY_ROUTES = [
  "/regulatory-hub/what-is-csrd",
  "/regulatory-hub/what-is-esrs",
  "/regulatory-hub/what-is-double-materiality",
  "/regulatory-hub/what-is-sebi-brsr",
  "/regulatory-hub/csrd-in-scope-and-timeline",
  "/regulatory-hub/brsr-core-readiness-kpis-controls",
] as const;

const aiSummary =
  site.ai?.summary ||
  `${site.displayName} provides advisory and implementation support across ESG readiness, reporting systems, CRM governance, lifecycle management, and revenue visibility.`;

const mcpServerUrl = site.ai?.mcpServerUrl || "";
const mcpTransport = site.ai?.mcpTransport || "streamable-http";
const downloads = site.downloads || [];
const companyLinkedIn =
  site.linkedin?.company || site.linkedin?.tejas || site.linkedin?.jigar || "";
const partnerEmail = site.emails?.partners || site.emails?.general || "";
const talentEmail = site.emails?.talent || site.emails?.general || "";

function cleanTitle(title: string) {
  return title.replace(/\s*\|\s*DS Consulting$/, "").trim();
}

function getPage(route: string) {
  return manifest.pages.find((page) => page.route === route);
}

function getPages(routes: readonly string[]) {
  return routes
    .map((route) => getPage(route))
    .filter((page): page is ManifestPage => Boolean(page));
}

function getInsightDetails(route: string) {
  const slug = route.replace("/insights/", "");
  return getAllInsightsNewestFirst().find((item) => item.slug === slug);
}

function listItem(page: ManifestPage, extra?: string) {
  // No em dash, use colon
  return `- [${cleanTitle(page.title)}](${page.url}): ${extra ?? page.description}`;
}

function machineEndpointLines() {
  const lines = [
    `- [robots.txt](${site.baseUrl}/robots.txt): crawler access guidance.`,
    `- [sitemap.xml](${site.baseUrl}/sitemap.xml): exhaustive URL inventory for search engines, agents, and site crawlers.`,
    `- [llms.txt](${site.baseUrl}/llms.txt): curated overview for AI systems.`,
    `- [llms-full.txt](${site.baseUrl}/llms-full.txt): expanded AI content index covering all major pages and resources.`,
  ];

  if (mcpServerUrl) {
    lines.push(
      `- [MCP server](${mcpServerUrl}): public Model Context Protocol endpoint for agents and tool-based clients (transport: ${mcpTransport}).`
    );
  } else {
    lines.push(
      `- MCP server: no public endpoint is configured at the moment. Set NEXT_PUBLIC_MCP_SERVER_URL to publish one here automatically.`
    );
  }

  return lines;
}

function renderDownloads() {
  if (!downloads.length) return [];

  return [
    "## Downloads",
    ...downloads.map((item) => `- [${item.title}](${item.url}): ${item.description}`),
    "",
  ];
}

function routeSegments(route: string) {
  return route.split("/").filter(Boolean);
}

function sortByHierarchy(a: ManifestPage, b: ManifestPage) {
  const aSeg = routeSegments(a.route);
  const bSeg = routeSegments(b.route);
  const len = Math.min(aSeg.length, bSeg.length);

  for (let i = 0; i < len; i++) {
    if (aSeg[i] === bSeg[i]) continue;
    return aSeg[i].localeCompare(bSeg[i]);
  }
  return aSeg.length - bSeg.length;
}

/**
 * Auto include all service pages.
 * Output is grouped by service hub (depth 2), with subpages nested.
 */
function renderAllServices() {
  const servicePages = manifest.pages
    .filter((page) => page.section === "services")
    .sort(sortByHierarchy);

  const root = servicePages.find((p) => p.route === "/services");
  const hubs = servicePages.filter((p) => routeSegments(p.route).length === 2);
  const byHub = new Map<string, ManifestPage[]>();

  for (const p of servicePages) {
    if (p.route === "/services") continue;

    const seg = routeSegments(p.route);
    if (seg.length < 2) continue;

    const hubRoute = `/${seg[0]}/${seg[1]}`;
    if (!byHub.has(hubRoute)) byHub.set(hubRoute, []);
    byHub.get(hubRoute)!.push(p);
  }

  const lines: string[] = [];
  if (root) lines.push(listItem(root));

  for (const hub of hubs) {
    lines.push(listItem(hub));

    const children = (byHub.get(hub.route) || [])
      .filter((p) => p.route !== hub.route)
      .filter((p) => routeSegments(p.route).length >= 3)
      .sort(sortByHierarchy);

    for (const child of children) {
      // Indented bullet for subpages
      lines.push(`  ${listItem(child)}`);
    }
  }

  // Catch any service pages that are not under a hub (rare, but safe)
  const known = new Set<string>([
    "/services",
    ...hubs.map((h) => h.route),
    ...hubs.flatMap((h) => (byHub.get(h.route) || []).map((p) => p.route)),
  ]);

  const orphan = servicePages.filter((p) => !known.has(p.route));
  for (const p of orphan) lines.push(listItem(p));

  return lines;
}

export function buildLlmsTxt() {
  const featuredPages = getPages(FEATURED_ROUTE_ORDER);
  const regulatoryPages = getPages(FEATURED_REGULATORY_ROUTES);
  const comparePages = manifest.pages.filter((page) => page.section === "compare");

  const latestInsights = getAllInsightsNewestFirst()
    .map((item) => getPage(`/insights/${item.slug}`))
    .filter((page): page is ManifestPage => Boolean(page))
    .slice(0, 4);

  const lines = [
    `# ${site.displayName}`,
    `> ${aiSummary}`,
    "",
    `${site.displayName} combines advisory plus implementation across ESG readiness and revenue visibility. The site covers services, regulatory explainers, practical checklists, comparison pages, and downloadable resources designed for CFOs, CSOs, CMOs, RevOps leaders, and executive teams.`,
    "",
    "Use this file as the fastest overview. Use llms-full.txt when you need the broader page index or machine-readable discovery endpoints.",
    "",
    "## Best starting points",
    ...featuredPages.map((page) => listItem(page)),
    "",
    "## Machine-readable and agent endpoints",
    ...machineEndpointLines(),
    "",
    "## Services",
    ...renderAllServices(),
    "",
    "## Regulatory hub",
    ...regulatoryPages.map((page) => listItem(page)),
    "",
    "## Latest insights and tools",
    ...latestInsights.map((page) => {
      const details = getInsightDetails(page.route);
      return listItem(
        page,
        details
          ? `${page.description} Audience: ${details.audience}. Topics: ${details.topics.join(
              ", "
            )}. Updated: ${details.updated}.`
          : page.description
      );
    }),
    "",
    "## Comparison pages",
    ...comparePages.map((page) => listItem(page)),
    "",
    "## Contact",
    `- Website: ${site.baseUrl}`,
    `- General: ${site.emails.general}`,
    `- Partnerships: ${partnerEmail}`,
    `- Talent: ${talentEmail}`,
  ];

  if (companyLinkedIn) {
    lines.push(`- LinkedIn: ${companyLinkedIn}`);
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function buildLlmsFullTxt() {
  const pagesBySection = manifest.pages.reduce<Record<string, ManifestPage[]>>(
    (acc, page) => {
      (acc[page.section] ||= []).push(page);
      return acc;
    },
    {}
  );

  const sectionOrder: SectionKey[] = [
    "home",
    "services",
    "regulatory",
    "insights",
    "compare",
    "company",
    "legal",
    "other",
  ];

  const lines = [
    `# ${site.displayName} - Full AI Content Index`,
    `> ${aiSummary}`,
    "",
    "This file is generated from the site's route inventory and page metadata at build time. It gives AI systems, search agents, and future MCP-style clients a compact markdown index of the website's substantive content.",
    "",
    "## Machine-readable and agent endpoints",
    ...machineEndpointLines(),
    "",
    ...renderDownloads(),
    "## Full page inventory",
    `Total indexed pages: ${manifest.pageCount}`,
    "",
  ];

  for (const section of sectionOrder) {
    const pages = pagesBySection[section] ?? [];
    if (!pages.length) continue;

    lines.push(`### ${SECTION_LABELS[section]}`);
    lines.push(...pages.sort(sortByHierarchy).map((page) => listItem(page)));
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}