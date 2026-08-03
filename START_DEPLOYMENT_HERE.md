# 🚀 PRODUCTION DEPLOYMENT — START HERE

**Status**: ✅ Ready to Deploy  
**Last Updated**: 2026-08-03  
**Deployment Time**: 45-60 minutes total

---

## ⚡ QUICK START (Choose Your Path)

### Option A: Deploy Directly to cPanel (Recommended)

**Time**: 45 min | **Skip** local testing

```bash
# STEP 1: In cPanel Web Interface
1. Setup Node.js App (Software section)
   - Root: /home/greyinf1/public_html/grey
   - Startup: server.js
   - Node: 20.x LTS
   - Create

2. Edit Environment Variables
   - Copy all from .env.local
   - Save

3. Deploy Code
   - Via Git: git clone https://github.com/gpaul988/grey.git
   - OR FTP upload files

# STEP 2: SSH into cPanel Server
ssh greyinf1@greyinfotech.com.ng
cd /home/greyinf1/public_html/grey
source nodevenv/public_html/grey/20/bin/activate

# STEP 3: Run Deployment Commands
npm ci
npm run build
npm run bootstrap:db:mysql
npm run seed

# STEP 4: Restart App in cPanel & Test
# - Click Restart in cPanel
# - Open https://greyinfotech.com.ng in browser
# - Login: graham@greyinfotech.com.ng / !Uriel2Sobiribo3,
```

---

### Option B: Test Locally First (Detailed Testing)

**Time**: 30 min local + 45 min cPanel

```bash
# Windows: Run this file
DEPLOYMENT_COMMANDS.bat

# macOS/Linux: Run this file
bash DEPLOYMENT_COMMANDS.sh
```

**What it does**:

1. Validates production readiness
2. Installs dependencies
3. Creates MySQL schema
4. Seeds admin accounts
5. Builds production bundle
6. Starts server on http://localhost:3000
7. Then shows cPanel deployment instructions

---

## 📋 Step-by-Step: Option A (Direct to cPanel)

### Step 1: Create cPanel Node.js App (5 min)

1. **Log in to cPanel**
    - URL: https://greyinfotech.com.ng:2083
    - Username: greyinf1
    - Password: [your cPanel password]

2. **Find Setup Node.js App**
    - Go to Software section
    - Click "Setup Node.js App"

3. **Create Application**
    - **Application root**: `/home/greyinf1/public_html/grey`
    - **Application startup file**: `server.js`
    - **Node.js version**: `20.x` (select LTS)
    - Click **Create**
    - Wait 30 seconds

