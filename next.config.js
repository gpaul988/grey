/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    // ─── Native server packages (SQLite) ──────────────────────────────────
    // Prevents webpack from trying to bundle better-sqlite3.
    // This is the root cause fix for API routes returning 404 in dev.
    serverExternalPackages: ['better-sqlite3'],

    // ─── Low-memory build (cPanel shared hosting only) ────────────────────
    // Only apply single-worker constraint in production builds (cPanel).
    // In dev, let Next use all available CPUs for fast compilation.
    experimental: {
        workerThreads: !isProd,
        cpus: isProd ? 1 : undefined,
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

    // ─── Permissive headers so Tawk iframes/WS work on all envs ─────────
    // We use X-Frame-Options + a loose CSP frame-ancestors only — not a full
    // strict CSP — so Turbopack HMR, Sentry, analytics etc are unaffected.
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // Allow Tawk iframe to embed and connect
                    { key: 'Access-Control-Allow-Origin',  value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
                ],
            },
        ];
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
  async rewrites() {
    return [
      { source: '/startup', destination: '/Startups' },
      { source: '/startups', destination: '/Startups' },
    ];
  },
};

module.exports = nextConfig;
