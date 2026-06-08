import express, { type Request, type Response } from 'express';
import { ensureApiAuth, requireRole } from '../middleware/authMiddleware';
import {
    Users, Submissions, Leads, Clients, Projects, Tickets, TicketMessages,
    Invoices, CaseStudies, BlogPosts, Conversations, Messages,
    logActivity, nextInvoiceNumber, dashboardStats,
} from '../models';
import { slugify, str, toFloat, toInt, isEmail } from '../utils/helpers';

const api = express.Router();
api.use(ensureApiAuth);

const ok = (res: Response, data: unknown = null, message = 'OK') => res.json({ ok: true, message, data });
const fail = (res: Response, message: string, status = 400) => res.status(status).json({ ok: false, message });
const actor = (req: Request) => ({ user_id: req.session.user?.id ?? null, user_name: req.session.user?.name ?? null });

/* ---------------- Dashboard ---------------- */
api.get('/stats', (_req, res) => ok(res, dashboardStats()));

/* ---------------- Submissions ---------------- */
api.get('/submissions', (req, res) => {
    const status = str(req.query.status);
    const rows = status ? Submissions.where('status', status) : Submissions.all();
    ok(res, rows);
});
api.get('/submissions/:id', (req, res) => {
    const row = Submissions.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.patch('/submissions/:id', (req, res) => {
    const updated = Submissions.update(toInt(req.params.id), { status: str(req.body.status) });
    if (!updated) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'submission', entity_id: updated.id, detail: `status=${updated.status}` });
    ok(res, updated, 'Submission updated');
});
api.delete('/submissions/:id', (req, res) => {
    Submissions.delete(toInt(req.params.id));
    logActivity({ ...actor(req), action: 'delete', entity: 'submission', entity_id: toInt(req.params.id) });
    ok(res, null, 'Submission deleted');
});

/* ---------------- Leads ---------------- */
api.get('/leads', (req, res) => {
    const stage = str(req.query.stage);
    ok(res, stage ? Leads.where('stage', stage) : Leads.all());
});
api.get('/leads/:id', (req, res) => {
    const row = Leads.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.post('/leads', (req, res) => {
    const name = str(req.body.name);
    const email = str(req.body.email);
    if (!name || !email) return fail(res, 'Name and email are required');
    if (!isEmail(email)) return fail(res, 'Invalid email');
    const row = Leads.create({
        name, email, company: str(req.body.company), phone: str(req.body.phone),
        source: str(req.body.source) || 'website', stage: str(req.body.stage) || 'new',
        value: toFloat(req.body.value), owner_id: req.body.owner_id ? toInt(req.body.owner_id) : null,
        notes: str(req.body.notes),
    });
    logActivity({ ...actor(req), action: 'create', entity: 'lead', entity_id: row.id, detail: name });
    ok(res, row, 'Lead created');
});
api.patch('/leads/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['name', 'email', 'company', 'phone', 'source', 'stage', 'notes'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    if ('value' in req.body) data.value = toFloat(req.body.value);
    if ('owner_id' in req.body) data.owner_id = req.body.owner_id ? toInt(req.body.owner_id) : null;
    const row = Leads.update(toInt(req.params.id), data);
    if (!row) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'lead', entity_id: row.id });
    ok(res, row, 'Lead updated');
});
api.delete('/leads/:id', (req, res) => {
    Leads.delete(toInt(req.params.id));
    logActivity({ ...actor(req), action: 'delete', entity: 'lead', entity_id: toInt(req.params.id) });
    ok(res, null, 'Lead deleted');
});

/* ---------------- Clients ---------------- */
api.get('/clients', (_req, res) => ok(res, Clients.all()));
api.post('/clients', (req, res) => {
    const name = str(req.body.name); const email = str(req.body.email);
    if (!name || !email) return fail(res, 'Name and email are required');
    if (Clients.findBy('email', email.toLowerCase())) return fail(res, 'Client with this email exists');
    const row = Clients.create({ name, email: email.toLowerCase(), company: str(req.body.company), phone: str(req.body.phone), avatar: null });
    logActivity({ ...actor(req), action: 'create', entity: 'client', entity_id: row.id });
    ok(res, row, 'Client created');
});
api.patch('/clients/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['name', 'email', 'company', 'phone'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    const row = Clients.update(toInt(req.params.id), data);
    return row ? ok(res, row, 'Client updated') : fail(res, 'Not found', 404);
});
api.delete('/clients/:id', (req, res) => { Clients.delete(toInt(req.params.id)); ok(res, null, 'Client deleted'); });

