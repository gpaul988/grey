# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Performance Tests >> Charts render without layout shift
- Location: e2e\admin.spec.ts:218:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h3:has-text("User Growth")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h3:has-text("User Growth")')

```

```yaml
- text: "{\"error\":\"Too many attempts. Please wait a few minutes and try again.\"}"
```

# Test source

```ts
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
  224 |     // Get initial viewport
  225 |     const initialMetrics = await page.evaluate(() => window.innerHeight);
  226 |     
  227 |     // Wait for charts
> 228 |     await expect(page.locator('h3:has-text("User Growth")')).toBeVisible({ timeout: 5000 });
      |                                                              ^ Error: expect(locator).toBeVisible() failed
  229 |     
  230 |     // Check viewport hasn't shifted
  231 |     const finalMetrics = await page.evaluate(() => window.innerHeight);
  232 |     expect(finalMetrics).toBe(initialMetrics);
  233 |   });
  234 | });
  235 | 
  236 | test.describe('Accessibility Tests', () => {
  237 |   test('Dashboard is keyboard navigable', async ({ page }) => {
  238 |     await page.addInitScript(() => {
  239 |       localStorage.setItem('admin-token', 'test-token-123');
  240 |     });
  241 |     await page.goto('/admin');
  242 |     
  243 |     // Tab through buttons
  244 |     await page.keyboard.press('Tab');
  245 |     const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
  246 |     
  247 |     // Should be a button or interactive element
  248 |     expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
  249 |   });
  250 | 
  251 |   test('Colors have sufficient contrast', async ({ page }) => {
  252 |     await page.addInitScript(() => {
  253 |       localStorage.setItem('admin-token', 'test-token-123');
  254 |     });
  255 |     await page.goto('/admin');
  256 |     
  257 |     // Check that text is visible
  258 |     const headerText = page.locator('h1, h2');
  259 |     const isVisible = await headerText.first().isVisible();
  260 |     expect(isVisible).toBe(true);
  261 |   });
  262 | });
  263 | 
```