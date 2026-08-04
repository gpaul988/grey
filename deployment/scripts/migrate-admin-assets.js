#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  // Node 16.7+ supports fs.cp
  if (fs.promises.cp) {
    await fs.promises.cp(src, dest, { recursive: true });
    return;
  }

  // Fallback: manual recursive copy
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const link = await fs.promises.readlink(srcPath);
      await fs.promises.symlink(link, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  try {
    const root = process.cwd();
    const adminPublic = path.join(root, 'Admin', 'public');
    const out = path.join(root, 'public', 'admin');

    if (!fs.existsSync(adminPublic)) {
      console.error('Source admin public directory not found:', adminPublic);
      process.exit(1);
    }

    console.log('Copying admin assets from', adminPublic, 'to', out);
    await copyDir(adminPublic, out);
    console.log('Admin assets copied successfully.');
  } catch (err) {
    console.error('Failed to copy admin assets:', err);
    process.exit(1);
  }
}

main();

