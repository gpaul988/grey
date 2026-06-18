import bcrypt from 'bcryptjs';
import { db, getDb } from '../../lib/db';
import { users } from '../../lib/db/schema';
import { eq } from 'drizzle-orm';

export type User = {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  role: string;
  avatar?: string;
  phone?: string;
  status: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
};

// PostgreSQL row type (camelCase)
type PgUser = {
  id: number;
  name: string;
  email: string;
  passwordHash?: string;
  role: string;
  avatar?: string;
  phone?: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Omit<User, 'password_hash'>;

// Convert PostgreSQL row to User type (snake_case)
const pgToUser = (pg: PgUser): User => ({
  id: pg.id,
  name: pg.name,
  email: pg.email,
  password_hash: pg.passwordHash,
  role: pg.role,
  avatar: pg.avatar,
  phone: pg.phone,
  status: pg.status,
  email_verified: pg.emailVerified,
  created_at: pg.createdAt,
  updated_at: pg.updatedAt,
});

const stripPassword = (u: User): SafeUser => {
  const { password_hash, ...safe } = u;
  return safe;
};

export const UsersModel = {
  async all(): Promise<SafeUser[]> {
    const rows = (await getDb().query.users.findMany()) as PgUser[];
    return rows.map(r => stripPassword(pgToUser(r)));
  },

  async find(id: number): Promise<SafeUser | null> {
    const row = (await getDb().query.users.findFirst({
      where: eq(users.id, id),
    })) as PgUser | undefined;
    return row ? stripPassword(pgToUser(row)) : null;
  },

  async findByEmail(email: string): Promise<SafeUser | null> {
    const row = (await getDb().query.users.findFirst({
      where: eq(users.email, email),
    })) as PgUser | undefined;
    return row ? stripPassword(pgToUser(row)) : null;
  },

  async create(data: {
    name: string;
    email: string;
    password?: string;
    role?: string;
    status?: string;
    email_verified?: boolean;
  }): Promise<SafeUser> {
    const passwordHash = data.password ? await bcrypt.hash(data.password, 10) : undefined;

    const [result] = await getDb()
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role || 'staff',
        status: data.status || 'active',
        emailVerified: data.email_verified || false,
      })
      .returning();

    return stripPassword(pgToUser(result as PgUser));
  },

  async checkPassword(email: string, password: string): Promise<SafeUser | null> {
    const row = (await getDb().query.users.findFirst({
      where: eq(users.email, email),
    })) as PgUser | undefined;

    if (!row || !row.passwordHash) return null;

    const match = await bcrypt.compare(password, row.passwordHash);
    if (!match) return null;
    
    return stripPassword(pgToUser(row));
  },

  async update(
    id: number,
    data: Partial<{
      name: string;
      password: string;
      avatar: string;
      phone: string;
      status: string;
      email_verified: boolean;
    }>
  ): Promise<SafeUser | null> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.password) updateData.passwordHash = await bcrypt.hash(data.password, 10);
    if (data.avatar) updateData.avatar = data.avatar;
    if (data.phone) updateData.phone = data.phone;
    if (data.status) updateData.status = data.status;
    if (data.email_verified !== undefined) updateData.emailVerified = data.email_verified;

    updateData.updatedAt = new Date();

    const [result] = await getDb()
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    return result ? stripPassword(pgToUser(result as PgUser)) : null;
  },

  async delete(id: number): Promise<boolean> {
    await getDb()
      .delete(users)
      .where(eq(users.id, id));
    return true;
  },

  async count(): Promise<number> {
    const result = await getDb().query.users.findMany();
    return result.length;
  },

  async findByRole(role: string): Promise<SafeUser[]> {
    const rows = (await getDb().query.users.findMany()) as PgUser[];
    return rows
      .filter(u => u.role === role)
      .map(r => stripPassword(pgToUser(r)));
  },
};
