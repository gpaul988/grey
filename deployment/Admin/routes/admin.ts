import {access} from 'node:fs/promises';
import path from 'node:path';
import express, {type Request, type Response} from 'express';

import {adminPath} from '../config/adminPaths';
import {requirePermission} from '../middleware/authMiddleware';
import {
    Users, Submissions, Leads, Clients, Projects, Tickets, TicketMessages,
    Invoices, CaseStudies, BlogPosts, Partners, ClientReviews, Conversations, Messages, Activity,
    Ads, Subscribers, Announcements, PageSeos, Media, PartnerInquiries, Faqs,
    AuditSubmissions, CareerApplications, JobOpenings,
    dashboardStats, chartData, logActivity,
} from '../models';
import {formatMoney, timeAgo, toInt, str} from '../utils/helpers';
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

const baseLocals = {fmtMoney: formatMoney, timeAgo};

/* ---------------- Dashboard ---------------- */
route.get('/dashboard', async (_req: Request, res: Response) => {
    const stats = await dashboardStats();
    const charts = await chartData(6);
    const recentSubmissions = (await Submissions.all()).slice(0, 6);
    const recentLeads = (await Leads.all()).slice(0, 6);
    const activeProjects = (await Projects.where('status', 'active')).slice(0, 5);
    const recentActivity = (await Activity.all()).slice(0, 8);
    res.render('index', {
        title: 'Dashboard',
        ...baseLocals,
        stats,
        charts,
        recentSubmissions,
        recentLeads,
        activeProjects,
        recentActivity,
    });
});

route.get('/index', (_req, res) => res.redirect(adminPath('/dashboard')));
route.get('/home', (_req, res) => res.redirect(adminPath('/dashboard')));
route.get('/', (_req, res) => res.redirect(adminPath('/dashboard')));

/* ---------------- Data-backed feature pages ---------------- */
route.get('/submissions', requirePermission('submissions.view'), async (_req, res) => {
    res.render('apps-submissions', {title: 'Submissions', ...baseLocals, submissions: await Submissions.all()});
});

route.get('/leads', requirePermission('leads.view'), async (_req, res) => {
    res.render('apps-leads', {title: 'Leads', ...baseLocals, leads: await Leads.all(), users: await Users.all()});
});

route.get('/projects', requirePermission('projects.view'), async (_req, res) => {
    res.render('apps-projects', {
        title: 'Projects', ...baseLocals,
        projects: await Projects.all(),
        clients: await Clients.all(),
        users: await Users.all(),
    });
});

route.get('/tickets', requirePermission('tickets.view'), async (_req, res) => {
    res.render('apps-tickets', {title: 'Tickets', ...baseLocals, tickets: await Tickets.all(), users: await Users.all()});
});

route.get('/ticket/:id', async (req, res, next) => {
    const ticket = await Tickets.find(toInt(req.params.id));
    if (!ticket) return next();
    const messages = (await TicketMessages.where('ticket_id', ticket.id)).reverse();
    res.render('apps-task-details', {
        title: ticket.subject, ...baseLocals, ticket,
        messages,
    });
});

route.get('/invoices', requirePermission('invoices.view'), async (_req, res) => {
    res.render('apps-invoices', {title: 'Invoices', ...baseLocals, invoices: await Invoices.all()});
});

route.get('/invoice/:id', async (req, res, next) => {
    const invoice = await Invoices.find(toInt(req.params.id));
    if (!invoice) return next();
    res.render('apps-invoice-details', {
        title: invoice.number, ...baseLocals, invoice,
        items: JSON.parse(invoice.items || '[]'),
    });
});

route.get('/invoice-create', requirePermission('invoices.manage'), async (_req, res) => {
    res.render('apps-invoice-create', {title: 'Create Invoice', ...baseLocals, clients: await Clients.all()});
});

route.get('/clients', requirePermission('clients.view'), async (_req, res) => {
    res.render('apps-user-contacts', {title: 'Clients', ...baseLocals, clients: await Clients.all()});
});

route.get('/case-studies', requirePermission('casestudies.view'), async (_req, res) => {
    res.render('apps-case-studies', {title: 'Case Studies', ...baseLocals, caseStudies: await CaseStudies.all()});
});

route.get('/blog', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-blog', {title: 'Blog', ...baseLocals, posts: await BlogPosts.all()});
});

route.get('/partners', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-partners', {
        title: 'Partners & Logos', ...baseLocals,
        partners: await Partners.all('sort_order ASC, id ASC')
    });
});

