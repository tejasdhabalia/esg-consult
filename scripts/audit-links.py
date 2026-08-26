"""
Audit every internal link on the site.

Reports three classes of problem:
  BROKEN    the target has no page.tsx and is not an API or file route
  REDIRECT  the target resolves only via a redirect in next.config.ts
  EXCLUDED  the target is live but deliberately kept out of the sitemap

Read only. Makes no changes.

Usage: py scripts/audit-links.py
"""

import os
import re
import json

APP = "src/app"
SRC = "src"


def discover_routes():
    """Every route backed by a page.tsx, plus route handlers."""
    pages, handlers = set(), set()
    for root, _, files in os.walk(APP):
        rel = os.path.relpath(root, APP)
        rel = "" if rel == "." else rel
        # Strip Next.js route groups: (marketing)/about -> /about
        parts = [p for p in rel.split(os.sep) if p and not p.startswith("(")]
        route = "/" + "/".join(parts) if parts else "/"
        if "page.tsx" in files:
            pages.add(route)
        if "route.ts" in files or "route.tsx" in files:
            handlers.add(route)
    return pages, handlers


def discover_redirects():
    """Redirect sources from next.config.ts, both literal and :param."""
    try:
        cfg = open("next.config.ts", encoding="utf-8").read()
    except FileNotFoundError:
        return []
    return re.findall(r'source:\s*"([^"]+)"', cfg)


def matches_redirect(link, sources):
    for s in sources:
        if s == link:
            return s
        # /services/marketing-automation/:slug -> prefix match
        if ":" in s:
            prefix = s.split(":")[0].rstrip("/")
            if prefix and link.startswith(prefix + "/"):
                return s
    return None


def discover_dynamic(pages):
    """Routes containing a [param] segment, matched by prefix."""
    return [p for p in pages if "[" in p]


def matches_dynamic(link, dynamics):
    for d in dynamics:
        prefix = d.split("[")[0].rstrip("/")
        if prefix and link.startswith(prefix + "/"):
            return d
    return None


def strip_comments(text):
    """
    Remove JSX comments, block comments and line comments.

    Deactivated links live inside {/* ... */} by project convention, so
    counting them produces false positives. JSX comments cannot nest, so a
    non-greedy match is safe here.
    """
    text = re.sub(r"\{\s*/\*.*?\*/\s*\}", "", text, flags=re.S)
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    text = re.sub(r"^\s*//.*$", "", text, flags=re.M)
    return text


def collect_links():
    """Every internal href/Link target in the codebase, with its file."""
    found = []
    pattern = re.compile(r'(?:href|url)[=:]\s*[{"\']*["\'](/[^"\'#?]*)["\']')
    for root, _, files in os.walk(SRC):
        if "generated" in root:
            continue
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            path = os.path.join(root, f)
            raw = open(path, encoding="utf-8", errors="ignore").read()
            text = strip_comments(raw)
            for m in pattern.finditer(text):
                link = m.group(1)
                line = text[: m.start()].count("\n") + 1
                found.append((link, path, line))
    return found


def check_hub_listings():
    """
    Pages that exist but are not listed on their hub.

    The insights hub and the regulatory hub each render from a registry
    (src/lib/insights.ts and the items array in the regulatory hub page)
    rather than from the filesystem. Creating a page under src/app does not
    put it on the hub, and nothing fails: the page builds, deploys, sits in
    the sitemap and is reachable by search, but a visitor browsing the hub
    never sees it.

    That is invisible to the broken-link check above, because the page is
    real. Caught it once by hand after shipping. Now it is checked.
    """
    checks = [
        ("insights", "src/app/insights", "src/lib/insights.ts"),
        ("regulatory-hub", "src/app/regulatory-hub", "src/app/regulatory-hub/page.tsx"),
    ]
    problems = 0
    print("\n" + "=" * 70)
    print("HUB LISTING COVERAGE")
    print("=" * 70)

    for label, app_dir, registry in checks:
        if not os.path.isdir(app_dir) or not os.path.isfile(registry):
            continue
        on_disk = {
            d for d in os.listdir(app_dir)
            if os.path.isdir(os.path.join(app_dir, d))
            and os.path.isfile(os.path.join(app_dir, d, "page.tsx"))
        }
        with open(registry, encoding="utf-8", errors="ignore") as f:
            listed = set(re.findall(r'slug:\s*"([^"]+)"', f.read()))

        missing = sorted(on_disk - listed)
        orphan = sorted(listed - on_disk)

        if not missing and not orphan:
            print(f"  {label}: {len(on_disk)} page(s), all listed")
            continue

        problems += len(missing) + len(orphan)
        for slug in missing:
            print(f"  {label}: /{label}/{slug} exists but is NOT on the hub")
        for slug in orphan:
            print(f"  {label}: '{slug}' is listed but has no page")

    return problems


