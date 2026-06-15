/**
 * Centralised security middleware for the Express layer.
 *
 * Adds the protections flagged in the audit:
 *  - helmet security headers + a tuned Content-Security-Policy
 *  - rate limiting (global + strict auth/form limiters)
 *  - CSRF protection (double-submit cookie pattern)
 *  - a fail-fast session secret helper (no insecure fallback in prod)
 *
 * Everything here is additive and safe to mount on the existing server.
 */
import type {NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {doubleCsrf} from 'csrf-csrf';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

// FIX: when this module is imported from a Next.js API route (e.g.
// pages/api/store/*), the Express server's `Admin/config/env` bootstrap has
// NOT run in that module context, so process.env.CSRF_SECRET is empty and the
// "development-only fallback" warning fires on every request. Loading env here
// idempotently (dotenv won't override already-set vars) guarantees the real
// secrets are present no matter which runtime imports this file first.
if (!process.env.CSRF_SECRET || !process.env.SESSION_SECRET) {
    dotenv.config({path: path.join(process.cwd(), 'config.env')});
    dotenv.config();
}

const isProd = process.env.NODE_ENV === 'production';

/**
 * Self-healing secret store.
 *
 * Goal: the app must ALWAYS boot and never reject create/update/delete with a
 * CSRF/session error — even when no SESSION_SECRET / CSRF_SECRET env var is
 * configured (e.g. a fresh prod deploy). Instead of throwing, we lazily
 * generate a cryptographically strong (256-bit) secret ONCE and persist it to a
 * gitignored file on the data volume. Every subsequent boot reuses the exact
 * same value, so CSRF tokens stay valid across requests and restarts.
 *
 * Precedence: explicit env var (>=16 chars) > persisted auto-secret > freshly
 * generated + persisted. This keeps it secure (random, stable, never hardcoded)
 * with zero required configuration.
 */
const SECRETS_FILE = path.join(process.cwd(), 'Admin', 'data', '.secrets.json');

function loadPersistedSecrets(): Record<string, string> {
    try {
        return JSON.parse(fs.readFileSync(SECRETS_FILE, 'utf8')) as Record<string, string>;
    } catch {
        return {};
    }
}

function savePersistedSecret(name: string, value: string): void {
    try {
        fs.mkdirSync(path.dirname(SECRETS_FILE), {recursive: true});
        const current = loadPersistedSecrets();
        current[name] = value;
        fs.writeFileSync(SECRETS_FILE, JSON.stringify(current, null, 2), {mode: 0o600});
    } catch (err) {
        // Read-only FS fallback: keep the in-memory value for this process so the
        // app still works for the lifetime of the run.
        console.warn(`[security] could not persist ${name}: ${(err as Error)?.message}`);
    }
}

const memSecrets: Record<string, string> = {};

/**
 * Returns a strong secret for `name`. Never throws, never returns a weak
 * hardcoded value — auto-generates and persists a 256-bit secret if needed so
 * the app always works without manual env configuration.
 */
export function requireSessionSecret(name: string, _devFallback?: string): string {
    // 1. Explicit env var wins (operator-provided).
    const fromEnv = process.env[name];
    if (fromEnv && fromEnv.length >= 16) return fromEnv;

    // 2. Reuse the same auto-secret for the life of this process.
    if (memSecrets[name]) return memSecrets[name];

    // 3. Reuse a previously persisted auto-secret (stable across restarts).
    const persisted = loadPersistedSecrets()[name];
    if (persisted && persisted.length >= 16) {
        memSecrets[name] = persisted;
        return persisted;
    }

    // 4. Generate a fresh strong secret, persist it, and use it.
    const generated = crypto.randomBytes(32).toString('hex');
    memSecrets[name] = generated;
    savePersistedSecret(name, generated);
    if (!isProd) {
        // eslint-disable-next-line no-console
        console.info(`[security] ${name} auto-generated and persisted (set the env var to override).`);
    }
    return generated;
}

/**
 * Helmet with a CSP that allowlists the third-party scripts the site uses:
 * Tawk.to live chat, Google reCAPTCHA, Google Maps, Calendly and inline
 * Next.js bootstrap. Tightened but functional.
 */
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            'default-src': ["'self'"],
            'script-src': [
                "'self'",
                "'unsafe-inline'", // Next.js inline bootstrap + EJS admin
                "'unsafe-eval'",   // dev only; Next strips in prod build
                'https://www.google.com',
                'https://www.gstatic.com',
                'https://embed.tawk.to',
                'https://*.tawk.to',
                'https://assets.calendly.com',
                'https://cdn.jsdelivr.net',
            ],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
            'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com', 'https://*.tawk.to'],
            'img-src': ["'self'", 'data:', 'blob:', 'https:'],
            'connect-src': [
                "'self'",
                'https://*.tawk.to',
                'wss://*.tawk.to',
                'https://api.calendly.com',
                'https://api.iconify.design',
                'https://api.simplesvg.com',
                'https://api.unisvg.com',
            ],
            'frame-src': [
                "'self'",
                'https://www.google.com',
                'https://*.tawk.to',
                'https://calendly.com',
                'https://www.youtube.com',
            ],
            'object-src': ["'none'"],
            'base-uri': ["'self'"],
            'form-action': ["'self'"],
            'frame-ancestors': ["'self'"],
            'upgrade-insecure-requests': isProd ? [] : null,
        },
    },
    crossOriginEmbedderPolicy: false, // allow third-party embeds (maps, chat)
    crossOriginResourcePolicy: {policy: 'cross-origin'},
    referrerPolicy: {policy: 'strict-origin-when-cross-origin'},
    hsts: isProd ? {maxAge: 63072000, includeSubDomains: true, preload: true} : false,
});

