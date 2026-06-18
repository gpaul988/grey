import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'admin-secret-key-change-me') as JWTPayload;

    // Get user from DB
    const users = await db.select().from(adminUsers).where(eq(adminUsers.id, decoded.id)).limit(1);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Return user info (exclude password)
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to get current user' });
  }
}
