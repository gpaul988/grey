import express, {type Request, type Response} from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import fs from 'node:fs';
import {ensureApiAuth, requireRole, requirePermission} from '../middleware/authMiddleware';
import {
    Users, Submissions, Leads, Clients, Projects, Tickets, TicketMessages,
    Invoices, CaseStudies, BlogPosts, Partners, ClientReviews, Conversations, Messages,
    Products, ProductCategories, ProductBrands, Customers, Orders, ProductReviews, Coupons,
    Verification,
    Ads, Subscribers, Announcements, PageSeos, AnalyticsEvents, Media,
    PartnerInquiries, Faqs,
    AuditSubmissions, CareerApplications, JobOpenings,
    logActivity, nextInvoiceNumber, dashboardStats,
} from '../models';
import {slugify, str, toFloat, toInt, isEmail} from '../utils/helpers';
import {adUpload, mediaUpload, publicUrl} from '../config/uploads';
import {sendSetPasswordEmail, smtpConfigured, appOrigin} from '../utils/mailer';
import {ALL_KEYS, roleDefaults, type Role} from '../config/permissions';
import {SiteSettings} from '../models/settings';
import {broadcast, broadcastStats} from './sse';
import twoFaRoutes from './twofa';

const api = express.Router();
api.use(ensureApiAuth);
api.use('/2fa', twoFaRoutes);

const ok = (res: Response, data: unknown = null, message = 'OK') =>
    res.json({ok: true, message, data});
const fail = (res: Response, message: string, status = 400) =>
    res.status(status).json({ok: false, message});
const actor = (req: Request) => ({
    user_id: req.session.user?.id ?? null,
    user_name: req.session.user?.name ?? null,
});

/* ---------------- Dashboard ---------------- */
api.get('/stats', (_req, res) => ok(res, dashboardStats()));

