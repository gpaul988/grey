/**
 * cPanel / Phusion Passenger production entry point.
 * ============================================================================
 * WHY THIS FILE EXISTS
 * --------------------------------------------------------------------------
 * cPanel's "Setup Node.js App" boots a plain CommonJS `.js` startup file under
 * Phusion Passenger. Our real server lives in TypeScript (`server.ts`).
 *
 * APPROACH: single-process via tsx/cjs register hook.
 * --------------------------------------------------------------------------
 * We register tsx's CJS require hook in THIS process so that all `require()`
 * calls from here onward can transparently load `.ts` files. Then we simply
 * `require('./server.ts')` — the Express/Next app starts in the SAME process
 * that Passenger spawned, so Passenger correctly detects the port bind and
 * marks the app healthy. No child-process, no port-bind race, no proxy.
 *
 * Requirements on the server:
 *   - Node >= 18 (Node 20/22/24 recommended — pick it in cPanel's Node selector)
 *   - `npm ci` (or `npm install`) run so `tsx` and deps are present
 *   - `npm rebuild better-sqlite3` against cPanel's Node version (native addon)
 *   - SSL/HTTPS active so the admin CSRF cookie is sent with the Secure flag
 *     (the app auto-detects HTTPS via X-Forwarded-Proto behind Passenger)
 *   - `config.env` created from `config.env.example` and filled with secrets
 *
 * NOTE: `app.js` delegates to this file; both work as the cPanel startup file.
 * ============================================================================
 */
'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs   = require('node:fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('node:child_process');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const projectRoot     = __dirname;
const nextBuildPath   = path.join(projectRoot, '.next');
const nodeModulesPath = path.join(projectRoot, 'node_modules');

console.log('[server.js] Starting pre-flight checks…');

// ── Pre-flight: warn if secrets file is missing ───────────────────────────────
if (
  !fs.existsSync(path.join(projectRoot, 'config.env')) &&
  !fs.existsSync(path.join(projectRoot, '.env'))
) {
  console.warn(
    '\n[server.js] ⚠️  No config.env (or .env) found — secrets will be EMPTY.\n' +
    '   Payments, SMTP email and secure sessions will not work.\n' +
    '   Fix: cp config.env.example config.env  then fill in the values.\n',
  );
}

// ── Pre-flight: ensure Admin/data directory exists ────────────────────────────
// The self-healing secret store writes .secrets.json here; if the directory
// doesn't exist the first write crashes before the server can start.
const adminDataDir = path.join(projectRoot, 'Admin', 'data');
if (!fs.existsSync(adminDataDir)) {
  try {
    fs.mkdirSync(adminDataDir, { recursive: true });
    console.log('[server.js] ✅ Created Admin/data directory');
  } catch (e) {
    console.warn('[server.js] ⚠️  Could not create Admin/data:', e.message);
  }
}

