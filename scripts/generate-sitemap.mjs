import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");
const SITE_FILE = path.join(ROOT, "src", "lib", "site.ts");
const OUT_FILE = path.join(ROOT, "public", "sitemap.xml");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function stripGroupSegments(route) {
  // remove (group) segments from route
  return route
    .split("/")
    .filter((seg) => seg && !(seg.startsWith("(") && seg.endsWith(")")))
    .join("/");
}

function routeFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath).replaceAll("\\", "/");
  // e.g. "about/page.tsx" => "about"
  const dir = rel.replace(/\/page\.(tsx|ts|jsx|js)$/, "");
  const cleaned = stripGroupSegments(dir);
  const route = cleaned ? `/${cleaned}` : "/";
  return route.replace(/\/+$/, "") || "/";
}
function extractBaseUrl() {
  // 1) Explicit env var wins (recommended)
  const explicit =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) return explicit.replace(/\/+$/, "");

  // 2) Parse src/lib/site.ts for baseUrl: "..."
  try {
    const src = fs.readFileSync(SITE_FILE, "utf8");
    const m = src.match(/baseUrl:\s*["'`](.*?)["'`]/);
    if (m?.[1]) return m[1].replace(/\/+$/, "");
  } catch {}

  // 3) Last fallback: Vercel deployment URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // 4) Local fallback
  return "http://localhost:3000";
}

function toSitemapXml(urls) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls.map(
      (u) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`
    ),
    `</urlset>`,
    ``,
  ];
  return lines.join("\n");
}

function main() {
  const baseUrl = extractBaseUrl();
  const allFiles = walk(APP_DIR);

  const pageFiles = allFiles.filter((f) =>
    /\/page\.(tsx|ts|jsx|js)$/.test(f.replaceAll("\\", "/"))
  );

  const routes = pageFiles
    .map(routeFromPageFile)
    // skip dynamic routes like /insights/[slug]
    .filter((r) => !r.includes("["))
    // skip duplicates
    .filter((r, i, arr) => arr.indexOf(r) === i);

  const urls = routes
    .map((r) => (r === "/" ? `${baseUrl}/` : `${baseUrl}${r}`))
    .sort();

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, toSitemapXml(urls), "utf8");

  console.log(`Generated sitemap.xml with ${urls.length} URLs -> ${OUT_FILE}`);
}

main();