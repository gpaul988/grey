# Task — round: admin CRUD diagnosis + AI chat brevity

## 1. "Can't add FAQs/announcements/ads" — DIAGNOSED, NOT A LOCAL BUG
- Admin CRUD works locally. Tested POST /admin/api/faqs -> {"ok":true}, DELETE -> {"ok":true}.
- Two /api namespaces by design: Next /api/faqs (GET, public read) vs Express /admin/api/faqs (CRUD, CSRF).
- AdminAPI helper correctly targets BASE='/admin/api'. CSRF meta tag renders on authed pages.
- Production "can't add" = stale deploy (missing CSRF meta fix). Already committed+pushed. Needs prod redeploy.

## 2. AI chat too verbose — FIXED
- Cause: local-fallback mode (no OPENAI_API_KEY) returned full FAQ body verbatim + padding.
- Fix in lib/aiKnowledge.ts:
  - localAnswer now uses brief(answerText(text), 1, 200) -> 1 sentence, 200 char cap.
  - answerText() strips leading FAQ question line so it answers directly.
  - Tightened SYSTEM_PROMPT (both aiKnowledge.ts + app/api/ai/chat/route.ts): 1-2 sentences, ~40 words, no filler.
- Verified: replies now 1 crisp sentence each. tsc clean.
- NOTE: retrieval relevance is lexical (sometimes picks a near-miss FAQ). Resolves fully with OPENAI_API_KEY (LLM synthesis). Out of scope for brevity ask.

## Next
- tsc + commit + push as gpaul988.
