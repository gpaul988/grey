import type {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';
import {Customers} from '../../../../Admin/models';
import {setCustomerCookie} from '../../../../lib/customerAuth';
import {rateLimit, validate} from '../../../../lib/apiGuard';

const schema = z.object({
    token: z.string().trim().min(16, 'Invalid reset token').max(256),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(200, 'Password is too long'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Allow the reset page to verify a token before showing the form.
        const token = String(req.query.token || '');
        const valid = Customers.validateResetToken(token) != null;
        return res.json({valid});
    }

    if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
    if (!rateLimit(req, res, {key: 'reset-pw', limit: 10, windowMs: 15 * 60_000})) return;

    const data = validate(schema, req, res);
    if (!data) return;

    const customerId = Customers.validateResetToken(String(data.token));
    if (!customerId) return res.status(400).json({error: 'This reset link is invalid or has expired.'});

    const ok = Customers.resetPassword(String(data.token), String(data.password));
    if (!ok) return res.status(400).json({error: 'This reset link is invalid or has expired.'});

    // Log the user straight in after a successful reset.
    Customers.touchLogin(customerId);
    setCustomerCookie(res, customerId);
    const safe = Customers.find(customerId);
    return res.json({ok: true, customer: safe});
}
