/**
 * IndexNow: tell Bing and the other participating search engines which
 * URLs changed in the production deploy that just went live.
 * SEO brief for Batches 3 and 4, IndexNow section, 30 October 2026.
 *
 * Runs from .github/workflows/indexnow.yml after Vercel reports a
 * successful Production deployment. Never runs for previews.
 *
 * How it decides what to send:
 * - It reads the live sitemap (the deploy is already live when this runs)
 *   and compares it with the sitemap saved after the previous deploy.
 * - Sends: URLs that are new, URLs whose lastmod date changed, and URLs
 *   that left the sitemap (they now redirect or are gone).
 * - A lastmod that disappears is not a change. That happens when Vercel's
 *   shallow clone no longer reaches the commit that last touched a page.
 * - First run, or if the saved copy has expired: sends URLs whose lastmod
 *   is today or yesterday (UTC), which covers everything committed in the
 *   deploy being announced.
 * - Never sends the whole sitemap: repeated unchanged submissions count
 *   against the site.
 *
 * It never fails the deploy. Any error is logged and the script exits 0.
 *
 * Local test, sends nothing:
 *   node scripts/indexnow-notify.mjs --dry-run
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const HOST = 'www.consult-ds.com';
// Public by design: it proves ownership by sitting on the domain.
const KEY = '98b36abf7c2cf771dfe2958644308cc6';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const STATE_FILE = path.join(process.cwd(), '.indexnow', 'previous-sitemap.xml');
const DRY_RUN = process.argv.includes('--dry-run');

function parseSitemap(xml) {
  const map = new Map();
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) || []) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() || null;
    if (loc) map.set(loc, lastmod);
  }
  return map;
}

function onOurHost(url) {
  try {
    return new URL(url).host === HOST;
  } catch {
    return false;
  }
}

function utcDate(offsetDays = 0) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

async function fetchLiveSitemap() {
  // A couple of retries in case the edge is still settling.
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetch(`${SITEMAP_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) return await res.text();
      console.log(`Sitemap fetch returned ${res.status} (attempt ${attempt})`);
    } catch (error) {
      console.log(`Sitemap fetch failed (attempt ${attempt}): ${error.message}`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  return null;
}

async function main() {
  const liveXml = await fetchLiveSitemap();
  if (!liveXml) {
    console.log('Could not read the live sitemap. Nothing sent.');
    return;
  }
  const live = parseSitemap(liveXml);

  let previous = null;
  try {
    previous = parseSitemap(await fs.readFile(STATE_FILE, 'utf8'));
  } catch {
    previous = null;
  }

  const urls = new Set();
  if (previous) {
    for (const [loc, lastmod] of live) {
      if (!previous.has(loc)) urls.add(loc);
      else if (lastmod && lastmod !== previous.get(loc)) urls.add(loc);
    }
    for (const loc of previous.keys()) {
      if (!live.has(loc)) urls.add(loc);
    }
    console.log(`Compared with the previous deploy's sitemap (${previous.size} URLs).`);
  } else {
    const since = utcDate(-1);
    for (const [loc, lastmod] of live) {
      if (lastmod && lastmod >= since) urls.add(loc);
    }
    console.log(`No saved sitemap: sending URLs with lastmod on or after ${since}.`);
  }

  const urlList = [...urls].filter(onOurHost).sort();
  console.log(`${urlList.length} URL(s) to send:`);
  for (const u of urlList) console.log(`  ${u}`);

  let ok = urlList.length === 0;
  if (urlList.length > 0 && !DRY_RUN) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
      });
      ok = res.status === 200 || res.status === 202;
      console.log(`IndexNow responded ${res.status}${ok ? ' (success)' : ''}`);
      if (!ok) console.log(await res.text().catch(() => ''));
    } catch (error) {
      console.log(`IndexNow request failed: ${error.message}`);
    }
  }

  if (DRY_RUN) {
    console.log('Dry run: nothing sent, nothing saved.');
    return;
  }

  // Save the live sitemap only when this deploy's URLs were accepted, so a
  // failed request is retried with the next deploy.
  if (ok) {
    await fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
    await fs.writeFile(STATE_FILE, liveXml);
    console.log('Saved the live sitemap for the next comparison.');
  }
}

main().catch((error) => {
  console.log(`IndexNow step failed: ${error.message}`);
});
