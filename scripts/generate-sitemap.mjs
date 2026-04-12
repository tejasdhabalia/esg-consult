import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'src', 'app');
const SITE_FILE = path.join(ROOT, 'src', 'lib', 'site.ts');
const OUT_FILE = path.join(ROOT, 'public', 'sitemap.xml');

const EXCLUDED_ROUTES = new Set(['/favicon.ico']);

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
  const dir = rel.replace(/\/page\.(tsx|ts|jsx|js)$/, '');
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