/* ---------------- Submissions ---------------- */
api.get('/submissions', (req, res) => {
    const status = str(req.query.status);
    ok(res, status ? Submissions.where('status', status) : Submissions.all());
});
api.get('/submissions/:id', (req, res) => {
    const row = Submissions.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.delete('/submissions/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Submissions.find(id);
        if (!row) return fail(res, 'Submission not found', 404);
        Submissions.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'submission', entity_id: id });
        ok(res, { id, deleted: true }, 'Submission deleted successfully');
    } catch (err) {
        console.error('[DELETE /submissions/:id]', err);
        fail(res, 'Failed to delete submission', 500);
    }
});
api.post('/submissions/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Submissions.find(id);
            if (row) {
                Submissions.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'submission', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} submission(s)`);
    } catch (err) {
        console.error('[POST /submissions/bulk-delete]', err);
        fail(res, 'Failed to delete submissions', 500);
    }
});

/* ---------------- Job Openings (admin CRUD) ---------------- */
api.get('/job-openings', (req, res) => {
    const status = str(req.query.status);
    const all = JobOpenings.all('created_at DESC');
    ok(res, status ? all.filter((j: Record<string, unknown>) => j.status === status) : all);
});
api.get('/job-openings/:id', (req, res) => {
    const row = JobOpenings.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.post('/job-openings', (req, res) => {
    const b = req.body as Record<string, unknown>;
    const required = ['title'];
    for (const f of required) {
        if (!b[f]) return fail(res, `Missing field: ${f}`);
    }
    const toJsonArr = (v: unknown) => {
        if (Array.isArray(v)) return JSON.stringify(v);
        if (typeof v === 'string') {
            try { return JSON.stringify(JSON.parse(v)); } catch { return JSON.stringify(v.split('\n').map(s => s.trim()).filter(Boolean)); }
        }
        return '[]';
    };
    const job = JobOpenings.create({
        title: String(b.title || ''),
        department: String(b.department || ''),
        location: String(b.location || 'Remote'),
        type: String(b.type || 'full-time'),
        experience_level: String(b.experience_level || ''),
        salary_range: String(b.salary_range || ''),
        description: String(b.description || ''),
        responsibilities: toJsonArr(b.responsibilities),
        requirements: toJsonArr(b.requirements),
        nice_to_have: toJsonArr(b.nice_to_have),
        benefits: toJsonArr(b.benefits),
        status: String(b.status || 'draft'),
        deadline: b.deadline ? String(b.deadline) : null,
    });
    logActivity({ ...actor(req), action: 'create', entity: 'job_opening', entity_id: job.id, detail: String(b.title) });
    ok(res, job, 'Job opening created');
});
api.put('/job-openings/:id', (req, res) => {
    const id = toInt(req.params.id);
    const row = JobOpenings.find(id);
    if (!row) return fail(res, 'Not found', 404);
    const b = req.body as Record<string, unknown>;
    const toJsonArr = (v: unknown, fallback: string) => {
        if (!v) return fallback;
        if (Array.isArray(v)) return JSON.stringify(v);
        if (typeof v === 'string') {
            try { return JSON.stringify(JSON.parse(v)); } catch { return JSON.stringify(v.split('\n').map(s => s.trim()).filter(Boolean)); }
        }
        return fallback;
    };
    JobOpenings.update(id, {
        title: String(b.title || row.title),
        department: String(b.department ?? row.department),
        location: String(b.location ?? row.location),
        type: String(b.type ?? row.type),
        experience_level: String(b.experience_level ?? row.experience_level),
        salary_range: String(b.salary_range ?? row.salary_range),
        description: String(b.description ?? row.description),
        responsibilities: toJsonArr(b.responsibilities, String(row.responsibilities)),
        requirements: toJsonArr(b.requirements, String(row.requirements)),
        nice_to_have: toJsonArr(b.nice_to_have, String(row.nice_to_have)),
        benefits: toJsonArr(b.benefits, String(row.benefits)),
        status: String(b.status ?? row.status),
        deadline: b.deadline !== undefined ? (b.deadline ? String(b.deadline) : null) : row.deadline,
    });
    logActivity({ ...actor(req), action: 'update', entity: 'job_opening', entity_id: id, detail: String(b.title || row.title) });
    ok(res, null, 'Updated');
});
api.delete('/job-openings/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = JobOpenings.find(id);
        if (!row) return fail(res, 'Job opening not found', 404);
        JobOpenings.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'job_opening', entity_id: id });
        ok(res, { id, deleted: true }, 'Job opening deleted successfully');
    } catch (err) {
        console.error('[DELETE /job-openings/:id]', err);
        fail(res, 'Failed to delete job opening', 500);
    }
});

/** Bulk delete job openings - accepts array of IDs */
api.post('/job-openings/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = JobOpenings.find(id);
            if (row) {
                JobOpenings.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'job_opening', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} job opening(s)`);
    } catch (err) {
        console.error('[POST /job-openings/bulk-delete]', err);
        fail(res, 'Failed to delete job openings', 500);
    }
});

/* ---------------- Career Applications ---------------- */
api.get('/career-applications', (req, res) => {
    const status = str(req.query.status);
    const formType = str(req.query.form_type);
    let apps = CareerApplications.all('created_at DESC');
    if (status) apps = apps.filter((a: Record<string, unknown>) => a.status === status);
    if (formType) apps = apps.filter((a: Record<string, unknown>) => a.form_type === formType);
    ok(res, apps);
});
api.get('/career-applications/:id', (req, res) => {
    const row = CareerApplications.find(toInt(req.params.id));
    return row ? ok(res, row) : fail(res, 'Not found', 404);
});
api.patch('/career-applications/:id', (req, res) => {
    const id = toInt(req.params.id);
    const { status, admin_notes } = req.body as { status?: string; admin_notes?: string };
    const row = CareerApplications.find(id);
    if (!row) return fail(res, 'Not found', 404);
    CareerApplications.update(id, { status: status ?? row.status, admin_notes: admin_notes ?? row.admin_notes });
    ok(res, null, 'Updated');
});
api.delete('/career-applications/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = CareerApplications.find(id);
        if (!row) return fail(res, 'Career application not found', 404);
        CareerApplications.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'career_application', entity_id: id });
        ok(res, { id, deleted: true }, 'Career application deleted successfully');
    } catch (err) {
        console.error('[DELETE /career-applications/:id]', err);
        fail(res, 'Failed to delete career application', 500);
    }
});

