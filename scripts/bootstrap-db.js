#!/usr/bin/env node
/**
 * bootstrap-db.js
 * 
 * Creates all SQLite tables and seeds essential data.
 * Safe to run multiple times (idempotent).
 * 
 * Usage:
 *   node scripts/bootstrap-db.js
 *   node scripts/bootstrap-db.js --reset   (drops and recreates DB)
 */

const path = require('path');
const fs = require('fs');

// Check for --reset flag
const reset = process.argv.includes('--reset');

const DATA_DIR = path.join(__dirname, '..', 'Admin', 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'grey.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('[bootstrap] Created data directory:', DATA_DIR);
}

if (reset && fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log('[bootstrap] Deleted existing DB for reset');
}

let Database;
try {
  Database = require('better-sqlite3');
} catch (e) {
  console.error('[bootstrap] better-sqlite3 not installed. Run: npm install');
  process.exit(1);
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

console.log('[bootstrap] Connected to:', DB_PATH);

// ── Create Tables ──────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'staff',
    avatar TEXT,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    project_type TEXT,
    budget TEXT,
    message TEXT,
    source TEXT NOT NULL DEFAULT 'website',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);

  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    sort_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
  CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(active);

  CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    link_url TEXT NOT NULL DEFAULT '',
    cta_label TEXT NOT NULL DEFAULT 'Learn more',
    placement TEXT NOT NULL DEFAULT 'home_banner',
    share_caption TEXT NOT NULL DEFAULT '',
    variant TEXT NOT NULL DEFAULT 'gradient',
    status TEXT NOT NULL DEFAULT 'draft',
    starts_at TEXT,
    ends_at TEXT,
    impressions INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo TEXT NOT NULL DEFAULT '',
    url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS client_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT '',
    company TEXT NOT NULL DEFAULT '',
    avatar TEXT NOT NULL DEFAULT '',
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    sort_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL DEFAULT 'footer',
    status TEXT NOT NULL DEFAULT 'subscribed',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    link_url TEXT NOT NULL DEFAULT '',
    link_label TEXT NOT NULL DEFAULT '',
    variant TEXT NOT NULL DEFAULT 'info',
    active INTEGER NOT NULL DEFAULT 1,
    starts_at TEXT,
    ends_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS career_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_type TEXT NOT NULL DEFAULT 'cv_submission',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    role_interest TEXT,
    experience_years TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    cover_letter TEXT,
    cv_path TEXT,
    cv_filename TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_career_apps_email ON career_applications(email);
  CREATE INDEX IF NOT EXISTS idx_career_apps_status ON career_applications(status);
  CREATE INDEX IF NOT EXISTS idx_career_apps_type ON career_applications(form_type);

  CREATE TABLE IF NOT EXISTS job_openings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL DEFAULT '',
    location TEXT NOT NULL DEFAULT 'Remote',
    type TEXT NOT NULL DEFAULT 'full-time',
    experience_level TEXT NOT NULL DEFAULT '',
    salary_range TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    responsibilities TEXT NOT NULL DEFAULT '[]',
    requirements TEXT NOT NULL DEFAULT '[]',
    nice_to_have TEXT NOT NULL DEFAULT '[]',
    benefits TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'draft',
    deadline TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_job_openings_status ON job_openings(status);
