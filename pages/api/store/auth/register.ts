import type { NextApiRequest, NextApiResponse } from 'next';
import { Customers } from '../../../../Admin/models';
import { setCustomerCookie } from '../../../../lib/customerAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { first_name, last_name, email, phone, password, address, city, state, country, date_of_birth, gender } = req.body || {};
    if (!first_name || !last_name || !phone || !password) {
        return res.status(400).json({ error: 'First name, last name, phone and password are required' });
    }
    if (String(password).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    if (email) {
        const existing = Customers.findByEmail(String(email));
        if (existing) return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const customer = Customers.create({
        first_name, last_name, phone,
        email: email || undefined,
        password: String(password),
        address, city, state, country: country || 'Nigeria',
        date_of_birth, gender,
    });
    setCustomerCookie(res, customer.id);
    res.json({ ok: true, customer });
}
