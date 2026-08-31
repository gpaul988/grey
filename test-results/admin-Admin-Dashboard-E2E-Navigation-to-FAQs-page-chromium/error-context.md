# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Dashboard E2E >> Navigation to FAQs page
- Location: e2e\admin.spec.ts:115:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[id="main-content"] a[href="/admin/faqs"], main a[href="/admin/faqs"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[id="main-content"] a[href="/admin/faqs"], main a[href="/admin/faqs"]').first()

```

```yaml
- text: "{\"error\":\"Too many attempts. Please wait a few minutes and try again.\"}"
```

# Test source

```ts
  23  |     // Should redirect to dashboard (or back to login on failure)
  24  |     await page.waitForLoadState('networkidle');
  25  |     const url = page.url();
  26  |     expect(url).toMatch(/\/admin(\/|$)/);
  27  |   });
  28  | 
  29  |   async function programmaticLogin(page) {
  30  |     const adminEmail = process.env.ADMIN_EMAIL || 'graham@grahamspaul.com.ng';
  31  |     const adminPassword = process.env.ADMIN_PASSWORD || '1Uriel2Graham3';
  32  |     // Perform a fetch in browser context to let the server set the session cookie
  33  |     await page.goto('/admin/login');
  34  |     await page.evaluate(async (creds) => {
  35  |       const { email, password } = creds;
  36  |       const body = new URLSearchParams();
  37  |       body.set('email', email);
  38  |       body.set('password', password);
  39  |       await fetch('/admin/login', { method: 'POST', body: body.toString(), headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, credentials: 'include' });
  40  |     }, { email: adminEmail, password: adminPassword });
  41  |   }
  42  | 
  43  |   test('Dashboard layout loads', async ({ page }) => {
  44  |     await programmaticLogin(page);
  45  |     await page.goto('/admin');
  46  | 
  47  |     // Check header exists
  48  |     await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 5000 });
  49  | 
  50  |     // Check metric cards exist - use main content area selector
  51  |     await expect(page.locator('[id="main-content"] text=Total Users, main text=Total Users').first()).toBeVisible();
  52  |     await expect(page.locator('[id="main-content"] text=Total Revenue, main text=Total Revenue').first()).toBeVisible();
  53  |     await expect(page.locator('[id="main-content"] text=Services').first()).toBeVisible();
  54  |     await expect(page.locator('[id="main-content"] text=Audit Score, main text=Audit Score').first()).toBeVisible();
  55  |   });
  56  | 
  57  |   test('Dashboard charts render', async ({ page }) => {
  58  |     await page.addInitScript(() => {
  59  |       localStorage.setItem('admin-token', 'test-token-123');
  60  |     });
  61  |     await page.goto('/admin');
  62  |     
  63  |     // Check charts section exists
  64  |     await expect(page.locator('h2:has-text("Analytics & Insights")')).toBeVisible({ timeout: 5000 });
  65  |     
  66  |     // Check chart titles
  67  |     await expect(page.locator('[id="main-content"] h3:has-text("User Growth"), main h3:has-text("User Growth")').first()).toBeVisible();
  68  |     await expect(page.locator('[id="main-content"] h3:has-text("Revenue Breakdown"), main h3:has-text("Revenue Breakdown")').first()).toBeVisible();
  69  |     await expect(page.locator('[id="main-content"] h3:has-text("Service Popularity"), main h3:has-text("Service Popularity")').first()).toBeVisible();
  70  |     await expect(page.locator('[id="main-content"] h3:has-text("Conversion Funnel"), main h3:has-text("Conversion Funnel")').first()).toBeVisible();
  71  |     await expect(page.locator('[id="main-content"] h3:has-text("Daily Audit Rate"), main h3:has-text("Daily Audit Rate")').first()).toBeVisible();
  72  |     await expect(page.locator('[id="main-content"] h3:has-text("Top Search Queries"), main h3:has-text("Top Search Queries")').first()).toBeVisible();
  73  |   });
  74  | 
  75  |   test('Export CSV button works', async ({ page }) => {
  76  |     await page.addInitScript(() => {
  77  |       localStorage.setItem('admin-token', 'test-token-123');
  78  |     });
  79  |     await page.goto('/admin');
  80  |     
  81  |     // Find and click CSV export button - use main content area
  82  |     const csvButton = page.locator('[id="main-content"] button:has-text("Export CSV"), main button:has-text("Export CSV")').first();
  83  |     await expect(csvButton).toBeVisible({ timeout: 5000 });
  84  |     
  85  |     // Setup download listener - but don't fail if download doesn't happen (may be blocked in CI)
  86  |     const downloadPromise = page.waitForEvent('download').catch(() => null);
  87  |     await csvButton.click();
  88  |     
  89  |     // Try to verify download started, but don't fail if it times out
  90  |     try {
  91  |       const download = await Promise.race([
  92  |         downloadPromise,
  93  |         new Promise((_, reject) => setTimeout(() => reject('timeout'), 5000))
  94  |       ]);
  95  |       if (download) {
  96  |         expect((download as any).suggestedFilename()).toMatch(/dashboard-export-\d{4}-\d{2}-\d{2}\.csv/);
  97  |       }
  98  |     } catch {
  99  |       // Downloads may not work in CI environment - that's ok
  100 |       console.log('Download test skipped (CI environment)');
  101 |     }
  102 |   });
  103 | 
  104 |   test('Export PDF button exists', async ({ page }) => {
  105 |     await page.addInitScript(() => {
  106 |       localStorage.setItem('admin-token', 'test-token-123');
  107 |     });
  108 |     await page.goto('/admin');
  109 |     
  110 |     // Find PDF export button
  111 |     const pdfButton = page.locator('[id="main-content"] button:has-text("Export PDF"), main button:has-text("Export PDF")').first();
  112 |     await expect(pdfButton).toBeVisible({ timeout: 5000 });
  113 |   });
  114 | 
  115 |   test('Navigation to FAQs page', async ({ page }) => {
  116 |     await page.addInitScript(() => {
  117 |       localStorage.setItem('admin-token', 'test-token-123');
  118 |     });
  119 |     await page.goto('/admin');
  120 |     
  121 |     // Find and click FAQs link
  122 |     const faqsLink = page.locator('[id="main-content"] a[href="/admin/faqs"], main a[href="/admin/faqs"]').first();
> 123 |     await expect(faqsLink).toBeVisible({ timeout: 5000 });
      |                            ^ Error: expect(locator).toBeVisible() failed
  124 |     await faqsLink.click();
  125 |     
  126 |     // Should navigate to FAQs page (also needs token)
  127 |     await page.addInitScript(() => {
  128 |       localStorage.setItem('admin-token', 'test-token-123');
  129 |     });
  130 |     await expect(page).toHaveURL('/admin/faqs');
  131 |   });
  132 | 
  133 |   test('Logout button works', async ({ page }) => {
  134 |     await page.addInitScript(() => {
  135 |       localStorage.setItem('admin-token', 'test-token-123');
  136 |     });
  137 |     await page.goto('/admin');
  138 |     
  139 |     // Find and click logout button
  140 |     const logoutButton = page.locator('[id="main-content"] button:has-text("Logout"), main button:has-text("Logout")').first();
  141 |     await expect(logoutButton).toBeVisible({ timeout: 5000 });
  142 |     await logoutButton.click();
  143 |     
  144 |     // Should redirect to login
  145 |     await expect(page).toHaveURL('/admin/login', { timeout: 5000 });
  146 |   });
  147 | });
  148 | 
  149 | test.describe('Admin FAQs Page E2E', () => {
  150 |   test('FAQs page loads', async ({ page }) => {
  151 |     await page.addInitScript(() => {
  152 |       localStorage.setItem('admin-token', 'test-token-123');
  153 |     });
  154 |     await page.goto('/admin/faqs');
  155 |     
  156 |     // Check page title
  157 |     await expect(page.locator('h1:has-text("Admin FAQs")')).toBeVisible({ timeout: 5000 });
  158 |     
  159 |     // Check FAQs content exists - be more specific
  160 |     const faqsContent = page.locator('[id="main-content"], main').first();
  161 |     await expect(faqsContent).toBeVisible();
  162 |   });
  163 | 
  164 |   test('FAQs search works', async ({ page }) => {
  165 |     await page.addInitScript(() => {
  166 |       localStorage.setItem('admin-token', 'test-token-123');
  167 |     });
  168 |     await page.goto('/admin/faqs');
  169 |     
  170 |     // Find search input
  171 |     const searchInput = page.locator('[id="main-content"] input[placeholder*="search" i], [id="main-content"] input[placeholder*="Search" i], main input[placeholder*="search" i]').first();
  172 |     if (await searchInput.isVisible()) {
  173 |       await searchInput.fill('React');
  174 |       await page.waitForTimeout(300);
  175 |       
  176 |       // Results should be filtered (don't assert strictly — depends on data)
  177 |     }
  178 |   });
  179 | });
  180 | 
  181 | test.describe('Admin Login Page E2E', () => {
  182 |   test('Login page renders', async ({ page }) => {
  183 |     await page.goto('/admin/login');
  184 |     
  185 |     // Check login form exists
  186 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  187 |     await expect(page.locator('[id="main-content"] button[type="submit"], main button[type="submit"]').first()).toBeVisible();
  188 |   });
  189 | 
  190 |   test('Password input accepts text', async ({ page }) => {
  191 |     await page.goto('/admin/login');
  192 |     
  193 |     const passwordInput = page.locator('input[type="password"]');
  194 |     await passwordInput.fill('my-secret-password');
  195 |     
  196 |     // Verify input has value
  197 |     const value = await passwordInput.inputValue();
  198 |     expect(value).toBe('my-secret-password');
  199 |   });
  200 | });
  201 | 
  202 | test.describe('Performance Tests', () => {
  203 |   test('Dashboard loads in <5 seconds', async ({ page }) => {
  204 |     await page.addInitScript(() => {
  205 |       localStorage.setItem('admin-token', 'test-token-123');
  206 |     });
  207 |     
  208 |     const startTime = Date.now();
  209 |     await page.goto('/admin');
  210 |     
  211 |     // Wait for main content
  212 |     await expect(page.locator('h2:has-text("Analytics & Insights")')).toBeVisible({ timeout: 5000 });
  213 |     
  214 |     const loadTime = Date.now() - startTime;
  215 |     expect(loadTime).toBeLessThan(5000);
  216 |   });
  217 | 
  218 |   test('Charts render without layout shift', async ({ page }) => {
  219 |     await page.addInitScript(() => {
  220 |       localStorage.setItem('admin-token', 'test-token-123');
  221 |     });
  222 |     await page.goto('/admin');
  223 |     
```