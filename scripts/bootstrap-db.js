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
