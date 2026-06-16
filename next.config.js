/** @type {import('next').NextConfig} */
const nextConfig = {
    // ─── Turbopack disabled ────────────────────────────────────────────────
    // cPanel's Node virtualenv symlinks node_modules outside the project root.
    // Turbopack resolves symlinks and panics with:
    //   "Symlink [project]/node_modules is invalid, it points out of the
    //    filesystem root"
    // Webpack handles virtualenv symlinks correctly — always use it on cPanel.
    // To re-enable Turbopack locally: TURBOPACK=1 next build
    experimental: {
        turbo: undefined,
    },

    images: {
        // cPanel/Passenger shared hosting cannot reliably run Next's on-the-fly
        // image optimizer (/_next/image): `sharp` is often missing/unbuildable
        // and Passenger mishandles the optimizer's streaming/query. That makes
        // almost every <Image> 404/500 in production while dev looks fine.
        // Serving the original files directly fixes it everywhere.
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },
};

module.exports = nextConfig;
