#!/usr/bin/env python3
"""Remove orphaned useEffect blocks that referenced setIsDayTime (now undefined)."""
import re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE_NAMES = {"feeling.tsx", "timebased.tsx", "ThemeProvider.tsx", "PersonalizationProvider.tsx", "useIsDayTime.ts"}

files = []
for base in ("screens", "components"):
    for dp, _, names in os.walk(os.path.join(ROOT, base)):
        for n in names:
            if n.endswith((".tsx", ".ts")) and n not in EXCLUDE_NAMES:
                files.append(os.path.join(dp, n))

# Pattern A: interval useEffect with setInterval + setIsDayTime(prev => ...)
patA = re.compile(
    r"\n(?:[^\n]*\n)?[ \t]*useEffect\(\(\) => \{\s*"
    r"const id = setInterval\(\(\) => \{\s*"
    r"const hour = new Date\(\)\.getHours\(\);\s*"
    r"setIsDayTime\(prev => \{\s*"
    r"const next = hour >= 6 && hour < 18;\s*"
    r"return prev === next \? prev : next;\s*"
    r"\}\);\s*"
    r"\}, 60_?000\);[^\n]*\n\s*"
    r"return \(\) => clearInterval\(id\);\s*"
    r"\}, \[\]\);",
    re.MULTILINE,
)

# Pattern B: simple useEffect setting isDayTime once.
patB = re.compile(
    r"\n[ \t]*useEffect\(\(\) => \{\s*"
    r"(?://[^\n]*\n\s*)?"
    r"const hour = new Date\(\)\.getHours\(\);\s*"
    r"setIsDayTime\(hour >= 6 && hour < 18\);[^\n]*\n\s*"
    r"\}, \[\]\);",
    re.MULTILINE,
)

# Strip a now-orphaned leading comment line just above (the "// Optional..." / "// isDaytime react hook")
comment_lines = (
    "// Optional: if you want the value to update over time, use an interval (does not set state synchronously on mount)",
)

changed = []
for fp in files:
    with open(fp, encoding="utf-8") as f:
        src = f.read()
    orig = src
    src = patA.sub("", src)
    src = patB.sub("", src)
    for cl in comment_lines:
        src = src.replace("\n" + cl, "")
        src = src.replace(cl + "\n", "")
    if src != orig:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(src)
        changed.append(os.path.relpath(fp, ROOT))

print(f"Cleaned {len(changed)} files")
for c in sorted(changed):
    print("  ", c)
