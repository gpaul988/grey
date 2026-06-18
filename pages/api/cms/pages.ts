import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug, type, limit = '10', offset = '0' } = req.query;

    const whereConditions: any[] = [eq(cmsPages.published, true)];

    if (slug) {
      whereConditions.push(eq(cmsPages.slug, slug as string));
    } else if (type) {
      whereConditions.push(eq(cmsPages.type, type as string));
    }

    const pages = await db
      .select()
      .from(cmsPages)
      .where(and(...whereConditions))
      .orderBy(cmsPages.publishedAt)
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

    res.status(200).json({
      data: pages,
      count: pages.length,
    });
  } catch (error: any) {
    console.error('CMS public endpoint error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch CMS pages' });
  }
};
