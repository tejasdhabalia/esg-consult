import { llmsManifest as manifest } from "@/generated/llms-manifest";
import { getAllInsightsNewestFirst } from "@/lib/insights";
import { site } from "@/lib/site";

type ManifestPage = (typeof manifest.pages)[number];
type SectionKey = ManifestPage["section"];

const SECTION_LABELS: Record<SectionKey, string> = {
  home: "Overview",
  services: "Services",
  regulatory: "Regulatory hub",
  insights: "Insights and tools",
  compare: "Comparison pages",
  company: "Company",
  legal: "Policies and trust",
  other: "Other pages",
};

const FEATURED_ROUTE_ORDER = [
  "/",
  "/services",
  "/services/esg-advisory",
  "/services/marketing-automation",
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

const FEATURED_SERVICE_ROUTES = [
  "/services/esg-advisory",
  "/services/esg-advisory/csrd-advisory",
  "/services/esg-advisory/brsr-advisory",
  "/services/esg-advisory/uk-climate-reporting",
  "/services/marketing-automation",
  "/services/marketing-automation/crm-architecture-governance",
  "/services/marketing-automation/lifecycle-lead-management",
  "/services/marketing-automation/revenue-analytics",
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
  return `- [${cleanTitle(page.title)}](${page.url}) — ${extra ?? page.description}`;
}

function machineEndpointLines() {
  const lines = [
    `- [robots.txt](${site.baseUrl}/robots.txt) — crawler access guidance.`,
    `- [sitemap.xml](${site.baseUrl}/sitemap.xml) — exhaustive URL inventory for search engines, agents, and site crawlers.`,
    `- [llms.txt](${site.baseUrl}/llms.txt) — curated overview for AI systems.`,
    `- [llms-full.txt](${site.baseUrl}/llms-full.txt) — expanded AI content index covering all major pages and resources.`,
  ];

  if (mcpServerUrl) {
    lines.push(
      `- [MCP server](${mcpServerUrl}) — public Model Context Protocol endpoint for agents and tool-based clients (transport: ${mcpTransport}).`
    );
  } else {
    lines.push(
      `- MCP server — no public endpoint is configured at the moment. Set NEXT_PUBLIC_MCP_SERVER_URL to publish one here automatically.`
    );
  }

  return lines;
}

function renderDownloads() {
  if (!downloads.length) return [];

  return [
    "## Downloads",
    ...downloads.map(
      (item) => `- [${item.title}](${item.url}) — ${item.description}`
    ),
    "",
  ];
}

export function buildLlmsTxt() {
  const featuredPages = getPages(FEATURED_ROUTE_ORDER);
  const servicePages = getPages(FEATURED_SERVICE_ROUTES);
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
    "Use this file as the fastest overview. Use `llms-full.txt` when you need the broader page index or machine-readable discovery endpoints.",
    "",
    "## Best starting points",
    ...featuredPages.map((page) => listItem(page)),
    "",
    "## Machine-readable and agent endpoints",
    ...machineEndpointLines(),
    "",
    "## Services",
    ...servicePages.map((page) => listItem(page)),
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
    `# ${site.displayName} — Full AI Content Index`,
    `> ${aiSummary}`,
    "",
    `This file is generated from the site's route inventory and page metadata at build time. It gives AI systems, search agents, and future MCP-style clients a compact markdown index of the website's substantive content.`,
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

    lines.push(`## ${SECTION_LABELS[section]}`);

    for (const page of pages) {
      if (section === "insights") {
        const details = getInsightDetails(page.route);
        lines.push(
          listItem(
            page,
            details
              ? `${page.description} Audience: ${details.audience}. Topics: ${details.topics.join(
                  ", "
                )}. Read time: ${details.readTime}. Updated: ${details.updated}.`
              : page.description
          )
        );
      } else {
        lines.push(listItem(page));
      }
    }

    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}