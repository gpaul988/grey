import type { NextFunction, Request, Response } from 'express';
import { adminPath } from '../config/adminPaths';

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        return next();
    }

    return res.redirect(adminPath('/login'));
};

export const redirectIfAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        return res.redirect(adminPath('/dashboard'));
    }

    return next();
};
