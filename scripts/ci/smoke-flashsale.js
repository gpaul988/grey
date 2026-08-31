const http = require('http');

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

const opts = new URL(process.env.SMOKE_BASE || 'http://localhost:3000');
opts.pathname = '/api/store/products';
opts.search = '?flashsale=1&limit=1';

http.get(opts, (res) => {
  const { statusCode } = res;
  if (statusCode !== 200) return fail(`Unexpected status code: ${statusCode}`);
  let raw = '';
  res.setEncoding('utf8');
  res.on('data', (c) => raw += c);
  res.on('end', () => {
    try {
      const j = JSON.parse(raw);
      if (!Array.isArray(j?.products)) return fail('Invalid response: products missing');
      console.log(`Found ${j.products.length} flash-sale products`);
      process.exit(j.products.length > 0 ? 0 : 2);
    } catch (err) {
      fail('Failed parsing JSON response');
    }
  });
}).on('error', (e) => fail(`Request failed: ${e.message}`));
