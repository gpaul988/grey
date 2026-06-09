import type { NextApiRequest, NextApiResponse } from 'next';
import { Customers } from '../../../../Admin/models';
import { requireCustomer } from '../../../../lib/customerAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const customer = requireCustomer(req, res);
    if (!customer) return;

    if (req.method === 'GET') {
        return res.json({ customer: Customers.find(customer.id) });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
        const { first_name, last_name, email, phone, address, city, state, country, bio, date_of_birth, gender } = req.body || {};
        // guard email uniqueness
        if (email) {
            const existing = Customers.findByEmail(String(email));
            if (existing && existing.id !== customer.id) return res.status(409).json({ error: 'Email already in use' });
        }
        const updated = Customers.update(customer.id, {
            first_name, last_name, email, phone, address, city, state, country, bio, date_of_birth, gender,
        });
        return res.json({ ok: true, customer: updated });
    }

    res.status(405).json({ error: 'Method not allowed' });
}
