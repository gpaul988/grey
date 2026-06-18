# PHASE 7: Full Site Hero Video + Global i18n + Geolocation

## EXECUTION PLAN

### TASK 1: Create Enhanced PersonalizedGreeting Component
- Geolocation detection (IP → Browser API → localStorage)
- Username detection (localStorage → anonymous)
- Language detection from geolocation
- Manual language override UI (dropdown)
- Location/language persistence in localStorage

### TASK 2: Implement Full i18n System
Languages (14 total):
1. English (en)
2. Spanish (es)
3. French (fr)
4. German (de)
5. Portuguese (pt)
6. Chinese Simplified (zh)
7. Arabic (ar)
8. Swahili (sw)
9. Yoruba (yo)
10. Igbo (ig)
11. Japanese (ja)
12. Russian (ru)
13. Hindi (hi)
14. Italian (it)

Translation files: `/locales/{lang}/common.json` (greetings, UI strings, etc.)

### TASK 3: Generate Hero Videos & Refactor Pages
Eligible pages (45 total):
1. Home.tsx ✅ (already done)
2. blog.tsx, blog/[slug].tsx
3. case-studies.tsx, case-studies/[slug].tsx
4. company.tsx
5. careers.tsx
6. audit.tsx
7. faq.tsx
8. partners.tsx
9. portfolio.tsx
10. quote-request.tsx
11. support.tsx
12. Startups.tsx
13. Our-Approach.tsx
14. Links.tsx
15. Form.tsx
16. open-ticket.tsx
17. feeling.tsx

All 33 service pages:
- IoT, Javascript, Laravel, MVP, Mobile, Net, Nextjs, Nodejs, PHP, Python, React Native, React, Ruby, Social, Software, Typescript, Vue, Web App, Web Design, Web Dev, AI, Android, Angular, ASO, Backend, Blockchain, Branding, CMS, CRM, Discovery, ERP, Flutter, Frontend, Hybrid, iOS, SEO, UI/UX, Unity

EXCLUDED:
- All /store/* pages
- /contact.tsx
- All /industries/* pages
- All /technologies/* pages (if exist)

### VIDEO GENERATION STRATEGY
1. Identify hero images in each page
2. Convert JPG/PNG → MP4 using FFmpeg:
   - Desktop: 1920×1080 @ 30fps, 5-8MB, 10-15sec loop
   - Mobile: 640×480 @ 30fps, 2-3MB, 10-15sec loop
3. Use existing images or generate abstract motion:
   - Zoom + pan effects
   - Subtle color gradients
   - Particle animations (CSS overlay)

### BUILD STEPS (Sequential)
1. Create PersonalizedGreeting v2 with geolocation + i18n
2. Create i18n config & translation files
3. Generate hero videos for 45+ pages
4. Refactor each eligible page:
   - Add ResponsiveVideoHero
   - Add PersonalizedGreeting
   - Test build
5. Deploy & test on cPanel

### GIT COMMITS
1. feat: Add geolocation detection and i18n system
2. feat: Generate hero videos for 45 pages
3. feat: Refactor all pages to use video heroes and i18n
4. chore: Add translations for 14 languages

---

**Estimated Time:** 6-8 hours
**Files to Create:** 15-20 (i18n files, PersonalizedGreeting, etc.)
**Files to Modify:** 45+ page files
**Videos to Generate:** 45 pages × 2 (desktop + mobile) = 90 MP4s (~500MB total)
