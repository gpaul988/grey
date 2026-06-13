import type {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';
import {Customers} from '../../../../Admin/models';
import {setCustomerCookie} from '../../../../lib/customerAuth';
import {rateLimit, validate} from '../../../../lib/apiGuard';

const schema = z.object({
    email: z.string().trim().toLowerCase().email('Enter a valid email').max(254),
    password: z.string().min(1, 'Password is required').max(200),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
    // Brute-force protection: limit login attempts per IP.
    if (!rateLimit(req, res, {key: 'login', limit: 10, windowMs: 15 * 60_000})) return;

    const data = validate(schema, req, res);
    if (!data) return;

    const customer = await Customers.verifyPassword(String(data.email), String(data.password));
    // Uniform error message — never reveal whether the email exists.
    if (!customer) return res.status(401).json({error: 'Invalid email or password'});
    if (customer.status !== 'active') return res.status(403).json({error: 'Account is suspended'});

    Customers.touchLogin(customer.id);
    setCustomerCookie(res, customer.id);
    const safe = Customers.find(customer.id);
    res.json({ok: true, customer: safe});
}
