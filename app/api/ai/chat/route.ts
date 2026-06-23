/**
 * AI assistant endpoint (RAG).
 *
 * - If an OpenAI-compatible key is configured (OPENAI_API_KEY, optionally
 *   OPENAI_BASE_URL + OPENAI_MODEL), it streams a grounded answer using the
 *   knowledge base as context.
 * - Otherwise it falls back to a local lexical retriever so the assistant is
 *   useful out-of-the-box with no external dependency or cost.
 *
 * Runs side-by-side with Tawk live chat (human) — this handles instant,
 * 24/7 product Q&A.
 */
import {NextRequest} from 'next/server';
import {retrieve, localAnswer} from '@/lib/aiKnowledge';
import {liveDocs} from '@/lib/aiKnowledgeLive';
import {enrichWithWebResults, formatWebContext} from '@/lib/aiWebEnricher';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const SYSTEM_PROMPT = `You are a professional customer care AI assistant for Grey InfoTech Limited, a boutique web/mobile/AI development agency in Port Harcourt, Nigeria with 8+ years of proven expertise and 50+ successful projects.

Your tone: professional, friendly, solution-focused. You're a trusted advisor helping clients make informed decisions about their digital projects.

Instructions:
1. Answer ONLY using the provided context about Grey InfoTech's services, team, process, and capabilities.
2. If the question is not covered in context, be honest: "I'm not entirely sure on that—best to chat with our team at hello@greyinfotech.com.ng or +234-802-809-5571 on WhatsApp."
3. BE CONCISE: 1-3 sentences max, ~60 words typical. Get straight to the answer—no preamble, no restating the question.
4. For pricing/estimates: Always reference /quote-request or our AI Project Estimator, noting that cost depends on scope and complexity.
5. For sales/complex needs: Briefly explain what we offer, then invite a conversation: "Interested? Let's talk—reach us at /contact or WhatsApp."
6. Link sparingly (max 1 per response) and only when it directly helps the user (e.g., /services/... or /quote-request).
7. Never invent project details, client names, pricing, or guarantees.
8. Never forget: You're representing a professional agency trusted by startups and enterprises. Sound confident, knowledgeable, and approachable.`;

// Enhanced system prompt for LLM-based responses
const LLM_SYSTEM_PROMPT = `You are a professional customer care AI assistant for Grey InfoTech Limited, a web/mobile/AI development and digital marketing agency in Port Harcourt, Nigeria. You have 8+ years of industry expertise and 50+ delivered projects.

Your role: Help prospects understand our services, capabilities, and process. Answer questions about tech stack, pricing, timeline, and fit. Be a trusted advisor, not just a chatbot.

Tone: Professional, friendly, knowledgeable, concise. You understand both technical and business needs.

Core rules:
• Answer ONLY using the provided context. Never invent services, pricing, client names, or guarantees.
• If context doesn't cover it, admit it and point to hello@greyinfotech.com.ng or WhatsApp +234-802-809-5571.
• Be brief: 1-3 short sentences (~60 words), straight to the point. No filler, no repeating the question.
• Pricing: Always send to /quote-request or mention our AI Project Estimator—explain that cost depends on scope, complexity, timeline.
• For sales questions: Explain what we do, gauge fit, invite deeper conversation.
• Use links sparingly (max 1 per response). Prioritize /services/..., /quote-request, /contact.
• Sound confident and professional. You're representing a trusted digital partner, not a generic bot.
• If asked "why you?" — highlight our 8+ years, 50+ projects, founder expertise, and commitment to transparency and measurable outcomes.`;

function sse(data: object): string {
    return `data: ${JSON.stringify(data)}\n\n`;
}

// In-memory sliding-window rate limit (per IP) to protect the (possibly paid)
// LLM endpoint from abuse. Single-process deployment assumption.
const aiBuckets = new Map<string, {count: number; reset: number}>();
function aiRateLimit(ip: string, limit = 20, windowMs = 60_000): boolean {
    const now = Date.now();
    let b = aiBuckets.get(ip);
    if (!b || b.reset < now) {
        b = {count: 0, reset: now + windowMs};
        aiBuckets.set(ip, b);
    }
    b.count += 1;
    return b.count <= limit;
}

