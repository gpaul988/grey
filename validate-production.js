#!/usr/bin/env node
/**
 * Production Deployment Validator
 * Runs checks to ensure project is ready for cPanel deployment
 * 
 * Usage: node validate-production.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

const icons = {
  pass: '✅',
  fail: '❌',
  warn: '⚠️',
  info: 'ℹ️',
};

let passCount = 0;
let failCount = 0;
let warnCount = 0;

function log(icon, color, message) {
  console.log(`${icon} ${color}${message}${colors.reset}`);
}

function pass(message) {
  log(icons.pass, colors.green, message);
  passCount++;
}

function fail(message) {
  log(icons.fail, colors.red, message);
  failCount++;
}

function warn(message) {
  log(icons.warn, colors.yellow, message);
  warnCount++;
}

function info(message) {
  log(icons.info, colors.blue, message);
}

function section(title) {
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

function checkFile(file, description) {
  if (fs.existsSync(file)) {
    pass(`${description} exists`);
    return true;
  } else {
    fail(`${description} missing: ${file}`);
    return false;
  }
}

function checkEnvVar(envFile, variable, description) {
  const content = fs.readFileSync(envFile, 'utf-8');
  const regex = new RegExp(`^${variable}=`, 'm');
  if (regex.test(content)) {
    const match = content.match(new RegExp(`^${variable}=(.*)$`, 'm'));
    const value = match ? match[1].substring(0, 20) : 'SET';
    pass(`${description}: ${value}${value.length === 20 ? '...' : ''}`);
    return true;
  } else {
    fail(`${description} not set in .env.local`);
    return false;
  }
}

// ============================================================================
// MAIN VALIDATION
// ============================================================================

console.log(`\n${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.blue}║  Grey InfoTech — Production Deployment Validator           ║${colors.reset}`);
console.log(`${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}`);

// Check 1: Environment File
section('1️⃣  Environment Configuration');
if (checkFile('.env.local', '.env.local file')) {
  checkEnvVar('.env.local', 'NODE_ENV', 'Node environment');
  checkEnvVar('.env.local', 'DB_TYPE', 'Database type (should be mysql)');
  checkEnvVar('.env.local', 'DB_HOST', 'Database host');
  checkEnvVar('.env.local', 'DB_USER', 'Database user');
  checkEnvVar('.env.local', 'DB_PASS', 'Database password');
  checkEnvVar('.env.local', 'SMTP_HOST', 'SMTP host');
  checkEnvVar('.env.local', 'SMTP_USER', 'SMTP user');
  checkEnvVar('.env.local', 'SMTP_PASSWORD', 'SMTP password');
  checkEnvVar('.env.local', 'SESSION_SECRET', 'Session secret');
  checkEnvVar('.env.local', 'CSRF_SECRET', 'CSRF secret');
  checkEnvVar('.env.local', 'NEXT_PUBLIC_TAWK_PROPERTY_ID', 'Tawk property ID');
  checkEnvVar('.env.local', 'NEXT_PUBLIC_TAWK_WIDGET_ID', 'Tawk widget ID');
} else {
  fail('Cannot proceed without .env.local');
}

// Check 2: Critical Files
section('2️⃣  Critical Files');
checkFile('server.ts', 'Express server');
checkFile('server.js', 'App entry point (server.js)');
checkFile('package.json', 'Package configuration');
checkFile('package-lock.json', 'Dependency lock file');
checkFile('tsconfig.json', 'TypeScript configuration');
checkFile('.htaccess', 'Apache/Passenger config');
checkFile('DEPLOY-CPANEL.md', 'Deployment guide');

// Check 3: Directory Structure
section('3️⃣  Directory Structure');
['Admin', 'app', 'components', 'lib', 'public'].forEach(dir => {
  checkFile(dir, `Directory: ${dir}`);
});

// Check 4: Admin Backend Files
section('4️⃣  Admin Backend');
checkFile('Admin/routes/api.ts', 'Admin API routes');
checkFile('Admin/routes/auth.ts', 'Admin authentication');
checkFile('Admin/db/index.ts', 'Database layer');
checkFile('Admin/db/mysql.ts', 'MySQL adapter');
checkFile('Admin/db/seed.ts', 'Database seed script');
checkFile('Admin/utils/mailer.ts', 'Mail utility');
checkFile('Admin/public', 'Admin static assets (JS/CSS)');

// Check 5: Build Artifacts
section('5️⃣  Build Status');
if (fs.existsSync('.next')) {
  pass('.next/ build directory exists');
  if (fs.existsSync('.next/server')) {
    pass('Standalone build detected (server)');
  } else {
    warn('Could not verify standalone build structure');
  }
} else {
  warn('.next/ not found (run npm run build before production)');
}

// Check 6: Dependencies
section('6️⃣  Dependencies');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const hasNext = pkg.dependencies.next;
  const hasExpress = pkg.dependencies.express;
  const hasMysql2 = pkg.dependencies.mysql2;
  const hasTs = pkg.devDependencies.typescript;
  
  hasNext ? pass('Next.js configured') : fail('Next.js missing');
  hasExpress ? pass('Express configured') : fail('Express missing');
  hasMysql2 ? pass('mysql2 (MySQL driver) configured') : fail('mysql2 missing — required for production');
  hasTs ? pass('TypeScript configured') : fail('TypeScript missing');
  
  if (!hasNext || !hasExpress) {
    warn('Missing critical dependencies — run npm ci');
  }
} catch (e) {
  fail(`Cannot read package.json: ${e.message}`);
}

// Check 7: Git Status
section('7️⃣  Git Status');
try {
  const gitStatus = execSync('git status --porcelain 2>/dev/null || echo "git not available"').toString().trim();
  if (gitStatus === 'git not available') {
    warn('Git not available (not in git repo or git not installed)');
  } else if (gitStatus === '') {
    pass('Working directory clean (no uncommitted changes)');
  } else {
    warn(`Uncommitted changes detected:\n${gitStatus.split('\n').map(l => '   ' + l).join('\n')}`);
  }
} catch (e) {
  warn(`Could not check git status: ${e.message}`);
}

// Check 8: Gitignore Configuration
section('8️⃣  Security (.gitignore)');
const gitignoreContent = fs.existsSync('.gitignore') ? fs.readFileSync('.gitignore', 'utf-8') : '';
const critical = ['.env.local', 'node_modules', '.secrets.json', '.next'];
critical.forEach(pattern => {
  if (gitignoreContent.includes(pattern)) {
    pass(`${pattern} is gitignored`);
  } else {
    fail(`${pattern} is NOT gitignored (security risk!)`);
  }
});

// Check 9: Code Quality
section('9️⃣  Code Quality');
try {
  info('Checking TypeScript...');
  let tsCheck = '';
  try {
    tsCheck = execSync('npx tsc --noEmit 2>&1').toString();
  } catch (e) {
    tsCheck = e.stdout ? e.stdout.toString() : e.message;
  }
  if (tsCheck.includes('error TS')) {
    fail('TypeScript errors detected');
    console.log(`${colors.gray}${tsCheck}${colors.reset}`);
  } else {
    pass('TypeScript compiles successfully');
  }
} catch (e) {
  warn(`TypeScript check skipped: ${e.message}`);
}

// Check 10: Production Readiness Summary
section('1️⃣0️⃣  Production Readiness Summary');
const totalIssues = failCount + warnCount;
const readinessPercent = Math.max(0, 100 - (failCount * 10 + warnCount * 5));

if (failCount === 0 && warnCount === 0) {
  pass(`✨ PROJECT IS PRODUCTION READY! ✨`);
} else if (failCount === 0) {
  info(`${warnCount} warning(s) detected — review and fix before deployment`);
} else {
  fail(`${failCount} critical error(s) detected — STOP, fix before deployment`);
}

// Summary Table
console.log(`\n${colors.blue}Summary:${colors.reset}`);
console.log(`  ${colors.green}${passCount} passed${colors.reset}`);
if (warnCount > 0) console.log(`  ${colors.yellow}${warnCount} warnings${colors.reset}`);
if (failCount > 0) console.log(`  ${colors.red}${failCount} failures${colors.reset}`);
console.log(`\n${colors.blue}Readiness Score: ${readinessPercent}%${colors.reset}`);

// Next Steps
console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
console.log(`${colors.blue}Next Steps:${colors.reset}`);
if (failCount > 0) {
  console.log(`${colors.red}  1. Fix ${failCount} critical errors above${colors.reset}`);
  console.log(`${colors.red}  2. Re-run this validator${colors.reset}`);
} else {
  console.log(`  1. Set up MySQL locally (or Docker)`);
  console.log(`  2. Run: npm run bootstrap:db:mysql`);
  console.log(`  3. Run: npm run seed`);
  console.log(`  4. Run: npm run build`);
  console.log(`  5. Run: npm run start`);
  console.log(`  6. Test locally (login, SMTP, Tawk)`);
  console.log(`  7. Follow PRODUCTION_CHECKLIST.md for cPanel deployment`);
}
console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

process.exit(failCount > 0 ? 1 : 0);
