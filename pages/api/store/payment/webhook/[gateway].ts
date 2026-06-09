import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { StoreSettings, Orders } from '../../../../../Admin/models';
import { markOrderPaid, markOrderFailed, paystackVerify, flutterwaveVerifyByTxId } from '../../../../../lib/payments';

export const config = { api: { bodyParser: false } };

function readRawBody(req: NextApiRequest): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => resolve(data));
        req.on('error', reject);
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const gateway = String(req.query.gateway || '');
    const raw = await readRawBody(req);
    const s = StoreSettings.getAll();

    try {
        if (gateway === 'paystack') {
            const secret = s['payment.paystack.secret_key'];
            const signature = req.headers['x-paystack-signature'] as string;
            const hash = crypto.createHmac('sha512', secret || '').update(raw).digest('hex');
            if (!secret || hash !== signature) return res.status(401).json({ error: 'Invalid signature' });
            const event = JSON.parse(raw);
            if (event.event === 'charge.success') {
                const ref = event.data?.reference;
                const order = Orders.findByNumber(String(ref));
                if (order && order.payment_status !== 'paid') {
                    // re-verify with API to be safe
                    const v = await paystackVerify(String(ref));
                    if (v.success && v.amount !== undefined && Math.abs(v.amount - order.total) < 1) {
                        markOrderPaid(order.order_number, 'paystack', String(ref), event.data);
                    }
                }
            }
            return res.status(200).json({ received: true });
        }

        if (gateway === 'flutterwave') {
            const secretHash = s['payment.flutterwave.webhook_hash'] || s['payment.flutterwave.secret_hash'] || '';
            const signature = req.headers['verif-hash'] as string;
            if (!secretHash || signature !== secretHash) return res.status(401).json({ error: 'Invalid signature' });
            const event = JSON.parse(raw);
            if (event.event === 'charge.completed' && event.data?.status === 'successful') {
                const txId = event.data?.id;
                const v = await flutterwaveVerifyByTxId(String(txId));
                const order = Orders.findByNumber(String(v.reference || event.data?.tx_ref));
                if (order && order.payment_status !== 'paid' && v.success && v.amount !== undefined && v.amount >= order.total - 1) {
                    markOrderPaid(order.order_number, 'flutterwave', String(txId), event.data);
                } else if (order && !v.success) {
                    markOrderFailed(order.order_number, 'flutterwave', event.data);
                }
            }
            return res.status(200).json({ received: true });
        }

        return res.status(400).json({ error: 'Unknown gateway' });
    } catch (e) {
        return res.status(500).json({ error: (e as Error).message || 'Webhook error' });
    }
}
