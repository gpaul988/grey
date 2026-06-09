# Grey Infotech — Big Build (multi-phase)

## Run command (production, stays alive on 4GB)
  npx next build   (capped heap) THEN  ./run-server.sh   on port 3000
  Dev mode OOMs — always prod build.
  Admin login: hello@greyinfotech.com.ng / GreyAdmin@2026
  Seed client pw: ClientPass@2026 (only for NEW clients; old 3 seeded clients have no pw)

## DECISIONS
- AI assistant SKIPPED (no LLM key). Keep Tawk.io for human chat.
- Magic-link client login is primary; password login secondary.
- Permissions: config/permissions.ts (role defaults + per-user JSON override in users.permissions).
- Migrations run automatically + synchronously on boot (db/index.ts passes db into migrate(db)).

## PHASES
- P1 = profiles + roles/permissions + dashboard graphs  <- IN PROGRESS
- P2 = client portal (magic-link login, projects/progress, invoices, brief form, file uploads, messaging)
- P3 = SKIPPED (AI)
- P4 = frontend pulls from backend + update Next/deps + gap audit

## P1 COMPLETE ✓ (committed)
## P1 PROGRESS
1. [x] Add new types (Client w/ pw, ClientToken, ProjectBrief, Upload) — types.ts
2. [x] Schema: clients pw/status/last_login, users.permissions, conversations.project_id,
       new tables client_tokens/project_briefs/uploads. addColumnIfMissing helper.
3. [x] Boot migration synchronous (migrate(db)) — VERIFIED tables+cols exist.
4. [x] models/clients.ts — magic-link createLoginToken/verifyToken, verifyPassword, CRUD. VERIFIED round-trip.
5. [x] models/index.ts — Clients=ClientsModel, ProjectBriefs, Uploads repos. Removed dup line.
6. [x] seed.ts — clients created with await + passwords.
7. [x] config/permissions.ts — userCan/effectivePermissions.
8. [ ] FULL next build + run-server.sh smoke test  <- DOING NOW
9. [x] Avatar upload (multer) /admin/profile/avatar — VERIFIED end-to-end (save+serve+db+session).
       Wire into apps-user-profile.ejs.
10.[x] Roles/permissions UI in apps-team.ejs (grouped checkboxes, delta-stored) + requirePermission enforced on 11 admin page routes + requireApiPermission helper. VERIFIED: staff granted team.view->200, revoked invoices.view->403. Middleware hydrates perms from DB.
    TODO polish: hide sidebar nav items user lacks permission for (partials/sidenav).
11.[x] Dashboard graphs: chartData() aggregations (leads/submissions line, revenue area, projects donut, tickets bar) -> ApexCharts in index.ejs. VERIFIED via screenshot, live data renders.

## P2 (later)
- Client portal: /portal login via token, dashboard projects/progress, invoices,
  project brief form, file uploads, ticket, two-way messaging (conversations/messages).

## P4 (later)
- Frontend services/portfolio/blog/FAQ/pricing from backend; update Next.js+deps; gap audit.
