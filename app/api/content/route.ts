import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/content?page=home
 * Returns social proof content (partners & reviews) for a specific page
 */
export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get('page') || 'home';

    // Sample content for development
    // In production, this would query the database
    const sampleContent = {
      partners: [
        {
          id: 1,
          name: 'Tech Innovators',
          logo: 'https://via.placeholder.com/150x50?text=TechInnovators',
          url: 'https://example.com/tech-innovators',
        },
        {
          id: 2,
          name: 'Digital Solutions',
          logo: 'https://via.placeholder.com/150x50?text=DigitalSolutions',
          url: 'https://example.com/digital-solutions',
        },
        {
          id: 3,
          name: 'Cloud Partners',
          logo: 'https://via.placeholder.com/150x50?text=CloudPartners',
          url: 'https://example.com/cloud-partners',
        },
        {
          id: 4,
          name: 'AI Systems',
          logo: 'https://via.placeholder.com/150x50?text=AISystems',
          url: 'https://example.com/ai-systems',
        },
        {
          id: 5,
          name: 'Enterprise Corp',
          logo: 'https://via.placeholder.com/150x50?text=EnterpriseCorp',
          url: 'https://example.com/enterprise-corp',
        },
        {
          id: 6,
          name: 'Future Labs',
          logo: 'https://via.placeholder.com/150x50?text=FutureLabs',
          url: 'https://example.com/future-labs',
        },
      ],
      reviews: [
        {
          id: 1,
          author: 'John Okafor',
          role: 'CEO',
          company: 'TechStart Nigeria',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          quote: 'Grey InfoTech transformed our business with their exceptional web development. Highly recommended!',
          rating: 5,
        },
        {
          id: 2,
          author: 'Chioma Adeyemi',
          role: 'Product Manager',
          company: 'Digital Africa',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
          quote: 'The team delivered exactly what we needed on time and within budget. Great communication throughout.',
          rating: 5,
        },
        {
          id: 3,
          author: 'Ahmed Hassan',
          role: 'Founder',
          company: 'Innovation Hub Lagos',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
          quote: 'Professional, creative, and results-driven. They built our mobile app that now has 50K+ users.',
          rating: 5,
        },
      ],
      placement: {
        partners: page === 'home' || page === 'about' || page === 'portfolio',
        reviews: page === 'home' || page === 'services' || page === 'industries',
      },
    };

    return NextResponse.json(sampleContent, { status: 200 });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      {
        partners: [],
        reviews: [],
        placement: { partners: false, reviews: false },
      },
      { status: 200 }
    );
  }
}
