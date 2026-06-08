# Backend fix task

## Root cause
- `npx tsx server.ts` (dev mode) OOM-killed in 4GB box during Next.js on-demand compile. Confirmed via dmesg oom-kill.
- Fix: added 4GB swap + run in PRODUCTION mode (`NODE_ENV=production tsx server.ts`) after `next build`. Prod mode serves prebuilt pages = low memory.

## Tasks
1. [x] Add 4GB swap
2. [ ] next build (capped heap)
3. [ ] Start server in production mode, verify it stays alive
4. [ ] Verify login flow works (POST /admin/login -> dashboard)
5. [ ] Add top-level /login route -> serves admin login (user wants URL /login not /admin/login)
6. [ ] Footer already points to /login (confirmed line 30). Make /login actually work.
7. [ ] Verify admin CRUD pages load (projects, tickets, invoices, etc.)
8. [ ] SMTP_HOST missing -> contact form 500s. Make it graceful (don't crash, log instead).

## Notes
- Admin login: hello@greyinfotech.com.ng / GreyAdmin@2026
- ADMIN_BASE_PATH = /admin, auth routes mounted at /admin

## RESULT — ALL DONE ✓
- Root cause of "backend not working": dev-mode Next.js OOM-killed (4GB box). Fixed by 4GB swap + running PRODUCTION mode (next build + NODE_ENV=production tsx server.ts). Server now stays alive.
- /login now the canonical login URL (was /admin/login). Footer link -> /login works. /admin/login kept for backward compat.
- Auth redirects (logout, guards, register links) all use clean /login,/register,/logout root URLs.
- Contact form no longer 500s without SMTP — lead saved to DB, returns success.
- Verified: login->dashboard, logout->/login, guard redirect->/login, lead persists to submissions inbox.

## Run command (production, stays alive on 4GB):
  ./run-server.sh   (NODE_ENV=production, capped heap) on port 3000
