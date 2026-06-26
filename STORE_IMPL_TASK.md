# Grey InfoTech Store DB Implementation — Task Tracker

**Date:** June 26, 2026  
**Current Phase:** Database Setup (Phase 1)  
**Status:** Paused — Database mismatch detected

---

## PROBLEM DISCOVERED
- **Handover said:** PostgreSQL + Drizzle ORM with pgTable
- **Reality:** Project uses SQLite with `Admin/data/grey.db`
- **Existing schema:** `lib/db/schema.ts` uses `pgTable` (PostgreSQL)
- **Impact:** Cannot run `drizzle-kit push:pg` on SQLite; need SQLite-compatible schema

---

## REQUIRED FIXES

### 1. Convert store-schema.ts to SQLite ✅ TODO
- Replace `pgTable` with `sqliteTable`
- Remove PostgreSQL-specific types (jsonb → text, serial → integer, decimal → real)
- Update `lib/db/store-schema.ts`

### 2. Update store-helpers.ts ✅ TODO
- Verify bcrypt usage (already installed)
- Import from `lib/db/store-schema` instead of PostgreSQL schema
- Adjust query syntax if needed (SQLite quirks)

### 3. Apply migration to SQLite ✅ TODO
- Run: `npx drizzle-kit push:sqlite` (or equivalent command)
- Verify tables created in `Admin/data/grey.db`

### 4. Update 7 Store API endpoints ✅ TODO
- `/app/api/store/auth/login/route.ts`
- `/app/api/store/auth/register/route.ts`
- `/app/api/store/auth/logout/route.ts`
- `/app/api/store/auth/forgot-password/route.ts`
- `/app/api/store/auth/reset-password/route.ts`
- `/app/api/store/account/profile/route.ts`
- `/app/api/store/payment/verify/route.ts`

Replace mocks with real DB calls using store-helpers functions.

### 5. Test endpoints ✅ TODO
- Create test customer → Login → Verify payment flow
- Use curl or Postman to verify all 7 endpoints return real data

### 6. Commit & Push ✅ TODO
- `git add -A && git commit -m "feat: replace store API mocks with real SQLite database"`
- `git push origin main` (as gpaul988)

---

## BLOCKERS
- None — SQLite is fully supported by Drizzle ORM, just need schema conversion

---

## NEXT IMMEDIATE STEP
1. Convert `lib/db/store-schema.ts` to SQLite syntax
2. Verify bcrypt import in store-helpers.ts
3. Apply migration

---

## ESTIMATES
- Schema conversion: 15 min
- API endpoint updates: 45 min
- Testing: 30 min
- **Total:** ~90 min to completion
