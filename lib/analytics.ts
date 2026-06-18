/**
 * Analytics Integration - Mixpanel
 * Tracks user behavior, conversions, and engagement
 */

// Re-export event tracking functions from analytics/events
export { trackEvent, getEventStats, getCohortData, getMetricsWithCache } from './analytics/events';

let mpToken: string | null = null;

/**
 * Initialize Mixpanel
 */
export function initMixpanel() {
  mpToken = process.env.MIXPANEL_TOKEN || null;
  if (!mpToken) {
    console.warn('MIXPANEL_TOKEN not set, analytics disabled');
  }
  return mpToken;
}

/**
 * Track user signup
 */
export function trackSignup(userId: string, email: string, country?: string) {
  if (!mpToken) return;
  // Send to Mixpanel API
  // POST https://api.mixpanel.com/track
  // {event: 'Signup', properties: {distinct_id, email, country, timestamp}}
}

/**
 * Track email verification
 */
export function trackEmailVerified(userId: string) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Email Verified', properties: {distinct_id: userId}}
}

/**
 * Track service view
 */
export function trackServiceView(userId: string | null, serviceId: string, serviceName: string) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Service View', properties: {distinct_id, service_id, service_name}}
}

/**
 * Track quote request
 */
export function trackQuoteRequest(userId: string, serviceId: string, serviceName: string) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Quote Requested', properties: {...}}
}

/**
 * Track quote sent (by admin)
 */
export function trackQuoteSent(quoteId: string, userId: string, amount: number) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Quote Sent', properties: {...}}
}

/**
 * Track payment
 */
export function trackPayment(userId: string, paymentId: string, amount: number, currency: string) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Payment', properties: {distinct_id, amount, currency}}
  // Also update user profile: {$email, $payments_count, $lifetime_revenue}
}

/**
 * Track cart interaction
 */
export function trackCartAdd(userId: string, serviceId: string, quantity: number) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Cart Add', properties: {...}}
}

/**
 * Track contact form submission
 */
export function trackContactSubmit(name: string, email: string) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'Contact Form', properties: {name, email}}
}

/**
 * Track API usage
 */
export function trackAPICall(userId: string, endpoint: string, method: string, statusCode: number) {
  if (!mpToken) return;
  // POST to Mixpanel: {event: 'API Call', properties: {...}}
}

/**
 * Flush pending events (call before app shutdown)
 */
export async function flushAnalytics(): Promise<void> {
  if (!mpToken) return;
  // Send any pending events to Mixpanel
  return Promise.resolve();
}
