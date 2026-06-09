import type { NextApiRequest, NextApiResponse } from 'next';
import { Orders } from '../../../../Admin/models';
import { requireCustomer } from '../../../../lib/customerAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const customer = requireCustomer(req, res);
    if (!customer) return;
    const orders = Orders.forCustomer(customer.id).map((o) => ({
        ...o,
        items: Orders.itemsFor(o.id),
    }));
    res.json({ orders });
}
