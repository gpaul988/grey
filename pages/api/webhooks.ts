/**
 * Webhooks API
 * Register, update, delete, and list webhooks
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  registerWebhook,
  getWebhook,
  listWebhooks,
  updateWebhook,
  deleteWebhook,
  getWebhookStats,
} from '@/lib/webhooks/manager';
import { WebhookProvider } from '@/lib/webhooks/types';

interface WebhooksResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhooksResponse>
) {
  try {
    // All webhook endpoints require auth
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: x-user-id header required',
      });
    }

    if (req.method === 'GET') {
      // List webhooks
      const webhooks = await listWebhooks(userId);
      return res.status(200).json({
        success: true,
        data: webhooks,
      });
    }

    if (req.method === 'POST') {
      // Register new webhook
      const { url, provider, events, headers } = req.body;

      if (!url || !provider || !events || events.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: url, provider, events',
        });
      }

      if (!Object.values(WebhookProvider).includes(provider)) {
        return res.status(400).json({
          success: false,
          error: `Invalid provider. Must be one of: ${Object.values(WebhookProvider).join(', ')}`,
        });
      }

      const webhook = await registerWebhook(userId, url, provider, events, {
        headers,
      });

      return res.status(201).json({
        success: true,
        data: webhook,
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error: any) {
    console.error('[Webhooks API Error]', error);

    return res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : error.message,
    });
  }
}
