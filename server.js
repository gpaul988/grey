/**
 * cPanel / Phusion Passenger production entry point.
 * ============================================================================
 * WHY THIS FILE EXISTS
 * --------------------------------------------------------------------------
 * cPanel's "Setup Node.js App" boots a plain CommonJS `.js` startup file under
 * Phusion Passenger. Our real server lives in TypeScript (`server.ts`) and uses
 * extensionless / path-aliased imports that only the `tsx` runtime resolves
 * correctly — native Node cannot run it, and registering tsx *in-process*
 * collides with Next.js's own require-hook (breaks directory imports).
 *
 * The robust, verified approach is therefore to spawn the real `tsx` CLI as a
 * child process. tsx then owns module resolution end-to-end exactly like it
 * does in development (`tsx server.ts`), so the full Express + Next + Admin
 * stack boots identically in production.
 *
 * Passenger provides `process.env.PORT` — it is inherited by the child, and
 * `server.ts` reads it via `Number(process.env.PORT || 3000)`. Termination
 * signals and exit codes are forwarded both ways so Passenger can health-check
 * and restart cleanly.
 *
 * Requirements on the server:
 *   - Node >= 18 (Node 20/22/24 recommended; pick it in cPanel's Node selector).
 *   - `npm ci` (or `npm install`) run so `tsx` and deps are present.
 *   - `npm rebuild better-sqlite3` against cPanel's Node version (native addon).
 *   - SSL/HTTPS active so the `__Host-` admin CSRF cookie is accepted.
 *
 * NOTE: `app.js` is kept as an identical alias of this file for cPanel setups
 * that default their startup file to `app.js`.
 * ============================================================================
 */
'use strict';

const path = require('node:path');
const { spawn } = require('node:child_process');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Resolve the locally-installed tsx CLI (no global install required).
let tsxBin;
try {
  tsxBin = require.resolve('tsx/cli');
} catch (err) {
  console.error(
    '[server.js] Could not locate the "tsx" CLI. Run `npm ci` (or ' +
      '`npm install`) on the server so dependencies are installed.\n',
    err,
  );
  process.exit(1);
}

const entry = path.join(__dirname, 'server.ts');

const child = spawn(process.execPath, [tsxBin, entry], {
  cwd: __dirname,
  env: process.env,
  stdio: 'inherit',
});

child.on('error', (err) => {
  console.error('[server.js] Failed to spawn the server process.\n', err);
  process.exit(1);
});

// Mirror the child's exit so Passenger sees the real status and can restart.
child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code == null ? 1 : code);
  }
});

// Forward termination signals to the child for a clean shutdown.
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(sig, () => {
    if (!child.killed) child.kill(sig);
  });
}
