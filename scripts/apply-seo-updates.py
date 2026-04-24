#!/usr/bin/env python3
"""
Apply SEO metadata updates to page.tsx files.

Reads proposals from scripts/seo-proposals.ts and rewrites the metadata
block on each matching page to use the pageMetadata() helper.

Default mode is a dry run. Use --write to actually modify files.

Usage:
  python3 scripts/apply-seo-updates.py                       # Dry run, all routes
  python3 scripts/apply-seo-updates.py --write               # Apply all routes
  python3 scripts/apply-seo-updates.py --route /about        # Single route
  python3 scripts/apply-seo-updates.py --write --route /about
  python3 scripts/apply-seo-updates.py --force               # Bypass clean-git check

Safety:
  - Refuses to run --write if git working tree has uncommitted changes
    (so you always have a clean rollback via `git checkout -- .`).
  - Prints a unified diff per file in dry-run mode.
  - Processes one file at a time with explicit success/failure per route.
"""

import argparse
import difflib
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROPOSALS_FILE = ROOT / "scripts" / "seo-proposals.ts"
APP_DIR = ROOT / "src" / "app"

HELPER_IMPORT = 'import { pageMetadata } from "@/lib/page-metadata";'


# ---------- Proposal parsing ----------

def parse_proposals(text: str) -> dict:
    """
    Parse the proposals from the TypeScript file.

    Expected format per entry:
      "/route": {
        title: "...",
        description: "...",
        isInteractiveTool: true,   // optional
      },
    """
    proposals = {}

    # Grab the body of the `proposals` object literal.
    body_match = re.search(
        r"export const proposals[^=]*=\s*\{(.*)\};",
        text,
        re.DOTALL,
    )
    if not body_match:
        raise ValueError("Could not find `export const proposals` in proposals file.")
    body = body_match.group(1)

    # Match each entry: "route": { ... },
    entry_pattern = re.compile(
        r'"([^"]+)"\s*:\s*\{(.*?)\},\s*(?=(?:"[^"]+"\s*:|//|$))',
        re.DOTALL,
    )

    for m in entry_pattern.finditer(body):
        route = m.group(1)
        block = m.group(2)

        title_m = re.search(r'title:\s*"((?:[^"\\]|\\.)*)"', block, re.DOTALL)
        desc_m = re.search(r'description:\s*"((?:[^"\\]|\\.)*)"', block, re.DOTALL)
        tool_m = re.search(r"isInteractiveTool:\s*true", block)

        if not title_m or not desc_m:
            print(f"  Skipping {route}: missing title or description", file=sys.stderr)
            continue

        def unescape(s: str) -> str:
            return s.replace('\\"', '"').replace("\\\\", "\\")

        proposals[route] = {
            "title": unescape(title_m.group(1)),
            "description": unescape(desc_m.group(1)),
            "isInteractiveTool": bool(tool_m),
        }

    return proposals


# ---------- File path resolution ----------

def route_to_filepath(route: str) -> Path:
    if route == "/":
        return APP_DIR / "page.tsx"
    return APP_DIR / route.lstrip("/") / "page.tsx"


# ---------- File transformation ----------

