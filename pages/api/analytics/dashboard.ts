import { NextApiRequest, NextApiResponse } from 'next';
import { getDashboardMetrics, getMetricsWithCache } from '@/lib/analytics/dashboard';
import { authenticate } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Optional: require authentication for dashboard access
  // await authenticate(req, res);

  const { timeframe = '30d', cache = 'true' } = req.query;

  if (!['24h', '7d', '30d'].includes(timeframe as string)) {
    return res.status(400).json({ error: 'Invalid timeframe' });
  }

  try {
    const useCache = cache !== 'false';
    const metrics = useCache
      ? await getMetricsWithCache(timeframe as '24h' | '7d' | '30d')
      : await getDashboardMetrics(timeframe as '24h' | '7d' | '30d');

    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(metrics);
  } catch (error) {
    console.error('Failed to get dashboard metrics:', error);
    return res.status(500).json({ error: 'Failed to fetch metrics' });
  }
}
