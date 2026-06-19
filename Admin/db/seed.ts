import fs from 'node:fs';
import path from 'node:path';
import db from './index';
import { migrate } from './schema';
import {
    Users, Submissions, Leads, Clients, Projects, Tickets, TicketMessages,
    Invoices, CaseStudies, BlogPosts, Conversations, Messages, Participants,
    Announcements, Ads,
    nextInvoiceNumber,
} from '../models';
import { seedStore } from './seed-store';

// ⚠️ CRITICAL: All seed passwords MUST come from environment variables.
// DO NOT hardcode plaintext passwords here. Use process.env.SEED_*_PASSWORD
// Set these in your .env.local or deployment environment.
// There is NO fallback default — if the env var is missing, the seed will fail loudly.

function getRequiredEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} env var is required but not set. This is a production credential — never hardcode it.`);
    }
    return value;
}

const SEED_SUPERADMIN_EMAIL = 'graham@greyinfotech.com.ng';
const SEED_SUPERADMIN_PASSWORD = getRequiredEnv('SEED_SUPERADMIN_PASSWORD');

const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@greyinfotech.com.ng';
const SEED_ADMIN_PASSWORD = getRequiredEnv('SEED_ADMIN_PASSWORD');

const SEED_MANAGER_EMAIL = 'pm@greyinfotech.com.ng';
const SEED_MANAGER_PASSWORD = getRequiredEnv('SEED_MANAGER_PASSWORD');

const SEED_STAFF_EMAIL = 'support@greyinfotech.com.ng';
const SEED_STAFF_PASSWORD = getRequiredEnv('SEED_STAFF_PASSWORD');

/**
 * Idempotently seed the FAQ knowledge base from the migrated content in
 * faqs-seed.json (extracted from the legacy inline FAQ sections). Safe to run
 * on every boot: inserts only questions not already present (matched by a
 * normalised question string), so admin edits/additions are never overwritten.
 */
function seedFaqs() {
    const file = path.join(__dirname, 'faqs-seed.json');
    if (!fs.existsSync(file)) {
        console.log('  faqs-seed.json not found — skipping FAQ seed.');
        return;
    }
    let rows: { question: string; answer: string; category: string; sort_order?: number }[];
    try {
        rows = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
        console.log('  faqs-seed.json unreadable — skipping FAQ seed.');
        return;
    }

    const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const existing = new Set(
        (db.prepare('SELECT question FROM faqs').all() as { question: string }[]).map((r) => norm(r.question))
    );
    const maxRow = db.prepare('SELECT COALESCE(MAX(sort_order),0) AS m FROM faqs').get() as { m: number };
    let sort = maxRow.m;
    const insert = db.prepare(
        `INSERT INTO faqs (question, answer, category, sort_order, active, created_at, updated_at)
         VALUES (@question, @answer, @category, @sort_order, 1, @ts, @ts)`
    );
    const now = new Date().toISOString();
    let inserted = 0;
    const tx = db.transaction(() => {
        for (const r of rows) {
            const k = norm(r.question);
            if (!r.question || !r.answer || existing.has(k)) continue;
            existing.add(k);
            sort += 1;
            insert.run({ question: r.question, answer: r.answer, category: r.category || 'General', sort_order: sort, ts: now });
            inserted++;
        }
    });
    tx();
    console.log(`  FAQs seeded: +${inserted} new (total ${(db.prepare('SELECT COUNT(*) AS c FROM faqs').get() as { c: number }).c}).`);
}

async function seed() {
    migrate();
    console.log('Schema migrated.');

    if (Users.count() > 0) {
        console.log('Database already seeded — running idempotent admin repair instead of full seed.');
        await ensureCoreAdmins();
        seedFaqs();
        console.log('Admin repair done. (delete Admin/data/grey.db to re-seed from scratch)');
        return;
    }

    // --- Super admin (CEO / founder) ---
    // Password comes from SEED_SUPERADMIN_PASSWORD env var (REQUIRED, no fallback)
    // Core admins are seeded VERIFIED + active so they can log in immediately.
    const ceo = await Users.create({
        name: 'Graham Sobiribo Paul',
        email: SEED_SUPERADMIN_EMAIL,
        password: SEED_SUPERADMIN_PASSWORD,
        role: 'superadmin',
        phone: '+234 802 809 5571',
        email_verified: true,
        status: 'active',
    });
    console.log(`CEO super-admin seeded (${ceo.email}).`);

    const admin = await Users.create({
        name: 'Grey InfoTech Admin',
        email: SEED_ADMIN_EMAIL,
        password: SEED_ADMIN_PASSWORD,
        role: 'admin',
        phone: '+234 802 809 5571',
        email_verified: true,
        status: 'active',
    });
    const manager = await Users.create({
        name: 'Project Manager',
        email: SEED_MANAGER_EMAIL,
        password: SEED_MANAGER_PASSWORD,
        role: 'manager',
        email_verified: true,
    });
    await Users.create({
        name: 'Support Agent',
        email: SEED_STAFF_EMAIL,
        password: SEED_STAFF_PASSWORD,
        role: 'staff',
        email_verified: true,
    });
    console.log('Users seeded.');

    // --- Clients ---
    const c1 = await Clients.create({ name: 'Ada Okafor', email: 'ada@taskflow.io', company: 'TaskFlow Inc', phone: '+234 803 111 2222', password: 'ClientPass@2026', email_verified: true });
    const c2 = await Clients.create({ name: 'Tunde Bello', email: 'tunde@naijapay.ng', company: 'NaijaPay', phone: '+234 805 333 4444', password: 'ClientPass@2026', email_verified: true });
    const c3 = await Clients.create({ name: 'Grace Eze', email: 'grace@medlink.africa', company: 'MedLink Africa', phone: '+234 807 555 6666', password: 'ClientPass@2026', email_verified: true });
    console.log('Clients seeded.');

    // --- Submissions (contact inbox) ---
    const subs = [
        { name: 'John Doe', email: 'john@startup.com', phone: '+234 800 000 0001', subject: 'Need an MVP', project_type: 'MVP Development', budget: '$5k-$10k', message: 'We want to build a fintech MVP in 8 weeks.', status: 'new' },
        { name: 'Mary Sun', email: 'mary@retailco.com', phone: '+234 800 000 0002', subject: 'E-commerce site', project_type: 'E-commerce Platform', budget: '$10k-$25k', message: 'Looking for a full online store with payments.', status: 'read' },
        { name: 'Ken Ade', email: 'ken@logistics.ng', phone: '+234 800 000 0003', subject: 'Fleet app', project_type: 'Mobile App Development', budget: '$25k+', message: 'Need a driver + dispatch mobile app.', status: 'replied' },
        { name: 'Lara P', email: 'lara@brandhub.co', phone: '', subject: 'Website redesign', project_type: 'Web Design', budget: '$3k-$5k', message: 'Refresh our brand site.', status: 'new' },
    ];
    subs.forEach((s) => Submissions.create({ ...s, source: 'website' }));
    console.log('Submissions seeded.');

    // --- Leads ---
    const leads = [
        { name: 'Ada Okafor', email: 'ada@taskflow.io', company: 'TaskFlow Inc', source: 'referral', stage: 'won', value: 18000, owner_id: manager.id, notes: 'Signed SaaS build.' },
        { name: 'Tunde Bello', email: 'tunde@naijapay.ng', company: 'NaijaPay', source: 'website', stage: 'proposal', value: 32000, owner_id: manager.id, notes: 'Proposal sent, awaiting sign-off.' },
        { name: 'Grace Eze', email: 'grace@medlink.africa', company: 'MedLink Africa', source: 'social', stage: 'qualified', value: 24000, owner_id: admin.id, notes: 'Healthcare platform, qualified.' },
        { name: 'John Doe', email: 'john@startup.com', company: 'Startup XYZ', source: 'website', stage: 'new', value: 8000, owner_id: null, notes: 'Fresh inbound.' },
        { name: 'Mary Sun', email: 'mary@retailco.com', company: 'RetailCo', source: 'ads', stage: 'contacted', value: 15000, owner_id: manager.id, notes: 'Called, demo scheduled.' },
    ];
    leads.forEach((l) => Leads.create(l));
    console.log('Leads seeded.');

    // --- Projects ---
    const p1 = Projects.create({ name: 'TaskFlow SaaS Platform', client_id: c1.id, client_name: 'TaskFlow Inc', status: 'active', progress: 65, budget: 18000, start_date: '2026-04-01', end_date: '2026-08-15', description: 'Multi-tenant project management SaaS.', manager_id: manager.id });
    Projects.create({ name: 'NaijaPay Mobile Wallet', client_id: c2.id, client_name: 'NaijaPay', status: 'planning', progress: 10, budget: 32000, start_date: '2026-06-10', end_date: '2026-11-30', description: 'Mobile wallet + agent network app.', manager_id: manager.id });
    Projects.create({ name: 'MedLink Telehealth Portal', client_id: c3.id, client_name: 'MedLink Africa', status: 'active', progress: 40, budget: 24000, start_date: '2026-05-01', end_date: '2026-09-20', description: 'Telehealth booking and records portal.', manager_id: admin.id });
    Projects.create({ name: 'Grey Corporate Site Revamp', client_id: null, client_name: 'Internal', status: 'completed', progress: 100, budget: 0, start_date: '2026-01-10', end_date: '2026-03-01', description: 'Company website overhaul.', manager_id: admin.id });
    console.log('Projects seeded.');

    // --- Tickets ---
    const t1 = Tickets.create({ subject: 'Login page not loading on Safari', requester: 'Ada Okafor', requester_email: 'ada@taskflow.io', priority: 'high', status: 'open', assignee_id: manager.id, body: 'Users on Safari 17 see a blank login screen.' });
    Tickets.create({ subject: 'Add CSV export to reports', requester: 'Tunde Bello', requester_email: 'tunde@naijapay.ng', priority: 'medium', status: 'pending', assignee_id: manager.id, body: 'Feature request: export transactions to CSV.' });
    Tickets.create({ subject: 'Invoice email formatting broken', requester: 'Grace Eze', requester_email: 'grace@medlink.africa', priority: 'low', status: 'resolved', assignee_id: admin.id, body: 'Invoice emails render with broken layout in Outlook.' });
    TicketMessages.create({ ticket_id: t1.id, author: 'Ada Okafor', is_staff: 0, body: 'It happens on every Safari device we tested.' });
    TicketMessages.create({ ticket_id: t1.id, author: 'Project Manager', is_staff: 1, body: 'Reproduced. Investigating a CSS flexbox issue. Fix ETA today.' });
    console.log('Tickets seeded.');

    // --- Invoices ---
    Invoices.create({ number: nextInvoiceNumber(), client_id: c1.id, client_name: 'TaskFlow Inc', client_email: 'ada@taskflow.io', amount: 9000, tax: 675, total: 9675, currency: 'USD', status: 'paid', issued_date: '2026-04-05', due_date: '2026-04-20', items: JSON.stringify([{ description: 'Milestone 1 — Design & Setup', qty: 1, rate: 9000 }]), notes: 'First milestone.' });
    Invoices.create({ number: nextInvoiceNumber(), client_id: c1.id, client_name: 'TaskFlow Inc', client_email: 'ada@taskflow.io', amount: 9000, tax: 675, total: 9675, currency: 'USD', status: 'sent', issued_date: '2026-06-01', due_date: '2026-06-16', items: JSON.stringify([{ description: 'Milestone 2 — Core build', qty: 1, rate: 9000 }]), notes: '' });
    Invoices.create({ number: nextInvoiceNumber(), client_id: c3.id, client_name: 'MedLink Africa', client_email: 'grace@medlink.africa', amount: 12000, tax: 900, total: 12900, currency: 'USD', status: 'overdue', issued_date: '2026-05-01', due_date: '2026-05-15', items: JSON.stringify([{ description: 'Discovery + Phase 1', qty: 1, rate: 12000 }]), notes: 'Follow up needed.' });
    console.log('Invoices seeded.');

    // --- Case studies ---
    CaseStudies.create({ title: 'Scaling TaskFlow to 50k Users', slug: 'scaling-taskflow', client: 'TaskFlow Inc', industry: 'SaaS', summary: 'How we re-architected TaskFlow for scale.', body: 'Full case study body...', image: '/assets/img/portfolio/1.jpg', results: '3x faster load, 50k MAU, 99.9% uptime', published: 1 });
    CaseStudies.create({ title: 'NaijaPay Agent Network Launch', slug: 'naijapay-agent-network', client: 'NaijaPay', industry: 'Fintech', summary: 'A mobile wallet that onboarded 2,000 agents in 3 months.', body: 'Full case study body...', image: '/assets/img/portfolio/2.jpg', results: '2,000 agents, ₦400M processed', published: 1 });
    console.log('Case studies seeded.');

    // --- Blog posts ---
    BlogPosts.create({ title: 'Designing for Scale', slug: 'designing-for-scale', excerpt: 'Architectural patterns that keep products fast as they grow.', body: '<p>Content here...</p>', cover: '/assets/img/blog/1.jpg', author: 'Grey InfoTech', tags: JSON.stringify(['architecture', 'scaling']), status: 'published', published_at: '2026-03-12' });
    BlogPosts.create({ title: 'Scope, MVP & Delivery', slug: 'scope-mvp-delivery', excerpt: 'How to scope an MVP that actually ships.', body: '<p>Content here...</p>', cover: '/assets/img/blog/2.jpg', author: 'Grey InfoTech', tags: JSON.stringify(['mvp', 'product']), status: 'published', published_at: '2026-04-02' });
    BlogPosts.create({ title: 'Refactor vs Rebuild', slug: 'refactor-vs-rebuild', excerpt: 'When to refactor and when to start over.', body: '<p>Content here...</p>', cover: '/assets/img/blog/3.jpg', author: 'Grey InfoTech', tags: JSON.stringify(['engineering']), status: 'draft', published_at: null });
    console.log('Blog posts seeded.');

    // --- Conversations / chat ---
    const conv1 = Conversations.create({ client_id: c1.id, subject: 'Weekly sync', last_message: 'Sounds great, talk then!', unread: 1 });
    Messages.create({ conversation_id: conv1.id, sender: 'client', sender_name: 'Ada Okafor', body: 'Hi team, can we move our weekly sync to Thursday?' });
    Messages.create({ conversation_id: conv1.id, sender: 'staff', sender_name: 'Project Manager', body: 'Sure, Thursday 3pm WAT works for us.' });
    Messages.create({ conversation_id: conv1.id, sender: 'client', sender_name: 'Ada Okafor', body: 'Sounds great, talk then!' });
    const conv2 = Conversations.create({ client_id: c2.id, subject: 'Proposal questions', last_message: 'I will review and revert.', unread: 0 });
    Messages.create({ conversation_id: conv2.id, sender: 'client', sender_name: 'Tunde Bello', body: 'Got the proposal, a few questions on timeline.' });
    Messages.create({ conversation_id: conv2.id, sender: 'staff', sender_name: 'Grey InfoTech Admin', body: 'Happy to walk you through it. I will review and revert.' });
    // Register the owning client as a participant in each conversation.
    Participants.add({ conversation_id: conv1.id, participant_type: 'client', participant_id: c1.id, name: 'Ada Okafor' });
    Participants.add({ conversation_id: conv2.id, participant_type: 'client', participant_id: c2.id, name: 'Tunde Bello' });
    console.log('Conversations seeded.');

    // --- Store catalog (products, brands, categories, coupons) ---
    seedStore();

    // --- Announcements (top bar notifications) ---
    Announcements.create({
        message: '🚀 Unlock 25% off Enterprise Audits & Web Solutions this June',
        link_url: 'https://greyinfotech.com.ng/services',
        link_label: 'Explore Offers',
        variant: 'success',
        active: 1,
        starts_at: '2026-06-19',
        ends_at: '2026-06-30',
    });
    console.log('Announcements seeded.');

    // --- Advertisements (home banner) ---
    Ads.create({
        title: 'Grey InfoTech — Enterprise Digital Transformation',
        body: 'Scale your business with world-class audits, custom web apps, and strategic design.',
        image: '/images/ads/enterprise.png',
        link_url: 'https://greyinfotech.com.ng',
        cta_label: 'Start Your Project',
        placement: 'home_banner',
        variant: 'gradient',
        status: 'published',
        active: 1,
        sort_order: 0,
    });
    console.log('Ads seeded.');

    // --- FAQ knowledge base (migrated from legacy inline FAQ sections) ---
    seedFaqs();

    console.log('\n=== SEED COMPLETE ===');
    console.log(`Admin login: ${SEED_ADMIN_EMAIL} / ${SEED_ADMIN_PASSWORD}`);
}

/**
 * Idempotent repair for the core logins. Safe to run on a populated production
 * DB: it never duplicates rows. It guarantees the superadmin and admin accounts
 * exist, are ACTIVE and have the correct passwords from env vars.
 *
 * ⚠️ CRITICAL: All passwords come from environment variables (SEED_*_PASSWORD).
 * If any env var is missing, this function will fail loudly. Never hardcode secrets.
 */
async function ensureCoreAdmins() {
    const team: { name: string; email: string; password: string; role: string }[] = [
        { name: 'Graham Sobiribo Paul', email: SEED_SUPERADMIN_EMAIL, password: SEED_SUPERADMIN_PASSWORD, role: 'superadmin' },
        { name: 'Grey InfoTech Admin', email: SEED_ADMIN_EMAIL, password: SEED_ADMIN_PASSWORD, role: 'admin' },
        { name: 'Project Manager', email: SEED_MANAGER_EMAIL, password: SEED_MANAGER_PASSWORD, role: 'manager' },
        { name: 'Support Agent', email: SEED_STAFF_EMAIL, password: SEED_STAFF_PASSWORD, role: 'staff' },
    ];
    const bcrypt = (await import('bcryptjs')).default;
    // Reset password + activate + VERIFY these trusted built-in admins so they
    // can always log in (login now requires a verified email).
    const repairExisting = db.prepare(
        "UPDATE users SET password_hash=@hash, status='active', email_verified=1, verified_at=COALESCE(verified_at, datetime('now')), updated_at=datetime('now') WHERE lower(email)=lower(@email)"
    );
    for (const t of team) {
        const existing = Users.findByEmail(t.email);
        if (existing) {
            const hash = await bcrypt.hash(t.password, 12);
            repairExisting.run({ email: t.email, hash });
            console.log(`  repaired ${t.email} -> active + verified`);
        } else {
            await Users.create({ name: t.name, email: t.email, password: t.password, role: t.role, email_verified: true, status: 'active' });
            console.log(`  created ${t.email} -> active + verified`);
        }
    }
}

seed()
    .then(() => { db.close(); process.exit(0); })
    .catch((err) => { console.error('Seed failed:', err); process.exit(1); });
