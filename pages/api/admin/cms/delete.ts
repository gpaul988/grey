import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { withAuth } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const page = await db
      .delete(cmsPages)
      .where(eq(cmsPages.id, parseInt(id as string)))
      .returning();

    if (page.length === 0) {
      return res.status(404).json({ error: 'CMS page not found' });
    }

    res.status(200).json({ data: page[0], message: 'CMS page deleted successfully' });
  } catch (error: any) {
    console.error('CMS delete error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete CMS page' });
  }
});
