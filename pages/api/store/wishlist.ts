import type { NextApiRequest, NextApiResponse } from 'next';
import { Wishlists } from '../../../Admin/models';
import { requireCustomer } from '../../../lib/customerAuth';

function safeJson<T>(s: string | null | undefined, fallback: T): T {
    try { return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const customer = requireCustomer(req, res);
    if (!customer) return;

    if (req.method === 'GET') {
        const products = Wishlists.forCustomer(customer.id).map((p) => ({
            ...p,
            images: safeJson(p.images, []),
        }));
        return res.json({ ids: Wishlists.ids(customer.id), products });
    }

    if (req.method === 'POST') {
        const productId = parseInt(String(req.body?.product_id), 10);
        if (!productId) return res.status(400).json({ error: 'product_id required' });
        const added = Wishlists.toggle(customer.id, productId);
        return res.json({ ok: true, added, ids: Wishlists.ids(customer.id) });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
