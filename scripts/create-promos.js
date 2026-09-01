// Run from repo root with: node scripts/create-promos.js
// Enables a site-wide Black Friday discount and creates per-product flash sales

// IMPORTANT: this script runs inside your project and expects Admin db/modules to be available.

const path = require('path');
try {
  // load project Admin models
  const models = require(path.join(process.cwd(), 'Admin', 'models'));
  const { Products, StoreSettings } = models;

  // Configure Black Friday
  console.log('Enabling Black Friday...');
  StoreSettings.set('black_friday_active', '1');
  // Set site-wide discount percentage (0-100)
  StoreSettings.set('black_friday_discount', '20');
  console.log('Black Friday active: 20% discount');

  // Create a short flash sale for a few highlighted products
  const now = new Date();
  const starts = new Date(now.getTime() - 5 * 60 * 1000).toISOString(); // started 5 minutes ago
  const ends = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(); // ends in 48 hours

  const flashItems = [
    { slug: 'macbook-pro-14-m3-pro', discountPercent: 10 },
    { slug: 'dell-xps-15', discountPercent: 15 },
    { slug: 'samsung-galaxy-s24-ultra', discountPercent: 12 },
  ];

  flashItems.forEach((it) => {
    const prod = Products.findBySlug(it.slug);
    if (!prod) {
      console.warn(`Product not found: ${it.slug}`);
      return;
    }

    const base = Number(prod.price || 0);
    const salePrice = Math.max(0, Math.round(base * (100 - it.discountPercent) / 100));

    Products.update(prod.id, {
      flash_sale: true,
      flash_sale_starts: starts,
      flash_sale_ends: ends,
      flash_sale_price: salePrice,
    });
    console.log(`Set flash sale for ${it.slug}: ${it.discountPercent}% off → ₦${salePrice}`);
  });

  console.log('Promotions created.');
} catch (err) {
  console.error('Failed to create promos:', err && err.message ? err.message : err);
  process.exitCode = 2;
}
