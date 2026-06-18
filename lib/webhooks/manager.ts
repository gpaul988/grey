/**
 * Webhook Manager
 * Handle webhook registration, event delivery, retries
 */

import crypto from 'crypto';
import {
  WebhookEvent,
  WebhookProvider,
  type WebhookEndpoint,
  type WebhookPayload,
  type WebhookDelivery,
} from './types';

// In-memory storage for development
const webhooks = new Map<string, WebhookEndpoint>();
const deliveries = new Map<string, WebhookDelivery>();

/**
 * Clear all webhooks and deliveries (for testing)
 */
export function clearAllWebhooks(): void {
  webhooks.clear();
  deliveries.clear();
}

/**
 * Register a webhook endpoint
 */
export async function registerWebhook(
  userId: string,
  url: string,
  provider: WebhookProvider,
  events: WebhookEvent[],
  options?: { headers?: Record<string, string> }
): Promise<WebhookEndpoint> {
  const id = `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const secret = crypto.randomBytes(32).toString('hex');

  const webhook: WebhookEndpoint = {
    id,
    userId,
    url,
    provider,
    events,
    active: true,
    headers: options?.headers,
    secret,
    retryCount: 3,
    retryInterval: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  webhooks.set(id, webhook);
  return webhook;
}

/**
 * Get webhook by ID
 */
export async function getWebhook(id: string): Promise<WebhookEndpoint | null> {
  return webhooks.get(id) || null;
}

/**
 * List webhooks for user
 */
export async function listWebhooks(userId: string): Promise<WebhookEndpoint[]> {
  return Array.from(webhooks.values()).filter((w) => w.userId === userId);
}

/**
 * Update webhook
 */
export async function updateWebhook(
  id: string,
  updates: Partial<WebhookEndpoint>
): Promise<WebhookEndpoint | null> {
  const webhook = webhooks.get(id);
  if (!webhook) return null;

  const updated = {
    ...webhook,
    ...updates,
    id: webhook.id, // Don't allow ID change
    userId: webhook.userId, // Don't allow user change
    updatedAt: new Date(),
  };

  webhooks.set(id, updated);
  return updated;
}

/**
 * Delete webhook
 */
export async function deleteWebhook(id: string): Promise<boolean> {
  return webhooks.delete(id);
}

/**
 * Generate HMAC signature for webhook
 */
export function generateSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Verify webhook signature
 */
export function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = generateSignature(payload, secret);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * Send webhook to endpoint
 */
export async function sendWebhook<T = any>(
  webhook: WebhookEndpoint,
  event: WebhookEvent,
  data: T
): Promise<WebhookDelivery> {
  const payload: WebhookPayload<T> = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    event,
    timestamp: new Date(),
    data,
    retryCount: 0,
  };

  const payloadString = JSON.stringify(payload);
  const signature = webhook.secret
    ? generateSignature(payloadString, webhook.secret)
    : undefined;

  const delivery: WebhookDelivery = {
    id: `del_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    webhookId: webhook.id,
    event,
    payload,
    attemptNumber: 1,
    failed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Record delivery
  deliveries.set(delivery.id, delivery);

  // Send based on provider
  try {
    if (webhook.provider === WebhookProvider.SLACK) {
      await sendToSlack(webhook.url, payload, signature);
    } else if (webhook.provider === WebhookProvider.DISCORD) {
      await sendToDiscord(webhook.url, payload, signature);
    } else if (webhook.provider === WebhookProvider.CUSTOM_HTTP) {
      await sendToCustomHTTP(webhook.url, payload, signature, webhook.headers);
    }

    delivery.statusCode = 200;
    delivery.completedAt = new Date();
  } catch (error: any) {
    delivery.statusCode = error.statusCode || 500;
    delivery.responseBody = error.message;
    delivery.failed = true;
    delivery.nextRetryAt = new Date(
      Date.now() + webhook.retryInterval * 1000
    );
  }

  deliveries.set(delivery.id, delivery);
  return delivery;
}

/**
 * Send webhook to Slack
 */
