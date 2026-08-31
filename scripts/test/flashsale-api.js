const http = require('http');

const base = process.env.SMOKE_BASE || 'http://localhost:3000';
const url = new URL('/api/store/products?flashsale=1&limit=1', base).toString();

console.log('Checking', url);

http.get(url, (res) => {
  const { statusCode } = res;
  if (statusCode !== 200) {
    console.error('Unexpected status:', statusCode);
    process.exit(2);
  }
  let raw = '';
  res.setEncoding('utf8');
  res.on('data', (c) => raw += c);
  res.on('end', () => {
    try {
      const j = JSON.parse(raw);
      if (!Array.isArray(j?.products)) {
        console.error('Invalid response: missing products array');
        process.exit(3);
      }
      console.log('Products returned:', j.products.length);
      process.exit(0);
    } catch (err) {
      console.error('Parse error', err);
      process.exit(4);
    }
  });
}).on('error', (e) => { console.error('Request failed', e.message); process.exit(1); });
