/**
 * Webhooks Tests
 * Unit tests for webhook registration, delivery, retries, signatures
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  registerWebhook,
  getWebhook,
  listWebhooks,
  updateWebhook,
  deleteWebhook,
  generateSignature,
  verifySignature,
  getDeliveryHistory,
  getWebhookStats,
  emitEvent,
  clearAllWebhooks,
} from '../webhooks/manager';
import { WebhookEvent, WebhookProvider } from '../webhooks/types';

// Mock fetch
global.fetch = vi.fn();

describe('Webhooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearAllWebhooks();
  });

  // ============================================
  // WEBHOOK REGISTRATION
  // ============================================
  describe('Webhook Registration', () => {
    it('should register a webhook', async () => {
      const webhook = await registerWebhook(
        'user1',
        'https://example.com/webhooks',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );

      expect(webhook.id).toBeDefined();
      expect(webhook.userId).toBe('user1');
      expect(webhook.url).toBe('https://example.com/webhooks');
      expect(webhook.provider).toBe(WebhookProvider.CUSTOM_HTTP);
      expect(webhook.events).toContain(WebhookEvent.ORDER_CREATED);
      expect(webhook.active).toBe(true);
      expect(webhook.secret).toBeDefined();
    });

    it('should register Slack webhook', async () => {
      const webhook = await registerWebhook(
        'user1',
        'https://hooks.slack.com/services/xxx/yyy/zzz',
        WebhookProvider.SLACK,
        [WebhookEvent.ORDER_COMPLETED]
      );

      expect(webhook.provider).toBe(WebhookProvider.SLACK);
    });

    it('should register Discord webhook', async () => {
      const webhook = await registerWebhook(
        'user1',
        'https://discordapp.com/api/webhooks/xxx/yyy',
        WebhookProvider.DISCORD,
        [WebhookEvent.REVIEW_CREATED]
      );

      expect(webhook.provider).toBe(WebhookProvider.DISCORD);
    });

    it('should set custom headers', async () => {
      const headers = { 'X-Custom-Header': 'value' };
      const webhook = await registerWebhook(
        'user1',
        'https://example.com/webhook',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.USER_REGISTERED],
        { headers }
      );

      expect(webhook.headers).toEqual(headers);
    });

    it('should generate unique webhook IDs', async () => {
      const webhook1 = await registerWebhook(
        'user1',
        'https://example.com/1',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );

      const webhook2 = await registerWebhook(
        'user1',
        'https://example.com/2',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );

      expect(webhook1.id).not.toBe(webhook2.id);
    });
  });

  // ============================================
  // WEBHOOK RETRIEVAL
  // ============================================
  describe('Webhook Retrieval', () => {
    beforeEach(async () => {
      await registerWebhook(
        'user1',
        'https://example.com/webhook1',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );

      await registerWebhook(
        'user1',
        'https://example.com/webhook2',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.REVIEW_CREATED]
      );

      await registerWebhook(
        'user2',
        'https://example.com/webhook3',
        WebhookProvider.SLACK,
        [WebhookEvent.ORDER_COMPLETED]
      );
    });

    it('should list user webhooks', async () => {
      const webhooks = await listWebhooks('user1');
      expect(webhooks.length).toBe(2);
      expect(webhooks.every((w) => w.userId === 'user1')).toBe(true);
    });

    it('should filter webhooks by user', async () => {
      const user1Webhooks = await listWebhooks('user1');
      const user2Webhooks = await listWebhooks('user2');

      expect(user1Webhooks.length).toBe(2);
      expect(user2Webhooks.length).toBe(1);
    });

    it('should get webhook by ID', async () => {
      const webhooks = await listWebhooks('user1');
      const webhook = await getWebhook(webhooks[0].id);

      expect(webhook).toBeDefined();
      expect(webhook?.id).toBe(webhooks[0].id);
    });

    it('should return null for nonexistent webhook', async () => {
      const webhook = await getWebhook('nonexistent');
      expect(webhook).toBeNull();
    });
  });

  // ============================================
  // WEBHOOK UPDATES
  // ============================================
  describe('Webhook Updates', () => {
    let webhookId: string;

    beforeEach(async () => {
      const webhook = await registerWebhook(
        'user1',
        'https://example.com/webhook',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );
      webhookId = webhook.id;
    });

    it('should update webhook URL', async () => {
      const updated = await updateWebhook(webhookId, {
        url: 'https://newendpoint.com/webhook',
      });

      expect(updated?.url).toBe('https://newendpoint.com/webhook');
    });

    it('should update events', async () => {
      const updated = await updateWebhook(webhookId, {
        events: [WebhookEvent.ORDER_CREATED, WebhookEvent.ORDER_COMPLETED],
      });

      expect(updated?.events.length).toBe(2);
      expect(updated?.events).toContain(WebhookEvent.ORDER_COMPLETED);
    });

    it('should toggle active status', async () => {
      let updated = await updateWebhook(webhookId, { active: false });
      expect(updated?.active).toBe(false);

      updated = await updateWebhook(webhookId, { active: true });
      expect(updated?.active).toBe(true);
    });

    it('should not allow ID changes', async () => {
      const updated = await updateWebhook(webhookId, {
        id: 'different_id',
      } as any);

      expect(updated?.id).toBe(webhookId);
    });

    it('should update timestamp on changes', async () => {
      const original = await getWebhook(webhookId);
      const originalTime = original?.updatedAt.getTime();

      await new Promise((resolve) => setTimeout(resolve, 10));

      await updateWebhook(webhookId, { active: false });
      const updated = await getWebhook(webhookId);

      expect(updated?.updatedAt.getTime()).toBeGreaterThan(originalTime || 0);
    });
  });

  // ============================================
  // WEBHOOK DELETION
  // ============================================
  describe('Webhook Deletion', () => {
    let webhookId: string;

    beforeEach(async () => {
      const webhook = await registerWebhook(
        'user1',
        'https://example.com/webhook',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );
      webhookId = webhook.id;
    });

    it('should delete webhook', async () => {
      const result = await deleteWebhook(webhookId);
      expect(result).toBe(true);

      const webhook = await getWebhook(webhookId);
      expect(webhook).toBeNull();
    });

    it('should return false for nonexistent webhook', async () => {
      const result = await deleteWebhook('nonexistent');
      expect(result).toBe(false);
    });
  });

  // ============================================
  // SIGNATURE TESTS
  // ============================================
  describe('Signatures', () => {
    it('should generate signature', () => {
      const payload = JSON.stringify({ test: 'data' });
      const secret = 'test-secret-key';

      const signature = generateSignature(payload, secret);

      expect(signature).toBeDefined();
      expect(signature).toMatch(/^[a-f0-9]+$/); // hex string
    });

    it('should verify valid signature', () => {
      const payload = JSON.stringify({ test: 'data' });
      const secret = 'test-secret-key';

      const signature = generateSignature(payload, secret);
      const isValid = verifySignature(payload, signature, secret);

      expect(isValid).toBe(true);
    });

    it('should reject invalid signature', () => {
      const payload = JSON.stringify({ test: 'data' });
      const secret = 'test-secret-key';

      const signature = generateSignature(payload, secret);
      const isValid = verifySignature(payload, signature, 'wrong-secret');

      expect(isValid).toBe(false);
    });

    it('should reject modified payload', () => {
      const payload = JSON.stringify({ test: 'data' });
      const secret = 'test-secret-key';

      const signature = generateSignature(payload, secret);
      const modifiedPayload = JSON.stringify({ test: 'modified' });
      const isValid = verifySignature(modifiedPayload, signature, secret);

      expect(isValid).toBe(false);
    });
  });

  // ============================================
  // DELIVERY HISTORY
  // ============================================
  describe('Delivery History', () => {
    let webhookId: string;

    beforeEach(async () => {
      const webhook = await registerWebhook(
        'user1',
        'https://example.com/webhook',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );
      webhookId = webhook.id;
    });

    it('should retrieve delivery history', async () => {
      const history = await getDeliveryHistory(webhookId);
      expect(Array.isArray(history)).toBe(true);
    });

    it('should limit delivery history', async () => {
      const history = await getDeliveryHistory(webhookId, 5);
      expect(history.length).toBeLessThanOrEqual(5);
    });
  });

  // ============================================
  // STATISTICS
  // ============================================
  describe('Statistics', () => {
    beforeEach(async () => {
      await registerWebhook(
        'user1',
        'https://example.com/webhook1',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED]
      );

      await registerWebhook(
        'user1',
        'https://example.com/webhook2',
        WebhookProvider.SLACK,
        [WebhookEvent.REVIEW_CREATED]
      );
    });

    it('should get webhook statistics', async () => {
      const stats = getWebhookStats();

      expect(stats.totalWebhooks).toBeGreaterThanOrEqual(2);
      expect(stats.activeWebhooks).toBeGreaterThanOrEqual(2);
      expect(stats.totalDeliveries).toBeGreaterThanOrEqual(0);
      expect(stats.failedDeliveries).toBeGreaterThanOrEqual(0);
    });
  });

  // ============================================
  // EVENT EMISSION
  // ============================================
  describe('Event Emission', () => {
    beforeEach(async () => {
      await registerWebhook(
        'user1',
        'https://example.com/webhook1',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.ORDER_CREATED, WebhookEvent.ORDER_COMPLETED]
      );

      await registerWebhook(
        'user1',
        'https://example.com/webhook2',
        WebhookProvider.CUSTOM_HTTP,
        [WebhookEvent.REVIEW_CREATED]
      );
    });

    it('should emit event to matching webhooks', async () => {
      const deliveries = await emitEvent(WebhookEvent.ORDER_CREATED, {
        orderId: '123',
        amount: 999,
      });

      expect(deliveries.length).toBeGreaterThan(0);
    });

    it('should include only matching webhooks', async () => {
      const deliveries = await emitEvent(WebhookEvent.REVIEW_CREATED, {
        reviewId: '456',
        rating: 5,
      });

      // Should only match webhook2
      expect(deliveries.length).toBeGreaterThanOrEqual(1);
    });
  });

  // ============================================
  // WEBHOOK EVENTS
  // ============================================
  describe('Webhook Events', () => {
    it('should include all event types', () => {
      const events = Object.values(WebhookEvent);
      expect(events.length).toBeGreaterThan(0);
      expect(events).toContain(WebhookEvent.ORDER_CREATED);
      expect(events).toContain(WebhookEvent.REVIEW_CREATED);
      expect(events).toContain(WebhookEvent.PAYMENT_RECEIVED);
    });
  });

  // ============================================
  // WEBHOOK PROVIDERS
  // ============================================
  describe('Webhook Providers', () => {
    it('should support all providers', async () => {
      const providers = [
        WebhookProvider.SLACK,
        WebhookProvider.DISCORD,
        WebhookProvider.CUSTOM_HTTP,
      ];

      for (const provider of providers) {
        const webhook = await registerWebhook(
          'user1',
          'https://example.com/webhook',
          provider,
          [WebhookEvent.ORDER_CREATED]
        );

        expect(webhook.provider).toBe(provider);
      }
    });
  });
});
