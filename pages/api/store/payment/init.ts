import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { Orders, StoreSettings } from '../../../../Admin/models';
import { paystackInit, flutterwaveInit } from '../../../../lib/payments';
import { rateLimit, validate } from '../../../../lib/apiGuard';

function baseUrl(req: NextApiRequest): string {
    const proto = (req.headers['x-forwarded-proto'] as string) || 'http';
    const host = req.headers.host;
    return `${proto}://${host}`;
}

const schema = z.object({
    reference: z.string().trim().min(1).max(64),
    gateway: z.enum(['paystack', 'flutterwave']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    // Throttle payment-init per IP to prevent gateway abuse / order probing.
    if (!rateLimit(req, res, { key: 'payment-init', limit: 20, windowMs: 10 * 60_000 })) return;

    const data = validate(schema, req, res);
    if (!data) return;
    const { reference, gateway } = data;

    const order = Orders.findByNumber(String(reference));
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.payment_status === 'paid') return res.status(400).json({ error: 'Order already paid' });

    const s = StoreSettings.getAll();
    const ship = JSON.parse(order.shipping_address || '{}');
    const email = order.guest_email || ship.email || 'guest@grey.store';
    const name = order.guest_name || `${ship.first_name || ''} ${ship.last_name || ''}`.trim();
    const phone = order.guest_phone || ship.phone || '';
    const callback = `${baseUrl(req)}/store/orders/${order.order_number}?verify=1&gateway=${gateway}`;

    try {
        if (gateway === 'paystack') {
            if (s['payment.paystack.enabled'] !== '1') return res.status(400).json({ error: 'Paystack disabled' });
            const data = await paystackInit({
                email, amount: order.total, reference: order.order_number,
                callback_url: callback, currency: order.currency || 'NGN',
            });
            return res.json({ ok: true, gateway, authorization_url: data.authorization_url, access_code: data.access_code, reference: data.reference });
        }

        if (gateway === 'flutterwave') {
            if (s['payment.flutterwave.enabled'] !== '1') return res.status(400).json({ error: 'Flutterwave disabled' });
            const data = await flutterwaveInit({
                email, name, phone, amount: order.total, reference: order.order_number,
                redirect_url: callback, currency: order.currency || 'NGN',
            });
            return res.json({ ok: true, gateway, link: data.link });
        }

        return res.status(400).json({ error: 'Unsupported gateway for server init' });
    } catch (e) {
        // Log full detail server-side; return a generic message to the client
        // so gateway/internal errors are never leaked to the browser.
        console.error('[payment/init]', (e as Error)?.message || e);
        return res.status(502).json({ error: 'Payment initialization failed. Please try again.' });
    }
}
