# Grey — Ads system + Admin upgrade build

## Architecture facts (verified)
- Repos: `createRepo<T>(table, [whitelistFields])` in Admin/models/index.ts
- Public feeds: pages/api/*.ts (Next). Admin API: Admin/routes/api.ts (express, `ok`/`fail`/`actor`, AdminAPI client helper, logActivity)
- Admin pages: Admin/routes/admin.ts -> res.render('apps-X', {title, ...baseLocals, data})
- Views: Admin/views/apps-X.ejs (Velzon Bootstrap, ti- icons, AdminAPI helper, bootstrap.Modal)
- Sidebar: Admin/views/partials/sidenav.ejs (isActive(k) from res.locals.activeNav = url seg)
- Uploads: Admin/config/uploads.ts -> multer instances + ensureUploadDir/publicUrl; served at /uploads/<sub>/<file>
- Schema: Admin/db/schema.ts (CREATE TABLE IF NOT EXISTS, auto-migrate on boot)
- navBadges set in server.ts from dashboardStats()
- Social handles live in components/Footer.tsx / lib/seo.ts

## DONE
- [x] Partners page + /api/partner-inquiry + dual email (verified)
- [x] Preloader + CookieConsent (fixed clipping, verified)
- [x] schema: partner_inquiries, faqs ; types + repos

## BUILD PLAN
### DB/schema (new tables)
- [ ] ads (id, title, body, image, link_url, cta_label, placement, status, starts_at, ends_at, impressions, clicks, share_caption, sort_order, active, created_at, updated_at)
- [ ] subscribers (id, email, name, source, status, created_at)
- [ ] announcements (id, message, link_url, link_label, variant, active, starts_at, ends_at, created_at, updated_at)
- [ ] page_seo (id, path UNIQUE, title, description, keywords, og_image, updated_at)
- [ ] analytics_events (id, type[pageview|click|conversion], path, ref, meta, ua, created_at)
- [ ] media (id, url, filename, mime, size, alt, created_at) -- library

### Models + types
- [ ] types.ts + repos: Ads, Subscribers, Announcements, PageSeo, AnalyticsEvents, Media

### Admin API (Admin/routes/api.ts)
- [ ] ads CRUD + /ads/:id/duplicate ; upload endpoint for ad image
- [ ] subscribers list/delete/export csv
- [ ] announcements CRUD
- [ ] page-seo upsert/list
- [ ] analytics summary endpoint
- [ ] media upload/list/delete
- [ ] partner-inquiries list/status/delete
- [ ] faqs CRUD

### Admin views + routes + sidebar
- [ ] apps-ads.ejs (table + modal w/ upload+url, share preview, schedule, stats)
- [ ] apps-faqs.ejs
- [ ] apps-partner-inquiries.ejs (inbox, status)
- [ ] apps-subscribers.ejs
- [ ] apps-announcement.ejs
- [ ] apps-media.ejs
- [ ] apps-analytics.ejs (apex charts)
- [ ] apps-seo.ejs
- [ ] routes in admin.ts + sidebar nav group "Marketing" / "Growth"

### Frontend (Next)
- [ ] pages/api/ads.ts (active ads by placement; impression++ ; /api/ads/click?id -> redirect + click++)
- [ ] pages/api/subscribe.ts (newsletter signup)
- [ ] pages/api/announcement.ts
- [ ] pages/api/faqs.ts
- [ ] components/futuristic/AdBanner.tsx (homepage hero banner) + social share buttons (FB,X,IG,LinkedIn,WhatsApp,Telegram)
- [ ] components/futuristic/AnnouncementBar.tsx
- [ ] /faq page + screens/faq.tsx + footer link
- [ ] Newsletter signup in footer
- [ ] Mount AdBanner on Home, AnnouncementBar in layout

### Verify + push
- [ ] tsc --noEmit, build, preview screenshots
- [ ] commit + push as grahamsobiribopaul (ask_secrets GITHUB_TOKEN)

## SESSION UPDATE (verified live)
- [x] 5 frontend API routes (ads, subscribe, announcement, faqs, track) — all 200, persist OK
- [x] AdBanner.tsx (home banner + share buttons FB/X/LinkedIn/WA/Telegram/IG) — verified
- [x] AnnouncementBar.tsx — verified (top bar on /faq + home)
- [x] /faq page + screens/faq.tsx — verified, futuristic, search+tabs+accordion
- [x] Footer: "See all FAQs" link + newsletter signup (POST /api/subscribe) — wired
- [x] Mounted AdBanner on Home, AnnouncementBar in layout
- [x] tsc --noEmit clean
- [x] Admin user created (hello@greyinfotech.com.ng), seeded 1 ad + 1 announcement + 6 FAQs
- [x] Admin /ads + /analytics verified rendering with live data (impressions tracking works)
- [ ] AWAITING USER: inline-FAQ migration approach (seed copy? scope?)
- [ ] npm run build (kill dev first)
- [ ] commit + push as grahamsobiribopaul

## INLINE FAQ MIGRATION — DONE [verified]
- [x] Extracted 321+10 Q&A from 51 files (patterns A=prop, B=jsx, C=array, hr-tech=question/answer array)
- [x] Seeded into DB (dedup) — 329 FAQs total across General/Pricing/Support/Startups/Industries/Services
- [x] Removed faqs={[...]} prop from 15 service-template pages (ServicePageTemplate hides empty)
- [x] Removed inline JSX FAQ <div> blocks + hooks from 35 pattern-B files + hr-tech
- [x] Cleaned dead onIndex/toggleFAQ hooks + unused AiOutline imports
- [x] tsc --noEmit clean; 0 dangling FAQ refs site-wide
- [x] Verified: homepage 0 FAQ, service page 0 FAQ, /api/faqs=329, /faq renders all categories incl. migrated Services
- scripts: extract-faqs.mjs, seed-faqs.mjs, remove-faqs-propA.mjs, remove-faqs-jsxB.mjs, cleanup-faq-hooks.mjs
- backup: /tmp/screens-backup-1781484930
## NEXT: npm run build (kill dev) -> commit + push grahamsobiribopaul
