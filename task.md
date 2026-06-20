# Grey i18n & Ads/Announcement Fix — Task Breakdown

## Problem 1: Language Switcher Only Changes Navbar + Greeting
- Hero section: hardcoded English
- Services section: hardcoded English
- Testimonials: hardcoded English
- Footer: hardcoded English
- CTA sections: hardcoded English

## Problem 2: AnnouncementBar / AdBanner Not Displaying
- API returns 200 + data ✓
- Logs say "No announcement or component unmounted"
- Likely cause: sessionStorage.getItem('grey-ann-dismissed') matches latest announcement ID
- Fix: Clear sessionStorage or improve logic

## Solution

### A. Full Page Translations (Priority 1)
1. Update `lib/translations-complete.ts` with ALL page content
   - hero.title, hero.subtitle, hero.description
   - services (all 7 services)
   - testimonials
   - footer sections
   - CTA blocks
   
2. Update `screens/Home.tsx`
   - Import useI18n
   - Replace ALL hardcoded English strings with t() calls
   - Keep i18n context intact on language change

### B. Fix Announcement/Ad Display (Priority 2)
1. AnnouncementBar: debug sessionStorage or clear on first load
2. AdBanner: similar fix
3. Test on browser with DevTools

### C. Commit & Push
- Single commit for both fixes
