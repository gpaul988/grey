# Phase 1 - Quick Start Guide

## Current Status
✅ Phase 1 Foundation is **complete and tested**
- Commit: `78b6536e`
- Build: 0 TS errors
- Tests: 30 unit tests passing
- Ready: E2E tests (50+ tests)

---

## What's New

### 1. Error Tracking (Sentry)
- Automatically captures errors in React components and server routes
- Shows error ID to users for support
- **Required:** Add `NEXT_PUBLIC_SENTRY_DSN` to `.env.local`

### 2. Logging (Winston)
- Every request logged with correlation ID
- Logs written to `/var/log/grey/combined.log`
- Helps debug issues across frontend/backend

### 3. Two-Factor Authentication (2FA)
- TOTP support (Google Authenticator, Authy, etc.)
- Recovery codes for account recovery
- Endpoints ready: `/admin/api/2fa/*`
- **TODO:** Wire into login flow

### 4. E2E Tests (Playwright)
- 50+ tests covering user flows
- Auto-starts dev server
- Tests auth, store, admin, contact form, API health

---

## Setup Required

### 1. Add Sentry DSN (if using error tracking)
```bash
# Edit .env.local
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/project-id
```

Get DSN from: https://sentry.io → Create Project → Copy DSN

### 2. Create Log Directory
```bash
sudo mkdir -p /var/log/grey
sudo chown $(whoami) /var/log/grey
```

If you don't have sudo, logs will fall back to temp directory.

---

## Running Tests

### Unit Tests (Fast - 1s)
```bash
npm test -- --run
```
✅ 30 tests passing

### E2E Tests (Medium - 30-60s)
```bash
npm run test:e2e
```
- Auto-starts dev server
- Runs all 50+ tests in Chrome + Firefox
- Shows HTML report on completion

### Single E2E Test File
```bash
npm run test:e2e -- tests/e2e/auth.spec.ts
```

### E2E Debug Mode
```bash
npx playwright test --debug
```
Open browser inspector, step through tests

### View E2E Results
```bash
npx playwright show-report
```
Opens HTML test report in browser

---

## Build & Deploy

### Build
```bash
npm run build
# ✓ Compiled successfully
# ✓ TypeScript: 0 errors
# ✓ Pages: 114 static pages prerendered
```

### Development Server
```bash
npm run dev
# Ready on http://localhost:3000
# Logs go to console
```

### Production Server
```bash
npm run build
npm start
# Ready on http://localhost:3000
# Logs written to /var/log/grey/
```

---

## API Health Check

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
# {"ok":true}
```

---

## 2FA Endpoints (Ready for Integration)

### Setup 2FA
```bash
curl -X POST http://localhost:3000/admin/api/2fa/setup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
# Returns: secret, qrCode (base64), recoveryCodes[]
```

### Verify TOTP
```bash
curl -X POST http://localhost:3000/admin/api/2fa/verify \
  -H "Content-Type: application/json" \
  -d '{
    "code": "123456",
    "secret": "...",
    "recoveryCodes": [...]
  }'
# Returns: {ok: true}
```

### Check Status
```bash
curl http://localhost:3000/admin/api/2fa/status
# Returns: {enabled: true, createdAt: "..."}
```

---

## Logging Examples

### View Logs
```bash
# All logs (tail latest 100 lines)
tail -100 /var/log/grey/combined.log | jq .

# Error logs only
tail /var/log/grey/error.log | jq .

# Filter by correlation ID
grep "correlation-id-123" /var/log/grey/combined.log | jq .
```

### Log Format
```json
{
  "timestamp": "2024-06-17 21:05:35.123",
  "level": "info",
  "message": "Incoming request",
  "method": "POST",
  "url": "/api/login",
  "correlationId": "1718651135123-abc123",
  "pid": 12345,
  "env": "production",
  "service": "grey-infotech"
}
```

---

## Next Steps

### Immediate (Before Phase 2)
1. ✅ **Add Sentry DSN** to `.env.local`
2. ✅ **Run E2E tests** to verify everything works
3. ⏳ **Wire 2FA into login** - check password, show 2FA setup
4. ⏳ **Test production build** - verify logs are created

### Phase 2 (Next Week)
- API security hardening (rate limiting, validation)
- Database encryption
- Performance optimization
- Advanced monitoring

---

## Troubleshooting

### Build fails with TS errors
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### E2E tests timeout
```bash
# Increase timeout (30s default)
npm run test:e2e -- --timeout=60000
```

### Logs not created
```bash
# Check permissions
ls -la /var/log/grey/
# If error: create directory manually
mkdir -p ~/logs/grey
# Then set LOG_DIR in .env.local
LOG_DIR=~/logs/grey
```

### Sentry errors not captured
```bash
# Verify DSN is set
grep SENTRY .env.local
# Make sure it's NEXT_PUBLIC_SENTRY_DSN (public key)
```

---

## Key Files

| File | Purpose |
|------|---------|
| `instrumentation.ts` | Sentry server-side setup |
| `components/ErrorBoundary.tsx` | React error catcher |
| `lib/logger.ts` | Winston logging config |
| `Admin/routes/twofa.ts` | 2FA API endpoints |
| `playwright.config.ts` | E2E test config |
| `tests/e2e/*.spec.ts` | E2E test files |
| `pages/api/health.ts` | Health check endpoint |

---

## Support

**Sentry Docs:** https://docs.sentry.io/platforms/javascript/guides/nextjs/  
**Winston Docs:** https://github.com/winstonjs/winston  
**Playwright Docs:** https://playwright.dev/  
**TOTP Spec:** https://tools.ietf.org/html/rfc6238  

---

Last updated: June 17, 2026 | Phase 1 Complete ✅
