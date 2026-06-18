import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/lib/auth';
import { confirmPaymentIntent, handleStripeWebhook } from '@/lib/payments/stripe';
import { captureOrder, getOrderDetails } from '@/lib/payments/paypal';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Client-side payment verification
    try {
      const user = await authenticate(req, res);
      if (!user) return;

      const { provider, intentId, orderId } = req.body;

      if (provider === 'stripe' && intentId) {
        const result = await confirmPaymentIntent(intentId);
        return res.status(200).json(result);
      }

      if (provider === 'paypal' && orderId) {
        const result = await captureOrder(orderId);
        return res.status(200).json(result);
      }

      return res.status(400).json({ error: 'Invalid payment provider or ID' });
    } catch (error) {
      console.error('Payment verification failed:', error);
      return res.status(500).json({ error: 'Payment verification failed' });
    }
  }

  if (req.method === 'GET') {
    // Webhook handling (for payment completion)
    const { intentId, orderId } = req.query;

    if (intentId) {
      try {
        const result = await confirmPaymentIntent(intentId as string);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(404).json({ error: 'Payment not found' });
      }
    }

    if (orderId) {
      try {
        const result = await getOrderDetails(orderId as string);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(404).json({ error: 'Order not found' });
      }
    }

    return res.status(400).json({ error: 'Missing payment identifiers' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
