# Grey.Git Full Build Sprint - Complete Roadmap

**Target:** Transform grey.git from 7.5/10 → 9.5/10 (world-class, second to none)  
**Constraint:** NO breaking changes, only add/improve existing code  
**Status:** 11 phases planned, 3 complete + deployed ✅

---

## Completed Phases ✅

### Phase 1: Foundation & Fixes ✅
- ✅ GitHub audit endpoint (fixed token issue)
- ✅ Comprehensive security verification
- ✅ Build optimization (0 TS errors, clean bundle)
- ✅ Sentry error tracking + Winston logging
- ✅ TOTP 2FA endpoints
- ✅ Playwright E2E foundation

### Phase 2: Admin Dashboard Charts ✅
- ✅ 6 Recharts visualizations (user growth, revenue, services, conversion funnel, audit rate, search)
- ✅ Dark theme styling
- ✅ Responsive grid layout (mobile → desktop)
- ✅ CSV export functionality
- ✅ Real-time WebSocket connection
- ✅ JWT auth integration

### Phase 3: E2E Test Suite ✅
- ✅ Playwright setup (Chrome/Firefox/Safari)
- ✅ 14 comprehensive E2E tests
- ✅ Dashboard tests (login, charts, export, navigation)
- ✅ Authentication tests (token verification, redirects)
- ✅ Performance tests (load time, responsiveness)
- ✅ HTML report generation

---

## In Progress / Planned Phases ⏳

### Phase 4: Admin User Management (PostgreSQL) ⏳
**Est. 3-4h**

Tasks:
- [ ] Create `admin_users` table migration
  - Columns: id, email, password_hash, role, created_at, updated_at
  - Indexes: email (unique), role
- [ ] Update `/api/admin/auth/login` to use DB
- [ ] Implement password hashing (bcrypt)
- [ ] Create endpoints:
  - `POST /api/admin/users/create` (superadmin only)
  - `GET /api/admin/users/list` (with pagination)
  - `PUT /api/admin/users/:id` (update role/permissions)
  - `DELETE /api/admin/users/:id`
- [ ] Add role-based access control (RBAC)
  - Roles: superadmin, admin, editor, viewer
- [ ] E2E tests for user management CRUD
- [ ] Migration from hardcoded env vars to DB

**Files to Create/Modify:**
- `/lib/db/migrations/admin_users.sql`
- `/lib/db/schema/admin_users.ts` (Drizzle schema)
- `/api/admin/users/*` (CRUD endpoints)
- `/pages/admin/users.tsx` (UI for user management)

### Phase 5: Mobile App (Expo/React Native) ⏳
**Est. 8-12h**

Tasks:
- [ ] Set up Expo project
- [ ] Create navigation (bottom tabs)
- [ ] Implement screens:
  - FAQs list + search
  - Single FAQ detail
  - Admin panel (if authenticated)
  - Settings
- [ ] Local storage for preferences (theme, language, favorites)
- [ ] Offline support (cache FAQs)
- [ ] Push notifications
- [ ] App icon + splash screen
- [ ] Build APK + IPA

**Tech Stack:**
- React Native + Expo
- TanStack Query (cache)
- Zustand (state)
- React Native Paper (UI)
- AsyncStorage (local)

### Phase 6: AI Chatbot (GPT-4 or Ollama) ⏳
**Est. 6-10h**

Tasks:
- [ ] Set up OpenAI API (or use free Ollama locally)
- [ ] Create conversational interface
- [ ] Fine-tune on FAQ data
- [ ] Add context-aware responses
- [ ] Implement:
  - Chat UI component
  - Message streaming
  - Rate limiting
  - Conversation history
- [ ] Integration with Slack/Discord webhooks
- [ ] E2E tests for chat flows

**Tech Stack:**
- OpenAI GPT-4 API (or Ollama)
- Langchain (optional)
- React Chat UI library

### Phase 7: Advanced Analytics (Mixpanel) ⏳
**Est. 4-6h**

Tasks:
- [ ] Integrate Mixpanel SDK
- [ ] Track key events:
  - Page views
  - FAQs viewed
  - Audits run
  - Conversions
  - Search queries
- [ ] Create cohort analysis
- [ ] Build funnel analytics
- [ ] Admin dashboard integration (charts)

### Phase 8: Webhooks & Event Streaming ⏳
**Est. 5-7h**

Tasks:
- [ ] Webhook subscription system
- [ ] Event queue (Bull/BullMQ)
- [ ] Delivery with retries & HMAC signing
- [ ] Slack/Discord integrations
- [ ] Webhook management UI

