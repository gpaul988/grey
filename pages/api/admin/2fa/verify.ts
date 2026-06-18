import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyTOTP } from '@/lib/totp';
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

    const { secret, token } = req.body;

    if (!secret || !token) {
      return res.status(400).json({ error: 'secret and token are required' });
    }

    // Verify token
    const isValid = verifyTOTP(secret, token);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid TOTP code' });
    }

    // Save secret and enable 2FA
    const admin = await db
      .update(adminUsers)
      .set({
        totpSecret: secret,
        totpEnabled: true,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, userId))
      .returning();

    res.status(200).json({
      data: admin[0],
      message: '2FA enabled successfully. Store your backup codes in a safe place.',
    });
  } catch (error: any) {
    console.error('2FA verify error:', error);
    res.status(500).json({ error: error.message || 'Failed to verify 2FA' });
  }
});
