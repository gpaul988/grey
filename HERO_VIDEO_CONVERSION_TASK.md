# Hero Section Video Conversion Task

**Status:** IN PROGRESS — Phase 3 Complete  
**Date:** 2026-08-30 13:23:18  
**Goal:** Convert all picture-based hero sections to responsive video

## LATEST UPDATES (Phase 3 — Component Integration)

✅ **Completed:**
- Updated `ServicePageTemplate.tsx` to use `ResponsiveVideoHero` component
- Added `heroVideoMobile` prop to `ServicePageTemplate` for mobile-optimized videos
- Updated 5 services using `ServicePageTemplate`:
  - IoT-Development
  - Python-Development  
  - Social-Networking
  - blockchain-development
  - flutter-development
- All files now support mobile/desktop dual video serving
- Build: ✅ 0 TS errors

**Next:** Generate actual optimized MP4 files OR use placeholder videos from `/assets/hero/` for now

---

## FINDINGS

### Current Hero Image Usage (JPGs that need converting)
Found 25+ service pages with static hero images (.jpg files):
- /assets/laravel/hero.jpg
- /assets/mvp/hero.jpg
- /assets/net/hero.jpg
- /assets/nextjs/hero.jpg
- /assets/nodejs/hero.jpg
- /assets/php/hero.jpg
- /assets/rnad/hero.jpg
- /assets/react/hero.jpg
- /assets/ror/hero.jpg
- /assets/soft/hero.jpg
- /assets/vuejs/hero.jpg
- /assets/wad/hero.jpg
- /assets/ads/hero.jpg
- /assets/android/hero.jpg
- /assets/angular/hero.jpg
- /assets/app-store/hero.jpg
- /assets/automation/hero.jpg
- /assets/back/hero.jpg
- /assets/biotech/hero.jpg
- /assets/brand/hero.jpg
- /assets/cms/hero.jpg
- /assets/comp/hero.jpg
- /assets/crm/hero.jpg
- /assets/disc/hero.jpg
- /assets/drupal/hero.jpg
- /assets/erp/hero.jpg
- /assets/front/hero.jpg
- /assets/health/hero.jpg
- /assets/hybrid/hero.jpg
- /assets/iot/hero.jpg
- /assets/js/hero.jpg
- /assets/music/hero.jpg
- /assets/oil/hero.jpg
- /assets/ondemand/hero.jpg
- /assets/real-estate/hero.jpg
- /assets/retail/hero.jpg
- /assets/saas/hero.jpg
- /assets/travel/hero.jpg

### Already Using Video
- /assets/hero/hero.mp4 (main default)
- /assets/angular/hero.webm
- /assets/ecom/hero.mp4
- /assets/fin/hero.mp4
- /assets/header/contact.mp4
- /assets/health/hero.webm
- /assets/java/hero.webm
- /assets/oil/hero.webm
- /assets/type/hero.webm
- /assets/wad/hero.webm (wait, also has .jpg)
- /assets/cross/Hero-M.mp4, Hero-P.mp4
- /assets/digital/Hero-M.mp4, Hero-P.mp4

### Implementation Plans

#### PHASE 1: Create Super-Responsive Video Hero Component
1. Build new `ResponsiveVideoHero.tsx` component with:
   - Responsive video for desktop/tablet/mobile
   - Fallback image support
   - Loading state + skeleton
   - Picture element + video element for optimal delivery
   - Intersection Observer for lazy-loading
   - Adaptive bitrate (mobile-optimized)

#### PHASE 2: Convert Image to Video (FFmpeg)
For each .jpg, create:
- HD version (1920x1080, MP4, H.264, optimized)
- Mobile version (640x480, MP4, optimized)
- WebM fallback (VP9 codec)
- Poster image (compressed JPG)

#### PHASE 3: Update Service Screens
1. Replace Image imports with ResponsiveVideoHero
2. Update each service page to use new component
3. Remove old static image references

#### PHASE 4: Update ServicePageTemplate
1. Integrate responsive video hero
2. Add responsive design improvements
3. Test on mobile/tablet/desktop

---

## STRATEGY

**Approach:** Build a single, reusable, super-responsive video hero component that:
1. Serves mobile-optimized MP4 on phones (640px width, low bitrate)
2. Serves HD MP4 on desktop (1920px, normal bitrate)
3. Falls back to static image if video doesn't load
4. Uses intersection observer for lazy-loading
5. Includes loading skeleton during fetch
6. Has proper aspect ratio to prevent layout shift

**Use existing images as posterPoster image** to maintain branding while video loads

---

## NEXT STEPS
- [x] Create ResponsiveVideoHero component
- [ ] Create image-to-video conversion script (or do manually for critical ones)
- [x] Update ServicePageTemplate for hero section (with mobile video support)
- [x] Update 5 services using ServicePageTemplate
- [ ] Update remaining 35 services (custom hero implementations)
- [ ] Test on mobile/tablet/desktop
- [ ] Generate optimized MP4 videos (desktop + mobile variants)
- [ ] Push to GitHub

---

## FILES TO UPDATE
- components/ResponsiveVideoHero.tsx (NEW)
- components/ServicePageTemplate.tsx (modify hero section)
- screens/services/*.tsx (25+ files)
