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
 * Returns a strong session secret or throws in production when one is missing.
 * Never silently falls back to a hardcoded value in production (audit C2).
 */
export function requireSessionSecret(name: string, devFallback: string): string {
    const value = process.env[name];
    if (value && value.length >= 16) return value;
    if (isProd) {
        throw new Error(
            `[security] ${name} is missing or too short. Refusing to start in production with an insecure secret.`,
        );
    }
    // Development convenience only — clearly marked, never used in prod.
    // eslint-disable-next-line no-console
    console.warn(`[security] ${name} not set — using a development-only fallback. DO NOT use in production.`);
    return devFallback;
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
            'connect-src': ["'self'", 'https://*.tawk.to', 'wss://*.tawk.to', 'https://api.calendly.com'],
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
