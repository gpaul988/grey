# Deploying Grey InfoTech to cPanel (Node.js App / Passenger)

Target: **greyinfotech.com.ng** · Node **20** · cPanel "Setup Node.js App" · SSH available.

The app is a single long-running Node server (`app.js` → `server.ts`) that serves
both the Next.js storefront and the Express admin, backed by a SQLite file.

---

## 0. One-time: what gets uploaded vs built on the server

Do **NOT** upload `node_modules`, `.next`, or `config.env`. Those are built/created
on the server. `better-sqlite3` is a native module and **must** be compiled on the
server with its Node 20 — never copy it from elsewhere.

---

## 1. Get the code onto the server

SSH into your account, then clone (private repo needs a GitHub token or deploy key):

```bash
cd ~
git clone https://github.com/gpaul988/grey.git greyinfotech
cd greyinfotech
```

> If the repo is private, use a token:
> `git clone https://<TOKEN>@github.com/gpaul988/grey.git greyinfotech`

Later updates: `cd ~/greyinfotech && git pull`.

---

## 2. Create the Node.js App in cPanel

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
|---|---|
| Node.js version | **20** |
| Application mode | **Production** |
| Application root | `greyinfotech` (the folder you cloned) |
| Application URL | `greyinfotech.com.ng` |
| Application startup file | **`app.js`** |

Click **Create**. cPanel makes a virtualenv and shows a command like
`source /home/USER/nodevenv/greyinfotech/20/bin/activate`. Keep that handy.

---

## 3. Set environment variables

In the same Node App screen, add these under **Environment variables**
(or put them in `config.env` in the app root — secrets are better in the UI):

```
NODE_ENV=production
APP_URL=https://greyinfotech.com.ng
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng
SESSION_SECRET=<paste a long random string>
SMTP_HOST=greyinfotech.com.ng
SMTP_PORT=465
SMTP_USER=hello@greyinfotech.com.ng
SMTP_PASS=<mailbox password>
SMTP_FROM=Grey InfoTech <hello@greyinfotech.com.ng>
```

Generate the session secret:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Do **not** set `PORT` — Passenger injects it.

> See `config.env.example` for the full annotated list.

---

## 4. Install dependencies (compiles better-sqlite3)

Activate the app's virtualenv (use the exact path cPanel showed you), then install:

```bash
source /home/USER/nodevenv/greyinfotech/20/bin/activate && cd ~/greyinfotech
npm install
```

If `better-sqlite3` fails to build, ensure build tools exist (most cPanels have them).
You can force a source build with:
```bash
npm rebuild better-sqlite3 --build-from-source
```

---

## 5. Build the Next.js frontend

```bash
npm run build
```

This creates `.next/`. Re-run after every `git pull` that changes frontend code.

---

## 6. Create + seed the database

Keep the live DB OUTSIDE the deploy folder so future deploys can't wipe it:

```bash
mkdir -p ~/grey-data
export DB_PATH=~/grey-data/grey.db
npm run seed
```

Then add `DB_PATH=/home/USER/grey-data/grey.db` to the Node App env vars so the
running app uses that same file. (If you skip DB_PATH it lives at
`Admin/data/grey.db` inside the app and survives `git pull` but NOT a fresh clone.)

Seed creates: superadmin `graham@greyinfotech.com.ng` (pending — needs set-password
link), admin `hello@greyinfotech.com.ng`, plus the product catalogue.

---

## 7. Start it

Back in cPanel Node App screen → **Restart** (or **Start**). Visit:

- Storefront: `https://greyinfotech.com.ng`
- Admin: `https://greyinfotech.com.ng/admin` → `/login`

---

## 8. HTTPS / SSL

cPanel → **SSL/TLS Status** → run **AutoSSL** for greyinfotech.com.ng. Required for:
- secure cookies, and
- payment **webhooks** (Paystack/Flutterwave/Monnify need a public HTTPS URL).

---

## 9. Activate the superadmin

Log in as `hello@greyinfotech.com.ng`, go to **Team**, click the green mail icon
next to `graham@greyinfotech.com.ng` to email a set-password link. (SMTP is already
wired, so it sends.) Or use the link printed during seeding.

---

## 10. Payment webhooks

In each gateway dashboard set the webhook URL to your live endpoints, e.g.:
- `https://greyinfotech.com.ng/api/store/webhooks/paystack`
- `https://greyinfotech.com.ng/api/store/webhooks/flutterwave`
- `https://greyinfotech.com.ng/api/store/webhooks/monnify`

(Confirm exact paths in the store routes; superadmin enables gateways + keys in admin.)

---

## Updating later (redeploy)

```bash
source /home/USER/nodevenv/greyinfotech/20/bin/activate && cd ~/greyinfotech
git pull
npm install          # only if dependencies changed
npm run build        # only if frontend changed
# then cPanel → Restart the Node app
```

Your DB (in ~/grey-data) and config.env are untouched by git pull.

---

## Troubleshooting

- **502 / app won't start** → check `~/greyinfotech/stderr.log` and the Node App log.
- **`Cannot find module 'tsx'`** → run `npm install` inside the activated virtualenv.
- **better-sqlite3 ABI error** → `npm rebuild better-sqlite3 --build-from-source`, then Restart.
- **Emails not sending** → confirm SMTP_* env vars are set on the *running* app, port 465.
- **Sessions log you out** → set a stable `SESSION_SECRET` (not the default).
