import type { NextApiRequest, NextApiResponse } from 'next';
import { Products, ProductReviews } from '../../../../Admin/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const slug = String(req.query.slug || '');

    if (req.method === 'GET') {
        const product = Products.findBySlug(slug);
        if (!product || product.status !== 'active') return res.status(404).json({ error: 'Product not found' });

        const related = Products.all({ status: 'active' })
            .filter((p) => p.id !== product.id && p.category_id === product.category_id)
            .slice(0, 4)
            .map((p) => ({ ...p, images: safeJson(p.images, []) }));

        return res.json({
            product: {
                ...product,
                images: safeJson(product.images, []),
                specs: safeJson(product.specs, {}),
                tags: safeJson(product.tags, []),
            },
            reviews: ProductReviews.forProduct(product.id, 'approved'),
            rating: ProductReviews.avgRating(product.id),
            related,
        });
    }

    if (req.method === 'POST') {
        // Submit a review
        const product = Products.findBySlug(slug);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        const { reviewer_name, rating, comment } = req.body || {};
        if (!reviewer_name || !rating) return res.status(400).json({ error: 'Name and rating required' });
        ProductReviews.create({
            product_id: product.id,
            reviewer_name: String(reviewer_name).slice(0, 100),
            rating: parseInt(String(rating), 10),
            comment: comment ? String(comment).slice(0, 1000) : undefined,
        });
        return res.json({ ok: true, message: 'Review submitted for approval' });
    }

    res.status(405).json({ error: 'Method not allowed' });
}

function safeJson<T>(s: string | null | undefined, fallback: T): T {
    try { return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}
