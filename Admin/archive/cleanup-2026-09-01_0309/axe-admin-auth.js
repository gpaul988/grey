const { chromium } = require('playwright');
const axeCore = require('axe-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const url = 'http://localhost:3000/admin';
  const loginUrl = 'http://localhost:3000/admin/login';
  const adminEmail = process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng';
  const adminPassword = process.env.ADMIN_PASSWORD || '1Uriel2Graham3';

  try {
    // Load login page
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    // Perform a fetch in page context to set session cookie
    await page.evaluate(async (creds) => {
      const { email, password } = creds;
      const body = new URLSearchParams();
      body.set('email', email);
      body.set('password', password);
      await fetch('/admin/login', {
        method: 'POST',
        body: body.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include'
      });
    }, { email: adminEmail, password: adminPassword });

    // Wait a moment for cookie/session to be set
    await page.waitForTimeout(1000);
    // Navigate to admin dashboard
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2200);
    // inject axe
    await page.addScriptTag({ content: axeCore.source });
    const raw = await page.evaluate(async () => {
      return await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2aa', 'wcag21aa', 'section508'] }
      });
    });
    const outPath = 'axe-admin-auth.json';
    fs.writeFileSync(outPath, JSON.stringify(raw, null, 2));
    console.log('Saved axe report to', outPath);
    if (raw && raw.violations) {
      console.log(`Admin: ${raw.violations.length} violations, ${raw.incomplete ? raw.incomplete.length : 0} incomplete`);
      raw.violations.forEach(v => console.log(`- ${v.id}: ${v.impact} — ${v.nodes.length} nodes`));
    }
  } catch (err) {
    console.error('Error during authenticated admin audit:', err.message || err);
  } finally {
    await browser.close();
  }
})();