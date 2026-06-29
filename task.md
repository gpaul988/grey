# Grey — Futuristic Redesign (Part B)

## Design system (DONE, reuse everywhere)
- components/futuristic/fx/index.tsx — FxBackground, FxCard(glow), FxChip, FxSectionHeading, FxButton(solid|ghost), FxReveal, FxSection. All `day` aware.
- app/globals.css "FUTURISTIC DESIGN SYSTEM v2": .gx-grid, .gx-aurora, .gx-card, .gx-glow-border, .gx-gradient-text, .gx-chip, .gx-scan. data-day driven, reduced-motion guards.

## Home.tsx (DONE — awaiting user approval)
- Hero: UNTOUCHED (required).
- Intro: FxBackground grid + FxChip "YOUR DIGITAL PARTNER" + FxReveal + gx-gradient-text accent.
- ServicesSection: futuristic (chips, numbered, outline buttons).
- Digital Adventure: "Get in touch" -> FxButton solid gradient. VERIFIED.
- Trust Signals: kept rich framer-motion counters/cards (already strong).
- Proof badges: added gx-scan shimmer + overflow-hidden.
- tsc --noEmit clean. Dev server (tmux greyd:3000) 200. Screenshots verified.

## NEXT (after approval)
Roll FX system to ALL screens EXCEPT contact/audit/blog/faqs.
Screens in /home/user/grey/screens/ (services/*, industries/*, company, careers, portfolio, case-studies, partners...).
Then: next build exit 0, commit + push as gpaul988 via .git-push.env.

## Excluded pages: contact, audit, blog, faqs
## Constraints: keep teal brand, keep isDayTime day/night switch on all pages.
