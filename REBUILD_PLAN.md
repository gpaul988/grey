# Grey Rebuild — Execution Plan (App Router migration + audit fixes + futuristic upgrades)

## Strategy
- App Router becomes the single routing + SEO authority. Thin route files in `app/**` render existing page bodies from `pages/**` (kept as reusable client components — NOT deleted).
- Per-route `generateMetadata` gives all 75 pages unique SEO.
- Remove `pages/` ROUTING role by neutralizing `_app`/`_document` titles; keep page component files as imports.
- Note: cannot run app/ and pages/ routes for the SAME path. Solution: keep page *components* but move route entry into app/. Where a pages/ file is a real route, create app/ route that imports it; the pages/ file still exists as a module (Next won't double-route because we convert pages/ files that conflict). For safety we relocate reusable bodies to `components/pages/` via re-export shims and let app/ own routing.

## Phases
- [ ] P0 Security: helmet, rate-limit, CSRF, fail-fast secrets, sanitize, secure cookies
- [ ] P0 Git/assets: robots.txt, sitemap.xml, manifest.json, og-image, apple-touch-icon
- [ ] P1 Theme system: ThemeProvider (light/dark/system) + toggle, replace time-only logic
- [ ] P1 SEO: per-route metadata map + generateMetadata, fixed schema (sameAs, WebSite, Breadcrumb)
- [ ] P1 Router: app/ route wrappers for every page, no dual-routing
- [ ] P2 Futuristic: framer-motion polish, WebGL hero, PWA, error/loading states
- [ ] P2 AI: streaming estimator API + RAG chatbot (side-by-side with TawkChat)
- [ ] P3 Admin + Login redesign (futuristic EJS dashboard + auth UI)
- [ ] P4 Build, typecheck, run, verify
