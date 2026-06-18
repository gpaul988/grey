import { eq, and, desc } from 'drizzle-orm';
import { getDb } from '../db';
import { webhookSubscriptions, webhookDeliveries } from '../db/schema';

export interface WebhookPayload {
  event: string;
  timestamp: number;
  data: Record<string, any>;
}

export interface WebhookSubscription {
  id: number;
  userId: number;
  endpoint: string;
  events: string[];
  active: boolean;
  secret: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generate a secure webhook secret
 */
function generateSecret(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('hex');
}

/**
 * Subscribe a webhook URL to events
 */
export async function subscribeWebhook(
  userId: number,
  endpoint: string,
  events: string[]
): Promise<WebhookSubscription | null> {
  const db = getDb();

  try {
    // Validate URL
    try {
      new URL(endpoint);
    } catch {
      throw new Error('Invalid webhook URL');
    }

    // Validate events
    const validEvents = ['user.signup', 'user.updated', 'payment.completed', 'audit.completed'];
    const filtered = events.filter(e => validEvents.includes(e));
    if (filtered.length === 0) {
      throw new Error('No valid events specified');
    }

    const result = await db.insert(webhookSubscriptions).values({
      userId,
      endpoint,
      events: JSON.stringify(filtered),
      active: true,
      secret: generateSecret(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return result[0] as any;
  } catch (error) {
    console.error('Subscribe webhook error:', error);
    return null;
  }
}

/**
 * Unsubscribe a webhook
 */
export async function unsubscribeWebhook(
  webhookId: number,
  userId: number
): Promise<boolean> {
  const db = getDb();

  try {
    const result = await db
      .delete(webhookSubscriptions)
      .where(and(eq(webhookSubscriptions.id, webhookId), eq(webhookSubscriptions.userId, userId)));

    return (result as any).rowCount > 0;
  } catch (error) {
    console.error('Unsubscribe webhook error:', error);
    return false;
  }
}

/**
 * Update webhook configuration
 */
export async function updateWebhook(
  webhookId: number,
  userId: number,
  updates: {
    endpoint?: string;
    events?: string[];
    active?: boolean;
  }
): Promise<WebhookSubscription | null> {
  const db = getDb();

  try {
    if (updates.endpoint) {
      try {
        new URL(updates.endpoint);
      } catch {
        throw new Error('Invalid webhook URL');
      }
    }

    const updateObj: any = { updatedAt: new Date() };
    if (updates.endpoint) updateObj.endpoint = updates.endpoint;
    if (updates.events) updateObj.events = JSON.stringify(updates.events);
    if (updates.active !== undefined) updateObj.active = updates.active;

    const result = await db
      .update(webhookSubscriptions)
      .set(updateObj)
      .where(and(eq(webhookSubscriptions.id, webhookId), eq(webhookSubscriptions.userId, userId)))
      .returning();

    return result[0] as any;
  } catch (error) {
    console.error('Update webhook error:', error);
    return null;
  }
}

/**
 * Get all webhooks for a user
 */
export async function getUserWebhooks(userId: number): Promise<WebhookSubscription[]> {
  const db = getDb();

  try {
    const results = await db
      .select()
      .from(webhookSubscriptions)
      .where(eq(webhookSubscriptions.userId, userId));

    return results.map(r => ({
      ...r,
      events: Array.isArray(r.events) ? r.events : JSON.parse(r.events as any),
    })) as any;
  } catch (error) {
    console.error('Get user webhooks error:', error);
    return [];
  }
}

/**
 * Emit an event to all subscribed webhooks
 */
export async function emitEvent(
  event: string,
  data: Record<string, any>
): Promise<number> {
  const db = getDb();
  let deliveredCount = 0;

  try {
    // Find all webhooks subscribed to this event
    const subs = await db
      .select()
      .from(webhookSubscriptions)
      .where(eq(webhookSubscriptions.active, true));

    for (const sub of subs) {
      const subEvents = Array.isArray(sub.events) ? sub.events : JSON.parse(sub.events as any);
      if (!subEvents.includes(event)) continue;

      const payload: WebhookPayload = {
        event,
        timestamp: Date.now(),
        data,
      };

      // Deliver asynchronously
      deliverWebhook(
        sub.id,
        sub.endpoint as string,
        payload,
        sub.secret as string
      ).catch(e => console.error(`Webhook delivery error for ${sub.id}:`, e));

      deliveredCount++;
    }
  } catch (error) {
    console.error('Emit event error:', error);
  }

  return deliveredCount;
}

/**
 * Deliver a webhook payload with HMAC signature
 */
export async function deliverWebhook(
  subscriptionId: number,
  endpoint: string,
  payload: WebhookPayload,
  secret: string,
  retries: number = 3
): Promise<boolean> {
  const db = getDb();
  let lastError = '';
  let statusCode = 0;

  // Create HMAC signature
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Event': payload.event,
          'X-Webhook-Timestamp': payload.timestamp.toString(),
          'X-Webhook-Signature': signature,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      statusCode = response.status;

      if (response.ok) {
        // Log successful delivery
        await db.insert(webhookDeliveries).values({
          subscriptionId,
          eventType: payload.event,
          payload: JSON.stringify(payload),
          statusCode: 200,
          response: JSON.stringify({ success: true }),
          retries: attempt,
          createdAt: new Date(),
        }).catch(e => console.error('Log delivery error:', e));

        return true;
      }

      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = (error as Error).message;
    }

    // Exponential backoff: 1s, 2s, 4s
    if (attempt < retries - 1) {
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }

  // Log failed delivery
  await db.insert(webhookDeliveries).values({
    subscriptionId,
    eventType: payload.event,
    payload: JSON.stringify(payload),
    statusCode,
    response: JSON.stringify({ error: lastError }),
    retries,
    createdAt: new Date(),
  }).catch(e => console.error('Log delivery error:', e));

  return false;
}

/**
 * Get webhook delivery history
 */
export async function getWebhookDeliveries(
  subscriptionId: number,
  limit: number = 50
): Promise<any[]> {
  const db = getDb();

  try {
    const results = await db
      .select()
      .from(webhookDeliveries)
      .where(eq(webhookDeliveries.subscriptionId, subscriptionId))
      .orderBy(desc(webhookDeliveries.createdAt))
      .limit(limit);

    return results;
  } catch (error) {
    console.error('Get deliveries error:', error);
    return [];
  }
}

/**
 * Get webhook statistics
 */
export async function getWebhookStats(subscriptionId: number): Promise<{
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  successRate: number;
}> {
  const db = getDb();

  try {
    const all = await db
      .select()
      .from(webhookDeliveries)
      .where(eq(webhookDeliveries.subscriptionId, subscriptionId));

    const successful = all.filter((d: any) => d.statusCode === 200).length;
    const total = all.length;

    return {
      totalDeliveries: total,
      successfulDeliveries: successful,
      failedDeliveries: total - successful,
      successRate: total > 0 ? (successful / total) * 100 : 0,
    };
  } catch (error) {
    console.error('Get stats error:', error);
    return {
      totalDeliveries: 0,
      successfulDeliveries: 0,
      failedDeliveries: 0,
      successRate: 0,
    };
  }
}
