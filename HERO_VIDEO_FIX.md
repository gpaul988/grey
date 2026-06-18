# Video Hero Fix - Task Progress

## Issues Found
1. **Home.tsx**: Uses raw `<video>` tag instead of ResponsiveVideoHero component
   - Missing video assets at `/assets/hero/` (directory doesn't exist)
   - Video path: `/assets/hero/hero.mp4` (doesn't exist)
   - Should use ResponsiveVideoHero component

2. **Service Pages**: All use ResponsiveVideoHero correctly
   - Assets exist at `/assets/{service}/hero.mp4` and `/assets/{service}/hero-mobile.mp4`
   - Example: `/assets/laravel/hero.mp4` ✅

3. **WebGL Hero**: Component exists but may have loading issues
   - WebGLHero in Home.tsx uses dynamic import
   - Falls back to CssAuroraFallback on unsupported devices

## Solution Plan
1. Create missing `/public/assets/hero/` directory
2. Copy a suitable video to `/public/assets/hero/hero.mp4` and mobile variant
3. Refactor Home.tsx to use ResponsiveVideoHero component
4. Add proper error handling and fallbacks
5. Test video loading on all pages

## Files to Modify
- `/home/user/grey/screens/Home.tsx` - Replace raw video with ResponsiveVideoHero
- `/home/user/grey/public/assets/hero/` - Create and add hero videos

## Status
[ ] Create hero assets directory
[ ] Add video files
[ ] Refactor Home.tsx
[ ] Test video loading
[ ] Commit & push
