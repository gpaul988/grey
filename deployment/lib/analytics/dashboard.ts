import { query } from '@/lib/db-raw';
import redis from '@/lib/redis-client';

export interface DashboardMetrics {
  totalVisitors: number;
  totalConversions: number;
  conversionRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  deviceBreakdown: Record<string, number>;
  geolocation: Record<string, number>;
}

export const getDashboardMetrics = async (
  timeframe: '24h' | '7d' | '30d' = '30d'
): Promise<DashboardMetrics> => {
  const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    // Total visitors (unique sessions)
    const visitorsResult = await query(
      `SELECT COUNT(DISTINCT session_id) as total FROM analytics_events WHERE created_at >= $1`,
      [since]
    );
    const totalVisitors = parseInt(visitorsResult.rows[0]?.total || '0', 10);

    // Total conversions
    const conversionsResult = await query(
      `SELECT COUNT(*) as total FROM analytics_events 
       WHERE event_type = 'conversion' AND created_at >= $1`,
      [since]
    );
    const totalConversions = parseInt(conversionsResult.rows[0]?.total || '0', 10);

    // Conversion rate
    const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;

    // Top pages
    const pagesResult = await query(
      `SELECT url, COUNT(*) as count FROM analytics_events 
       WHERE event_type = 'page_view' AND created_at >= $1
       GROUP BY url
       ORDER BY count DESC
       LIMIT 10`,
      [since]
    );
    const topPages = pagesResult.rows.map((r) => ({ page: r.url, views: parseInt(r.count, 10) }));

    // Top referrers
    const referrersResult = await query(
      `SELECT properties->>'referrer' as referrer, COUNT(*) as count 
       FROM analytics_events 
       WHERE created_at >= $1 AND properties->>'referrer' IS NOT NULL
       GROUP BY referrer
       ORDER BY count DESC
       LIMIT 5`,
      [since]
    );
    const topReferrers = referrersResult.rows.map((r) => ({
      referrer: r.referrer,
      count: parseInt(r.count, 10),
    }));

    // Device breakdown
    const deviceResult = await query(
      `SELECT properties->>'device' as device, COUNT(*) as count 
       FROM analytics_events 
       WHERE created_at >= $1
       GROUP BY device`,
      [since]
    );
    const deviceBreakdown: Record<string, number> = {};
    deviceResult.rows.forEach((r) => {
      deviceBreakdown[r.device || 'unknown'] = parseInt(r.count, 10);
    });

    // Geolocation
    const geoResult = await query(
      `SELECT properties->>'country' as country, COUNT(*) as count 
       FROM analytics_events 
       WHERE created_at >= $1
       GROUP BY country
       ORDER BY count DESC
       LIMIT 10`,
      [since]
    );
    const geolocation: Record<string, number> = {};
    geoResult.rows.forEach((r) => {
      geolocation[r.country || 'unknown'] = parseInt(r.count, 10);
    });

    // Average session duration (rough estimate)
    const sessionResult = await query(
      `SELECT AVG(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))) as avg_duration
       FROM analytics_events 
       WHERE created_at >= $1
       GROUP BY session_id`,
      [since]
    );
    const avgSessionDuration = sessionResult.rows[0]?.avg_duration
      ? Math.round(parseFloat(sessionResult.rows[0].avg_duration))
      : 0;

    return {
      totalVisitors,
      totalConversions,
      conversionRate: Math.round(conversionRate * 100) / 100,
      avgSessionDuration,
      topPages,
      topReferrers,
      deviceBreakdown,
      geolocation,
    };
  } catch (error) {
    console.error('Failed to get dashboard metrics:', error);
    return {
      totalVisitors: 0,
      totalConversions: 0,
      conversionRate: 0,
      avgSessionDuration: 0,
      topPages: [],
      topReferrers: [],
      deviceBreakdown: {},
      geolocation: {},
    };
  }
};

export const cacheMetrics = async (metrics: DashboardMetrics, ttl: number = 3600) => {
  const key = 'dashboard:metrics';
  await redis.set(key, JSON.stringify(metrics), 'EX', ttl);
};

export const getCachedMetrics = async (): Promise<DashboardMetrics | null> => {
  const key = 'dashboard:metrics';
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
};

export const clearMetricsCache = async () => {
  const key = 'dashboard:metrics';
  await redis.del(key);
};

export const getMetricsWithCache = async (
  timeframe: '24h' | '7d' | '30d' = '30d'
): Promise<DashboardMetrics> => {
  const cached = await getCachedMetrics();
  if (cached) return cached;

  const metrics = await getDashboardMetrics(timeframe);
  await cacheMetrics(metrics);
  return metrics;
};
