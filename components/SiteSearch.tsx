'use client';

/**
 * SiteSearch — futuristic header searchbar.
 *
 * - Slim neon input in the header that opens a glassy results dropdown.
 * - Fuzzy/substring search over the static SEARCH_INDEX (pages, services,
 *   industries, store, tools).
 * - Full keyboard support: ↑/↓ to move, Enter to open, Esc to close.
 * - Cmd/Ctrl+K focuses the search from anywhere.
 * - Two variants: `desktop` (inline pill in the nav) and `mobile` (full-width
 *   inside the mobile menu). Renders the same logic, different chrome.
 *
 * Privacy: fully client-side, nothing leaves the page.
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from '@/lib/routerCompat';
import {SEARCH_INDEX, type SearchEntry} from '@/lib/searchIndex';

function score(entry: SearchEntry, q: string): number {
    const t = entry.title.toLowerCase();
    const h = entry.href.toLowerCase();
    if (!q) return 0;
    if (t === q) return 100;
    if (t.startsWith(q)) return 80;
    if (t.includes(q)) return 60;
    if (h.includes(q)) return 40;
    // loose subsequence match (e.g. "wdv" -> "web development")
    let qi = 0;
    for (let i = 0; i < t.length && qi < q.length; i++) if (t[i] === q[qi]) qi++;
    return qi === q.length ? 20 : -1;
}

const CAT_ICON: Record<string, string> = {
    Service: '◆',
    Industry: '◈',
    Store: '▣',
    Tool: '⚙',
    Page: '●',
};

export default function SiteSearch({variant = 'desktop'}: {variant?: 'desktop' | 'mobile'}) {
    const router = useRouter();
    const [q, setQ] = useState('');
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return [];
        return SEARCH_INDEX.map((e) => ({e, s: score(e, query)}))
            .filter((r) => r.s > 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 8)
            .map((r) => r.e);
    }, [q]);

    useEffect(() => setActive(0), [q]);

    const go = useCallback(
        (entry?: SearchEntry) => {
            const target = entry ?? results[active];
            if (!target) return;
            setOpen(false);
            setQ('');
            router.push(target.href);
        },
        [results, active, router],
    );

    // Cmd/Ctrl+K to focus search globally
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setOpen(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Close on outside click
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, []);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            go();
        } else if (e.key === 'Escape') {
            setOpen(false);
            inputRef.current?.blur();
        }
    };

    const isMobile = variant === 'mobile';

    return (
        <div ref={wrapRef} className={`grey-search ${isMobile ? 'grey-search--mobile' : 'grey-search--desktop'}`}>
            <div className="grey-search__field">
                <svg className="grey-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={q}
                    onChange={(e) => {
                        setQ(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={onKeyDown}
                    placeholder={isMobile ? 'Search the site…' : 'Search…'}
                    aria-label="Search the site"
                    className="grey-search__input"
                    autoComplete="off"
                    spellCheck={false}
                />
                {!isMobile && <kbd className="grey-search__kbd">⌘K</kbd>}
            </div>

            {open && q.trim() && (
                <div className="grey-search__panel" role="listbox" aria-label="Search results">
                    {results.length === 0 ? (
                        <div className="grey-search__empty">No matches for “{q.trim()}”</div>
                    ) : (
                        results.map((r, i) => (
                            <button
                                key={r.href}
                                type="button"
                                role="option"
                                aria-selected={i === active}
                                className={`grey-search__item ${i === active ? 'is-active' : ''}`}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => go(r)}
                            >
                                <span className="grey-search__cat" aria-hidden="true">
                                    {CAT_ICON[r.category] ?? '●'}
                                </span>
                                <span className="grey-search__title">{r.title}</span>
                                <span className="grey-search__tag">{r.category}</span>
                            </button>
                        ))
                    )}
                    <div className="grey-search__hint">
                        <span><kbd>↑↓</kbd> navigate</span>
                        <span><kbd>↵</kbd> open</span>
                        <span><kbd>esc</kbd> close</span>
                    </div>
                </div>
            )}
        </div>
    );
}
