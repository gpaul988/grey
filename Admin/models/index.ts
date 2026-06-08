import db from '../db';
import { createRepo } from './crud';
import { UsersModel } from './users';
import type {
    Submission, Lead, Client, Project, Ticket, TicketMessage,
    Invoice, CaseStudy, BlogPost, Conversation, Message, ActivityLog,
} from '../db/types';

export const Users = UsersModel;

export const Submissions = createRepo<Submission>('submissions', [
    'name', 'email', 'phone', 'subject', 'project_type', 'budget', 'message', 'source', 'status',
]);

export const Leads = createRepo<Lead>('leads', [
    'name', 'email', 'company', 'phone', 'source', 'stage', 'value', 'owner_id', 'notes',
]);

export const Clients = createRepo<Client>('clients', [
    'name', 'email', 'company', 'phone', 'avatar',
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
    'title', 'slug', 'client', 'industry', 'summary', 'body', 'image', 'results', 'published',
]);

export const BlogPosts = createRepo<BlogPost>('blog_posts', [
    'title', 'slug', 'excerpt', 'body', 'cover', 'author', 'tags', 'status', 'published_at',
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
    const count = (db.prepare(`SELECT COUNT(*) AS c FROM invoices WHERE number LIKE ?`).get(`INV-${year}-%`) as { c: number }).c;
    return `INV-${year}-${String(count + 1).padStart(4, '0')}`;
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
