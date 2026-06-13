/**
 * Pages Router _app — NEUTRALIZED after the App Router migration.
 *
 * All UI now lives under app/ (App Router). The Pages Router only serves
 * API routes (pages/api/*), which never render this component. We keep a
 * minimal pass-through so the Pages Router stays valid, WITHOUT duplicating
 * the <title>, viewport, Timebased or TawkChat — those now live in
 * app/layout.tsx. (Removing the duplicate <title>Grey InfoTech Limited</title>
 * and the second TawkChat mount fixes the audit duplication defects.)
 */
import type {AppProps} from 'next/app';
import React from 'react';

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