// ── Pre-flight: install dependencies if missing ───────────────────────────────
if (!fs.existsSync(nodeModulesPath)) {
  console.log('[server.js] node_modules missing — installing dependencies…');
  const hasLock = fs.existsSync(path.join(projectRoot, 'package-lock.json'));
  const cmd = hasLock ? 'npm ci --omit=dev' : 'npm install --omit=dev';
  try {
    execSync(cmd, { cwd: projectRoot, stdio: 'inherit', timeout: 15 * 60 * 1000 });
    console.log('[server.js] ✅ Dependencies installed');
  } catch (err) {
    console.error('[server.js] ❌ Install failed:', err.message);
    if (hasLock) {
      try {
        execSync('npm install --omit=dev', { cwd: projectRoot, stdio: 'inherit', timeout: 15 * 60 * 1000 });
        console.log('[server.js] ✅ Dependencies installed (fallback)');
      } catch (e2) {
        console.error('[server.js] ❌ Fallback install failed:', e2.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
}

// ── Pre-flight: rebuild better-sqlite3 native binary if needed ───────────────
// The prebuilt binary may target a different Node ABI or glibc. We try to
// load it; if it fails we rebuild from source so DB-backed sessions work.
// If rebuild also fails the server still starts — it falls back to MemoryStore.
(function ensureSqliteBinding() {
  const bsqlitePath = path.join(nodeModulesPath, 'better-sqlite3');
  if (!fs.existsSync(bsqlitePath)) return;

  let ok = false;
  let loadErr = null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  try { require(bsqlitePath); ok = true; } catch (e) { loadErr = e; }

  if (ok) {
    console.log('[server.js] ✅ better-sqlite3 binary OK');
    return;
  }

  console.log('[server.js] better-sqlite3 binary failed:', loadErr && loadErr.message);
  console.log('[server.js] Attempting rebuild from source…');

  const strategies = [
    'npm rebuild better-sqlite3 --build-from-source',
    `node-gyp rebuild --directory="${path.join(nodeModulesPath, 'better-sqlite3')}"`,
  ];

  let rebuilt = false;
  for (const cmd of strategies) {
    try {
      execSync(cmd, {
        cwd: projectRoot, stdio: 'inherit', timeout: 12 * 60 * 1000,
        env: { ...process.env, npm_config_build_from_source: 'true' },
      });
       
      delete require.cache[require.resolve(bsqlitePath)];
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(bsqlitePath);
      rebuilt = true;
      console.log('[server.js] ✅ better-sqlite3 rebuilt successfully');
      break;
    } catch (e) {
      console.error('[server.js] Rebuild strategy failed:', e.message && e.message.split('\n')[0]);
    }
  }

  if (!rebuilt) {
    console.warn(
      '[server.js] ⚠️  better-sqlite3 rebuild failed — app will use MemoryStore.\n' +
      '   Sessions reset on restart. To fix, SSH into the server and run:\n' +
      '   cd /home/greyinf1/public_html/grey\n' +
      '   npm rebuild better-sqlite3 --build-from-source\n',
    );
    // Do NOT exit — server continues with MemoryStore fallback.
  }
})();

// ── Pre-flight: build Next.js if missing or stale ────────────────────────────
function needsNextBuild() {
  if (!fs.existsSync(nextBuildPath)) return true;
  const buildIdFile = path.join(nextBuildPath, 'BUILD_ID');
  if (!fs.existsSync(buildIdFile)) return true;

  const buildMtime = fs.statSync(buildIdFile).mtimeMs;
  const sentinels = [
    path.join(projectRoot, 'package.json'),
    path.join(projectRoot, 'next.config.js'),
    path.join(projectRoot, 'next.config.ts'),
    path.join(projectRoot, 'server.ts'),
  ];
  for (const f of sentinels) {
    if (fs.existsSync(f) && fs.statSync(f).mtimeMs > buildMtime) {
      console.log('[server.js] Source newer than build:', path.basename(f), '— rebuilding');
      return true;
    }
  }
  return false;
}

if (needsNextBuild()) {
  const reason = !fs.existsSync(nextBuildPath) ? '.next missing' : 'source files changed';
  console.log(`[server.js] Building Next.js (${reason})…`);

  const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');
  if (!fs.existsSync(nextBin)) {
    console.error('[server.js] ❌ next binary not found. Run: npm install --omit=dev');
    process.exit(1);
  }

  try {
    // 1024MB is not enough for this app's build and OOMs on cPanel. Use a
    // higher ceiling; cPanel Node app containers typically allow this. The
    // value can still be capped by the host, but a higher request avoids the
    // "Reached heap limit Allocation failed" crash seen in build logs.
    execSync(
      `NODE_OPTIONS=--max-old-space-size=4096 "${nextBin}" build --webpack`,
      { cwd: projectRoot, stdio: 'inherit', timeout: 20 * 60 * 1000 },
    );
    console.log('[server.js] ✅ Next.js build succeeded');
  } catch (err) {
    console.error('[server.js] ❌ Build failed:', err.message);
    console.error('Manual fix: cd /home/greyinf1/public_html/grey && npm run build');
    process.exit(1);
  }
}

// ── Boot: register tsx CJS hook then load server.ts in-process ───────────────
// This is the key change: instead of spawning a child process (which means
// Passenger monitors a parent that never binds the port), we register tsx's
// CJS require hook right here and then load server.ts synchronously.
// The Express app's `app.listen()` call happens in THIS process — the same one
// Passenger spawned — so Passenger correctly detects the port bind.
console.log('[server.js] Registering tsx CJS hook…');
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require(path.join(projectRoot, 'node_modules', 'tsx', 'dist', 'cjs', 'index.cjs'));
  console.log('[server.js] ✅ tsx/cjs hook registered');
} catch (err) {
  console.error(
    '[server.js] ❌ Failed to load tsx — TypeScript compilation unavailable.\n' +
    'Ensure npm install has been run: npm ci --omit=dev\n',
    err,
  );
  process.exit(1);
}

console.log('[server.js] Loading server.ts…');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require(path.join(projectRoot, 'server.ts'));
