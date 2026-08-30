/**
 * Shared admin entity schema — single source of truth for the admin "Add New"
 * CRUD flows. Drives BOTH the generic create API (validation) and the unified
 * admin form UI (field rendering). Keep field `name`s aligned with the SQLite
 * column whitelists in Admin/models.
 *
 * This file is imported by:
 *   - pages/api/admin/create/[entity].ts  (server-side validation)
 *   - pages/admin/manage.tsx              (client-side form generation)
 *
 * It MUST stay free of server-only imports (no better-sqlite3, no fs) so it can
 * be bundled into the browser.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'url'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'tags'      // comma-separated -> string[] (JSON)
  | 'json';     // raw JSON object/array

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  default?: string | number | boolean;
}

export interface EntityDef {
  /** URL/key slug used in the API path and tab id. */
  key: string;
  /** Human label (singular). */
  label: string;
  /** Plural label for headings. */
  plural: string;
  /** Short description shown under the form heading. */
  hint?: string;
  fields: FieldDef[];
}

export const ENTITIES: EntityDef[] = [
  {
    key: 'product',
    label: 'Product',
    plural: 'Products',
    hint: 'Add a store product. Slug & SKU are auto-handled.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'sku', label: 'SKU', type: 'text', placeholder: 'optional' },
      { name: 'price', label: 'Price', type: 'number', required: true, default: 0 },
      { name: 'compare_price', label: 'Compare-at price', type: 'number' },
      { name: 'stock', label: 'Stock', type: 'number', default: 0 },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'thumbnail', label: 'Thumbnail URL', type: 'url' },
      { name: 'tags', label: 'Tags', type: 'tags', help: 'Comma-separated' },
      {
        name: 'status', label: 'Status', type: 'select', default: 'draft',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
          { value: 'archived', label: 'Archived' },
        ],
      },
      { name: 'featured', label: 'Featured', type: 'checkbox', default: false },
    ],
  },
  {
    key: 'ticket',
    label: 'Ticket',
    plural: 'Tickets',
    hint: 'Open a support ticket on behalf of a requester.',
    fields: [
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'requester', label: 'Requester name', type: 'text', required: true },
      { name: 'requester_email', label: 'Requester email', type: 'email' },
      {
        name: 'priority', label: 'Priority', type: 'select', default: 'medium',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ],
      },
      {
        name: 'status', label: 'Status', type: 'select', default: 'open',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'pending', label: 'Pending' },
          { value: 'resolved', label: 'Resolved' },
          { value: 'closed', label: 'Closed' },
        ],
      },
      { name: 'body', label: 'Message', type: 'textarea' },
    ],
  },
  {
    key: 'invoice',
    label: 'Invoice',
    plural: 'Invoices',
    hint: 'Invoice number is generated automatically (INV-YYYY-####).',
    fields: [
      { name: 'client_name', label: 'Client name', type: 'text', required: true },
      { name: 'client_email', label: 'Client email', type: 'email' },
      { name: 'amount', label: 'Amount (subtotal)', type: 'number', required: true, default: 0 },
      { name: 'tax', label: 'Tax', type: 'number', default: 0 },
      { name: 'currency', label: 'Currency', type: 'text', default: 'NGN' },
      {
        name: 'status', label: 'Status', type: 'select', default: 'draft',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'sent', label: 'Sent' },
          { value: 'paid', label: 'Paid' },
          { value: 'overdue', label: 'Overdue' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
      { name: 'issued_date', label: 'Issued date', type: 'date' },
      { name: 'due_date', label: 'Due date', type: 'date' },
      { name: 'items', label: 'Line items (JSON)', type: 'json', help: 'Array of {description, qty, price}', default: '[]' },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  {
    key: 'client',
    label: 'Client',
    plural: 'Clients',
    hint: 'Add a client account. Email must be unique.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'avatar', label: 'Avatar URL', type: 'url' },
    ],
  },
  {
    key: 'casestudy',
    label: 'Case Study',
    plural: 'Case Studies',
    hint: 'Slug auto-generated from the title if left blank.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', placeholder: 'auto from title' },
      { name: 'client', label: 'Client', type: 'text' },
      { name: 'industry', label: 'Industry', type: 'text' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'results', label: 'Results', type: 'textarea' },
      { name: 'published', label: 'Published', type: 'checkbox', default: false },
    ],
  },
  {
    key: 'blogpost',
    label: 'Blog Post',
    plural: 'Blog Posts',
    hint: 'Slug auto-generated from the title if left blank.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', placeholder: 'auto from title' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'cover', label: 'Cover image URL', type: 'url' },
      { name: 'author', label: 'Author', type: 'text', default: 'Graham Sobiribo Paul' },
      { name: 'tags', label: 'Tags', type: 'tags', help: 'Comma-separated' },
      {
        name: 'status', label: 'Status', type: 'select', default: 'draft',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
        ],
      },
    ],
  },
  {
    key: 'partner',
    label: 'Partner',
    plural: 'Partners',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'logo', label: 'Logo URL', type: 'url' },
      { name: 'url', label: 'Website URL', type: 'url' },
      { name: 'sort_order', label: 'Sort order', type: 'number', default: 0 },
      { name: 'active', label: 'Active', type: 'checkbox', default: true },
    ],
  },
  {
    key: 'review',
    label: 'Review',
    plural: 'Client Reviews',
    hint: 'A testimonial shown on the site.',
    fields: [
      { name: 'author', label: 'Author', type: 'text', required: true },
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'avatar', label: 'Avatar URL', type: 'url' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number', default: 5 },
      { name: 'sort_order', label: 'Sort order', type: 'number', default: 0 },
      { name: 'active', label: 'Active', type: 'checkbox', default: true },
    ],
  },
  {
    key: 'faq',
    label: 'FAQ',
    plural: 'FAQs',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'category', label: 'Category', type: 'text', default: 'General' },
      { name: 'sort_order', label: 'Sort order', type: 'number', default: 0 },
      { name: 'active', label: 'Active', type: 'checkbox', default: true },
    ],
  },
  {
    key: 'ad',
    label: 'Advert',
    plural: 'Adverts',
    hint: 'A promotional ad/banner.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'url' },
      { name: 'link_url', label: 'Link URL', type: 'url' },
      { name: 'cta_label', label: 'CTA label', type: 'text', default: 'Learn more' },
      {
        name: 'placement', label: 'Placement', type: 'select', default: 'home_banner',
        options: [
          { value: 'home_banner', label: 'Home banner' },
          { value: 'sidebar', label: 'Sidebar' },
          { value: 'footer', label: 'Footer' },
          { value: 'popup', label: 'Popup' },
        ],
      },
      {
        name: 'variant', label: 'Variant', type: 'select', default: 'gradient',
        options: [
          { value: 'gradient', label: 'Gradient' },
          { value: 'image', label: 'Image' },
          { value: 'minimal', label: 'Minimal' },
        ],
      },
      {
        name: 'status', label: 'Status', type: 'select', default: 'draft',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
        ],
      },
      { name: 'starts_at', label: 'Starts at', type: 'date' },
      { name: 'ends_at', label: 'Ends at', type: 'date' },
      { name: 'sort_order', label: 'Sort order', type: 'number', default: 0 },
      { name: 'active', label: 'Active', type: 'checkbox', default: true },
    ],
  },
  {
    key: 'announcement',
    label: 'Announcement',
    plural: 'Announcements',
    hint: 'A site-wide announcement bar message.',
    fields: [
      { name: 'message', label: 'Message', type: 'text', required: true },
      { name: 'link_url', label: 'Link URL', type: 'url' },
      { name: 'link_label', label: 'Link label', type: 'text' },
      {
        name: 'variant', label: 'Variant', type: 'select', default: 'info',
        options: [
          { value: 'info', label: 'Info' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'promo', label: 'Promo' },
        ],
      },
      { name: 'starts_at', label: 'Starts at', type: 'date' },
      { name: 'ends_at', label: 'Ends at', type: 'date' },
      { name: 'active', label: 'Active', type: 'checkbox', default: true },
    ],
  },
  {
    key: 'seo',
    label: 'SEO Override',
    plural: 'SEO Overrides',
    hint: 'Per-path meta override. Path must be unique (e.g. /about).',
    fields: [
      { name: 'path', label: 'Path', type: 'text', required: true, placeholder: '/about' },
      { name: 'title', label: 'Meta title', type: 'text' },
      { name: 'description', label: 'Meta description', type: 'textarea' },
      { name: 'keywords', label: 'Keywords', type: 'text', help: 'Comma-separated' },
      { name: 'og_image', label: 'OG image URL', type: 'url' },
    ],
  },
];

export function getEntity(key: string): EntityDef | undefined {
  return ENTITIES.find((e) => e.key === key);
}
