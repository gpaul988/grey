# Deploying Graham Sobiribo Paul to cPanel — File Manager only (no SSH)

Target: **greyinfotech.com.ng** · Node **20** · cPanel "Setup Node.js App".

You don't strictly need SSH. cPanel's **Setup Node.js App** screen has two buttons
that replace the terminal: **Run NPM Install** and **Run JS Script**. As long as those
exist, the whole deploy can be done from the browser.

> ⚠️ `better-sqlite3` is a native module that MUST be compiled on the server. That
> happens during **Run NPM Install**. If your cPanel has neither those buttons nor a
> Terminal, you cannot install deps without SSH — ask your host to run `npm install`
> once, or use a host that allows it.

---

## 1. Get the code in (File Manager)

1. On GitHub: **Code → Download ZIP** of the `grey` repo (main branch).
2. cPanel → **File Manager** → go to your home dir → **Upload** the ZIP.
3. Select the ZIP → **Extract**. Rename the extracted folder to `greyinfotech`.

❗ Before/after uploading, make sure these are NOT included (delete if present):
`node_modules/`, `.next/`, `config.env`. The server builds those itself.

---

## 2. Create the Node.js App

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
|---|---|
| Node.js version | **20** |
| Application mode | **Production** |
| Application root | `greyinfotech` |
| Application URL | `greyinfotech.com.ng` |
| Application startup file | **`app.js`** |

Click **Create**.

---

## 3. Environment variables (same screen)

Add each of these (Add Variable):

```
NODE_ENV=production
APP_URL=https://greyinfotech.com.ng
FRONTEND_BASE_URL=https://greyinfotech.com.ng
BACKEND_BASE_URL=https://greyinfotech.com.ng
SESSION_SECRET=<a long random string>
SMTP_HOST=greyinfotech.com.ng
SMTP_PORT=465
SMTP_USER=hello@greyinfotech.com.ng
SMTP_PASS=<mailbox password>
SMTP_FROM=Graham Sobiribo Paul <hello@greyinfotech.com.ng>
```

Do NOT set PORT (Passenger sets it). For SESSION_SECRET, any long random string
works — e.g. mash 60+ random characters.

---

## 4. Install dependencies — **Run NPM Install** button

On the app's page click **Run NPM Install**. This installs everything AND compiles
`better-sqlite3` for Node 20. Wait for it to finish (can take a minute or two).

If it errors on better-sqlite3, your host may need build tools enabled — open a
support ticket asking them to allow native module builds for your Node app.

---

## 5. Build the frontend — **Run JS Script** button

Click **Run JS Script** → enter **`build`** → Run. This produces `.next/`.
Re-run this any time you upload new frontend code.

---

## 6. Seed the database — **Run JS Script** button

Click **Run JS Script** → enter **`seed`** → Run. Creates `Admin/data/grey.db`
with the superadmin, admin, and product catalogue.

> No-SSH note: the DB lives at `Admin/data/grey.db` inside the app. It survives
> restarts. But if you ever re-upload the whole folder, FIRST download that .db
> via File Manager and put it back after, or you'll lose live data. (With SSH you'd
> move it outside the folder via DB_PATH — not possible cleanly via File Manager.)

---

## 7. Start / Restart

On the app page click **Restart**. Then visit:
- Storefront: `https://greyinfotech.com.ng`
- Admin: `https://greyinfotech.com.ng/admin` → `/login`

---

## 8. SSL

cPanel → **SSL/TLS Status** → run **AutoSSL** for greyinfotech.com.ng.
Required for secure cookies and payment webhooks.

---

## 9. Activate superadmin

Log in as `hello@greyinfotech.com.ng`, go to **Team**, click the green mail icon
next to `graham@greyinfotech.com.ng` to email a set-password link (SMTP is wired).

---

## Updating later (File Manager only)

1. Download new ZIP from GitHub, upload, extract over the folder
   (KEEP `Admin/data/grey.db`, `config.env`, and the env vars — don't overwrite the DB).
2. **Run NPM Install** (only if dependencies changed).
3. **Run JS Script → build** (only if frontend changed).
4. **Restart** the app.

> Tip: redeploys are much safer with SSH + git pull. If you can get even cPanel's
> Terminal enabled, prefer DEPLOY-CPANEL.md instead.

---

## If you have NEITHER the buttons NOR a Terminal

You cannot run `npm install` (so better-sqlite3 can't compile). Options:
- Ask your host's support to run `npm install` in the app folder once.
- Switch the SQLite driver — possible but a code change; ask and I'll do it.
- Move to a host/VPS or a Node platform (Render/Railway) that allows builds.
