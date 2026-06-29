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
    const id = toInt(req.params.id);
    const row = JobOpenings.find(id);
    if (!row) return fail(res, 'Not found', 404);
    JobOpenings.delete(id);
    logActivity({ ...actor(req), action: 'delete', entity: 'job_opening', entity_id: id });
    ok(res, null, 'Deleted');
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
    const id = toInt(req.params.id);
    const row = CareerApplications.find(id);
    if (!row) return fail(res, 'Not found', 404);
    CareerApplications.delete(id);
    ok(res, null, 'Deleted');
});

export default api;
