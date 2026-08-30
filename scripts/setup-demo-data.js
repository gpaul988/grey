#!/usr/bin/env node

/**
 * Complete setup script for demo data (partners, ads, reviews)
 * Run: node scripts/setup-demo-data.js
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'Admin', 'data', 'grey.db');

console.log('📊 Graham Sobiribo Paul Demo Data Setup');
console.log('================================\n');

try {
    const db = new Database(dbPath);
    console.log(`✅ Connected to database: ${dbPath}\n`);

    // ============ PARTNERS ============
    console.log('📌 Setting up Partners...');
    const deletePartners = db.prepare('DELETE FROM partners').run();
    console.log(`   Cleared ${deletePartners.changes} existing partners`);

    const partnerData = [
        {name: 'Google Cloud', logo: 'https://via.placeholder.com/80x40?text=Google+Cloud', url: 'https://cloud.google.com'},
        {name: 'Amazon AWS', logo: 'https://via.placeholder.com/80x40?text=AWS', url: 'https://aws.amazon.com'},
        {name: 'Microsoft Azure', logo: 'https://via.placeholder.com/80x40?text=Azure', url: 'https://azure.microsoft.com'},
        {name: 'Figma', logo: 'https://via.placeholder.com/80x40?text=Figma', url: 'https://figma.com'},
        {name: 'Stripe', logo: 'https://via.placeholder.com/80x40?text=Stripe', url: 'https://stripe.com'},
    ];

    const insertPartner = db.prepare(`
        INSERT INTO partners (name, logo, url, sort_order, active)
        VALUES (?, ?, ?, ?, 1)
    `);

    partnerData.forEach((p, i) => {
        insertPartner.run(p.name, p.logo, p.url, i + 1);
    });
    console.log(`   ✅ Added ${partnerData.length} partners\n`);

    // ============ REVIEWS ============
    console.log('📌 Setting up Client Reviews...');
    const deleteReviews = db.prepare('DELETE FROM client_reviews').run();
    console.log(`   Cleared ${deleteReviews.changes} existing reviews`);

    const reviewData = [
        {
            author: 'Ahmed Hassan',
            role: 'Founder',
            company: 'Innovation Hub Lagos',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
            quote: 'Graham Sobiribo Paul transformed our business with exceptional web development. Highly recommended!',
            rating: 5,
        },
        {
            author: 'Chioma Adeyemi',
            role: 'Product Manager',
            company: 'Digital Africa',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
            quote: 'The team delivered exactly what we needed on time and within budget. Great communication!',
            rating: 5,
        },
        {
            author: 'John Okafor',
            role: 'CEO',
            company: 'TechStart Nigeria',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            quote: 'Professional, creative, and results-driven. Built our mobile app with 50K+ users!',
            rating: 5,
        },
    ];

    const insertReview = db.prepare(`
        INSERT INTO client_reviews (author, role, company, avatar, quote, rating, active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
    `);

    reviewData.forEach((r, i) => {
        insertReview.run(r.author, r.role, r.company, r.avatar, r.quote, r.rating);
    });
    console.log(`   ✅ Added ${reviewData.length} reviews\n`);

    // ============ ADS ============
    console.log('📌 Setting up Advertisements...');
    const deleteAds = db.prepare('DELETE FROM ads').run();
    console.log(`   Cleared ${deleteAds.changes} existing ads`);

    const adsData = [
        {
            title: 'Custom Web Development',
            body: 'Build scalable, modern web applications tailored to your business needs.',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop',
            link_url: '/services/web-development',
            cta_label: 'Learn More',
            placement: 'home_banner',
            variant: 'neon',
            share_caption: 'Transform your business with custom web development',
        },
        {
            title: 'Mobile App Solutions',
            body: 'Native and cross-platform mobile apps that users love.',
            image: 'https://images.unsplash.com/photo-1512941691920-25463bac489c?w=1200&h=400&fit=crop',
            link_url: '/services/mobile-development',
            cta_label: 'Explore',
            placement: 'home_banner',
            variant: 'neon',
            share_caption: 'Mobile apps that drive engagement and growth',
        },
        {
            title: 'Digital Marketing Services',
            body: 'SEO, social media, content strategy—everything to grow online.',
            image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=1200&h=400&fit=crop',
            link_url: '/services/digital-marketing',
            cta_label: 'Get Started',
            placement: 'home_banner',
            variant: 'neon',
            share_caption: 'Drive growth with strategic digital marketing',
        },
    ];

    const insertAd = db.prepare(`
        INSERT INTO ads (title, body, image, link_url, cta_label, placement, variant, share_caption, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published')
    `);

    adsData.forEach((a, i) => {
        insertAd.run(
            a.title,
            a.body,
            a.image,
            a.link_url,
            a.cta_label,
            a.placement,
            a.variant,
            a.share_caption
        );
    });
    console.log(`   ✅ Added ${adsData.length} ads\n`);

    // ============ VERIFICATION ============
    console.log('✅ Verification:');
    const partnerCount = db.prepare('SELECT COUNT(*) as count FROM partners WHERE active=1').get();
    const reviewCount = db.prepare('SELECT COUNT(*) as count FROM client_reviews WHERE active=1').get();
    const adCount = db.prepare('SELECT COUNT(*) as count FROM ads WHERE status="published"').get();

    console.log(`   Partners: ${partnerCount.count} active`);
    console.log(`   Reviews: ${reviewCount.count} active`);
    console.log(`   Ads: ${adCount.count} published\n`);

    console.log('================================');
    console.log('🎉 Setup Complete!\n');
    console.log('Next steps:');
    console.log('1. Run: npm run dev:next');
    console.log('2. Visit: http://localhost:3000');
    console.log('3. You should see:');
    console.log('   ✓ Partner logos in carousel');
    console.log('   ✓ "What clients say" reviews section');
    console.log('   ✓ Ad banner rotating through 3 ads');
    console.log('   ✓ All images displaying properly');

    db.close();
} catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
}
