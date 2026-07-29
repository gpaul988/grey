import { chromium } from 'playwright';

(async () => {
  const result = {
    launcherVisible: false,
    micVisible: false,
    supportsSpeech: false,
    tawkScriptRequested: false,
    tawkIframePresent: false,
    errors: [],
    consoleLogs: [],
    requests: []
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    try { result.consoleLogs.push({type: msg.type(), text: msg.text()}); } catch { }
    try {
      const t = msg.text();
      if (/error|uncaught|typeerror|target ref is defined|i18next|clientHeight|twk-chunk/i.test(String(t).toLowerCase()))
        result.errors.push(String(t));
    } catch {}
  });

  page.on('request', req => {
    result.requests.push({url: req.url(), resourceType: req.resourceType()});
    if (req.url().includes('embed.tawk.to')) result.tawkScriptRequested = true;
  });

  page.on('response', res => {
    try {
      if (res.url().includes('embed.tawk.to')) result.tawkScriptRequested = true;
    } catch {}
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    result.errors.push('navigation_failed: ' + String(e));
  }

  // short wait for client scripts
  await page.waitForTimeout(2500);

  try {
    result.launcherVisible = !!(await page.$('button[aria-label="Open Grey AI assistant"]'));
  } catch {}

  // If launcher exists, click to open panel
  if (result.launcherVisible) {
    try { await page.click('button[aria-label="Open Grey AI assistant"]'); } catch {}
    await page.waitForTimeout(500);
    try { result.micVisible = !!(await page.$('button[title*="voice input"]')); } catch {}
    try { result.micVisible = result.micVisible || !!(await page.$('button[aria-pressed] svg')); } catch {}
  }

  try {
    result.supportsSpeech = await page.evaluate(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition));
  } catch {}

  try {
    result.tawkIframePresent = !!(await page.$('iframe[src*="tawk.to"]'));
  } catch {}

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
})();
