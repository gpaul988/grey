import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { gte } from 'drizzle-orm';
import { users, payments, analyticsEvents, reviews } from '@/lib/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { format = 'json', startDate, endDate } = req.query;
    const db = getDb();

    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate as string) : new Date();

    // Fetch data
    const userList = await db.select().from(users);
    const paymentList = await db.select().from(payments).where(gte(payments.createdAt, start));
    const reviewList = await db.select().from(reviews).where(gte(reviews.createdAt, start));
    const eventList = await db.select().from(analyticsEvents).where(gte(analyticsEvents.timestamp, start));

    if (format === 'csv') {
      const csvData = generateCSV({
        users: userList,
        payments: paymentList,
        reviews: reviewList,
        events: eventList,
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="report.csv"');
      return res.status(200).send(csvData);
    } else {
      // JSON Export (default)
      return res.status(200).json({
        report: 'Dashboard Report',
        generatedAt: new Date().toISOString(),
        period: { start, end },
        summary: {
          totalUsers: userList.length,
          totalRevenue: paymentList.reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0),
          totalReviews: reviewList.length,
          totalEvents: eventList.length,
        },
      });
    }
  } catch (error) {
    console.error('[Export API] Error:', error);
    return res.status(500).json({ error: 'Failed to export report' });
  }
}

function generateCSV(data: any): string {
  const rows: string[] = [];
  
  // Users
  rows.push('USER_ID,EMAIL,ROLE,CREATED_AT');
  data.users.forEach((u: any) => {
    rows.push(`${u.id},${u.email},${u.role},${u.createdAt?.toISOString() || ''}`);
  });
  
  rows.push('');
  rows.push('PAYMENT_ID,USER_ID,AMOUNT,STATUS,CREATED_AT');
  data.payments.forEach((p: any) => {
    rows.push(`${p.id},${p.userId},${p.amount},${p.status},${p.createdAt?.toISOString() || ''}`);
  });

  return rows.join('\n');
}
