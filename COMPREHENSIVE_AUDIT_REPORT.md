# COMPREHENSIVE AUDIT REPORT - GREY PROJECT
**Date**: 2026-08-30 13:23:18  
**Auditor**: Graham Sobiribo Paul (Senior Full-Stack Engineer)  
**Status**: IN PROGRESS

---

## EXECUTIVE SUMMARY

The **GREY** project is a full-stack Next.js + Express + SQLite application with an admin dashboard, authentication system, and multiple services. The codebase has **19,134 TypeScript/TSX files** and complex infrastructure.

### Critical Issues Found:
1. **TypeScript compilation error** in test file (cmsPageId variable)
2. **npm security vulnerabilities** (5 critical, 3 high, 9 moderate)
3. **Server startup issues** causing `npm run dev` to hang
4. **Backend login authentication** - incomplete database integration
5. **Missing environment configuration** for proper dev environment

### Severity Breakdown:
- 🔴 **Critical**: 5 (form-data, minimist prototype pollution, nodemailer)
- 🟠 **High**: 3 (nodemailer SSRF, semver ReDoS)
- 🟡 **Moderate**: 9 (various dependencies)

---

## DETAILED AUDIT

### 1. PROJECT STRUCTURE
```
grey/
├── Admin/                    # Backend admin dashboard (Express.js + EJS)
│   ├── config/              # Configuration files
│   ├── db/                  # SQLite database & migrations
│   ├── middleware/          # Auth & security middleware
│   ├── models/              # Database models
│   ├── routes/              # API & admin routes
│   └── views/               # EJS templates
├── pages/                   # Next.js API routes & pages
├── components/              # React components
├── lib/                     # Utility libraries & helpers
├── public/                  # Static assets
└── server.ts                # Express + Next.js server entry
```

### 2. ISSUES FOUND

#### 2.1 TypeScript Compilation Errors
**File**: `tests/e2e.integration.test.ts` Line 51  
**Error**: `Variable 'cmsPageId' is used before being assigned`  
**Severity**: 🟡 Medium  
**Fix Required**: Initialize variable in test or restructure test logic

```typescript
// Current (broken)
let cmsPageId: number;
// ...later...
expect(cmsPageId || true).toBeTruthy(); // cmsPageId never assigned

// Fixed
let cmsPageId: number | undefined;
```

#### 2.2 Security Vulnerabilities
| Vulnerability | Severity | Package | Issue |
|---|---|---|---|
| Prototype Pollution | 🔴 Critical | minimist (in optimist) | npm audit fix needed |
| form-data Random | 🔴 Critical | form-data | No fix available, consider alternative |
| form-data CRLF Injection | 🔴 Critical | form-data | No fix available |
| SSRF in Nodemailer | 🟠 High | nodemailer@8.0.10 | Upgrade to 9.0.1+ (breaking) |
| ReDoS in semver | 🟠 High | semver (in pg-migrate) | Upgrade pg-migrate to 2.0.0+ |

#### 2.3 Server Startup Issue - `npm run dev` Not Showing Project
**Symptoms**: 
- Server starts but requests timeout/hang
- No response from localhost:3000
- Admin panel doesn't load

**Root Cause Analysis**:
1. ✅ Server.ts imports are correct
2. ✅ Database initializes properly (`[DB] Connected and migrated`)
3. ⚠️ Next.js app.prepare() may hang on middleware setup
4. ⚠️ Possible issue: Express middleware chain not completing

**Suspected Issue**: The request handler chain in `server.ts` line 250 uses a wildcard route `/{*splat}` that may conflict with earlier routes, causing hanging.

```typescript
// Line 250 in server.ts
app.all('/{*splat}', async (req, res) => {
    // This wildcard may match before specific routes resolve
    await handle(req, res, parsedUrl);
});
```

#### 2.4 Backend Login Authentication Issues
**File**: `pages/api/admin/auth/login.ts`  
**Problem**: API endpoint uses hardcoded environment credentials, not database verification

```typescript
// Current implementation (insecure)
const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@greyinfotech.com.ng';
const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeThisInCPanel2024!';

// Should be:
const user = await Users.findByEmail(data.email);
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const passwordMatch = await bcryptjs.compare(data.password, user.password_hash);
```

**File**: `Admin/routes/auth.ts`  
**Status**: ✅ CORRECT - Uses database-backed `Users.checkPassword()`

**Issue**: Two competing auth systems:
- ✅ **Express auth** (`/admin/login` route) - Uses DB with bcrypt
- ❌ **Next.js API** (`/api/admin/auth/login`) - Uses env vars only

**Fix**: Migrate all auth to Express routes or use consistent database queries.

#### 2.5 Environment Configuration
**Missing/Incorrect Variables**:
```env
# .env.local has test credentials:
STRIPE_PUBLIC_KEY=pk_test_... ✓
STRIPE_SECRET_KEY=sk_test_... ✓
PAYPAL_CLIENT_ID=test_client... ✓
SMTP_HOST=smtp.gmail.com ✓
NEXT_PUBLIC_API_URL=https://yourdomain.com ✗ (WRONG)

# Should be for dev:
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development ✓
```

---

## REMAINING TASKS CHECKLIST

### Phase 1: Critical Fixes (Must Fix)
- [ ] Fix TypeScript compilation error in `tests/e2e.integration.test.ts`
- [ ] Fix server startup hang - debug request handler chain
- [ ] Consolidate auth endpoints (Next.js vs Express)
- [ ] Update .env.local for local development (NEXT_PUBLIC_API_URL)

### Phase 2: Security Fixes (Important)
- [ ] Run `npm audit fix` to patch minimist (prototype pollution)
- [ ] Evaluate form-data replacement (no fix available)
- [ ] Upgrade nodemailer to 9.0.1+ (review breaking changes)
- [ ] Audit all password hashing (bcryptjs proper usage)

### Phase 3: Validation & Testing
- [ ] Test `npm run dev` with fixed middleware
- [ ] Test admin login against database
- [ ] Test customer portal login
- [ ] Run E2E tests after fixes

### Phase 4: Documentation
- [ ] Update DEVELOPMENT.md with proper env setup
- [ ] Document auth flow (Express vs Next.js API)
- [ ] Create troubleshooting guide

---

## FILES TO REVIEW/FIX

### High Priority
1. **server.ts** - Fix request handler chain (line 250)
2. **tests/e2e.integration.test.ts** - Fix TypeScript error (line 51)
3. **pages/api/admin/auth/login.ts** - Align with Express auth
4. **.env.local** - Update NEXT_PUBLIC_API_URL
5. **package.json** - Review vulnerable dependencies

### Medium Priority
6. **Admin/middleware/security.ts** - Review CSRF/session setup
7. **Admin/routes/auth.ts** - Document auth flow
8. **lib/admin/auth.ts** - Review token generation

### Low Priority
9. Documentation files (100+ MD files - mostly outdated)
10. Legacy code cleanup

---

## STATISTICS

| Metric | Value |
|--------|-------|
| Total Files (TS/TSX) | 19,134 |
| Directories | 89 |
| TypeScript Errors | 1 |
| Security Vulnerabilities | 17 |
| Critical Issues | 5 |
| High Issues | 3 |
| Routes in Admin | 50+ |
| Database Tables | ~15 |

---

## NEXT STEPS

1. **Immediate** (5 mins): Fix TypeScript error
2. **Short-term** (30 mins): Debug server startup & test login
3. **Follow-up** (1 hour): Security audit fixes
4. **Documentation** (30 mins): Update setup guides

---

**END OF AUDIT REPORT**
