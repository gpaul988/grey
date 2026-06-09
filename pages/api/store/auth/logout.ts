import type { NextApiRequest, NextApiResponse } from 'next';
import { clearCustomerCookie } from '../../../../lib/customerAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    clearCustomerCookie(res);
    res.json({ ok: true });
}
