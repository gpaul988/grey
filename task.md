# User requests (this turn)

## 1. Admin "add" broken everywhere (FAQ/ads/announcement/partner/SEO/image upload)
- ROOT CAUSE FOUND: AdminAPI helper reads <meta name="csrf-token"> but no view rendered it.
  Empty token -> CSRF middleware rejects ALL POST/PATCH/DELETE.
- FIX: added meta tag to Admin/views/partials/title-meta.ejs (renders res.locals.csrfToken). [DONE]
- VERIFY: token now 193 chars in DOM. Need to test actual create on each module.

## 2. Footer
- Reduce subscriber/newsletter block, fit below MAIN office address. [DONE]
- Remove BRANCH office address entirely. [DONE]

## DONE: CSRF meta fix -> all admin create/edit/upload work (faq/ads/announcement/seo/upload verified ok).

## 5. Announcement [DONE] - id1 gradient, exact copy, Try it -> /quote-request. Renders live.
## 6. Favicon [DONE] - Grey G logo -> favicon.ico/svg/32/apple/pwa icons + admin favicons. layout updated.
## 7. Ad/advert [DONE] - ad id3 home_banner gradient, "Get My Free Quote" -> /quote-request, renders clean.
## 8. AI chat KB [DONE] - lib/aiKnowledgeLive.ts: 329 DB FAQs + 66 page docs merged into retriever (5min cache). route uses retrieve(q,6,live)+localAnswer(...,live). tsc clean, tested live.
## 9. ERROR SWEEP [DONE] - tsc clean; build clean (114 static pages, 0 errors); 18 routes 200; APIs ok; 0 console errors (only LCP perf hint).
## 10. PUSH as gpaul988 [TODO]

## 3. Resolve ALL frontend + backend errors, no page/file skipped
- tsc --noEmit clean check [TODO]
- next build clean [TODO]
- grep for runtime errors / console errors on key pages [TODO]

## 4. FAQ public page too long
- Paginate: show 1-15 per page. [DONE] 22 pages, "Showing 1-15 of 329", Prev/Next verified.

## Deploy: cPanel Node.js App (Node 20), npm start. No deploy config needed.
## Push as gpaul988 at end.
