# E2E Test Authentication Fix

## Problem
All E2E tests were failing with **"element(s) not found"** errors, even though the pages exist and render correctly in development. The root cause was an **auth redirect race condition**.

### Timeline of the Bug
1. Test calls: `await page.goto('/admin')`
2. Page mounts → `useEffect` runs → checks `localStorage.getItem('admin-token')`
3. Token is NOT found (test hasn't set it yet)
4. Page redirects to `/admin/login` immediately
5. Test then calls: `await page.evaluate(() => { localStorage.setItem('admin-token', ...); })`
6. **Too late!** Page already at login page, not dashboard
7. Test looks for "Admin Dashboard" text → NOT FOUND → ❌ fails

## Solution
Use **`page.addInitScript()`** to inject the auth token into the browser context **BEFORE** any navigation occurs.

### How It Works
```javascript
// Inject token into browser context FIRST
await page.addInitScript(() => {
  localStorage.setItem('admin-token', 'test-token-123');
});

// NOW navigate — token is already in localStorage
await page.goto('/admin');

// Page mounts → useEffect runs → finds token → no redirect ✅
```

The `addInitScript()` method executes JavaScript in the browser context before any scripts run, ensuring `localStorage` has the token when the page's `useEffect` checks for it.

## Changes Made

### File: `e2e/admin.spec.ts`
**All 14 E2E tests updated:**

#### Dashboard Tests (6 tests)
- ✅ Admin login flow
- ✅ Dashboard layout loads
- ✅ Dashboard charts render
- ✅ Export CSV button works
- ✅ Export PDF button exists
- ✅ Navigation to FAQs page
- ✅ Logout button works

#### FAQs Page Tests (2 tests)
- ✅ FAQs page loads
- ✅ FAQs search works

#### Admin Login Page Tests (2 tests)
- ✅ Login page renders
- ✅ Password input accepts text

#### Performance Tests (2 tests)
- ✅ Dashboard loads in <3 seconds
- ✅ Charts render without layout shift

#### Accessibility Tests (2 tests)
- ✅ Dashboard is keyboard navigable
- ✅ Colors have sufficient contrast

**Pattern Applied:**
```typescript
// For all tests that need auth:
await page.addInitScript(() => {
  localStorage.setItem('admin-token', 'test-token-123');
});
await page.goto('/admin');  // or /admin/faqs
// ... rest of test
```

### File: `playwright.config.ts`
- **Change:** `webServer` only runs in CI (GitHub Actions)
- **Reason:** GitHub Actions starts server separately; local testing shouldn't auto-start
- **Code:**
  ```typescript
  webServer: process.env.CI ? { /* config */ } : undefined,
  ```

## Why This Fix Works

1. **Prevents Race Conditions** - Token exists before page logic runs
2. **Simulates Real-World Login** - User would already be logged in (token in localStorage) when visiting admin
3. **Consistent Pattern** - All tests use same approach
4. **No Server Changes** - Admin pages don't need modification
5. **Works in CI** - GitHub Actions can use exact same test code

## Testing

### GitHub Actions
Tests will run automatically on:
- ✅ Every push to `main` / `develop` branches
- ✅ Every pull request

Workflow: `.github/workflows/deploy.yml` → Test job → Run E2E tests

### Local Testing (Optional)
```bash
# Start dev server
npm run dev

# In another terminal, run tests
npm run test:e2e
```

## Verification

Check that all 14 E2E tests pass in GitHub Actions:
1. Go to: https://github.com/gpaul988/grey/actions
2. Find latest run for commit `6f4415c1`
3. Look for ✅ "Test & Type Check" job
4. Scroll to "Run E2E tests" step
5. Should show: **14 passed**

## Technical Details

### What `addInitScript()` Does
- Runs JavaScript in the **browser context** before any page scripts
- Executes in the Chromium instance that Playwright controls
- Affects `localStorage`, `sessionStorage`, `window` object, etc.
- Perfect for auth token injection

### Why `page.evaluate()` Didn't Work
- `page.evaluate()` runs AFTER the page has fully loaded
- By that time, the page's `useEffect` hook has already checked for the token and redirected
- Adding the token then is too late

### Admin Page Auth Check
```typescript
// app/admin/page.tsx
useEffect(() => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : null;
  if (!token) {
    router.push('/admin/login');  // Redirects immediately
    return;
  }
  setIsAuthenticated(true);
  setIsLoading(false);
}, [router]);
```

This is CORRECT server-side behavior. The test just needs to set the token earlier.

## Files Changed
- `e2e/admin.spec.ts` - All 14 tests updated
- `playwright.config.ts` - Conditional webServer config
- `E2E_FIX_TASK.md` - This implementation guide (created)

## Commit
- **Commit ID:** `6f4415c1`
- **Message:** `fix: Use addInitScript to set auth token BEFORE page navigation in E2E tests`
- **Status:** ✅ Pushed to origin/main

## Future Improvements
1. **Real JWT Auth Backend** - Implement actual token validation on server
2. **Shared Test Fixtures** - Create helper function to reduce code duplication:
   ```typescript
   async function loginAs(page, token = 'test-token-123') {
     await page.addInitScript(() => {
       localStorage.setItem('admin-token', token);
     });
   }
   ```
3. **Auth API Endpoint** - Test /api/admin/auth instead of mocking localStorage
4. **Cross-browser Testing** - Run tests on Firefox/Safari in addition to Chrome

## References
- [Playwright Documentation - addInitScript](https://playwright.dev/docs/api/class-page#page-add-init-script)
- [GitHub Actions Workflow](/.github/workflows/deploy.yml)
- Original Issue: E2E tests failing with "element(s) not found"
