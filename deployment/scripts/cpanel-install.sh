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

# Step 3: Next.js build
# ----------------------------------------------------------------------------
# A 1GB shared-hosting box CANNOT build this app. The production build peaks at
# ~3GB RSS (three.js/@react-three, framer-motion, recharts, Sentry) — most of it
# off-heap in webpack, so NO --max-old-space-size value avoids the SIGKILL.
#
# Supported workflow: build locally/CI and upload the prebuilt `.next/` folder
# (see DEPLOY_CPANEL_PREBUILT.md). This script honors that: if `.next` already
# exists (uploaded), we skip building. Only if it's missing AND you explicitly
# pass --build do we attempt an on-box build (expected to fail on 1GB boxes).
if [ -d ".next" ] && [ -f ".next/BUILD_ID" ]; then
  echo "[cpanel-install] ✅ Prebuilt .next/ detected — skipping build (correct workflow)."
elif [ "$1" = "--build" ]; then
  echo "[cpanel-install] ⚠️  --build requested. Attempting on-box build (will OOM on 1GB boxes)..."
  NODE_OPTIONS="--max-old-space-size=4096" npm run build || {
    echo "[cpanel-install] ❌ Build failed (almost certainly OOM/SIGKILL on shared hosting)."
    echo "[cpanel-install]    Build locally/CI and upload .next/ — see DEPLOY_CPANEL_PREBUILT.md"
    exit 1
  }
  echo "[cpanel-install] ✅ Build completed."
else
  echo "[cpanel-install] ⚠️  No prebuilt .next/ found and on-box build is disabled."
  echo "[cpanel-install]    Upload the locally-built .next/ folder before restarting."
  echo "[cpanel-install]    See DEPLOY_CPANEL_PREBUILT.md. (Force on-box build with: $0 --build)"
fi

echo "[cpanel-install] Next steps:"
echo "  1. Fill in config.env with SMTP and payment secrets"
echo "  2. Ensure .next/ is present (uploaded prebuilt or built here)"
echo "  3. Click 'Restart' in cPanel Node.js App dashboard"
echo "  4. server.js will auto-start the app"
