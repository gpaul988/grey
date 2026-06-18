import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'admin-secret-key-change-me') as JWTPayload;

    // Get user
    const users = await db.select().from(adminUsers).where(eq(adminUsers.id, decoded.id)).limit(1);

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Verify current password
    const isPasswordValid = await bcryptjs.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const newPasswordHash = await bcryptjs.hash(newPassword, salt);

    // Update password
    await db
      .update(adminUsers)
      .set({ passwordHash: newPasswordHash, updatedAt: new Date() })
      .where(eq(adminUsers.id, decoded.id));

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
}
