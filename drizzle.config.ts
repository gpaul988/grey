import { defineConfig } from 'drizzle-kit';

// Load env manually to ensure DATABASE_URL is available
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://grey:grey_local@localhost:5432/grey_dev';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://grey:grey_local@localhost:5432/grey_dev',
  },
  verbose: true,
  strict: true,
});
