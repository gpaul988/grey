# Quick Start - Auth & TawkChat

## 🚀 Local Development (5 min)

### 1. Copy env file
```bash
cp .env.example .env.local
```

### 2. Start server
```bash
npm run dev
```

### 3. Test TawkChat
- Visit http://localhost:3000
- Look for chat widget in bottom-right
- Console should show `[HMR] connected` ✓

### 4. Test Auth
- Login at `/admin` 
- Copy token from localStorage: `admin-token`
- Test with curl:
```bash
curl -X GET http://localhost:3000/api/admin/audits \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📦 Production Deployment (cPanel)

### 1. SSH or use cPanel UI

```bash
ssh greyinf1@server1
cd public_html/grey
git pull origin main  # Latest code
```

### 2. Set Environment Variables

**Via cPanel Node.js App Manager > Edit Variables:**
```
ADMIN_JWT_SECRET=<generate-new-secret-below>
NEXT_PUBLIC_TAWK_PROPERTY_ID=6a1ba828a3242d1c2ed9db1d
NEXT_PUBLIC_TAWK_WIDGET_ID=1jpu0ho3p
```

**Generate new JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Restart App
- cPanel auto-restarts after saving variables
- Or manual restart via cPanel UI

### 4. Verify
```bash
curl https://your-domain.com  # Should load without errors
curl https://your-domain.com/api/admin/audits  # Should get 401 (no token)
```

---

## 🔐 JWT Token Quick Reference

### Get Token
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"graham@greyinfotech.com.ng","password":"password"}'
```

### Use Token
```bash
# ALL these work:
curl -H "Authorization: Bearer $TOKEN" ...
curl -H "authorization: Bearer $TOKEN" ...
```

### Token Lifespan
- Expires in: **7 days**
- Valid scopes: **all admin endpoints**
- Stored in: localStorage (`admin-token`)

### Token Roles
- `superadmin` - Everything (CMS CRUD, audit management)
- `admin` - Read/manage audits (not CMS)
- `manager` - View-only (no edits)

---

## ⚠️ Console Warnings (Don't Panic)

| Message | Status | Action |
|---------|--------|--------|
| "i18next is not a function" | ℹ️ Tawk noise | Ignore |
| "[HMR] connected" | ✅ Normal | Ignore |
| "React DevTools" suggestion | ℹ️ Optional | Ignore |
| "CSP directive" warning | ⚠️ Non-breaking | Ignore |
| "Image aspect ratio" | ✅ Fixed | Already resolved |

---

## 🛠️ Troubleshooting 30-Second Fix

### TawkChat not showing?
```bash
# Check env vars set
echo $NEXT_PUBLIC_TAWK_PROPERTY_ID
echo $NEXT_PUBLIC_TAWK_WIDGET_ID

# Must be non-empty. If empty in cPanel, restart app after setting.
```

### Auth endpoint returns 403?
```bash
# Make sure token is from superadmin
# Login with: graham@greyinfotech.com.ng + superadmin password
# Not: admin@... (admin role can't access CMS creation)
```

### Deployment not showing chat?
```bash
# On cPanel server:
tail -f logs/error_log

# Look for:
# - ADMIN_JWT_SECRET undefined
# - Module 'next' not found
# - Port already in use
```

---

## 📝 Files Modified

| File | Change |
|------|--------|
| `.env.example` | +3 new vars (TAWK, JWT_SECRET) |
| `app/layout.tsx` | Use env vars for TawkChat |
| `app/api/cms/pages/*` | Add JWT auth (4 endpoints) |
| `app/api/admin/audits/*` | Add JWT auth (3 endpoints) |
| `screens/*.tsx` | Fix image height (startup.jpg) |

---

## 📚 Full Documentation

- **Auth**: See `AUTH_IMPLEMENTATION.md`
- **TawkChat**: See `TAWKCHAT_SETUP.md`
- **Errors**: See `CONSOLE_ERRORS_RESOLVED.md`

---

## ✅ Deployment Checklist

- [ ] Generate new `ADMIN_JWT_SECRET` (not the placeholder)
- [ ] Set all 3 TAWK/JWT env vars in cPanel
- [ ] Restart Node app
- [ ] Test TawkChat loads (bottom-right widget)
- [ ] Test auth (curl with token)
- [ ] Check logs for errors
- [ ] Clear browser cache & test

---

## 🚨 If Something Breaks

1. **Check env vars:**
   ```bash
   cPanel > Node.js App Manager > Edit Variables
   # All 3 should be set and non-empty
   ```

2. **Check logs:**
   ```bash
   SSH: tail -f logs/error_log
   cPanel: Error Log viewer
   ```

3. **Rollback:**
   ```bash
   git revert <commit>
   npm start
   ```

4. **Contact:**
   - Commit: `ddfe1100` + `d7797a8e`
   - Branch: `main`
   - Date: 2026-08-30 13:23:18

---

Last Updated: 2026-08-30 13:23:18
Ready for Production ✅
