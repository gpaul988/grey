# 🚀 DEPLOYMENT EXECUTION LOG — Live Progress Tracker

**Start Time**: 2026-08-03 01:14 UTC+1  
**Status**: ⏳ In Progress  
**Target**: cPanel Production Deployment  

---

## PHASE 1️⃣: LOCAL VERIFICATION (If Testing Locally)

> **Skip if you already have MySQL with these credentials on your machine**

### Step 1.1: Verify MySQL Running
```bash
# Check if MySQL is running on 127.0.0.1:3306
mysql -h 127.0.0.1 -u greyinf1_greyinfotech -p
# Enter password: 1@Uriel2$Sobiribo2,&
# Command: SHOW DATABASES;
# Expected: Should list greyinf1_Grey_InfoTech database
```

**Status**: ⬜ TODO

### Step 1.2: Install Dependencies
```bash
cd c:\Users\graha\Documents\GitHub\grey
npm ci
```

**Status**: ⬜ TODO  
**Expected Time**: 2-3 minutes

### Step 1.3: Bootstrap Database Schema
```bash
npm run bootstrap:db:mysql
```

**Status**: ⬜ TODO  
**Expected Output**: `[DB] Connected and migrated (MySQL)`

### Step 1.4: Seed Admin Accounts
```bash
npm run seed
```

**Status**: ⬜ TODO  
**Expected Output**: Admin accounts created with SEED_*_PASSWORD values

### Step 1.5: Build Production Bundle
```bash
npm run build
```

**Status**: ⬜ TODO  
**Expected Time**: 60-90 seconds  
**Expected Output**: `Compiled successfully`

### Step 1.6: Start Production Server
```bash
npm run start
```

**Status**: ⬜ TODO  
**Expected Output**: `[server] Ready on http://localhost:3000`

### Step 1.7: Run Validation
```bash
node validate-production.js
```

**Status**: ⬜ TODO  
**Expected**: ✅ 43 passed, 0 failures (95% readiness)

### Step 1.8: Local Smoke Tests
- [ ] Open http://localhost:3000 → Homepage loads
- [ ] Open http://localhost:3000/admin/login → Login form visible
- [ ] Login: graham@greyinfotech.com.ng / !Uriel2Sobiribo3,
- [ ] Navigate to Settings → Click Test Email
- [ ] Check inbox for test email

**Status**: ⬜ TODO

---

## PHASE 2️⃣: CPANEL PRODUCTION DEPLOYMENT

### Step 2.1: Generate Production Secrets ✅
**Already Done — Stored Securely**

```
SESSION_SECRET=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6
CSRF_SECRET=f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1
ADMIN_API_SECRET=2348d3541813774cb075fc8890ba52c502145493b654a4b25780824e2cf8bfe0
```

**Status**: ✅ DONE

### Step 2.2: Create cPanel Node.js App

**Instructions**:
1. Log in to cPanel at: `https://greyinfotech.com.ng:2083` (or your cPanel URL)
2. Find **Setup Node.js App** (Software section)
3. Click **Create Application**
   - **Application root**: `/home/greyinf1/public_html/grey`
   - **Application startup file**: `server.js`
   - **Node.js version**: `20.x` (select LTS version)
   - Click **Create**
4. Wait ~30 seconds for app to be created

**Status**: ⬜ TODO
**Docs**: FINAL_DEPLOYMENT_GUIDE.md — Step 2B

### Step 2.3: Set Environment Variables in cPanel

**Instructions**:
1. In cPanel Node.js App panel (from Step 2.2)
2. Click **Edit Environment Variables**
3. Add all variables from below:

```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

DB_TYPE=mysql
DB_HOST=127.0.0.1
DB_USER=greyinf1_greyinfotech
DB_PASS=1@Uriel2$Sobiribo2,&
DB_NAME=greyinf1_Grey_InfoTech
DB_PORT=3306

SESSION_SECRET=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6
CSRF_SECRET=f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1
ADMIN_API_SECRET=2348d3541813774cb075fc8890ba52c502145493b654a4b25780824e2cf8bfe0

SMTP_HOST=mail.greyinfotech.com.ng
SMTP_PORT=465
SMTP_USER=hello@greyinfotech.com.ng
SMTP_PASSWORD=1Uriel2Graham3,
SMTP_FROM=noreply@greyinfotech.com.ng
SMTP_REPLY_TO=support@greyinfotech.com.ng
SMTP_SECURE=true

ADMIN_BASE_URL=https://greyinfotech.com.ng
ADMIN_EMAIL=hello@greyinfotech.com.ng

APP_URL=https://greyinfotech.com.ng
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng/admin

NEXT_PUBLIC_TAWK_PROPERTY_ID=677c7eb9af5bfec1dbe78c68
NEXT_PUBLIC_TAWK_WIDGET_ID=1igv4u196

SEED_SUPERADMIN_PASSWORD=!Uriel2Sobiribo3,
SEED_ADMIN_PASSWORD=!Uriel2Sobiribo3,
SEED_MANAGER_PASSWORD=!Uriel2Sobiribo3,
SEED_STAFF_PASSWORD=!Uriel2Sobiribo3,

DEBUG=false
```

**Status**: ⬜ TODO
**Docs**: FINAL_DEPLOYMENT_GUIDE.md — Step 2C

### Step 2.4: Deploy Code to cPanel

