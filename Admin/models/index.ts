import db from '../db';
import {createRepo} from './crud';
import {UsersModel} from './users';
import type {
    Submission, Lead, Project, Ticket, TicketMessage,
    Invoice, CaseStudy, BlogPost, Conversation, Message, ActivityLog,
    ProjectBrief, Upload,
} from '../db/types';
import {ClientsModel} from './clients';
import {ClientStaffModel} from './clientStaff';
import {Participants} from './participants';
import {Verification} from './verification';

export const Users = UsersModel;
export {
    Products,
    ProductCategories,
    ProductBrands,
    Customers,
    Orders,
    StoreSettings,
    ProductReviews,
    Coupons,
    Wishlists
} from './store';
export const Clients = ClientsModel;
export const ClientStaff = ClientStaffModel;
export {Participants, Verification};

export {SiteSettings} from './settings';

export const Submissions = createRepo<Submission>('submissions', [
    'name', 'email', 'phone', 'subject', 'project_type', 'budget', 'message', 'source', 'status',
]);

export const Leads = createRepo<Lead>('leads', [
    'name', 'email', 'company', 'phone', 'source', 'stage', 'value', 'owner_id', 'notes',
]);

export const Projects = createRepo<Project>('projects', [
    'name', 'client_id', 'client_name', 'status', 'progress', 'budget', 'start_date', 'end_date', 'description', 'manager_id',
]);

export const Tickets = createRepo<Ticket>('tickets', [
    'subject', 'requester', 'requester_email', 'priority', 'status', 'assignee_id', 'body',
]);

export const TicketMessages = createRepo<TicketMessage>('ticket_messages', [
    'ticket_id', 'author', 'is_staff', 'body',
]);

export const Invoices = createRepo<Invoice>('invoices', [
    'number', 'client_id', 'client_name', 'client_email', 'amount', 'tax', 'total', 'currency', 'status', 'issued_date', 'due_date', 'items', 'notes',
]);

export const CaseStudies = createRepo<CaseStudy>('case_studies', [
    // original fields
    'title', 'slug', 'client', 'industry', 'summary', 'body', 'image', 'results', 'published',
    // extended fields (Lightflows /work-style template)
    'hero_image', 'tagline', 'services', 'sections', 'website',
]);

export const BlogPosts = createRepo<BlogPost>('blog_posts', [
    // original fields
    'title', 'slug', 'excerpt', 'body', 'cover', 'author', 'tags', 'status', 'published_at',
    // extended fields (Lightflows-style template)
    'read_time', 'hero_image', 'author_avatar', 'author_role', 'sections',
]);

export const Conversations = createRepo<Conversation>('conversations', [
    'client_id', 'subject', 'last_message', 'unread',
]);

export const Messages = createRepo<Message>('messages', [
    'conversation_id', 'sender', 'sender_name', 'body',
]);

export const Activity = createRepo<ActivityLog>('activity_log', [
    'user_id', 'user_name', 'action', 'entity', 'entity_id', 'detail',
]);

export const ProjectBriefs = createRepo<ProjectBrief>('project_briefs', [
    'client_id', 'project_id', 'service', 'title', 'goals', 'target_audience',
    'design_style', 'color_prefs', 'references_links', 'budget_range', 'timeline', 'details', 'status',
]);

export const Uploads = createRepo<Upload>('uploads', [
    'client_id', 'project_id', 'brief_id', 'uploader', 'uploader_id',
    'filename', 'original', 'mime', 'size', 'url',
]);

/** Record an audit-trail entry. Never throws into the request path. */
export function logActivity(entry: {
    user_id?: number | null;
    user_name?: string | null;
    action: string;
    entity?: string;
    entity_id?: number;
    detail?: string;
}): void {
    try {
        Activity.create({
            user_id: entry.user_id ?? null,
            user_name: entry.user_name ?? null,
            action: entry.action,
            entity: entry.entity ?? null,
            entity_id: entry.entity_id ?? null,
            detail: entry.detail ?? null,
        });
    } catch {
        /* logging must never break the request */
    }
}

