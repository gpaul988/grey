export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string | null;
    role: 'superadmin' | 'admin' | 'manager' | 'staff';
    avatar: string | null;
    phone: string | null;
    status: 'active' | 'suspended' | 'pending';
    permissions: string | null; // JSON map of feature->bool overrides
    email_verified: number;     // 0 | 1
    verified_at: string | null;
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
    email_verified: number;     // 0 | 1
    verified_at: string | null;
    last_login: string | null;
    created_at: string;
}

export type SafeClient = Omit<Client, 'password_hash'>;

export interface EmailVerification {
    id: number;
    subject_type: 'user' | 'client' | 'client_staff';
    subject_id: number;
    email: string;
    token: string;
    code: string;
    purpose: 'verify' | 'set_password';
    used_at: string | null;
    expires_at: string;
    created_at: string;
}

export interface ClientStaff {
    id: number;
    client_id: number;
    name: string;
    email: string;
    avatar: string | null;
    password_hash: string | null;
    role_title: string | null;
    status: 'invited' | 'active' | 'suspended';
    email_verified: number;
    last_login: string | null;
    created_at: string;
}

export type SafeClientStaff = Omit<ClientStaff, 'password_hash'>;

export interface ConversationParticipant {
    id: number;
    conversation_id: number;
    participant_type: 'client' | 'client_staff' | 'staff';
    participant_id: number;
    name: string | null;
    added_by: string | null;
    created_at: string;
}

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
    // Extended fields (Lightflows-style)
    hero_image: string | null;
    tagline: string | null;
    services: string; // JSON array
    sections: string; // JSON array of {title,body,image,caption}
    website: string | null;
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
    // Extended fields (Lightflows-style)
    read_time: string | null;
    hero_image: string | null;
    author_avatar: string | null;
    author_role: string | null;
    sections: string; // JSON array of {title,body,image,caption}
    created_at: string;
    updated_at: string;
}

export interface Partner {
    id: number;
    name: string;
    logo: string;
    url: string;
    sort_order: number;
    active: number;
    created_at: string;
    updated_at: string;
}

export interface ClientReview {
    id: number;
    author: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
    rating: number;
    sort_order: number;
    active: number;
    created_at: string;
    updated_at: string;
}

export interface PartnerInquiry {
    id: number;
    company: string;
    contact_name: string;
    email: string;
    phone: string | null;
    website: string | null;
    country: string | null;
    reg_authority: string | null;
    reg_number: string | null;
    partnership_type: string | null;
    message: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
    sort_order: number;
    active: number;
    created_at: string;
    updated_at: string;
}

export interface Ad {
    id: number;
    title: string;
    body: string;
    image: string;
    link_url: string;
    cta_label: string;
    placement: string;
    share_caption: string;
    variant: string;
    status: string;
    starts_at: string | null;
    ends_at: string | null;
    impressions: number;
    clicks: number;
    sort_order: number;
    active: number;
    created_at: string;
    updated_at: string;
}

export interface Subscriber {
    id: number;
    email: string;
    name: string;
    source: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Announcement {
    id: number;
    message: string;
    link_url: string;
    link_label: string;
    variant: string;
    active: number;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface PageSeo {
    id: number;
    path: string;
    title: string;
    description: string;
    keywords: string;
    og_image: string;
    updated_at: string;
    created_at: string;
}

export interface AnalyticsEvent {
    id: number;
    type: string;
    path: string;
    ref: string;
    label: string;
    ua: string;
    created_at: string;
}

export interface MediaAsset {
    id: number;
    url: string;
    filename: string;
    mime: string;
    size: number;
    alt: string;
    created_at: string;
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
export interface AuditSubmission {
    id: number;
    user_name: string;
    user_email: string;
    user_phone: string | null;
    user_company: string | null;
    audit_report_id: string | null;
    website: string | null;
    github_repo: string | null;
    priority: 'low' | 'medium' | 'high' | string;
    budget_estimate: string | null;
    specific_issues: string | null;
    preferred_contact: 'email' | 'phone' | string;
    audit_data: string;
    status: 'new' | 'in_progress' | 'responded' | 'resolved' | 'closed' | string;
    admin_notes: string | null;
    proposed_solution: string | null;
    created_at: string;
    updated_at: string;
    responded_at: string | null;
}

export interface CareerApplication {
    [key: string]: unknown;
    id: number;
    form_type: 'cv_submission' | 'self_introduction';
    full_name: string;
    email: string;
    phone: string | null;
    country: string | null;
    role_interest: string | null;
    experience_years: string | null;
    linkedin_url: string | null;
    portfolio_url: string | null;
    cover_letter: string | null;
    cv_path: string | null;
    cv_filename: string | null;
    job_opening_id: number | null;
    documents_paths: string; // JSON array of paths
    status: 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'archived';
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface JobOpening {
    [key: string]: unknown;
    id: number;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'remote' | string;
    experience_level: string;
    salary_range: string;
    description: string;
    responsibilities: string; // JSON array
    requirements: string;     // JSON array
    nice_to_have: string;     // JSON array
    benefits: string;         // JSON array
    status: 'draft' | 'published' | 'closed';
    deadline: string | null;
    created_at: string;
    updated_at: string;
}
