import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

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
 *
 * /meet is the direct booking link, sent by hand over WhatsApp, LinkedIn or
 * after meeting somebody. It is not linked from anywhere on the site and
 * carries noindex. It is excluded here for the same reason as the partner
 * page: listing a noindex page in the sitemap is a contradiction.
 */
const EXCLUDED_ROUTES = new Set([
  '/favicon.ico',
  '/meet',
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

/**
 * Date of the last commit that touched a page file, as YYYY-MM-DD.
 *
 * Returns null rather than guessing. Until September 2026 this file stamped
 * every URL with the date of the build, which told search engines all 70
 * pages changed on every deploy. A lastmod that is always today is treated
 * as noise and discounted, which costs more than having none at all.
 *
 * Null is expected in two normal cases: a page added but not yet committed,
 * and a shallow clone on the build server where the commit that last touched
 * the file is outside the fetched history. Both produce an omitted lastmod,
 * which is correct. Set VERCEL_DEEP_CLONE or increase the fetch depth if
 * fuller coverage is wanted.
 */
function lastCommitDate(filePath) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

function toSitemapXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ url, lastmod }) =>
      lastmod
        ? `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`
        : `  <url><loc>${url}</loc></url>`,
    ),
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

  const seen = new Set();
  const entries = [];

  for (const filePath of pageFiles) {
    const route = routeFromPageFile(filePath);
    if (!shouldIncludeRoute(route) || seen.has(route)) continue;
    seen.add(route);

    entries.push({
      url: route === '/' ? `${baseUrl}/` : `${baseUrl}${route}`,
      lastmod: lastCommitDate(filePath),
    });
  }

  entries.sort((a, b) => a.url.localeCompare(b.url));

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, toSitemapXml(entries), 'utf8');

  const dated = entries.filter((entry) => entry.lastmod).length;
  console.log(
    `Generated sitemap.xml with ${entries.length} URLs, ${dated} with lastmod -> ${OUT_FILE}`,
  );
}

main();
