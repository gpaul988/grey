import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { withAuth } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'id and status are required' });
    }

    const validStatuses = ['pending', 'approved', 'rejected', 'spam'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    }

    const review = await db
      .update(reviews)
      .set({ status, updatedAt: new Date() })
      .where(eq(reviews.id, parseInt(id as string)))
      .returning();

    if (review.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ data: review[0], message: `Review ${status}` });
  } catch (error: any) {
    console.error('Review status error:', error);
    res.status(500).json({ error: error.message || 'Failed to update review status' });
  }
});