/* ---------------- Projects ---------------- */
api.get('/projects', (req, res) => {
    const status = str(req.query.status);
    ok(res, status ? Projects.where('status', status) : Projects.all());
});
api.get('/projects/:id', (req, res) => {
    const row = Projects.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.post('/projects', (req, res) => {
    const name = str(req.body.name);
    if (!name) return fail(res, 'Project name is required');
    const row = Projects.create({
        name, client_id: req.body.client_id ? toInt(req.body.client_id) : null, client_name: str(req.body.client_name),
        status: str(req.body.status) || 'planning', progress: toInt(req.body.progress), budget: toFloat(req.body.budget),
        start_date: str(req.body.start_date) || null, end_date: str(req.body.end_date) || null,
        description: str(req.body.description), manager_id: req.body.manager_id ? toInt(req.body.manager_id) : null,
    });
    logActivity({ ...actor(req), action: 'create', entity: 'project', entity_id: row.id, detail: name });
    ok(res, row, 'Project created');
});
api.patch('/projects/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['name', 'client_name', 'status', 'description', 'start_date', 'end_date'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    if ('progress' in req.body) data.progress = toInt(req.body.progress);
    if ('budget' in req.body) data.budget = toFloat(req.body.budget);
    if ('client_id' in req.body) data.client_id = req.body.client_id ? toInt(req.body.client_id) : null;
    if ('manager_id' in req.body) data.manager_id = req.body.manager_id ? toInt(req.body.manager_id) : null;
    const row = Projects.update(toInt(req.params.id), data);
    if (!row) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'project', entity_id: row.id });
    ok(res, row, 'Project updated');
});
api.delete('/projects/:id', (req, res) => {
    Projects.delete(toInt(req.params.id));
    logActivity({ ...actor(req), action: 'delete', entity: 'project', entity_id: toInt(req.params.id) });
    ok(res, null, 'Project deleted');
});

/* ---------------- Tickets ---------------- */
api.get('/tickets', (req, res) => {
    const status = str(req.query.status);
    ok(res, status ? Tickets.where('status', status) : Tickets.all());
});
api.get('/tickets/:id', (req, res) => {
    const ticket = Tickets.find(toInt(req.params.id));
    if (!ticket) return fail(res, 'Not found', 404);
    const messages = TicketMessages.where('ticket_id', ticket.id).reverse();
    ok(res, { ticket, messages });
});
api.post('/tickets', (req, res) => {
    const subject = str(req.body.subject); const requester = str(req.body.requester);
    if (!subject || !requester) return fail(res, 'Subject and requester are required');
    const row = Tickets.create({
        subject, requester, requester_email: str(req.body.requester_email),
        priority: str(req.body.priority) || 'medium', status: 'open',
        assignee_id: req.body.assignee_id ? toInt(req.body.assignee_id) : null, body: str(req.body.body),
    });
    logActivity({ ...actor(req), action: 'create', entity: 'ticket', entity_id: row.id, detail: subject });
    ok(res, row, 'Ticket created');
});
api.patch('/tickets/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['subject', 'priority', 'status'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    if ('assignee_id' in req.body) data.assignee_id = req.body.assignee_id ? toInt(req.body.assignee_id) : null;
    const row = Tickets.update(toInt(req.params.id), data);
    if (!row) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'ticket', entity_id: row.id });
    ok(res, row, 'Ticket updated');
});
api.post('/tickets/:id/reply', (req, res) => {
    const ticket = Tickets.find(toInt(req.params.id));
    if (!ticket) return fail(res, 'Not found', 404);
    const body = str(req.body.body);
    if (!body) return fail(res, 'Message body required');
    const msg = TicketMessages.create({ ticket_id: ticket.id, author: req.session.user?.name || 'Staff', is_staff: 1, body });
    Tickets.update(ticket.id, { status: 'pending' });
    ok(res, msg, 'Reply added');
});
api.delete('/tickets/:id', (req, res) => { Tickets.delete(toInt(req.params.id)); ok(res, null, 'Ticket deleted'); });

