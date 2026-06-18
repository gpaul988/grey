import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  decimal,
  jsonb,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

/**
 * Users table - superadmin, admin, manager, staff
 */
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash'),
    role: text('role').notNull().default('staff'), // superadmin | admin | manager | staff
    avatar: text('avatar'),
    phone: text('phone'),
    status: text('status').notNull().default('active'), // active | suspended
    emailVerified: boolean('email_verified').default(false),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('idx_users_email').on(table.email),
    roleIdx: index('idx_users_role').on(table.role),
  })
);

/**
 * Submissions - contact form submissions
 */
export const submissions = pgTable(
  'submissions',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    subject: text('subject'),
    projectType: text('project_type'),
    budget: text('budget'),
    message: text('message'),
    source: text('source').notNull().default('website'), // website | email | social
    status: text('status').notNull().default('new'), // new | read | replied | archived | spam
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    emailIdx: index('idx_submissions_email').on(table.email),
    statusIdx: index('idx_submissions_status').on(table.status),
  })
);

/**
 * Verification tokens - for password reset, email verification, 2FA
 */
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    email: text('email'),
    token: text('token').notNull().unique(),
    type: text('type').notNull(), // password_reset | email_verification | totp_setup
    totpSecret: text('totp_secret'),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex('idx_verification_tokens_token').on(table.token),
    userIdIdx: index('idx_verification_tokens_user_id').on(table.userId),
  })
);

/**
 * Services - offered services
 */
export const services = pgTable(
  'services',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    icon: text('icon'),
    category: text('category'),
    tags: jsonb('tags').default(sql`'[]'::jsonb`), // array of strings
    featured: boolean('featured').default(false),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_services_slug').on(table.slug),
    categoryIdx: index('idx_services_category').on(table.category),
  })
);

/**
 * Analytics events - for tracking user behavior
 */
export const analyticsEvents = pgTable(
  'analytics_events',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    eventType: text('event_type').notNull(), // page_view | click | conversion | etc
    eventName: text('event_name').notNull(),
    properties: jsonb('properties').default(sql`'{}'::jsonb`),
    sessionId: text('session_id'),
    url: text('url'),
    timestamp: timestamp('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_analytics_events_user_id').on(table.userId),
    eventTypeIdx: index('idx_analytics_events_event_type').on(table.eventType),
    timestampIdx: index('idx_analytics_events_timestamp').on(table.timestamp),
  })
);

/**
 * Payments - transaction history
 */
export const payments = pgTable(
  'payments',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    email: text('email'),
    amount: decimal('amount', { precision: 10, scale: 2 }),
    currency: text('currency').default('USD'),
    provider: text('provider').notNull(), // stripe | paypal | square | wise
    transactionId: text('transaction_id').notNull().unique(),
    status: text('status').notNull().default('pending'), // pending | completed | failed | refunded
    description: text('description'),
    metadata: jsonb('metadata').default(sql`'{}'::jsonb`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_payments_user_id').on(table.userId),
    statusIdx: index('idx_payments_status').on(table.status),
    transactionIdIdx: uniqueIndex('idx_payments_transaction_id').on(table.transactionId),
  })
);

/**
 * Audits - security & compliance audits
 */
export const audits = pgTable(
  'audits',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    status: text('status').notNull().default('pending'), // pending | in_progress | completed
    findings: jsonb('findings').default(sql`'[]'::jsonb`), // array of finding objects
    score: integer('score'),
    reportUrl: text('report_url'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    statusIdx: index('idx_audits_status').on(table.status),
  })
);

/**
 * Live demo environments
 */
export const demoEnvironments = pgTable(
  'demo_environments',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    serviceId: integer('service_id'),
    containerId: text('container_id'),
    url: text('url'),
    status: text('status').notNull().default('running'), // running | stopped | failed
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_demo_environments_user_id').on(table.userId),
    statusIdx: index('idx_demo_environments_status').on(table.status),
  })
);

/**
 * Performance benchmarks
 */
