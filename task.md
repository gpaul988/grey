# Grey — frontend fixes + theme migration

## DONE
- [x] Footer newsletter moved BELOW office addresses (mt-12). Verified in browser.
- [x] Removed automatic clock-based day/night theming across 57 files.
      - New shared hook components/useIsDayTime.ts -> useTheme().resolved==='light'
      - ThemeToggle button now flips bg globally (light=white, dark=black). Verified on Home + service page.
      - feeling.tsx / timebased.tsx / ThemeProvider.tsx / PersonalizationProvider.tsx intentionally untouched.
- [x] tsc --noEmit clean.
- [x] Verified theme toggle + footer in mb browser.

## SCRIPTS (scripts/)
- migrate-isdaytime.py     (useState->hook + import)
- cleanup-isdaytime-effects.py (remove interval effects)
- strip-setisdaytime-effects.py (generic brace-match strip of remaining setIsDayTime effects)

## LEFT
- [ ] npm run build (kill tmux grey first to avoid OOM)
- [ ] commit + push as gpaul988
- [ ] answer user 404 concern: admin renders fine locally => prod stale / needs redeploy

## NOTE on admin 404s
All 8 admin modules render locally. Not a code bug — prod running stale code. Awaiting user confirmation on deploy method.
