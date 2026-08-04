import { query } from '@/lib/db-raw';
import redis from '@/lib/redis-client';
import { v4 as uuid } from 'uuid';

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  sessionId: string;
  eventType: 'page_view' | 'conversion' | 'click' | 'form_submit' | 'error' | 'custom';
  eventName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
  timestamp: number;
  url: string;
  userAgent: string;
  ip: string;
}

export interface ConversionFunnel {
  name: string;
  steps: string[];
  conversions: number;
  dropoff: Record<string, number>;
}

const ANALYTICS_PREFIX = 'analytics:';

export const trackEvent = async (
  event: Omit<AnalyticsEvent, 'id' | 'timestamp'>
): Promise<AnalyticsEvent> => {
  const analyticsEvent: AnalyticsEvent = {
    ...event,
    id: uuid(),
    timestamp: Date.now(),
  };

  // Store in Redis for real-time dashboards (24h TTL)
  const key = `${ANALYTICS_PREFIX}events:${analyticsEvent.sessionId}`;
  await redis.lpush(key, JSON.stringify(analyticsEvent));
  await redis.expire(key, 86400);

  // Batch store to DB (async, doesn't block)
  void storeAnalyticsEvent(analyticsEvent);

  return analyticsEvent;
};

const storeAnalyticsEvent = async (event: AnalyticsEvent) => {
  try {
    const result = await query(
      `INSERT INTO analytics_events (
        id, user_id, session_id, event_type, event_name, properties, 
        created_at, url, user_agent, ip
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO NOTHING`,
      [
        event.id,
        event.userId || null,
        event.sessionId,
        event.eventType,
        event.eventName,
        JSON.stringify(event.properties),
        new Date(event.timestamp),
        event.url,
        event.userAgent,
        event.ip,
      ]
    );
    return result;
  } catch (error) {
    console.error('Failed to store analytics event:', error);
  }
};

export const getUserConversions = async (
  userId: string,
  timeframe: '24h' | '7d' | '30d' = '30d'
): Promise<number> => {
  const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const result = await query(
      `SELECT COUNT(*) as total FROM analytics_events 
       WHERE user_id = $1 AND event_type = 'conversion' AND created_at >= $2`,
      [userId, since]
    );
    return parseInt(result.rows[0]?.total || '0', 10);
  } catch (error) {
    console.error('Failed to get user conversions:', error);
    return 0;
  }
};

export const getConversionFunnel = async (
  funnelName: string,
  timeframe: '24h' | '7d' | '30d' = '30d'
): Promise<ConversionFunnel> => {
  const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const result = await query(
      `SELECT event_name, COUNT(DISTINCT session_id) as count 
       FROM analytics_events 
       WHERE properties->>'funnel' = $1 AND created_at >= $2
       GROUP BY event_name
       ORDER BY created_at ASC`,
      [funnelName, since]
    );

    const steps = result.rows.map((r) => r.event_name);
    const conversions = result.rows[result.rows.length - 1]?.count || 0;
    const dropoff: Record<string, number> = {};

    for (let i = 0; i < result.rows.length - 1; i++) {
      const current = result.rows[i]?.count || 0;
      const next = result.rows[i + 1]?.count || 0;
      dropoff[steps[i]] = current - next;
    }

    return {
      name: funnelName,
      steps,
      conversions,
      dropoff,
    };
  } catch (error) {
    console.error('Failed to get conversion funnel:', error);
    return {
      name: funnelName,
      steps: [],
      conversions: 0,
      dropoff: {},
    };
  }
};

export const getEventStats = async (
  timeframe: '24h' | '7d' | '30d' = '30d'
): Promise<Record<string, number>> => {
  const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const result = await query(
      `SELECT event_type, COUNT(*) as count FROM analytics_events 
       WHERE created_at >= $1
       GROUP BY event_type`,
      [since]
    );

    const stats: Record<string, number> = {};
    result.rows.forEach((row) => {
      stats[row.event_type] = parseInt(row.count, 10);
    });
    return stats;
  } catch (error) {
    console.error('Failed to get event stats:', error);
    return {};
  }
};

export const getCohortData = async (
  property: string,
  timeframe: '24h' | '7d' | '30d' = '30d'
): Promise<Record<string, number>> => {
  const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const result = await query(
      `SELECT properties->$1 as cohort_value, COUNT(DISTINCT user_id) as count
       FROM analytics_events 
       WHERE created_at >= $2
       GROUP BY cohort_value`,
      [property, since]
    );

    const cohorts: Record<string, number> = {};
    result.rows.forEach((row) => {
      cohorts[row.cohort_value || 'unknown'] = parseInt(row.count, 10);
    });
    return cohorts;
  } catch (error) {
    console.error('Failed to get cohort data:', error);
    return {};
  }
};
