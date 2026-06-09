import { Products, ProductCategories, ProductBrands, StoreSettings, Coupons, ProductReviews } from '../models';

// Stable Unsplash image URLs (resized) for catalog imagery.
const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

export function seedStore(): void {
  // ── Categories ───────────────────────────────────────────────────────────
  const cats: Record<string, number> = {};
  const catData: { key: string; name: string; icon: string; desc: string }[] = [
    { key: 'laptops', name: 'Laptops', icon: 'solar:laptop-bold-duotone', desc: 'Business, gaming & ultrabook laptops' },
    { key: 'desktops', name: 'Desktops', icon: 'solar:monitor-bold-duotone', desc: 'Workstations, all-in-ones & gaming rigs' },
    { key: 'servers', name: 'Servers', icon: 'solar:server-bold-duotone', desc: 'Rack, tower & enterprise servers' },
    { key: 'phones', name: 'Mobile Phones', icon: 'solar:smartphone-bold-duotone', desc: 'Flagship & budget smartphones' },
    { key: 'tablets', name: 'Tablets', icon: 'solar:tablet-bold-duotone', desc: 'Tablets & 2-in-1 devices' },
    { key: 'networking', name: 'Networking', icon: 'solar:wi-fi-router-bold-duotone', desc: 'Routers, switches & access points' },
    { key: 'computer-accessories', name: 'Computer Accessories', icon: 'solar:keyboard-bold-duotone', desc: 'Keyboards, mice, monitors & storage' },
    { key: 'mobile-accessories', name: 'Mobile Accessories', icon: 'solar:headphones-round-bold-duotone', desc: 'Chargers, cases, earbuds & power banks' },
  ];
  for (const c of catData) {
    const created = ProductCategories.create({ name: c.name, icon: c.icon, description: c.desc });
    cats[c.key] = created.id;
  }

  // ── Brands ───────────────────────────────────────────────────────────────
  const brands: Record<string, number> = {};
  const brandNames = ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Samsung', 'Acer', 'MSI', 'Microsoft', 'Google', 'Xiaomi', 'TECNO', 'Anker', 'Logitech', 'TP-Link', 'Cisco', 'Generic'];
  for (const b of brandNames) {
    const created = ProductBrands.create({ name: b });
    brands[b] = created.id;
  }

  // ── Products ─────────────────────────────────────────────────────────────
  type P = {
    name: string; cat: string; brand: string; price: number; price_usd?: number; compare?: number;
    stock: number; featured?: boolean; img: string; sku: string;
    desc: string; specs: Record<string, string>; tags?: string[];
  };
  const products: P[] = [
    // Laptops
    { name: 'MacBook Pro 14" M3 Pro', cat: 'laptops', brand: 'Apple', price: 2850000, price_usd: 1999, compare: 3100000, stock: 12, featured: true, img: img('1517336714731-489689fd1ca8'), sku: 'MBP14-M3P', desc: 'The 14-inch MacBook Pro with M3 Pro delivers exceptional performance for demanding workflows.', specs: { Chip: 'Apple M3 Pro', RAM: '18GB', Storage: '512GB SSD', Display: '14.2" Liquid Retina XDR', Battery: 'Up to 18 hrs' }, tags: ['premium', 'creator'] },
    { name: 'Dell XPS 15', cat: 'laptops', brand: 'Dell', price: 1950000, price_usd: 1399, compare: 2200000, stock: 18, featured: true, img: img('1593642702821-c8da6771f0c6'), sku: 'XPS15-9530', desc: 'A stunning 15.6-inch InfinityEdge display in a premium machined aluminium chassis.', specs: { CPU: 'Intel Core i7-13700H', RAM: '16GB', Storage: '1TB SSD', GPU: 'RTX 4050', Display: '15.6" FHD+' }, tags: ['business'] },
    { name: 'HP Spectre x360 14', cat: 'laptops', brand: 'HP', price: 1450000, price_usd: 1049, stock: 22, img: img('1496181133206-80ce9b88a853'), sku: 'SPEC-X360-14', desc: 'Convertible 2-in-1 with OLED touch display and all-day battery.', specs: { CPU: 'Intel Core i7', RAM: '16GB', Storage: '512GB SSD', Display: '13.5" OLED Touch' } },
    { name: 'Lenovo ThinkPad X1 Carbon Gen 11', cat: 'laptops', brand: 'Lenovo', price: 1750000, price_usd: 1299, stock: 15, featured: true, img: img('1588872657578-7efd1f1555ed'), sku: 'TP-X1C-G11', desc: 'The legendary business ultrabook — light, durable, MIL-SPEC tested.', specs: { CPU: 'Intel Core i7-1355U', RAM: '16GB', Storage: '1TB SSD', Display: '14" WUXGA', Weight: '1.12kg' } },
    { name: 'ASUS ROG Zephyrus G14', cat: 'laptops', brand: 'ASUS', price: 2100000, price_usd: 1549, compare: 2400000, stock: 9, featured: true, img: img('1603302576837-37561b2e2302'), sku: 'ROG-G14-2024', desc: 'Compact 14-inch gaming powerhouse with Ryzen 9 and RTX graphics.', specs: { CPU: 'AMD Ryzen 9', RAM: '32GB', Storage: '1TB SSD', GPU: 'RTX 4070', Display: '14" QHD 165Hz' }, tags: ['gaming'] },
    { name: 'Acer Aspire 5', cat: 'laptops', brand: 'Acer', price: 580000, price_usd: 449, stock: 40, img: img('1525547719571-a2d4ac8945e2'), sku: 'ASP5-2024', desc: 'Affordable everyday laptop for work, study and browsing.', specs: { CPU: 'Intel Core i5', RAM: '8GB', Storage: '512GB SSD', Display: '15.6" FHD' }, tags: ['budget'] },

    // Desktops
    { name: 'Apple iMac 24" M3', cat: 'desktops', brand: 'Apple', price: 1850000, price_usd: 1299, stock: 8, featured: true, img: img('1527443224154-c4a3942d3acf'), sku: 'IMAC24-M3', desc: 'All-in-one desktop with a vibrant 4.5K Retina display and M3 chip.', specs: { Chip: 'Apple M3', RAM: '8GB', Storage: '256GB SSD', Display: '24" 4.5K Retina' } },
    { name: 'Dell OptiPlex 7010 Tower', cat: 'desktops', brand: 'Dell', price: 720000, price_usd: 549, stock: 25, img: img('1591488320449-011701bb6704'), sku: 'OPT-7010', desc: 'Reliable business desktop tower for office productivity.', specs: { CPU: 'Intel Core i5-13500', RAM: '16GB', Storage: '512GB SSD', OS: 'Windows 11 Pro' } },
    { name: 'MSI MEG Trident X Gaming PC', cat: 'desktops', brand: 'MSI', price: 3200000, price_usd: 2399, compare: 3600000, stock: 5, featured: true, img: img('1587202372775-e229f172b9d7'), sku: 'MEG-TRIDENT-X', desc: 'Compact yet brutal gaming desktop with flagship components.', specs: { CPU: 'Intel Core i9', RAM: '32GB', Storage: '2TB SSD', GPU: 'RTX 4080', Cooling: 'Liquid' }, tags: ['gaming'] },
    { name: 'HP Pavilion All-in-One 27', cat: 'desktops', brand: 'HP', price: 980000, price_usd: 749, stock: 14, img: img('1593640408182-31c70c8268f5'), sku: 'PAV-AIO-27', desc: 'Sleek 27-inch all-in-one with edge-to-edge display.', specs: { CPU: 'Intel Core i7', RAM: '16GB', Storage: '1TB SSD', Display: '27" FHD Touch' } },

    // Servers
    { name: 'Dell PowerEdge R760 Rack Server', cat: 'servers', brand: 'Dell', price: 6500000, price_usd: 4899, stock: 4, featured: true, img: img('1558494949-ef010cbdcc31'), sku: 'PE-R760', desc: '2U dual-socket rack server built for demanding enterprise workloads.', specs: { CPU: '2x Intel Xeon Gold', RAM: '128GB ECC', Storage: '8x 2.4TB SAS', Form: '2U Rack', RAID: 'PERC H755' }, tags: ['enterprise'] },
    { name: 'HPE ProLiant ML350 Gen11 Tower Server', cat: 'servers', brand: 'HP', price: 5200000, price_usd: 3899, stock: 6, img: img('1581092580497-e0d23cbdf1dc'), sku: 'ML350-G11', desc: 'Expandable tower server ideal for growing businesses.', specs: { CPU: 'Intel Xeon Silver', RAM: '64GB ECC', Storage: '4x 1.2TB SAS', Form: 'Tower' }, tags: ['enterprise'] },
    { name: 'Lenovo ThinkSystem SR650 V3', cat: 'servers', brand: 'Lenovo', price: 7100000, price_usd: 5299, stock: 3, img: img('1597872200969-2b65d56bd16b'), sku: 'TS-SR650-V3', desc: 'High-density 2U server for virtualisation and cloud.', specs: { CPU: '2x Xeon Platinum', RAM: '256GB ECC', Storage: '12x SAS bays', Form: '2U Rack' }, tags: ['enterprise'] },

    // Phones
    { name: 'iPhone 15 Pro Max', cat: 'phones', brand: 'Apple', price: 1650000, price_usd: 1199, compare: 1800000, stock: 30, featured: true, img: img('1695048133142-1a20484d2569'), sku: 'IP15-PM-256', desc: 'Titanium design, A17 Pro chip, and the most advanced iPhone camera system.', specs: { Chip: 'A17 Pro', Storage: '256GB', Display: '6.7" Super Retina XDR', Camera: '48MP Triple', Material: 'Titanium' }, tags: ['flagship'] },
    { name: 'Samsung Galaxy S24 Ultra', cat: 'phones', brand: 'Samsung', price: 1580000, price_usd: 1149, compare: 1750000, stock: 28, featured: true, img: img('1610945265064-0e34e5519bbf'), sku: 'SGS24-U-256', desc: 'Galaxy AI flagship with built-in S Pen and 200MP camera.', specs: { Chip: 'Snapdragon 8 Gen 3', RAM: '12GB', Storage: '256GB', Display: '6.8" QHD+ AMOLED', Camera: '200MP' }, tags: ['flagship'] },
    { name: 'Google Pixel 8 Pro', cat: 'phones', brand: 'Google', price: 1250000, price_usd: 899, stock: 20, img: img('1598327105666-5b89351aff97'), sku: 'PIX8-PRO', desc: 'The smartest Pixel yet with Tensor G3 and best-in-class AI photography.', specs: { Chip: 'Tensor G3', RAM: '12GB', Storage: '128GB', Display: '6.7" LTPO OLED', Camera: '50MP Triple' } },
    { name: 'Xiaomi Redmi Note 13 Pro', cat: 'phones', brand: 'Xiaomi', price: 320000, price_usd: 249, stock: 50, img: img('1567581935884-3349723552ca'), sku: 'RN13-PRO', desc: 'Mid-range champion with 200MP camera and fast charging.', specs: { Chip: 'MediaTek Dimensity', RAM: '8GB', Storage: '256GB', Display: '6.67" AMOLED 120Hz', Camera: '200MP' }, tags: ['budget'] },
    { name: 'TECNO Camon 30 Pro', cat: 'phones', brand: 'TECNO', price: 280000, price_usd: 215, stock: 45, img: img('1592890288564-76628a30a657'), sku: 'CAM30-PRO', desc: 'Stylish camera-focused phone built for the African market.', specs: { Chip: 'Dimensity 8200', RAM: '12GB', Storage: '256GB', Display: '6.78" AMOLED', Camera: '50MP OIS' }, tags: ['budget'] },

    // Tablets
    { name: 'iPad Pro 12.9" M2', cat: 'tablets', brand: 'Apple', price: 1450000, price_usd: 1099, stock: 16, featured: true, img: img('1544244015-0df4b3ffc6b0'), sku: 'IPADPRO-129-M2', desc: 'The ultimate iPad experience with the M2 chip and Liquid Retina XDR display.', specs: { Chip: 'Apple M2', Storage: '256GB', Display: '12.9" Liquid Retina XDR', Connectivity: 'Wi-Fi 6E' } },
    { name: 'Samsung Galaxy Tab S9', cat: 'tablets', brand: 'Samsung', price: 980000, price_usd: 749, stock: 18, img: img('1561154464-82e9adf32764'), sku: 'TAB-S9', desc: 'Premium Android tablet with AMOLED display and S Pen included.', specs: { Chip: 'Snapdragon 8 Gen 2', RAM: '8GB', Storage: '128GB', Display: '11" Dynamic AMOLED 2X' } },
    { name: 'Microsoft Surface Pro 9', cat: 'tablets', brand: 'Microsoft', price: 1320000, price_usd: 999, stock: 11, img: img('1622533950212-3ba2b1ad79e0'), sku: 'SURF-PRO9', desc: '2-in-1 that runs full Windows 11 with laptop-class performance.', specs: { CPU: 'Intel Core i7', RAM: '16GB', Storage: '256GB SSD', Display: '13" PixelSense Touch' } },

    // Networking
    { name: 'TP-Link Archer AX73 Wi-Fi 6 Router', cat: 'networking', brand: 'TP-Link', price: 95000, price_usd: 79, stock: 60, img: img('1606904825846-647eb07f5be2'), sku: 'ARCHER-AX73', desc: 'AX5400 dual-band Wi-Fi 6 router for fast, reliable home networking.', specs: { Standard: 'Wi-Fi 6 (AX5400)', Bands: 'Dual-band', Ports: '4x Gigabit LAN', Antennas: '6' } },
    { name: 'Cisco Catalyst 9200 Switch', cat: 'networking', brand: 'Cisco', price: 1850000, price_usd: 1399, stock: 7, img: img('1551703599-6b3e8379aa8b'), sku: 'CAT-9200-24', desc: '24-port enterprise access switch with advanced security.', specs: { Ports: '24x Gigabit', Type: 'Managed L3', PoE: 'PoE+', Stacking: 'Yes' }, tags: ['enterprise'] },
    { name: 'TP-Link Deco X60 Mesh (3-pack)', cat: 'networking', brand: 'TP-Link', price: 185000, price_usd: 149, stock: 30, img: img('1544197150-b99a580bb7a8'), sku: 'DECO-X60-3', desc: 'Whole-home mesh Wi-Fi 6 covering up to 650 m².', specs: { Standard: 'Wi-Fi 6 (AX3000)', Coverage: '650 m²', Units: '3', Devices: '150+' } },

    // Computer accessories
    { name: 'Logitech MX Master 3S Mouse', cat: 'computer-accessories', brand: 'Logitech', price: 78000, price_usd: 99, stock: 80, featured: true, img: img('1527864550417-7fd91fc51a46'), sku: 'MX-MASTER-3S', desc: 'The flagship productivity mouse with quiet clicks and 8K DPI tracking.', specs: { DPI: '8000', Buttons: '7', Battery: '70 days', Connectivity: 'Bluetooth + USB-C' } },
    { name: 'Logitech MX Keys S Keyboard', cat: 'computer-accessories', brand: 'Logitech', price: 92000, price_usd: 109, stock: 55, img: img('1587829741301-dc798b83add3'), sku: 'MX-KEYS-S', desc: 'Backlit wireless keyboard built for comfort and precision.', specs: { Type: 'Low-profile', Backlight: 'Smart', Battery: '10 days lit', Connectivity: 'Bluetooth' } },
    { name: 'Dell UltraSharp 27" 4K Monitor', cat: 'computer-accessories', brand: 'Dell', price: 420000, price_usd: 319, compare: 480000, stock: 22, img: img('1527443224154-c4a3942d3acf'), sku: 'U2723QE', desc: '27-inch 4K UHD IPS Black monitor with USB-C hub.', specs: { Size: '27"', Resolution: '4K UHD', Panel: 'IPS Black', Ports: 'USB-C, HDMI, DP' } },
    { name: 'Samsung 980 PRO 1TB NVMe SSD', cat: 'computer-accessories', brand: 'Samsung', price: 135000, price_usd: 109, stock: 70, img: img('1597872200969-2b65d56bd16b'), sku: 'SSD-980PRO-1TB', desc: 'PCIe 4.0 NVMe SSD with blazing read speeds up to 7,000 MB/s.', specs: { Capacity: '1TB', Interface: 'PCIe 4.0 NVMe', Read: '7000 MB/s', Write: '5000 MB/s' } },

    // Mobile accessories
    { name: 'Anker 737 Power Bank (24K mAh)', cat: 'mobile-accessories', brand: 'Anker', price: 95000, price_usd: 149, stock: 65, featured: true, img: img('1609091839311-d5365f9ff1c5'), sku: 'ANKER-737', desc: '140W power bank with smart digital display — charges laptops and phones.', specs: { Capacity: '24000mAh', Output: '140W', Display: 'Digital', Ports: '2x USB-C, 1x USB-A' } },
    { name: 'Anker 65W GaN USB-C Charger', cat: 'mobile-accessories', brand: 'Anker', price: 38000, price_usd: 45, stock: 90, img: img('1583863788434-e58a36330cf6'), sku: 'ANKER-65W-GAN', desc: 'Compact 3-port fast charger powered by GaN technology.', specs: { Output: '65W', Ports: '2x USB-C, 1x USB-A', Tech: 'GaN II', Foldable: 'Yes' } },
    { name: 'Samsung Galaxy Buds2 Pro', cat: 'mobile-accessories', brand: 'Samsung', price: 145000, price_usd: 189, stock: 40, img: img('1606220588913-b3aacb4d2f46'), sku: 'BUDS2-PRO', desc: 'Premium ANC earbuds with 360 audio and crystal-clear calls.', specs: { ANC: 'Active', Battery: '5 hrs (18 w/ case)', Resistance: 'IPX7', Audio: '24-bit Hi-Fi' } },
    { name: 'Apple AirPods Pro (2nd Gen)', cat: 'mobile-accessories', brand: 'Apple', price: 280000, price_usd: 249, compare: 310000, stock: 35, featured: true, img: img('1600294037681-c80b4cb5b434'), sku: 'AIRPODS-PRO-2', desc: 'Next-level Active Noise Cancellation with Adaptive Audio.', specs: { Chip: 'H2', ANC: 'Adaptive', Battery: '6 hrs (30 w/ case)', Case: 'USB-C MagSafe' } },
  ];

  const createdIds: { id: number; name: string }[] = [];
  for (const p of products) {
    const created = Products.create({
      name: p.name,
      category_id: cats[p.cat],
      brand_id: brands[p.brand],
      description: p.desc,
      specs: p.specs,
      price: p.price,
      price_usd: p.price_usd ?? null,
      compare_price: p.compare ?? null,
      stock: p.stock,
      images: [p.img],
      thumbnail: p.img,
      status: 'active',
      featured: p.featured ?? false,
      tags: p.tags ?? [],
      sku: p.sku,
    });
    createdIds.push({ id: created.id, name: created.name });
  }

  // ── Sample approved reviews ─────────────────────────────────────────────
  const sampleReviews = [
    { name: 'Chinedu O.', rating: 5, comment: 'Arrived next day in Lagos. Genuine product, great packaging.' },
    { name: 'Amara N.', rating: 4, comment: 'Works perfectly. Wish it came with a free case but overall happy.' },
    { name: 'Ibrahim K.', rating: 5, comment: 'Best price I found in Nigeria. Will buy again.' },
    { name: 'Funke A.', rating: 4, comment: 'Solid performance for the price. Recommended.' },
  ];
  createdIds.slice(0, 14).forEach((prod, i) => {
    const r = sampleReviews[i % sampleReviews.length];
    ProductReviews.create({ product_id: prod.id, reviewer_name: r.name, rating: r.rating, comment: r.comment });
    // approve them so they show on storefront
  });
  // approve all reviews
  (ProductReviews.all('pending') as { id: number }[]).forEach((r) => ProductReviews.approve(r.id));

  // ── Coupons ──────────────────────────────────────────────────────────────
  Coupons.create({ code: 'WELCOME10', type: 'percent', value: 10, min_subtotal: 50000, max_discount: 100000, status: 'active' });
  Coupons.create({ code: 'GREY5000', type: 'fixed', value: 5000, min_subtotal: 100000, status: 'active' });
  Coupons.create({ code: 'TECHWEEK', type: 'percent', value: 15, min_subtotal: 200000, max_discount: 150000, usage_limit: 100, status: 'active' });

  // ── Store settings: USD + bank transfer defaults ──────────────────────────
  StoreSettings.setMany({
    'store.name': 'Grey TechStore',
    'store.usd_enabled': '1',
    'store.usd_rate': '1600',
    'payment.bank_transfer.enabled': '1',
    'payment.bank_transfer.bank_name': 'Zenith Bank',
    'payment.bank_transfer.account_number': '1234567890',
    'payment.bank_transfer.account_name': 'Grey InfoTech Ltd',
  });

  console.log(`Store seeded: ${products.length} products, ${catData.length} categories, ${brandNames.length} brands, 3 coupons.`);
}
