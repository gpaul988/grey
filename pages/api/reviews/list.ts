import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { serviceId, limit = '10', offset = '0' } = req.query;

    if (!serviceId) {
      return res.status(400).json({ error: 'serviceId is required' });
    }

    const serviceIdNum = parseInt(serviceId as string);

    const serviceReviews = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.serviceId, serviceIdNum),
          eq(reviews.status, 'approved')
        )
      )
      .orderBy(reviews.createdAt)
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

    // Calculate stats
    const allReviews = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.serviceId, serviceIdNum),
          eq(reviews.status, 'approved')
        )
      );

    const avgRating =
      allReviews.length > 0
        ? (allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length).toFixed(1)
        : 0;

    res.status(200).json({
      data: serviceReviews,
      stats: {
        totalReviews: allReviews.length,
        averageRating: avgRating,
        ratingBreakdown: {
          5: allReviews.filter((r: any) => r.rating === 5).length,
          4: allReviews.filter((r: any) => r.rating === 4).length,
          3: allReviews.filter((r: any) => r.rating === 3).length,
          2: allReviews.filter((r: any) => r.rating === 2).length,
          1: allReviews.filter((r: any) => r.rating === 1).length,
        },
      },
    });
  } catch (error: any) {
    console.error('Review list error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch reviews' });
  }
};
