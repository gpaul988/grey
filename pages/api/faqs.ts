import type {NextApiRequest, NextApiResponse} from 'next';
import {Faqs} from '../../Admin/models';
import type {Faq} from '../../Admin/db/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'});

    const all = (Faqs.all('sort_order ASC, id ASC') as Faq[]).filter((f) => f.active === 1);

    // Group by category, preserving first-seen order.
    const order: string[] = [];
    const groups: Record<string, {question: string; answer: string; id: number}[]> = {};
    for (const f of all) {
        const cat = (f.category || 'General').trim() || 'General';
        if (!groups[cat]) {
            groups[cat] = [];
            order.push(cat);
        }
        groups[cat].push({id: f.id, question: f.question, answer: f.answer});
    }

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({
        categories: order.map((name) => ({name, items: groups[name]})),
        count: all.length,
    });
}
