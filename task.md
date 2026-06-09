# Grey Build — New Requirements (session)

## Goals
1. **Email verification system** — on account creation, send unique-ID verification email; user verifies before active.
2. **Super admin / CEO** — Graham Sobiribo Paul, graham@greyinfotech.com.ng. Seeded as `superadmin` role, must verify email + set password via link.
3. **Client staff sub-accounts** — client can add 2-3 staff to a conversation ONLY after payment verified (client has ≥1 paid invoice).
4. **Profile picture change** — all users (team + clients + client-staff) can change avatar.
5. **Gap audit** — find missing pieces, build, fix all errors/warnings.
6. Push to GitHub when done.

## Plan
- [x] Audit current state (models, routes, schema, server)
- [ ] Central mailer util: `Admin/utils/mailer.ts` (reuse SMTP-optional pattern, dev fallback logs link)
- [ ] Schema: `email_verifications` table (token, target user/client, purpose), `client_staff` table, `conversation_participants`, add `email_verified`/`verified_at` + `superadmin` role.
- [ ] Types updates
- [ ] Users model: superadmin support, verification token create/verify, setPassword
- [ ] Clients model: staff sub-accounts + payment-gated participant add
- [ ] Verification model
- [ ] Auth routes: register triggers verification email; `/verify-email/:token` page; `/set-password/:token`
- [ ] Avatar upload for clients & client-staff (portal)
- [ ] API: client-staff CRUD gated by payment; conversation participants
- [ ] Seed: CEO superadmin (unverified, invite link)
- [ ] Permissions: superadmin all + above admin
- [ ] EJS: verify-email view, set-password view, team UI superadmin badge
- [ ] Build (`npx next build`), fix all TS errors/warnings
- [ ] Start prod server, smoke test
- [ ] Commit + push

## Notes
- Dev OOMs — always prod build then run-server.sh
- Magic-link infra already exists for clients (client_tokens). Reuse pattern.
- Payment verified = client has invoice with status='paid'.

## DONE (this session)
- [x] Mailer (SMTP-optional, dev links)
- [x] Schema: email_verifications, client_staff, conversation_participants, project_briefs, email_verified col, superadmin role
- [x] Verification model + flows (verify-email, set-password) for team + clients + client_staff
- [x] CEO superadmin seeded (graham@greyinfotech.com.ng, unverified -> set-password link)
- [x] Client staff sub-accounts (max 3), payment-gated (>=1 paid invoice)
- [x] Conversation participants (add/remove staff, owner+paid gated)
- [x] Profile avatar upload: team (/admin/profile/avatar) + clients/staff (/portal/profile/avatar)
- [x] Portal: login (pw + magic-link), dashboard, staff, messages, brief form
- [x] Fixed portal view render: bypass express-ejs-layouts via direct ejs.renderFile (include-in-closure bug)
- [x] Build clean (npx next build), prod server smoke-tested all routes 200
- [x] Verified payment gate blocks unpaid client; superadmin badge shows on team page
- [ ] Commit + push to origin/admin-backend
