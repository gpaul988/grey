import { NextApiRequest, NextApiResponse } from 'next';
import { generateRecommendations } from '@/lib/recommendations';
import { db } from '@/lib/db';
import { recommendations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { withAuth, SessionPayload } from '@/lib/auth';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { limit = '5' } = req.query;

    // Generate new recommendations
    await generateRecommendations(userId, parseInt(limit as string));

    // Fetch recommendations
    const userRecommendations = await db
      .select()
      .from(recommendations)
      .where(eq(recommendations.userId, userId))
      .orderBy(recommendations.score)
      .limit(parseInt(limit as string));

    res.status(200).json({
      data: userRecommendations,
      message: 'Recommendations generated based on your behavior',
    });
  } catch (error: any) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate recommendations' });
  }
});
