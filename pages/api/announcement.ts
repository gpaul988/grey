import type {NextApiRequest, NextApiResponse} from 'next';
import {Announcements} from '../../Admin/models';
import type {Announcement} from '../../Admin/db/types';

function inWindow(a: Announcement, now: number): boolean {
    if (a.starts_at) {
        const s = new Date(a.starts_at).getTime();
        if (!Number.isNaN(s) && now < s) return false;
    }
    if (a.ends_at) {
        const e = new Date(a.ends_at).getTime();
        if (!Number.isNaN(e) && now > e) return false;
    }
    return true;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'});

    const now = Date.now();
    const list = (Announcements.all('id DESC') as Announcement[]).filter(
        (a) => a.active === 1 && inWindow(a, now)
    );
    const latest = list[0] || null;

    res.setHeader('Cache-Control', 'no-store');
    return res.json({
        announcement: latest
            ? {
                  id: latest.id,
                  message: latest.message,
                  link_url: latest.link_url || '',
                  link_label: latest.link_label || '',
                  variant: latest.variant || 'gradient',
              }
            : null,
    });
}
