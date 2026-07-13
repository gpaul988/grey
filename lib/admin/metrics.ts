/**
 * Admin Metrics Aggregation
 * Queries PostgreSQL for dashboard data
 */

import { getDb } from '../db';
import { users, payments, services, blogPosts, analyticsEvents, audits } from '../db/schema';
import { sql, eq, gte, lte } from 'drizzle-orm';
import type { DashboardMetrics } from '../types/admin';

/**
 * Get user metrics
 */
export async function getUserMetrics() {
  const db = getDb();

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const thisMonth = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(sql`${users.createdAt} >= now() - interval '30 days'`);

  return {
    total: total[0]?.count || 0,
    activeMonth: thisMonth[0]?.count || 0,
    newThisMonth: thisMonth[0]?.count || 0,
  };
}

/**
 * Get revenue metrics
 */
export async function getRevenueMetrics() {
  const db = getDb();

  // Total revenue (sum of successful payments)
  const totalResult = await db
    .select({ total: sql<number>`sum(amount)` })
    .from(payments)
    .where(eq(payments.status, 'completed'));

  // Revenue this month
  const thisMonthResult = await db
    .select({ total: sql<number>`sum(amount)` })
    .from(payments)
    .where(
      sql`status = 'completed' AND created_at >= now() - interval '30 days'`
    );

  // Revenue this week
  const thisWeekResult = await db
    .select({ total: sql<number>`sum(amount)` })
    .from(payments)
    .where(
      sql`status = 'completed' AND created_at >= now() - interval '7 days'`
    );

  // Revenue by gateway (provider)
  const byGateway = await db
    .select({
      provider: payments.provider,
      total: sql<number>`sum(amount)`,
    })
    .from(payments)
    .where(eq(payments.status, 'completed'))
    .groupBy(payments.provider);

  return {
    total: totalResult[0]?.total || 0,
    thisMonth: thisMonthResult[0]?.total || 0,
    thisWeek: thisWeekResult[0]?.total || 0,
    byGateway: Object.fromEntries(
      byGateway.map((row: any) => [ // eslint-disable-line @typescript-eslint/no-explicit-any
        row.provider || 'unknown', row.total || 0
      ])
    ),
  };
}

/**
 * Get service metrics
 */
export async function getServiceMetrics() {
  const db = getDb();

  const totalServices = await db
    .select({ count: sql<number>`count(*)` })
    .from(services);

  // Top services (for now just return all services)
  // TODO: Join with analytics events and payments to calculate actual views/purchases
  const allServices = await db
    .select({
      id: services.id,
      name: services.name,
    })
    .from(services)
    .limit(10);

  return {
    total: totalServices[0]?.count || 0,
    topServices: allServices.map((s: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
      {
        id: String(s.id || ''),
        name: s.name || '',
        views: Math.floor(Math.random() * 1000), // Mock data
        purchases: Math.floor(Math.random() * 100), // Mock data
      }
    )),
  };
}

/**
 * Get audit metrics
 */
export async function getAuditMetrics() {
  const db = getDb();

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(audits);

  const completed = await db
    .select({ count: sql<number>`count(*)` })
    .from(audits)
    .where(eq(audits.status, 'completed'));

  const totalCount = total[0]?.count || 0;
  const completedCount = completed[0]?.count || 0;

  return {
    total: totalCount,
    completed: completedCount,
    completionRate: totalCount > 0 ? (completedCount / totalCount) * 100 : 0,
  };
}

/**
 * Get payment metrics
 */
export async function getPaymentMetrics() {
  const db = getDb();

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(payments);

  const successful = await db
    .select({ count: sql<number>`count(*)` })
    .from(payments)
    .where(eq(payments.status, 'completed'));

  const failed = await db
    .select({ count: sql<number>`count(*)` })
    .from(payments)
    .where(eq(payments.status, 'failed'));

  const refunded = await db
    .select({ count: sql<number>`count(*)` })
    .from(payments)
    .where(eq(payments.status, 'refunded'));

  return {
    total: total[0]?.count || 0,
    successful: successful[0]?.count || 0,
    failed: failed[0]?.count || 0,
    refunded: refunded[0]?.count || 0,
  };
}

/**
 * Get webhook metrics
 */
export async function getWebhookMetrics() {
  // TODO: Query from webhooks table when events are tracked
  return {
    totalEvents: 0,
    successRate: 0,
    failedDeliveries: 0,
  };
}

/**
 * Get search query analytics
 */
export async function getSearchMetrics() {
  const db = getDb();

  const totalQueries = await db
    .select({ count: sql<number>`count(*)` })
    .from(analyticsEvents)
    .where(eq(analyticsEvents.eventType, 'search'));

  // TODO: Parse and aggregate search queries from event data
  return {
    totalQueries: totalQueries[0]?.count || 0,
    topQueries: [],
  };
}

/**
 * Aggregate all metrics
 */
export async function aggregateMetrics(): Promise<DashboardMetrics> {
  const [userMetrics, revenueMetrics, serviceMetrics, auditMetrics, paymentMetrics, webhookMetrics, searchMetrics] =
    await Promise.all([
      getUserMetrics(),
      getRevenueMetrics(),
      getServiceMetrics(),
      getAuditMetrics(),
      getPaymentMetrics(),
      getWebhookMetrics(),
      getSearchMetrics(),
    ]);

  return {
    users: userMetrics,
    revenue: revenueMetrics,
    services: serviceMetrics,
    audits: auditMetrics,
    payments: paymentMetrics,
    webhooks: webhookMetrics,
    search: searchMetrics,
  };
}
