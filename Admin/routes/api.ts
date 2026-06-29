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
    AuditSubmissions, CareerApplications,
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
