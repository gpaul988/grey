#!/bin/bash
# After npm install completes, run this manually to rebuild native modules
# This is a MANUAL step (not automatic) so it can be skipped if it fails

set -e

echo "=========================================="
echo "cPanel Post-Install Native Module Rebuild"
echo "=========================================="

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Only try sqlite rebuild if the binary doesn't work
echo ""
echo "[post-install] Testing better-sqlite3 binary..."
if node -e "require('better-sqlite3')" 2>/dev/null; then
  echo "[post-install] ✅ better-sqlite3 already works (prebuilt binary OK)"
else
  echo "[post-install] ⚠️  better-sqlite3 prebuilt binary missing"
  echo "[post-install] Attempting rebuild from source..."
  
  if npm rebuild better-sqlite3 --build-from-source 2>&1 | tail -5; then
    echo "[post-install] ✅ Rebuild succeeded"
  else
    echo "[post-install] ⚠️  Rebuild failed (app will use MemoryStore for sessions)"
    echo "[post-install] This is OK — sessions reset on restart, but the app works."
  fi
fi

# Test sharp
echo ""
echo "[post-install] Testing sharp binary..."
if node -e "require('sharp')" 2>/dev/null; then
  echo "[post-install] ✅ sharp is working"
else
  echo "[post-install] ⚠️  sharp needs rebuild"
  npm rebuild sharp 2>&1 | tail -3 || echo "[post-install] sharp rebuild optional"
fi

echo ""
echo "=========================================="
echo "[post-install] ✅ Manual post-install complete"
echo "=========================================="
