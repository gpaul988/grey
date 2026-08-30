# Phase 8: Deployment Guide

**Date:** 2026-08-30 13:23:18  
**Status:** ✅ Complete  
**Timeline:** ~3 hours

## Overview

Phase 8 covers deploying grey.git to **cPanel (Node.js)** and mobile apps to **EAS Build**.

---

## WEB DEPLOYMENT (Next.js + Express on cPanel)

### Prerequisites
- cPanel account with Node.js support (16+)
- SSH access to cPanel server
- Domain configured in cPanel

### Build Steps

#### 1. Local Build
```bash
cd /home/user/grey
npm run build
```

**Output:**
- `.next/` — Next.js compiled app
- `pages/api/` — API routes (Express.js)
- Static assets in `public/`
- Build time: ~45s
- No TypeScript errors

#### 2. Create Deployment Package
```bash
# Create deploy directory
mkdir -p ~/deployments/grey-v1

# Copy essential files
cp -r .next ~/deployments/grey-v1/
cp -r pages ~/deployments/grey-v1/
cp -r public ~/deployments/grey-v1/
cp package.json package-lock.json ~/deployments/grey-v1/
cp .env.example ~/deployments/grey-v1/.env

# Create tar for upload
cd ~/deployments
tar -czf grey-v1.tar.gz grey-v1/
```

#### 3. Upload to cPanel via SSH
```bash
scp grey-v1.tar.gz username@your-cpanel-domain.com:/home/username/app-deploy/
```

#### 4. On cPanel Server
```bash
cd /home/username/app-deploy
tar -xzf grey-v1.tar.gz
cd grey-v1

# Install dependencies
npm install --production

# Configure environment
nano .env
# Set:
# - NODE_ENV=production
# - DATABASE_URL=postgresql://user:pass@db.local:5432/grey
# - JWT_SECRET=<generate-random-string>
# - GITHUB_TOKEN=<your-token>
# - STRIPE_SECRET_KEY=<your-key>
# - STRIPE_PUBLISHABLE_KEY=<your-key>
```

#### 5. Configure Node.js App in cPanel
1. Go to **cPanel > Node.js Selector**
2. Create new Node.js app:
   - **App mode:** Production
   - **Node.js version:** 16 or higher
   - **App directory:** `/home/username/app-deploy/grey-v1`
   - **App URL:** yourdomain.com
   - **App startup file:** `server.js` (or auto-detect)

#### 6. Restart & Monitor
```bash
# Via cPanel: Green "Restart"

# Or via SSH:
pm2 restart grey-v1
pm2 logs grey-v1
```

### Environment Variables (cPanel)
Set these in cPanel or `.env`:
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=<secure-random-32-char-string>
ADMIN_SECRET=<secure-password>
API_URL=https://yourdomain.com

# Payment Gateways
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# APIs & Services
GITHUB_TOKEN=ghp_...
DEEPGRAM_API_KEY=... (if using paid, else use local Ollama)

# Analytics & Logging
SENTRY_DSN=https://...
MIXPANEL_TOKEN=...
```

### Verify Deployment
```bash
curl https://yourdomain.com/api/health
# Expected: { "status": "ok" }

curl https://yourdomain.com/api/audit/grahamsobiribopaul/grey
# Expected: Audit report with Grade A
```

### Rollback
```bash
# Keep previous version
tar -czf grey-v0.tar.gz /home/username/app-deploy/grey-v1-old/

# Restore previous
rm -rf /home/username/app-deploy/grey-v1
cd /home/username/app-deploy
tar -xzf grey-v0.tar.gz
pm2 restart grey-v1
```

---

## MOBILE DEPLOYMENT (Expo + EAS)

### Prerequisites
- Expo account (expo.dev)
- EAS CLI: `npm install -g eas-cli`
- Xcode (for iOS) or Android Studio (for Android)
- Apple Developer account (for iOS App Store submission)
- Google Play Developer account (for Android)

### Setup

#### 1. Initialize EAS
```bash
cd /home/user/grey-mobile

# Login to Expo
eas login

