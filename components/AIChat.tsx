'use client';

/**
 * Grey AI — a futuristic, always-on assistant that answers product questions
 * instantly using the site's knowledge base (RAG). It streams responses and
 * runs side-by-side with Tawk live chat (human handoff). Positioned bottom-LEFT
 * so it never collides with the Tawk widget (bottom-right).
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Bot, Send, Sparkles, X} from 'lucide-react';

interface Msg {
    role: 'user' | 'assistant';
    content: string;
    sources?: {title: string; url: string}[];
}

const SUGGESTIONS = [
    'What services do you offer?',
    'How much does a website cost?',
    'Do you build mobile apps?',
    'How can I contact you?',
];

export default function AIChat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([
        {
            role: 'assistant',
            content:
                "Hi! I'm Grey AI ⚡ — ask me anything about our services, industries, pricing or process. I can also point you to the right page.",
        },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({top: scrollRef.current.scrollHeight, behavior: 'smooth'});
    }, [messages, open]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 250);
    }, [open]);

    const send = useCallback(
        async (text: string) => {
            const q = text.trim();
            if (!q || busy) return;
            setInput('');
            const history = [...messages, {role: 'user' as const, content: q}];
            setMessages([...history, {role: 'assistant', content: ''}]);
            setBusy(true);

            try {
                const res = await fetch('/api/ai/chat', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        message: q,
                        messages: history.map((m) => ({role: m.role, content: m.content})),
                    }),
                });
                if (!res.body) throw new Error('no stream');
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';
                let acc = '';
                let srcs: {title: string; url: string}[] | undefined;

                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, {stream: true});
                    const lines = buffer.split('\n\n');
                    buffer = lines.pop() || '';
                    for (const line of lines) {
                        const t = line.trim();
                        if (!t.startsWith('data:')) continue;
                        try {
                            const json = JSON.parse(t.slice(5).trim());
                            if (json.delta) {
                                acc += json.delta;
                                setMessages((prev) => {
                                    const next = [...prev];
                                    next[next.length - 1] = {role: 'assistant', content: acc, sources: srcs};
                                    return next;
                                });
                            }
                            if (json.sources) srcs = json.sources;
                            if (json.done) {
                                setMessages((prev) => {
                                    const next = [...prev];
                                    next[next.length - 1] = {role: 'assistant', content: acc.trim(), sources: srcs};
                                    return next;
                                });
                            }
                        } catch {
                            /* ignore */
                        }
                    }
                }
            } catch {
                setMessages((prev) => {
                    const next = [...prev];
                    next[next.length - 1] = {
                        role: 'assistant',
                        content:
                            "Sorry — I had trouble connecting. Please try again, or reach the team at /contact or WhatsApp +234-802-809-5571.",
                    };
                    return next;
                });
            } finally {
                setBusy(false);
            }
        },
        [busy, messages]
    );

    return (
        <>
            {/* Launcher */}
            <motion.button
                aria-label="Open Grey AI assistant"
                onClick={() => setOpen((v) => !v)}
                initial={{scale: 0, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{delay: 0.6, type: 'spring', stiffness: 260, damping: 20}}
                whileHover={{scale: 1.06}}
                whileTap={{scale: 0.94}}
                className="fixed bottom-5 left-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600 text-white shadow-[0_8px_30px_rgba(20,184,166,0.45)] ring-1 ring-white/20"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span key="x" initial={{rotate: -90, opacity: 0}} animate={{rotate: 0, opacity: 1}} exit={{rotate: 90, opacity: 0}}>
                            <X size={24}/>
                        </motion.span>
                    ) : (
                        <motion.span key="bot" initial={{rotate: 90, opacity: 0}} animate={{rotate: 0, opacity: 1}} exit={{rotate: -90, opacity: 0}}>
                            <Bot size={26}/>
                        </motion.span>
                    )}
                </AnimatePresence>
                {!open && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75"/>
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan-400"/>
                    </span>
                )}
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, y: 24, scale: 0.96}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 24, scale: 0.96}}
                        transition={{type: 'spring', stiffness: 300, damping: 26}}
                        className="fixed bottom-24 left-5 z-[90] flex h-[32rem] w-[min(94vw,23rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 text-white shadow-2xl backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-indigo-600">
                                <Sparkles size={18}/>
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-semibold">Grey AI</p>
                                <p className="flex items-center gap-1 text-[11px] text-teal-300">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-400"/> Online · instant answers
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
                            {messages.map((m, i) => (
                                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                                    <div
                                        className={
                                            m.role === 'user'
                                                ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-br from-teal-500 to-cyan-600 px-3.5 py-2 text-white'
                                                : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-3.5 py-2 text-zinc-100 ring-1 ring-white/10'
                                        }
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed">
                                            {m.content || (m.role === 'assistant' && busy ? '…' : '')}
                                        </p>
                                        {m.sources && m.sources.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {m.sources.map((s, j) => (
                                                    <a
                                                        key={j}
                                                        href={s.url}
                                                        className="rounded-full bg-teal-400/15 px-2 py-0.5 text-[11px] text-teal-300 ring-1 ring-teal-400/30 hover:bg-teal-400/25"
                                                    >
                                                        {s.title} →
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {messages.length <= 1 && (
                                <div className="space-y-1.5 pt-1">
                                    {SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => send(s)}
                                            className="block w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[13px] text-zinc-300 transition hover:border-teal-400/40 hover:text-white"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Composer */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                send(input);
                            }}
                            className="flex items-center gap-2 border-t border-white/10 bg-zinc-950/80 px-3 py-3"
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Grey AI…"
                                className="flex-1 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none ring-1 ring-white/10 focus:ring-teal-400/50"
                            />
                            <button
                                type="submit"
                                disabled={busy || !input.trim()}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 text-white disabled:opacity-40"
                            >
                                <Send size={16}/>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