/** Bulk delete career applications - accepts array of IDs */
api.post('/career-applications/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = CareerApplications.find(id);
            if (row) {
                CareerApplications.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'career_application', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} career application(s)`);
    } catch (err) {
        console.error('[POST /career-applications/bulk-delete]', err);
        fail(res, 'Failed to delete career applications', 500);
    }
});

/* ---------------- Leads (DELETE + bulk-delete) ---------------- */
api.delete('/leads/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Leads.find(id);
        if (!row) return fail(res, 'Lead not found', 404);
        Leads.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'lead', entity_id: id });
        ok(res, { id, deleted: true }, 'Lead deleted successfully');
    } catch (err) {
        console.error('[DELETE /leads/:id]', err);
        fail(res, 'Failed to delete lead', 500);
    }
});

api.post('/leads/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Leads.find(id);
            if (row) {
                Leads.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'lead', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} lead(s)`);
    } catch (err) {
        console.error('[POST /leads/bulk-delete]', err);
        fail(res, 'Failed to delete leads', 500);
    }
});

/* ---------------- Projects (DELETE + bulk-delete) ---------------- */
api.delete('/projects/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Projects.find(id);
        if (!row) return fail(res, 'Project not found', 404);
        Projects.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'project', entity_id: id });
        ok(res, { id, deleted: true }, 'Project deleted successfully');
    } catch (err) {
        console.error('[DELETE /projects/:id]', err);
        fail(res, 'Failed to delete project', 500);
    }
});

api.post('/projects/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Projects.find(id);
            if (row) {
                Projects.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'project', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} project(s)`);
    } catch (err) {
        console.error('[POST /projects/bulk-delete]', err);
        fail(res, 'Failed to delete projects', 500);
    }
});

/* ---------------- Tickets (DELETE + bulk-delete) ---------------- */
api.delete('/tickets/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Tickets.find(id);
        if (!row) return fail(res, 'Ticket not found', 404);
        Tickets.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'ticket', entity_id: id });
        ok(res, { id, deleted: true }, 'Ticket deleted successfully');
    } catch (err) {
        console.error('[DELETE /tickets/:id]', err);
        fail(res, 'Failed to delete ticket', 500);
    }
});

api.post('/tickets/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Tickets.find(id);
            if (row) {
                Tickets.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'ticket', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} ticket(s)`);
    } catch (err) {
        console.error('[POST /tickets/bulk-delete]', err);
        fail(res, 'Failed to delete tickets', 500);
    }
});

/* ---------------- Invoices (DELETE + bulk-delete) ---------------- */
api.delete('/invoices/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Invoices.find(id);
        if (!row) return fail(res, 'Invoice not found', 404);
        Invoices.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'invoice', entity_id: id });
        ok(res, { id, deleted: true }, 'Invoice deleted successfully');
    } catch (err) {
        console.error('[DELETE /invoices/:id]', err);
        fail(res, 'Failed to delete invoice', 500);
    }
});

api.post('/invoices/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Invoices.find(id);
            if (row) {
                Invoices.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'invoice', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} invoice(s)`);
    } catch (err) {
        console.error('[POST /invoices/bulk-delete]', err);
        fail(res, 'Failed to delete invoices', 500);
    }
});

/* ---------------- Case Studies (DELETE + bulk-delete) ---------------- */
api.delete('/case-studies/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = CaseStudies.find(id);
        if (!row) return fail(res, 'Case study not found', 404);
        CaseStudies.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'case_study', entity_id: id });
        ok(res, { id, deleted: true }, 'Case study deleted successfully');
    } catch (err) {
        console.error('[DELETE /case-studies/:id]', err);
        fail(res, 'Failed to delete case study', 500);
    }
});

api.post('/case-studies/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = CaseStudies.find(id);
            if (row) {
                CaseStudies.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'case_study', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} case study(ies)`);
    } catch (err) {
        console.error('[POST /case-studies/bulk-delete]', err);
        fail(res, 'Failed to delete case studies', 500);
    }
});

