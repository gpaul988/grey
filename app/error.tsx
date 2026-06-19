'use client';

/**
 * Global error boundary for the App Router. Catches render/runtime errors in
 * any route segment and offers a graceful recovery instead of a white screen.
 */
import {useEffect} from 'react';
import Link from 'next/link';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
    useEffect(() => {
        // Surface for logging/observability without leaking details to the user.
        // eslint-disable-next-line no-console
        console.error('Route error:', error);
    }, [error]);

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-zinc-950 px-6 text-center text-white">
            <div className="max-w-lg">
                <p className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-7xl font-black text-transparent">Oops</p>
                <h1 className="mt-4 text-2xl font-semibold">Something went wrong</h1>
                <p className="mt-3 text-zinc-400">
                    An unexpected error occurred. You can try again, or head back home.
                </p>
                {error?.digest && <p className="mt-2 text-xs text-zinc-600">Ref: {error.digest}</p>}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button onClick={reset} className="rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 px-6 py-2.5 font-medium text-black transition hover:opacity-90">
                        Try again
                    </button>
                    <Link href="/" className="rounded-full border border-white/20 px-6 py-2.5 font-medium text-white transition hover:border-teal-400/60">
                        Go home
                    </Link>
                </div>
            </div>
        </section>
    );
}
