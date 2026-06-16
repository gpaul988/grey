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
const fs = require('node:fs');
const { spawn, execSync } = require('node:child_process');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const projectRoot = __dirname;
const nextBuildPath = path.join(projectRoot, '.next');
const nodeModulesPath = path.join(projectRoot, 'node_modules');

console.log('[server.js] Starting pre-flight checks...');

// ── Pre-flight: Install dependencies if missing ──────────────────────────────
if (!fs.existsSync(nodeModulesPath)) {
  console.log('[server.js] node_modules missing, installing dependencies...');
  const lockfileExists = fs.existsSync(path.join(projectRoot, 'package-lock.json'));
  const installCmd = lockfileExists ? 'npm ci --omit=dev' : 'npm install --omit=dev';
  console.log(`[server.js] Using: ${installCmd}`);
  try {
    execSync(installCmd, {
      cwd: projectRoot,
      stdio: 'inherit',
      timeout: 15 * 60 * 1000, // 15 min
    });
    console.log('[server.js] ✅ Dependencies installed');
  } catch (err) {
    console.error(`[server.js] ❌ ${installCmd} failed:`, err.message);
    // Last resort: plain npm install
    if (lockfileExists) {
      console.log('[server.js] Retrying with npm install --omit=dev ...');
      try {
        execSync('npm install --omit=dev', { cwd: projectRoot, stdio: 'inherit', timeout: 15 * 60 * 1000 });
        console.log('[server.js] ✅ Dependencies installed (fallback)');
      } catch (err2) {
        console.error('[server.js] ❌ Fallback install failed:', err2.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
}

// ── Pre-flight: Build Next.js if missing ──────────────────────────────────
if (!fs.existsSync(nextBuildPath)) {
  console.log('[server.js] .next missing, building Next.js...');
  // Use npx to ensure next CLI is found even if PATH doesn't include node_modules/.bin
  const buildCmd = fs.existsSync(path.join(projectRoot, 'node_modules', '.bin', 'next'))
    ? path.join(projectRoot, 'node_modules', '.bin', 'next') + ' build'
    : 'npx next build';
  try {
    execSync(buildCmd, {
      cwd: projectRoot,
      stdio: 'inherit',
      timeout: 10 * 60 * 1000, // 10 min
    });
    console.log('[server.js] ✅ Next.js build succeeded');
  } catch (err) {
    console.error('[server.js] ❌ Build failed:', err.message);
    console.error('Try manually: cd /home/greyinf1/public_html/grey && npm run build');
    process.exit(1);
  }
}

// Resolve the locally-installed tsx CLI (no global install required).
let tsxBin;
try {
  tsxBin = require.resolve('tsx/cli');
} catch (err) {
  console.error(
    '[server.js] STARTUP ERROR: npm dependencies not fully installed.\n' +
    'On cPanel, after pushing new code:\n' +
    '  1. SSH: cd /home/greyinf1/public_html/grey && npm ci --omit=dev\n' +
    '  2. npm rebuild better-sqlite3 (required for cPanel Node version)\n' +
    '  3. Passenger will auto-restart the app\n\n' +
    'Details:\n',
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
