#!/usr/bin/env python3
"""Generic: delete any useEffect(...) call whose body references setIsDayTime."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE = {"feeling.tsx", "timebased.tsx", "ThemeProvider.tsx", "PersonalizationProvider.tsx", "useIsDayTime.ts"}

def strip_file(src: str) -> str:
    out = src
    while True:
        idx = out.find("useEffect(")
        found = False
        search_from = 0
        while True:
            i = out.find("useEffect(", search_from)
            if i == -1:
                break
            # find matching close of the useEffect( ... ) call by paren matching
            j = i + len("useEffect(")
            depth = 1
            in_str = None
            while j < len(out) and depth > 0:
                c = out[j]
                if in_str:
                    if c == in_str and out[j-1] != "\\":
                        in_str = None
                elif c in ("'", '"', "`"):
                    in_str = c
                elif c == "(":
                    depth += 1
                elif c == ")":
                    depth -= 1
                j += 1
            # j now just past the closing ')'. include trailing ';'
            end = j
            if end < len(out) and out[end] == ";":
                end += 1
            block = out[i:end]
            if "setIsDayTime" in block:
                # extend start backwards to consume leading whitespace/indent on its line
                line_start = out.rfind("\n", 0, i) + 1
                # also drop the preceding blank line if any
                new_out = out[:line_start].rstrip("\n") + "\n" + out[end:].lstrip("\n")
                out = new_out
                found = True
                break
            search_from = i + 1
        if not found:
            break
    return out

changed = []
for base in ("screens", "components"):
    for dp, _, names in os.walk(os.path.join(ROOT, base)):
        for n in names:
            if not n.endswith((".tsx", ".ts")) or n in EXCLUDE:
                continue
            fp = os.path.join(dp, n)
            with open(fp, encoding="utf-8") as f:
                src = f.read()
            if "setIsDayTime" not in src:
                continue
            new = strip_file(src)
            if new != src:
                with open(fp, "w", encoding="utf-8") as f:
                    f.write(new)
                changed.append(os.path.relpath(fp, ROOT))

print(f"Stripped {len(changed)} files")
for c in sorted(changed):
    print("  ", c)
