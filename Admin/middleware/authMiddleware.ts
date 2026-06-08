import type { NextFunction, Request, Response } from 'express';
import { adminPath } from '../config/adminPaths';

/** Page guard — redirects unauthenticated users to login. */
export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) return next();
    return res.redirect(adminPath('/login'));
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
