import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { generateAdminToken } from '../../../../lib/admin/auth';
import { Users } from '../../../../Admin/models';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Admin Login Endpoint - Uses Database Authentication
 * @deprecated This endpoint is for legacy compatibility.
 * Use Express route POST /login instead (Admin/routes/auth.ts)
 * 
 * The Express-based auth system is more secure and has proper session management.
 * This API endpoint is kept for backward compatibility only.
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

    // Authenticate against database using bcrypt-protected password
    const matched = await Users.checkPassword(data.email, data.password);
    
    if (!matched) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if account is disabled
    if (String(matched.status || '').toLowerCase() === 'disabled') {
      return res.status(403).json({ error: 'This account is disabled. Contact your administrator.' });
    }

    // Check if email is verified
    if (!matched.email_verified) {
      return res.status(403).json({ error: 'Email not verified. Please check your email for verification link.' });
    }

    // Ensure role is valid AdminRole type
    const validRoles = ['superadmin', 'admin', 'manager'];
    const userRole = validRoles.includes(matched.role) ? matched.role : 'manager';

    // Generate token with proper user data
    const token = generateAdminToken({
      id: String(matched.id),
      email: matched.email,
      name: matched.name,
      role: userRole as 'superadmin' | 'admin' | 'manager',
      createdAt: new Date(),
    });

    // Set secure cookie
    res.setHeader('Set-Cookie', [
      `admin-token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`,
    ]);

    return res.status(200).json({
      token,
      user: {
        id: matched.id,
        email: matched.email,
        name: matched.name,
        role: userRole,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
