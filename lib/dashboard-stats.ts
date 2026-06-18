import { db } from '@/lib/db';
import { users, reviews, services, analyticsEvents, payments, recommendations } from '@/lib/db/schema';
import { eq, gte, sql, and } from 'drizzle-orm';
import { subDays } from 'date-fns';

/**
 * Get comprehensive dashboard statistics
 */
export async function getDashboardStats() {
  try {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);

    // Total users
    const totalUsers = await db.select({ count: sql<number>`count(*)` }).from(users);

    // New users (last 30 days)
    const newUsers = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo));

    // Total reviews
    const totalReviews = await db
      .select({ count: sql<number>`count(*)` })
      .from(reviews)
      .where(eq(reviews.status, 'approved'));

    // Avg rating
    const avgRating = await db
      .select({ avg: sql<number>`avg(rating)` })
      .from(reviews)
      .where(eq(reviews.status, 'approved'));

    // Total revenue
    const totalRevenue = await db
      .select({ total: sql<string>`COALESCE(sum(amount), 0)` })
      .from(payments)
      .where(eq(payments.status, 'completed'));

    // Revenue last 30 days
    const revenueThisMonth = await db
      .select({ total: sql<string>`COALESCE(sum(amount), 0)` })
      .from(payments)
      .where(and(
        eq(payments.status, 'completed'),
        gte(payments.createdAt, thirtyDaysAgo)
      ));

    // Top services
    const topServices = await db
      .select({
        serviceId: reviews.serviceId,
        reviewCount: sql<number>`count(*)`,
      })
      .from(reviews)
      .where(eq(reviews.status, 'approved'))
      .groupBy(reviews.serviceId)
      .orderBy(sql<number>`count(*)`)
      .limit(5);

    // User growth (last 30 days)
    const userGrowth = await db
      .select({
        date: sql<string>`date(created_at)`,
        count: sql<number>`count(*)`,
      })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo))
      .groupBy(sql`date(created_at)`)
      .orderBy(sql`date(created_at)`);

    return {
      totals: {
        users: totalUsers[0]?.count || 0,
        newUsers: newUsers[0]?.count || 0,
        reviews: totalReviews[0]?.count || 0,
        avgRating: Math.round((avgRating[0]?.avg || 0) * 10) / 10,
        totalRevenue: parseFloat(totalRevenue[0]?.total || '0'),
        revenueThisMonth: parseFloat(revenueThisMonth[0]?.total || '0'),
      },
      topServices,
      userGrowth,
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return {
      totals: { users: 0, newUsers: 0, reviews: 0, avgRating: 0, totalRevenue: 0, revenueThisMonth: 0 },
      topServices: [],
      userGrowth: [],
    };
  }
}

/**
 * Get rating distribution
 */
export async function getRatingDistribution() {
  try {
    const distribution = await db
      .select({
        rating: reviews.rating,
        count: sql<number>`count(*)`,
      })
      .from(reviews)
      .where(eq(reviews.status, 'approved'))
      .groupBy(reviews.rating)
      .orderBy(reviews.rating);

    return distribution.reduce((acc, r) => {
      acc[r.rating] = r.count;
      return acc;
    }, {} as Record<number, number>);
  } catch (error) {
    console.error('Rating distribution error:', error);
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }
}

/**
 * Get recommendation effectiveness
 */
export async function getRecommendationMetrics() {
  try {
    const totalRecs = await db.select({ count: sql<number>`count(*)` }).from(recommendations);

    const clicked = await db
      .select({ count: sql<number>`count(*)` })
      .from(recommendations)
      .where(eq(recommendations.clicked, true));

    const converted = await db
      .select({ count: sql<number>`count(*)` })
      .from(recommendations)
      .where(eq(recommendations.converted, true));

    const total = totalRecs[0]?.count || 0;

    return {
      total,
      clicked: clicked[0]?.count || 0,
      converted: converted[0]?.count || 0,
      clickThroughRate: total > 0 ? Math.round(((clicked[0]?.count || 0) / total) * 100) : 0,
      conversionRate: total > 0 ? Math.round(((converted[0]?.count || 0) / total) * 100) : 0,
    };
  } catch (error) {
    console.error('Recommendation metrics error:', error);
    return { total: 0, clicked: 0, converted: 0, clickThroughRate: 0, conversionRate: 0 };
  }
}
