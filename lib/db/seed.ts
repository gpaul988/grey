import { db, getPool } from '../db';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Check if superadmin already exists
    const existing = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, 'graham@greyinfotech.com.ng'),
    });

    if (existing) {
      console.log('✓ Superadmin already exists');
      return;
    }

    // Hash password
    const password = process.env.SEED_SUPERADMIN_PASSWORD || '1Uriel2Sobiribo3';
    const passwordHash = await bcrypt.hash(password, 10);

    // Create superadmin
    await db.insert(users).values({
      name: 'Graham Paul',
      email: 'graham@greyinfotech.com.ng',
      passwordHash,
      role: 'superadmin',
      status: 'active',
      emailVerified: true,
    });

    console.log('✓ Superadmin created: graham@greyinfotech.com.ng');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await getPool().end();
  }
}

seedDatabase();
