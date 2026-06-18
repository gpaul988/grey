import Stripe from 'stripe';
import { query } from '@/lib/db-raw';
import { v4 as uuid } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Don't specify apiVersion to use latest
});

export interface StripePaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_action';
}

export const createPaymentIntent = async (
  userId: string,
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
): Promise<StripePaymentIntent> => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        userId,
        transactionId: uuid(),
        ...metadata,
      },
    });

    // Store transaction
    await query(
      `INSERT INTO payments (id, user_id, provider, amount, currency, status, stripe_intent_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [uuid(), userId, 'stripe', amount, currency, intent.status, intent.id, new Date()]
    );

    return {
      id: intent.id,
      clientSecret: intent.client_secret || '',
      amount,
      status: intent.status as any,
    };
  } catch (error) {
    console.error('Failed to create Stripe payment intent:', error);
    throw error;
  }
};

export const confirmPaymentIntent = async (
  intentId: string
): Promise<{ status: string; amount: number }> => {
  try {
    const intent = await stripe.paymentIntents.retrieve(intentId);
    return {
      status: intent.status,
      amount: intent.amount / 100,
    };
  } catch (error) {
    console.error('Failed to confirm payment intent:', error);
    throw error;
  }
};

export const refundPayment = async (
  intentId: string,
  reason?: string
): Promise<{ refundId: string; amount: number }> => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: intentId,
      reason: (reason as any) || 'requested_by_customer',
    });

    return {
      refundId: refund.id,
      amount: refund.amount / 100,
    };
  } catch (error) {
    console.error('Failed to refund payment:', error);
    throw error;
  }
};

export const handleStripeWebhook = async (
  event: Stripe.Event
): Promise<{ success: boolean }> => {
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to handle Stripe webhook:', error);
    throw error;
  }
};

const handlePaymentSucceeded = async (intent: Stripe.PaymentIntent) => {
  const metadata = intent.metadata || {};
  await query(
    `UPDATE payments SET status = $1, updated_at = $2 WHERE stripe_intent_id = $3`,
    ['succeeded', new Date(), intent.id]
  );
};

const handlePaymentFailed = async (intent: Stripe.PaymentIntent) => {
  const metadata = intent.metadata || {};
  await query(
    `UPDATE payments SET status = $1, error = $2, updated_at = $3 WHERE stripe_intent_id = $4`,
    ['failed', intent.last_payment_error?.message || 'Unknown error', new Date(), intent.id]
  );
};

const handleChargeRefunded = async (charge: Stripe.Charge) => {
  await query(
    `UPDATE payments SET status = $1, refunded_at = $2 WHERE stripe_intent_id = $3`,
    ['refunded', new Date(), charge.payment_intent]
  );
};
