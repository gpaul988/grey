'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {Mic} from 'lucide-react';

export default function FloatingMic() {
    const [listening, setListening] = useState(false);

    const toggleVoice = useCallback(() => {
        try {
            // Open the Grey AI panel first (click launcher)
            const launcher = document.querySelector<HTMLButtonElement>('button[aria-label="Open Grey AI assistant"]');
            launcher?.click();

            // After the panel opens, try to find the panel mic button and click it
            setTimeout(() => {
                const panelMic = document.querySelector<HTMLButtonElement>('button[title*="voice input"]');
                if (panelMic && !panelMic.disabled) {
                    panelMic.click();
                    return;
                }

                // Fallback: start a local SpeechRecognition instance if available
                const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                if (!Rec) {
                    console.warn('[FloatingMic] SpeechRecognition not supported in this browser');
                    return;
                }

                // If there's an existing global instance, toggle it
                if ((window as any).__greySpeechRec) {
                    const r = (window as any).__greySpeechRec;
                    if (listening) r.stop(); else r.start();
                    return;
                }

                const recog = new Rec();
                recog.lang = 'en-US';
                recog.interimResults = true;
                recog.maxAlternatives = 1;
                recog.onstart = () => setListening(true);
                recog.onend = () => setListening(false);
                recog.onerror = (e: any) => { console.warn('[speech] error', e); setListening(false); };
                recog.onresult = (e: any) => {
                    let interim = '';
                    let final = '';
                    for (let i = e.resultIndex; i < e.results.length; i++) {
                        const res = e.results[i];
                        if (res.isFinal) final += res[0].transcript;
                        else interim += res[0].transcript;
                    }
                    // Insert transcript into the Grey AI input if present
                    const input = document.querySelector<HTMLInputElement>('input[placeholder="Ask Grey AI…"]');
                    if (input) {
                        if (final) input.value = (input.value ? input.value + ' ' : '') + final;
                        else input.value = (input.value ? input.value : '') + interim;
                        // Dispatch input event so React sees the change
                        input.dispatchEvent(new Event('input', {bubbles: true}));
                    }
                };
                (window as any).__greySpeechRec = recog;
                recog.start();
            }, 300);
        } catch (err) {
            console.warn('FloatingMic toggle failed', err);
        }
    }, [listening]);

    useEffect(() => {
        // keep listening state in sync with any global recognizer
        const r = (window as any).__greySpeechRec;
        if (!r) return;
        const onstart = () => setListening(true);
        const onend = () => setListening(false);
        r.addEventListener?.('start', onstart);
        r.addEventListener?.('end', onend);
        return () => {
            r.removeEventListener?.('start', onstart);
            r.removeEventListener?.('end', onend);
        };
    }, []);

    return (
        <button
            aria-label="Open voice commands"
            onClick={toggleVoice}
            className="fixed bottom-5 left-20 z-[91] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white shadow-[0_8px_30px_rgba(219,39,119,0.25)] ring-1 ring-white/20"
            title="Voice commands"
        >
            <Mic size={26} />
            {listening && <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"/><span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500"/></span>}
        </button>
    );
}
