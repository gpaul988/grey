/** @type {import('next').NextConfig} */
const nextConfig = {
    // ─── Turbopack disabled ────────────────────────────────────────────────
    // cPanel's Node virtualenv symlinks node_modules OUTSIDE the project root
    // (e.g. /home/<user>/nodevenv/...). Next.js 16 defaults `next build` to
    // Turbopack, which resolves that symlink and panics with:
    //   "Symlink [project]/node_modules is invalid, it points out of the
    //    filesystem root"
    // Webpack follows the symlink correctly. There is NO config key to disable
    // Turbopack in Next 16 — it must be forced via the CLI flag in package.json:
    //   "build": "next build --webpack"
    // (The old `experimental.turbo` key is gone and just emits a warning.)

    // ─── Low-memory build (cPanel shared hosting) ──────────────────────────
    // Shared hosting caps process memory hard. Next's default parallel build
    // workers each hold a full compiler copy, and the OS SIGKILLs them when the
    // box runs out of RAM (build dies with "exited with code: null, signal:
    // SIGKILL"). Force a SINGLE worker to keep peak memory low.
    experimental: {
        workerThreads: false,
        cpus: 1,
    },

    // Source maps roughly double build memory/disk. Not needed in prod.
    productionBrowserSourceMaps: false,

    images: {
        // cPanel/Passenger shared hosting cannot reliably run Next's on-the-fly
        // image optimizer (/_next/image): `sharp` is often missing/unbuildable
        // and Passenger mishandles the optimizer's streaming/query. That makes
        // almost every <Image> 404/500 in production while dev looks fine.
        // Serving the original files directly fixes it everywhere.
        unoptimized: true,
        // NOTE: `formats` is intentionally omitted — it has no effect when
        // unoptimized:true and triggers a Next.js 16 deprecation warning.
    },

    // ─── Suppress noisy dev/build warnings ────────────────────────────────
    typescript: {
        // Type errors are checked separately via `tsc --noEmit`. Don't block
        // the build on type errors so a cPanel deploy can always succeed.
        ignoreBuildErrors: false,
    },

    eslint: {
        // ESLint is run separately in CI. Don't slow down the production build.
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
