import type { NextApiRequest, NextApiResponse } from 'next';
import {
  subscribeWebhook,
  unsubscribeWebhook,
  updateWebhook,
  getUserWebhooks,
  getWebhookDeliveries,
  getWebhookStats,
} from '../../lib/webhooks/manager';

/**
 * Simple header-based authentication
 * In production, use JWT or session tokens
 */
function getUserIdFromHeader(req: NextApiRequest): number | null {
  const userId = req.headers['x-user-id'];
  if (!userId) return null;
  
  const id = parseInt(userId as string, 10);
  return isNaN(id) ? null : id;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = getUserIdFromHeader(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - provide X-User-Id header' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return handleGet(req, res, userId);
      case 'POST':
        return handlePost(req, res, userId);
      case 'PUT':
        return handlePut(req, res, userId);
      case 'DELETE':
        return handleDelete(req, res, userId);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Webhooks API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /api/webhooks
 * - ?action=list - Get all webhooks
 * - ?action=deliveries&id=X - Get delivery history
 * - ?action=stats&id=X - Get webhook stats
 */
async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const action = req.query.action as string;

  if (!action || action === 'list') {
    const hooks = await getUserWebhooks(userId);
    return res.status(200).json(hooks);
  }

  if (action === 'deliveries') {
    const webhookId = parseInt(req.query.id as string, 10);
    if (!webhookId) {
      return res.status(400).json({ error: 'Missing webhook ID' });
    }

    const deliveries = await getWebhookDeliveries(webhookId);
    return res.status(200).json(deliveries);
  }

  if (action === 'stats') {
    const webhookId = parseInt(req.query.id as string, 10);
    if (!webhookId) {
      return res.status(400).json({ error: 'Missing webhook ID' });
    }

    const stats = await getWebhookStats(webhookId);
    return res.status(200).json(stats);
  }

  return res.status(400).json({ error: 'Unknown action' });
}

/**
 * POST /api/webhooks
 * Subscribe to webhook events
 * Body: { endpoint: string, events: string[] }
 */
async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const { endpoint, events } = req.body;

  if (!endpoint || !events || !Array.isArray(events)) {
    return res.status(400).json({
      error: 'Missing or invalid endpoint or events',
    });
  }

  const webhook = await subscribeWebhook(userId, endpoint, events);

  if (!webhook) {
    return res.status(400).json({ error: 'Failed to subscribe webhook' });
  }

  return res.status(201).json(webhook);
}

/**
 * PUT /api/webhooks
 * Update webhook configuration
 * Body: { id: number, endpoint?: string, events?: string[], active?: boolean }
 */
async function handlePut(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const { id, endpoint, events, active } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing webhook ID' });
  }

  const updated = await updateWebhook(
    parseInt(id as string, 10),
    userId,
    {
      endpoint,
      events,
      active,
    }
  );

  if (!updated) {
    return res.status(404).json({ error: 'Webhook not found' });
  }

  return res.status(200).json(updated);
}

/**
 * DELETE /api/webhooks
 * Unsubscribe from webhook
 * Query: ?id=X
 */
async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number
) {
  const webhookId = parseInt(req.query.id as string, 10);

  if (!webhookId) {
    return res.status(400).json({ error: 'Missing webhook ID' });
  }

  const success = await unsubscribeWebhook(webhookId, userId);

  if (!success) {
    return res.status(404).json({ error: 'Webhook not found' });
  }

  return res.status(200).json({ message: 'Webhook deleted' });
}
