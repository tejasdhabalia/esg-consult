import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'src', 'app');
const SITE_FILE = path.join(ROOT, 'src', 'lib', 'site.ts');
const OUT_FILE = path.join(ROOT, 'public', 'sitemap.xml');

/**
 * Routes kept out of the sitemap.
 *
 * Industry pages: held back per Brief 2 (SEO project, 24 Aug 2026). Two pages
 * read as thin, and they are commented out of navigation, so a visitor
 * arriving from search cannot navigate the section. The pages stay live and
 * indexable. When five or six exist with real depth they return to the
 * sitemap and to navigation together, and it gets flagged to the SEO project.
 *
 * Partner pages are deliberately NOT excluded. Earlier project notes said
 * they were; that was never true in this file.
 * The strategic finance partnership page is excluded because it carries
 * noindex. Brief 3, Task 4 (SEO project). It recruits introducers, and as
 * the only live page under the finance and accounting area it was occupying
 * a search position a buyer would reach. A noindex page listed in the
 * sitemap is a contradiction, so the two changes belong together.
 *
 * The partners hub at /partners stays in. Only the child page is excluded.
 */
const EXCLUDED_ROUTES = new Set([
  '/favicon.ico',
  '/industries',
  '/industries/distribution-and-wholesale',
  '/industries/retail-and-d2c',
  '/partners/strategic-finance-partnership',
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory() && entry.name === 'api') continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }

  return files;
}

function stripGroupSegments(route) {
  return route
    .split('/')
    .filter((segment) => segment && !(segment.startsWith('(') && segment.endsWith(')')))
    .join('/');
}

function routeFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath).replaceAll('\\', '/');
  const dir = rel.replace(/(^|\/)page\.(tsx|ts|jsx|js)$/, '');
  
  const cleaned = stripGroupSegments(dir);
  const route = cleaned ? `/${cleaned}` : '/';
  return route.replace(/\/+$/, '') || '/';
}

function shouldIncludeRoute(route) {
  if (EXCLUDED_ROUTES.has(route)) return false;
  if (route.includes('[')) return false;
  return true;
}

function extractBaseUrl() {
  const explicit = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  try {
    const src = fs.readFileSync(SITE_FILE, 'utf8');
    const match = src.match(/baseUrl:\s*["'`](.*?)["'`]/);
    if (match?.[1]) return match[1].replace(/\/+$/, '');
  } catch {}

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return 'http://localhost:3000';
}

function toSitemapXml(urls) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`),
    '</urlset>',
    '',
  ];
  return lines.join('\n');
}

function main() {
  const baseUrl = extractBaseUrl();
  const allFiles = walk(APP_DIR);

  const pageFiles = allFiles.filter((filePath) =>
    /\/page\.(tsx|ts|jsx|js)$/.test(filePath.replaceAll('\\', '/')),
  );

  const routes = pageFiles
    .map(routeFromPageFile)
    .filter(shouldIncludeRoute)
    .filter((route, index, all) => all.indexOf(route) === index);

  const urls = routes
    .map((route) => (route === '/' ? `${baseUrl}/` : `${baseUrl}${route}`))
    .sort();

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, toSitemapXml(urls), 'utf8');

  console.log(`Generated sitemap.xml with ${urls.length} URLs -> ${OUT_FILE}`);
}

main();
