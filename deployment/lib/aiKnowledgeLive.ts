/**
 * Live knowledge sources for the Grey AI assistant (server-only).
 *
 * Pulls fresh grounding material from the database (admin-managed FAQs) and the
 * static page-content map, then converts them into the same flat KbDoc shape
 * the retriever consumes. Results are cached in-process for a short TTL so the
 * assistant is always current without hammering SQLite on every keystroke.
 *
 * IMPORTANT: this module imports the Admin SQLite models, so it must only ever
 * be used from server runtime (API route handlers). Never import it into a
 * client component.
 */
import type {KbDoc} from './aiKnowledge';
import {PAGE_KB} from './aiPageContent';

interface FaqRow {
    id: number;
    question: string;
    answer: string;
    category: string;
    active: number;
    sort_order?: number;
}

let cache: {docs: KbDoc[]; expires: number} | null = null;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

/** Strip HTML and collapse whitespace so answers stay clean for the LLM. */
function clean(s: string): string {
    return (s || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
}

/** Map a category to the most relevant on-site URL for citation. */
function urlForCategory(cat: string): string {
    const c = (cat || '').toLowerCase();
    if (c.includes('pric')) return '/quote-request';
    if (c.includes('support')) return '/support';
    if (c.includes('startup')) return '/services/MVP';
    if (c.includes('industr')) return '/industries/fintech';
    if (c.includes('service')) return '/services/Software-Development';
    return '/faq';
}

/** Load admin-managed FAQs from the DB and shape them as KB docs. */
function loadFaqDocs(): KbDoc[] {
    try {
        // Lazy require so the model (and better-sqlite3 native binding) is only
        // touched at request time on the server, never at module eval on edge.
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const {Faqs} = require('../Admin/models');
        const rows = (Faqs.all('sort_order ASC, id ASC') as FaqRow[]).filter(
            (f) => f.active === 1,
        );
        return rows.map((f) => {
            const q = clean(f.question);
            const a = clean(f.answer);
            return {
                title: q.length > 90 ? q.slice(0, 87) + '…' : q,
                url: urlForCategory(f.category),
                body: `${q}\n${a}`,
                tags: [
                    'faq',
                    (f.category || 'general').toLowerCase(),
                    ...q
                        .toLowerCase()
                        .replace(/[^a-z0-9\s]/g, ' ')
                        .split(/\s+/)
                        .filter((w) => w.length > 3)
                        .slice(0, 8),
                ],
            } as KbDoc;
        });
    } catch (err) {
        // DB unavailable (e.g. during a static build) — degrade gracefully to
        // the static KB only.
        console.warn('[aiKnowledgeLive] FAQ load failed:', (err as Error)?.message);
        return [];
    }
}

/**
 * Return the combined LIVE corpus: admin FAQs + curated page content.
 * Cached in-process for TTL_MS. Always returns an array (possibly empty).
 */
export function liveDocs(): KbDoc[] {
    const now = Date.now();
    if (cache && cache.expires > now) return cache.docs;
    const docs = [...loadFaqDocs(), ...PAGE_KB];
    cache = {docs, expires: now + TTL_MS};
    return docs;
}

/** Force the next liveDocs() call to rebuild (call after admin edits FAQs). */
export function invalidateLiveDocs(): void {
    cache = null;
}
