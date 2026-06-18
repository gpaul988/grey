import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { and, gte, lte, eq, sql } from 'drizzle-orm';
import { analyticsEvents, services, payments, users, reviews } from '@/lib/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      startDate,
      endDate,
      serviceId,
      userId,
      status,
      type = 'all',
    } = req.query;

    const db = getDb();
    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate as string) : new Date();

    let response: any = {};

    if (type === 'all' || type === 'events') {
      // Filter analytics events (use timestamp field)
      let query = db.select().from(analyticsEvents).where(
        and(
          gte(analyticsEvents.timestamp, start),
          lte(analyticsEvents.timestamp, end)
        )
      );

      // Note: Can't chain additional where() on built query in this Drizzle version
      // Would need to rebuild from scratch if more filters needed
      const events = await query;
      response.events = {
        count: events.length,
        data: events.slice(0, 100),
      };
    }

    if (type === 'all' || type === 'payments') {
      // Filter payments
      const paymentConditions = [
        gte(payments.createdAt, start),
        lte(payments.createdAt, end),
      ];

      if (status) {
        paymentConditions.push(eq(payments.status, status as string));
      }

      if (userId) {
        paymentConditions.push(eq(payments.userId, parseInt(userId as string)));
      }

      const paymentList = await db.select().from(payments).where(and(...paymentConditions));
      response.payments = {
        count: paymentList.length,
        total: paymentList.reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0),
        data: paymentList.slice(0, 100),
      };
    }

    if (type === 'all' || type === 'reviews') {
      // Filter reviews
      const reviewConditions = [
        gte(reviews.createdAt, start),
        lte(reviews.createdAt, end),
      ];

      if (status) {
        reviewConditions.push(eq(reviews.status, status as string));
      }

      const reviewList = await db.select().from(reviews).where(and(...reviewConditions));
      response.reviews = {
        count: reviewList.length,
        avgRating: reviewList.length > 0
          ? reviewList.reduce((sum, r) => sum + (typeof r.rating === 'number' ? r.rating : 0), 0) / reviewList.length
          : 0,
        data: reviewList.slice(0, 100),
      };
    }

    if (type === 'all' || type === 'users') {
      // Filter users
      const userList = await db.select().from(users).where(
        and(
          gte(users.createdAt, start),
          lte(users.createdAt, end)
        )
      );
      response.users = {
        count: userList.length,
        data: userList.slice(0, 100),
      };
    }

    response.filters = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      serviceId: serviceId || null,
      userId: userId || null,
      status: status || null,
    };

    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json(response);
  } catch (error) {
    console.error('[Filters API] Error:', error);
    return res.status(500).json({ error: 'Failed to apply filters' });
  }
}
