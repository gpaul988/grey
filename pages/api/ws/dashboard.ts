import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { eq, sql } from 'drizzle-orm';
import { users, services, payments, analyticsEvents, reviews } from '@/lib/db/schema';

interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  topServices: Array<{ name: string; count: number; revenue: number }>;
  reviewsCount: number;
  averageRating: number;
  timestamp: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = getDb();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch metrics
    const allUsers = await db.select().from(users);
    const allPayments = await db.select().from(payments);
    const allReviews = await db.select().from(reviews);
    const allEvents = await db.select().from(analyticsEvents);

    const userCount = allUsers.length;
    const activeCount = allEvents.filter(e => {
      const eventTime = new Date(e.timestamp);
      return eventTime.getTime() > now.getTime() - 24 * 60 * 60 * 1000;
    }).length;

    const totalRevenue = allPayments.reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0);
    const monthlyRevenue = allPayments
      .filter(p => p.createdAt && new Date(p.createdAt) >= monthStart)
      .reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0);

    const reviewsCount = allReviews.length;
    const approvedReviews = allReviews.filter(r => r.status === 'approved');
    const averageRating = approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + (typeof r.rating === 'number' ? r.rating : 0), 0) / approvedReviews.length
      : 0;

    // Top services (mock - would need service link data)
    const topServicesData = [
      { name: 'React Services', count: 28, revenue: 1200 },
      { name: 'Node.js Services', count: 22, revenue: 980 },
      { name: 'Laravel Services', count: 18, revenue: 750 },
    ];

    const metrics: DashboardMetrics = {
      totalUsers: userCount,
      activeUsers: activeCount,
      totalRevenue,
      monthlyRevenue,
      topServices: topServicesData,
      reviewsCount,
      averageRating: Math.round(averageRating * 10) / 10,
      timestamp: new Date(),
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=15');
    return res.status(200).json(metrics);
  } catch (error) {
    console.error('[Dashboard API] Error:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
}
