import type {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';
import {Customers} from '../../../../Admin/models';
import {setCustomerCookie} from '../../../../lib/customerAuth';
import {rateLimit, validate, sanitize, fields} from '../../../../lib/apiGuard';

const schema = z.object({
    first_name: fields.name,
    last_name: fields.name,
    email: fields.email.optional().or(z.literal('')),
    phone: fields.phone,
    password: fields.password,
    address: fields.shortText,
    city: fields.shortText,
    state: fields.shortText,
    country: fields.shortText,
    date_of_birth: fields.shortText,
    gender: z.enum(['male', 'female', 'other']).optional().or(z.literal('')),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
    // Throttle account creation per IP (anti-abuse / spam).
    if (!rateLimit(req, res, {key: 'register', limit: 5, windowMs: 15 * 60_000})) return;

    const data = validate(schema, req, res);
    if (!data) return;

    const email = data.email ? String(data.email) : undefined;
    if (email) {
        const existing = Customers.findByEmail(email);
        if (existing) return res.status(409).json({error: 'An account with this email already exists'});
    }

    const customer = Customers.create({
        first_name: sanitize(data.first_name),
        last_name: sanitize(data.last_name),
        phone: sanitize(data.phone),
        email,
        password: String(data.password),
        address: data.address ? sanitize(data.address) : undefined,
        city: data.city ? sanitize(data.city) : undefined,
        state: data.state ? sanitize(data.state) : undefined,
        country: data.country ? sanitize(data.country) : 'Nigeria',
        date_of_birth: data.date_of_birth || undefined,
        gender: data.gender || undefined,
    });
    setCustomerCookie(res, customer.id);
    res.json({ok: true, customer});
}
