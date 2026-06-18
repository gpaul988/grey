import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { generateAdminToken } from '../../../../lib/admin/auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Admin Login Endpoint
 * For now, uses hardcoded credentials from .env
 * In production, authenticate against database with hashed passwords
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = schema.parse(req.body);

    // TODO: In production, query database and verify hashed password
    // For now, check against environment credentials
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@greyinfotech.com.ng';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeThisInCPanel2024!';
    const superadminEmail = process.env.SEED_SUPERADMIN_EMAIL || 'superadmin@greyinfotech.com.ng';
    const superadminPassword = process.env.SEED_SUPERADMIN_PASSWORD || 'ChangeThisInCPanel2024!';

    let role: 'superadmin' | 'admin' | 'manager' | null = null;
    let name = '';

    if (data.email === superadminEmail && data.password === superadminPassword) {
      role = 'superadmin';
      name = 'Super Admin';
    } else if (data.email === adminEmail && data.password === adminPassword) {
      role = 'admin';
      name = 'Administrator';
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateAdminToken({
      id: data.email,
      email: data.email,
      name,
      role,
      createdAt: new Date(),
    });

    // Set secure cookie
    res.setHeader('Set-Cookie', [
      `admin-token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`,
    ]);

    return res.status(200).json({
      token,
      user: {
        id: data.email,
        email: data.email,
        name,
        role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