/* ---------------- Marketing & Growth ---------------- */
route.get('/ads', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-ads', {title: 'Ads & Adverts', ...baseLocals, ads: await Ads.all('sort_order ASC, id DESC')});
});
route.get('/faqs', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-faqs', {title: 'FAQ Manager', ...baseLocals, faqs: await Faqs.all('sort_order ASC, id ASC')});
});
route.get('/partner-inquiries', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-partner-inquiries', {
        title: 'Partner Inquiries', ...baseLocals,
        inquiries: await PartnerInquiries.all('created_at DESC')
    });
});
route.get('/subscribers', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-subscribers', {
        title: 'Subscribers', ...baseLocals,
        subscribers: await Subscribers.all('created_at DESC')
    });
});
route.get('/announcement', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-announcement', {
        title: 'Announcement Bar', ...baseLocals,
        announcements: await Announcements.all('created_at DESC')
    });
});
route.get('/media', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-media', {title: 'Media Library', ...baseLocals, media: await Media.all('created_at DESC')});
});
route.get('/seo', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-seo', {title: 'SEO Manager', ...baseLocals, seo: await PageSeos.all('path ASC')});
});
route.get('/analytics', requirePermission('blog.view'), (_req, res) => {
    res.render('apps-analytics', {title: 'Analytics', ...baseLocals});
});
route.get('/reviews', requirePermission('blog.view'), async (_req, res) => {
    res.render('apps-reviews', {
        title: 'Client Reviews', ...baseLocals,
        reviews: await ClientReviews.all('sort_order ASC, id ASC')
    });
});

route.get('/chat', async (req, res) => {
    const conversations = await Conversations.all('updated_at DESC');
    const wanted = toInt(req.query.c);
    const active = (wanted && conversations.find((c) => c.id === wanted)) || conversations[0] || null;
    if (active) await Conversations.update(active.id, {unread: 0});
    res.render('apps-chat', {
        title: 'Client Chat', ...baseLocals, conversations,
        activeConversation: active,
        messages: active ? (await Messages.where('conversation_id', active.id)).reverse() : [],
    });
});

