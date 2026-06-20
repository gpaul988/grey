import type {NextApiRequest, NextApiResponse} from 'next';
import {Ads} from '../../Admin/models';
import type {Ad} from '../../Admin/db/types';

function inWindow(a: Ad, now: number): boolean {
    // If no date window is set, the ad is always active
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

    // Click tracking: /api/ads?click=<id> -> redirect to link_url + increment clicks
    const clickId = parseInt(String(req.query.click || ''), 10);
    if (clickId) {
        const ad = Ads.find(clickId) as Ad | undefined;
        if (ad) {
            try {
                Ads.raw
                    .prepare('UPDATE ads SET clicks = clicks + 1 WHERE id = ?')
                    .run(clickId);
            } catch {
                /* noop */
            }
            const dest = ad.link_url && ad.link_url.trim() ? ad.link_url : '/';
            res.writeHead(302, {Location: dest});
            return res.end();
        }
        res.writeHead(302, {Location: '/'});
        return res.end();
    }

    const placement = String(req.query.placement || '').trim();
    const now = Date.now();

    let ads = (Ads.all('sort_order ASC, id DESC') as Ad[]).filter(
        (a) => a.active === 1 && a.status === 'published' && inWindow(a, now)
    );
    if (placement) ads = ads.filter((a) => a.placement === placement);

    // Increment impressions (best-effort, batched).
    try {
        const stmt = Ads.raw.prepare('UPDATE ads SET impressions = impressions + 1 WHERE id = ?');
        const tx = Ads.raw.transaction((rows: Ad[]) => {
            for (const r of rows) stmt.run(r.id);
        });
        tx(ads);
    } catch {
        /* noop */
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.json({
        ads: ads.map((a) => ({
            id: a.id,
            title: a.title,
            body: a.body,
            image: a.image,
            link_url: a.link_url,
            cta_label: a.cta_label || 'Learn more',
            placement: a.placement,
            variant: a.variant || 'gradient',
            share_caption: a.share_caption || a.title,
        })),
    });
}