export async function POST(req: NextRequest) {
    const ip =
        (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
        req.headers.get('x-real-ip') ||
        'unknown';
    if (!aiRateLimit(ip)) {
        return new Response(JSON.stringify({error: 'Too many requests'}), {
            status: 429,
            headers: {'Content-Type': 'application/json', 'Retry-After': '60'},
        });
    }
    let body: {messages?: ChatMessage[]; message?: string};
    try {
        body = await req.json();
    } catch {
        return new Response('Invalid JSON', {status: 400});
    }

    const messages = body.messages || [];
    const lastUser =
        body.message ||
        [...messages].reverse().find((m) => m.role === 'user')?.content ||
        '';

    if (!lastUser || lastUser.length > 2000) {
        return new Response('Empty or oversized message', {status: 400});
    }

    // Live grounding corpus: admin-managed FAQs (from DB) + curated page content,
    // merged with the static KB. Cached in-process so it's always current.
    const live = liveDocs();
    const docs = retrieve(lastUser, 6, live);
    let context = docs
        .map((d) => `# ${d.title} (${d.url})\n${d.text}`)
        .join('\n\n');
    let sources = docs.map((d) => ({title: d.title, url: d.url}));

    // Optional: Enrich with recent web results for trending questions
    // (e.g., "latest React patterns", "AI development in 2024")
    const webResults = await enrichWithWebResults(lastUser, 2);
    if (webResults.length > 0) {
        context += formatWebContext(webResults);
        sources = [
            ...sources,
            ...webResults.map((r) => ({title: r.title, url: r.url})),
        ];
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const encoder = new TextEncoder();

    // ---- Fallback: local lexical answer, streamed word-by-word ----
    if (!apiKey) {
        const {answer, sources: localSources} = localAnswer(lastUser, live);
        const stream = new ReadableStream({
            async start(controller) {
                const words = answer.split(' ');
                for (const w of words) {
                    controller.enqueue(encoder.encode(sse({delta: w + ' '})));
                    await new Promise((r) => setTimeout(r, 18));
                }
                controller.enqueue(encoder.encode(sse({sources: localSources, done: true})));
                controller.close();
            },
        });
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                Connection: 'keep-alive',
            },
        });
    }

    // ---- LLM mode: stream from OpenAI-compatible endpoint ----
    const trimmed = messages.filter((m) => m.role !== 'system').slice(-8);
    const payload = {
        model,
        stream: true,
        temperature: 0.7, // Slightly higher for more natural, professional responses
        top_p: 0.9,
        messages: [
            {role: 'system', content: LLM_SYSTEM_PROMPT},
            {role: 'system', content: `Knowledge Base:\n${context}`},
            ...trimmed,
            ...(body.message ? [{role: 'user', content: body.message}] : []),
        ],
    };

    const upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
    });

    if (!upstream.ok || !upstream.body) {
        // Graceful degradation to local answer if the provider errors.
        const {answer, sources: localSources} = localAnswer(lastUser, live);
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(encoder.encode(sse({delta: answer})));
                controller.enqueue(encoder.encode(sse({sources: localSources, done: true})));
                controller.close();
            },
        });
        return new Response(stream, {
            headers: {'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache'},
        });
    }

    const decoder = new TextDecoder();
    const reader = upstream.body.getReader();
    const stream = new ReadableStream({
        async start(controller) {
            let buffer = '';
            try {
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, {stream: true});
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    for (const line of lines) {
                        const t = line.trim();
                        if (!t.startsWith('data:')) continue;
                        const data = t.slice(5).trim();
                        if (data === '[DONE]') continue;
                        try {
                            const json = JSON.parse(data);
                            const delta = json.choices?.[0]?.delta?.content;
                            if (delta) controller.enqueue(encoder.encode(sse({delta})));
                        } catch {
                            /* ignore partial frames */
                        }
                    }
                }
            } finally {
                controller.enqueue(encoder.encode(sse({sources, done: true})));
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    });
}
