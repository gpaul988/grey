# Grey InfoTech — Code Audit (real codebase)

**Date:** June 8, 2026
**Repo:** github.com/gpaul988/grey · 725 MB
**Stack:** Next.js 16.2.6 (Turbopack) · React 19 · TypeScript 6 · Tailwind v4 · separate Express+EJS Admin backend
**Build status:** ✅ Compiles, ✅ TypeScript passes, 113 static pages generated

This audit is based on the **actual source files**, not the live site. Build runs clean, so the issues below are architectural, SEO, security, accessibility, and hygiene — not compile errors.

---

## Severity summary

| # | Severity | Issue | Where |
|---|----------|-------|-------|
| 1 | 🔴 CRITICAL | Admin login accepts ANY email/password | `app/api/admin/login/route.ts` |
| 2 | 🔴 CRITICAL | 23,314 `node_modules` files committed to git (= 725 MB repo) | `Admin/`, `public/admin/vendor/` |
| 3 | 🔴 CRITICAL | Default admin session secret `'dev-admin-secret-change-me'` | `app/lib/adminAuth.ts` |
| 4 | 🟠 HIGH | Hybrid App Router + Pages Router (two routers, conflicting layouts) | `app/` vs `pages/` |
| 5 | 🟠 HIGH | No per-page SEO — all 75 pages share one generic title | every `pages/*.tsx` |
| 6 | 🟠 HIGH | TawkChat rendered twice (layout + _app) → duplicate chat widget | `app/layout.tsx`, `pages/_app.tsx` |
| 7 | 🟠 HIGH | Missing assets referenced by metadata: og-image, logo.png, apple-touch-icon, robots.txt, sitemap.xml | `public/` |
| 8 | 🟠 HIGH | `OrganizationSchema` rendered with empty `sameAs` (no social links) | `app/layout.tsx` |
| 9 | 🟡 MEDIUM | `middleware.ts` deprecated in Next 16 (use `proxy`) | `middleware.ts` |
| 10 | 🟡 MEDIUM | Middleware "auth" only checks cookie *presence*, not validity | `middleware.ts` |
| 11 | 🟡 MEDIUM | Nested `<main>` on homepage (a11y landmark violation) | `app/page.tsx` + `app/layout.tsx` |
| 12 | 🟡 MEDIUM | Favicon mismatch: `.ico` (layout) vs `.svg` (_app) | `app/layout.tsx`, `pages/_app.tsx` |
| 13 | 🟡 MEDIUM | 6 external `target="_blank"` links missing `rel="noopener"` | Home, Contact components |
| 14 | 🟡 MEDIUM | Inconsistent route casing (`/Links`, `/Startups`, `/services/Javascript`) | `pages/` |
| 15 | 🟡 MEDIUM | `globals.css` imported in 50 files instead of once | components/pages |
| 16 | 🟢 LOW | Dead files shipped: `none.html` (731 lines), `pages/empty.tsx`, redundant `server.js` | root |
| 17 | 🟢 LOW | reCAPTCHA script loaded globally but only used on one form | `pages/_document.tsx` |
| 18 | 🟢 LOW | App Router page imports a Pages-router component (`app/page.tsx` → `pages/Home`) | `app/page.tsx` |
| 19 | 🟢 LOW | ESLint peer-dep conflict (eslint 10 vs eslint-plugin-react needs ≤9) | `package.json` |

---

## 🔴 CRITICAL

### 1. Admin login accepts any credentials
`app/api/admin/login/route.ts` — there is **no password verification**. Any email + any non-empty password mints a valid signed admin session:

```ts
// Minimal demo verification - replace with real user check
const user = { name: email.split('@')[0] || 'Admin', email };
const signed = signAdminSession(user);
```

Anyone who knows `/admin/login` exists can log in as admin. **This must be fixed before any deploy.** See FIXES section for a hardened version with hashed credentials.

### 2. node_modules committed to git (725 MB repo)
`.gitignore` only ignores root `/node_modules`. But these are tracked:
- `Admin/node_modules/**`
- `public/admin/vendor/{express,express-session,nodemon,npm-run-all,daterangepicker}/node_modules/**`

23,314 tracked files. This bloats clones, slows CI, and leaks dependency internals. Fix: update `.gitignore`, `git rm -r --cached`, recommit.

### 3. Default session secret hardcoded
`app/lib/adminAuth.ts`:
```ts
const SECRET = process.env.ADMIN_SESSION_SECRET || 'dev-admin-secret-change-me';
```
If `ADMIN_SESSION_SECRET` isn't set in prod, sessions are forgeable by anyone who reads the source. Should fail loudly in production instead of falling back.

---

## 🟠 HIGH

### 4. Two routers fighting each other
The project runs **both** routers:
- `app/` (App Router) — has `layout.tsx` with Header, Footer, TawkChat, metadata, `<main>`.
- `pages/` (Pages Router) — 75 page files, each importing its **own** `<Header/>` and `<Footer/>`, plus `_app.tsx` with its own TawkChat + Head.

