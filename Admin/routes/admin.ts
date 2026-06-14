import {access} from 'node:fs/promises';
import path from 'node:path';
import express, {type Request, type Response} from 'express';

import {adminPath} from '../config/adminPaths';
import {requirePermission} from '../middleware/authMiddleware';
import {
    Users, Submissions, Leads, Clients, Projects, Tickets, TicketMessages,
    Invoices, CaseStudies, BlogPosts, Partners, ClientReviews, Conversations, Messages, Activity,
    dashboardStats, chartData, logActivity,
} from '../models';
import {formatMoney, timeAgo, toInt} from '../utils/helpers';
import {avatarUpload, publicUrl} from '../config/uploads';
import {PERMISSIONS, effectivePermissions} from '../config/permissions';
import {SiteSettings} from '../models/settings';
import storeRoutes from './store';

const route = express.Router();
const viewsRoot = path.join(process.cwd(), 'Admin', 'views');

const toTitle = (slug: string) =>
    slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

const canRenderView = async (viewName: string) => {
    if (!/^[a-z0-9-]+$/i.test(viewName)) return false;
    try {
        await access(path.join(viewsRoot, `${viewName}.ejs`));
        return true;
    } catch {
        return false;
    }
};

/* Shared helpers exposed to every view */
const baseLocals = {fmtMoney: formatMoney, timeAgo};

/* ---------------- Dashboard ---------------- */
route.get('/dashboard', (_req: Request, res: Response) => {
    const stats = dashboardStats();
    res.render('index', {
        title: 'Dashboard',
        ...baseLocals,
        stats,
        charts: chartData(6),
        recentSubmissions: Submissions.all().slice(0, 6),
        recentLeads: Leads.all().slice(0, 6),
        activeProjects: Projects.where('status', 'active').slice(0, 5),
        recentActivity: Activity.all().slice(0, 8),
    });
});

route.get('/index', (_req, res) => res.redirect(adminPath('/dashboard')));
route.get('/home', (_req, res) => res.redirect(adminPath('/dashboard')));
route.get('/', (_req, res) => res.redirect(adminPath('/dashboard')));

/* ---------------- Data-backed feature pages ---------------- */
route.get('/submissions', requirePermission('submissions.view'), (_req, res) => {
    res.render('apps-submissions', {title: 'Submissions', ...baseLocals, submissions: Submissions.all()});
});

route.get('/leads', requirePermission('leads.view'), (_req, res) => {
    res.render('apps-leads', {title: 'Leads', ...baseLocals, leads: Leads.all(), users: Users.all()});
});

route.get('/projects', requirePermission('projects.view'), (_req, res) => {
    res.render('apps-projects', {
        title: 'Projects', ...baseLocals,
        projects: Projects.all(),
        clients: Clients.all(),
        users: Users.all()
    });
});

route.get('/tickets', requirePermission('tickets.view'), (_req, res) => {
    res.render('apps-tickets', {title: 'Tickets', ...baseLocals, tickets: Tickets.all(), users: Users.all()});
});

route.get('/ticket/:id', (req, res, next) => {
    const ticket = Tickets.find(toInt(req.params.id));
    if (!ticket) return next();
    res.render('apps-task-details', {
        title: ticket.subject, ...baseLocals, ticket,
        messages: TicketMessages.where('ticket_id', ticket.id).reverse(),
    });
});

route.get('/invoices', requirePermission('invoices.view'), (_req, res) => {
    res.render('apps-invoices', {title: 'Invoices', ...baseLocals, invoices: Invoices.all()});
});

route.get('/invoice/:id', (req, res, next) => {
    const invoice = Invoices.find(toInt(req.params.id));
    if (!invoice) return next();
    res.render('apps-invoice-details', {
        title: invoice.number, ...baseLocals, invoice,
        items: JSON.parse(invoice.items || '[]'),
    });
});

route.get('/invoice-create', requirePermission('invoices.manage'), (_req, res) => {
    res.render('apps-invoice-create', {title: 'Create Invoice', ...baseLocals, clients: Clients.all()});
});

route.get('/clients', requirePermission('clients.view'), (_req, res) => {
    res.render('apps-user-contacts', {title: 'Clients', ...baseLocals, clients: Clients.all()});
});

route.get('/case-studies', requirePermission('casestudies.view'), (_req, res) => {
    res.render('apps-case-studies', {title: 'Case Studies', ...baseLocals, caseStudies: CaseStudies.all()});
});

