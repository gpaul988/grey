import db from './index';
import { migrate } from './schema';
import {
    Users, Submissions, Leads, Clients, Projects, Tickets, TicketMessages,
    Invoices, CaseStudies, BlogPosts, Conversations, Messages, nextInvoiceNumber,
} from '../models';

const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'hello@greyinfotech.com.ng';
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'GreyAdmin@2026';

async function seed() {
    migrate();
    console.log('Schema migrated.');

    if (Users.count() > 0) {
        console.log('Database already seeded. Skipping. (delete Admin/data/grey.db to re-seed)');
        return;
    }

    // --- Users / team ---
    const admin = await Users.create({
        name: 'Grey InfoTech Admin', email: SEED_ADMIN_EMAIL, password: SEED_ADMIN_PASSWORD, role: 'admin',
        phone: '+234 802 809 5571',
    });
    const manager = await Users.create({ name: 'Project Manager', email: 'pm@greyinfotech.com.ng', password: 'GreyTeam@2026', role: 'manager' });
    await Users.create({ name: 'Support Agent', email: 'support@greyinfotech.com.ng', password: 'GreyTeam@2026', role: 'staff' });
    console.log('Users seeded.');

    // --- Clients ---
    const c1 = Clients.create({ name: 'Ada Okafor', email: 'ada@taskflow.io', company: 'TaskFlow Inc', phone: '+234 803 111 2222', avatar: null });
    const c2 = Clients.create({ name: 'Tunde Bello', email: 'tunde@naijapay.ng', company: 'NaijaPay', phone: '+234 805 333 4444', avatar: null });
    const c3 = Clients.create({ name: 'Grace Eze', email: 'grace@medlink.africa', company: 'MedLink Africa', phone: '+234 807 555 6666', avatar: null });
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
    console.log('Conversations seeded.');

    console.log('\n=== SEED COMPLETE ===');
    console.log(`Admin login: ${SEED_ADMIN_EMAIL} / ${SEED_ADMIN_PASSWORD}`);
}

seed()
    .then(() => { db.close(); process.exit(0); })
    .catch((err) => { console.error('Seed failed:', err); process.exit(1); });
