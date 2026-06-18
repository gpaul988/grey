import { NextApiRequest, NextApiResponse } from 'next';
import { getDashboardStats, getRatingDistribution, getRecommendationMetrics } from '@/lib/dashboard-stats';
import { withAuth } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stats = await getDashboardStats();
    const ratingDist = await getRatingDistribution();
    const recMetrics = await getRecommendationMetrics();

    res.status(200).json({
      stats,
      ratingDistribution: ratingDist,
      recommendationMetrics: recMetrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch dashboard stats' });
  }
});
