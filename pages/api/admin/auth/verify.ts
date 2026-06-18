import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../../lib/admin/auth';

/**
 * Verify Admin Token Endpoint
 * Used by client to check if token is still valid
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = requireAdmin(req, res);

  if (!user) {
    return;
  }

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
