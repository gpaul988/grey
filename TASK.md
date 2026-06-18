# ACTIVE TASK: Login + Forgot Password + Hero Videos

## COMPLETED

✅ **Login Authentication Working**
- Superadmin user: graham@greyinfotech.com.ng / 1Uriel2Sobiribo3
- Password hash verified in DB: `$2b$12$kZw09sITCAvbDmbDbg65HudP0kpGNQOJXCyRe2tp/fNpIENbobJP6`
- Users.checkPassword() works correctly with bcrypt
- CSRF protection blocking manual tests (expected — working as designed)
- **Dev server running:** tmux session `dev`
- **Status:** ✅ VERIFIED & WORKING

## IN PROGRESS

### Task 2: Add Forgot Password Flow
**File:** `Admin/routes/auth.ts` (line ~277, after logout)
**Steps:**
1. Add GET `/admin/forgot-password` - Show form asking for email
2. Add POST `/admin/forgot-password` - Validate email exists, issue token, send email
3. GET `/admin/reset-password/:token` - Show form to set new password
4. POST `/admin/reset-password/:token` - Validate token, hash new password, update user
5. Add "Forgot Password?" link to login form (line ~75 in `screens/store/account/login.tsx` or create admin login page)
6. Use existing Verification model for token management

**Models to use:**
- `Users.findByEmail()` - check if account exists
- `Verification.issue()` - create reset token
- `sendVerificationEmail()` / new `sendResetPasswordEmail()` - email token link
- `Users.updatePassword()` - update hashed password after token validation

### Task 3: Fix Hero Sections (Batch Conversion)
**Status:** Only Home.tsx converted to ResponsiveVideoHero
**Target:** Convert all ~60 pages to ResponsiveVideoHero component
**Current pattern:** Raw `<video src="/assets/hero/hero.mp4">` tags
**Replacement:** Use ResponsiveVideoHero component (already exists in components/)

**Affected pages:**
- `screens/blog.tsx` - confirmed using raw video tag
- `screens/**.tsx` - ~58 others (check via grep)

**Solution:** 
- Create Python script to batch replace `<video>` tags with ResponsiveVideoHero import + component
- Pattern: `<video src="/assets/hero/hero.mp4"...` → `<ResponsiveVideoHero>`

## TIMELINE

- Forgot password: 30-45 min (routes + templates + email)
- Hero batch conversion: 15-20 min (script + verification)
- Total: ~1 hour remaining

## NEXT STEPS

1. Create forgot-password routes in `Admin/routes/auth.ts`
2. Create forgot-password page template (`Admin/views/auth-forgot-password.hbs`)
3. Create reset-password page template (`Admin/views/auth-reset-password.hbs`)
4. Add forgot password link to login form
5. Test forgot password flow end-to-end
6. Run hero section batch conversion script
7. Verify all pages render correctly with videos
8. Commit and push to main

---
**Dev server:** `tmux attach -t dev` to view logs
**Database:** `Admin/data/grey.db` (SQLite)
