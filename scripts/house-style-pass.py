"""
House style pass. Brief 3, Task 2 (SEO project), decision 1 confirmed
25 August 2026.

Removes the em-dash used as a sentence break, and the Oxford comma, from
body copy. Every replacement is written out in full rather than derived by
pattern, so each one can be reviewed before it runs.

Two things deliberately protected:

  En-dashes in numeric ranges (E1-E5, S1-S4, 80-100%, 2025-2026) are correct
  typography and are not touched. This script never matches the en-dash
  character.

  The attribution dash on the pull quote in crm-governance-checklist is a
  conventional citation marker, not a sentence break, so it stays. Flagged
  for a human decision rather than changed silently.

FAQ answer text feeds FAQPage schema. Because the schema is built from the
same string in the same file, editing the string keeps rendered copy and
schema in sync automatically. No separate schema edit is needed.

Idempotent. Dry run by default. Pass --apply to write.
"""

import re
import sys

# (path, old, new). Order within a file does not matter, all must be unique.
EDITS = [
    # ---------------------------------------------------------------- BRSR
    (
        "src/app/regulatory-hub/what-is-sebi-brsr/page.tsx",
        "reasonable assurance — the rest of the BRSR report is not.",
        "reasonable assurance. The rest of the BRSR report is not.",
    ),
    (
        "src/app/regulatory-hub/what-is-sebi-brsr/page.tsx",
        "mandatory reasonable assurance — the highest-stakes component",
        "mandatory reasonable assurance, the highest-stakes component",
    ),
    (
        "src/app/regulatory-hub/what-is-sebi-brsr/page.tsx",
        "<strong>reasonable assurance</strong> — the",
        "<strong>reasonable assurance</strong>, the",
    ),
    # ---------------------------------------------------------------- CSRD
    (
        "src/app/regulatory-hub/what-is-csrd/page.tsx",
        "double materiality framework — companies must assess both",
        "double materiality framework. Companies must assess both",
    ),
    (
        "src/app/regulatory-hub/what-is-csrd/page.tsx",
        "two of three criteria — 250+ employees, EUR 40M+ turnover, "
        "EUR 20M+ balance sheet — reporting from FY2024.",
        "two of three criteria: 250+ employees, EUR 40M+ turnover, "
        "EUR 20M+ balance sheet, reporting from FY2024.",
    ),
    (
        # Also drops an Oxford comma before "and".
        "src/app/regulatory-hub/what-is-csrd/page.tsx",
        "entity size, listing status, and — for non-EU companies —",
        "entity size, listing status and, for non-EU companies,",
    ),
    # ---------------------------------------------------------------- ESRS
    (
        "src/app/regulatory-hub/what-is-esrs/page.tsx",
        "specific disclosure requirements — it establishes",
        "specific disclosure requirements. It establishes",
    ),
    (
        "src/app/regulatory-hub/what-is-esrs/page.tsx",
        "the CSRD disclosure — all companies must complete it in full.",
        "the CSRD disclosure. All companies must complete it in full.",
    ),
    (
        "src/app/regulatory-hub/what-is-esrs/page.tsx",
        "double materiality assessment — if a topic is assessed",
        "double materiality assessment. If a topic is assessed",
    ),
    (
        # Also drops an Oxford comma before "and governance".
        "src/app/regulatory-hub/what-is-esrs/page.tsx",
        "cross-cutting requirements, environment, social, and governance —",
        "cross-cutting requirements, environment, social and governance,",
    ),
    # ------------------------------------------------- DOUBLE MATERIALITY
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "(1) impact materiality — how the company's operations",
        "(1) impact materiality, how the company's operations",
    ),
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "(2) financial materiality — how sustainability-related",
        "(2) financial materiality, how sustainability-related",
    ),
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "impacts on sustainability topics — people, communities, ecosystems, climate.",
        "impacts on sustainability topics: people, communities, ecosystems and climate.",
    ),
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "what matters to investors — i.e., the financial impact on the company.",
        "what matters to investors, meaning the financial impact on the company.",
    ),
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "affect their financial performance — two independent assessments",
        "affect their financial performance. Two independent assessments",
    ),
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "one or both dimensions — disclosure obligations follow",
        "one or both dimensions. Disclosure obligations follow",
    ),
    (
        "src/app/regulatory-hub/what-is-double-materiality/page.tsx",
        "from an impact perspective — and must",
        "from an impact perspective, and must",
    ),
    # ------------------------------------------------------- CRM CHECKLIST
    (
        "src/app/insights/crm-governance-checklist/page.tsx",
        "within that object — not just admin access.",
        "within that object, not just admin access.",
    ),
    (
        # Also drops an Oxford comma.
        "src/app/insights/crm-governance-checklist/page.tsx",
        "across marketing, sales, and RevOps — in writing.",
        "across marketing, sales and RevOps, in writing.",
    ),
    (
        "src/app/insights/crm-governance-checklist/page.tsx",
        "reassign, or disqualify — it must be documented",
        "reassign or disqualify. It must be documented",
    ),
    (
        "src/app/insights/crm-governance-checklist/page.tsx",
        "invisible leads — they exist in your system",
        "invisible leads. They exist in your system",
    ),
    (
        # Written without the comma so the Oxford pass, which runs after this
        # one, leaves it alone. Otherwise the two scripts disagree on the
        # final state and this entry reports as missing on a second run.
        "src/app/insights/crm-governance-checklist/page.tsx",
        "Churn — and the exact CRM logic",
        "Churn and the exact CRM logic",
    ),
    (
        "src/app/insights/crm-governance-checklist/page.tsx",
        "as a PDF — formatted for team use, with",
        "as a PDF, formatted for team use, with",
    ),
]

