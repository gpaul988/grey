import { describe, it, expect, vi } from 'vitest';
import { trackSignup, trackPayment, trackQuoteRequest } from '../analytics';

// Mock Mixpanel
vi.mock('../analytics', async () => {
  const actual = await vi.importActual('../analytics');
  return {
    ...actual,
    getMixpanel: vi.fn(() => null), // Disable in tests
  };
});

describe('Analytics Tracking', () => {
  it('should track signup (no-op with mock)', () => {
    expect(() => trackSignup('user-1', 'test@example.com', 'NG')).not.toThrow();
  });

  it('should track quote request', () => {
    expect(() => trackQuoteRequest('user-1', 'service-1', 'Web Development')).not.toThrow();
  });

  it('should track payment', () => {
    expect(() => trackPayment('user-1', 'payment-1', 5000, 'NGN')).not.toThrow();
  });
});
