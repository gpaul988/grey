import type { NextApiRequest, NextApiResponse } from 'next';
import { Products, ProductCategories, ProductBrands, ProductReviews } from '../../../Admin/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const { category, brand, featured, search, sort, min, max } = req.query as Record<string, string>;

    let products = Products.all({ status: 'active' });

    if (search) {
        const q = search.toLowerCase();
        products = products.filter((p) =>
            p.name.toLowerCase().includes(q) ||
            (p.description || '').toLowerCase().includes(q) ||
            (p.category_name || '').toLowerCase().includes(q) ||
            (p.brand_name || '').toLowerCase().includes(q)
        );
    }
    if (category) products = products.filter((p) => p.category_slug === category);
    if (brand) products = products.filter((p) => p.brand_slug === brand);
    if (featured === '1') products = products.filter((p) => p.featured);
    if (min) products = products.filter((p) => p.price >= parseFloat(min));
    if (max) products = products.filter((p) => p.price <= parseFloat(max));

    if (sort === 'price_asc') products.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') products.sort((a, b) => b.price - a.price);
    else if (sort === 'name') products.sort((a, b) => a.name.localeCompare(b.name));

    const shaped = products.map((p) => ({
        ...p,
        images: safeJson(p.images, []),
        tags: safeJson(p.tags, []),
        rating: ProductReviews.avgRating(p.id),
    }));

    res.json({
        products: shaped,
        categories: ProductCategories.all(),
        brands: ProductBrands.all(),
    });
}

function safeJson<T>(s: string | null | undefined, fallback: T): T {
    try { return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}
