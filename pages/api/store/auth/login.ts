import type { NextApiRequest, NextApiResponse } from 'next';
import { Customers } from '../../../../Admin/models';
import { setCustomerCookie } from '../../../../lib/customerAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const customer = await Customers.verifyPassword(String(email), String(password));
    if (!customer) return res.status(401).json({ error: 'Invalid email or password' });
    if (customer.status !== 'active') return res.status(403).json({ error: 'Account is suspended' });

    Customers.touchLogin(customer.id);
    setCustomerCookie(res, customer.id);
    const safe = Customers.find(customer.id);
    res.json({ ok: true, customer: safe });
}
