import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import {
  PAGE_SECTIONS,
  getPage,
  getSiteOverview,
  listDownloads,
  listPages,
  searchPages,
} from "@/mcp/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SectionEnum = z.enum(PAGE_SECTIONS);

function jsonText(value: unknown) {
  return JSON.stringify(value, null, 2);
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_site_overview",
      {
        title: "Get site overview",
        description: "Overview of site + contact details.",
        inputSchema: {},
      },
      async () => ({
        content: [{ type: "text", text: jsonText(getSiteOverview()) }],
      })
    );

    server.registerTool(
      "list_pages",
      {
        title: "List pages",
        description: "List pages; optionally filter by section.",
        inputSchema: {
          section: SectionEnum.optional(),
          limit: z.number().int().min(1).max(100).optional(),
        },
      },
      async ({ section, limit }) => {
        const pages = listPages({ section, limit });
        return {
          content: [
            { type: "text", text: jsonText({ section: section ?? null, count: pages.length, pages }) },
          ],
        };
      }
    );

    server.registerTool(
      "get_page",
      {
        title: "Get page",
        description: "Get one page by route or URL.",
        inputSchema: { route: z.string().min(1) },
      },
      async ({ route }) => {
        const page = getPage(route);
        return {
          content: [
            { type: "text", text: jsonText(page ?? { error: "Page not found", route }) },
          ],
        };
      }
    );

    server.registerTool(
      "search_pages",
      {
        title: "Search pages",
        description: "Search by title/description/topics/etc.",
        inputSchema: {
          query: z.string().min(2),
          section: SectionEnum.optional(),
          limit: z.number().int().min(1).max(50).optional(),
        },
      },
      async ({ query, section, limit }) => {
        const pages = searchPages({ query, section, limit });
        return {
          content: [
            { type: "text", text: jsonText({ query, section: section ?? null, count: pages.length, pages }) },
          ],
        };
      }
    );

    server.registerTool(
      "list_downloads",
      {
        title: "List downloads",
        description: "List site downloads/resources.",
        inputSchema: {},
      },
      async () => {
        const downloads = listDownloads();
        return {
          content: [{ type: "text", text: jsonText({ count: downloads.length, downloads }) }],
        };
      }
    );
  },
  {},
  { basePath: "/api", maxDuration: 60 }
);

export { handler as GET, handler as POST };