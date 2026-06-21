import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/ads?placement=home_banner
 * Returns ads for a specific placement
 */
export async function GET(req: NextRequest) {
  try {
    const placement = req.nextUrl.searchParams.get('placement') || 'home_banner';

    // Sample ads for development
    const sampleAds = {
      home_banner: [
        {
          id: 1,
          title: 'Custom Web Development',
          body: 'Build scalable, modern web applications tailored to your business needs.',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop',
          link_url: '/services/web-development',
          cta_label: 'Learn More',
          placement: 'home_banner',
          variant: 'neon',
          share_caption: 'Transform your business with custom web development',
        },
        {
          id: 2,
          title: 'Mobile App Solutions',
          body: 'Native and cross-platform mobile apps that users love.',
          image: 'https://images.unsplash.com/photo-1512941691920-25463bac489c?w=1200&h=400&fit=crop',
          link_url: '/services/mobile-development',
          cta_label: 'Explore',
          placement: 'home_banner',
          variant: 'neon',
          share_caption: 'Mobile apps that drive engagement and growth',
        },
        {
          id: 3,
          title: 'Digital Marketing Services',
          body: 'SEO, social media, content strategy—everything to grow online.',
          image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=1200&h=400&fit=crop',
          link_url: '/services/digital-marketing',
          cta_label: 'Get Started',
          placement: 'home_banner',
          variant: 'neon',
          share_caption: 'Drive growth with strategic digital marketing',
        },
      ],
    };

    const adsForPlacement = sampleAds[placement as keyof typeof sampleAds] || [];

    return NextResponse.json({ ads: adsForPlacement }, { status: 200 });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json({ ads: [] }, { status: 200 });
  }
}
