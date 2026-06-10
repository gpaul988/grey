/**
 * verify-admin — maintenance script to (re)activate the core admin logins.
 *
 * Marks the standard team accounts as email-verified + active so they can log
 * in immediately. Safe to run any number of times. Does NOT touch the
 * superadmin (graham@), which activates itself via its set-password link.
 *
 * Usage (local):    npx tsx scripts/verify-admin.ts
 * Usage (cPanel):   node --import tsx scripts/verify-admin.ts
 *
 * If you cannot run Node on the server, the equivalent SQL one-liner is:
 *   UPDATE users SET email_verified=1, status='active', verified_at=datetime('now')
 *   WHERE lower(email) IN ('hello@greyinfotech.com.ng','pm@greyinfotech.com.ng','support@greyinfotech.com.ng');
 */
import db from '../Admin/db';

const EMAILS = [
    'hello@greyinfotech.com.ng',
    'pm@greyinfotech.com.ng',
    'support@greyinfotech.com.ng',
];

const update = db.prepare(
    "UPDATE users SET email_verified=1, status='active', verified_at=datetime('now'), updated_at=datetime('now') WHERE lower(email)=lower(?)"
);

let changed = 0;
for (const email of EMAILS) {
    const info = update.run(email);
    if (info.changes > 0) changed += info.changes;
    else console.log(`  (no row found for ${email})`);
}

const rows = db
    .prepare(
        `SELECT id, email, role, status, email_verified, verified_at
         FROM users
         WHERE lower(email) IN (${EMAILS.map(() => '?').join(',')})
         ORDER BY id`
    )
    .all(...EMAILS);

console.log(`\nVerified/activated ${changed} admin account(s).`);
console.table(rows);

db.close();
process.exit(0);
