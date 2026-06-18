import type {NextApiRequest, NextApiResponse} from 'next';
import {Faqs} from '../../Admin/models';
import type {Faq} from '../../Admin/db/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'});

    const all = (Faqs.all('sort_order ASC, id ASC') as Faq[]).filter((f) => f.active === 1);

    // Handle single FAQ by ID
    const id = req.query.id ? parseInt(req.query.id as string, 10) : null;
    if (id) {
        const faq = all.find((f) => f.id === id);
        if (!faq) return res.status(404).json({error: 'FAQ not found'});
        res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
        return res.json({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            category: faq.category || 'General',
        });
    }

    // Handle search
    const search = req.query.search ? (req.query.search as string).toLowerCase() : null;
    let filtered = all;
    if (search) {
        filtered = all.filter(
            (f) =>
                f.question.toLowerCase().includes(search) ||
                f.answer.toLowerCase().includes(search)
        );
    }

    // Handle category filter
    const category = req.query.category ? (req.query.category as string) : null;
    if (category) {
        filtered = filtered.filter((f) => (f.category || 'General') === category);
    }

    // Handle pagination
    const limit = req.query.limit ? Math.min(parseInt(req.query.limit as string, 10), 100) : 100;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
    const paginated = filtered.slice(offset, offset + limit);

    // Group by category, preserving first-seen order.
    const order: string[] = [];
    const groups: Record<string, {question: string; answer: string; id: number}[]> = {};
    for (const f of paginated) {
        const cat = (f.category || 'General').trim() || 'General';
        if (!groups[cat]) {
            groups[cat] = [];
            order.push(cat);
        }
        groups[cat].push({id: f.id, question: f.question, answer: f.answer});
    }

    // Get list of all categories
    const allCategories = [...new Set(all.map((f) => f.category || 'General'))].sort();

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({
        categories: order.map((name) => ({name, items: groups[name]})),
        allCategories,
        count: filtered.length,
        total: all.length,
        limit,
        offset,
        hasMore: offset + limit < filtered.length,
    });
}
