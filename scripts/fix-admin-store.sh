#!/usr/bin/env bash
set -euo pipefail

# Bash remediation script for admin + store setup.
# Usage: ./scripts/fix-admin-store.sh
# The script will prompt for SEED_* passwords if not provided in env vars.

ROOT_DIR=$(dirname "$0")/..
cd "$ROOT_DIR" || exit 1
echo "Working directory: $(pwd)"

# 1) Node & npm
if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: node not found. Install Node >= 18 and ensure 'node' in PATH." >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: npm not found. Install npm." >&2
  exit 1
fi

echo "Node: $(node -v)  npm: $(npm -v)"

# 2) Install deps
echo "Installing production dependencies..."
npm ci --omit=dev || { echo "npm ci failed, trying npm install..."; npm install --omit=dev; }

echo "Attempting to rebuild better-sqlite3 (best-effort)..."
npm rebuild better-sqlite3 --build-from-source || echo "Rebuild failed or not required."

# 3) Gather seed passwords
: "${SEED_SUPERADMIN_PASSWORD:=}" 
: "${SEED_ADMIN_PASSWORD:=}" 
: "${SEED_MANAGER_PASSWORD:=}" 
: "${SEED_STAFF_PASSWORD:=}" 

if [ -z "${SEED_SUPERADMIN_PASSWORD:-}" ]; then
  read -s -p "SEED_SUPERADMIN_PASSWORD: " SEED_SUPERADMIN_PASSWORD
  echo
fi
if [ -z "${SEED_ADMIN_PASSWORD:-}" ]; then
  read -s -p "SEED_ADMIN_PASSWORD: " SEED_ADMIN_PASSWORD
  echo
fi
if [ -z "${SEED_MANAGER_PASSWORD:-}" ]; then
  read -s -p "SEED_MANAGER_PASSWORD: " SEED_MANAGER_PASSWORD
  echo
fi
if [ -z "${SEED_STAFF_PASSWORD:-}" ]; then
  read -s -p "SEED_STAFF_PASSWORD: " SEED_STAFF_PASSWORD
  echo
fi

export SEED_SUPERADMIN_PASSWORD SEED_ADMIN_PASSWORD SEED_MANAGER_PASSWORD SEED_STAFF_PASSWORD

# 4) Run seed via npx tsx (or local bin)
if [ -x "node_modules/.bin/tsx" ]; then
  echo "Running seed with local tsx..."
  node node_modules/.bin/tsx Admin/db/seed.ts || echo "Seed returned non-zero exit code. Check output."
else
  echo "Running seed with npx tsx..."
  npx tsx Admin/db/seed.ts || echo "Seed returned non-zero exit code. Check output."
fi

# 5) Verify DB file
DB_FILE="Admin/data/grey.db"
if [ -f "$DB_FILE" ]; then
  echo "DB file found: $DB_FILE (size: $(stat -c%s "$DB_FILE") bytes)"
else
  echo "WARNING: DB file not found at $DB_FILE" >&2
fi

# 6) Next build if missing
if [ ! -d ".next" ]; then
  echo ".next missing — running Next build (may take a few minutes)..."
  export NODE_OPTIONS='--max-old-space-size=4096'
  if [ -x "node_modules/.bin/next" ]; then
    node node_modules/.bin/next build --webpack
  else
    npx next build --webpack
  fi
else
  echo ".next present — skipping build."
fi

# 7) Start server (foreground)
echo "Starting server.js in foreground. Ctrl+C stops it."
node server.js

# end
echo "Script finished. Review output for errors."
