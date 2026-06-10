/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },
    // Add this:
    experimental: {
        turbo: {
            enabled: false,
        },
    },
};

module.exports = nextConfig;