'use client';

import {useEffect} from 'react';

declare global {
    interface Window {
        Calendly?: {
            initInlineWidget: (options: Record<string, unknown>) => void;
        };
    }
}

type CalendlyEmbedProps = {
    calendlyUrl: string;
    className?: string;
    height?: string;
};

/**
 * CalendlyEmbed - Embedded Calendly booking widget
 *
 * Usage:
 * <CalendlyEmbed
 *   calendlyUrl="https://calendly.com/your-username/30min"
 *   height="700px"
 * />
 */
export default function CalendlyEmbed({
                                          calendlyUrl,
                                          className = '',
                                          height = '700px'
                                      }: CalendlyEmbedProps) {
    useEffect(() => {
        if (!calendlyUrl) return;

        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.Calendly?.initInlineWidget) {
                window.Calendly.initInlineWidget({
                    url: calendlyUrl,
                    parentElement: document.getElementById('calendly-embed')
                });
            }
        };
    }, [calendlyUrl]);

    return (
        <div
            id="calendly-embed"
            className={`w-full rounded-2xl overflow-hidden border border-gray-200 bg-white ${className}`}
            style={{minHeight: height}}
        />
    );
}