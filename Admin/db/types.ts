export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: 'admin' | 'manager' | 'staff';
    avatar: string | null;
    phone: string | null;
    status: 'active' | 'suspended';
    permissions: string | null; // JSON map of feature->bool overrides
    created_at: string;
    updated_at: string;
}

export type SafeUser = Omit<User, 'password_hash'>;

export interface Submission {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    project_type: string | null;
    budget: string | null;
    message: string | null;
    source: string;
    status: 'new' | 'read' | 'replied' | 'archived' | 'spam';
    created_at: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    source: string;
    stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
    value: number;
    owner_id: number | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
    avatar: string | null;
    password_hash: string | null;
    status: 'active' | 'suspended';
    last_login: string | null;
    created_at: string;
}

export type SafeClient = Omit<Client, 'password_hash'>;

export interface ClientToken {
    id: number;
    client_id: number;
    token: string;
    purpose: 'login' | 'invite';
    used_at: string | null;
    expires_at: string;
    created_at: string;
}

export interface ProjectBrief {
    id: number;
    client_id: number;
    project_id: number | null;
    service: string | null;
    title: string;
    goals: string | null;
    target_audience: string | null;
    design_style: string | null;
    color_prefs: string | null;
    references_links: string | null;
    budget_range: string | null;
    timeline: string | null;
    details: string | null;
    status: 'submitted' | 'reviewing' | 'accepted' | 'in_progress' | 'done';
    created_at: string;
    updated_at: string;
}

export interface Upload {
    id: number;
    client_id: number | null;
    project_id: number | null;
    brief_id: number | null;
    uploader: 'client' | 'staff';
    uploader_id: number | null;
    filename: string;
    original: string;
    mime: string | null;
    size: number;
    url: string;
    created_at: string;
}

export interface Project {
    id: number;
    name: string;
    client_id: number | null;
    client_name: string | null;
    status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
    progress: number;
    budget: number;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    manager_id: number | null;
    created_at: string;
    updated_at: string;
}

export interface Ticket {
    id: number;
    subject: string;
    requester: string;
    requester_email: string | null;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'pending' | 'resolved' | 'closed';
    assignee_id: number | null;
    body: string | null;
    created_at: string;
    updated_at: string;
}

export interface TicketMessage {
    id: number;
    ticket_id: number;
    author: string;
    is_staff: number;
    body: string;
    created_at: string;
}

export interface InvoiceItem {
    description: string;
    qty: number;
    rate: number;
}

export interface Invoice {
    id: number;
    number: string;
    client_id: number | null;
    client_name: string;
    client_email: string | null;
    amount: number;
    tax: number;
    total: number;
    currency: string;
    status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
    issued_date: string | null;
    due_date: string | null;
    items: string; // JSON
    notes: string | null;
    created_at: string;
}

export interface CaseStudy {
    id: number;
    title: string;
    slug: string;
    client: string | null;
    industry: string | null;
    summary: string | null;
    body: string | null;
    image: string | null;
    results: string | null;
    published: number;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
    cover: string | null;
    author: string;
    tags: string; // JSON
    status: 'draft' | 'published';
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Conversation {
    id: number;
    client_id: number | null;
    subject: string | null;
    last_message: string | null;
    unread: number;
    updated_at: string;
    created_at: string;
}

export interface Message {
    id: number;
    conversation_id: number;
    sender: 'client' | 'staff';
    sender_name: string | null;
    body: string;
    created_at: string;
}

export interface ActivityLog {
    id: number;
    user_id: number | null;
    user_name: string | null;
    action: string;
    entity: string | null;
    entity_id: number | null;
    detail: string | null;
    created_at: string;
}
