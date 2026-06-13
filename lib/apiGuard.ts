/**
 * Security helpers for the Pages Router store API (audit: input validation +
 * rate limiting + payload hardening).
 *
 * - `rateLimit()` — in-memory sliding-window limiter keyed by client IP.
 *   (Single-process cPanel/Passenger deployment; for multi-instance swap the
 *   store for Redis. The Express side already uses express-rate-limit.)
 * - `validate()` — zod-based body validation that returns typed data or sends
 *   a 400 with field errors.
 * - `clientIp()` — trusts the proxy chain set by Express (trust proxy on).
 * - `sanitize()` — strips HTML/script from free-text fields via DOMPurify.
 */
import type {NextApiRequest, NextApiResponse} from 'next';
import {z, ZodError, type ZodTypeAny} from 'zod';
import DOMPurify from 'isomorphic-dompurify';

export function clientIp(req: NextApiRequest): string {
    const xff = (req.headers['x-forwarded-for'] as string) || '';
    const ip = xff.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    return ip;
}

interface Bucket {
    count: number;
    reset: number;
}
const buckets = new Map<string, Bucket>();

/** Returns true if the request is allowed, false if rate-limited (and responds 429). */
export function rateLimit(
    req: NextApiRequest,
    res: NextApiResponse,
    opts: {key: string; limit: number; windowMs: number}
): boolean {
    const now = Date.now();
    const id = `${opts.key}:${clientIp(req)}`;
    let b = buckets.get(id);
    if (!b || b.reset < now) {
        b = {count: 0, reset: now + opts.windowMs};
        buckets.set(id, b);
    }
    b.count += 1;
    const remaining = Math.max(0, opts.limit - b.count);
    res.setHeader('X-RateLimit-Limit', String(opts.limit));
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    if (b.count > opts.limit) {
        const retry = Math.ceil((b.reset - now) / 1000);
        res.setHeader('Retry-After', String(retry));
        res.status(429).json({error: 'Too many requests. Please slow down and try again shortly.'});
        return false;
    }
    return true;
}

// Periodic cleanup so the map can't grow unbounded.
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    }, 60_000).unref?.();
}

/** Validate req.body against a zod schema. On failure responds 400 and returns null. */
export function validate<T extends ZodTypeAny>(
    schema: T,
    req: NextApiRequest,
    res: NextApiResponse
): z.infer<T> | null {
    try {
        return schema.parse(req.body ?? {});
    } catch (e) {
        if (e instanceof ZodError) {
            const fields: Record<string, string> = {};
            for (const issue of e.issues) {
                const path = issue.path.join('.') || 'body';
                if (!fields[path]) fields[path] = issue.message;
            }
            res.status(400).json({error: 'Validation failed', fields});
            return null;
        }
        res.status(400).json({error: 'Invalid request body'});
        return null;
    }
}

/** Strip any HTML/script from a free-text string. */
export function sanitize(input: unknown): string {
    if (typeof input !== 'string') return '';
    return DOMPurify.sanitize(input, {ALLOWED_TAGS: [], ALLOWED_ATTR: []}).trim();
}

/** Common reusable field schemas. */
export const fields = {
    email: z.string().trim().toLowerCase().email('Enter a valid email').max(254),
    phone: z.string().trim().min(7, 'Enter a valid phone number').max(20),
    name: z.string().trim().min(1, 'Required').max(80),
    password: z.string().min(8, 'Password must be at least 8 characters').max(200),
    shortText: z.string().trim().max(200).optional(),
    longText: z.string().trim().max(5000).optional(),
};
