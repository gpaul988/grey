#!/usr/bin/env node
/**
 * Post-install hook: rebuild native modules gracefully on cPanel.
 * ========================================================================
 * When cPanel's npm install button runs, it has no memory/socket limits.
 * This script runs after npm install and tries to rebuild better-sqlite3.
 * If rebuild fails, the app still starts — it just uses MemoryStore for
 * sessions instead of SQLite (see Admin/db/index.ts fallback logic).
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production' || process.env.SKIP_BUILD === 'true';
const isDev = process.env.NODE_ENV === 'development';

// Skip postinstall in dev/CI
if (isDev || process.env.CI) {
  console.log('[postinstall] Skipping (dev/CI detected)');
  process.exit(0);
}

console.log('[postinstall] Starting post-install setup...');

// Ensure Admin/data directory exists (needed for .secrets.json)
const adminDataDir = path.join(__dirname, '..', 'Admin', 'data');
if (!fs.existsSync(adminDataDir)) {
  try {
    fs.mkdirSync(adminDataDir, { recursive: true });
    console.log('[postinstall] ✅ Created Admin/data directory');
  } catch (e) {
    console.warn('[postinstall] ⚠️  Could not create Admin/data:', e.message);
  }
}

// Try to rebuild better-sqlite3, but don't fail if it doesn't work
console.log('[postinstall] Attempting to rebuild better-sqlite3...');
try {
  execSync('npm rebuild better-sqlite3 --build-from-source', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    timeout: 5 * 60 * 1000, // 5 minute timeout
  });
  console.log('[postinstall] ✅ better-sqlite3 rebuilt successfully');
} catch (err) {
  console.warn(
    '[postinstall] ⚠️  better-sqlite3 rebuild failed. ' +
    'The app will use MemoryStore for sessions instead (sessions reset on restart). ' +
    'To fix: SSH into cPanel and run: npm rebuild better-sqlite3 --build-from-source'
  );
  // Do NOT exit with error — the app can still start without SQLite
}

console.log('[postinstall] ✅ Post-install complete');
