import fs from 'node:fs';
import Database from 'better-sqlite3';

const data = JSON.parse(fs.readFileSync('scripts/faqs-extracted.json', 'utf8'));
const db = new Database('Admin/data/grey.db');

const now = () => new Date().toISOString();
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// Existing questions to avoid re-inserting.
const existing = new Set(db.prepare('SELECT question FROM faqs').all().map((r) => norm(r.question)));

// Current max sort_order per nothing — just append sequentially after existing max.
const maxRow = db.prepare('SELECT COALESCE(MAX(sort_order),0) AS m FROM faqs').get();
let sort = maxRow.m;

const insert = db.prepare(
    `INSERT INTO faqs (question, answer, category, sort_order, active, created_at, updated_at)
     VALUES (@question, @answer, @category, @sort_order, 1, @ts, @ts)`
);

let inserted = 0,
    skipped = 0;
const seen = new Set(existing);

const tx = db.transaction(() => {
    for (const file of data) {
        for (const it of file.items) {
            const k = norm(it.question);
            if (!it.question || !it.answer || seen.has(k)) {
                skipped++;
                continue;
            }
            seen.add(k);
            sort += 1;
            insert.run({question: it.question, answer: it.answer, category: file.category, sort_order: sort, ts: now()});
            inserted++;
        }
    }
});
tx();

const total = db.prepare('SELECT COUNT(*) AS c FROM faqs').get().c;
console.log(`Inserted: ${inserted} | Skipped(dupe/empty): ${skipped} | Total FAQs now: ${total}`);
console.log('Per category:');
console.log(db.prepare('SELECT category, COUNT(*) c FROM faqs GROUP BY category ORDER BY c DESC').all());
