'use client';

import React, { Suspense } from 'react';
import AnnouncementBar from './AnnouncementBar';

/**
 * Wrapper that fixes hydration issues with AnnouncementBar.
 * Isolates the client component in an explicit Suspense boundary.
 */
export default function AnnouncementBarWrapper() {
    return (
        <Suspense fallback={null}>
            <AnnouncementBar />
        </Suspense>
    );
}
