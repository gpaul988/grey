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

// ── Pre-flight: warn loudly if config.env is missing ─────────────────────────
// The app loads secrets (SESSION_SECRET, payment keys, SMTP) from config.env.
// If it's absent, dotenv loads 0 vars and payments/email/secure sessions break
// silently. config.env holds live secrets so it is NOT in git — it must be
// created on the server from config.env.example.
if (!fs.existsSync(path.join(projectRoot, 'config.env')) &&
    !fs.existsSync(path.join(projectRoot, '.env'))) {
  console.warn(
    '\n[server.js] ⚠️  No config.env (or .env) found — secrets will be EMPTY.\n' +
    '   Payments, SMTP email and secure sessions will not work.\n' +
    '   Fix: cp config.env.example config.env  then fill in the values.\n',
  );
}

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

// ── Pre-flight: ensure better-sqlite3 native binary matches this Node ─────────
// better-sqlite3 is a native C++ addon: its compiled binary MUST match the
// exact Node ABI and glibc version it runs under. On cPanel / CentOS 7 the
// prebuilt binary (compiled on Ubuntu 22.04, requires GLIBC_2.38) will fail to
// load. The ONLY fix is to rebuild from source using the server's own compiler.
//
// REQUIREMENTS on cPanel server (run once via SSH if this keeps failing):
//   yum install -y python3 make gcc gcc-c++   (CentOS 7)
//   OR: contact host to install build tools
//   THEN: cd /home/greyinf1/public_html/grey && npm rebuild better-sqlite3 --build-from-source
(function ensureSqliteBinding() {
  const bsqlite = path.join(nodeModulesPath, 'better-sqlite3');
  if (!fs.existsSync(bsqlite)) return; // not installed yet; install step handles it

  let ok = false;
  let loadErr = null;
  try {
    // Cheapest reliable check: actually require it. If glibc is wrong or the
    // file is missing, this throws — exactly the failure we want to pre-empt.
    require(bsqlite);
    ok = true;
  } catch (e) {
    ok = false;
    loadErr = e;
  }
  if (ok) {
    console.log('[server.js] ✅ better-sqlite3 binary OK');
    return;
  }

  console.log('[server.js] better-sqlite3 binary failed to load:');
  console.log('  Error:', loadErr && loadErr.message);
  console.log('[server.js] Attempting rebuild from source (this may take a few minutes)...');
  console.log('[server.js] NOTE: Requires python3 + make + gcc on the server.');
  console.log('[server.js] If this fails, run on server via SSH:');
  console.log('  cd /home/greyinf1/public_html/grey && npm rebuild better-sqlite3 --build-from-source');

  // Try multiple strategies in order.
  const rebuildStrategies = [
    // Strategy 1: standard rebuild from source
    'npm rebuild better-sqlite3 --build-from-source',
    // Strategy 2: explicit node-pre-gyp with --build-from-source
    `"${path.join(projectRoot, 'node_modules', '.bin', 'node-pre-gyp')}" rebuild --directory="${path.join(nodeModulesPath, 'better-sqlite3')}"`,
    // Strategy 3: node-gyp directly
    `node-gyp rebuild --directory="${path.join(nodeModulesPath, 'better-sqlite3')}"`,
  ];

  let rebuilt = false;
  for (const cmd of rebuildStrategies) {
    try {
      console.log(`[server.js] Trying: ${cmd}`);
      execSync(cmd, {
        cwd: projectRoot,
        stdio: 'inherit',
        timeout: 12 * 60 * 1000,
        env: { ...process.env, npm_config_build_from_source: 'true' },
      });
      // Verify it actually works now
      delete require.cache[require.resolve(bsqlite)];
      require(bsqlite);
      rebuilt = true;
      console.log('[server.js] ✅ better-sqlite3 rebuilt successfully');
      break;
    } catch (rebuildErr) {
      console.error(`[server.js] Strategy failed: ${rebuildErr.message && rebuildErr.message.split('\n')[0]}`);
    }
  }

  if (!rebuilt) {
    console.error('[server.js] ❌ All rebuild strategies failed.');
    console.error('[server.js] The app will use MemoryStore (sessions reset on restart).');
    console.error('[server.js] To fix permanently, SSH into the server and run:');
    console.error('  cd /home/greyinf1/public_html/grey');
    console.error('  npm rebuild better-sqlite3 --build-from-source');
    console.error('  # If that fails, ensure build tools are installed:');
    console.error('  # sudo yum install -y python3 make gcc gcc-c++ (CentOS/RHEL)');
    // Do NOT exit — server falls back to MemoryStore and still serves all pages.
  }
})();

// ── Pre-flight: Build Next.js if missing or stale ─────────────────────────
// Checks two conditions:
//   1. .next directory doesn't exist → always build
//   2. .next/BUILD_ID exists but app code is NEWER than it → stale build,
//      rebuild to avoid serving old JS against new server code (causes 500s).
function needsNextBuild() {
  if (!fs.existsSync(nextBuildPath)) return true;
  const buildIdFile = path.join(nextBuildPath, 'BUILD_ID');
  if (!fs.existsSync(buildIdFile)) return true;

  // Check if any key source files are newer than the last build.
  const buildMtime = fs.statSync(buildIdFile).mtimeMs;
  const checkFiles = [
    path.join(projectRoot, 'package.json'),
    path.join(projectRoot, 'next.config.js'),
    path.join(projectRoot, 'next.config.ts'),
    path.join(projectRoot, 'server.ts'),
  ];
  for (const f of checkFiles) {
    if (fs.existsSync(f) && fs.statSync(f).mtimeMs > buildMtime) {
      console.log(`[server.js] Source file newer than build: ${path.basename(f)} — triggering rebuild`);
      return true;
    }
  }
  return false;
}

if (needsNextBuild()) {
  const reason = !fs.existsSync(nextBuildPath) ? '.next missing' : 'source files changed';
  console.log(`[server.js] Building Next.js (${reason})...`);
  // Always use the local next binary directly (not npx, not global).
  // Force Webpack via --webpack: cPanel's nodevenv symlinks node_modules
  // outside the Turbopack filesystem root, causing a panic. Cap the V8 heap
  // so the build doesn't get SIGKILL'd on low-RAM shared hosting.
  const nextBin = path.join(projectRoot, 'node_modules', '.bin', 'next');
  if (!fs.existsSync(nextBin)) {
    console.error('[server.js] ❌ next binary not found at', nextBin);
    console.error('Run: npm install --omit=dev  in the project directory first.');
    process.exit(1);
  }
  const buildCmd = `NODE_OPTIONS=--max-old-space-size=1024 "${nextBin}" build --webpack`;
  try {
    execSync(buildCmd, {
      cwd: projectRoot,
      stdio: 'inherit',
      timeout: 15 * 60 * 1000, // 15 min (longer for slow shared hosting)
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
