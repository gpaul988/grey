// IMPORTANT: must be the very first import so process.env is populated
// (from config.env) before any module that reads env at import time runs.
import './Admin/config/env';

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import next from 'next';
import path from 'node:path';
import {parse} from 'node:url';

import {ADMIN_BASE_PATH} from './Admin/config/adminPaths';
import sseRouter from './Admin/routes/sse';
import {ensureAuth} from './Admin/middleware/authMiddleware';
import adminRoutes from './Admin/routes/admin';
import apiRoutes from './Admin/routes/api';
import authRoutes from './Admin/routes/auth';
import portalRoutes from './Admin/routes/portal';
import {dashboardStats} from './Admin/models';
import {
    securityHeaders,
    globalLimiter,
    authLimiter,
    formLimiter,
    doubleCsrfProtection,
    csrfErrorHandler,
    exposeCsrfToken,
    requireSessionSecret,
} from './Admin/middleware/security';

dotenv.config({path: './config.env'});

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = Number(process.env.PORT || 3000);
const adminPublicPath = path.join(process.cwd(), 'Admin', 'public');
const adminViewsPath = path.join(process.cwd(), 'Admin', 'views');

const nextApp = next({dev, hostname, port});
const handle = nextApp.getRequestHandler();

const app = express();

// Trust the reverse proxy (cPanel/Passenger/Cloudflare) so secure cookies,
// rate-limit IP detection and protocol checks work correctly behind it.
app.set('trust proxy', 1);

app.set('views', adminViewsPath);
app.set('view engine', 'ejs');
app.set('layout', 'partials/layout-vertical');

app.use(expressLayouts);

// --- Security layer (audit C3, C4, C5) ---------------------------------------
// Security headers + CSP on every response.
app.use(securityHeaders);
// Global flood protection (static assets are skipped inside the limiter).
app.use(globalLimiter);
// Strict limiters on the sensitive auth/form surfaces.
app.use(['/login', '/register', '/portal/login', `${ADMIN_BASE_PATH}/login`], authLimiter);
app.use(['/api/submit-form', '/api/open-ticket'], formLimiter);

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
        name: 'grey.sid',
        resave: false,
        saveUninitialized: false,
        // Fail-fast secret — never silently falls back in production (audit C2).
        secret: requireSessionSecret('SESSION_SECRET', 'grey-admin-session-dev-only'),
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: !dev, // HTTPS-only cookies in production
            maxAge: 1000 * 60 * 60 * 8, // 8h admin session
        },
    }),
);

// CSRF protection on the session-bearing routes. Safe (GET/HEAD/OPTIONS)
// requests are ignored by the library; mutating requests must carry a token.
// exposeCsrfToken makes `csrfToken` available to every EJS view so the
// existing forms can embed a hidden _csrf field (audit C3).
app.use(SESSION_PATHS, exposeCsrfToken);
app.use(SESSION_PATHS, doubleCsrfProtection);

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

// Server-Sent Events — real-time push to admin tabs (no polling needed).
app.use(ADMIN_BASE_PATH, sseRouter);

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

// Clean 403 response when a CSRF token is missing/invalid (audit C3).
app.use(csrfErrorHandler);

function getRequestUrl(req: express.Request): Parameters<typeof handle>[2] {
    // Next's request handler expects a parsed URL with pathname + query.
    // `parse(url, true)` is the shape Next's own custom-server examples use.
    return parse(req.originalUrl || req.url || '/', true);
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