`);
console.log('[bootstrap] Tables created/verified');

// ── Seed FAQs (idempotent) ─────────────────────────────────────────────────
const faqCount = db.prepare('SELECT COUNT(*) as n FROM faqs').get().n;
if (faqCount === 0) {
  const insertFaq = db.prepare('INSERT INTO faqs (question, answer, category, sort_order, active) VALUES (?, ?, ?, ?, 1)');
  const faqs = [
    ['How long does a typical project take?', 'Most websites ship in 4–8 weeks; full web/mobile apps run 8–16 weeks depending on scope. We share a clear timeline after the discovery call.', 'General', 0],
    ['How much does a project cost?', 'Pricing depends on scope and complexity. Simple sites start from a fixed package; custom platforms are quoted after discovery. Use our instant estimator for a ballpark.', 'Pricing', 1],
    ['Do you offer ongoing support and maintenance?', 'Yes. We offer monthly care plans covering updates, security, backups, monitoring and priority support.', 'Support', 2],
    ['What technologies do you work with?', 'React, Next.js, Node, Laravel, React Native, Flutter and more. We pick the stack that best fits your goals, not the other way round.', 'General', 3],
    ['Do you work with clients outside Nigeria?', 'Absolutely. We partner with startups and enterprises across Africa, Europe and North America, working async across time zones.', 'General', 4],
    ['How do payments work?', 'Typically milestone-based: a deposit to begin, then payments tied to delivery stages. Terms are agreed upfront in your proposal.', 'Pricing', 5],
    ['Who are Grey InfoTech?', 'Grey InfoTech is a digital agency based in Port Harcourt, Nigeria, established in 2018. We craft stunning websites, build strong brands, create dynamic eCommerce platforms, and develop innovative mobile apps.', 'General', 6],
    ['What industries do you serve?', 'We work across fintech, healthcare, retail, logistics, education, real estate, hospitality and more.', 'General', 7],
    ['Can you redesign my existing website?', 'Yes — redesigns are one of our most popular services. We audit your current site and rebuild it for performance, accessibility, and conversions.', 'Services', 8],
    ['Do you provide SEO services?', 'Yes. Every site we build follows SEO best practices. We also offer dedicated SEO campaigns — technical SEO, content strategy, and link building.', 'Services', 9],
  ];
  const insertMany = db.transaction((rows) => { for (const r of rows) insertFaq.run(...r); });
  insertMany(faqs);
  console.log('[bootstrap] Seeded', faqs.length, 'FAQs');
} else {
  console.log('[bootstrap] FAQs already seeded (' + faqCount + ' rows), skipping');
}

// ── Seed Partners (idempotent) ─────────────────────────────────────────────
const partnerCount = db.prepare('SELECT COUNT(*) as n FROM partners').get().n;
if (partnerCount === 0) {
  const insertPartner = db.prepare('INSERT INTO partners (name, logo, url, sort_order, active) VALUES (?, ?, ?, ?, 1)');
  const partners = [
    ['Microsoft', '/images/partners/microsoft.svg', 'https://microsoft.com', 1],
    ['Google', '/images/partners/google.svg', 'https://google.com', 2],
    ['AWS', '/images/partners/aws.svg', 'https://aws.amazon.com', 3],
    ['Vercel', '/images/partners/vercel.svg', 'https://vercel.com', 4],
    ['Cloudflare', '/images/partners/cloudflare.svg', 'https://cloudflare.com', 5],
  ];
  const insertMany = db.transaction((rows) => { for (const r of rows) insertPartner.run(...r); });
  insertMany(partners);
  console.log('[bootstrap] Seeded', partners.length, 'partners');
} else {
  console.log('[bootstrap] Partners already seeded (' + partnerCount + ' rows), skipping');
}

// ── Seed Client Reviews (idempotent) ──────────────────────────────────────
const reviewCount = db.prepare('SELECT COUNT(*) as n FROM client_reviews').get().n;
if (reviewCount === 0) {
  const insertReview = db.prepare('INSERT INTO client_reviews (author, role, company, avatar, quote, rating, sort_order, active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)');
  const reviews = [
    ['Chidi Okafor', 'CEO', 'FastPay Nigeria', '', 'Grey InfoTech completely transformed our digital presence. Our conversion rate doubled within 3 months of launch.', 5, 1],
    ['Amara Nwosu', 'Head of Product', 'HealthLink Africa', '', 'Professional team, clean code, on-time delivery. Exactly what we needed for our patient portal.', 5, 2],
    ['James Adeyemi', 'CTO', 'LogiHub Ltd', '', 'They built our entire logistics platform from scratch. The system handles 10,000+ daily transactions without a hitch.', 5, 3],
    ['Fatima Al-Hassan', 'Founder', 'EduReach', '', 'Grey InfoTech understood our vision immediately. Our e-learning platform is now used by 50,000+ students across West Africa.', 5, 4],
    ['Emeka Obi', 'Managing Director', 'Crestview Properties', '', 'From design to deployment, the team was exceptional. Our real estate portal looks and performs better than competitors with 10x our budget.', 5, 5],
  ];
  const insertMany = db.transaction((rows) => { for (const r of rows) insertReview.run(...r); });
  insertMany(reviews);
  console.log('[bootstrap] Seeded', reviews.length, 'client reviews');
} else {
  console.log('[bootstrap] Reviews already seeded (' + reviewCount + ' rows), skipping');
}

// ── Seed store catalog (idempotent) ───────────────────────────────────────
const storeTableSql = `
  CREATE TABLE IF NOT EXISTS store_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS product_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    parent_id INTEGER,
    icon TEXT,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS product_brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo TEXT,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT UNIQUE,
    category_id INTEGER,
    brand_id INTEGER,
    description TEXT,
    specs TEXT NOT NULL DEFAULT '{}',
    price REAL NOT NULL DEFAULT 0,
    compare_price REAL,
    stock INTEGER NOT NULL DEFAULT 0,
    images TEXT NOT NULL DEFAULT '[]',
    thumbnail TEXT,
    video_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    featured INTEGER NOT NULL DEFAULT 0,
    tags TEXT NOT NULL DEFAULT '[]',
    weight REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS product_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    customer_id INTEGER,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;
db.exec(storeTableSql);

