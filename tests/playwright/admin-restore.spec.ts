import { test, expect } from '@playwright/test';

// E2E tests for admin session + restore flows. Requires these env vars when enabled:
// ADMIN_TEST_EMAIL, ADMIN_TEST_PASSWORD, ADMIN_TEST_RESTORE_ENTITY (products|customers|orders|audits), ADMIN_TEST_RESTORE_ID (id number)

const ADMIN_EMAIL = process.env.ADMIN_TEST_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_TEST_PASSWORD;
const RESTORE_ENTITY = process.env.ADMIN_TEST_RESTORE_ENTITY;
const RESTORE_ID = process.env.ADMIN_TEST_RESTORE_ID ? Number(process.env.ADMIN_TEST_RESTORE_ID) : undefined;

test.describe('Admin session and restore flows', () => {
  test('session endpoint returns null when unauthenticated', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/admin/api/session`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json).toHaveProperty('ok', true);
    expect(json).toHaveProperty('data', null);
  });

  test('login, session and restore flow (requires env config)', async ({ page, baseURL }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD || !RESTORE_ENTITY || !RESTORE_ID, 'Set ADMIN_TEST_EMAIL, ADMIN_TEST_PASSWORD, ADMIN_TEST_RESTORE_ENTITY, ADMIN_TEST_RESTORE_ID to run.');

    // Go to admin login page and sign in
    await page.goto(`${baseURL}/admin/login`);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await Promise.all([page.waitForNavigation({ url: `${baseURL}/admin/**` }), page.click('button[type="submit"]')]);

    // Verify session endpoint returns logged-in user
    const sessionRes = await page.request.get(`${baseURL}/admin/api/session`);
    const sessionJson = await sessionRes.json();
    expect(sessionJson.ok).toBe(true);
    expect(sessionJson.data).toBeTruthy();
    expect(sessionJson.data).toHaveProperty('role');

    // Perform restore via API and assert success
    const restoreResp = await page.request.post(`${baseURL}/api/admin/${RESTORE_ENTITY}/${RESTORE_ID}`, {
      data: { action: 'restore' },
    });
    const restoreJson = await restoreResp.json();
    expect(restoreResp.ok).toBeTruthy();
    expect(restoreJson.ok).toBeTruthy();

    // Query the activity API (authenticated via browser cookies) to find a restore entry
    const activity = await page.evaluate(async () => {
      const r = await fetch('/admin/api/activity?limit=20');
      return r.json();
    });
    expect(activity).toHaveProperty('ok', true);
    const items = activity.data || [];
    const found = items.find((it: any) => String(it.action).toLowerCase().includes('restore') && String(it.entity).toLowerCase().includes(String('${RESTORE_ENTITY}')));
    expect(found).toBeTruthy();
    // Note: the exact detail format may vary; adjust assertions for your environment
  });
});
