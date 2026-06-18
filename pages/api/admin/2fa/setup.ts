import { NextApiRequest, NextApiResponse } from 'next';
import { generateTOTPSecret, generateBackupCodes } from '@/lib/totp';
import { withAuth, type SessionPayload } from '@/lib/auth-middleware';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const email = session?.email;
    if (!email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Generate secret and QR code
    const { secret, qrCode } = await generateTOTPSecret(email);

    // Generate backup codes
    const backupCodes = generateBackupCodes(10);

    res.status(200).json({
      data: {
        secret,
        qrCode,
        backupCodes,
      },
      message: 'TOTP setup initiated. Scan QR code and verify with 6-digit code.',
    });
  } catch (error: any) {
    console.error('2FA setup error:', error);
    res.status(500).json({ error: error.message || 'Failed to set up 2FA' });
  }
});
