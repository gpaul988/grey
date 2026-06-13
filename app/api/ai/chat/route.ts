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

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const SYSTEM_PROMPT = `You are the Grey InfoTech assistant — friendly, concise, and helpful.
Grey InfoTech Limited is a web design, web & mobile app development, AI and digital marketing agency in Port Harcourt, Nigeria (founded 2017).
Answer ONLY using the provided context. If the answer is not in the context, say you are not sure and offer to connect the visitor with the team via the contact page (/contact) or WhatsApp (+234-802-809-5571).
Keep answers short (2-4 sentences). Never invent prices; direct pricing questions to the quote request or AI estimator. Always stay on-brand and professional.`;

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

    const docs = retrieve(lastUser, 4);
    const context = docs
        .map((d) => `# ${d.title} (${d.url})\n${d.text}`)
        .join('\n\n');
    const sources = docs.map((d) => ({title: d.title, url: d.url}));

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const encoder = new TextEncoder();

    // ---- Fallback: local lexical answer, streamed word-by-word ----
    if (!apiKey) {
        const {answer, sources: localSources} = localAnswer(lastUser);
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
        temperature: 0.3,
        messages: [
            {role: 'system', content: SYSTEM_PROMPT},
            {role: 'system', content: `Context:\n${context}`},
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
        const {answer, sources: localSources} = localAnswer(lastUser);
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
