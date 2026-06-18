import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { withAuth, type SessionPayload } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = session?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'password is required to disable 2FA' });
    }

    // TODO: Verify password before disabling

    const admin = await db
      .update(adminUsers)
      .set({
        totpSecret: null,
        totpEnabled: false,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, userId))
      .returning();

    res.status(200).json({
      data: admin[0],
      message: '2FA disabled',
    });
  } catch (error: any) {
    console.error('2FA disable error:', error);
    res.status(500).json({ error: error.message || 'Failed to disable 2FA' });
  }
});