/** Next invoice number, e.g. INV-2026-0007 */
export function nextInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const count = (db.prepare(`SELECT COUNT(*) AS c
                               FROM invoices
                               WHERE number LIKE ?`).get(`INV-${year}-%`) as { c: number }).c;
    return `INV-${year}-${String(count + 1).padStart(4, '0')}`;
}

/** Month labels for the last N months, oldest first, as YYYY-MM + pretty label. */
function lastNMonths(n: number): { key: string; label: string }[] {
    const out: { key: string; label: string }[] = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        out.push({key, label: d.toLocaleString('en', {month: 'short'})});
    }
    return out;
}

/** Count rows of a table grouped by month (created_at) over the last N months. */
function monthlyCounts(table: string, months: { key: string }[], dateCol = 'created_at'): number[] {
    const rows = db
        .prepare(`SELECT strftime('%Y-%m', ${dateCol}) AS m, COUNT(*) AS c
                  FROM ${table}
                  GROUP BY m`)
        .all() as { m: string; c: number }[];
    const map = new Map(rows.map((r) => [r.m, r.c]));
    return months.map((mm) => map.get(mm.key) ?? 0);
}

/** Sum a column of a table grouped by month over the last N months. */
function monthlySum(table: string, column: string, months: {
    key: string
}[], where = '', dateCol = 'created_at'): number[] {
    const rows = db
        .prepare(
            `SELECT strftime('%Y-%m', ${dateCol}) AS m, COALESCE(SUM(${column}), 0) AS s
             FROM ${table} ${where ? `WHERE ${where}` : ''}
             GROUP BY m`
        )
        .all() as { m: string; s: number }[];
    const map = new Map(rows.map((r) => [r.m, r.s]));
    return months.map((mm) => map.get(mm.key) ?? 0);
}

/** Count rows grouped by an arbitrary column (e.g. status). */
function countsByColumn(table: string, column: string): Record<string, number> {
    const rows = db.prepare(`SELECT ${column} AS k, COUNT(*) AS c
                             FROM ${table}
                             GROUP BY ${column}`).all() as { k: string; c: number }[];
    const out: Record<string, number> = {};
    for (const r of rows) out[r.k ?? 'unknown'] = r.c;
    return out;
}

/**
 * Time-series + breakdown data for the dashboard charts.
 * Returns plain arrays ready to JSON-embed for ApexCharts.
 */
export function chartData(months = 6) {
    const m = lastNMonths(months);
    const labels = m.map((x) => x.label);

    // Leads vs submissions over time (line/area).
    const leadsSeries = monthlyCounts('leads', m);
    const submissionsSeries = monthlyCounts('submissions', m);

    // Revenue: paid invoices total per month (area).
    const revenueSeries = monthlySum('invoices', 'total', m, "status = 'paid'");

    // Projects by status (donut).
    const projectStatus = countsByColumn('projects', 'status');

    // Tickets by status (bar).
    const ticketStatus = countsByColumn('tickets', 'status');

    return {
        labels,
        leads: leadsSeries,
        submissions: submissionsSeries,
        revenue: revenueSeries,
        projectStatus,
        ticketStatus,
    };
}

/** Aggregated numbers for the dashboard. */
export function dashboardStats() {
    const newSubmissions = Submissions.count("status = 'new'");
    const totalLeads = Leads.count();
    const openLeads = Leads.count("stage NOT IN ('won','lost')");
    const wonValue = Leads.sum('value', "stage = 'won'");
    const activeProjects = Projects.count("status = 'active'");
    const totalProjects = Projects.count();
    const openTickets = Tickets.count("status IN ('open','pending')");
    const paidRevenue = Invoices.sum('total', "status = 'paid'");
    const outstanding = Invoices.sum('total', "status IN ('sent','overdue')");
    const totalClients = Clients.count();
    const publishedPosts = BlogPosts.count("status = 'published'");
    const unreadConvos = Conversations.count('unread > 0');

    return {
        newSubmissions, totalLeads, openLeads, wonValue,
        activeProjects, totalProjects, openTickets,
        paidRevenue, outstanding, totalClients, publishedPosts, unreadConvos,
    };
}