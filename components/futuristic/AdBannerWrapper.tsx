'use client';

import React, { Suspense } from 'react';
import AdBanner from './AdBanner';

interface AdBannerWrapperProps {
    placement?: string;
}

/**
 * Wrapper that fixes hydration issues with AdBanner.
 * Isolates the client component in an explicit Suspense boundary.
 */
export default function AdBannerWrapper({ placement = 'home_banner' }: AdBannerWrapperProps) {
    return (
        <Suspense fallback={null}>
            <AdBanner placement={placement} />
        </Suspense>
    );
}
