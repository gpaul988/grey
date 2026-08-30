# cPanel Deployment Guide

## Setup Complete ✅

Your Graham Sobiribo Paul project is configured for automated deployment to cPanel via GitHub Actions.

### Deployment Details
- **Domain:** greyinfotech.com.ng
- **Deploy Path:** `/home/greyinf1/public_html/grey/`
- **Trigger:** Automatic on every push to `main` branch
- **Workflow:** `.github/workflows/deploy.yml`

---

## How It Works

1. **Push to main** → GitHub Actions triggers automatically
2. **Test phase** runs (TypeScript + Vitest)
3. **Build phase** compiles Next.js app
4. **Deploy phase** (if tests pass):
   - SSHes into your cPanel server
   - Copies build files (`.next/`, `public/`)
   - Installs dependencies
   - Restarts the application
5. **Verification** confirms deployment success

---

## GitHub Secrets Configured

The following secrets are stored in your GitHub repository (not in git):

```
CPANEL_HOST       = server1
CPANEL_USER       = greyinf1
CPANEL_SSH_KEY    = [your SSH private key]
```

**These are encrypted and only used during GitHub Actions runs.**

---

## Manual Deployment (If Needed)

If you need to deploy manually without pushing code:

```bash
# 1. Build locally
npm run build

# 2. SSH into cPanel
ssh greyinf1@server1

# 3. Navigate to deployment directory
cd /home/greyinf1/public_html/grey

# 4. Update files
scp -r .next/ greyinf1@server1:/home/greyinf1/public_html/grey/
scp -r public/ greyinf1@server1:/home/greyinf1/public_html/grey/

# 5. Install & restart
npm ci --production
npm run build
```

---

## Troubleshooting

### Deployment fails with "Permission denied"
- Check that `CPANEL_SSH_KEY` is correctly formatted
- Verify SSH key permissions: `chmod 600 ~/.ssh/cpanel_key`
- Test manually: `ssh -i your-key greyinf1@server1`

### Build fails in GitHub Actions
- Check workflow logs: GitHub → Repo → Actions → Failed workflow
- Verify all dependencies install: `npm install`
- Test locally: `npm run build`

### Deploy path doesn't exist
- The workflow auto-creates `/home/greyinf1/public_html/grey`
- Ensure you have write permissions on cPanel

### SSH connection timeout
- Check firewall allows SSH (port 22) from GitHub Actions IP
- Verify hostname `server1` is correct
- Try: `ssh -v greyinf1@server1` locally to debug

---

## Environment Variables on cPanel

If your app needs `.env.local` on the server, you can:

1. SSH into cPanel
2. Create `.env.local` in `/home/greyinf1/public_html/grey/`
3. Add your environment variables

Example:
```bash
ssh greyinf1@server1
cd /home/greyinf1/public_html/grey
cat > .env.local << EOF
DATABASE_URL=postgresql://...
API_KEY=...
EOF
```

---

## Rollback

If a deployment breaks your site:

1. SSH into cPanel: `ssh greyinf1@server1`
2. Check git history: `cd /home/greyinf1/public_html/grey && git log --oneline`
3. Revert to previous commit: `git checkout <commit-hash>`
4. Rebuild: `npm ci && npm run build`

---

## Monitoring Deployments

1. Go to GitHub → Your Repo → Actions tab
2. Watch the workflow run in real-time
3. Check logs for any errors
4. Green checkmark ✅ = Success

---

## Next Steps

1. **Test with a push:** Make a small change to `main` branch
2. **Check GitHub Actions:** See the workflow run
3. **Verify on cPanel:** Visit `greyinfotech.com.ng/grey/` (if configured)
4. **Monitor logs:** `ssh greyinf1@server1 "tail -f /var/log/cPanel.log"`

---

## Support

For deployment issues:
- Check GitHub Actions logs
- Verify SSH connectivity manually
- Review cPanel account permissions
- Contact cPanel support if firewall blocks SSH

---

**Last Updated:** 2026-08-30 13:23:18
**Status:** ✅ Configured & Ready
