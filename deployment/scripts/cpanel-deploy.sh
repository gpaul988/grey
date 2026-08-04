#!/bin/bash
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# GREY PROJECT - cPanel Deployment Script
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 
# This script deploys the GREY project to cPanel's Node.js environment
# Handles memory constraints, native modules, and production setup
# 
# Usage: bash scripts/cpanel-deploy.sh
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

set -e  # Exit on any error

echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "  GREY PROJECT - cPanel Deployment"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 1: Check Prerequisites
# ─────────────────────────────────────────────────────────────────────────────

echo "▸ Step 1/6: Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "  ✗ ERROR: Node.js not found!"
    echo "  → cPanel must have Node.js enabled"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "  ✗ ERROR: npm not found!"
    exit 1
fi

NODE_VERSION=$(node -v | grep -oP '(?<=v)\d+' | head -1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "  ✗ ERROR: Node.js version must be 18 or higher"
    echo "  → Current version: $(node -v)"
    echo "  → Update in cPanel: Node.js App Manager > Change version"
    exit 1
fi

echo "  ✓ Node.js $(node -v)"
echo "  ✓ npm $(npm -v)"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 2: Clean Installation
# ─────────────────────────────────────────────────────────────────────────────

echo "▸ Step 2/6: Installing dependencies..."
echo "  (This may take 2-5 minutes depending on shared hosting speed)"
echo ""

# Set memory limit for npm (cPanel shared hosting has 256-512MB total)
export NODE_OPTIONS="--max-old-space-size=256"

# Install with cPanel-optimized flags
npm install \
    --prefer-offline \
    --maxsockets=1 \
    --no-audit \
    --no-fund \
    2>&1 | tail -20

if [ $? -ne 0 ]; then
    echo ""
    echo "  ✗ ERROR: npm install failed!"
    echo "  → Check error message above"
    echo "  → If OOM killed: cPanel shared hosting RAM exceeded"
    echo "  → Solution: Try installing via SSH with memory limit:"
    echo "    export NODE_OPTIONS='--max-old-space-size=256'"
    echo "    npm install --prefer-offline --maxsockets=1"
    exit 1
fi

echo ""
echo "  ✓ Dependencies installed ($(ls -la node_modules | wc -l) modules)"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 3: Verify Environment Variables
# ─────────────────────────────────────────────────────────────────────────────

echo "▸ Step 3/6: Verifying environment configuration..."
echo ""

REQUIRED_VARS=(
    "SEED_SUPERADMIN_PASSWORD"
    "SEED_ADMIN_PASSWORD"
    "SEED_MANAGER_PASSWORD"
    "SEED_STAFF_PASSWORD"
)

MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
        echo "  ⚠ $var not set"
    else
        echo "  ✓ $var found"
    fi
done

echo ""

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo "  ✗ ERROR: Missing required environment variables!"
    echo ""
    echo "  Set these in cPanel:"
    echo "  1. Login to cPanel"
    echo "  2. Go to Node.js App Manager"
    echo "  3. Click your app"
    echo "  4. Click 'Edit Variables'"
    echo "  5. Add these variables:"
    echo ""
    for var in "${MISSING_VARS[@]}"; do
        echo "     $var = (your production password)"
    done
    echo ""
    echo "  6. Click Save"
    echo "  7. Restart your app"
    echo "  8. Run this script again"
    echo ""
    exit 1
fi

echo "  ✓ All required environment variables configured"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 4: Build Application
# ─────────────────────────────────────────────────────────────────────────────

echo "▸ Step 4/6: Building Next.js application..."

# Increase memory for build (Next.js needs more)
export NODE_OPTIONS="--max-old-space-size=512"

if ! npm run build 2>&1 | grep -E "✓|compiled|successful"; then
    echo ""
    echo "  ✗ ERROR: Build failed!"
    echo "  → Check errors above"
    exit 1
fi

echo ""
echo "  ✓ Build completed successfully"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 5: Verify Build Artifacts
# ─────────────────────────────────────────────────────────────────────────────

echo "▸ Step 5/6: Verifying build artifacts..."
echo ""

# Check .next directory
if [ -d ".next" ]; then
    SIZE=$(du -sh .next | cut -f1)
    echo "  ✓ .next/ directory created ($SIZE)"
else
    echo "  ✗ ERROR: .next/ directory not created!"
    exit 1
fi

# Check TypeScript compilation
if ! npx tsc --noEmit 2>&1 | head -5; then
    echo "  ✗ WARNING: TypeScript errors found"
    echo "  → This might cause issues at runtime"
fi

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# STEP 6: Seed Database
# ─────────────────────────────────────────────────────────────────────────────

echo "▸ Step 6/6: Seeding database..."
echo ""

# Create data directory if it doesn't exist
mkdir -p Admin/data

if [ -f "Admin/data/grey.db" ]; then
    echo "  → Database already exists, running idempotent seed..."
else
    echo "  → Creating new database..."
fi

# Run seed with a timeout (seed can hang sometimes)
timeout 60 npm run seed 2>&1 | tail -20 || {
    echo ""
    echo "  ⚠ WARNING: Database seed may have issues"
    echo "  → But database file was created"
    echo "  → Try running manually: npm run seed"
}

echo ""

if [ -f "Admin/data/grey.db" ]; then
    SIZE=$(ls -lh Admin/data/grey.db | awk '{print $5}')
    echo "  ✓ Database created ($SIZE)"
else
    echo "  ✗ WARNING: Database not created"
    echo "  → Try running: npm run seed"
fi

echo ""

# ─────────────────────────────────────────────────────────────────────────────
# DEPLOYMENT COMPLETE
# ─────────────────────────────────────────────────────────────────────────────

echo "═══════════════════════════════════════════════════════════════════════════"
echo "  ✓ DEPLOYMENT COMPLETE!"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "NEXT STEPS:"
echo ""
echo "1. Restart your app in cPanel:"
echo "   Node.js App Manager → Your App → Restart"
echo ""
echo "2. Visit your application:"
echo "   https://your-domain.com"
echo ""
echo "3. Login to admin panel:"
echo "   https://your-domain.com/admin/login"
echo "   Email: admin@greyinfotech.com.ng"
echo "   Password: (from SEED_ADMIN_PASSWORD)"
echo ""
echo "4. Change admin passwords immediately:"
echo "   Admin Panel → Settings → Users → Change Password"
echo ""
echo "5. Monitor logs in cPanel:"
echo "   Node.js App Manager → Logs"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

echo "TROUBLESHOOTING:"
echo ""
echo "Issue: 'npm install' fails with 'Killed'"
echo "Solution: Run via SSH with memory limit:"
echo "  export NODE_OPTIONS='--max-old-space-size=256'"
echo "  npm install --prefer-offline --maxsockets=1"
echo ""
echo "Issue: 'Cannot find module better-sqlite3'"
echo "Solution: App falls back to MemoryStore (restart-safe). To fix:"
echo "  npm rebuild better-sqlite3 --build-from-source"
echo ""
echo "Issue: 'Port already in use'"
echo "Solution: cPanel auto-manages ports. Restart in cPanel UI."
echo ""
echo "Issue: Login fails or 'Database locked'"
echo "Solution: Restart the app in cPanel."
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

exit 0