/* ---------------- Blog Posts (DELETE + bulk-delete) ---------------- */
api.delete('/blog-posts/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = BlogPosts.find(id);
        if (!row) return fail(res, 'Blog post not found', 404);
        BlogPosts.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'blog_post', entity_id: id });
        ok(res, { id, deleted: true }, 'Blog post deleted successfully');
    } catch (err) {
        console.error('[DELETE /blog-posts/:id]', err);
        fail(res, 'Failed to delete blog post', 500);
    }
});

api.post('/blog-posts/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = BlogPosts.find(id);
            if (row) {
                BlogPosts.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'blog_post', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} blog post(s)`);
    } catch (err) {
        console.error('[POST /blog-posts/bulk-delete]', err);
        fail(res, 'Failed to delete blog posts', 500);
    }
});

/* ---------------- Partners (DELETE + bulk-delete) ---------------- */
api.delete('/partners/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Partners.find(id);
        if (!row) return fail(res, 'Partner not found', 404);
        Partners.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'partner', entity_id: id });
        ok(res, { id, deleted: true }, 'Partner deleted successfully');
    } catch (err) {
        console.error('[DELETE /partners/:id]', err);
        fail(res, 'Failed to delete partner', 500);
    }
});

api.post('/partners/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Partners.find(id);
            if (row) {
                Partners.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'partner', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} partner(s)`);
    } catch (err) {
        console.error('[POST /partners/bulk-delete]', err);
        fail(res, 'Failed to delete partners', 500);
    }
});

/* ---------------- Client Reviews (DELETE + bulk-delete) ---------------- */
api.delete('/client-reviews/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = ClientReviews.find(id);
        if (!row) return fail(res, 'Client review not found', 404);
        ClientReviews.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'client_review', entity_id: id });
        ok(res, { id, deleted: true }, 'Client review deleted successfully');
    } catch (err) {
        console.error('[DELETE /client-reviews/:id]', err);
        fail(res, 'Failed to delete client review', 500);
    }
});

api.post('/client-reviews/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = ClientReviews.find(id);
            if (row) {
                ClientReviews.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'client_review', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} client review(s)`);
    } catch (err) {
        console.error('[POST /client-reviews/bulk-delete]', err);
        fail(res, 'Failed to delete client reviews', 500);
    }
});

/* ---------------- Partner Inquiries (DELETE + bulk-delete) ---------------- */
api.delete('/partner-inquiries/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = PartnerInquiries.find(id);
        if (!row) return fail(res, 'Partner inquiry not found', 404);
        PartnerInquiries.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'partner_inquiry', entity_id: id });
        ok(res, { id, deleted: true }, 'Partner inquiry deleted successfully');
    } catch (err) {
        console.error('[DELETE /partner-inquiries/:id]', err);
        fail(res, 'Failed to delete partner inquiry', 500);
    }
});

api.post('/partner-inquiries/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = PartnerInquiries.find(id);
            if (row) {
                PartnerInquiries.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'partner_inquiry', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} partner inquiry(ies)`);
    } catch (err) {
        console.error('[POST /partner-inquiries/bulk-delete]', err);
        fail(res, 'Failed to delete partner inquiries', 500);
    }
});

/* ---------------- FAQs (DELETE + bulk-delete) ---------------- */
api.delete('/faqs/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Faqs.find(id);
        if (!row) return fail(res, 'FAQ not found', 404);
        Faqs.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'faq', entity_id: id });
        ok(res, { id, deleted: true }, 'FAQ deleted successfully');
    } catch (err) {
        console.error('[DELETE /faqs/:id]', err);
        fail(res, 'Failed to delete FAQ', 500);
    }
});

