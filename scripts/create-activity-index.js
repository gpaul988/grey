// Run: node scripts/create-activity-index.js
// This creates helpful indexes on activity_log for faster queries. Not run automatically.

const path = require('path');
const Database = require('better-sqlite3');

function run() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  try {
    db.pragma('journal_mode = WAL');
    console.log('Creating indexes on activity_log (if not exists)');
    db.prepare("CREATE INDEX IF NOT EXISTS idx_activity_created_at ON activity_log(created_at DESC)").run();
    db.prepare("CREATE INDEX IF NOT EXISTS idx_activity_action ON activity_log(action)").run();
    db.prepare("CREATE INDEX IF NOT EXISTS idx_activity_entity ON activity_log(entity)").run();
    console.log('Done');
  } catch (err) {
    console.error('Failed to create indexes', err);
    process.exit(1);
  } finally {
    db.close();
  }
}

if (require.main === module) run();
module.exports = { run };
