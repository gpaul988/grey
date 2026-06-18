import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { reviews, userBehavior } from '@/lib/db/schema';
import { withAuth, SessionPayload } from '@/lib/auth';
import { and, eq } from 'drizzle-orm';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { serviceId, rating, title, comment } = req.body;

    if (!serviceId || !rating) {
      return res.status(400).json({ error: 'serviceId and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'rating must be between 1 and 5' });
    }

    // Check if user already reviewed this service
    const existing = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, userId),
          eq(reviews.serviceId, parseInt(serviceId as string))
        )
      );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'You already reviewed this service' });
    }

    // Create review
    const review = await db
      .insert(reviews)
      .values({
        userId,
        serviceId: parseInt(serviceId),
        rating: parseInt(rating),
        title,
        comment,
        status: 'pending', // requires moderation
      })
      .returning();

    // Track behavior
    await db.insert(userBehavior).values({
      userId,
      action: 'review',
      serviceId: parseInt(serviceId),
      metadata: { rating, reviewId: review[0].id },
    });

    res.status(201).json({ data: review[0], message: 'Review submitted for moderation' });
  } catch (error: any) {
    console.error('Review create error:', error);
    res.status(500).json({ error: error.message || 'Failed to create review' });
  }
});
