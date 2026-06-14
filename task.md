# Grey — Futuristic Upgrade + Fixes

## DONE
- [x] CSRF_SECRET warning: created Admin/config/env.ts, imported FIRST in server.ts (before Admin imports) so dotenv populates env before any module reads it.
- [x] Store double footer: Header + Footer now return null on /store/* (StoreLayout owns store chrome). Hook-safe guards.

## IN PROGRESS — EXTREME FUTURISTIC
- [ ] Header.tsx — go beyond current beam/underline: glassmorphism, animated aurora/holographic gradient, neon glow nav, magnetic CTA, scanline. Additive only.
- [ ] Footer.tsx — holographic grid, animated gradient mesh, neon social, glow CTA. Additive.
- [ ] Global futuristic CSS layer in globals.css (reusable utility classes) so all pages feel futuristic.
- [ ] Apply futuristic backdrop/treatment site-wide (body bg aurora, section glows) without breaking content.

## VERIFY
- [ ] tsc --noEmit clean
- [ ] restart dev, smoke test: /, a service page, /store (single header+footer), /login has _csrf, no CSRF warning in log
- [ ] commit + push (needs fresh token)

## NOTES
- Don't delete existing code. Additive only.
- Store = self-contained TechStore brand (dark, teal). Leave its chrome.
- config.env has valid 48-char secrets; warning was load-order only.
