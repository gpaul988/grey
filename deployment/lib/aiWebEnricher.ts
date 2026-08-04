/**
 * Optional web enrichment for Grey AI.
 * 
 * If configured with a search API key (Google Custom Search, SerpAPI, etc.),
 * the AI can supplement knowledge base answers with current web results.
 * 
 * This allows the assistant to:
 * - Find industry trends (e.g., "latest AI development frameworks")
 * - Answer comparative questions (e.g., "React vs Vue in 2024")
 * - Cite external best practices and case studies
 */

export interface WebResult {
    title: string;
    url: string;
    snippet: string;
}

/**
 * Optional: Fetch web results for a query using Google Custom Search or SerpAPI.
 * Returns top 3-5 results to enrich the AI context.
 * 
 * Set SEARCH_API_KEY and SEARCH_ENGINE_ID in .env.local to enable.
 * (This is optional and improves responses about industry trends/comparisons)
 */
export async function enrichWithWebResults(query: string, limit = 3): Promise<WebResult[]> {
    const apiKey = process.env.SEARCH_API_KEY;
    const engineId = process.env.SEARCH_ENGINE_ID;

    if (!apiKey || !engineId) {
        // Web enrichment not configured — fall back to KB only
        return [];
    }

    try {
        const url = new URL('https://www.googleapis.com/customsearch/v1');
        url.searchParams.set('q', query);
        url.searchParams.set('key', apiKey);
        url.searchParams.set('cx', engineId);
        url.searchParams.set('num', String(limit));

        const res = await fetch(url.toString(), {signal: AbortSignal.timeout(5000)});
        if (!res.ok) return [];

        const data = await res.json() as {items?: Array<{title: string; link: string; snippet: string}>};
        return (data.items || []).map((item) => ({
            title: item.title,
            url: item.link,
            snippet: item.snippet,
        }));
    } catch {
        // Graceful fallback if search fails
        return [];
    }
}

/**
 * Format web results into system context for the LLM.
 * This enriches the standard KB context with current web knowledge.
 */
export function formatWebContext(results: WebResult[]): string {
    if (!results.length) return '';
    return (
        '\n\nRecent web insights:\n' +
        results.map((r) => `- ${r.title} (${r.url}): ${r.snippet}`).join('\n')
    );
}
