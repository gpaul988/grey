import type {NextApiRequest, NextApiResponse} from 'next';
import {Partners, ClientReviews} from '../../Admin/models';
import {SiteSettings} from '../../Admin/models/settings';

const PLACEMENT_KEYS = {partners: 'content.partners.pages', reviews: 'content.reviews.pages'} as const;
const DEFAULT_PAGES = ['home', 'about', 'services', 'industries', 'portfolio'];

function pages(key: string): string[] {
    try {
        const v = SiteSettings.get(key);
        return v ? (JSON.parse(v) as string[]) : DEFAULT_PAGES;
    } catch {
        return DEFAULT_PAGES;
    }
}

/**
 * Public content feed for the marketing site.
 * GET /api/content            -> all active partners + reviews + placement map
 * GET /api/content?page=home  -> only what is enabled for that page (partners/reviews arrays empty if disabled)
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'});

    const partnerPages = pages(PLACEMENT_KEYS.partners);
    const reviewPages = pages(PLACEMENT_KEYS.reviews);

    const allPartners = Partners.all('sort_order ASC, id ASC').filter((p) => p.active);
    const allReviews = ClientReviews.all('sort_order ASC, id ASC').filter((r) => r.active);

    const page = (req.query.page as string || '').toLowerCase().trim();

    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=120');

    if (page) {
        const showPartners = partnerPages.includes(page);
        const showReviews = reviewPages.includes(page);
        return res.json({
            partners: showPartners ? allPartners : [],
            reviews: showReviews ? allReviews : [],
            placement: {partners: showPartners, reviews: showReviews},
        });
    }

    res.json({
        partners: allPartners,
        reviews: allReviews,
        placement: {partners: partnerPages, reviews: reviewPages},
    });
}
