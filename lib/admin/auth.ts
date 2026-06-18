/**
 * Admin Authentication & Authorization
 * Handles JWT tokens, session validation, and role-based access
 */

import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export type AdminRole = 'superadmin' | 'admin' | 'manager';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: Date;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: Date;
}

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin-secret-change-in-production';
const TOKEN_EXPIRY = '7d'; // 7 days for admin tokens

/**
 * Generate JWT token for admin user
 */
export const generateAdminToken = (user: AdminUser): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};

/**
 * Verify and decode JWT token
 */
export const verifyAdminToken = (token: string): AdminUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      createdAt: new Date(decoded.createdAt || Date.now()),
    };
  } catch {
    return null;
  }
};

/**
 * Extract admin user from request headers/cookies
 */
export const getAdminFromRequest = (req: NextApiRequest): AdminUser | null => {
  // Check Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const user = verifyAdminToken(token);
    if (user) return user;
  }

  // Check X-Admin-Token header
  const headerToken = req.headers['x-admin-token'] as string;
  if (headerToken) {
    const user = verifyAdminToken(headerToken);
    if (user) return user;
  }

  // Check cookies (for browser sessions)
  const cookieToken = req.cookies['admin-token'];
  if (cookieToken) {
    const user = verifyAdminToken(cookieToken);
    if (user) return user;
  }

  return null;
};

/**
 * Require admin authentication in API routes
 * Returns user if authenticated, sends 401 if not
 */
export const requireAdmin = (
  req: NextApiRequest,
  res: NextApiResponse,
  requiredRole?: AdminRole
): AdminUser | null => {
  const user = getAdminFromRequest(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized - admin token required' });
    return null;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'superadmin') {
    res.status(403).json({ error: 'Forbidden - insufficient permissions' });
    return null;
  }

  return user;
};

/**
 * Check if user has specific role
 */
export const hasRole = (user: AdminUser, role: AdminRole): boolean => {
  if (user.role === 'superadmin') return true;
  return user.role === role;
};

/**
 * Check if user can perform action
 */
export const canPerform = (user: AdminUser, action: string): boolean => {
  const permissions: Record<AdminRole, string[]> = {
    superadmin: ['*'], // All permissions
    admin: [
      'view_dashboard',
      'view_users',
      'edit_users',
      'view_services',
      'edit_services',
      'view_payments',
      'view_audits',
      'edit_audits',
      'view_webhooks',
      'view_analytics',
    ],
    manager: [
      'view_dashboard',
      'view_users',
      'view_services',
      'view_payments',
      'view_audits',
      'view_webhooks',
      'view_analytics',
    ],
  };

  const userPerms = permissions[user.role] || [];
  return userPerms.includes('*') || userPerms.includes(action);
};
