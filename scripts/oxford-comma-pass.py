"""
Oxford comma pass. Brief 3, Task 2 (SEO project).

The brief cited five examples. A site-wide scan found 356, across 45 files,
so this is automated rather than hand-edited. The risk with automating it is
that not every comma before "and" is an Oxford comma: in "it stalled, it
failed, and nobody noticed" the comma joins independent clauses and is
correct.

Guard: only the pattern `word, word, and word` is considered, which needs at
least three list items, and the match is skipped when the word after the
conjunction is a pronoun or similar clause opener. On this codebase that
guard flags exactly one case, in the homepage ("that, ask, and we"), which is
left for a human. Everything else is a plain list.

Only the final comma is removed. "a, b, c and d" keeps its earlier commas.

FAQ answers feed FAQPage schema from the same string in the same file, so
rendered copy and schema stay in sync automatically.

Idempotent. Dry run by default. Pass --apply to write.
"""

import os
import re
import sys

ROOT = "src"
SKIP_DIRS = {"generated"}

# A conjunction followed by one of these is probably joining clauses, not
# ending a list. Left alone for a human to read.
CLAUSE_OPENERS = {
    "it", "they", "we", "you", "he", "she", "there", "this", "that", "i",
    "its", "their", "our", "your", "his", "her", "these", "those",
    "nobody", "everyone", "someone", "most", "many", "some",
}

PATTERN = re.compile(r"(\w+), (\w+), (and|or) (\w+)")


def main():
    apply = "--apply" in sys.argv
    changed_files = {}
    total = flagged = 0
    flags = []

    for root, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if not name.endswith((".ts", ".tsx")):
                continue
            path = os.path.join(root, name)
            with open(path, encoding="utf-8", newline="") as f:
                text = f.read()

            hits = 0

            def repl(m):
                nonlocal hits, flagged
                if m.group(4).lower() in CLAUSE_OPENERS:
                    flagged += 1
                    line = text[: m.start()].count("\n") + 1
                    flags.append((path, line, m.group(0)))
                    return m.group(0)
                hits += 1
                return f"{m.group(1)}, {m.group(2)} {m.group(3)} {m.group(4)}"

            new = PATTERN.sub(repl, text)
            if hits:
                changed_files[path] = new
                total += hits
                print(f"{hits:4}  {path}")

    print(f"\n{total} Oxford comma(s) removed across {len(changed_files)} file(s).")

    if flags:
        print(f"\n{flagged} left for review (possible clause join, not a list):")
        for path, line, frag in flags:
            print(f"  {path}:{line}  ...{frag}...")

    if apply:
        for path, text in changed_files.items():
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(text)
        print(f"\nWritten to {len(changed_files)} file(s).")
    else:
        print("\nDry run. Pass --apply to write.")


if __name__ == "__main__":
    main()
