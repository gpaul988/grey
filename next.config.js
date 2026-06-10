/** @type {import('next').NextConfig} */
const nextConfig = {
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
