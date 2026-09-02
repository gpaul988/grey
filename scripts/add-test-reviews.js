#!/usr/bin/env node

/**
 * Script to add test reviews to the database
 * Run: node scripts/add-test-reviews.js
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'Admin', 'data', 'grey.db');
const db = new Database(dbPath);

const testReviews = [
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
        quote: 'The team delivered exactly what we needed on time and within budget. Great communication throughout.',
        rating: 5,
    },
    {
        author: 'John Okafor',
        role: 'CEO',
        company: 'TechStart Nigeria',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        quote: 'Professional, creative, and results-driven. They built our mobile app that now has 50K+ users.',
        rating: 5,
    },
];

try {
    const stmt = db.prepare(`
        INSERT INTO client_reviews (author, role, company, avatar, quote, rating, active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
    `);

    for (const review of testReviews) {
        stmt.run(
            review.author,
            review.role,
            review.company,
            review.avatar,
            review.quote,
            review.rating
        );
    }

    console.log('✅ Added 3 test reviews successfully!');
    console.log('Run: npm run dev:next');
    console.log('Visit: http://localhost:3000');
    console.log('Look for "What clients say" section with rotating testimonials');
} catch (err) {
    console.error('❌ Error adding reviews:', err.message);
    process.exit(1);
} finally {
    db.close();
}
