import db from '../Admin/db';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const email = 'graham@greyinfotech.com.ng';
  const password = '1Uriel2Sobiribo3';

  try {
    // Delete existing user if any
    db.prepare('DELETE FROM users WHERE email = ?').run(email.toLowerCase());
    console.log('✓ Cleaned up existing user');

    // Hash password
    const hash = await bcrypt.hash(password, 12);

    // Create admin user
    const info = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, status, email_verified, verified_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run(
      'Graham (SuperAdmin)',
      email.toLowerCase(),
      hash,
      'admin',
      'active',
      1,
      new Date().toISOString()
    );

    console.log('✅ SUPERADMIN USER CREATED');
    console.log('📧 Email: graham@greyinfotech.com.ng');
    console.log('🔑 Password: 1Uriel2Sobiribo3');
    console.log('👤 Role: admin (superadmin)');
    console.log('✓ Email verified: YES');
    console.log('✓ Status: active');
    console.log('\n🔗 Login at: /admin/login');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin().then(() => process.exit(0));
