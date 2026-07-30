'use client';

import React, {useEffect, useState} from 'react';

declare global {
    interface Window {
        Tawk_API?: { maximize?: () => void; toggle?: () => void; showWidget?: () => void; hideWidget?: () => void };
    }
}

export default function TawkOpenButton() {
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        const check = () => setAvailable(Boolean(window?.Tawk_API) || process.env.NODE_ENV === 'development');
        check();
        const id = setInterval(check, 1000);
        return () => clearInterval(id);
    }, []);

    if (!available) return null;

    const openChat = () => {
        try {
            if (window?.Tawk_API) {
                window.Tawk_API?.maximize?.();
                window.Tawk_API?.showWidget?.();
                window.Tawk_API?.toggle?.();
                return;
            }
        } catch (e) {
            // ignore
        }

        // Fallback: open the tawk embed URL in a new tab (useful in dev/when launcher hidden)
        const prop = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
        const wid = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
        if (prop && wid) {
            const url = `https://embed.tawk.to/${prop}/${wid}`;
            window.open(url, '_blank', 'noopener');
        }
    };

    return (
        <button
            onClick={openChat}
            className="fixed bottom-24 right-8 z-60 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg hover:scale-105 transition"
            aria-label="Open live chat"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Chat
        </button>
    );
}
