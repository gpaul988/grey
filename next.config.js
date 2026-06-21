/** @type {import('next').NextConfig} */
const nextConfig = {
    // ─── Turbopack enabled (Next.js 16 default) ────────────────────────────
    // Use Turbopack for faster builds. Empty config means use all defaults.
    turbopack: {},

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

    // ─── Build memory note (cPanel 1GB) ────────────────────────────────────
    // This app pulls in heavy libs (three.js / @react-three, framer-motion,
    // recharts, Sentry). A production build peaks at ~3GB RSS regardless of the
    // JS heap cap (most of it is webpack's off-heap parsing of three.js). It
    // therefore CANNOT be built on a 1GB shared-hosting box.
    //
    // The correct workflow is "build elsewhere, run on cPanel":
    //   1. Run `npm run build` locally (or in CI) where RAM is plentiful.
    //   2. Upload the project INCLUDING the generated `.next` folder to cPanel.
    //   3. On cPanel run only `npm ci --omit=dev` + `npm start` (server.ts).
    // See scripts/build-and-deploy.sh and CPANEL_READY.md for the full steps.
};

module.exports = nextConfig;
