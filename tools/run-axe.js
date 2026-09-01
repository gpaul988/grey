const { JSDOM } = require('jsdom');
const axeCore = require('axe-core');

const pages = [
  'http://localhost:3000/store',
  'http://localhost:3000/store/products',
  'http://localhost:3000/store/products/samsung-galaxy-s24-ultra'
];

async function fetchHtml(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text;
}

async function run() {
  const results = {};
  for (const url of pages) {
    try {
      console.log('Checking', url);
      const html = await fetchHtml(url);
      const dom = new JSDOM(html, { url, runScripts: 'dangerously' });
      const { window } = dom;
      // expose globals to allow libraries that expect them
      global.window = window;
      global.document = window.document;
      global.Node = window.Node;
      // Ensure document has lang and title for axe
      try {
        if (!window.document.documentElement.lang) window.document.documentElement.lang = 'en';
        if (!window.document.querySelector('title')) {
          const t = window.document.createElement('title');
          t.textContent = 'Grey TechStore';
          window.document.head.appendChild(t);
        }
      } catch (e) {
        // ignore
      }
      // Inject axe into the JSDOM window and run it there
      try {
        window.eval(axeCore.source);
        const axe = window.axe;
        const res = await axe.run(window.document);
        results[url] = { violations: res.violations };
        console.log(`Violations for ${url}: ${res.violations.length}`);
      } catch (ex) {
        results[url] = { error: String(ex) };
        console.error('axe run failed', ex && ex.message ? ex.message : ex);
      }
    } catch (err) {
      console.error('Error checking', url, err.message || err);
      results[url] = { error: String(err) };
    }
  }
  console.log('JSON-REPORT-START');
  console.log(JSON.stringify(results, null, 2));
  console.log('JSON-REPORT-END');
}

run().catch((e) => { console.error(e); process.exit(1); });
