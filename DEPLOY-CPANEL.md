# Deploying Grey InfoTech to cPanel (Node.js / Passenger)

This app runs locally with `tsx server.ts` — a custom Express server that serves
**both** the Next.js frontend and the `/admin` EJS panel. cPanel can run it, but
it boots Node through **Phusion Passenger**, which needs a plain `.js` startup
file and cannot run TypeScript directly. The included **`server.js`** (and its
identical alias **`app.js`**) bridges that
gap (it spawns `tsx server.ts` for you), so everything that works on localhost
works on cPanel.

> TL;DR — startup file = `server.js` (or `app.js`, they're equivalent). Do the 8 steps below, set env vars, rebuild
> `better-sqlite3`, make sure SSL is on. Done.

---

## 0. Requirements

- cPanel with **"Setup Node.js App"** (CloudLinux + Passenger). Check under
  *Software → Setup Node.js App*.
- **Node.js 20+** selectable (the app targets Node 26 locally; 20 or 22 LTS on
  cPanel is fine).
- SSH access is strongly recommended (some steps are far easier from a terminal).
- An SSL certificate active on the domain (AutoSSL is fine). **Required** — the
  admin panel uses a `__Host-` prefixed CSRF cookie that only works over HTTPS.

---

## 1. Build the frontend locally, then upload

Passenger does not run a build step. Build Next.js **before** uploading.

```bash
# on your machine
npm install
npm run build        # produces the .next/ production build
```

Upload the whole project to your cPanel app folder (e.g.
`/home/USER/greyinfotech`) **including**:

- `app.js`, `server.ts`, `package.json`, `package-lock.json`
- `.next/` (the built output), `next.config.*`, `public/`
- `Admin/` (routes, views, db, middleware), `app/`, `components/`, `lib/`, etc.
- `tsconfig.json`

**Do NOT upload:** `node_modules/`, `config.env`, `Admin/data/.secrets.json`,
`.env.push`. Use the repo's `.gitignore` as the exclusion list.

> Easiest path: `git clone` the repo directly on the server via SSH, then run
> `npm run build` there if the box has enough RAM. Otherwise upload a zip of the
> built project (minus `node_modules`).

---

## 2. Create the Node.js app in cPanel

*Software → Setup Node.js App → Create Application*

- **Node.js version:** 20.x or 22.x (LTS)
- **Application mode:** Production
- **Application root:** the folder you uploaded to (e.g. `greyinfotech`)
- **Application URL:** your domain / subdomain
- **Application startup file:** `server.js`  (or `app.js` — identical)   ← important

Click **Create**.

---

## 3. Install dependencies

In the Node.js App panel, click **Run NPM Install** (it uses
`package-lock.json`). Or from SSH, enter the app's virtualenv (cPanel prints the
exact `source .../bin/activate` command on the app page) and run:

```bash
npm ci --omit=dev=false   # we need tsx + types at runtime, so install all deps
```

> We intentionally install devDependencies too, because `tsx` (the TS runtime)
> lives there and `app.js` needs it.

---

## 4. Rebuild the native SQLite module (critical)

`better-sqlite3` is a native addon. It must be compiled against cPanel's Node
version or the server crashes on boot. From the activated virtualenv:

```bash
npm rebuild better-sqlite3
```

If that fails for lack of a compiler, ask your host to enable build tools, or
install a prebuilt binary:

```bash
npm install better-sqlite3 --build-from-source=false
```

---

## 5. Set environment variables

In the Node.js App panel use **"Add Variable"** (these mirror your local
`config.env`, which is intentionally NOT uploaded). At minimum:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | a long random string |
| `CUSTOMER_SESSION_SECRET` | a long random string |
| `CSRF_SECRET` | a long random string |
| SMTP vars (host/user/pass/port) | your `hello@greyinfotech.com.ng` mailbox |
| `OPENAI_API_KEY` | optional — only if the AI estimator uses it |

> **Self-healing fallback:** if you skip the three secret vars, the app
> auto-generates them and persists to `Admin/data/.secrets.json` on first boot,
> so it still works. Setting them explicitly is cleaner for multi-restart prod.

Generate strong values quickly:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Payment keys (Paystack / Flutterwave / Stripe) are **not** env vars — set them in
the admin UI under **Store → Settings** after the site is up.

---

## 6. Start / Restart

Click **Restart** in the Node.js App panel. Watch the log
(`stderr.log` in the app folder, or the panel's log viewer). A healthy boot ends
with:

```
> Ready on http://localhost:PORT
> Admin on http://localhost:PORT/admin
```

Passenger sets `PORT` automatically — `server.ts` already reads it.

---

## 7. Database

The SQLite DB lives at `Admin/data/grey.db` and auto-migrates on boot. Two
options:

- **Fresh:** let it create + migrate, then seed via SSH: `npm run seed` (or your
  FAQ/seed scripts in `scripts/`).
- **Carry over local data:** upload your local `Admin/data/grey.db` to the same
  path. Make sure the folder is writable by the app user.

---

## 8. Post-deploy checklist

- [ ] HTTPS/SSL active on the domain (AutoSSL). Required for admin login cookie.
- [ ] `npm rebuild better-sqlite3` ran without errors.
- [ ] Secrets set in env (or trusting self-healing `.secrets.json`).
- [ ] Visit `/` → homepage loads. Visit `/admin/login` → login works.
- [ ] In admin: replicate any local-only data tweaks (e.g. deactivate ad id 1 if
      it has no image — that change was made in the LOCAL db only).
- [ ] Set payment gateway keys in **Store → Settings**.
- [ ] Test the partnership form + AI estimator → confirmation emails arrive
      (verifies SMTP).

---

## Troubleshooting

**"We're sorry, something went wrong" (Passenger error page)**
→ Check the app's `stderr.log`. Usually means the build is missing (`.next/`),
deps aren't installed, or `better-sqlite3` needs a rebuild (step 4).

**Admin login redirects in a loop / "can't add" CSRF errors**
→ SSL not active. The admin CSRF cookie is `__Host-` prefixed and `secure:true`,
so it requires HTTPS. Turn on AutoSSL and retry.

**`Cannot find module 'tsx'`**
→ devDependencies were skipped during install. Re-run `npm ci` (without
`--omit=dev`) so `tsx` is present — `app.js` needs it.

**Native module / ABI mismatch on boot**
→ `npm rebuild better-sqlite3` (step 4).

**Site works but emails don't send**
→ SMTP env vars missing/incorrect. Verify against the live `hello@` mailbox
credentials in cPanel → Email Accounts.

---

## Why `app.js` exists

cPanel/Passenger runs a plain CommonJS `.js` entry. Our server is TypeScript
with extensionless imports that only `tsx` resolves. `app.js` is a tiny
CommonJS bootstrap that spawns `tsx server.ts` as a child process, inherits
Passenger's `PORT`, and forwards exit/termination signals. Verified to boot the
full Express + Next + Admin stack identically to `tsx server.ts`.
