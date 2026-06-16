#!/bin/bash
# cPanel production install — handles native module failures gracefully
# ============================================================================
# This script installs dependencies on cPanel with aggressive memory limits
# and falls back gracefully if native modules fail to build.

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[cpanel-install] Starting production install..."

# Step 1: Install with memory limit + single socket
echo "[cpanel-install] Installing dependencies (mem-limited, single socket)..."
NODE_OPTIONS="--max-old-space-size=256" \
  npm install \
    --omit=dev \
    --no-fund \
    --no-audit \
    --prefer-offline \
    --no-package-lock \
    --maxsockets=1 \
    2>&1 | tee /tmp/npm-install.log

if [ $? -ne 0 ]; then
  echo "[cpanel-install] ⚠️  npm install exited with error code $?"
  echo "[cpanel-install] Checking last 50 lines of output..."
  tail -50 /tmp/npm-install.log
  exit 1
fi

echo "[cpanel-install] ✅ Dependencies installed"

# Step 2: Try to rebuild better-sqlite3 (fails gracefully)
echo "[cpanel-install] Rebuilding better-sqlite3 native module..."
if npm rebuild better-sqlite3 --build-from-source 2>&1 | tee /tmp/sqlite-rebuild.log; then
  echo "[cpanel-install] ✅ better-sqlite3 rebuilt"
else
  echo "[cpanel-install] ⚠️  better-sqlite3 rebuild failed (will use MemoryStore fallback)"
  echo "[cpanel-install] Check Admin/db/index.ts for fallback logic"
fi

# Step 3: Build Next.js with memory cap
echo "[cpanel-install] Building Next.js..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

if [ $? -eq 0 ]; then
  echo "[cpanel-install] ✅ Build completed successfully"
  echo "[cpanel-install] Next steps:"
  echo "  1. Fill in config.env with SMTP and payment secrets"
  echo "  2. Click 'Restart' in cPanel Node.js App dashboard"
  echo "  3. server.js will auto-start the app"
else
  echo "[cpanel-install] ❌ Build failed"
  exit 1
fi
