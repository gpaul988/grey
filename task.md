# Phase 4 & 5 Parallel Build - Task Tracker

## Phase 4: Admin User Database (PostgreSQL + RBAC)
**Duration:** 3-4 hours | **Status:** 🔄 In Progress

### Tasks
- [ ] 1. Create `admin_users` table schema (Drizzle)
  - id (uuid, primary)
  - email (string, unique)
  - password_hash (string, bcryptjs)
  - role (enum: admin, auditor, viewer)
  - created_at, updated_at
  
- [ ] 2. Create Drizzle migration
  - `packages/web/src/db/schema/admin_users.ts` (if needed, else add to existing schema)
  - Run `bun db:push`

- [ ] 3. API Endpoints
  - POST `/api/admin/auth/login-db` - authenticate with email/password (replace env var auth)
  - GET `/api/admin/auth/me` - get current admin user
  - POST `/api/admin/users/create` - create new admin user (admin only)
  - GET `/api/admin/users` - list all admin users (admin/auditor)
  - PUT `/api/admin/users/[id]` - update user/role (admin only)
  - DELETE `/api/admin/users/[id]` - delete user (admin only)
  - POST `/api/admin/auth/change-password` - change own password

- [ ] 4. Password Hashing
  - Install `bcryptjs`
  - Hash on create, verify on login
  - Add pepper/salt config to env

- [ ] 5. Session Management
  - Update localStorage → JWT (use existing JWT but validate against DB)
  - Add token refresh logic if needed
  - Validate role on protected endpoints

- [ ] 6. Update Login Page
  - Replace hardcoded password check with DB query
  - Handle email input field
  - Show role-based dashboard (admin vs auditor vs viewer)

- [ ] 7. Tests
  - 8 unit tests for auth/user endpoints
  - RBAC tests (admin can create users, auditor cannot, etc.)
  - Password hashing verification

- [ ] 8. Commit
  - `feat: Phase 4 Complete - Admin User DB with PostgreSQL + RBAC`

---

## Phase 5: Mobile App (Expo)
**Duration:** 4-6 hours | **Status:** 🔄 In Progress

### Tasks
- [ ] 1. Create Expo project in `/mobile`
  - `cd /home/user && npx create-expo-app grey-mobile`
  - Initialize Git, add to grey.git monorepo (or separate repo)
  
- [ ] 2. Install Dependencies
  - `expo-router` (navigation)
  - `@react-native-async-storage/async-storage` (offline cache)
  - `react-native-sqlite-storage` (local DB)
  - `axios` or use native Fetch (API client)
  - `react-native-paper` (UI components)

- [ ] 3. Navigation Structure (expo-router)
  - `(auth)` group
    - `login.tsx`
    - `register.tsx`
  - `(app)` group (protected)
    - `(tabs)` layout
      - `index.tsx` (dashboard)
      - `faqs.tsx`
      - `audit.tsx`
      - `settings.tsx`

- [ ] 4. Screens (5 screens)
  - **LoginScreen:** Email + password input, call `/api/admin/auth/login-db`
  - **DashboardScreen:** Show metric cards (users, revenue, audits) from `/api/analytics/dashboard`
  - **FAQsScreen:** List FAQs from `/api/faqs`, search, click to expand
  - **AuditScreen:** Trigger audit with `/api/audit/run`, show results
  - **SettingsScreen:** Logout, theme toggle, offline status

- [ ] 5. API Integration
  - Create `api/client.ts` - axios instance with base URL to grey.git backend
  - Type definitions from grey.git API responses
  - Handle 401 (token expired) → redirect to login

- [ ] 6. Offline Mode
  - AsyncStorage: cache FAQs, audit results, metrics
  - Show "Offline" badge in header
  - Sync when reconnected

- [ ] 7. UI/Styling
  - Dark theme (match web)
  - React Native Paper for components
  - Tailwind equivalent (NativeWind)
  - Responsive layouts (iOS + Android)

- [ ] 8. Tests
  - 6 E2E tests (Detox or native test runner)
  - Navigation flows
  - API error handling (401, 500, timeout)
  - Offline mode behavior

- [ ] 9. Build & Test
  - `bun run dev:mobile` (if integrated into monorepo)
  - Or standalone: `expo start`
  - Test on iOS simulator / Android emulator

- [ ] 10. Commit
  - `feat: Phase 5 Complete - Mobile App (Expo) with Dashboard + FAQs`

---

## Parallel Workflow

**Time Block 1 (0-90 min):**
- Set up Phase 4 DB schema
- Create Phase 5 Expo project structure
- Install dependencies for both

**Time Block 2 (90-180 min):**
- Phase 4: Build auth endpoints + password hashing
- Phase 5: Build login & dashboard screens

**Time Block 3 (180-240 min):**
- Phase 4: Add RBAC checks, tests, commit
- Phase 5: Add FAQs, audit screens, offline mode

**Time Block 4 (240+ min):**
- Phase 5: Complete tests, styling, build APK/IPA
- Phase 4: Integration testing between web & mobile

---

## Blockers / Notes

- **Grey.git Architecture:** Express + Pages Router (not managed monorepo) → will integrate Expo separately
- **Database:** PostgreSQL already migrated (Phase 2) → add `admin_users` table
- **API Auth:** Currently env var based → migration to DB will be additive (no breaking changes)
- **Mobile API Base URL:** Will need to accept both `localhost:3000` (dev) and production URL

---

## Success Criteria

✅ Phase 4:
- [ ] 0 TS errors
- [ ] All 8 auth tests passing
- [ ] RBAC working (role validation on endpoints)
- [ ] Login page uses DB auth (not env var)
- [ ] Password hashing + verification working

✅ Phase 5:
- [ ] 0 TS errors in mobile code
- [ ] 6 E2E tests passing
- [ ] Offline FAQs work
- [ ] API calls working (with proper error handling)
- [ ] APK/IPA builds successfully

---

**Next:** Start Phase 4 DB schema → Phase 5 Expo setup
