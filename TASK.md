# TASK: Fix ALL APIs & Features in grey.git

**Date:** June 18, 2026  
**Status:** IN PROGRESS - Testing Phase

## TESTING RESULTS (Just Completed)

| API/Feature | Status | Issue | Priority |
|-------------|--------|-------|----------|
| Admin Login | ✓ | None | - |
| Dashboard Analytics | ✓ | None | - |
| FAQs API | ⚠️ | No data in DB (empty) | P1 |
| Audit API | ✓ | None | - |
| WebSocket | ✓ | None | - |
| Admin FAQs Page | ✗ | Frontend works, needs backend APIs | P1 |
| GraphQL API | ✗ | Endpoint returning HTML/404 | P2 |
| Full-Text Search | ✓ | Works, no results (empty DB) | - |
| Admin Auth Verify | ✓ | None | - |

## WHAT NEEDS FIXING

### PRIORITY 1 (USER-FACING CRITICAL)

**1.1 Admin FAQs CRUD Backend APIs** [BLOCKING]
- Status: NOT IMPLEMENTED
- Files to create:
  - `/pages/api/admin/faqs/list.ts` - GET list with filters
  - `/pages/api/admin/faqs/create.ts` - POST new FAQ
  - `/pages/api/admin/faqs/[id]/update.ts` - PUT edit FAQ
  - `/pages/api/admin/faqs/[id]/delete.ts` - DELETE FAQ
- Tests needed: 8 test cases
- Current: Frontend page exists (`/pages/admin/faqs.tsx`) but backend APIs don't exist
- Fix time: 2-3h

**1.2 FAQs Database Seeding** [BLOCKING]
- Status: Table exists but no data
- Need to:
  - Check if `faqs` table exists in SQLite (`Admin/data/grey.db`)
  - Seed 10-15 sample FAQs from `/Admin/models/Faqs.ts`
  - Verify `/api/faqs` returns data
- Fix time: 1h

**1.3 GraphQL API Endpoint** [MEDIUM]
- Status: Endpoint exists but returning HTML 404
- File: `/pages/api/graphql.ts`
- Issue: Routing mismatch or missing endpoint handler
- Fix time: 1h

### PRIORITY 2 (INFRASTRUCTURE)

**2.1 Admin Users Database Migration** [NICE-TO-HAVE]
- Current: Hardcoded env vars (SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD)
- Target: PostgreSQL `admin_users` table with bcrypt
- Status: Not started
- Fix time: 3-4h (optional, current auth works)

### PRIORITY 3 (TESTING & VALIDATION)

**3.1 End-to-End Test Suite**
- Status: Not started
- Need: Tests for audit sharing, admin CRUD, search, etc.
- Fix time: 4-5h

---

## IMPLEMENTATION PLAN

### IMMEDIATE (This Session)

- [ ] Fix GraphQL endpoint (1h)
- [ ] Create admin FAQs CRUD APIs (2-3h)
- [ ] Seed FAQs database (1h)
- [ ] Test all endpoints end-to-end
- [ ] Verify all features working
- [ ] Commit & push

### TOTAL TIME: ~5-6h

---

## FILES REFERENCE

**Admin FAQs:**
- Frontend: `/pages/admin/faqs.tsx` (226 lines, UI complete)
- Database: `/Admin/models/Faqs.ts`
- Public API: `/pages/api/faqs.ts` (GET only, works)
- Admin APIs: NEED TO CREATE

**GraphQL:**
- Entry: `/pages/api/graphql.ts` (exists, might be broken)
- Types: `/lib/graphql/schema.ts`

**FAQs DB:**
- Model: `/Admin/models/Faqs.ts`
- Data file: `/Admin/data/grey.db` (SQLite)

---

## DECISIONS

1. **Database:** Keep hybrid (SQLite for Admin, PostgreSQL for main app)
2. **FAQs:** Serve from SQLite Admin database (existing)
3. **Auth:** Keep hardcoded for now (working), migrate later if needed

---

## NEXT STEPS

1. Check GraphQL endpoint (is it accessible?)
2. Create missing admin FAQs CRUD APIs
3. Seed sample FAQs data
4. Run full API test suite
5. Commit everything
