# GREY — cPanel Deployment (Step-by-Step)

## Phase 1: Build & Prepare (Your Machine)

### Step 1.1: Build Next.js locally
```bash
cd C:\Users\graha\Documents\GitHub\grey
npm ci
npm run build
```
**Expected**: `.next/` folder created (~50-100MB), no errors

### Step 1.2: Create config.env
```bash
cp config.env.example config.env
```

**Edit config.env with your values:**
```env
NODE_ENV=production
PORT=3000

# ── DOMAIN URLS ──
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng/admin

# ── SECURITY (Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=<generate-32-char-hex>
CSRF_SECRET=<generate-32-char-hex>

# ── DATABASE (MySQL on cPanel)
DB_HOST=localhost
DB_USER=greyinf1_user        # cPanel: username_dbuser (create in cPanel)
DB_PASS=<your-strong-password>
DB_NAME=greyinf1_grey        # cPanel: username_dbname
DB_PORT=3306

# ── SMTP (Gmail / SendGrid / Resend)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@greyinfotech.com.ng
SMTP_PASS=<app-specific-password>
SMTP_FROM=noreply@greyinfotech.com.ng

# ── PAYMENTS (Get LIVE keys from dashboard)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...

# ── OPTIONAL (AI, Analytics)
OPENAI_API_KEY=<optional>
MIXPANEL_TOKEN=<optional>
SENTRY_DSN=<optional>
```

### Step 1.3: Verify build locally
```bash
npm run start
# Visit http://localhost:3000 → should load homepage
# Visit http://localhost:3000/admin/login → should load login page
```
Press Ctrl+C to stop.

---

## Phase 2: Package for Upload

### Step 2.1: Create deployment ZIP
```bash
bash scripts/build-and-deploy.sh
# Produces: grey-deploy.zip (~80-120MB)
```

**If script doesn't exist, manually create ZIP:**
```bash
# Include: .next, server.ts, server.js, package.json, package-lock.json, public/, Admin/, lib/, components/, config.env
# Exclude: node_modules, .git, .env.local, *.log
```

### Step 2.2: Verify ZIP contains:
- `.next/` (the built app)
- `server.ts` + `server.js` (entry points)
- `package.json` + `package-lock.json`
- `config.env` (with your secrets)
- `public/` (static assets)
- `Admin/`, `lib/`, `components/` (source code)

---

## Phase 3: cPanel Setup

### Step 3.1: Create MySQL Database
1. **cPanel → Databases → MySQL Databases**
2. **Create Database:**
   - Name: `greyinf1_grey`
   - Click "Create"
3. **Create User:**
   - Username: `greyinf1_user`
   - Password: `<strong-password>` (same as config.env DB_PASS)
   - Click "Create User"
4. **Assign Privileges:**
   - Select user `greyinf1_user` + database `greyinf1_grey`
   - Check "All Privileges"
   - Click "Make Changes"

### Step 3.2: Upload Code
1. **cPanel → File Manager**
2. Navigate to `/home/greyinf1/public_html/`
3. **Upload `grey-deploy.zip`**
4. **Right-click → Extract** (extracts to `grey/` folder)
5. Verify: `/home/greyinf1/public_html/grey/` exists with all files

### Step 3.3: Install Node.js Dependencies
Via SSH (recommended):
```bash
ssh user@your-cpanel-domain.com
cd ~/public_html/grey
npm ci --omit=dev --prefer-offline --maxsockets=1
```

Or via cPanel Web UI:
1. **cPanel → Node.js App Manager**
2. Click app (if exists, delete and recreate)
3. Click "Create Application"
4. **Application root**: `/home/greyinf1/public_html/grey`
5. **Application URL**: `greyinfotech.com.ng` (your domain)
6. **Application startup file**: `server.js`
7. **Node.js version**: 20.x
8. Click **Create** → waits for npm install

---

## Phase 4: Configure in cPanel

### Step 4.1: Set Environment Variables
1. **Node.js App Manager → Your App → Edit Variables**
2. Add each variable (copy from config.env):
```
NODE_ENV=production
PORT=3000
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng/admin
SESSION_SECRET=<your-value>
CSRF_SECRET=<your-value>
DB_HOST=localhost
DB_USER=greyinf1_user
DB_PASS=<your-password>
DB_NAME=greyinf1_grey
DB_PORT=3306
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@greyinfotech.com.ng
SMTP_PASS=<app-password>
SMTP_FROM=noreply@greyinfotech.com.ng
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
```
3. Click **Save**

### Step 4.2: Restart App
1. **Node.js App Manager → Your App → Restart**
2. Wait 15-30 seconds for startup

### Step 4.3: Seed Database (First Deploy Only)
Via SSH:
```bash
ssh user@your-cpanel-domain.com
cd ~/public_html/grey
npm run cpanel:post
# Creates tables + seeds admin users
```

---