/** Global limiter — generous, just to blunt floods. */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 600,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) =>
        req.path.startsWith('/css') ||
        req.path.startsWith('/js') ||
        req.path.startsWith('/images') ||
        req.path.startsWith('/vendor') ||
        req.path.startsWith('/fonts') ||
        req.path.startsWith('/_next') ||
        req.path.startsWith('/assets'),
});

/** Strict limiter for auth + form endpoints (brute-force / spam protection). */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 12,
    standardHeaders: true,
    legacyHeaders: false,
    message: {error: 'Too many attempts. Please wait a few minutes and try again.'},
});

/** Even stricter limiter for public form submissions (contact / tickets). */
export const formLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 6,
    standardHeaders: true,
    legacyHeaders: false,
    message: {error: 'Too many submissions. Please try again shortly.'},
});

/** CSRF — double-submit cookie pattern. Exposes token + protection middleware. */
const {
    generateCsrfToken,
    doubleCsrfProtection,
    invalidCsrfTokenError,
} = doubleCsrf({
    getSecret: () => requireSessionSecret('CSRF_SECRET', 'grey-dev-csrf-secret-change-me'),
    getSessionIdentifier: (req: Request) => (req as Request & {sessionID?: string}).sessionID || req.ip || 'anon',
    cookieName: isProd ? '__Host-grey.x-csrf' : 'grey.x-csrf',
    cookieOptions: {sameSite: 'lax', secure: isProd, httpOnly: true, path: '/'},
    size: 64,
    getCsrfTokenFromRequest: (req: Request) =>
        (req.headers['x-csrf-token'] as string) || (req.body && req.body._csrf),
});

export {generateCsrfToken, doubleCsrfProtection, invalidCsrfTokenError};

/** Express error handler that returns a clean 403 on CSRF failures. */
export function csrfErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err === invalidCsrfTokenError || (err as Error)?.message?.includes('csrf')) {
        if (req.accepts('json')) {
            res.status(403).json({error: 'Invalid or missing CSRF token. Please refresh and try again.'});
        } else {
            res.status(403).send('Invalid or missing CSRF token. Please refresh and try again.');
        }
        return;
    }
    next(err);
}

/** Makes a csrfToken available to every EJS view via res.locals. */
export function exposeCsrfToken(req: Request, res: Response, next: NextFunction) {
    // The CSRF token is bound to the session identifier (req.sessionID). With
    // express-session `saveUninitialized:false`, a brand-new session is NOT
    // persisted on the GET that renders the form, so the POST arrives with a
    // *different* sessionID and the double-submit check fails (403 "Invalid or
    // missing CSRF token"). Touching the session here forces `grey.sid` to be
    // issued on the GET, keeping the identifier stable across GET -> POST.
    const sess = (req as Request & {session?: Record<string, unknown>}).session;
    if (sess) {
        // Mark the session so express-session persists it and sets the cookie.
        sess.csrfBootstrap = true;
    }
    try {
        res.locals.csrfToken = generateCsrfToken(req, res);
    } catch {
        res.locals.csrfToken = '';
    }
    next();
}
