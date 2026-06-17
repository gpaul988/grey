# Phase 2: Hero Section Refactoring to ResponsiveVideoHero

## Status: IN PROGRESS

### 1. Video Conversion
- ✅ Created batch conversion script: `/scripts/batch-convert-heroes.sh`
- ⏳ **RUNNING IN BACKGROUND** - Converting 35 JPGs to MP4 + WebM
- ETA: ~10-15 minutes
- Log: `conversion.log`

### 2. Service Screen Refactoring
**Target:** Update all ~35 service screens to use `ResponsiveVideoHero`

**Current hero pattern (Reactjs-Development.tsx, lines 105-135):**
```tsx
<div className="...">
  <h1>Service Title</h1>
  <p>Description</p>
  <div className="...">
    <Image src="/assets/{service}/hero.jpg" ... />
  </div>
</div>
```

**New pattern with ResponsiveVideoHero:**
```tsx
<div className="...">
  <h1>Service Title</h1>
  <p>Description</p>
  <ResponsiveVideoHero
    videoDesktop="/assets/{service}/hero.mp4"
    videoMobile="/assets/{service}/hero-mobile.mp4"
    posterImage="/assets/{service}/hero.jpg"
  />
</div>
```

**Changes:**
1. Import ResponsiveVideoHero
2. Replace `<Image>` wrapper with `<ResponsiveVideoHero>` component
3. Remove `<Image>` import if unused elsewhere

### 3. Services to Update
All files in `screens/services/` that use static hero images:

- ✓ Complete list: 35+ services
- Mapping: `/assets/{slug}/hero.jpg` → `/assets/{slug}/hero.mp4` + mobile variant

### 4. Testing Plan
1. Pick 3 services: Reactjs, Laravel, Python (different sectors)
2. Test responsive video playback (desktop/mobile/tablet)
3. Verify iOS Safari compatibility (muted autoplay)
4. Lazy-load verification
5. Full build test

### 5. Git Commit
```
feat: convert all hero sections to ResponsiveVideoHero with mobile optimization
- Added batch video conversion script
- Updated 35 service screens with responsive video
- Mobile: 640×480 optimized, Desktop: 1920×1080
- Includes WebM fallback and poster image lazy-load
- Zero layout shift, Intersection Observer optimization
```

---

## Next Steps (After conversion finishes)
1. Check `conversion.log` for success count
2. Run refactoring script
3. Update ServicePageTemplate.tsx (if used)
4. Test 3 critical services
5. Push to GitHub
