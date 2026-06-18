import express, { type Request, type Response } from 'express';
import { ensureAuth } from '../middleware/authMiddleware';

const route = express.Router();

/**
 * GET /api/me - Get current user from session
 */
route.get('/me', ensureAuth, (req: Request, res: Response) => {
  const user = (req as any).user;
  
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
});

export default route;
