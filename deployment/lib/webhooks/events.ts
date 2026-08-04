import { emitEvent } from './manager';

/**
 * Emit user.signup event
 */
export async function emitUserSignup(
  userId: number,
  email: string,
  username?: string
): Promise<number> {
  return emitEvent('user.signup', {
    userId,
    email,
    username,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit user.updated event
 */
export async function emitUserUpdated(
  userId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changes: Record<string, any>
): Promise<number> {
  return emitEvent('user.updated', {
    userId,
    changes,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit payment.completed event
 */
export async function emitPaymentCompleted(
  paymentId: number,
  userId: number,
  amount: number,
  currency: string,
  gateway: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
): Promise<number> {
  return emitEvent('payment.completed', {
    paymentId,
    userId,
    amount,
    currency,
    gateway,
    metadata,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit audit.completed event
 */
export async function emitAuditCompleted(
  auditId: number,
  userId: number,
  serviceName: string,
  score: number,
  findingsCount: number
): Promise<number> {
  return emitEvent('audit.completed', {
    auditId,
    userId,
    serviceName,
    score,
    findingsCount,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit custom event
 */
export async function emitCustomEvent(
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
): Promise<number> {
  return emitEvent(eventName, {
    ...data,
    timestamp: new Date().toISOString(),
  });
}
