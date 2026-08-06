"""
Rename the /services/marketing-automation route to
/services/crm-and-revenue-operations across the whole codebase.

Run from the repo root (the folder containing package.json).

    py scripts/rename-crm-route.py            # dry run, changes nothing
    py scripts/rename-crm-route.py --apply    # actually makes the changes

What it does:
  1. Renames the folder src/app/services/marketing-automation
     to  src/app/services/crm-and-revenue-operations
     (the three child page folders move with it automatically)
  2. Replaces every occurrence of the old route string in .ts, .tsx and
     .mjs files under src/ and scripts/

What it deliberately skips:
  - src/generated/  These files are rebuilt by "npm run dev" and
    "npm run build", so editing them by hand is pointless.
  - node_modules, .next, .git

The script is idempotent. Running it twice is harmless: the second run
will report that there is nothing left to do.
"""

import argparse
import subprocess
import sys
from pathlib import Path

OLD_ROUTE = "services/marketing-automation"
NEW_ROUTE = "services/crm-and-revenue-operations"

OLD_DIR = Path("src/app/services/marketing-automation")
NEW_DIR = Path("src/app/services/crm-and-revenue-operations")

SEARCH_ROOTS = [Path("src"), Path("scripts")]
EXTENSIONS = {".ts", ".tsx", ".mjs", ".js", ".jsx"}
SKIP_PARTS = {"node_modules", ".next", ".git", "generated"}


def check_repo_root() -> None:
    if not Path("package.json").exists():
        sys.exit(
            "Error: no package.json here.\n"
            "Run this from the repo root, the folder that contains package.json."
        )


def check_git_clean(apply: bool) -> None:
    """Warn if there are uncommitted changes, so a bad run can be undone."""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            capture_output=True,
            text=True,
            check=True,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Note: could not read git status. Skipping the clean-tree check.\n")
        return

    if result.stdout.strip() and apply:
        print("Warning: you have uncommitted changes in this repo.")
        print("If this script goes wrong, those changes cannot be separated out.")
        answer = input("Type yes to continue anyway: ").strip().lower()
        if answer != "yes":
            sys.exit("Stopped. Commit your current work first, then run this again.")
        print()


def should_skip(path: Path) -> bool:
    return any(part in SKIP_PARTS for part in path.parts)


def collect_files() -> list[Path]:
    files: list[Path] = []
    for root in SEARCH_ROOTS:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix not in EXTENSIONS:
                continue
            if should_skip(path):
                continue
            files.append(path)
    return sorted(files)


def rename_folder(apply: bool) -> None:
    print("Step 1: folder rename")

    if NEW_DIR.exists():
        print(f"  already done, {NEW_DIR} exists")
        return

    if not OLD_DIR.exists():
        print(f"  nothing to do, {OLD_DIR} not found")
        return

    print(f"  {OLD_DIR}")
    print(f"    -> {NEW_DIR}")

    if not apply:
        return

    # Prefer "git mv" so history follows the files. Fall back to a plain
    # rename if git is unavailable or the folder is not tracked.
    try:
        subprocess.run(
            ["git", "mv", str(OLD_DIR), str(NEW_DIR)],
            check=True,
            capture_output=True,
        )
        print("  renamed with git mv, history preserved")
    except (subprocess.CalledProcessError, FileNotFoundError):
        OLD_DIR.rename(NEW_DIR)
        print("  renamed on disk (git mv unavailable)")


def rewrite_files(apply: bool) -> int:
    print("\nStep 2: route references")

    changed = 0
    total_hits = 0

    for path in collect_files():
        text = path.read_text(encoding="utf-8")
        hits = text.count(OLD_ROUTE)
        if hits == 0:
            continue

        changed += 1
        total_hits += hits
        print(f"  {hits:>3} in {path.as_posix()}")

        if apply:
            path.write_text(text.replace(OLD_ROUTE, NEW_ROUTE), encoding="utf-8")

    if changed == 0:
        print("  no remaining references, nothing to do")
    else:
        print(f"\n  {total_hits} references across {changed} files")

    return total_hits


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Rename the marketing-automation route to crm-and-revenue-operations."
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Make the changes. Without this flag the script only reports.",
    )
    args = parser.parse_args()

    check_repo_root()
    check_git_clean(args.apply)

    mode = "APPLYING CHANGES" if args.apply else "DRY RUN, nothing will be changed"
    print(f"{mode}\n")

    rename_folder(args.apply)
    rewrite_files(args.apply)

    print()
    if args.apply:
        print("Done. Now:")
        print("  1. Delete the .next folder")
        print("  2. Run npm run dev")
        print("  3. Check /services/crm-and-revenue-operations loads")
        print("  4. Check /services/marketing-automation redirects to it")
    else:
        print("This was a dry run. Re-run with --apply to make these changes:")
        print("  py scripts/rename-crm-route.py --apply")


if __name__ == "__main__":
    main()
