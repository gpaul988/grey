import type { NextApiRequest, NextApiResponse } from 'next';
import { Coupons } from '../../../Admin/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { code, subtotal } = req.body || {};
    if (!code) return res.status(400).json({ error: 'Coupon code required' });
    const sub = Math.max(0, parseFloat(String(subtotal)) || 0);
    const v = Coupons.validate(String(code), sub);
    if (!v.valid) return res.status(400).json({ ok: false, error: v.reason });
    res.json({
        ok: true,
        code: v.coupon!.code,
        type: v.coupon!.type,
        value: v.coupon!.value,
        discount: v.discount,
    });
}