def find_metadata_block(content: str):
    """Return (start_index, end_index) of the full `export const metadata = ...;` span.

    Handles two patterns:
      1. Plain:  export const metadata = { ... };
      2. Helper: export const metadata = pageMetadata({ ... });

    Returns None if no match.
    """
    # Pattern 2 (already using helper): detect first so we don't mis-match.
    helper_m = re.search(r"export const metadata\s*=\s*pageMetadata\s*\(\s*\{", content)
    if helper_m:
        start = helper_m.start()
        # Position of opening { of the object literal inside pageMetadata(
        brace_pos = helper_m.end() - 1
        depth = 0
        i = brace_pos
        while i < len(content):
            c = content[i]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    # Expect closing ) and ;, with optional whitespace between
                    while end < len(content) and content[end] in " \t":
                        end += 1
                    if end < len(content) and content[end] == ")":
                        end += 1
                    while end < len(content) and content[end] in " \t":
                        end += 1
                    if end < len(content) and content[end] == ";":
                        end += 1
                    return start, end
            i += 1
        return None

    # Pattern 1 (plain object literal)
    plain_m = re.search(r"export const metadata\s*=\s*\{", content)
    if not plain_m:
        return None
    start = plain_m.start()
    brace_pos = plain_m.end() - 1
    depth = 0
    i = brace_pos
    while i < len(content):
        c = content[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                if end < len(content) and content[end] == ";":
                    end += 1
                return start, end
        i += 1
    return None


def build_helper_call(route: str, title: str, description: str, is_tool: bool) -> str:
    """Build the replacement `export const metadata = pageMetadata({...})` string."""
    # Escape double quotes inside title/description for safety
    title_esc = title.replace('"', '\\"')
    desc_esc = description.replace('"', '\\"')

    lines = [
        "export const metadata = pageMetadata({",
        f'  title: "{title_esc}",',
        f'  description:',
        f'    "{desc_esc}",',
        f'  path: "{route}",',
    ]
    # Note: we no longer pass type. Default is "website" which is correct for
    # all pages including insights (since they are tools/resources, not editorial articles).
    lines.append("});")
    return "\n".join(lines)


def ensure_helper_import(content: str) -> str:
    """Insert the pageMetadata import after the last `@/lib/*` import, if missing.
    Preserves blank-line separation between the import block and surrounding code."""
    if HELPER_IMPORT in content:
        return content

    # Match only up to the semicolon, not trailing whitespace. Capture group 1 = full line.
    lib_pattern = re.compile(
        r'^(import\s+[^\n]*?from\s+"@/lib/[^"]+";)',
        re.MULTILINE,
    )
    lib_imports = list(lib_pattern.finditer(content))
    if lib_imports:
        last = lib_imports[-1]
        insert_pos = last.end(1)  # right after the semicolon
        return content[:insert_pos] + "\n" + HELPER_IMPORT + content[insert_pos:]

    # Fallback: insert after the last import of any kind
    any_pattern = re.compile(r'^(import\s+[^\n]*?;)', re.MULTILINE)
    any_imports = list(any_pattern.finditer(content))
    if any_imports:
        last = any_imports[-1]
        insert_pos = last.end(1)
        return content[:insert_pos] + "\n" + HELPER_IMPORT + content[insert_pos:]

    # No imports at all — insert at top
    return HELPER_IMPORT + "\n\n" + content


def swap_article_to_tool_schema(content: str) -> tuple[str, bool]:
    """
    Swap articleSchema -> toolSchema (WebApplication type) for interactive tool pages.
    Returns (new_content, was_changed).

    Idempotent: if toolSchema already exists and articleSchema doesn't, returns unchanged.
    """
    has_tool = "toolSchema" in content
    has_article = "articleSchema" in content

    # Already converted
    if has_tool and not has_article:
        return content, False

    if not has_article:
        return content, False

    # Rename the const declaration block. We need to find:
    #   const articleSchema = {
    #     "@context": "https://schema.org",
    #     "@type": "Article",
    #     headline: "...",
    #     ...
    #   };

    m = re.search(r"const articleSchema\s*=\s*\{", content)
    if not m:
        return content, False

    # Find end of block
    start = m.start()
    i = m.end() - 1
    depth = 0
    while i < len(content):
        c = content[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                if end < len(content) and content[end] == ";":
                    end += 1
                break
        i += 1
    else:
        return content, False

    block = content[start:end]

    # Transform the block
    new_block = block
    new_block = new_block.replace("const articleSchema", "const toolSchema", 1)
    new_block = re.sub(r'"@type":\s*"Article"', '"@type": "WebApplication"', new_block, count=1)
    new_block = re.sub(r"headline:", "name:", new_block, count=1)
    new_block = re.sub(r"datePublished:", "dateCreated:", new_block, count=1)

    # Add applicationCategory and operatingSystem after the @type line if not present
    if '"applicationCategory"' not in new_block and "applicationCategory:" not in new_block:
        new_block = re.sub(
            r'("@type":\s*"WebApplication",)',
            r'\1\n  applicationCategory: "BusinessApplication",\n  operatingSystem: "Web",',
            new_block,
            count=1,
        )

    # Add a free-tool offers block after operatingSystem, if not present
    if "offers:" not in new_block:
        new_block = re.sub(
            r'(operatingSystem:\s*"Web",)',
            r'\1\n  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },',
            new_block,
            count=1,
        )

    content = content[:start] + new_block + content[end:]

    # Update the script tag reference
    content = content.replace(
        "JSON.stringify(articleSchema)",
        "JSON.stringify(toolSchema)",
    )

    return content, True


def apply_updates(content: str, route: str, proposal: dict) -> tuple[str, list]:
    """Apply all updates. Returns (new_content, list_of_change_notes)."""
    notes = []

    # 1. Add helper import if missing
    before = content
    content = ensure_helper_import(content)
    if content != before:
        notes.append("added pageMetadata import")

    # 2. Replace metadata block
    block_range = find_metadata_block(content)
    if block_range is None:
        notes.append("ERROR: no metadata block found")
        return content, notes

    start, end = block_range
    new_block = build_helper_call(
        route=route,
        title=proposal["title"],
        description=proposal["description"],
        is_tool=proposal["isInteractiveTool"],
    )
    content = content[:start] + new_block + content[end:]
    notes.append("replaced metadata block")

    # 3. Swap schema for interactive tool pages
    if proposal["isInteractiveTool"]:
        had_tool_already = "toolSchema" in content and "articleSchema" not in content
        content, swapped = swap_article_to_tool_schema(content)
        if swapped:
            notes.append("swapped articleSchema -> toolSchema")
        elif had_tool_already:
            notes.append("toolSchema already present (skipped)")
        else:
            notes.append("isInteractiveTool=true but no articleSchema block found (skipped)")

    # 4. Remove imports that are no longer used after the metadata replacement.
    # We only prune imports we know the helper replaced usage of (absUrl, site).
    content, pruned = prune_unused_imports(content, ["absUrl", "site"])
    for name in pruned:
        notes.append(f"removed unused import: {name}")

    return content, notes


def prune_unused_imports(content: str, candidates: list) -> tuple[str, list]:
    """For each candidate identifier, remove its named import from `@/lib/...` if it
    no longer appears anywhere else in the file. Returns (new_content, removed_names)."""
    removed = []
    for name in candidates:
        # Find the import line that includes this name
        # Pattern: import { ..., name, ... } from "@/lib/...";
        import_re = re.compile(
            r'^(import\s*\{\s*([^}]*)\}\s*from\s*"@/lib/[^"]+";)\s*\n',
            re.MULTILINE,
        )
        for m in list(import_re.finditer(content)):
            names_part = m.group(2)
            names = [n.strip() for n in names_part.split(",") if n.strip()]
            if name not in names:
                continue

            # Count usages outside the import line itself.
            # Remove the import line temporarily, then count identifier occurrences.
            without_import = content[:m.start()] + content[m.end():]
            # Word-boundary search for the identifier
            usage_count = len(re.findall(rf"\b{re.escape(name)}\b", without_import))
            if usage_count > 0:
                continue  # still used

            # Remove `name` from the import. If it's the only one, remove the whole line.
            remaining = [n for n in names if n != name]
            if not remaining:
                # Drop the entire import line
                content = content[:m.start()] + content[m.end():]
            else:
                # Keep the line, just remove this name
                new_names_part = ", ".join(remaining)
                new_import = m.group(1).replace(
                    "{" + names_part + "}",
                    "{ " + new_names_part + " }",
                )
                content = content[:m.start()] + new_import + "\n" + content[m.end():]
            removed.append(name)
            break  # move to next candidate
    return content, removed


# ---------- Git safety check ----------

def git_working_tree_clean() -> bool:
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        return result.stdout.strip() == ""
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


# ---------- Main ----------

def main():
    parser = argparse.ArgumentParser(description="Apply SEO updates from proposals.")
    parser.add_argument("--write", action="store_true",
                        help="Actually modify files. Default is dry run.")
    parser.add_argument("--route", help="Process only this single route (e.g. /about).")
    parser.add_argument("--force", action="store_true",
                        help="Bypass the clean-git-tree safety check.")
    args = parser.parse_args()

    # Load proposals
    if not PROPOSALS_FILE.exists():
        print(f"ERROR: proposals file not found: {PROPOSALS_FILE}", file=sys.stderr)
        sys.exit(1)

    proposals = parse_proposals(PROPOSALS_FILE.read_text(encoding="utf-8"))
    print(f"Loaded {len(proposals)} proposal(s) from {PROPOSALS_FILE.name}")

    # Filter by route
    if args.route:
        if args.route not in proposals:
            print(f"ERROR: route {args.route} not in proposals file.", file=sys.stderr)
            sys.exit(1)
        proposals = {args.route: proposals[args.route]}

    # Git safety
    if args.write and not args.force:
        if not git_working_tree_clean():
            print("ERROR: git working tree is not clean.", file=sys.stderr)
            print("  Commit or stash your changes first, so you can roll back with", file=sys.stderr)
            print("  `git checkout -- .` if the script misbehaves.", file=sys.stderr)
            print("  Or re-run with --force to bypass this check.", file=sys.stderr)
            sys.exit(1)

    mode = "WRITE" if args.write else "DRY RUN"
    print(f"Mode: {mode}")
    print("=" * 72)

    success_count = 0
    fail_count = 0

    for route, proposal in proposals.items():
        fp = route_to_filepath(route)
        print(f"\n{route}  ({fp.relative_to(ROOT)})")

        if not fp.exists():
            print(f"  SKIP: file not found")
            fail_count += 1
            continue

        original = fp.read_text(encoding="utf-8")
        updated, notes = apply_updates(original, route, proposal)

        for n in notes:
            print(f"  - {n}")

        if any("ERROR" in n for n in notes):
            fail_count += 1
            continue

        if updated == original:
            print("  (no changes)")
            continue

        if args.write:
            fp.write_text(updated, encoding="utf-8")
            print("  WROTE file")
            success_count += 1
        else:
            # Show a short diff
            diff = difflib.unified_diff(
                original.splitlines(keepends=True),
                updated.splitlines(keepends=True),
                fromfile=f"a/{fp.relative_to(ROOT)}",
                tofile=f"b/{fp.relative_to(ROOT)}",
                n=1,
            )
            diff_text = "".join(diff)
            # Trim very long diffs for readability
            if len(diff_text.splitlines()) > 40:
                lines = diff_text.splitlines()
                diff_text = "\n".join(lines[:40] + [f"  ... ({len(lines) - 40} more lines)"])
            print("  DIFF:")
            for line in diff_text.splitlines():
                print(f"    {line}")
            success_count += 1

    print("\n" + "=" * 72)
    print(f"Summary: {success_count} ready, {fail_count} failed/skipped")
    if not args.write:
        print("\nThis was a dry run. To apply changes, run with --write.")


if __name__ == "__main__":
    main()
