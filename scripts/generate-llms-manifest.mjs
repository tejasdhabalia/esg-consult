import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'src', 'app');
const OUTPUT_DIR = path.join(ROOT, 'src', 'generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'llms-manifest.ts');

const SITE = {
  legalName: 'DS Consulting',
  displayName: 'DS Consulting',
  baseUrl: 'https://www.consult-ds.com',
};

const PAGE_OVERRIDES = {
  '/insights/leaky-funnel-audit': {
    title: 'Leaky Funnel Audit Tool | DS Consulting',
    description:
      'An interactive audit to quantify funnel leakage and identify the highest-impact levers across MQL, SQL, win rate, and deal size.',
  },
};

const PRIORITY_OVERRIDES = {
  '/': { priority: 1.0, changeFrequency: 'weekly' },
  '/services': { priority: 0.9, changeFrequency: 'monthly' },
  '/services/esg-advisory': { priority: 0.9, changeFrequency: 'monthly' },
  '/services/esg-advisory/csrd-advisory': { priority: 0.85, changeFrequency: 'monthly' },
  '/services/esg-advisory/brsr-advisory': { priority: 0.85, changeFrequency: 'monthly' },
  '/services/esg-advisory/uk-climate-reporting': { priority: 0.85, changeFrequency: 'monthly' },
  '/services/marketing-automation': { priority: 0.9, changeFrequency: 'monthly' },
  '/services/marketing-automation/crm-architecture-governance': { priority: 0.85, changeFrequency: 'monthly' },
  '/services/marketing-automation/lifecycle-lead-management': { priority: 0.85, changeFrequency: 'monthly' },
  '/services/marketing-automation/revenue-analytics': { priority: 0.85, changeFrequency: 'monthly' },
  '/regulatory-hub': { priority: 0.85, changeFrequency: 'weekly' },
  '/regulatory-hub/csrd-in-scope-and-timeline': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/csrd-double-materiality-and-esrs-mapping': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/brsr-core-readiness-kpis-controls': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/brsr-value-chain-data-collection': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/uk-climate-governance-and-risk-management': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/uk-climate-metrics-targets-and-evidence': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/what-is-csrd': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/what-is-double-materiality': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/what-is-esrs': { priority: 0.8, changeFrequency: 'monthly' },
  '/regulatory-hub/what-is-sebi-brsr': { priority: 0.8, changeFrequency: 'monthly' },
  '/insights': { priority: 0.85, changeFrequency: 'weekly' },
  '/insights/csrd-readiness-first-90-days': { priority: 0.8, changeFrequency: 'monthly' },
  '/insights/crm-governance-checklist': { priority: 0.8, changeFrequency: 'monthly' },
  '/insights/leaky-funnel-audit': { priority: 0.8, changeFrequency: 'monthly' },
  '/insights/marketing-governance-model-for-automation': { priority: 0.8, changeFrequency: 'monthly' },
  '/compare/ds-consulting-vs-generalist-agencies': { priority: 0.75, changeFrequency: 'monthly' },
  '/compare/in-house-vs-outsourced-crm-governance': { priority: 0.75, changeFrequency: 'monthly' },
  '/about': { priority: 0.75, changeFrequency: 'monthly' },
  '/team': { priority: 0.7, changeFrequency: 'monthly' },
  '/contact': { priority: 0.8, changeFrequency: 'yearly' },
  '/privacy': { priority: 0.3, changeFrequency: 'yearly' },
  '/terms': { priority: 0.3, changeFrequency: 'yearly' },
  '/cookies': { priority: 0.3, changeFrequency: 'yearly' },
  '/accessibility': { priority: 0.3, changeFrequency: 'yearly' },
  '/case-studies': { priority: 0.3, changeFrequency: 'monthly' },
};

const EXCLUDED_ROUTES = new Set(['/favicon.ico']);

function normalizeTemplateLiteral(raw) {
  return raw
    .replace(/\$\{\s*site\.legalName\s*\}/g, SITE.legalName)
    .replace(/\$\{\s*site\.displayName\s*\}/g, SITE.displayName)
    .replace(/\$\{\s*site\.baseUrl\s*\}/g, SITE.baseUrl)
    .replace(/\$\{\s*absUrl\([^)]*\)\s*\}/g, '')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readLiteralValue(source, fieldName) {
  const fieldIndex = source.indexOf(`${fieldName}:`);
  if (fieldIndex === -1) return null;
  const afterColon = source.slice(fieldIndex + fieldName.length + 1);
  const quoteIndex = afterColon.search(/["'`]/);
  if (quoteIndex === -1) return null;
  const quote = afterColon[quoteIndex];
  let i = quoteIndex + 1;
  let value = '';
  let escaped = false;
  for (; i < afterColon.length; i += 1) {
    const ch = afterColon[i];
    if (escaped) {
      value += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      value += ch;
      escaped = true;
      continue;
    }
    if (ch === quote) {
      return normalizeTemplateLiteral(value);
    }
    value += ch;
  }
  return null;
}

function titleFromRoute(route) {
  if (route === '/') return SITE.displayName;
  return route
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
    )
    .join(' | ');
}

function sectionFromRoute(route) {
  if (route === '/') return 'home';
  const [top] = route.split('/').filter(Boolean);
  switch (top) {
    case 'services':
      return 'services';
    case 'regulatory-hub':
      return 'regulatory';
    case 'insights':
      return 'insights';
    case 'compare':
      return 'compare';
    case 'about':
    case 'team':
    case 'contact':
      return 'company';
    case 'privacy':
    case 'terms':
    case 'cookies':
    case 'accessibility':
      return 'legal';
    default:
      return 'other';
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name === 'page.tsx') files.push(fullPath);
  }
  return files;
}

function toRoute(filePath) {
  const relative = path.relative(APP_DIR, filePath);
  const withoutPage = relative.replace(/page\.tsx$/, '');
  const withoutTrailingSlash = withoutPage.replace(/[/\\]$/, '');
  if (!withoutTrailingSlash) return '/';
  return `/${withoutTrailingSlash.split(path.sep).join('/')}`;
}

function toTsModule(manifest) {
  return `export const llmsManifest = ${JSON.stringify(manifest, null, 2)} as const;\n\nexport type LlmsManifest = typeof llmsManifest;\n`;
}

async function main() {
  const pageFiles = await walk(APP_DIR);
  const pages = [];

  for (const filePath of pageFiles) {
    const route = toRoute(filePath);
    if (EXCLUDED_ROUTES.has(route)) continue;

    const source = await fs.readFile(filePath, 'utf8');
    const overrides = PAGE_OVERRIDES[route] ?? {};
    const routing = PRIORITY_OVERRIDES[route] ?? { priority: 0.5, changeFrequency: 'monthly' };
    const title = overrides.title ?? readLiteralValue(source, 'title') ?? titleFromRoute(route);
    const description =
      overrides.description ??
      readLiteralValue(source, 'description') ??
      `Read ${title.replace(/\s*\|\s*DS Consulting$/, '')} on ${SITE.displayName}.`;

    pages.push({
      route,
      url: `${SITE.baseUrl}${route === '/' ? '' : route}`,
      title,
      description,
      section: sectionFromRoute(route),
      priority: routing.priority,
      changeFrequency: routing.changeFrequency,
      source: path.relative(ROOT, filePath),
    });
  }

  pages.sort((a, b) =>
    a.route === '/'
      ? -1
      : b.route === '/'
        ? 1
        : a.section !== b.section
          ? a.section.localeCompare(b.section)
          : a.route.localeCompare(b.route),
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    pageCount: pages.length,
    pages,
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, toTsModule(manifest), 'utf8');
  console.log(`Generated ${path.relative(ROOT, OUTPUT_FILE)} with ${pages.length} pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