const storeCategoryCount = db.prepare('SELECT COUNT(*) as n FROM product_categories').get().n;
if (storeCategoryCount === 0) {
  const categoryStmt = db.prepare('INSERT INTO product_categories (name, slug, icon, description, sort_order) VALUES (?, ?, ?, ?, ?)');
  const categories = [
    ['Laptops', 'laptops', 'laptop', 'Business, gaming & ultrabook laptops', 0],
    ['Desktops', 'desktops', 'monitor', 'Workstations, all-in-ones & gaming rigs', 1],
    ['Mobile Phones', 'phones', 'smartphone', 'Flagship & budget smartphones', 2],
    ['Tablets', 'tablets', 'tablet', 'Tablets & 2-in-1 devices', 3],
    ['Networking', 'networking', 'wifi', 'Routers, switches & access points', 4],
  ];
  categories.forEach(([name, slug, icon, description, order]) => categoryStmt.run(name, slug, icon, description, order));

  const brandStmt = db.prepare('INSERT INTO product_brands (name, slug, description) VALUES (?, ?, ?)');
  const brands = [
    ['Apple', 'apple', 'Apple products'],
    ['Dell', 'dell', 'Dell business tech'],
    ['HP', 'hp', 'HP devices'],
    ['Samsung', 'samsung', 'Samsung electronics'],
    ['TP-Link', 'tp-link', 'Networking essentials'],
  ];
  brands.forEach(([name, slug, description]) => brandStmt.run(name, slug, description));

  const categoryMap = {};
  db.prepare('SELECT id, slug FROM product_categories').all().forEach((row) => { categoryMap[row.slug] = row.id; });
  const brandMap = {};
  db.prepare('SELECT id, slug FROM product_brands').all().forEach((row) => { brandMap[row.slug] = row.id; });

  const productStmt = db.prepare(`
    INSERT INTO products (name, slug, sku, category_id, brand_id, description, specs, price, compare_price, stock, images, thumbnail, video_url, status, featured, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const products = [
    ['MacBook Pro 14" M3 Pro', 'macbook-pro-14-m3-pro', 'MBP14-M3P', 'laptops', 'apple', 'Premium business laptop for performance and portability.', '{"Chip":"Apple M3 Pro","RAM":"18GB","Storage":"512GB SSD"}', 2850000, 3100000, 12, '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=70', 'https://www.w3schools.com/html/mov_bbb.mp4', 'active', 1, '["premium","creator"]'],
    ['Dell XPS 15', 'dell-xps-15', 'XPS15-9530', 'laptops', 'dell', 'Elegant laptop for work, creative projects, and everyday productivity.', '{"CPU":"Intel Core i7-13700H","RAM":"16GB","Storage":"1TB SSD"}', 1950000, 2200000, 18, '["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=70', null, 'active', 1, '["business"]'],
    ['Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'SGS24-U-256', 'phones', 'samsung', 'Premium flagship mobile phone with pro-grade camera and AI features.', '{"Chip":"Snapdragon 8 Gen 3","RAM":"12GB","Storage":"256GB"}', 1580000, 1750000, 28, '["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=70', null, 'active', 1, '["flagship"]'],
    ['TP-Link Archer AX73 Router', 'tp-link-archer-ax73-router', 'ARCHER-AX73', 'networking', 'tp-link', 'Fast Wi-Fi 6 router for dependable home and office networks.', '{"Standard":"Wi-Fi 6","Ports":"4 Gigabit LAN","Coverage":"Up to 3000 sq ft"}', 95000, 110000, 60, '["https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=800&q=70"]', 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=800&q=70', null, 'active', 0, '["wifi"]'],
  ];

  products.forEach(([name, slug, sku, categorySlug, brandSlug, description, specs, price, comparePrice, stock, images, thumbnail, videoUrl, status, featured, tags]) => {
    productStmt.run(name, slug, sku, categoryMap[categorySlug], brandMap[brandSlug], description, specs, Number(price), Number(comparePrice), Number(stock), images, thumbnail, videoUrl, status, Number(featured), tags);
  });

  const reviewStmt = db.prepare('INSERT INTO product_reviews (product_id, reviewer_name, rating, comment, status) VALUES (?, ?, ?, ?, ?)');
  reviewStmt.run(1, 'Chinedu O.', 5, 'Arrived next day in Lagos. Genuine product, great packaging.', 'approved');
  reviewStmt.run(2, 'Amara N.', 4, 'Works perfectly. Wish it came with a free case but overall happy.', 'approved');
  console.log('[bootstrap] Seeded store catalog');
} else {
  console.log('[bootstrap] Store catalog already seeded (' + storeCategoryCount.n + ' categories), skipping');
}

// ── Seed Sample Ad (idempotent) ────────────────────────────────────────────
const adCount = db.prepare('SELECT COUNT(*) as n FROM ads').get().n;
if (adCount === 0) {
  db.prepare(`
    INSERT INTO ads (title, body, image, link_url, cta_label, placement, share_caption, variant, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'Free Website Audit — Limited Slots',
    'Get a comprehensive audit of your website covering performance, SEO, security and UX. No strings attached.',
    '/images/ads/audit-banner.jpg',
    '/audit',
    'Claim Your Free Audit',
    'home_banner',
    'I just claimed a free website audit from Grey InfoTech! greyinf.com/grey',
    'gradient',
    'published'
  );
  console.log('[bootstrap] Seeded 1 sample ad');
} else {
  console.log('[bootstrap] Ads already seeded (' + adCount + ' rows), skipping');
}

db.close();
console.log('[bootstrap] ✅ Database ready at', DB_PATH);
