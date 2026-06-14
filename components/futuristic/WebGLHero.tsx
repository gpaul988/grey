'use client';

/**
 * WebGLHero — the reusable, capability-gated 3D background.
 *
 * Drop it anywhere as an absolutely-positioned layer behind hero content:
 *   <div className="relative">
 *     <WebGLHero />
 *     ...your content (relative z-10)...
 *   </div>
 *
 * - three.js is code-split via next/dynamic({ssr:false}) and ONLY loaded when
 *   useDeviceCapabilities says the device can afford it (webgl + memory + cores,
 *   not reduced-motion / save-data).
 * - When 3D isn't allowed it renders the elegant CSS aurora fallback instead —
 *   so the section always looks intentional, never empty.
 * - Particle budget auto-scales down on mobile.
 */
import React from 'react';
import dynamic from 'next/dynamic';
import {useDeviceCapabilities} from '@/lib/futuristic/useDeviceCapabilities';

const WebGLScene = dynamic(() => import('./WebGLScene'), {
    ssr: false,
    loading: () => <CssAuroraFallback />,
});

function CssAuroraFallback() {
    return (
        <div className="grey-hero-fallback" aria-hidden="true">
            <span className="grey-hero-blob b1" />
            <span className="grey-hero-blob b2" />
            <span className="grey-hero-blob b3" />
        </div>
    );
}

export default function WebGLHero({
    className = '',
    particleCount,
}: {
    className?: string;
    particleCount?: number;
}) {
    const caps = useDeviceCapabilities();

    return (
        <div className={`grey-webgl-hero ${className}`} aria-hidden="true">
            {caps.ready && caps.allow3D ? (
                <WebGLScene particleCount={particleCount ?? (caps.mobile ? 350 : 700)} />
            ) : (
                <CssAuroraFallback />
            )}
        </div>
    );
}