/* ---------------- Invoices ---------------- */
api.get('/invoices', (req, res) => {
    const status = str(req.query.status);
    ok(res, status ? Invoices.where('status', status) : Invoices.all());
});
api.get('/invoices/:id', (req, res) => {
    const row = Invoices.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.post('/invoices', (req, res) => {
    const client_name = str(req.body.client_name);
    if (!client_name) return fail(res, 'Client name is required');
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const amount = items.reduce((s: number, it: { qty?: number; rate?: number }) => s + (toFloat(it.qty) * toFloat(it.rate)), 0);
    const tax = toFloat(req.body.tax);
    const row = Invoices.create({
        number: nextInvoiceNumber(), client_id: req.body.client_id ? toInt(req.body.client_id) : null,
        client_name, client_email: str(req.body.client_email), amount, tax, total: amount + tax,
        currency: str(req.body.currency) || 'NGN', status: str(req.body.status) || 'draft',
        issued_date: str(req.body.issued_date) || null, due_date: str(req.body.due_date) || null,
        items: JSON.stringify(items), notes: str(req.body.notes),
    });
    logActivity({ ...actor(req), action: 'create', entity: 'invoice', entity_id: row.id, detail: row.number });
    ok(res, row, 'Invoice created');
});
api.patch('/invoices/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['client_name', 'client_email', 'currency', 'status', 'issued_date', 'due_date', 'notes'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    if ('items' in req.body && Array.isArray(req.body.items)) {
        const amount = req.body.items.reduce((s: number, it: { qty?: number; rate?: number }) => s + (toFloat(it.qty) * toFloat(it.rate)), 0);
        data.items = JSON.stringify(req.body.items);
        data.amount = amount;
        data.total = amount + toFloat(req.body.tax);
        data.tax = toFloat(req.body.tax);
    }
    const row = Invoices.update(toInt(req.params.id), data);
    if (!row) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'invoice', entity_id: row.id });
    ok(res, row, 'Invoice updated');
});
api.delete('/invoices/:id', (req, res) => { Invoices.delete(toInt(req.params.id)); ok(res, null, 'Invoice deleted'); });

/* ---------------- Case studies ---------------- */
api.get('/case-studies', (_req, res) => ok(res, CaseStudies.all()));
api.post('/case-studies', (req, res) => {
    const title = str(req.body.title);
    if (!title) return fail(res, 'Title is required');
    let slug = str(req.body.slug) || slugify(title);
    if (CaseStudies.findBy('slug', slug)) slug = `${slug}-${Date.now().toString(36)}`;
    const row = CaseStudies.create({
        title, slug, client: str(req.body.client), industry: str(req.body.industry),
        summary: str(req.body.summary), body: str(req.body.body), image: str(req.body.image),
        results: str(req.body.results), published: req.body.published ? 1 : 0,
    });
    logActivity({ ...actor(req), action: 'create', entity: 'case_study', entity_id: row.id, detail: title });
    ok(res, row, 'Case study created');
});
api.patch('/case-studies/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['title', 'client', 'industry', 'summary', 'body', 'image', 'results'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    if ('published' in req.body) data.published = req.body.published ? 1 : 0;
    const row = CaseStudies.update(toInt(req.params.id), data);
    return row ? ok(res, row, 'Case study updated') : fail(res, 'Not found', 404);
});
api.delete('/case-studies/:id', (req, res) => { CaseStudies.delete(toInt(req.params.id)); ok(res, null, 'Case study deleted'); });

/* ---------------- Blog ---------------- */
api.get('/blog', (_req, res) => ok(res, BlogPosts.all()));
api.get('/blog/:id', (req, res) => {
    const row = BlogPosts.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.post('/blog', (req, res) => {
    const title = str(req.body.title);
    if (!title) return fail(res, 'Title is required');
    let slug = str(req.body.slug) || slugify(title);
    if (BlogPosts.findBy('slug', slug)) slug = `${slug}-${Date.now().toString(36)}`;
    const status = str(req.body.status) || 'draft';
    const tags = Array.isArray(req.body.tags) ? req.body.tags : str(req.body.tags).split(',').map((t) => t.trim()).filter(Boolean);
    const row = BlogPosts.create({
        title, slug, excerpt: str(req.body.excerpt), body: str(req.body.body), cover: str(req.body.cover),
        author: str(req.body.author) || 'Grey InfoTech', tags: JSON.stringify(tags), status,
        published_at: status === 'published' ? (str(req.body.published_at) || new Date().toISOString().slice(0, 10)) : null,
    });
    logActivity({ ...actor(req), action: 'create', entity: 'blog_post', entity_id: row.id, detail: title });
    ok(res, row, 'Post created');
});
api.patch('/blog/:id', (req, res) => {
    const data: Record<string, unknown> = {};
    ['title', 'excerpt', 'body', 'cover', 'author', 'status', 'published_at'].forEach((f) => { if (f in req.body) data[f] = str(req.body[f]); });
    if ('tags' in req.body) {
        const tags = Array.isArray(req.body.tags) ? req.body.tags : str(req.body.tags).split(',').map((t) => t.trim()).filter(Boolean);
        data.tags = JSON.stringify(tags);
    }
    if (data.status === 'published' && !data.published_at) data.published_at = new Date().toISOString().slice(0, 10);
    const row = BlogPosts.update(toInt(req.params.id), data);
    if (!row) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'blog_post', entity_id: row.id });
    ok(res, row, 'Post updated');
});
api.delete('/blog/:id', (req, res) => { BlogPosts.delete(toInt(req.params.id)); ok(res, null, 'Post deleted'); });