async function sendToSlack(
  url: string,
  payload: WebhookPayload,
  signature?: string
): Promise<void> {
  const message = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${payload.event}*\n${JSON.stringify(payload.data, null, 2)}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `_${payload.timestamp.toISOString()}_`,
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature && { 'X-Signature': signature }),
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(`Slack error: ${response.statusText}`);
  }
}

/**
 * Send webhook to Discord
 */
async function sendToDiscord(
  url: string,
  payload: WebhookPayload,
  signature?: string
): Promise<void> {
  const embed = {
    title: payload.event,
    description: JSON.stringify(payload.data, null, 2),
    timestamp: payload.timestamp.toISOString(),
    color: 0x0099ff,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature && { 'X-Signature': signature }),
    },
    body: JSON.stringify({ embeds: [embed] }),
  });

  if (!response.ok) {
    throw new Error(`Discord error: ${response.statusText}`);
  }
}

/**
 * Send webhook to custom HTTP endpoint
 */
async function sendToCustomHTTP(
  url: string,
  payload: WebhookPayload,
  signature?: string,
  headers?: Record<string, string>
): Promise<void> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature && { 'X-Signature': signature }),
      ...headers,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.statusText}`);
  }
}

/**
 * Retry failed delivery
 */
export async function retryDelivery(
  deliveryId: string,
  webhook: WebhookEndpoint
): Promise<WebhookDelivery | null> {
  const delivery = deliveries.get(deliveryId);
  if (!delivery) return null;

  if (delivery.attemptNumber >= webhook.retryCount) {
    delivery.failed = true;
    return delivery;
  }

  const newDelivery = {
    ...delivery,
    id: `del_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    attemptNumber: delivery.attemptNumber + 1,
    updatedAt: new Date(),
  };

  deliveries.set(newDelivery.id, newDelivery);

  // Re-send
  try {
    if (webhook.provider === WebhookProvider.SLACK) {
      await sendToSlack(webhook.url, delivery.payload, webhook.secret);
    } else if (webhook.provider === WebhookProvider.DISCORD) {
      await sendToDiscord(webhook.url, delivery.payload, webhook.secret);
    } else if (webhook.provider === WebhookProvider.CUSTOM_HTTP) {
      await sendToCustomHTTP(webhook.url, delivery.payload, webhook.secret, webhook.headers);
    }

    newDelivery.statusCode = 200;
    newDelivery.completedAt = new Date();
  } catch (error: any) {
    newDelivery.statusCode = error.statusCode || 500;
    newDelivery.failed = true;
    newDelivery.nextRetryAt = new Date(
      Date.now() + webhook.retryInterval * 1000 * newDelivery.attemptNumber
    );
  }

  deliveries.set(newDelivery.id, newDelivery);
  return newDelivery;
}

/**
 * Get delivery history
 */
export async function getDeliveryHistory(
  webhookId: string,
  limit: number = 20
): Promise<WebhookDelivery[]> {
  return Array.from(deliveries.values())
    .filter((d) => d.webhookId === webhookId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

/**
 * Emit event to all registered webhooks
 */
export async function emitEvent<T = any>(
  event: WebhookEvent,
  data: T
): Promise<WebhookDelivery[]> {
  const activeWebhooks = Array.from(webhooks.values()).filter(
    (w) => w.active && w.events.includes(event)
  );

  const deliveries_list: WebhookDelivery[] = [];

  for (const webhook of activeWebhooks) {
    const delivery = await sendWebhook(webhook, event, data);
    deliveries_list.push(delivery);
  }

  return deliveries_list;
}

/**
 * Get webhook statistics
 */
export function getWebhookStats(): {
  totalWebhooks: number;
  activeWebhooks: number;
  totalDeliveries: number;
  failedDeliveries: number;
} {
  const webhooksList = Array.from(webhooks.values());
  const deliveriesList = Array.from(deliveries.values());

  return {
    totalWebhooks: webhooksList.length,
    activeWebhooks: webhooksList.filter((w) => w.active).length,
    totalDeliveries: deliveriesList.length,
    failedDeliveries: deliveriesList.filter((d) => d.failed).length,
  };
}
