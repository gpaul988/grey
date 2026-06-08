import express, { type Request, type Response } from 'express';

import { adminPath } from '../config/adminPaths';
import { redirectIfAuth } from '../middleware/authMiddleware';
import { Users, logActivity } from '../models';
import { isEmail, str } from '../utils/helpers';

interface RenderOptions {
    formError?: string;
    formValues?: { name?: string; email?: string };
}

const route = express.Router();

const renderLogin = (res: Response, options: RenderOptions = {}) => {
    res.render('auth-login', {
        title: 'Login',
        layout: 'partials/base-layout',
        formError: options.formError || '',
        formValues: options.formValues || {},
    });
};

const renderRegister = (res: Response, options: RenderOptions = {}) => {
    res.render('auth-register', {
        title: 'Register',
        layout: 'partials/base-layout',
        formError: options.formError || '',
        formValues: options.formValues || {},
    });
};

route.get('/', (req: Request, res: Response) => {
    if (req.session.user) return res.redirect(adminPath('/dashboard'));
    return res.redirect(adminPath('/login'));
});

route.get('/login', redirectIfAuth, (_req: Request, res: Response) => renderLogin(res));

route.post('/login', redirectIfAuth, async (req: Request, res: Response) => {
    const email = str(req.body.email).toLowerCase();
    const password = str(req.body.password);

    if (!email || !password) {
        return renderLogin(res, { formError: 'Please enter both email and password.', formValues: { email } });
    }
    if (!isEmail(email)) {
        return renderLogin(res, { formError: 'Please enter a valid email address.', formValues: { email } });
    }

    const user = await Users.verify(email, password);
    if (!user) {
        return renderLogin(res, { formError: 'Invalid email or password.', formValues: { email } });
    }

    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar };
    logActivity({ user_id: user.id, user_name: user.name, action: 'login', entity: 'auth' });
    return req.session.save(() => res.redirect(adminPath('/dashboard')));
});

route.get('/register', redirectIfAuth, (_req: Request, res: Response) => renderRegister(res));

route.post('/register', redirectIfAuth, async (req: Request, res: Response) => {
    const name = str(req.body.name);
    const email = str(req.body.email).toLowerCase();
    const password = str(req.body.password);
    const confirmPassword = str(req.body.confirmPassword || req.body.confirm_password);

    if (!name || !email || !password || !confirmPassword) {
        return renderRegister(res, { formError: 'All fields are required.', formValues: { name, email } });
    }
    if (!isEmail(email)) {
        return renderRegister(res, { formError: 'Please enter a valid email address.', formValues: { name, email } });
    }
    if (password.length < 8) {
        return renderRegister(res, { formError: 'Password must be at least 8 characters.', formValues: { name, email } });
    }
    if (password !== confirmPassword) {
        return renderRegister(res, { formError: 'Passwords do not match.', formValues: { name, email } });
    }
    if (Users.findByEmail(email)) {
        return renderRegister(res, { formError: 'An account with this email already exists.', formValues: { name, email } });
    }

    // First registered user becomes admin; subsequent self-registrations are staff.
    const role = Users.count() === 0 ? 'admin' : 'staff';
    const user = await Users.create({ name, email, password, role });

    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar };
    logActivity({ user_id: user.id, user_name: user.name, action: 'register', entity: 'auth' });
    return req.session.save(() => res.redirect(adminPath('/dashboard')));
});

route.get('/logout', (req: Request, res: Response) => {
    const u = req.session.user;
    if (u) logActivity({ user_id: u.id, user_name: u.name, action: 'logout', entity: 'auth' });
    if (!req.session) return res.redirect(adminPath('/login'));
    req.session.destroy(() => res.redirect(adminPath('/login')));
});

route.get('/auth-login', (_req, res) => res.redirect(adminPath('/login')));
route.get('/auth-register', (_req, res) => res.redirect(adminPath('/register')));
route.get('/auth-logout', (_req, res) => res.redirect(adminPath('/logout')));

export default route;
