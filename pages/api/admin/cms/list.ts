import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { withAuth, SessionPayload } from '@/lib/auth';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, published, limit = '20', offset = '0' } = req.query;

    const whereConditions: any[] = [];

    if (type) {
      whereConditions.push(eq(cmsPages.type, type as string));
    }

    if (published === 'true') {
      whereConditions.push(eq(cmsPages.published, true));
    } else if (published === 'false') {
      whereConditions.push(eq(cmsPages.published, false));
    }

    const query = db.select().from(cmsPages);
    
    const pages = await (whereConditions.length > 0
      ? query.where(and(...whereConditions))
      : query
    )
      .orderBy(cmsPages.createdAt)
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

    res.status(200).json({
      data: pages,
      count: pages.length,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
    });
  } catch (error: any) {
    console.error('CMS list error:', error);
    res.status(500).json({ error: error.message || 'Failed to list CMS pages' });
  }
});
