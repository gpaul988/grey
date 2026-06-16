# cPanel Deployment Guide — Grey Infotech

## After every `git pull` on cPanel

```bash
cd /home/greyinf1/public_html/grey

# 1. Install/update dependencies
npm ci --omit=dev

# 2. Rebuild better-sqlite3 native binary for this server's Node/glibc
npm rebuild better-sqlite3 --build-from-source

# 3. Run DB migrations + seed admin users (first deploy only, or after schema changes)
npm run seed

# 4. Touch app.js to trigger Passenger restart
touch tmp/restart.txt
# OR via cPanel UI: Node.js App → Restart
```

> The app will auto-build Next.js on first boot if `.next` is missing or stale.

---

## If `npm rebuild better-sqlite3 --build-from-source` fails

The server needs C++ build tools. Via SSH:

```bash
# CentOS 7 / RHEL 7 (most cPanel shared hosts):
sudo yum install -y python3 make gcc gcc-c++ kernel-devel

# Then retry:
npm rebuild better-sqlite3 --build-from-source
```

If you can't install build tools (no sudo on shared hosting), contact Hostbeak support and ask them to:
- Install `gcc`, `make`, `python3` on the server node your account is on
- OR upgrade their shared server OS to CentOS 8 / AlmaLinux 8+ (glibc ≥ 2.28)

---

## Why the GLIBC error happens

`better-sqlite3 v12` ships prebuilt binaries compiled on Ubuntu 22.04 which requires `GLIBC_2.38`.  
The cPanel server at `server1.hostbeak.com` runs an older OS with `glibc < 2.38`.  
Rebuilding from source compiles a binary against the server's actual glibc version.

---

## Admin panel

URL: `https://greyinfotech.com.ng/admin`  
Login: `hello@greyinfotech.com.ng` / (set in seed.ts)

Run seed to create users:
```bash
npm run seed
```

---

## Environment variables

All in `config.env` (gitignored). Copy from `config.env.example` and fill in:
- `SESSION_SECRET` — random 32+ char string
- `CSRF_SECRET` — random 32+ char string  
- `DATABASE_URL` — path to SQLite DB (default: `Admin/data/grey.db`)
- `SMTP_*` — email config
- Payment gateway keys (Paystack, Flutterwave)
