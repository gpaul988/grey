import type {NextApiRequest, NextApiResponse} from 'next';
import {Subscribers} from '../../Admin/models';

function str(v: unknown): string {
    return typeof v === 'string' ? v.trim() : '';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({success: false, message: 'Method not allowed'});
    }

    try {
        const b = (req.body || {}) as Record<string, unknown>;
        const email = str(b.email).toLowerCase();
        const name = str(b.name);
        const source = str(b.source) || 'footer';

        if (!email || !EMAIL_RE.test(email)) {
            return res.status(400).json({success: false, message: 'Please enter a valid email address.'});
        }

        try {
            Subscribers.create({
                email,
                name: name || '',
                source,
                status: 'subscribed',
            });
        } catch (e) {
            // UNIQUE constraint -> already subscribed; treat as success (idempotent).
            const msg = e instanceof Error ? e.message : '';
            if (!/unique/i.test(msg)) {
                console.error('Subscribe DB error:', e);
                return res.status(500).json({success: false, message: 'Could not subscribe right now.'});
            }
        }

        return res.status(200).json({success: true, message: "You're on the list. Welcome aboard."});
    } catch (error) {
        console.error('Subscribe API error:', error);
        return res.status(500).json({success: false, message: 'Could not subscribe right now.'});
    }
}
