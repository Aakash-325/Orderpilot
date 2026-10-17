import {config} from './src/config/config.js'
import { defineConfig } from "drizzle-kit";

const databaseUrl = config.database_url;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from the environment");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
  verbose: true,
});

// schema: where to read your TypeScript table definitions.
// out: where to store migration files.
// dialect: which database SQL dialect to generate.
// dbCredentials: which PostgreSQL connection to use for migration commands.
// strict: asks for confirmation for potentially destructive migration operations.
// verbose: provides additional migration output.