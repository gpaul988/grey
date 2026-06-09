import type { NextApiRequest, NextApiResponse } from 'next';
import { Orders } from '../../../../Admin/models';
import { paystackVerify, flutterwaveVerifyByTxId, markOrderPaid, markOrderFailed } from '../../../../lib/payments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const src = req.method === 'GET' ? req.query : req.body;
    const { gateway, reference, transaction_id } = (src || {}) as Record<string, string>;
    if (!gateway) return res.status(400).json({ error: 'gateway required' });

    try {
        if (gateway === 'paystack') {
            if (!reference) return res.status(400).json({ error: 'reference required' });
            const r = await paystackVerify(String(reference));
            const order = Orders.findByNumber(String(reference));
            if (!order) return res.status(404).json({ error: 'Order not found' });
            // amount sanity check
            if (r.success && r.amount !== undefined && Math.abs(r.amount - order.total) < 1) {
                markOrderPaid(order.order_number, 'paystack', String(reference), r.raw);
                return res.json({ ok: true, status: 'paid', order_number: order.order_number });
            }
            markOrderFailed(order.order_number, 'paystack', r.raw);
            return res.json({ ok: false, status: 'failed' });
        }

        if (gateway === 'flutterwave') {
            const txId = transaction_id || reference;
            if (!txId) return res.status(400).json({ error: 'transaction_id required' });
            const r = await flutterwaveVerifyByTxId(String(txId));
            const order = Orders.findByNumber(String(r.reference || reference));
            if (!order) return res.status(404).json({ error: 'Order not found' });
            if (r.success && r.amount !== undefined && r.amount >= order.total - 1) {
                markOrderPaid(order.order_number, 'flutterwave', String(txId), r.raw);
                return res.json({ ok: true, status: 'paid', order_number: order.order_number });
            }
            markOrderFailed(order.order_number, 'flutterwave', r.raw);
            return res.json({ ok: false, status: 'failed' });
        }

        return res.status(400).json({ error: 'Unsupported gateway' });
    } catch (e) {
        return res.status(500).json({ error: (e as Error).message || 'Verification failed' });
    }
}
