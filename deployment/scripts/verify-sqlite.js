#!/usr/bin/env node
/**
 * verify-sqlite.js
 *
 * Ensures the better-sqlite3 native binding actually loads for the CURRENT
 * Node.js runtime (ABI). The #1 cause of "Could not locate the bindings file"
 * is installing node_modules under one Node version, then running under another
 * (e.g. switching with nvm) WITHOUT reinstalling/rebuilding. The prebuilt
 * binary is tied to the Node ABI, so a version switch silently breaks it.
 *
 * Strategy:
 *   1. Try to load better-sqlite3 and open an in-memory DB.
 *   2. If it works -> done.
 *   3. If it fails -> run `npm rebuild better-sqlite3 --build-from-source`
 *      to recompile against the active Node ABI, then verify again.
 *
 * This script is invoked by `postinstall`, so every `npm install` (local or
 * cPanel) leaves you with a working native binding regardless of which Node
 * version produced node_modules.
 */
'use strict';

function tryLoad() {
  // Resolve relative to this package so it works from any cwd.
   
  const Database = require('better-sqlite3');
  const db = new Database(':memory:');
  db.prepare('SELECT 1 AS ok').get();
  db.close();
}

function abiInfo() {
  return `Node ${process.version} (modules ABI ${process.versions.modules}, ${process.platform}-${process.arch})`;
}

try {
  tryLoad();
  console.log(`[verify-sqlite] OK — better-sqlite3 native binding loads on ${abiInfo()}`);
  process.exit(0);
} catch (firstErr) {
  console.warn(
    `[verify-sqlite] better-sqlite3 failed to load on ${abiInfo()}.\n` +
      `[verify-sqlite] Reason: ${firstErr && firstErr.message ? firstErr.message.split('\n')[0] : firstErr}\n` +
      `[verify-sqlite] Rebuilding native binding for the current Node version...`
  );

  const { spawnSync } = require('node:child_process');
  const isWin = process.platform === 'win32';

  // First attempt: fast path — re-fetch the matching prebuilt binary.
  let res = spawnSync('npm', ['rebuild', 'better-sqlite3'], {
    stdio: 'inherit',
    shell: isWin, // npm is a .cmd on Windows
  });

  // Verify after rebuild.
  try {
    // Clear require cache so we load the freshly built binary.
    Object.keys(require.cache).forEach((k) => {
      if (k.includes('better-sqlite3') || k.includes('bindings')) delete require.cache[k];
    });
    tryLoad();
    console.log(`[verify-sqlite] OK — rebuilt and verified on ${abiInfo()}`);
    process.exit(0);
  } catch (secondErr) {
    console.warn(
      `[verify-sqlite] Prebuilt rebuild did not resolve it. Trying build-from-source...\n` +
        `[verify-sqlite] (requires a C/C++ toolchain + Python on this machine)`
    );

    res = spawnSync('npm', ['rebuild', 'better-sqlite3', '--build-from-source'], {
      stdio: 'inherit',
      shell: isWin,
    });

    try {
      Object.keys(require.cache).forEach((k) => {
        if (k.includes('better-sqlite3') || k.includes('bindings')) delete require.cache[k];
      });
      tryLoad();
      console.log(`[verify-sqlite] OK — built from source and verified on ${abiInfo()}`);
      process.exit(0);
    } catch (thirdErr) {
      console.error(
        `\n[verify-sqlite] FAILED to make better-sqlite3 work on ${abiInfo()}.\n` +
          `[verify-sqlite] The app will still START (sessions/admin fall back to in-memory),\n` +
          `[verify-sqlite] but the SQLite database will be unavailable until this is fixed.\n\n` +
          `[verify-sqlite] Fix:\n` +
          `[verify-sqlite]   1. Make sure you are on Node 20.x:  node -v\n` +
          `[verify-sqlite]   2. Clean reinstall:  npm run clean && npm install\n` +
          `[verify-sqlite]   3. If building from source, install C++ build tools\n` +
          `[verify-sqlite]      (Windows: Visual Studio Build Tools w/ 'Desktop development with C++').\n\n` +
          `[verify-sqlite] Last error: ${thirdErr && thirdErr.message ? thirdErr.message.split('\n')[0] : thirdErr}\n`
      );
      // Do NOT fail the install — let the app boot with graceful fallback.
      process.exit(0);
    }
  }
}
