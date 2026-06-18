# Next Immediate Action

## Phase 6.5 (Voice AI) - Ready to Start

**Current Status:**
- ✅ Phase 6.2-6.4 Complete (i18n, Analytics, Payments)
- ✅ Build passing (0 TS errors)
- ✅ All infrastructure in place (DB, APIs, tests)
- ✅ Commit: e987eae8

**Next: Phase 6.5 (Voice AI) - 12-16 hours of work**

## What's Already Done

Voice AI starter code is already in the repo:
```
lib/voice/transcribe.ts      (220 lines) - Deepgram API integration
lib/voice/chatbot.ts         (310 lines) - OpenAI GPT-4 integration
lib/voice/voice-commands.ts  (270 lines) - Command parsing
```

## What's Needed

### 1. Voice API Routes (2-3 hours)
- `pages/api/voice/transcribe.ts` — Deepgram speech-to-text
- `pages/api/voice/chat.ts` — OpenAI conversation
- `pages/api/voice/commands.ts` — Voice command execution
- `pages/api/voice/tts.ts` — Text-to-speech (Deepgram)

### 2. React Components (3-4 hours)
- `components/Voice/VoiceRecorder.tsx` — Audio input
- `components/Voice/VoiceWaveform.tsx` — Real-time visualization
- `components/Voice/ChatInterface.tsx` — Voice chat UI
- `hooks/useVoiceChat.ts` — Voice state management

### 3. Database Tables (1 hour)
- `voice_conversations` — Chat history
- `voice_commands_log` — Command audit trail
- Indexes + migrations

### 4. Tests (2-3 hours)
- Voice API tests (Deepgram mocking)
- Chatbot tests (OpenAI mocking)
- Command parser tests
- UI component tests

### 5. Admin Dashboard (3-4 hours)
- Voice usage analytics
- Command success rate tracking
- Conversation history viewer
- Model performance metrics

## Environment Variables

```bash
# Deepgram API
DEEPGRAM_API_KEY=sk_...

# OpenAI API
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo

# Text-to-Speech (optional)
ELEVEN_LABS_API_KEY=...
```

## Start Command

```bash
cd /home/user/grey

# Create voice routes
# pages/api/voice/transcribe.ts
# pages/api/voice/chat.ts
# pages/api/voice/commands.ts

# Create components
# components/Voice/VoiceRecorder.tsx
# components/Voice/ChatInterface.tsx

# Create tests
# lib/__tests__/voice.test.ts

# Build & test
npm run build
npm test

# Commit
git add -A
git commit -m "feat: Phase 6.5 - Voice AI (Deepgram + OpenAI)"
git push -u origin main
```

## Timeline

- **Today (June 18):** Voice API routes + components (5-6h)
- **Tomorrow (June 19):** DB tables + tests + dashboard (6-7h)
- **Then:** Phase 6.6-6.11 (AI Analyzer, Demos, Playground, etc.)

---

**Ready to start?** Run the commands above and implement Voice AI routes.
