import type {NextApiRequest, NextApiResponse} from 'next';
import {Announcements} from '../../Admin/models';
import type {Announcement} from '../../Admin/db/types';

function inWindow(a: Announcement, now: number): boolean {
    // If no date window is set, the announcement is always active
    if (!a.starts_at && !a.ends_at) return true;

    // Parse start date (inclusive)
    if (a.starts_at) {
        const startMs = new Date(a.starts_at + 'T00:00:00Z').getTime();
        if (!Number.isNaN(startMs) && now < startMs) return false;
    }

    // Parse end date (inclusive – allows all of the end date)
    if (a.ends_at) {
        const endMs = new Date(a.ends_at + 'T23:59:59Z').getTime();
        if (!Number.isNaN(endMs) && now > endMs) return false;
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
