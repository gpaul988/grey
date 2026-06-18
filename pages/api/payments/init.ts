import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/lib/auth';
import { getPaymentConfig } from '@/lib/payments/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticate(req, res);
    if (!user) return;

    const { amount, currency = 'usd', provider = 'stripe', description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const config = getPaymentConfig();

    if (provider === 'stripe') {
      if (!config.stripe.enabled) {
        return res.status(400).json({ error: 'Stripe not configured' });
      }

      const { createPaymentIntent } = await import('@/lib/payments/stripe');
      const intent = await createPaymentIntent(user.id, amount, currency, {
        description: description || 'Payment',
      });

      return res.status(200).json({
        provider: 'stripe',
        clientSecret: intent.clientSecret,
        intentId: intent.id,
      });
    }

    if (provider === 'paypal') {
      if (!config.paypal.enabled) {
        return res.status(400).json({ error: 'PayPal not configured' });
      }

      const { createOrder } = await import('@/lib/payments/paypal');
      const order = await createOrder(user.id, amount, currency.toUpperCase(), description);

      const approveLink = order.links.find((l) => l.rel === 'approve');

      return res.status(200).json({
        provider: 'paypal',
        orderId: order.id,
        approveUrl: approveLink?.href,
      });
    }

    return res.status(400).json({ error: 'Unknown payment provider' });
  } catch (error) {
    console.error('Failed to initialize payment:', error);
    return res.status(500).json({ error: 'Failed to initialize payment' });
  }
}
