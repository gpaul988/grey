import { NextApiRequest, NextApiResponse } from 'next';
import { parseJwt } from './utils';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AuthUser | null> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'No authorization token' });
      return null;
    }

    // Decode JWT or validate with your auth provider
    const decoded = parseJwt(token);

    if (!decoded.sub && !decoded.user_id) {
      res.status(401).json({ error: 'Invalid token' });
      return null;
    }

    const user: AuthUser = {
      id: decoded.sub || decoded.user_id,
      email: decoded.email || 'unknown',
      role: decoded.role || 'user',
    };

    // Store in request for downstream use
    (req as any).user = user;

    return user;
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
    return null;
  }
};

export const requireAuth = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authenticate(req, res);
    if (!user) return;
    return handler(req, res);
  };
};

export const requireRole = (role: string) => {
  return (handler: Function) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const user = await authenticate(req, res);
      if (!user) return;

      if (user.role !== role) {
        res.status(403).json({ error: 'Insufficient permissions' });
        return;
      }

      return handler(req, res);
    };
  };
};