## Phase 5: Verification

### Quick Checks
```bash
# Test homepage
curl -I https://greyinfotech.com.ng
# Should return: HTTP 200

# Test admin login
curl -I https://greyinfotech.com.ng/admin/login
# Should return: HTTP 200

# Test /startup route (should NOT be 404 anymore)
curl -I https://greyinfotech.com.ng/startup
# Should return: HTTP 200
```

### Browser Tests
1. Visit: `https://greyinfotech.com.ng` → Homepage loads
2. Visit: `https://greyinfotech.com.ng/admin/login` → Login form visible
3. **Login** with seeded admin:
   - Email: `admin@greyinfotech.com.ng`
   - Password: Check `Admin/db/seed.ts` for hardcoded password (or set via SEED_ADMIN_PASSWORD env var)
4. Dashboard loads → All modules visible
5. Test form submission → Email received
6. Test payment buttons (Stripe/Paystack) → Redirect to payment gateway

### Check Logs
```bash
# SSH into server
ssh user@your-cpanel-domain.com
tail -f ~/public_html/grey/.logs/error.log
```

**Good logs:**
```
[server.js] ✅ Dependencies installed
[server.js] ✅ better-sqlite3 binary OK
[server.js] ✅ Next.js build succeeded
> Ready on http://0.0.0.0:3000
```

**Bad logs (fix before proceeding):**
```
Cannot find module 'mysql2'  → npm ci not complete
Error: connect ECONNREFUSED → MySQL not running
Error: SESSION_SECRET not set → Set env var in cPanel
```

---

## Phase 6: Post-Deployment

### Critical Security Steps
1. **Change Admin Passwords**
   - Login to `/admin/login`
   - Go to **Settings → Users**
   - Change password for each user (admin, manager, support)
   - Store securely

2. **Enable HTTPS**
   - **cPanel → SSL/TLS**
   - Click **Issue SSL Certificate** (Let's Encrypt, auto-installs)
   - Or wait for AutoSSL to auto-provision (5-10 min)
   - Verify: `https://greyinfotech.com.ng` loads (no warnings)

3. **Configure Production Credentials**
   - Get LIVE keys from Stripe/Paystack dashboards
   - Update in cPanel environment variables
   - Restart app

4. **Test Email Delivery**
   - Submit a form at `/contact`
   - Verify email arrives at `SMTP_FROM`
   - Check spam folder if not in inbox

### Monitoring
- Check **Node.js App Manager** monthly for memory usage
- Restart app if memory > 256MB
- Review **Error Logs** weekly for database lock errors

---

## Troubleshooting

### "npm install" fails (Killed)
**Fix:**
```bash
export NODE_OPTIONS="--max-old-space-size=256"
npm ci --omit=dev --prefer-offline --maxsockets=1
```

### "Cannot find module 'better-sqlite3'"
**Expected** — app falls back to MemoryStore. Sessions won't persist across restarts, but app runs.
**Fix (optional):**
```bash
npm rebuild better-sqlite3 --build-from-source
```

### "Database connection refused"
**Check:**
1. Is MySQL running? (cPanel → Databases → check status)
2. Are DB_* env vars correct? (compare with cPanel MySQL database credentials)
3. Restart app after changing env vars

### "Login fails" (Invalid email or password)
**Check:**
1. Did you run `npm run cpanel:post` after deploy?
2. Are you using correct credentials from seed?
3. Reset: SSH and run `npm run seed:reset`

### "/startup still shows 404"
**Fix:**
- Restart Node.js app in cPanel
- Or rerun `npm run build` locally and re-upload `.next`

---

## Final Checklist

- [ ] Built locally: `npm run build` succeeded
- [ ] Created `config.env` with all secrets
- [ ] Uploaded `grey-deploy.zip` to cPanel
- [ ] Created MySQL database + user in cPanel
- [ ] Extracted ZIP to `/home/greyinf1/public_html/grey/`
- [ ] Ran `npm ci --omit=dev` on cPanel
- [ ] Set all env vars in Node.js App Manager
- [ ] Ran `npm run cpanel:post` to seed database
- [ ] Restarted app in cPanel
- [ ] Homepage loads: `https://greyinfotech.com.ng` ✅
- [ ] Admin login loads: `https://greyinfotech.com.ng/admin/login` ✅
- [ ] Can login with admin credentials ✅
- [ ] `/startup` loads without 404 ✅
- [ ] Forms submit without errors ✅
- [ ] HTTPS certificate installed ✅
- [ ] Changed admin passwords from defaults ✅
- [ ] Configured LIVE payment keys ✅
- [ ] SMTP email tested ✅

---

## 🚀 DEPLOYMENT COMPLETE!

Your Grey InfoTech platform is now live on cPanel.

**Next**: Monitor logs, update payment credentials, and invite your team.

---

**Questions?** Check cPanel logs or GitHub docs.
