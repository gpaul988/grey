/**
 * Environment bootstrap — MUST be imported before any other Admin module.
 *
 * Why this file exists:
 * ES module `import` statements are hoisted and executed top-to-bottom *before*
 * any statement in the importing module body. That means a call like
 * `dotenv.config()` placed in server.ts runs AFTER every `import './Admin/...'`
 * has already executed. Any module that reads `process.env.*` at import time
 * (or whose factory captures env) would see an empty value and fall back to a
 * development secret — triggering the
 *   "[security] CSRF_SECRET not set — using a development-only fallback"
 * warning even though config.env defines it.
 *
 * Importing THIS file first (it has no Admin dependencies) loads the env vars
 * before anything else, so all downstream modules see the real secrets.
 */
import dotenv from 'dotenv';
import path from 'node:path';

// Load config.env from the project root regardless of cwd.
dotenv.config({path: path.join(process.cwd(), 'config.env')});

// Also support a conventional .env if present (does not override config.env).
dotenv.config();

export const ENV_LOADED = true;
