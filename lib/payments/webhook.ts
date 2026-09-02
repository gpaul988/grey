import crypto from 'crypto';

// Simple in-memory idempotency cache for webhook processing in dev/demo.
// Production should persist this to DB.
const processedEvents = new Map<string, number>(); // key -> timestamp
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function markProcessed(key: string) {
  processedEvents.set(key, Date.now());
}

export function isProcessed(key: string) {
  const v = processedEvents.get(key);
  if (!v) return false;
  if (Date.now() - v > IDEMPOTENCY_TTL_MS) {
    processedEvents.delete(key);
    return false;
  }
  return true;
}

export function verifyPaystackSignature(rawBody: string, signatureHeader?: string, secret?: string) {
  if (!secret) return false;
  if (!signatureHeader) return false;
  try {
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(signatureHeader, 'hex'));
  } catch {
    return false;
  }
}

export function verifyFlutterwaveSignature(rawBody: string, signatureHeader?: string, secret?: string) {
  // Flutterwave uses sha512 HMAC on the raw body with secret (header: verif-hash)
  if (!secret) return false;
  if (!signatureHeader) return false;
  try {
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(signatureHeader, 'hex'));
  } catch {
    return false;
  }
}

export function verifyStripeSignature() {
  // Placeholder: stripe verification should be done with stripe SDK using the signing secret.
  return false;
}