export const performanceBenchmarks = pgTable(
  'performance_benchmarks',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    testType: text('test_type').notNull(), // latency | throughput | memory
    results: jsonb('results').default(sql`'{}'::jsonb`),
    score: decimal('score', { precision: 5, scale: 2 }),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    nameIdx: index('idx_performance_benchmarks_name').on(table.name),
  })
);

/**
 * API playground executions
 */
export const apiExecutions = pgTable(
  'api_executions',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    endpoint: text('endpoint').notNull(),
    method: text('method').notNull(), // GET | POST | PUT | DELETE
    requestBody: jsonb('request_body'),
    responseStatus: integer('response_status'),
    responseBody: jsonb('response_body'),
    executionTime: integer('execution_time'), // ms
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_api_executions_user_id').on(table.userId),
    endpointIdx: index('idx_api_executions_endpoint').on(table.endpoint),
  })
);

/**
 * Code analysis results
 */
export const codeAnalysis = pgTable(
  'code_analysis',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    repositoryUrl: text('repository_url').notNull(),
    branch: text('branch').default('main'),
    analysisType: text('analysis_type').notNull(), // full | security | performance
    findings: jsonb('findings').default(sql`'[]'::jsonb`),
    score: integer('score'),
    recommendations: jsonb('recommendations').default(sql`'[]'::jsonb`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_code_analysis_user_id').on(table.userId),
    repositoryIdx: index('idx_code_analysis_repository_url').on(table.repositoryUrl),
  })
);

/**
 * Webhook subscriptions
 */
export const webhookSubscriptions = pgTable(
  'webhook_subscriptions',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    endpoint: text('endpoint').notNull(),
    events: jsonb('events').default(sql`'[]'::jsonb`), // array of event types
    active: boolean('active').default(true),
    secret: text('secret').notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: index('idx_webhook_subscriptions_user_id').on(table.userId),
  })
);

/**
 * Webhook delivery logs
 */
export const webhookDeliveries = pgTable(
  'webhook_deliveries',
  {
    id: serial('id').primaryKey(),
    subscriptionId: integer('subscription_id'),
    eventType: text('event_type').notNull(),
    payload: jsonb('payload'),
    statusCode: integer('status_code'),
    response: jsonb('response'),
    retries: integer('retries').default(0),
    nextRetry: timestamp('next_retry'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    subscriptionIdIdx: index('idx_webhook_deliveries_subscription_id').on(table.subscriptionId),
    eventTypeIdx: index('idx_webhook_deliveries_event_type').on(table.eventType),
  })
);

/**
 * Tech stack detection
 */
export const techStackDetection = pgTable(
  'tech_stack_detection',
  {
    id: serial('id').primaryKey(),
    websiteUrl: text('website_url').notNull(),
    technologies: jsonb('technologies').default(sql`'[]'::jsonb`), // array of tech objects
    confidence: decimal('confidence', { precision: 3, scale: 2 }),
    lastScanned: timestamp('last_scanned'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    websiteUrlIdx: uniqueIndex('idx_tech_stack_detection_url').on(table.websiteUrl),
  })
);

/**
 * Blog posts (for future CMS)
 */
export const blogPosts = pgTable(
  'blog_posts',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    content: text('content'),
    excerpt: text('excerpt'),
    author: text('author'),
    tags: jsonb('tags').default(sql`'[]'::jsonb`),
    published: boolean('published').default(false),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_blog_posts_slug').on(table.slug),
    publishedIdx: index('idx_blog_posts_published').on(table.published),
  })
);

/**
 * User preferences (language, theme, etc)
 */
export const userPreferences = pgTable(
  'user_preferences',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().unique(),
    language: text('language').default('en'),
    theme: text('theme').default('light'),
    notifications: boolean('notifications').default(true),
    preferences: jsonb('preferences').default(sql`'{}'::jsonb`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => ({
    userIdIdx: uniqueIndex('idx_user_preferences_user_id').on(table.userId),
  })
);
