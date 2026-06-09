import type { NextFunction, Request, Response } from 'express';
import { adminPath, LOGIN_PATH } from '../config/adminPaths';
import { userCan } from '../config/permissions';
import { Users } from '../models';

/**
 * Build the permission-check subject from the session, hydrating the latest
 * `permissions` overrides from the DB (the session only stores basic identity).
 */
const permissionSubject = (
    sessionUser: { id: number; role: 'admin' | 'manager' | 'staff' } | undefined
): { role: 'admin' | 'manager' | 'staff'; permissions?: string | null } | null => {
    if (!sessionUser) return null;
    if (sessionUser.role === 'admin') return { role: 'admin' };
    const permissions = Users.getPermissions(sessionUser.id);
    return { role: sessionUser.role, permissions };
};

/** Page guard — redirects unauthenticated users to login. */
export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) return next();
    return res.redirect(LOGIN_PATH);
};

/** API guard — returns 401 JSON instead of redirecting. */
export const ensureApiAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) return next();
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
};

/** Role guard factory — e.g. requireRole('admin'). */
export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ ok: false, message: 'Unauthorized' });
    if (!roles.includes(user.role)) return res.status(403).json({ ok: false, message: 'Forbidden' });
    return next();
};

/** Bounce already-logged-in users away from auth pages. */
export const redirectIfAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) return res.redirect(adminPath('/dashboard'));
    return next();
};

/** Page guard requiring a specific permission key. */
export const requirePermission = (key: string) => (req: Request, res: Response, next: NextFunction) => {
    const subject = permissionSubject(req.session.user);
    if (!subject) return res.redirect(LOGIN_PATH);
    if (userCan(subject, key)) return next();
    return res.status(403).render('error-403', {
        title: 'Access denied',
        layout: 'partials/base-layout',
        message: 'You do not have permission to access this section.',
    });
};

/** API guard requiring a specific permission key. */
export const requireApiPermission = (key: string) => (req: Request, res: Response, next: NextFunction) => {
    const subject = permissionSubject(req.session.user);
    if (!subject) return res.status(401).json({ ok: false, message: 'Unauthorized' });
    if (userCan(subject, key)) return next();
    return res.status(403).json({ ok: false, message: 'Forbidden' });
};
