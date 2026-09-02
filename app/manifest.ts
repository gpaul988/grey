import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Grey TechStore',
    short_name: 'Grey Store',
    description: 'Modern tech storefront for premium devices, accessories, and subscriptions.',
    start_url: '/store',
    display: 'standalone',
    background_color: '#0b0f14',
    theme_color: '#2dd4bf',
    icons: [
      { src: '/techlogo.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/techlogo.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
