# GitHub Actions Deployment Secrets Setup

## Overview
The Grey project uses GitHub Actions to automatically build and deploy to cPanel. This document explains how to configure the required secrets.

## Secrets Required

### 1. CPANEL_SSH_KEY
Your cPanel server's SSH private key (for passwordless authentication)

**How to get it:**
```bash
# On your local machine or cPanel server:
cat ~/.ssh/id_rsa
# Copy the entire key including -----BEGIN RSA PRIVATE KEY----- and -----END RSA PRIVATE KEY-----
```

**How to add to GitHub:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `CPANEL_SSH_KEY`
4. Paste the private key
5. Click "Add secret"

### 2. CPANEL_HOST
Your cPanel server's hostname

**Example:** `server1.greyinf1.com` or `greyinfotech.com`

**How to add to GitHub:**
1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `CPANEL_HOST`
4. Value: Your server hostname
5. Click "Add secret"

### 3. CPANEL_USER
Your cPanel username

**Example:** `greyinf1`

**How to add to GitHub:**
1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `CPANEL_USER`
4. Value: Your cPanel username
5. Click "Add secret"

## Workflow

When you push to `main` branch:
1. **Test phase** - Runs TypeScript check
2. **Build phase** - Builds Next.js app
3. **Deploy phase** - (only if all 3 secrets are configured)
   - Checks if secrets exist
   - Connects to cPanel via SSH
   - Uploads build files (.next, public, package files)
   - Installs dependencies on cPanel
   - Verifies deployment

If any secret is missing, deployment is skipped with a helpful warning.

## Troubleshooting

### "Deployment skipped - secrets not configured"
- Check that all 3 secrets are added to GitHub
- Verify secret names are exact (case-sensitive): `CPANEL_SSH_KEY`, `CPANEL_HOST`, `CPANEL_USER`
- Secrets may take a minute to sync after adding

### SSH connection failed
- Verify cPanel SSH key is correct
- Check that CPANEL_HOST is reachable: `ping your-host.com`
- Ensure CPANEL_USER is correct
- Add your GitHub runner's IP to cPanel firewall (if restricted)

### Permission denied (publickey)
- SSH key may not be authorized on cPanel
- Add GitHub action runner's public key to `~/.ssh/authorized_keys` on cPanel:
  ```bash
  ssh user@cpanel-host
  mkdir -p ~/.ssh
  # Paste GitHub action runner public key into authorized_keys
  echo "runner-public-key" >> ~/.ssh/authorized_keys
  chmod 600 ~/.ssh/authorized_keys
  ```

## Deployment Path

Files are deployed to:
```
/home/{CPANEL_USER}/public_html/grey/
```

Make sure this directory exists on cPanel or can be created by the deployment user.

## Next Steps

1. Configure all 3 secrets
2. Push to main branch
3. Check Actions tab to monitor deployment
4. Verify files appear on cPanel server

For more details, see `.github/workflows/deploy.yml`
