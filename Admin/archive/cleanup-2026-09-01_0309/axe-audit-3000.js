const { chromium } = require('playwright');
const axeCore = require('axe-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const urls = ['http://localhost:3000/audit', 'http://localhost:3000/partners'];
  const results = {};

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' , timeout: 60000});
      await page.waitForTimeout(2200);
      await page.addScriptTag({ content: axeCore.source });
      const raw = await page.evaluate(async () => {
        return await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2aa', 'wcag21aa', 'section508'] }
        });
      });
      results[url] = raw;
      const outPath = `axe-report-${url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_')}.json`;
      fs.writeFileSync(outPath, JSON.stringify(raw, null, 2));
      console.log(`Saved axe report to ${outPath}`);
    } catch (err) {
      console.error(`Error auditing ${url}:`, err.message || err);
      results[url] = { error: String(err) };
    }
  }

  await browser.close();
  for (const u of Object.keys(results)) {
    const r = results[u];
    if (r && r.violations) {
      console.log(`\n${u}: ${r.violations.length} violations, ${r.incomplete ? r.incomplete.length : 0} incomplete`);
      r.violations.forEach(v => {
        console.log(`- ${v.id}: ${v.impact} — ${v.nodes.length} nodes`);
      });
    } else if (r && r.error) {
      console.log(`${u}: Error — ${r.error}`);
    } else {
      console.log(`${u}: No violations data`);
    }
  }
})();