route.get('/blog', requirePermission('blog.view'), (_req, res) => {
    res.render('apps-blog', {title: 'Blog', ...baseLocals, posts: BlogPosts.all()});
});

route.get('/partners', requirePermission('blog.view'), (_req, res) => {
    res.render('apps-partners', {title: 'Partners & Logos', ...baseLocals, partners: Partners.all('sort_order ASC, id ASC')});
});

route.get('/reviews', requirePermission('blog.view'), (_req, res) => {
    res.render('apps-reviews', {title: 'Client Reviews', ...baseLocals, reviews: ClientReviews.all('sort_order ASC, id ASC')});
});

route.get('/chat', (req, res) => {
    const conversations = Conversations.all('updated_at DESC');
    const wanted = toInt(req.query.c);
    const active = (wanted && conversations.find((c) => c.id === wanted)) || conversations[0] || null;
    if (active) Conversations.update(active.id, {unread: 0});
    res.render('apps-chat', {
        title: 'Client Chat', ...baseLocals, conversations,
        activeConversation: active,
        messages: active ? Messages.where('conversation_id', active.id).reverse() : [],
    });
});

route.get('/team', requirePermission('team.view'), (_req, res) => {
    const users = Users.all();
    // Compute each user's effective permission set so the UI can pre-check boxes.
    const effective: Record<number, string[]> = {};
    for (const u of users) {
        effective[u.id] = Array.from(effectivePermissions(u.role, u.permissions));
    }
    res.render('apps-team', {
        title: 'Team', ...baseLocals, users,
        permissionDefs: PERMISSIONS,
        effectivePerms: effective,
    });
});

route.get('/activity', requirePermission('activity.view'), (_req, res) => {
    res.render('apps-activity', {title: 'Activity Log', ...baseLocals, activity: Activity.all().slice(0, 100)});
});

route.get('/audit', (_req, res) => {
    res.render('apps-audit', {title: 'Audit Tool', ...baseLocals});
});

route.get('/profile', (req, res) => {
    const u = req.session.user ? Users.find(req.session.user.id) : null;
    res.render('apps-user-profile', {
        title: 'My Profile', ...baseLocals, profile: u,
        flash: typeof req.query.saved !== 'undefined' ? 'Profile updated.' : null,
        flashError: typeof req.query.err !== 'undefined' ? String(req.query.err) : null,
    });
});

/* Upload / replace own avatar. */
route.post('/profile/avatar', (req, res) => {
    const sessionUser = req.session.user;
    if (!sessionUser) return res.redirect(adminPath('/profile'));
    avatarUpload.single('avatar')(req, res, async (err: unknown) => {
        if (err) {
            const msg = err instanceof Error ? err.message : 'Upload failed';
            return res.redirect(adminPath(`/profile?err=${encodeURIComponent(msg)}`));
        }
        const file = (req as Request & { file?: { filename: string } }).file;
        if (!file) return res.redirect(adminPath('/profile?err=No file selected'));
        const url = publicUrl('avatars', file.filename);
        const updated = await Users.update(sessionUser.id, {avatar: url});
        if (updated) {
            req.session.user = {...sessionUser, avatar: url};
            logActivity({
                user_id: sessionUser.id,
                user_name: sessionUser.name,
                action: 'update',
                entity: 'avatar',
                entity_id: sessionUser.id
            });
        }
        res.redirect(adminPath('/profile?saved=1'));
    });
});

/* ---------------- Site Settings ---------------- */
route.get('/settings', requirePermission('settings.manage'), (_req, res) => {
    res.render('admin-settings', {
        title: 'Site Settings',
        ...baseLocals,
        settings: SiteSettings.all(),
        permissions: PERMISSIONS,
    });
});

/* ---------------- Store sub-routes ---------------- */
route.use('/store', storeRoutes);

/* ---------------- Generic template view fallback (demo pages) ---------------- */
route.get('/:viewName', async (req: Request, res: Response, next) => {
    const raw = req.params.viewName;
    const viewName = Array.isArray(raw) ? raw[0] : raw;
    if (!viewName || ['dashboard', 'index', 'home'].includes(viewName)) return next();
    if (!(await canRenderView(viewName))) return next();
    return res.render(viewName, {title: toTitle(viewName), ...baseLocals});
});

route.use((_req, res) => {
    res.status(404).render('error-404', {title: 'Page not found', layout: 'partials/base-layout'});
});

export default route;