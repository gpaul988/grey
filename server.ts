// IMPORTANT: must be the very first import so process.env is populated
// (from config.env) before any module that reads env at import time runs.
import './Admin/config/env';

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import SqliteStoreFactory from 'better-sqlite3-session-store';
import next from 'next';
import path from 'node:path';

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
    ensureCsrfIdentifier,
    requireSessionSecret,
} from './Admin/middleware/security';
import {logger, correlationIdMiddleware} from './lib/logger';
import {avatarUpload} from './Admin/config/uploads';

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

// --- Logging & Correlation ID (for request tracing across all services) -------
// Add correlation ID to all requests + log incoming/outgoing
app.use(correlationIdMiddleware);

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
    `${ADMIN_BASE_PATH}/api`, // Explicitly include API routes for CSRF protection
];

// Build a persistent SQLite-backed session store. Reuses the app's existing
// better-sqlite3 connection. If the native module can't load (e.g. cPanel
// before `npm rebuild better-sqlite3`), fall back to MemoryStore so the server
// still boots — the fix is to rebuild the native module, not to crash.
function buildSessionStore(): session.Store | undefined {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const {getDb} = require('./Admin/db') as typeof import('./Admin/db');
        const SqliteStore = SqliteStoreFactory(session);
        return new SqliteStore({
            client: getDb(),
            // express-session entries live in a dedicated table; expired rows
            // are reaped automatically.
            expired: {clear: true, intervalMs: 1000 * 60 * 15}, // sweep every 15m
        }) as unknown as session.Store;
    } catch (err) {
        console.warn(
            '[session] SQLite store unavailable, falling back to MemoryStore. ' +
                'Run `npm rebuild better-sqlite3 --build-from-source`. Reason:',
            (err as Error).message,
        );
        return undefined; // express-session defaults to MemoryStore
    }
}