# Oxford commas in insights and config copy. Same explicit approach.
EDITS += [
    (
        "src/lib/esg-insight-pages.ts",
        "leadership, finance, and operations teams",
        "leadership, finance and operations teams",
    ),
    (
        "src/lib/esg-insight-pages.ts",
        "flood, heat, carbon price, market shift, and policy change",
        "flood, heat, carbon price, market shift and policy change",
    ),
    (
        "src/lib/esg-insight-pages.ts",
        "avoid, reduce, transfer, monitor, or adapt",
        "avoid, reduce, transfer, monitor or adapt",
    ),
    (
        "src/lib/esg-insight-pages.ts",
        "boards, lenders, customers, and reporting frameworks",
        "boards, lenders, customers and reporting frameworks",
    ),
    (
        "src/lib/esg-insight-pages.ts",
        "risk type, owner, evidence, financial linkage, and response action",
        "risk type, owner, evidence, financial linkage and response action",
    ),
]


def main():
    apply = "--apply" in sys.argv
    applied = skipped = missing = 0
    cache = {}

    # The 9 BRSR principles use an em-dash as a label separator, nine times
    # in one string. A colon is the right mark for a label, and doing it by
    # pattern avoids nine near-identical entries in the table above.
    brsr = "src/app/regulatory-hub/what-is-sebi-brsr/page.tsx"
    with open(brsr, encoding="utf-8", newline="") as f:
        cache[brsr] = f.read()
    cache[brsr], n = re.subn(r"(P\d) — ", r"\1: ", cache[brsr])
    if n:
        applied += n
        print(f"OK      {brsr}\n        {n} principle separator(s) to colons")
    else:
        print(f"SKIP    {brsr}\n        principle separators already converted")

    for path, old, new in EDITS:
        if path not in cache:
            with open(path, encoding="utf-8", newline="") as f:
                cache[path] = f.read()
        text = cache[path]

        if new in text and old not in text:
            skipped += 1
            print(f"SKIP    {path}\n        already applied: {old[:60]}...")
            continue

        count = text.count(old)
        if count == 0:
            missing += 1
            print(f"MISSING {path}\n        not found: {old[:60]}...")
            continue
        if count > 1:
            missing += 1
            print(f"AMBIG   {path}\n        {count} matches, expected 1: {old[:60]}...")
            continue

        cache[path] = text.replace(old, new, 1)
        applied += 1
        print(f"OK      {path}\n        {old[:70]}")

    print(f"\n{applied} applied, {skipped} already done, {missing} problems.")

    if missing:
        print("\nProblems found. Nothing written. Resolve before applying.")
        return

    if apply:
        for path, text in cache.items():
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(text)
        print(f"Written to {len(cache)} file(s).")
    else:
        print("Dry run. Pass --apply to write.")

    print(
        "\nNOTE: the pull quote attribution dash in crm-governance-checklist\n"
        "line 267 was left in place. It is a citation marker, not a sentence\n"
        "break, so it sits outside the scope of this task. Change it only if\n"
        "you want the rule read absolutely."
    )


if __name__ == "__main__":
    main()
