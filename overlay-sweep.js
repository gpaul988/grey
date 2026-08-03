/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({args:['--no-sandbox']});
  const page = await browser.newPage({viewport:{width:1280,height:800}});
  const base = 'http://localhost:3001';
  const paths = [
    '/services/blockchain-development',
    '/services/Web-Development',
    '/services/Web-Design',
    '/services/Web-Application'
  ];
  const out = [];
  for (const p of paths) {
    const url = base + p;
    try {
      await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 15000});
      await page.waitForTimeout(400);
      const info = await page.evaluate(() => {
        const body = document.body, html = document.documentElement;
        const footer = document.querySelector('footer');
        const fixedFullScreens = Array.from(document.querySelectorAll('*')).filter(e => {
          const s = getComputedStyle(e); const z = parseInt(s.zIndex) || 0;
          return (s.position === 'fixed' || s.position === 'sticky') && z >= 40 && (e.clientHeight > 20 || e.clientWidth > 20);
        }).map(e => ({ tag: e.tagName, cls: e.className, z: getComputedStyle(e).zIndex || 'auto', rect: e.getBoundingClientRect().toJSON() })).slice(0,80);
        return {
          path: location.pathname,
          scrollHeight: Math.max(body.scrollHeight, html.scrollHeight),
          clientHeight: Math.max(body.clientHeight, html.clientHeight),
          overflowX: getComputedStyle(body).overflowX,
          overflowY: getComputedStyle(body).overflowY,
          footerExists: !!footer,
          footerVisible: !!footer && (function(){ const r = footer.getBoundingClientRect(); return r.top <= (window.innerHeight) && r.bottom >= 0; })(),
          fixedFullScreens
        };
      });

      const fab = await page.$('[data-request-quote-floating-button="true"]');
      if (fab) {
        await fab.click();
        await page.waitForTimeout(500);
        const after = await page.evaluate(() => {
          const footer = document.querySelector('footer');
          const fixedFullScreens = Array.from(document.querySelectorAll('*')).filter(e => {
            const s = getComputedStyle(e); const z = parseInt(s.zIndex) || 0;
            return (s.position === 'fixed' || s.position === 'sticky') && z >= 40 && (e.clientHeight > 20 || e.clientWidth > 20);
          }).map(e => ({ tag: e.tagName, cls: e.className, z: getComputedStyle(e).zIndex || 'auto', rect: e.getBoundingClientRect().toJSON() })).slice(0,80);
          return { overflowX: getComputedStyle(document.body).overflowX, overflowY: getComputedStyle(document.body).overflowY, footerVisible: !!footer && (function(){const r = footer.getBoundingClientRect(); return r.top <= (window.innerHeight) && r.bottom >= 0;})(), fixedFullScreens };
        });
        info.fabAfterClick = after;
        await page.keyboard.press('Escape').catch(()=>{});
        await page.waitForTimeout(250);
      }

      out.push(info);
    } catch (e) {
      out.push({ path: p, error: String(e) });
    }
  }
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();
