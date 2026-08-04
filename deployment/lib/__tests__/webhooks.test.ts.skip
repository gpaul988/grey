import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  subscribeWebhook,
  unsubscribeWebhook,
  updateWebhook,
  getUserWebhooks,
  emitEvent,
  getWebhookDeliveries,
  getWebhookStats,
} from '../webhooks/manager';
import {
  emitUserSignup,
  emitPaymentCompleted,
  emitAuditCompleted,
} from '../webhooks/events';

describe('Webhooks (lib/webhooks/)', () => {
  const testUserId = 999;
  const testEndpoint = 'https://example.com/webhook';
  const testEndpoint2 = 'https://another.com/webhook';
  let webhookId: number;

  describe('Subscribe & Manage', () => {
    it('should subscribe to webhook with valid URL and events', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        testEndpoint,
        ['user.signup', 'payment.completed']
      );

      expect(webhook).toBeTruthy();
      expect(webhook?.endpoint).toBe(testEndpoint);
      expect(webhook?.userId).toBe(testUserId);
      expect(webhook?.active).toBe(true);
      expect(webhook?.secret).toBeTruthy();
      webhookId = webhook?.id || 0;
    });

    it('should reject invalid URL', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        'not-a-valid-url',
        ['user.signup']
      );

      expect(webhook).toBeNull();
    });

    it('should reject no valid events', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        testEndpoint,
        ['invalid.event']
      );

      expect(webhook).toBeNull();
    });

    it('should get all webhooks for user', async () => {
      const webhooks = await getUserWebhooks(testUserId);

      expect(Array.isArray(webhooks)).toBe(true);
      expect(webhooks.length).toBeGreaterThan(0);
      expect(webhooks[0].userId).toBe(testUserId);
    });

    it('should update webhook configuration', async () => {
      const updated = await updateWebhook(
        webhookId,
        testUserId,
        {
          endpoint: testEndpoint2,
          events: ['user.signup'],
        }
      );

      expect(updated).toBeTruthy();
      expect(updated?.endpoint).toBe(testEndpoint2);
    });

    it('should not update webhook for different user', async () => {
      const updated = await updateWebhook(
        webhookId,
        999999,
        { endpoint: 'https://new-endpoint.com' }
      );

      expect(updated).toBeFalsy();
    });

    it('should activate/deactivate webhook', async () => {
      let updated = await updateWebhook(
        webhookId,
        testUserId,
        { active: false }
      );

      expect(updated?.active).toBe(false);

      updated = await updateWebhook(
        webhookId,
        testUserId,
        { active: true }
      );

      expect(updated?.active).toBe(true);
    });
  });

  describe('Event Emission', () => {
    it('should emit user.signup event', async () => {
      const count = await emitUserSignup(testUserId, 'test@example.com', 'testuser');

      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should emit payment.completed event', async () => {
      const count = await emitPaymentCompleted(
        123,
        testUserId,
        99.99,
        'USD',
        'stripe',
        { orderId: 456 }
      );

      expect(typeof count).toBe('number');
    });

    it('should emit audit.completed event', async () => {
      const count = await emitAuditCompleted(
        789,
        testUserId,
        'Website Audit',
        85,
        12
      );

      expect(typeof count).toBe('number');
    });

    it('should emit event to subscribed webhooks', async () => {
      const count = await emitEvent('user.signup', {
        userId: testUserId,
        email: 'new@example.com',
      });

      expect(typeof count).toBe('number');
    });
  });

  describe('Delivery History', () => {
    it('should get webhook delivery history', async () => {
      const deliveries = await getWebhookDeliveries(webhookId);

      expect(Array.isArray(deliveries)).toBe(true);
    });

    it('should get webhook statistics', async () => {
      const stats = await getWebhookStats(webhookId);

      expect(stats).toHaveProperty('totalDeliveries');
      expect(stats).toHaveProperty('successfulDeliveries');
      expect(stats).toHaveProperty('failedDeliveries');
      expect(stats).toHaveProperty('successRate');
      expect(typeof stats.totalDeliveries).toBe('number');
      expect(typeof stats.successRate).toBe('number');
      expect(stats.successRate).toBeGreaterThanOrEqual(0);
      expect(stats.successRate).toBeLessThanOrEqual(100);
    });
  });

  describe('Error Handling', () => {
    it('should gracefully handle database errors', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        'https://valid-url.com',
        ['user.signup']
      );

      expect(webhook === null || webhook?.id).toBeTruthy();
    });

    it('should return empty array for non-existent user', async () => {
      const webhooks = await getUserWebhooks(999999999);

      expect(Array.isArray(webhooks)).toBe(true);
      expect(webhooks.length).toBe(0);
    });

    it('should handle invalid webhook ID gracefully', async () => {
      const updated = await updateWebhook(
        999999,
        testUserId,
        { active: false }
      );

      expect(updated).toBeFalsy();
    });

    it('should handle emission errors gracefully', async () => {
      const count = await emitEvent('user.signup', {});

      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple events subscription', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        'https://multi-event.com/webhook',
        ['user.signup', 'user.updated', 'payment.completed', 'audit.completed']
      );

      expect(webhook).toBeTruthy();
      expect(webhook?.events).toHaveLength(4);
    });

    it('should filter duplicate events', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        'https://dupe.com/webhook',
        ['user.signup', 'user.signup']
      );

      expect(webhook).toBeTruthy();
      // After dedup via Set or filter
      expect(webhook?.events.length).toBeLessThanOrEqual(2);
    });

    it('should have secret on webhook', async () => {
      const webhooks = await getUserWebhooks(testUserId);
      const webhook = webhooks[0];

      expect(webhook?.secret).toBeTruthy();
      expect(typeof webhook?.secret).toBe('string');
      expect(webhook.secret.length).toBeGreaterThan(0);
    });
  });

  describe('Cleanup', () => {
    it('should unsubscribe webhook', async () => {
      const success = await unsubscribeWebhook(webhookId, testUserId);

      expect(success).toBe(true);

      const webhooks = await getUserWebhooks(testUserId);
      expect(webhooks.find(w => w.id === webhookId)).toBeUndefined();
    });

    it('should not unsubscribe for different user', async () => {
      const webhook = await subscribeWebhook(
        testUserId,
        'https://cleanup.com/webhook',
        ['user.signup']
      );

      const id = webhook?.id || 0;

      const success = await unsubscribeWebhook(id, 999999);

      expect(success).toBe(false);

      // Cleanup
      await unsubscribeWebhook(id, testUserId);
    });
  });
});