// Body parsing, cookies and session applied at the ROOT so that the
// top-level auth routes (/login, /register, /logout) share the same
// session as the /admin dashboard.
app.use(SESSION_PATHS, express.urlencoded({extended: true}));
app.use(SESSION_PATHS, express.json());
app.use(SESSION_PATHS, cookieParser());
// Mint a stable, long-lived CSRF identifier cookie on first contact so the
// double-submit token stays valid across GET -> POST regardless of session
// store state or the number of Passenger workers (audit C3 hardening).
app.use(SESSION_PATHS, ensureCsrfIdentifier);
app.use(
    SESSION_PATHS,
    session({
        name: 'grey.sid',
        // Persistent SQLite session store — survives restarts, no memory leak.
        // Reuses the app's existing better-sqlite3 connection (single handle).
        // Falls back to the default MemoryStore only if the native module isn't
        // built yet (cPanel cold start) so the server never fails to boot.
        store: buildSessionStore(),
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

// Apply Multer for file uploads BEFORE CSRF protection so multipart data can be parsed
// This must come after urlencoded/json parsers but before CSRF check
// Middleware to handle Multer for specific file upload routes before CSRF check
app.use(`${ADMIN_BASE_PATH}/profile/avatar`, (req, res, next) => {
    if (req.method !== 'POST') return next();
    avatarUpload.single('avatar')(req, res, (err) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        next();
    });
});

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

// Global Express error handler — catches anything thrown inside route handlers
// (multer size errors, body-parser errors, unexpected throws).
// Must be LAST middleware (4-arg signature) so Express recognises it as an
// error handler. Returns JSON for /api/* and HTML for everything else so
// Passenger always gets a proper response instead of hanging or showing its
// own generic 500 page.
app.use((err: Error & { status?: number; code?: string }, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = (err as { status?: number }).status || 500;
    console.error('[server] Express error handler caught:', err.message || err);
    if (!res.headersSent) {
        if (req.path.startsWith('/api/') || req.path.startsWith(`${ADMIN_BASE_PATH}/api/`)) {
            res.status(status).json({ ok: false, error: err.message || 'Internal server error' });
        } else {
            res.status(status).send(`<h1>${status}</h1><p>${err.message || 'Internal server error'}</p>`);
        }
    }
});

function getRequestUrl(req: express.Request): Parameters<typeof handle>[2] {
    // Next's request handler expects the legacy `UrlWithParsedQuery` shape
    // (pathname + a parsed query object). The deprecated `url.parse(url, true)`
    // produced exactly that, but Node now emits a DEP0169 security warning for
    // it. Build the same shape from the modern WHATWG `URL` API instead so the
    // warning is gone and the behaviour stays identical for Next.js.
    const raw = req.originalUrl || req.url || '/';
    const parsed = new URL(raw, `http://${req.headers.host || hostname}`);
    const query: Record<string, string | string[]> = {};
    for (const key of parsed.searchParams.keys()) {
        if (key in query) continue;
        const all = parsed.searchParams.getAll(key);
        query[key] = all.length > 1 ? all : all[0];
    }
    return {
        pathname: parsed.pathname,
        query,
        search: parsed.search || null,
        href: parsed.pathname + parsed.search,
    } as Parameters<typeof handle>[2];
}

// Global safety net: catch any unhandled promise rejections so the Passenger
// worker never dies silently (which shows Phusion's generic 500 page).
process.on('unhandledRejection', (reason, promise) => {
    console.error('[server] Unhandled promise rejection:', reason, '\nAt:', promise);
    // Do NOT exit — let the process keep serving other requests.
});

process.on('uncaughtException', (err) => {
    console.error('[server] Uncaught exception:', err);
    // Do NOT exit for non-fatal errors. Only exit for truly unrecoverable ones.
    if ((err as NodeJS.ErrnoException).code === 'ERR_DLOPEN_FAILED') {
        // Native module failure — log and continue (DB falls back to MemoryStore).
        return;
    }
});

nextApp.prepare().then(() => {
    // Catch-all for unmatched routes (must be LAST).
    // Delegates to Next.js for page rendering (/pages routes and public files).
    //
    // NOTE: Express 5 ships path-to-regexp v8, which REMOVED support for the
    // bare `'*'` string pattern (it now throws "Missing parameter name at
    // index 1: *"). A pathless `app.use()` is the correct Express 5 way to
    // register a final catch-all middleware — it matches every method and
    // path, which is exactly what we want for delegating to Next.js.
    // Public SEO audit endpoint (server-side fetch to avoid CORS/CSP issues)
    app.post('/seo-audit', express.json(), async (req, res) => {
        try {
            const { url } = req.body || {};
            if (!url) return res.status(400).json({ ok: false, error: 'Missing url' });
            let normalized = String(url).trim();
            if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
            try {
                const fetched = await fetch(normalized, { redirect: 'follow' });
                const status = fetched.status;
                const contentType = fetched.headers.get('content-type') || '';
                const text = await fetched.text();
                const { JSDOM } = await import('jsdom');
                const dom = new JSDOM(text);
                const doc = dom.window.document;
                const title = doc.querySelector('title')?.textContent?.trim() || '';
                const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
                const h1s = Array.from(doc.querySelectorAll('h1')).map(h => h.textContent?.trim() || '');
                const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
                const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
                const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
                const jsonLd = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map(s => s.textContent?.trim() || '');
                const imgs = Array.from(doc.querySelectorAll('img')).map(img => ({ src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || '' }));
                const imagesMissingAlt = imgs.filter(i => !i.alt || i.alt.trim() === '').slice(0, 50);
                const anchors = Array.from(doc.querySelectorAll('a'));
                const links = anchors.map(a => a.getAttribute('href') || '');
                let hostname = '';
                try { hostname = new URL(normalized).hostname; } catch (e) { hostname = ''; }
                const internalLinks = links.filter(h => h && (h.startsWith('/') || (hostname && h.includes(hostname))));
                const externalLinks = links.filter(h => h && !internalLinks.includes(h));
                const bodyText = doc.body?.textContent || '';
                const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
                const hasViewport = Boolean(viewport);
                const score = Math.max(0, Math.min(100, Math.round(
                    ( (title ? 20 : 0) + (metaDesc ? 20 : 0) + (h1s.length ? 15 : 0) + (canonical ? 10 : 0) + (jsonLd.length ? 10 : 0) + (hasViewport ? 10 : 0) + (imagesMissingAlt.length === 0 ? 15 : 5) )
                )));
                return res.json({ ok: true, url: normalized, status, contentType, title, metaDescription: metaDesc, h1s, canonical, robots, viewport, jsonLdCount: jsonLd.length, imagesCount: imgs.length, imagesMissingAlt, linksCount: links.length, internalLinksCount: internalLinks.length, externalLinksCount: externalLinks.length, wordCount, mobileFriendly: hasViewport, score });
            } catch (fetchErr:any) {
                console.error('[seo-audit] fetch error', fetchErr);
                return res.status(500).json({ ok: false, error: String(fetchErr) });
            }
        } catch (err:any) {
            console.error('[seo-audit] error', err);
            return res.status(500).json({ ok: false, error: err.message || String(err) });
        }
    });

    app.use(async (req, res) => {
        try {
            const parsedUrl = getRequestUrl(req);
            await handle(req, res, parsedUrl);
        } catch (error) {
            console.error('Error handling request:', req.url, error);
            if (!res.headersSent) {
                res.status(500).send('internal server error');
            }
        }
    });

    app.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
        console.log(`> Admin on http://${hostname}:${port}${ADMIN_BASE_PATH}`);
        console.log(`> Admin API on http://${hostname}:${port}${ADMIN_BASE_PATH}/api`);
    });
}).catch((err) => {
    // Next.js failed to prepare — log the full error so it's visible in
    // passenger.log, then exit so Passenger can restart with a clean state.
    console.error('[server] FATAL: Next.js failed to prepare:', err);
    process.exit(1);
});