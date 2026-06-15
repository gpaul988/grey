/**
 * cPanel / Phusion Passenger entry point.
 * --------------------------------------------------------------------------
 * cPanel ("Setup Node.js App") boots a plain .js startup file under Passenger.
 * Our real server is TypeScript (server.ts) with extensionless imports, which
 * only the `tsx` runtime resolves correctly. So this CommonJS bootstrap simply
 * spawns `tsx server.ts` as a child process and pipes its output through.
 *
 * Passenger sets process.env.PORT — it is inherited by the child, and
 * server.ts already reads it via `Number(process.env.PORT || 3000)`.
 *
 * If the child exits, this process exits with the same code so Passenger can
 * restart it.
 */
'use strict';

const path = require('node:path');
const { spawn } = require('node:child_process');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Resolve the locally-installed tsx CLI (no global install required).
const tsxBin = require.resolve('tsx/cli');

const child = spawn(process.execPath, [tsxBin, path.join(__dirname, 'server.ts')], {
  cwd: __dirname,
  env: process.env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code == null ? 1 : code);
  }
});

// Forward termination signals to the child for a clean shutdown.
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    if (!child.killed) child.kill(sig);
  });
}
