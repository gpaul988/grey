import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '404 — Page Not Found',
    description: 'The page you are looking for could not be found.',
    robots: {index: false, follow: true},
};

export default function NotFound() {
    return (
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-zinc-950 px-6 text-center text-white">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_50%_30%,rgba(45,212,191,0.18),transparent_70%)]"/>
            <div className="relative z-10 max-w-lg">
                <p className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-8xl font-black text-transparent">404</p>
                <h1 className="mt-4 text-2xl font-semibold">This page drifted off the grid</h1>
                <p className="mt-3 text-zinc-400">
                    The page you’re after doesn’t exist or has moved. Let’s get you back on track.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link href="/" className="rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 px-6 py-2.5 font-medium text-black transition hover:opacity-90">
                        Go home
                    </Link>
                    <Link href="/contact" className="rounded-full border border-white/20 px-6 py-2.5 font-medium text-white transition hover:border-teal-400/60">
                        Contact us
                    </Link>
                </div>
            </div>
        </section>
    );
}
