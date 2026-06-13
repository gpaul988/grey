import type {MetadataRoute} from 'next';
import {SITE, SERVICE_SLUGS, INDUSTRY_SLUGS, SEO_REGISTRY} from '@/lib/seo';
import {blogPosts} from '@/data/blogPosts';

/**
 * Dynamic sitemap covering every public route: top-level pages, all services,
 * all industries, store, and every blog post + case study. Replaces the old
 * missing/static sitemap (audit H-SEO).
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const base = SITE.url;

    const staticPaths = Object.keys(SEO_REGISTRY).filter(
        (p) => !SEO_REGISTRY[p].noindex && !p.startsWith('/services/') && !p.startsWith('/industries/')
    );

    const entries: MetadataRoute.Sitemap = [];

    const push = (path: string, priority: number, freq: MetadataRoute.Sitemap[number]['changeFrequency']) =>
        entries.push({url: `${base}${path === '/' ? '' : path}`, lastModified: now, changeFrequency: freq, priority});

    push('/', 1, 'weekly');
    for (const p of staticPaths) if (p !== '/') push(p, 0.7, 'monthly');
    for (const s of SERVICE_SLUGS) push(`/services/${s}`, 0.8, 'monthly');
    for (const i of INDUSTRY_SLUGS) push(`/industries/${i}`, 0.8, 'monthly');

    const caseSlugs = [
        'healthcare-platform-transformation', 'logistics-dashboard-optimization',
        'fintech-product-launch', 'education-platform-expansion', 'enterprise-saas-rebrand',
    ];
    for (const c of caseSlugs) push(`/case-studies/${c}`, 0.6, 'monthly');

    for (const post of blogPosts) {
        entries.push({
            url: `${base}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : (post.date ? new Date(post.date) : now),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    }

    return entries;
}
