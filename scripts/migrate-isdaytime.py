#!/usr/bin/env python3
"""Replace per-component clock-based isDayTime with the global useIsDayTime() hook."""
import re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files to migrate (relative to repo root). feeling.tsx is intentionally excluded
# (there isDayTime is a (now)=>bool function, different semantics).
files = []
for base in ("screens", "components"):
    for dirpath, _, names in os.walk(os.path.join(ROOT, base)):
        for n in names:
            if n.endswith(".tsx"):
                files.append(os.path.join(dirpath, n))

EXCLUDE = {
    os.path.join(ROOT, "screens", "feeling.tsx"),
    os.path.join(ROOT, "components", "ThemeProvider.tsx"),
    os.path.join(ROOT, "components", "timebased.tsx"),
    os.path.join(ROOT, "components", "futuristic", "PersonalizationProvider.tsx"),
}

changed = []

def import_path(fp: str) -> str:
    """Relative import to components/useIsDayTime from file fp."""
    rel = os.path.relpath(os.path.join(ROOT, "components", "useIsDayTime"), os.path.dirname(fp))
    rel = rel.replace(os.sep, "/")
    if not rel.startswith("."):
        rel = "./" + rel
    return rel

for fp in files:
    if fp in EXCLUDE:
        continue
    with open(fp, encoding="utf-8") as f:
        src = f.read()
    if "isDayTime" not in fp and "isDayTime" not in src:
        continue
    orig = src

    # Pattern 1: useState<boolean>(() => { const hour = new Date().getHours(); return hour >= 6 && hour < 18; });
    src = re.sub(
        r"const \[isDayTime, setIsDayTime\] = useState<boolean>\(\(\) => \{\s*const hour = new Date\(\)\.getHours\(\);\s*return hour >= 6 && hour < 18;\s*\}\);",
        "const isDayTime = useIsDayTime();",
        src,
    )

    # Pattern 2: useState(true);
    src = re.sub(
        r"const \[isDayTime, setIsDayTime\] = useState\(true\);",
        "const isDayTime = useIsDayTime();",
        src,
    )

    # Pattern 3: IIFE  const isDayTime = (() => { const hour = new Date().getHours(); return hour >= 6 && hour < 18; })();
    src = re.sub(
        r"const isDayTime = \(\(\) => \{\s*const hour = new Date\(\)\.getHours\(\);\s*return hour >= 6 && hour < 18;\s*\}\)\(\);",
        "const isDayTime = useIsDayTime();",
        src,
    )

    # Remove the interval useEffect that updates isDayTime (Pattern 1 companion).
    src = re.sub(
        r"\n[^\n]*useEffect\(\(\) => \{\s*const id = setInterval\(\(\) => \{\s*const hour = new Date\(\)\.getHours\(\);\s*setIsDayTime\(prev => \{\s*const next = hour >= 6 && hour < 18;\s*return prev === next \? prev : next;\s*\}\);\s*\}, 60_?000\);\s*return \(\) => clearInterval\(id\);\s*\}, \[\]\);",
        "",
        src,
    )

    # Remove the simple useEffect that sets isDayTime once (Pattern 2 companion).
    src = re.sub(
        r"\n[^\n]*useEffect\(\(\) => \{\s*(?://[^\n]*\n\s*)?const hour = new Date\(\)\.getHours\(\);\s*setIsDayTime\(hour >= 6 && hour < 18\);[^\n]*\n\s*\}, \[\]\);",
        "",
        src,
    )

    if src == orig:
        continue

    # Add the import if not present.
    if "useIsDayTime" not in orig:
        ip = import_path(fp)
        # Insert after the last existing import line.
        lines = src.split("\n")
        last_import = -1
        for i, ln in enumerate(lines):
            if ln.startswith("import "):
                last_import = i
        imp = f"import {{useIsDayTime}} from '{ip}';"
        if last_import >= 0:
            lines.insert(last_import + 1, imp)
        else:
            lines.insert(0, imp)
        src = "\n".join(lines)

    with open(fp, "w", encoding="utf-8") as f:
        f.write(src)
    changed.append(os.path.relpath(fp, ROOT))

print(f"Changed {len(changed)} files:")
for c in sorted(changed):
    print("  ", c)
