# Grey — Futuristic Systems (additive, perf-first)

## DECISIONS (engineer's call)
- 3D lib: **react-three-fiber + three** (already common w/ Next), but **lazy-loaded via next/dynamic, ssr:false**, only mounted on capable devices (skip on low mem / reduced-motion / save-data / mobile = lighter fallback). Falls back to existing CSS aurora when WebGL unsupported.
- Voice: **Web Speech API (SpeechRecognition)** — opt-in mic button, on-device, no audio leaves browser. Commands: navigate ("go to contact/services/portfolio/home"), scroll, theme toggle, open chat. Privacy-safe, no backend.
- Personalization: **client-only** (localStorage + time-of-day + visited-pages intent). No PII, no backend. Adjusts accent theme + a personalized greeting/CTA. Respects a reset/disable.
- Gestures: **pointer/tilt parallax** (mousemove + deviceorientation) — NO camera. Privacy-safe "respond to user movement".
- Micro-interactions/haptics: physics-y button squish, inertia tilt, navigator.vibrate() on supported devices, magnetic hover. Reusable component + utility classes.
- Dynamic dark mode/lighting: extend existing ThemeProvider with **AmbientLightSensor** (when available) + time-of-day auto, smooth transition. Keep manual toggle authoritative.

## CONSTRAINTS
- Additive only. No deletions.
- Lazy-load 3D; respect prefers-reduced-motion + prefers-reduced-data.
- Great on mobile (lighter paths).
- Subtle/professional.
- EXCLUDE /store from heavy effects.

## BUILD ORDER
1. lib/futuristic/ env capability hook (useDeviceCapabilities) — gates everything.
2. WebGL hero component (lazy) + mount on homepage hero (and reusable export).
3. Parallax/tilt provider (pointer + deviceorientation) → CSS vars.
4. Micro-interaction primitives: MagneticButton, useHaptics, .grey-squish utils.
5. Voice command palette (mic FAB, opt-in).
6. Predictive personalization provider (client-only) + greeting/accent.
7. Ambient light + time auto theme in ThemeProvider.
8. Wire global providers in app/layout.tsx (store-excluded where heavy).
9. tsc, restart, smoke test, commit, push.

## VERIFY
- [x] tsc clean
- [x] all routes 200, single header/footer, /store unaffected
- [x] reduced-motion: heavy FX disabled (CSS @media guards + caps gating)
- [x] no CSRF regression (/login 200, store chrome intact)

## STATUS: DONE — all 5 systems shipped, smoke-tested, committed + pushed.
- WebGLHero wired into screens/Home.tsx hero (lazy, capability-gated, CSS fallback).
- Personalized greeting badge in hero (client-only, daypart + returning-visitor).
- Parallax classes on hero heading/subhead.
- VoiceCommander global FAB. ParallaxProvider + PersonalizationProvider global.
- ThemeProvider extended: AmbientLightSensor + time-of-day auto + smooth transition.
