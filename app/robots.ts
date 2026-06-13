import type {MetadataRoute} from 'next';
import {SITE} from '@/lib/seo';

/**
 * Dynamic robots.txt. Disallows admin, portal, store account & API surfaces;
 * points crawlers at the sitemap. Supersedes the static public/robots.txt
 * (kept as a fallback for non-Next static serving).
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin',
                    '/portal',
                    '/login',
                    '/register',
                    '/store/account',
                    '/store/checkout',
                    '/store/cart',
                ],
            },
        ],
        sitemap: `${SITE.url}/sitemap.xml`,
        host: SITE.url,
    };
}