def main():
    pages, handlers = discover_routes()
    redirects = discover_redirects()
    dynamics = discover_dynamic(pages)
    links = collect_links()

    # Static asset prefixes that are files on disk, not routes.
    asset_prefix = ("/downloads/", "/brand/", "/team/", "/hero/", "/_next/")
    asset_exact = {
        "/favicon.ico", "/icon.png", "/apple-icon.png", "/og-default.png",
        "/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt",
        "/file.svg", "/globe.svg", "/window.svg", "/next.svg", "/vercel.svg",
    }

    broken, via_redirect = {}, {}
    seen = set()

    for link, path, line in links:
        norm = link.rstrip("/") or "/"
        if norm in asset_exact or link.startswith(asset_prefix):
            continue
        if link.startswith("/api/") or norm in handlers:
            continue
        if norm in pages:
            continue
        if matches_dynamic(norm, dynamics):
            continue

        r = matches_redirect(norm, redirects)
        key = (norm, path, line)
        if key in seen:
            continue
        seen.add(key)
        if r:
            via_redirect.setdefault(norm, []).append((path, line, r))
        else:
            broken.setdefault(norm, []).append((path, line))

    print(f"Routes with a page: {len(pages)}")
    print(f"Redirect sources:   {len(redirects)}")
    print(f"Internal links:     {len(links)}\n")

    print("=" * 70)
    print(f"BROKEN LINKS: {len(broken)}")
    print("=" * 70)
    if not broken:
        print("None.")
    for link, refs in sorted(broken.items()):
        print(f"\n  {link}")
        for path, line in refs:
            print(f"      {path}:{line}")

    print("\n" + "=" * 70)
    print(f"LINKS RESOLVING VIA REDIRECT: {len(via_redirect)}")
    print("=" * 70)
    if not via_redirect:
        print("None.")
    for link, refs in sorted(via_redirect.items()):
        print(f"\n  {link}")
        for path, line, r in refs:
            print(f"      {path}:{line}  (matches redirect {r})")

    # Links to pages deliberately kept out of the sitemap.
    try:
        sm = open("public/sitemap.xml", encoding="utf-8").read()
        in_sitemap = set(re.findall(r"<loc>https?://[^/]+([^<]*)</loc>", sm))
        excluded = {}
        for link, path, line in links:
            norm = link.rstrip("/") or "/"
            if norm in pages and norm not in in_sitemap and norm != "/":
                excluded.setdefault(norm, []).append((path, line))
        print("\n" + "=" * 70)
        print(f"LINKED BUT NOT IN SITEMAP: {len(excluded)}")
        print("=" * 70)
        print("Expected for deliberate exclusions. Check nothing unintended is here.\n")
        for link in sorted(excluded):
            print(f"  {link}  ({len(excluded[link])} link(s))")
    except FileNotFoundError:
        pass

    hub_problems = check_hub_listings()

    print()
    if broken or hub_problems:
        print("FAIL")
    else:
        print("PASS: no broken internal links, all pages listed on their hub")


if __name__ == "__main__":
    main()