4. **Note the virtualenv path** shown (you'll need it for SSH)
    - Format: `nodevenv/public_html/grey/20/bin/activate`

---

### Step 2: Set Environment Variables (5 min)

1. **In the Node.js App panel** (from Step 1)
2. **Click "Edit Environment Variables"**
3. **Copy these sections into cPanel** (from .env.local):

**Section 1: Core**

```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

**Section 2: Database (CRITICAL — these are your cPanel credentials)**

```
DB_TYPE=mysql
DB_HOST=127.0.0.1
DB_USER=greyinf1_greyinfotech
DB_PASS=1@Uriel2$Sobiribo2,&
DB_NAME=greyinf1_Grey_InfoTech
DB_PORT=3306
```

**Section 3: Security**

```
SESSION_SECRET=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6
CSRF_SECRET=f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1
ADMIN_API_SECRET=2348d3541813774cb075fc8890ba52c502145493b654a4b25780824e2cf8bfe0
```

**Section 4: Email (SMTP)**

```
SMTP_HOST=mail.greyinfotech.com.ng
SMTP_PORT=465
SMTP_USER=hello@greyinfotech.com.ng
SMTP_PASSWORD=1Uriel2Graham3,
SMTP_FROM=noreply@greyinfotech.com.ng
SMTP_REPLY_TO=support@greyinfotech.com.ng
SMTP_SECURE=true
```

**Section 5: Admin**

```
ADMIN_BASE_URL=https://greyinfotech.com.ng
ADMIN_EMAIL=hello@greyinfotech.com.ng
```

**Section 6: URLs**

```
APP_URL=https://greyinfotech.com.ng
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng/admin
```

**Section 7: Tawk (Build-time, embedded)**

```
NEXT_PUBLIC_TAWK_PROPERTY_ID=677c7eb9af5bfec1dbe78c68
NEXT_PUBLIC_TAWK_WIDGET_ID=1igv4u196
```

**Section 8: Seed Passwords (for initial accounts)**

```
SEED_SUPERADMIN_PASSWORD=!Uriel2Sobiribo3,
SEED_ADMIN_PASSWORD=!Uriel2Sobiribo3,
SEED_MANAGER_PASSWORD=!Uriel2Sobiribo3,
SEED_STAFF_PASSWORD=!Uriel2Sobiribo3,
```

**Section 9: Debug**

```
DEBUG=false
```

4. **Click Save**

---

### Step 3: Deploy Code (5-10 min)

**Option A: Via Git (Recommended)**

```bash
# SSH into cPanel server
ssh greyinf1@greyinfotech.com.ng
# Enter password when prompted

# Navigate to app root
cd /home/greyinf1/public_html/grey

# Clone repository
git clone https://github.com/gpaul988/grey.git .

# If already cloned:
# git pull origin main
```

**Option B: Via FTP/File Manager**

- Upload to: `/home/greyinf1/public_html/grey/`
- Upload these: `.next/`, `Admin/`, `app/`, `components/`, `lib/`, `public/`, `types/`
- Upload these files: `server.js`, `server.ts`, `package.json`, `package-lock.json`, `tsconfig.json`

---

### Step 4: Run Deployment Commands (15 min)

**Keep your SSH session open from Step 3:**

```bash
# Activate Node.js environment
source nodevenv/public_html/grey/20/bin/activate

# Install dependencies
npm ci
# (Takes 2-3 min, watch the output)

# Build production bundle
npm run build
# (Takes 60-90 sec, embeds NEXT_PUBLIC_* vars)

# Create MySQL schema
npm run bootstrap:db:mysql
# (Takes 5-10 sec)

# Seed initial admin accounts
npm run seed
# (Takes 5 sec)

# Watch server startup (should show success)
tail -f tmp/stderr.log
# Press CTRL+C when you see "[server] Ready on http://localhost:PORT"
```

**Expected Output After `npm run seed`:**

```
✅ Superadmin account created: superadmin@greyinfotech.com.ng
✅ Admin account created: graham@greyinfotech.com.ng
✅ Manager account created: manager@greyinfotech.com.ng
✅ Staff account created: staff@greyinfotech.com.ng
```

---

### Step 5: Restart Application (1 min)

1. **Go back to cPanel**
2. **Setup Node.js App panel**
3. **Find your app, click Restart**
4. **Wait 10 seconds** for server to start

---

### Step 6: Test on Production Domain (10 min)

#### Test 1: Homepage

```bash
curl -I https://greyinfotech.com.ng/
# Expected: HTTP 200
```

- Open in browser: https://greyinfotech.com.ng
- Verify: page loads, images visible, no errors

#### Test 2: Admin Login

- Open: https://greyinfotech.com.ng/admin/login
- Email: `graham@greyinfotech.com.ng`
- Password: `!Uriel2Sobiribo3,`
- Expected: redirects to /admin/dashboard

#### Test 3: Settings & SMTP

- In admin: navigate to Settings
- Click "Test Email"
- Check email inbox for test email

#### Test 4: Contact Form

- Homepage: fill and submit contact form
- Check `hello@greyinfotech.com.ng` for notification

#### Test 5: Tawk Chat

- Homepage: look for chat widget (bottom-right)
- DevTools Network: filter "tawk" → should see 200 OK

---

## 🆘 If Something Goes Wrong

### Database Connection Failed

```bash
# SSH into cPanel
ssh greyinf1@greyinfotech.com.ng
cd /home/greyinf1/public_html/grey

# Test MySQL connection
mysql -h 127.0.0.1 -u greyinf1_greyinfotech -p
# Password: 1@Uriel2$Sobiribo2,&

# Inside MySQL:
SHOW DATABASES;
USE greyinf1_Grey_InfoTech;
SHOW TABLES;
```

### npm run build Failed

```bash
# Increase Node memory limit
node --max-old-space-size=4096 node_modules/.bin/next build
```

### Server Won't Start

```bash
# Check logs
tail -f tmp/stderr.log
tail -f tmp/stdout.log

# Verify env vars are set
node -e "console.log(process.env.DB_HOST, process.env.NODE_ENV)"
```

### SMTP Test Failed

```bash
# Verify SMTP credentials in cPanel env:
node -e "require('./Admin/utils/mailer.ts').smtpConfigured()"
```

---

## 📞 Resources

| Document                    | Purpose                                 |
|-----------------------------|-----------------------------------------|
| `FINAL_DEPLOYMENT_GUIDE.md` | Complete step-by-step guide (Parts 1-7) |
| `PRODUCTION_CHECKLIST.md`   | Pre-deployment verification checklist   |
| `READY_FOR_PRODUCTION.md`   | Executive summary & troubleshooting     |
| `DEPLOYMENT_COMMANDS.bat`   | Windows automated commands              |
| `DEPLOYMENT_COMMANDS.sh`    | macOS/Linux automated commands          |
| `validate-production.js`    | Pre-deployment validator (43 checks)    |

---

## ✅ Deployment Checklist

### Before Deployment

- [ ] `.env.local` updated with cPanel credentials
- [ ] All 9 environment sections verified
- [ ] Database credentials (DB_USER, DB_PASS, DB_NAME) match cPanel
- [ ] SMTP credentials verified
- [ ] Tawk IDs set in .env.local

### During Deployment

- [ ] cPanel Node.js app created
- [ ] All environment variables set in cPanel (not .env.local file)
- [ ] Code deployed (Git or FTP)
- [ ] npm ci executed (shows 0 vulnerabilities)
- [ ] npm run build completed (shows "Compiled successfully")
- [ ] npm run bootstrap:db:mysql created tables
- [ ] npm run seed created 4 admin accounts
- [ ] App restarted in cPanel

### After Deployment

- [ ] Homepage loads (https://greyinfotech.com.ng)
- [ ] Admin login works
- [ ] SMTP test email sends
- [ ] Tawk chat visible
- [ ] Contact form sends emails
- [ ] No console errors in browser
- [ ] All database tables exist

---

## 🎯 You're Ready!

All systems are production-ready. Follow the steps above and your application will be live in **45-60 minutes**.

**Questions?** See FINAL_DEPLOYMENT_GUIDE.md or run `node validate-production.js` to verify everything.

---

**Generated**: 2026-08-03  
**Version**: Production Ready v1.0  
**Status**: ✅ READY TO DEPLOY
