import type { NextApiRequest, NextApiResponse } from 'next';
import { Orders } from '../../../../Admin/models';

function safeJson<T>(s: string | null | undefined, fallback: T): T {
    try { return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const ref = String(req.query.ref || '');
    const order = Orders.findByNumber(ref);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json({
        order: {
            ...order,
            shipping_address: safeJson(order.shipping_address, {}),
            billing_address: safeJson(order.billing_address, {}),
            payment_data: undefined,
            items: Orders.itemsFor(order.id),
        },
    });
}
