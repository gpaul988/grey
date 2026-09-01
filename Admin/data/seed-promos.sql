-- Enable Black Friday
INSERT OR REPLACE INTO store_settings (key, value, updated_at) VALUES ('black_friday_active', '1', datetime('now'));
INSERT OR REPLACE INTO store_settings (key, value, updated_at) VALUES ('black_friday_discount', '20', datetime('now'));

-- Set flash sales for three products (slugs must match existing products)
-- macbook-pro-14-m3-pro: 10% off
UPDATE products SET flash_sale = 1, flash_sale_starts = '2026-09-01T11:24:53.413Z', flash_sale_ends = '2026-09-03T11:29:53.413Z', flash_sale_price = ROUND(price * 0.90) WHERE slug = 'macbook-pro-14-m3-pro';
-- dell-xps-15: 15% off
UPDATE products SET flash_sale = 1, flash_sale_starts = '2026-09-01T11:24:53.413Z', flash_sale_ends = '2026-09-03T11:29:53.413Z', flash_sale_price = ROUND(price * 0.85) WHERE slug = 'dell-xps-15';
-- samsung-galaxy-s24-ultra: 12% off
UPDATE products SET flash_sale = 1, flash_sale_starts = '2026-09-01T11:24:53.413Z', flash_sale_ends = '2026-09-03T11:29:53.413Z', flash_sale_price = ROUND(price * 0.88) WHERE slug = 'samsung-galaxy-s24-ultra';

-- Optional: list affected rows when run with sqlite3 CLI
/*
SELECT key, value FROM store_settings WHERE key LIKE 'black_friday%';
SELECT slug, flash_sale, flash_sale_price, flash_sale_starts, flash_sale_ends FROM products WHERE slug IN (
  'macbook-pro-14-m3-pro','dell-xps-15','samsung-galaxy-s24-ultra'
);
*/