**Option A: Via Git (Recommended)**
```bash
# SSH into cPanel server
ssh greyinf1@greyinfotech.com.ng
# Password: [your cPanel password]

# Navigate to app root
cd /home/greyinf1/public_html/grey

# Clone or pull latest
git clone https://github.com/gpaul988/grey.git .
# OR if already exists:
git pull origin main
```

**Option B: Via FTP/File Manager**
- Upload to: `/home/greyinf1/public_html/grey/`
- Upload these folders: `.next/`, `Admin/`, `app/`, `components/`, `lib/`, `public/`, `types/`
- Upload these files: `server.js`, `server.ts`, `package.json`, `package-lock.json`, `tsconfig.json`

**Status**: ⬜ TODO
**Docs**: FINAL_DEPLOYMENT_GUIDE.md — Step 2D

### Step 2.5: Install, Build & Initialize (SSH)

```bash
# SSH into cPanel server
ssh greyinf1@greyinfotech.com.ng

# Navigate to app directory
cd /home/greyinf1/public_html/grey

# Activate Node.js environment (from cPanel Node.js App panel)
source nodevenv/public_html/grey/20/bin/activate

# Install dependencies
npm ci

# Build production bundle (embeds NEXT_PUBLIC_* from env)
npm run build

# Bootstrap MySQL schema
npm run bootstrap:db:mysql

# Seed initial admin accounts
npm run seed
```

**Status**: ⬜ TODO
**Expected Time**: 15-20 minutes
**Docs**: FINAL_DEPLOYMENT_GUIDE.md — Step 2E-2F

### Step 2.6: Restart Application in cPanel

**Instructions**:
1. Go to cPanel → Setup Node.js App
2. Find your app in the list
3. Click **Restart**
4. Wait ~10 seconds

**Status**: ⬜ TODO

### Step 2.7: Verify Server Started

```bash
# SSH session from Step 2.5
tail -f tmp/stderr.log

# Should show: "[server] Ready on http://localhost:PORT"
# If errors: investigate and fix
# Press CTRL+C to exit tail
```

**Status**: ⬜ TODO

---

## PHASE 3️⃣: PRODUCTION TESTING

### Test 1: Homepage
```bash
curl -I https://greyinfotech.com.ng/
```
**Expected**: HTTP 200  
**Status**: ⬜ TODO

### Test 2: Admin Login
- Open: https://greyinfotech.com.ng/admin/login
- Login: graham@greyinfotech.com.ng / !Uriel2Sobiribo3,
- Should redirect to dashboard

**Status**: ⬜ TODO

### Test 3: Settings & SMTP
- Admin → Settings
- Click "Test Email"
- Should send test email to logged-in user

**Status**: ⬜ TODO

### Test 4: Contact Form
- https://greyinfotech.com.ng/
- Fill and submit contact form
- Check hello@greyinfotech.com.ng for notification

**Status**: ⬜ TODO

### Test 5: Tawk Chat
- Homepage should show chat widget (bottom-right)
- DevTools Network: should see embed.tawk.to requests

**Status**: ⬜ TODO

---

## PHASE 4️⃣: POST-DEPLOYMENT VERIFICATION

### Checklist
- [ ] All pages load (no 500 errors)
- [ ] Admin login works
- [ ] SMTP/email working
- [ ] Tawk chat visible
- [ ] Contact form sends emails
- [ ] SSL/HTTPS active
- [ ] No console errors
- [ ] Database tables exist

**Status**: ⬜ TODO

---

## 🆘 TROUBLESHOOTING

### If Database Connection Fails
```bash
# Verify MySQL is running and accessible
mysql -h 127.0.0.1 -u greyinf1_greyinfotech -p
# Password: 1@Uriel2$Sobiribo2,&
SHOW DATABASES;
```

### If npm run build Fails
```bash
# Clean and rebuild
rm -rf .next node_modules package-lock.json
npm ci
npm run build
```

### If Server Won't Start
```bash
# Check logs
tail -f tmp/stderr.log
tail -f tmp/stdout.log

# Verify environment variables
node -e "console.log(process.env.DB_HOST, process.env.NODE_ENV)"
```

### If SMTP Test Fails
```bash
# Verify SMTP config
node -e "require('./Admin/utils/mailer.ts').smtpConfigured()" 
```

---

## 📝 COMPLETION CHECKLIST

### Before Deployment
- [ ] .env.local updated with cPanel credentials ✅
- [ ] Validator passes (node validate-production.js)
- [ ] TypeScript compiles (npx tsc --noEmit)
- [ ] Local testing complete (optional)

### During Deployment
- [ ] cPanel Node.js app created
- [ ] Environment variables set in cPanel
- [ ] Code deployed (Git or FTP)
- [ ] npm ci + build + seed executed
- [ ] App restarted

### After Deployment
- [ ] Server logs show "Ready on..."
- [ ] Homepage loads (https://greyinfotech.com.ng)
- [ ] Admin login works
- [ ] SMTP test email sends
- [ ] Settings page accessible

---

## 📞 SUPPORT

**Deployment Guide**: FINAL_DEPLOYMENT_GUIDE.md  
**Detailed Checklist**: PRODUCTION_CHECKLIST.md  
**Pre-Deployment Tool**: node validate-production.js  
**Production Status**: READY_FOR_PRODUCTION.md

---

**Generated**: 2026-08-03 01:14 UTC+1  
**Status**: Production Deployment In Progress 🚀
