#!/usr/bin/env bash
#
# build-and-deploy.sh — Build LOCALLY, deploy the prebuilt app to cPanel.
#
# WHY: This app bundles heavy libraries (three.js / @react-three, framer-motion,
# recharts, Sentry). A production `next build` peaks at ~3GB RSS — most of it
# webpack's off-heap parsing of three.js — so it CANNOT build on a 1GB shared
# hosting box (the OS SIGKILLs it). The correct, standard workflow for heavy
# Next.js apps on shared hosting is:
#
#   build on a machine with RAM  ->  upload the prebuilt .next  ->  just run it
#
# This script does step 1 + 2 (produces a clean deploy bundle). On cPanel you
# then only ever run `npm ci --omit=dev` and `npm start` — never `npm run build`.
#
# Usage:
#   bash scripts/build-and-deploy.sh           # build + create grey-deploy.zip
#   bash scripts/build-and-deploy.sh --no-zip  # build only, skip zipping
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> 1/4  Installing dependencies (incl. devDependencies for the build)"
npm ci

echo "==> 2/4  Type-checking (tsc --noEmit)"
npx tsc --noEmit

echo "==> 3/4  Production build (webpack, heap up to 4GB)"
# config.cache=false in next.config.js keeps .next/cache out of the bundle.
cross-env NODE_OPTIONS=--max-old-space-size=4096 next build --webpack \
  || NODE_OPTIONS=--max-old-space-size=4096 npx next build --webpack

if [ ! -f .next/BUILD_ID ]; then
  echo "ERROR: build did not produce .next/BUILD_ID — aborting." >&2
  exit 1
fi
echo "    Build OK — BUILD_ID=$(cat .next/BUILD_ID)"

if [ "${1:-}" = "--no-zip" ]; then
  echo "==> 4/4  Skipping zip (--no-zip). Upload these to cPanel:"
  echo "         .next/  app/  pages/  components/  screens/  lib/  Admin/"
  echo "         public/  server.ts  package.json  package-lock.json"
  echo "         next.config.js  tsconfig.json  config.env (NOT .env*)"
  exit 0
fi

echo "==> 4/4  Creating deploy bundle: grey-deploy.zip"
rm -f grey-deploy.zip
# Ship the PREBUILT .next plus all runtime source the custom server needs.
# Exclude: node_modules (run npm ci on cPanel), caches, local env, git, tests.
zip -r grey-deploy.zip \
  .next \
  app pages components screens lib Admin public scripts \
  server.ts package.json package-lock.json next.config.js tsconfig.json \
  instrumentation.ts instrumentation.edge.ts config.env \
  -x "*/node_modules/*" \
  -x ".next/cache/*" \
  -x "*.test.ts" -x "*.test.tsx" -x "*/__tests__/*" \
  -x "*.map" \
  >/dev/null

SIZE=$(du -h grey-deploy.zip | cut -f1)
echo ""
echo "================================================================"
echo " Deploy bundle ready: grey-deploy.zip  ($SIZE)"
echo "================================================================"
echo " On cPanel:"
echo "   1. Upload + extract grey-deploy.zip into your app folder."
echo "   2. In 'Setup Node.js App': set Application startup file = server.ts"
echo "   3. Run NPM install (uses package-lock):   npm ci --omit=dev"
echo "   4. Rebuild the native SQLite module:      npm run rebuild:sqlite"
echo "   5. Seed the DB once (first deploy only):  npm run seed"
echo "   6. Set env vars in the cPanel UI (NODE_ENV=production, SESSION_SECRET,"
echo "      DATABASE paths, payment/email keys — see .env.example)."
echo "   7. Restart the app. DO NOT run 'npm run build' on cPanel."
echo "================================================================"
