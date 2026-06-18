import { NextApiRequest, NextApiResponse } from 'next';
import { trackEvent } from '@/lib/analytics/events';
import { getClientIp } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, eventType, eventName, properties, url } = req.body;

  if (!sessionId || !eventType || !eventName || !url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const event = await trackEvent({
      sessionId,
      eventType,
      eventName,
      properties: properties || {},
      url,
      userAgent: req.headers['user-agent'] || 'Unknown',
      ip: getClientIp(req) || 'Unknown',
      userId: (req as any).user?.id,
    });

    return res.status(200).json({ success: true, eventId: event.id });
  } catch (error) {
    console.error('Failed to track event:', error);
    return res.status(500).json({ error: 'Failed to track event' });
  }
}
