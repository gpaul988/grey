import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import next from 'next';
import path from 'node:path';
import {urlToHttpOptions} from 'node:url';

import {ADMIN_BASE_PATH} from './Admin/config/adminPaths';
import {ensureAuth} from './Admin/middleware/authMiddleware';
import adminRoutes from './Admin/routes/admin';
import apiRoutes from './Admin/routes/api';
import authRoutes from './Admin/routes/auth';
import portalRoutes from './Admin/routes/portal';
import {dashboardStats} from './Admin/models';

dotenv.config({path: './config.env'});

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = Number(process.env.PORT || 3000);
const adminPublicPath = path.join(process.cwd(), 'Admin', 'public');
const adminViewsPath = path.join(process.cwd(), 'Admin', 'views');

const nextApp = next({dev, hostname, port});
const handle = nextApp.getRequestHandler();

const app = express();

app.set('views', adminViewsPath);
app.set('view engine', 'ejs');
app.set('layout', 'partials/layout-vertical');

app.use(expressLayouts);

// Serve legacy admin assets so existing EJS templates keep working.
app.use('/css', express.static(path.join(adminPublicPath, 'css')));
app.use('/js', express.static(path.join(adminPublicPath, 'js')));
app.use('/images', express.static(path.join(adminPublicPath, 'images')));
app.use('/vendor', express.static(path.join(adminPublicPath, 'vendor')));
app.use('/fonts', express.static(path.join(adminPublicPath, 'fonts')));

// User-generated uploads (avatars, client files). Served read-only.
app.use('/uploads', express.static(path.join(adminPublicPath, 'uploads')));

// Paths that share the Express session/body-parsing stack. Includes the
// email-verification, set-password and client-portal routes added later.
const SESSION_PATHS = [
    '/login',
    '/register',
    '/logout',
    '/verify-email',
    '/set-password',
    '/portal',
    ADMIN_BASE_PATH,
];

// Body parsing, cookies and session applied at the ROOT so that the
// top-level auth routes (/login, /register, /logout) share the same
// session as the /admin dashboard.
app.use(SESSION_PATHS, express.urlencoded({extended: true}));
app.use(SESSION_PATHS, express.json());
app.use(SESSION_PATHS, cookieParser());
app.use(
    SESSION_PATHS,
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'grey-admin-session',
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
        },
    }),
);

app.use(SESSION_PATHS, (req, res, nextMiddleware) => {
    res.locals.user = req.session.user || null;
    res.locals.currentYear = new Date().getFullYear();
    res.locals.frontendBaseUrl = process.env.FRONTEND_BASE_URL || '/';
    res.locals.backendBaseUrl = process.env.BACKEND_BASE_URL || `${ADMIN_BASE_PATH}`;
    res.locals.adminBasePath = ADMIN_BASE_PATH;

    // Clean root-level auth URLs for the EJS auth views.
    res.locals.loginPath = '/login';
    res.locals.registerPath = '/register';
    res.locals.logoutPath = '/logout';

    // Derive active nav key from the path, for example /admin/leads -> "leads".
    const seg = (req.path || '/').split('/').filter(Boolean)[0] || 'dashboard';
    res.locals.activeNav = seg === 'index' || seg === 'home' ? 'dashboard' : seg;

    // Sidebar badge counts only when logged in. Never break the request.
    if (req.session.user) {
        try {
            const stats = dashboardStats();

            res.locals.navBadges = {
                newSubmissions: stats.newSubmissions,
                openTickets: stats.openTickets,
                unreadConvos: stats.unreadConvos,
            };
        } catch {
            res.locals.navBadges = null;
        }
    } else {
        res.locals.navBadges = null;
    }

    nextMiddleware();
});

// JSON CRUD API. Auth is enforced inside the router via ensureApiAuth.
app.use(`${ADMIN_BASE_PATH}/api`, apiRoutes);

// Auth routes: /login, /register, /logout, /verify-email, /set-password.
// Mounted at both root and /admin for backwards compatibility with old links.
app.use('/', authRoutes);
app.use(ADMIN_BASE_PATH, authRoutes);

// Client portal routes.
app.use('/portal', portalRoutes);

// Protected admin dashboard and CRUD pages.
app.use(ADMIN_BASE_PATH, ensureAuth, adminRoutes);

function getRequestUrl(req: express.Request): Parameters<typeof handle>[2] {
    const protocol = req.headers['x-forwarded-proto']?.toString().split(',')[0] || req.protocol || 'http';
    const host = req.headers.host || `${hostname}:${port}`;
    const url = new URL(req.originalUrl || req.url || '/', `${protocol}://${host}`);
    const parsedUrl = urlToHttpOptions(url) as Parameters<typeof handle>[2];

    parsedUrl.query = Object.fromEntries(url.searchParams.entries());

    return parsedUrl;
}

nextApp.prepare().then(() => {
    app.all('/{*splat}', async (req, res) => {
        try {
            const parsedUrl = getRequestUrl(req);

            await handle(req, res, parsedUrl);
        } catch (error) {
            console.error('Error handling request:', req.url, error);
            res.status(500).send('internal server error');
        }
    });

    app.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
        console.log(`> Admin on http://${hostname}:${port}${ADMIN_BASE_PATH}`);
    });
});