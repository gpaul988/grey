import type { NextApiRequest, NextApiResponse } from 'next';
import { Customers, Wishlists } from '../../../../Admin/models';
import { getCustomer } from '../../../../lib/customerAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const customer = getCustomer(req);
    if (!customer) return res.json({ customer: null });
    const full = Customers.find(customer.id);
    res.json({ customer: full, wishlist_ids: Wishlists.ids(customer.id) });
}