### Phase 9: Full-Text Search (PostgreSQL FTS) ⏳
**Est. 4-6h**

Tasks:
- [ ] PostgreSQL full-text search setup
- [ ] Fuzzy search support
- [ ] Autocomplete
- [ ] Search aggregation (FAQs, services, blog)

### Phase 10: Advanced Features (Remaining) ⏳
**Est. 10-15h total**

- [ ] Live Demo Environments (spin up temp instances)
- [ ] Interactive API Playground (execute GraphQL/REST)
- [ ] Performance Benchmarking Tool
- [ ] Tech Stack Scanner (detect competitor stacks)
- [ ] Review System (ratings/comments on services)
- [ ] Headless CMS (Contentful/Strapi integration)

### Phase 11: Deployment & Scaling ⏳
**Est. 5-8h**

Tasks:
- [ ] GitHub Actions CI/CD
- [ ] Docker containerization
- [ ] cPanel Node.js deployment
- [ ] Environment setup (prod/staging)
- [ ] Monitoring (Sentry, LogRocket)
- [ ] Performance optimization
- [ ] CDN setup (Cloudflare)

---

## Quick Start for Next Phase

### To Start Phase 4 (Admin User Management)

```bash
# 1. Create migration
mkdir -p lib/db/migrations
touch lib/db/migrations/admin_users.sql

# 2. Update Drizzle schema
touch lib/db/schema/admin_users.ts

# 3. Run migration
npm run migrate

# 4. Create API routes
mkdir -p pages/api/admin/users
touch pages/api/admin/users/index.ts
touch pages/api/admin/users/[id].ts

# 5. Create UI
touch pages/admin/users.tsx

# 6. Add E2E tests
touch e2e/admin-users.spec.ts

# 7. Build & test
npm run dev
npm run test:e2e
```

---

## Tech Stack Summary

| Category | Tech | Version |
|----------|------|---------|
| **Framework** | Next.js + React | 16.2.9 |
| **Database** | PostgreSQL + Drizzle | 15 + ORM |
| **Auth** | JWT + TOTP | Native |
| **Testing** | Vitest + Playwright | Latest |
| **Charts** | Recharts | 3.8.1 |
| **UI** | Tailwind CSS | 4.0 |
| **APIs** | REST + GraphQL | Apollo |
| **Cache** | Redis (planned) | 7.0+ |
| **Monitoring** | Sentry + Winston | Latest |
| **Mobile** | Expo + React Native | Latest |
| **AI** | OpenAI GPT-4 / Ollama | Latest |

---

## Success Metrics

- ✅ 0 TypeScript errors
- ✅ 100+ unit tests passing
- ✅ 14+ E2E tests passing
- ✅ <3s page load time
- ✅ 95+ Lighthouse score
- ✅ <5% error rate
- ✅ Mobile responsive (375px+)
- ✅ Accessible (WCAG 2.1 AA)

---

## Blockers / Dependencies

- ❌ Full build memory: 2GB+ required (use dev server for iteration)
- ⏳ AI Chatbot: Requires OpenAI API key or Ollama setup
- ⏳ Mobile: Requires Expo account for APK/IPA builds
- ⏳ Analytics: Mixpanel free tier sufficient for MVP

---

## Timeline Estimate

| Phase | Hours | Status |
|-------|-------|--------|
| 1 | 8 | ✅ Done |
| 2 | 4 | ✅ Done |
| 3 | 4 | ✅ Done |
| 4 | 3-4 | ⏳ Next |
| 5 | 8-12 | ⏳ Parallel |
| 6 | 6-10 | ⏳ Parallel |
| 7 | 4-6 | ⏳ |
| 8 | 5-7 | ⏳ |
| 9 | 4-6 | ⏳ |
| 10 | 10-15 | ⏳ |
| 11 | 5-8 | ⏳ |
| **Total** | **60-97h** | **16 done** |

**Timeline:** 3-4 weeks full-time (2-3 weeks part-time)

---

## Questions / Clarifications

1. **Priority:** Should Phase 4 (admin users) or Phase 5 (mobile) be next?
2. **AI:** OpenAI API (paid) or Ollama (free, self-hosted)?
3. **Analytics:** Mixpanel (paid) or self-hosted (PostHog/Plausible)?
4. **Mobile:** Expo Go (dev) or full build (APK/IPA)?
5. **Deployment:** cPanel Node.js or Vercel/Railway?

---

**Last Updated:** June 18, 2026  
**Next Review:** After Phase 4 completion