route.get('/team', requirePermission('team.view'), async (_req, res) => {
    const users = await Users.all();
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

route.get('/activity', requirePermission('activity.view'), async (_req, res) => {
    const activity = (await Activity.all()).slice(0, 100);
    res.render('apps-activity', {title: 'Activity Log', ...baseLocals, activity});
});

/* ================================================================
   JOB OPENINGS
   ================================================================ */
route.get('/job-openings', requirePermission('submissions.view'), async (_req, res) => {
    const openings = await JobOpenings.all('created_at DESC');
    res.render('apps-job-openings', {
        title: 'Job Openings',
        ...baseLocals,
        openings,
    });
});

/* ================================================================
   CAREER APPLICATIONS
   ================================================================ */
route.get('/career-applications', requirePermission('submissions.view'), async (req, res) => {
    const formType = str(req.query.form_type as string);
    const status   = str(req.query.status as string);
    let applications = await CareerApplications.all('created_at DESC');
    if (formType) applications = applications.filter((a: Record<string, unknown>) => a.form_type === formType);
    if (status)   applications = applications.filter((a: Record<string, unknown>) => a.status === status);
    const allApps = await CareerApplications.all();
    const cvCount   = allApps.filter((a: Record<string, unknown>) => a.form_type === 'cv_submission').length;
    const introCount = allApps.filter((a: Record<string, unknown>) => a.form_type === 'self_introduction').length;
    res.render('apps-career-applications', {
        title: 'Career Applications',
        ...baseLocals,
        applications,
        cvCount,
        introCount,
    });
});

/* ================================================================
   AUDIT TOOL — passes real data to the view
   ================================================================ */
route.get('/audit', async (_req, res) => {
    const allSubmissions = await AuditSubmissions.all('created_at DESC');

    // Fix requests = submitted via the "Request a Fix" modal (have specific_issues)
    const fixRequests = allSubmissions.filter(
        (s) => s.specific_issues && s.specific_issues.trim().length > 0,
    );

    // Auto-run records = triggered by clicking "Run Audit" (no specific_issues)
    const auditRuns = allSubmissions.filter(
        (s) => !s.specific_issues || s.specific_issues.trim().length === 0,
    );

    res.render('apps-audit', {
        title: 'Audit Tool',
        ...baseLocals,
        auditRuns,
        fixRequests,
        allSubmissions,
        adminPath,
        savedFlash: typeof _req.query.saved !== 'undefined',
        errFlash: typeof _req.query.err !== 'undefined' ? String(_req.query.err) : null,
    });
});

/* ----------------------------------------------------------------
   AUDIT — update a submission's status / notes / proposed solution.
   This is what makes "fix made / resolved" on the backend panel
   actually persist AND register in the activity trail. Works for
   both fix requests and audit runs (same audit_submissions table).
   ================================================================ */
route.post('/audit/update', async (req: Request, res: Response) => {
    const id = toInt(req.body.id);
    if (!id) {
        return res.redirect(adminPath('/audit?err=Missing+submission+id'));
    }

    const existing = await AuditSubmissions.find(id);
    if (!existing) {
        return res.redirect(adminPath('/audit?err=Submission+not+found'));
    }

    const allowedStatuses = ['new', 'in_progress', 'responded', 'resolved', 'closed'];
    const status = typeof req.body.status === 'string' ? req.body.status.trim() : '';
    const adminNotes = typeof req.body.admin_notes === 'string' ? req.body.admin_notes.trim() : '';
    const proposedSolution =
        typeof req.body.proposed_solution === 'string' ? req.body.proposed_solution.trim() : '';

    const updates: Record<string, unknown> = {};
    if (status && allowedStatuses.includes(status)) {
        updates.status = status;
        // Stamp responded_at the first time it moves off "new".
        if (status !== 'new' && !existing.responded_at) {
            updates.responded_at = new Date().toISOString();
        }
    }
    if (req.body.admin_notes !== undefined) updates.admin_notes = adminNotes || null;
    if (req.body.proposed_solution !== undefined) updates.proposed_solution = proposedSolution || null;

    if (Object.keys(updates).length === 0) {
        return res.redirect(adminPath('/audit?err=Nothing+to+update'));
    }

    await AuditSubmissions.update(id, updates);

    // Register the fix/resolution in the backend activity trail so it is
    // auditable — this is the "audit of the audit" the panel was missing.
    try {
        const who = req.session?.user;
        const isFix = existing.specific_issues && existing.specific_issues.trim().length > 0;
        const label = isFix ? 'fix request' : 'audit run';
        logActivity({
            user_id: who?.id ?? null,
            user_name: who?.name ?? 'System',
            action: status ? `Set ${label} status to "${status}"` : `Updated ${label}`,
            entity: 'audit_submission',
            entity_id: id,
            detail: [
                existing.website || existing.github_repo || '',
                proposedSolution ? `Solution: ${proposedSolution}` : '',
            ].filter(Boolean).join(' · '),
        });
    } catch {
        /* activity logging is best-effort */
    }

    return res.redirect(adminPath('/audit?saved=1'));
});

route.get('/profile', async (req, res) => {
    const u = req.session.user ? await Users.find(req.session.user.id) : null;
    res.render('apps-user-profile', {
        title: 'My Profile', ...baseLocals, profile: u,
        flash: typeof req.query.saved !== 'undefined' ? 'Profile updated.' : null,
        flashError: typeof req.query.err !== 'undefined' ? String(req.query.err) : null,
        csrfToken: res.locals.csrfToken || '',
    });
});

route.post('/profile/avatar', (req, res) => {
    const sessionUser = req.session.user;
    if (!sessionUser) return res.redirect(adminPath('/profile'));
    
    const file = (req as Request & { file?: { filename: string } }).file;
    if (!file) return res.redirect(adminPath('/profile?err=No file selected'));
    
    (async () => {
        const url = publicUrl('avatars', file.filename);
        const updated = await Users.update(sessionUser.id, {avatar: url});
        if (updated) {
            req.session.user = {...sessionUser, avatar: url};
            logActivity({
                user_id: sessionUser.id,
                user_name: sessionUser.name,
                action: 'update',
                entity: 'avatar',
                entity_id: sessionUser.id,
            });
        }
        res.redirect(adminPath('/profile?saved=1'));
    })().catch((err) => {
        const msg = err instanceof Error ? err.message : 'Update failed';
        res.redirect(adminPath(`/profile?err=${encodeURIComponent(msg)}`));
    });
});

/* ---------------- Site Settings ---------------- */
route.get('/settings', requirePermission('settings.manage'), async (_req, res) => {
    res.render('admin-settings', {
        title: 'Site Settings',
        ...baseLocals,
        settings: await SiteSettings.all(),
        permissions: PERMISSIONS,
    });
});

/* ---------------- Store sub-routes ---------------- */
route.use('/store', storeRoutes);

/* ---------------- Generic template view fallback ---------------- */
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