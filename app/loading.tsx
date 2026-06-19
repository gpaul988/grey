/**
 * Global route-level loading UI. Shows a sleek branded shimmer while a page
 * segment streams in (App Router Suspense boundary).
 */
export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-zinc-950">
            <div className="flex flex-col items-center gap-5">
                <div className="relative h-14 w-14">
                    <span className="absolute inset-0 animate-spin rounded-full border-2 border-teal-400/30 border-t-teal-400"/>
                    <span className="absolute inset-2 animate-[spin_1.6s_linear_infinite_reverse] rounded-full border-2 border-indigo-400/30 border-b-indigo-400"/>
                </div>
                <p className="text-sm tracking-widest text-zinc-500">LOADING…</p>
            </div>
        </div>
    );
}
