# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Dashboard E2E >> Admin login flow
- Location: e2e/admin.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/admin/login
Call log:
  - navigating to "http://localhost:3000/admin/login", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Admin Dashboard E2E', () => {
  4   |   test('Admin login flow', async ({ page }) => {
  5   |     // Navigate to admin login
> 6   |     await page.goto('/admin/login');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/admin/login
  7   |     
  8   |     // Check login form exists
  9   |     await expect(page.locator('input[name="password"]')).toBeVisible();
  10  |     
  11  |     // Enter password
  12  |     await page.locator('input[name="password"]').fill('test-admin-password');
  13  |     
  14  |     // Submit form
  15  |     await page.locator('button[type="submit"]').click();
  16  |     
  17  |     // Should redirect to dashboard (or show error if invalid)
  18  |     await page.waitForTimeout(500);
  19  |     const url = page.url();
  20  |     expect(['http://localhost:3000/admin', 'http://localhost:3000/admin/login']).toContain(url);
  21  |   });
  22  | 
  23  |   test('Dashboard layout loads', async ({ page }) => {
  24  |     // Set token BEFORE navigating (prevents auth redirect race condition)
  25  |     await page.addInitScript(() => {
  26  |       localStorage.setItem('admin-token', 'test-token-123');
  27  |     });
  28  |     
  29  |     await page.goto('/admin');
  30  |     
  31  |     // Check header exists
  32  |     await expect(page.locator('text=Admin Dashboard')).toBeVisible({ timeout: 5000 });
  33  |     
  34  |     // Check metric cards exist
  35  |     await expect(page.locator('text=Total Users')).toBeVisible();
  36  |     await expect(page.locator('text=Total Revenue')).toBeVisible();
  37  |     await expect(page.locator('text=Services')).toBeVisible();
  38  |     await expect(page.locator('text=Audit Score')).toBeVisible();
  39  |   });
  40  | 
  41  |   test('Dashboard charts render', async ({ page }) => {
  42  |     await page.addInitScript(() => {
  43  |       localStorage.setItem('admin-token', 'test-token-123');
  44  |     });
  45  |     await page.goto('/admin');
  46  |     
  47  |     // Check charts section exists
  48  |     await expect(page.locator('text=Analytics & Insights')).toBeVisible({ timeout: 5000 });
  49  |     
  50  |     // Check chart titles
  51  |     await expect(page.locator('text=User Growth')).toBeVisible();
  52  |     await expect(page.locator('text=Revenue Breakdown')).toBeVisible();
  53  |     await expect(page.locator('text=Service Popularity')).toBeVisible();
  54  |     await expect(page.locator('text=Conversion Funnel')).toBeVisible();
  55  |     await expect(page.locator('text=Daily Audit Rate')).toBeVisible();
  56  |     await expect(page.locator('text=Top Search Queries')).toBeVisible();
  57  |   });
  58  | 
  59  |   test('Export CSV button works', async ({ page }) => {
  60  |     await page.addInitScript(() => {
  61  |       localStorage.setItem('admin-token', 'test-token-123');
  62  |     });
  63  |     await page.goto('/admin');
  64  |     
  65  |     // Find and click CSV export button
  66  |     const csvButton = page.locator('button:has-text("Export CSV")');
  67  |     await expect(csvButton).toBeVisible({ timeout: 5000 });
  68  |     
  69  |     // Setup download listener
  70  |     const downloadPromise = page.waitForEvent('download');
  71  |     await csvButton.click();
  72  |     
  73  |     // Verify download started
  74  |     const download = await downloadPromise;
  75  |     expect(download.suggestedFilename()).toMatch(/dashboard-export-\d{4}-\d{2}-\d{2}\.csv/);
  76  |   });
  77  | 
  78  |   test('Export PDF button exists', async ({ page }) => {
  79  |     await page.addInitScript(() => {
  80  |       localStorage.setItem('admin-token', 'test-token-123');
  81  |     });
  82  |     await page.goto('/admin');
  83  |     
  84  |     // Find PDF export button
  85  |     const pdfButton = page.locator('button:has-text("Export PDF")');
  86  |     await expect(pdfButton).toBeVisible({ timeout: 5000 });
  87  |   });
  88  | 
  89  |   test('Navigation to FAQs page', async ({ page }) => {
  90  |     await page.addInitScript(() => {
  91  |       localStorage.setItem('admin-token', 'test-token-123');
  92  |     });
  93  |     await page.goto('/admin');
  94  |     
  95  |     // Find and click FAQs link
  96  |     const faqsLink = page.locator('a[href="/admin/faqs"]');
  97  |     await expect(faqsLink).toBeVisible({ timeout: 5000 });
  98  |     await faqsLink.click();
  99  |     
  100 |     // Should navigate to FAQs page (also needs token)
  101 |     await page.addInitScript(() => {
  102 |       localStorage.setItem('admin-token', 'test-token-123');
  103 |     });
  104 |     await expect(page).toHaveURL('/admin/faqs');
  105 |   });
  106 | 
```