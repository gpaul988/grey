import type {NextApiRequest, NextApiResponse} from 'next';
import {AnalyticsEvents} from '../../Admin/models';

function str(v: unknown): string {
    return typeof v === 'string' ? v.trim() : '';
}

const VALID = new Set(['pageview', 'click', 'conversion']);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({success: false});
    }

    try {
        const b = (req.body || {}) as Record<string, unknown>;
        const type = str(b.type).toLowerCase();
        if (!VALID.has(type)) return res.status(400).json({success: false});

        const path = str(b.path).slice(0, 512);
        const label = str(b.label).slice(0, 256);
        const ref = (str(b.ref) || str(req.headers.referer)).slice(0, 512);
        const ua = str(req.headers['user-agent']).slice(0, 512);

        AnalyticsEvents.create({type, path, ref, label, ua});
    } catch (e) {
        // Analytics is best-effort; never surface errors to client.
        console.error('track error', e);
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(204).end();
}