Consequences: duplicated layout logic, two metadata systems, the homepage (`app/page.tsx`) pulling a Pages component (`pages/Home`). Pick **one** router. Recommended: migrate everything to App Router so metadata, layouts, and streaming work consistently. (Big effort — flag as roadmap item.)

### 5. No per-page SEO
Only `pages/_app.tsx` sets `<title>` — a single hardcoded `Grey InfoTech Limited`. None of the 75 pages (services, industries, blog, contact…) set their own title or meta description. Every page looks identical to Google. This kills ranking for ~60 service/industry landing pages. Each needs unique `<Head>` (Pages router) or `metadata` export (App router).

### 6. Duplicate TawkChat widget
Rendered in **both** `app/layout.tsx` and `pages/_app.tsx` with the same propertyId/widgetId. On any route the script can load twice. Render it once, in whichever single layout you keep.

### 7. Missing referenced assets
`app/layout.tsx` metadata + `StructuredData.tsx` reference files that don't exist in `public/`:
- `/og-image.png` (1200×630) — referenced by OG + Twitter
- `/logo.png` — referenced by Organization schema
- `/apple-touch-icon.png`
- `/robots.txt` — missing entirely
- `/sitemap.xml` — missing entirely

Result: broken social previews, broken schema logo, no crawl directives. (I can generate og-image/logo and create robots+sitemap.)

### 8. Empty structured-data sameAs
`<OrganizationSchema/>` is called with no props, so `sameAs: []`. Social profiles (FB/Twitter/IG/LinkedIn that exist in the footer & emails) aren't linked in schema — a missed rich-result/knowledge-panel signal.

---

## 🟡 MEDIUM

### 9. Deprecated middleware convention
Next 16 build warns: `The "middleware" file convention is deprecated. Please use "proxy" instead.` Rename `middleware.ts` → `proxy.ts` and update export.

### 10. Middleware auth is cosmetic
`middleware.ts` only checks `req.cookies.get('admin_user')` **exists** — it never verifies the HMAC signature. A user can set any `admin_user` cookie and pass the middleware gate (real check is deferred to "server-side" which, per #1, also doesn't validate credentials). Verify the signature in the edge check or a server component.

### 11. Nested `<main>` on homepage
`app/layout.tsx` renders `<main id="main-content">{children}</main>`, and `app/page.tsx` wraps `<Home/>` in another `<main>`. Two `<main>` landmarks = WCAG violation + screen-reader confusion. Remove the inner one.

### 12. Favicon mismatch
`app/layout.tsx` → `/favicon.ico`; `pages/_app.tsx` → `/favicon.svg`. Only `favicon.svg` exists in `public/`. Pick one and make both consistent.

### 13. External links missing rel="noopener"
6 links with `target="_blank"` and no `rel`:
- `pages/Home.tsx:874,905,936`
- `components/ContactBusinessInfo.tsx:111`
- `components/ContactQuickActions.tsx:31,59`

Security (reverse tabnabbing) + perf. Add `rel="noopener noreferrer"`.

### 14. Inconsistent route casing
Capitalized URLs: `/Links`, `/Startups`, `/Our-Approach`, `/Terms-Conditions`, and mixed service slugs (`/services/Javascript`, `/services/MVP` vs `/services/seo`, `/services/branding`). Capitalized URLs are case-sensitive, ugly to share, and hurt SEO consistency. Standardize to lowercase-kebab and add redirects.

### 15. globals.css imported 50×
`import '../app/globals.css'` appears in 50 components/pages. CSS imports should live once in the root layout. Harmless functionally but signals copy-paste sprawl.

---

## 🟢 LOW / hygiene

- **16.** `none.html` (731 lines), `pages/empty.tsx` (10 lines, builds a real `/empty` route), and `server.js` (redundant with `server.ts`) — dead weight shipped to the repo/build.
- **17.** reCAPTCHA `<script>` is in `_document.tsx` (loads on every page) but appears used by one form only. Load it only where needed.
- **18.** `app/page.tsx` importing `pages/Home` couples the two routers; once you consolidate (#4) this resolves.
- **19.** ESLint 10 conflicts with `eslint-plugin-react` peer (needs ≤9). Lint may misbehave; pin compatible versions.

---

## What's actually GOOD (keep it)
- `app/layout.tsx` metadata block is excellent — metadataBase, title template, OG, Twitter, robots, canonical all present and well-commented.
- `OptimizedImage.tsx` is solid (blur placeholder, responsive sizes, lazy/eager).
- `pages/api/submit-form.ts` is robust — SMTP verify, per-stage error handling, auto-response, env validation, no raw `any`.
- Zero raw `<img>` tags, zero `console.log`, zero `: any` in components.
- Skip-to-content link + semantic `<main>` + `font-display: swap` already in layout.

---

## Recommended order of fixes
1. **#1, #3, #10** — admin auth (security, do first)
2. **#2** — purge node_modules from git
3. **#7, #8, #5** — SEO assets + per-page metadata (biggest ranking ROI)
4. **#6, #11, #12, #13** — quick a11y/correctness wins
5. **#9, #14** — Next 16 proxy + route casing
6. **#4** — router consolidation (roadmap, largest effort)
7. **#15–19** — cleanup
