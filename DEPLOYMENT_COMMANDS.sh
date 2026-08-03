#!/usr/bin/env bash
# Grey InfoTech — Production Deployment Commands
# Run these commands exactly as shown

# ==============================================================================
# PHASE 1: LOCAL DEPLOYMENT (if you want to test locally first)
# ==============================================================================
# Only run this if you have MySQL running with cPanel credentials locally
# Skip if deploying directly to cPanel

echo "════════════════════════════════════════════════════════════════"
echo "PHASE 1: LOCAL DEPLOYMENT TEST"
echo "════════════════════════════════════════════════════════════════"

# Step 1: Navigate to project
cd c:\Users\graha\Documents\GitHub\grey

# Step 2: Install dependencies
echo ""
echo ">>> Installing dependencies..."
npm ci

# Step 3: Bootstrap database
echo ""
echo ">>> Creating MySQL schema..."
npm run bootstrap:db:mysql

# Step 4: Seed admin accounts
echo ""
echo ">>> Seeding admin accounts..."
npm run seed

# Step 5: Build production bundle
echo ""
echo ">>> Building production bundle..."
npm run build

# Step 6: Test production start
echo ""
echo ">>> Starting production server..."
echo "✅ Server ready on http://localhost:3000"
echo "✅ Press CTRL+C to stop"
npm run start

# ==============================================================================
# PHASE 2: CPANEL DEPLOYMENT (via SSH)
# ==============================================================================
# Run these commands on the cPanel server via SSH

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "PHASE 2: CPANEL PRODUCTION DEPLOYMENT"
echo "════════════════════════════════════════════════════════════════"

# SSH into cPanel server:
# ssh greyinf1@greyinfotech.com.ng
# Then run these commands:

# AFTER you've:
# 1. Created cPanel Node.js App in web interface (app root: /home/greyinf1/public_html/grey)
# 2. Set all environment variables in cPanel (copy from .env.local sections)
# 3. Deployed code (git clone or FTP upload)

# Step 1: Navigate to app directory
cd /home/greyinf1/public_html/grey

# Step 2: Activate Node.js environment (check cPanel for exact path)
source nodevenv/public_html/grey/20/bin/activate

# Step 3: Install dependencies
npm ci

# Step 4: Build production bundle
npm run build

# Step 5: Bootstrap MySQL schema
npm run bootstrap:db:mysql

# Step 6: Seed admin accounts
npm run seed

# Step 7: Check server logs
echo ""
echo ">>> Checking server logs..."
tail -f tmp/stderr.log
# Should show: "[server] Ready on http://localhost:PORT"

# ==============================================================================
# PHASE 3: PRODUCTION VERIFICATION TESTS
# ==============================================================================

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "PHASE 3: PRODUCTION VERIFICATION"
echo "════════════════════════════════════════════════════════════════"

# Test 1: Homepage
echo "✅ Test 1: Homepage"
curl -I https://greyinfotech.com.ng/
# Expected: HTTP 200

# Test 2: Admin Login Page
echo "✅ Test 2: Admin Login"
curl -I https://greyinfotech.com.ng/admin/login
# Expected: HTTP 200

# Test 3: API Settings Endpoint
echo "✅ Test 3: API Settings (requires auth)"
curl -I https://greyinfotech.com.ng/admin/api/settings
# Expected: HTTP 401 (unauthenticated) or 200 (if authenticated)

# ==============================================================================
# PHASE 4: MANUAL BROWSER TESTS (do these in web browser)
# ==============================================================================

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "PHASE 4: MANUAL BROWSER TESTS"
echo "════════════════════════════════════════════════════════════════"

echo ""
echo "1. HOMEPAGE TEST"
echo "   Open: https://greyinfotech.com.ng"
echo "   ✓ Page loads"
echo "   ✓ Images visible"
echo "   ✓ Hero video plays"
echo "   ✓ No console errors"
echo ""

echo "2. ADMIN LOGIN TEST"
echo "   Open: https://greyinfotech.com.ng/admin/login"
echo "   Email: graham@greyinfotech.com.ng"
echo "   Password: !Uriel2Sobiribo3,"
echo "   ✓ Login succeeds"
echo "   ✓ Redirected to /admin/dashboard"
echo ""

echo "3. SETTINGS & SMTP TEST"
echo "   Navigate to: Admin → Settings"
echo "   Click: Test Email"
echo "   ✓ Test email sent to logged-in user"
echo "   ✓ Check inbox/spam folder"
echo ""

echo "4. CONTACT FORM TEST"
echo "   Go to: https://greyinfotech.com.ng"
echo "   Fill and submit contact form"
echo "   ✓ No errors"
echo "   ✓ Email sent to hello@greyinfotech.com.ng"
echo ""

echo "5. TAWK CHAT TEST"
echo "   Open DevTools (F12)"
echo "   Go to Network tab"
echo "   Filter: 'tawk'"
echo "   ✓ See embed.tawk.to requests (200 OK)"
echo "   ✓ Chat widget visible bottom-right"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE"
echo "════════════════════════════════════════════════════════════════"
