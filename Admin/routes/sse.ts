/**
 * Server-Sent Events (SSE) endpoint for real-time admin panel updates.
 *
 * Any admin page can connect to /admin/events and receive push notifications
 * whenever tickets, submissions, leads, messages, or orders change — without
 * polling. The SSE connection is lightweight (one persistent HTTP connection
 * per browser tab) and works through Express with no extra dependencies.
 *
 * Usage (client JS):
 *   const es = new EventSource('/admin/events');
 *   es.addEventListener('ticket', e => { ... });
 *   es.addEventListener('submission', e => { ... });
 */

import express, {type Request, type Response} from 'express';
import {dashboardStats} from '../models';

const router = express.Router();

// ── Client registry ──────────────────────────────────────────────────────────

interface SseClient {
    id: number;
    res: Response;
}

let nextId = 1;
const clients: Set<SseClient> = new Set();

/** Broadcast a typed event to every connected admin tab. */
export function broadcast(event: string, data: unknown): void {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of clients) {
        try {
            client.res.write(payload);
        } catch {
            clients.delete(client);
        }
    }
}

/** Broadcast a stats refresh (called after any DB mutation). */
export function broadcastStats(): void {
    try {
        broadcast('stats', dashboardStats());
    } catch {
        // never crash on a stats error
    }
}

// ── SSE route ─────────────────────────────────────────────────────────────────

router.get('/events', (req: Request, res: Response) => {
    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no'); // disable nginx buffering
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const client: SseClient = {id: nextId++, res};
    clients.add(client);

    // Send a welcome ping so the browser knows the stream is live
    res.write(`event: connected\ndata: ${JSON.stringify({clientId: client.id})}\n\n`);

    // Heartbeat every 25 s to keep proxies/load-balancers from closing the connection
    const heartbeat = setInterval(() => {
        try {
            res.write(': heartbeat\n\n');
        } catch {
            clearInterval(heartbeat);
            clients.delete(client);
        }
    }, 25_000);

    req.on('close', () => {
        clearInterval(heartbeat);
        clients.delete(client);
    });
});

export default router;