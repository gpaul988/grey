/**
 * Single Webhook Endpoint
 * Get, update, delete individual webhooks
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getWebhook,
  updateWebhook,
  deleteWebhook,
  getDeliveryHistory,
} from '@/lib/webhooks/manager';

interface WebhookResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse>
) {
  try {
    const { id, action } = req.query;
    const webhookId = id as string;

    // Auth required
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    if (req.method === 'GET') {
      if (action === 'history') {
        // Get delivery history
        const history = await getDeliveryHistory(webhookId, 50);
        return res.status(200).json({
          success: true,
          data: history,
        });
      }

      // Get webhook details
      const webhook = await getWebhook(webhookId);
      if (!webhook) {
        return res.status(404).json({
          success: false,
          error: 'Webhook not found',
        });
      }

      if (webhook.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
        });
      }

      return res.status(200).json({
        success: true,
        data: webhook,
      });
    }

    if (req.method === 'PUT') {
      // Update webhook
      const webhook = await getWebhook(webhookId);
      if (!webhook) {
        return res.status(404).json({
          success: false,
          error: 'Webhook not found',
        });
      }

      if (webhook.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
        });
      }

      const { url, events, active, headers } = req.body;
      const updated = await updateWebhook(webhookId, {
        ...(url && { url }),
        ...(events && { events }),
        ...(typeof active !== 'undefined' && { active }),
        ...(headers && { headers }),
      });

      return res.status(200).json({
        success: true,
        data: updated,
      });
    }

    if (req.method === 'DELETE') {
      // Delete webhook
      const webhook = await getWebhook(webhookId);
      if (!webhook) {
        return res.status(404).json({
          success: false,
          error: 'Webhook not found',
        });
      }

      if (webhook.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
        });
      }

      await deleteWebhook(webhookId);
      return res.status(200).json({
        success: true,
        data: { deleted: true },
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error: any) {
    console.error('[Webhook Endpoint Error]', error);

    return res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : error.message,
    });
  }
}
