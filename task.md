# Task: make admin login work perfectly for live — DONE

## Fixed
1. [x] Express 4->5 + EJS 3->6 upgrade (dc07a268). tsc 0 errors.
2. [x] CRITICAL Express-5 wildcard bug: `/` was 308-looping to itself.
       server.ts switched back to `parse(url,true)` for Next handle. All routes 200.
3. [x] Login UX hardening (auth.ts): password is checked FIRST via new
       Users.checkPassword(). Wrong creds ALWAYS say "Invalid email or password"
       regardless of verification state -> kills the autofill "not verified" confusion.
       Only a CORRECT password on an unactivated account shows actionable
       "set your password" guidance.
4. [x] seed.ts: on populated DB now runs idempotent ensureCoreAdmins() — repairs/creates
       hello@/pm@/support@ as active+verified. graham@ stays pending by design.
5. [x] Recreated scripts/verify-admin.ts (+ SQL one-liner for cPanel).
6. [x] Full e2e: valid login->dashboard, wrong pw->invalid, unknown->invalid,
       superadmin pending->invalid; all admin/store pages 200; logout ok;
       set-password activation flow works end-to-end on Express 5.
7. [x] npm run build passes (exit 0).
8. [ ] commit + push.

## Live login facts
- hello@greyinfotech.com.ng / GreyAdmin@2026  -> works (admin)
- graham@ superadmin = pending by design, activates via set-password email link.
- If a seeded admin ever shows "not verified" on server: run
  `npx tsx scripts/verify-admin.ts` (or the SQL one-liner in that file).
