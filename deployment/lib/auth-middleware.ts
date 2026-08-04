import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface SessionPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Auth middleware wrapper for API routes
 * Usage: const handler = withAuth(async (req, res, session) => { ... });
 */
export const withAuth = (
  handler: (req: NextApiRequest, res: NextApiResponse, session: SessionPayload) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as SessionPayload;
      
      return handler(req, res, payload);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Auth error:', error);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
};
