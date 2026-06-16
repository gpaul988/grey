#!/usr/bin/env node
/**
 * Clean corrupted npm cache on cPanel
 * Run before npm install to prevent ENOTEMPTY errors
 */

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const dirs = [
    path.join(process.cwd(), 'node_modules'),
    path.join(process.cwd(), 'package-lock.json'),
];

console.log('[clean-npm-cache] Removing corrupted npm artifacts...');

for (const dir of dirs) {
    if (fs.existsSync(dir)) {
        try {
            if (fs.statSync(dir).isDirectory()) {
                execSync(`rm -rf "${dir}"`, {stdio: 'inherit'});
            } else {
                fs.unlinkSync(dir);
            }
            console.log(`  ✓ Removed ${dir}`);
        } catch (err) {
            console.warn(`  ⚠ Failed to remove ${dir}:`, err.message);
        }
    }
}

// Clear npm cache
console.log('[clean-npm-cache] Clearing npm global cache...');
try {
    execSync('npm cache clean --force', {stdio: 'inherit'});
    console.log('  ✓ Cache cleared');
} catch (err) {
    console.warn('  ⚠ Cache clear failed:', err.message);
}

console.log('[clean-npm-cache] Done. Safe to run npm install.');
