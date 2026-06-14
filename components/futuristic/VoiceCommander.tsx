'use client';

/**
 * VoiceCommander — hands-free navigation via the Web Speech API.
 *
 * Privacy-safe by design: recognition runs on-device (browser), is OFF until
 * the user taps the mic, stops automatically, and no audio/text leaves the
 * page. Renders nothing if the browser has no SpeechRecognition support.
 *
 * Natural-language commands (fuzzy-matched):
 *   "go to / open / show <page>"  -> navigate (home, services, portfolio,
 *                                     industries, blog, careers, contact, store, quote)
 *   "scroll down/up", "top", "bottom"
 *   "dark mode" / "light mode" / "toggle theme"
 *   "open chat" / "help"
 *   "go back"
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from '@/lib/routerCompat';
import {useTheme} from '@/components/ThemeProvider';
import {useHaptics} from '@/lib/futuristic/useHaptics';

type Listening = 'idle' | 'listening' | 'unsupported';

const ROUTES: {keys: string[]; href: string}[] = [
    {keys: ['home', 'homepage', 'main'], href: '/'},
    {keys: ['service', 'services'], href: '/services'},
    {keys: ['portfolio', 'work', 'projects'], href: '/portfolio'},
    {keys: ['industry', 'industries'], href: '/industries'},
    {keys: ['blog', 'articles', 'news'], href: '/blog'},
    {keys: ['career', 'careers', 'jobs'], href: '/careers'},
    {keys: ['contact', 'contact us', 'reach'], href: '/contact'},
    {keys: ['store', 'shop', 'products'], href: '/store'},
    {keys: ['quote', 'estimate', 'pricing'], href: '/quote-request'},
    {keys: ['about'], href: '/about'},
];

export default function VoiceCommander() {
    const [state, setState] = useState<Listening>('idle');
    const [heard, setHeard] = useState('');
    const recRef = useRef<any>(null);
    const router = useRouter();
    const {setTheme, toggle} = useTheme();
    const {vibrate} = useHaptics();

    useEffect(() => {
        const SR =
            (typeof window !== 'undefined' &&
                ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
            null;
        if (!SR) {
            setState('unsupported');
            return;
        }
        const rec = new SR();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';
        rec.onresult = (e: any) => {
            const text = (e.results?.[0]?.[0]?.transcript ?? '').toLowerCase().trim();
            setHeard(text);
            handleCommand(text);
        };
        rec.onend = () => setState('idle');
        rec.onerror = () => setState('idle');
        recRef.current = rec;
        return () => {
            try {
                rec.abort();
            } catch {
                /* no-op */
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCommand = useCallback(
        (text: string) => {
            if (!text) return;
            vibrate('select');

            // theme
            if (/dark mode|night mode/.test(text)) return setTheme('dark');
            if (/light mode|day mode/.test(text)) return setTheme('light');
            if (/toggle (the )?theme|switch theme/.test(text)) return toggle();

            // scrolling
            if (/scroll down|page down/.test(text))
                return window.scrollBy({top: window.innerHeight * 0.85, behavior: 'smooth'});
            if (/scroll up|page up/.test(text))
                return window.scrollBy({top: -window.innerHeight * 0.85, behavior: 'smooth'});
            if (/top|beginning/.test(text)) return window.scrollTo({top: 0, behavior: 'smooth'});
            if (/bottom|end/.test(text))
                return window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});

            // chat
            if (/open chat|live chat|help|support/.test(text)) {
                try {
                    (window as any).Tawk_API?.maximize?.();
                } catch {
                    /* no-op */
                }
                return;
            }

            // back
            if (/go back|previous page|back/.test(text)) return router.back?.();

            // navigation — longest key match wins
            let best: {href: string; len: number} | null = null;
            for (const r of ROUTES) {
                for (const k of r.keys) {
                    if (text.includes(k) && (!best || k.length > best.len)) best = {href: r.href, len: k.length};
                }
            }
            if (best) router.push(best.href);
        },
        [router, setTheme, toggle, vibrate],
    );

    const start = () => {
        if (!recRef.current || state === 'listening') return;
        try {
            setHeard('');
            recRef.current.start();
            setState('listening');
            vibrate('tap');
        } catch {
            setState('idle');
        }
    };

    if (state === 'unsupported') return null;

    return (
        <div className="grey-voice-fab" role="region" aria-label="Voice navigation">
            {heard && state === 'idle' && (
                <span className="grey-voice-heard" aria-live="polite">
                    “{heard}”
                </span>
            )}
            <button
                type="button"
                onClick={start}
                aria-label={state === 'listening' ? 'Listening…' : 'Activate voice navigation'}
                className={`grey-voice-btn ${state === 'listening' ? 'is-listening' : ''}`}
                title="Voice navigation — say e.g. 'go to contact'"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                    />
                    <path
                        d="M19 11a7 7 0 0 1-14 0M12 18.5V22"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                    />
                </svg>
                {state === 'listening' && <span className="grey-voice-ring" aria-hidden="true" />}
            </button>
        </div>
    );
}
