import express, { type Request, type Response } from 'express';

import { adminPath } from '../config/adminPaths';

const route = express.Router();

route.get('/', (_req: Request, res: Response) => res.redirect(adminPath('/login')));
route.get('/index', (_req: Request, res: Response) => res.redirect(adminPath('/dashboard')));
route.get('/auth-login', (_req: Request, res: Response) => res.redirect(adminPath('/login')));
route.get('/auth-register', (_req: Request, res: Response) => res.redirect(adminPath('/register')));

export default route;