/* ---------------- Conversations / chat ---------------- */
api.get('/conversations', (_req, res) => ok(res, Conversations.all('updated_at DESC')));
api.get('/conversations/:id', (req, res) => {
    const conv = Conversations.find(toInt(req.params.id));
    if (!conv) return fail(res, 'Not found', 404);
    const messages = Messages.where('conversation_id', conv.id).reverse();
    Conversations.update(conv.id, { unread: 0 });
    ok(res, { conversation: conv, messages });
});
api.post('/conversations/:id/messages', (req, res) => {
    const conv = Conversations.find(toInt(req.params.id));
    if (!conv) return fail(res, 'Not found', 404);
    const body = str(req.body.body);
    if (!body) return fail(res, 'Message body required');
    const msg = Messages.create({ conversation_id: conv.id, sender: 'staff', sender_name: req.session.user?.name || 'Staff', body });
    Conversations.update(conv.id, { last_message: body, unread: 0 });
    ok(res, msg, 'Message sent');
});

/* ---------------- Self profile (any logged-in user) ---------------- */
api.patch('/me', async (req, res) => {
    const id = req.session.user?.id;
    if (!id) return fail(res, 'Not authenticated', 401);
    const data: { name?: string; email?: string; phone?: string; password?: string } = {};
    ['name', 'email', 'phone'].forEach((f) => { if (f in req.body) (data as Record<string, string>)[f] = str(req.body[f]); });
    if (data.email && !isEmail(data.email)) return fail(res, 'Invalid email');
    if (str(req.body.password)) {
        if (str(req.body.password).length < 8) return fail(res, 'Password must be at least 8 characters');
        data.password = str(req.body.password);
    }
    const user = await Users.update(id, data);
    if (!user) return fail(res, 'Not found', 404);
    // keep session in sync
    if (req.session.user) {
        req.session.user.name = user.name;
        req.session.user.email = user.email;
    }
    logActivity({ ...actor(req), action: 'update', entity: 'profile', entity_id: id });
    ok(res, user, 'Profile updated');
});

/* ---------------- Users / team ---------------- */
api.get('/users', requireRole('admin', 'manager'), (_req, res) => ok(res, Users.all()));
api.post('/users', requireRole('admin'), async (req, res) => {
    const name = str(req.body.name); const email = str(req.body.email); const password = str(req.body.password);
    if (!name || !email || !password) return fail(res, 'Name, email and password are required');
    if (!isEmail(email)) return fail(res, 'Invalid email');
    if (password.length < 8) return fail(res, 'Password must be at least 8 characters');
    if (Users.findByEmail(email.toLowerCase())) return fail(res, 'A user with this email already exists');
    const user = await Users.create({ name, email, password, role: str(req.body.role) || 'staff', phone: str(req.body.phone) });
    logActivity({ ...actor(req), action: 'create', entity: 'user', entity_id: user.id, detail: email });
    ok(res, user, 'User created');
});
api.patch('/users/:id', requireRole('admin'), async (req, res) => {
    const data: { name?: string; email?: string; role?: string; phone?: string; status?: string; password?: string } = {};
    ['name', 'email', 'role', 'phone', 'status'].forEach((f) => { if (f in req.body) (data as Record<string, string>)[f] = str(req.body[f]); });
    if (str(req.body.password)) data.password = str(req.body.password);
    const user = await Users.update(toInt(req.params.id), data);
    if (!user) return fail(res, 'Not found', 404);
    logActivity({ ...actor(req), action: 'update', entity: 'user', entity_id: user.id });
    ok(res, user, 'User updated');
});
api.delete('/users/:id', requireRole('admin'), (req, res) => {
    const id = toInt(req.params.id);
    if (id === req.session.user?.id) return fail(res, 'You cannot delete your own account');
    Users.delete(id);
    logActivity({ ...actor(req), action: 'delete', entity: 'user', entity_id: id });
    ok(res, null, 'User deleted');
});

export default api;
