/**
 * Passenger / cPanel entry point.
 *
 * cPanel's "Setup Node.js App" (Phusion Passenger) requires a plain .js startup
 * file and runs it with the account's Node binary. Our real server is written in
 * TypeScript (server.ts) and normally run via `tsx`. This shim registers the tsx
 * ESM/CJS loader at runtime, then loads server.ts so no pre-compile step is needed.
 *
 * Passenger injects the PORT env var and expects the app to listen on it — which
 * server.ts already does (process.env.PORT || 3000). Do not hard-code a port.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load env from config.env if present (same file server.ts reads in dev).
try {
  require('dotenv').config({ path: './config.env' });
} catch (_) {
  /* dotenv optional at this layer; server.ts also loads it */
}

// Register tsx so we can require/import TypeScript directly.
require('tsx/cjs');

// Boot the real server.
require('./server.ts');
