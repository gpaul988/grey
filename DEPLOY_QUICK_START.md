# Deploy Quick Start (5 minutes)

## For cPanel Deployment

### 1. Build Locally
```bash
npm run build
```

### 2. Create Tar
```bash
tar -czf grey-prod.tar.gz .next/ pages/ public/ package.json package-lock.json
```

### 3. Upload via SCP
```bash
scp grey-prod.tar.gz user@your-cpanel-domain.com:/home/user/app-deploy/
```

### 4. Deploy via SSH
```bash
ssh user@your-cpanel-domain.com

cd /home/user/app-deploy
tar -xzf grey-prod.tar.gz
npm install --production

# If using PM2:
pm2 start server.js --name grey
pm2 save

# If using cPanel Node.js Selector:
# Restart via cPanel UI
```

### 5. Verify
```bash
curl https://your-cpanel-domain.com/api/health
# Should return: {"status":"ok"}
```

---

## For Mobile (Expo)

### Prerequisites
```bash
npm install -g eas-cli
eas login  # Use your Expo account
```

### Build & Submit
```bash
cd grey-mobile

# Android
eas build --platform android
eas submit --platform android

# iOS
eas build --platform ios
eas submit --platform ios
```

---

## For GitHub Actions

### 1. Add Secrets to GitHub
Go to: **Repo Settings > Secrets and variables > Actions**

Add these secrets:
- `CPANEL_SSH_KEY` — Your SSH private key
- `CPANEL_HOST` — your-cpanel-domain.com
- `CPANEL_USER` — your cPanel username
- `EAS_TOKEN` — Output of `eas token` command

### 2. Push to Main
```bash
git push origin main
```

CI/CD automatically:
- ✅ Runs tests
- ✅ Builds web
- ✅ Deploys to cPanel
- ✅ Builds mobile APK/IPA

### 3. Monitor
- **GitHub:** Actions tab
- **Sentry:** https://sentry.io/ (errors)
- **EAS:** https://expo.dev (mobile builds)

---

## Troubleshooting

### Web won't start
```bash
ssh user@your-cpanel-domain.com
pm2 logs grey
# Check for DATABASE_URL, JWT_SECRET env vars
```

### cPanel says "no Node.js selected"
1. Go to cPanel > Node.js Selector
2. Create new app → set startup file to: `server.js`
3. Click Green "Restart"

### Mobile build fails
```bash
# Check credentials
eas credentials --platform android
eas credentials --platform ios

# Rebuild
eas build --platform android --profile production --non-interactive
```

---

See **PHASE_8_DEPLOYMENT.md** for detailed instructions.
