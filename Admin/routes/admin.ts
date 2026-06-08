import { access } from 'node:fs/promises';
import path from 'node:path';
import express, { type Request, type Response } from 'express';

import { adminPath } from '../config/adminPaths';

const route = express.Router();
const viewsRoot = path.join(process.cwd(), 'Admin', 'views');

const toTitle = (slug: string) =>
    slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

const canRenderView = async (viewName: string) => {
    if (!/^[a-z0-9-]+$/i.test(viewName)) {
        return false;
    }

    try {
        await access(path.join(viewsRoot, `${viewName}.ejs`));
        return true;
    } catch {
        return false;
    }
};

route.get('/dashboard', (_req: Request, res: Response) => {
    res.render('index', { title: 'Dashboard' });
});

route.get('/index', (_req: Request, res: Response) => {
    res.redirect(adminPath('/dashboard'));
});

route.get('/home', (_req: Request, res: Response) => {
    res.redirect(adminPath('/dashboard'));
});

route.get('/', (_req: Request, res: Response) => {
    res.redirect(adminPath('/dashboard'));
});

route.get('/:viewName', async (req: Request, res: Response, next) => {
    const rawViewName = req.params.viewName;
    const viewName = Array.isArray(rawViewName) ? rawViewName[0] : rawViewName;

    if (!viewName || ['dashboard', 'index', 'home'].includes(viewName)) {
        return next();
    }

    if (!(await canRenderView(viewName))) {
        return next();
    }

    return res.render(viewName, { title: toTitle(viewName) });
});

route.use((_req: Request, res: Response) => {
    res.status(404).render('error-404', {
        title: 'Page not found',
        layout: 'partials/base-layout'
    });
});

export default route;
