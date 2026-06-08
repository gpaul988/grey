import express, { type Request, type Response } from 'express';

import { adminPath } from '../config/adminPaths';
import { redirectIfAuth } from '../middleware/authMiddleware';

interface FormValues {
    name?: string;
    email?: string;
}

interface RenderOptions {
    formError?: string;
    formValues?: FormValues;
}

const route = express.Router();

const renderLogin = (res: Response, options: RenderOptions = {}) => {
    res.render('auth-login', {
        title: 'Login',
        layout: 'partials/base-layout',
        formError: options.formError || '',
        formValues: options.formValues || {}
    });
};

const renderRegister = (res: Response, options: RenderOptions = {}) => {
    res.render('auth-register', {
        title: 'Register',
        layout: 'partials/base-layout',
        formError: options.formError || '',
        formValues: options.formValues || {}
    });
};

route.get('/', (req: Request, res: Response) => {
    if (req.session.user) {
        return res.redirect(adminPath('/dashboard'));
    }

    return res.redirect(adminPath('/login'));
});

route.get('/login', redirectIfAuth, (_req: Request, res: Response) => {
    renderLogin(res);
});

route.post('/login', redirectIfAuth, (req: Request, res: Response) => {
    const { email = '', password = '' } = req.body as Record<string, string>;
    const safeEmail = String(email).trim();

    if (!safeEmail || !String(password).trim()) {
        return renderLogin(res, {
            formError: 'Please enter both email and password.',
            formValues: { email: safeEmail }
        });
    }

    req.session.user = {
        name: safeEmail.split('@')[0] || 'User',
        email: safeEmail
    };

    return req.session.save(() => res.redirect(adminPath('/dashboard')));
});

route.get('/register', redirectIfAuth, (_req: Request, res: Response) => {
    renderRegister(res);
});

route.post('/register', redirectIfAuth, (req: Request, res: Response) => {
    const { name = '', email = '', password = '', confirmPassword = '' } = req.body as Record<string, string>;
    const safeName = String(name).trim();
    const safeEmail = String(email).trim();

    if (!safeName || !safeEmail || !String(password).trim() || !String(confirmPassword).trim()) {
        return renderRegister(res, {
            formError: 'All fields are required to create an account.',
            formValues: { name: safeName, email: safeEmail }
        });
    }

    if (String(password) !== String(confirmPassword)) {
        return renderRegister(res, {
            formError: 'Passwords do not match.',
            formValues: { name: safeName, email: safeEmail }
        });
    }

    req.session.user = {
        name: safeName,
        email: safeEmail
    };

    return req.session.save(() => res.redirect(adminPath('/dashboard')));
});

route.get('/logout', (req: Request, res: Response) => {
    if (!req.session) {
        return res.redirect(adminPath('/login'));
    }

    req.session.destroy(() => res.redirect(adminPath('/login')));
});

route.get('/auth-login', (_req: Request, res: Response) => res.redirect(adminPath('/login')));
route.get('/auth-register', (_req: Request, res: Response) => res.redirect(adminPath('/register')));
route.get('/auth-logout', (_req: Request, res: Response) => res.redirect(adminPath('/logout')));

export default route;
