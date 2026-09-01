const { chromium } = require('playwright');
const fs = require('fs');
(async ()=>{
  const browser = await chromium.launch({ args:['--no-sandbox'] });
  const page = await browser.newPage({ viewport:{ width:1280, height:720 } });
  const urls = ['/','/audit','/partners'];
  for(const u of urls){
    try{
      await page.goto('http://localhost:3000'+u,{ waitUntil:'networkidle', timeout:60000 });
      await page.waitForTimeout(800);
      const name = `visual-${u.replace(/\W+/g,'_')}-light-1280.png`;
      await page.screenshot({ path: name, fullPage:true });
      // dark mode
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(300);
      const name2 = `visual-${u.replace(/\W+/g,'_')}-dark-1280.png`;
      await page.screenshot({ path: name2, fullPage:true });
      // mobile
      await page.setViewportSize({ width: 375, height: 812 });
      await page.emulateMedia({ colorScheme: 'light' });
      await page.waitForTimeout(300);
      const name3 = `visual-${u.replace(/\W+/g,'_')}-light-375.png`;
      await page.screenshot({ path: name3, fullPage:true });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(300);
      const name4 = `visual-${u.replace(/\W+/g,'_')}-dark-375.png`;
      await page.screenshot({ path: name4, fullPage:true });
      console.log('Saved screenshots for', u);
      // reset viewport
      await page.setViewportSize({ width:1280, height:720 });
      await page.emulateMedia({ colorScheme: 'light' });
    } catch(e){ console.error('Error screenshot',u,e.message||e); }
  }
  await browser.close();
})();