api.post('/faqs/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Faqs.find(id);
            if (row) {
                Faqs.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'faq', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} FAQ(s)`);
    } catch (err) {
        console.error('[POST /faqs/bulk-delete]', err);
        fail(res, 'Failed to delete FAQs', 500);
    }
});

/* ---------------- Ads (DELETE + bulk-delete) ---------------- */
api.delete('/ads/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Ads.find(id);
        if (!row) return fail(res, 'Ad not found', 404);
        Ads.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'ad', entity_id: id });
        ok(res, { id, deleted: true }, 'Ad deleted successfully');
    } catch (err) {
        console.error('[DELETE /ads/:id]', err);
        fail(res, 'Failed to delete ad', 500);
    }
});

api.post('/ads/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Ads.find(id);
            if (row) {
                Ads.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'ad', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} ad(s)`);
    } catch (err) {
        console.error('[POST /ads/bulk-delete]', err);
        fail(res, 'Failed to delete ads', 500);
    }
});

/* ---------------- Announcements (DELETE + bulk-delete) ---------------- */
api.delete('/announcements/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Announcements.find(id);
        if (!row) return fail(res, 'Announcement not found', 404);
        Announcements.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'announcement', entity_id: id });
        ok(res, { id, deleted: true }, 'Announcement deleted successfully');
    } catch (err) {
        console.error('[DELETE /announcements/:id]', err);
        fail(res, 'Failed to delete announcement', 500);
    }
});

api.post('/announcements/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Announcements.find(id);
            if (row) {
                Announcements.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'announcement', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} announcement(s)`);
    } catch (err) {
        console.error('[POST /announcements/bulk-delete]', err);
        fail(res, 'Failed to delete announcements', 500);
    }
});

/* ---------------- Clients (DELETE + bulk-delete) ---------------- */
api.delete('/clients/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = Clients.find(id);
        if (!row) return fail(res, 'Client not found', 404);
        Clients.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'client', entity_id: id });
        ok(res, { id, deleted: true }, 'Client deleted successfully');
    } catch (err) {
        console.error('[DELETE /clients/:id]', err);
        fail(res, 'Failed to delete client', 500);
    }
});

api.post('/clients/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = Clients.find(id);
            if (row) {
                Clients.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'client', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} client(s)`);
    } catch (err) {
        console.error('[POST /clients/bulk-delete]', err);
        fail(res, 'Failed to delete clients', 500);
    }
});

/* ---------------- Audit Submissions (DELETE + bulk-delete) ---------------- */
api.delete('/audit-submissions/:id', (req, res) => {
    try {
        const id = toInt(req.params.id);
        const row = AuditSubmissions.find(id);
        if (!row) return fail(res, 'Audit submission not found', 404);
        AuditSubmissions.delete(id);
        logActivity({ ...actor(req), action: 'delete', entity: 'audit_submission', entity_id: id });
        ok(res, { id, deleted: true }, 'Audit submission deleted successfully');
    } catch (err) {
        console.error('[DELETE /audit-submissions/:id]', err);
        fail(res, 'Failed to delete audit submission', 500);
    }
});

api.post('/audit-submissions/bulk-delete', (req, res) => {
    try {
        const { ids } = req.body as { ids: (number | string)[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return fail(res, 'ids must be a non-empty array', 400);
        }
        const numIds = ids.map(id => toInt(id)).filter(id => id > 0);
        if (numIds.length === 0) {
            return fail(res, 'No valid IDs provided', 400);
        }
        let deleted = 0;
        for (const id of numIds) {
            const row = AuditSubmissions.find(id);
            if (row) {
                AuditSubmissions.delete(id);
                logActivity({ ...actor(req), action: 'delete', entity: 'audit_submission', entity_id: id });
                deleted++;
            }
        }
        ok(res, { deleted, total: numIds.length, failed: numIds.length - deleted }, `Deleted ${deleted} audit submission(s)`);
    } catch (err) {
        console.error('[POST /audit-submissions/bulk-delete]', err);
        fail(res, 'Failed to delete audit submissions', 500);
    }
});

export default api;