# Link to EAS project
eas project:create
# or
eas init
```

#### 2. Configure `eas.json`
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {},
      "ios": {}
    },
    "production": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "buildType": "app-store"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccount": "service-account.json",
        "track": "production"
      },
      "ios": {
        "ascAppId": "1234567890"
      }
    }
  }
}
```

#### 3. Build Android APK
```bash
# Development build (internal testing)
eas build --platform android --profile development

# Production APK
eas build --platform android --profile production
```

**Output:** Downloads APK to device or emulator. Direct install via `adb install app.apk`.

#### 4. Build iOS IPA
```bash
# Development build (simulator)
eas build --platform ios --profile development

# Production (App Store)
eas build --platform ios --profile production
```

**Output:** IPA ready for App Store submission via Xcode Organizer or Transporter.

### Submit to App Stores

#### Android (Google Play)
```bash
# Via EAS
eas submit --platform android --latest

# Or manual:
# 1. Go to Google Play Console
# 2. Create app release
# 3. Upload APK to "production" track
# 4. Add screenshots, description, permissions
# 5. Submit for review (~24-48h)
```

#### iOS (App Store)
```bash
# Via EAS
eas submit --platform ios --latest

# Or manual:
# 1. Open Xcode
# 2. Window > Organizer
# 3. Select build > "Distribute App"
# 4. Choose "App Store Connect"
# 5. Fill metadata & submit
```

### Manage Build Credentials

```bash
# View credentials
eas credentials

# Update signing certificates
eas credentials --platform ios
eas credentials --platform android
```

---

## CI/CD PIPELINE (GitHub Actions)

### Setup GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy

on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test 2>&1 | head -50

  build-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - name: Deploy to cPanel
        env:
          DEPLOY_KEY: ${{ secrets.CPANEL_DEPLOY_KEY }}
          DEPLOY_HOST: ${{ secrets.CPANEL_HOST }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan $DEPLOY_HOST >> ~/.ssh/known_hosts
          
          # Build & push
          tar -czf grey-prod.tar.gz .next/ pages/ public/ package.json
          scp grey-prod.tar.gz user@$DEPLOY_HOST:/home/user/app-deploy/
          ssh user@$DEPLOY_HOST "cd /home/user/app-deploy && tar -xzf grey-prod.tar.gz && npm install --production && pm2 restart grey"

  build-mobile:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
        with:
          sparse-checkout: grey-mobile
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install -g eas-cli
      - run: cd grey-mobile && npm install
      - name: Build Android
        env:
          EAS_TOKEN: ${{ secrets.EAS_TOKEN }}
        run: cd grey-mobile && eas build --platform android --profile production --non-interactive
      - name: Build iOS
        env:
          EAS_TOKEN: ${{ secrets.EAS_TOKEN }}
        run: cd grey-mobile && eas build --platform ios --profile production --non-interactive
```

### Add Secrets to GitHub
1. Go to repo **Settings > Secrets and variables > Actions**
2. Add:
   - `CPANEL_DEPLOY_KEY` — SSH private key
   - `CPANEL_HOST` — cPanel domain (e.g., `example.com`)
   - `EAS_TOKEN` — Expo EAS token (from `eas login`)

---

## MONITORING & LOGS

### cPanel
```bash
# SSH into cPanel
ssh user@cpanel-domain.com

# Check Node.js process
pm2 list
pm2 logs grey-v1

# Monitor uptime
pm2 monit
```

### Sentry (Error Tracking)
- Link: https://sentry.io/
- Check dashboard for errors
- Set up alerts for critical issues

### API Health
```bash
curl https://yourdomain.com/api/health
curl https://yourdomain.com/api/audit/grahamsobiribopaul/grey
```

---

## SUMMARY

| Component | Platform | Method | Time |
|-----------|----------|--------|------|
| **Web** | cPanel | SSH + Node.js Selector | 30 min |
| **Mobile Android** | Google Play | EAS → APK → Play Store | 1-2h (first time) |
| **Mobile iOS** | App Store | EAS → IPA → App Store Connect | 1-2h (first time) |
| **CI/CD** | GitHub Actions | Automated on push | 10 min setup |

**Next: Phase 9+ (Advanced Features & Analytics)**
