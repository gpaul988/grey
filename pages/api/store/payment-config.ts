import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreSettings } from '../../../Admin/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    const s = StoreSettings.getAll();
    res.json({
        ...StoreSettings.publicGatewayConfig(),
        store_name: s['store.name'] || 'Grey Store',
        tax_rate: parseFloat(s['store.tax_rate'] || '0'),
        usd_enabled: s['store.usd_enabled'] === '1',
        usd_rate: parseFloat(s['store.usd_rate'] || '1600'),
    });
}
