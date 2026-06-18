import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { withAuth, SessionPayload } from '@/lib/auth';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { status, limit = '20', offset = '0' } = req.query;

    const query = db.select().from(reviews);

    const allReviews = await (status
      ? query.where(eq(reviews.status, status as string))
      : query
    )
      .orderBy(reviews.createdAt)
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

    res.status(200).json({
      data: allReviews,
      count: allReviews.length,
    });
  } catch (error: any) {
    console.error('Admin reviews list error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch reviews' });
  }
});
