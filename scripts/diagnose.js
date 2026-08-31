#!/usr/bin/env node

/**
 * Diagnostic script to check database contents and API responses
 * Run: node scripts/diagnose.js
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'Admin', 'data', 'grey.db');

console.log('🔍 Grey InfoTech Data Diagnostic');
console.log('================================\n');

try {
    const db = new Database(dbPath);

    // Check database connection
    console.log(`📂 Database: ${dbPath}`);
    const tables = db.prepare(`
        SELECT name FROM sqlite_master WHERE type='table'
    `).all();
    console.log(`✅ Database connected, ${tables.length} tables found\n`);

    // Check Partners
    console.log('📌 PARTNERS TABLE:');
    const partners = db.prepare(`
        SELECT id, name, logo, active FROM partners
    `).all();
    console.log(`   Total: ${partners.length}`);
    if (partners.length === 0) {
        console.log('   ⚠️  NO PARTNERS FOUND - Run: node scripts/setup-demo-data.js');
    } else {
        partners.forEach(p => {
            console.log(`   - ${p.name} (active: ${p.active})`);
        });
    }
    console.log();

    // Check Reviews
    console.log('📌 CLIENT_REVIEWS TABLE:');
    const reviews = db.prepare(`
        SELECT id, author, company, rating, active FROM client_reviews
    `).all();
    console.log(`   Total: ${reviews.length}`);
    if (reviews.length === 0) {
        console.log('   ⚠️  NO REVIEWS FOUND - Run: node scripts/setup-demo-data.js');
    } else {
        reviews.forEach(r => {
            console.log(`   - "${r.author}" from ${r.company} (${r.rating}★, active: ${r.active})`);
        });
    }
    console.log();

    // Check Ads
    console.log('📌 ADS TABLE:');
    const ads = db.prepare(`
        SELECT id, title, placement, status FROM ads WHERE placement='home_banner'
    `).all();
    console.log(`   Total for home_banner: ${ads.length}`);
    if (ads.length === 0) {
        console.log('   ⚠️  NO ADS FOUND - Run: node scripts/setup-demo-data.js');
    } else {
        ads.forEach(a => {
            console.log(`   - "${a.title}" (status: ${a.status})`);
        });
    }
    console.log();

    db.close();

    // Summary
    console.log('================================');
    if (partners.length > 0 && reviews.length > 0 && ads.length > 0) {
        console.log('✅ All data present!\n');
        console.log('Next: npm run dev:next');
        console.log('Visit: http://localhost:3000');
    } else {
        console.log('⚠️  Missing data detected\n');
        console.log('Run: node scripts/setup-demo-data.js');
        console.log('Then: npm run dev:next');
    }
} catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
}
