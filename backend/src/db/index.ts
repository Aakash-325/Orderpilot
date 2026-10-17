
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
import { config } from "../config/config.js";

const databaseUrl = config.database_url;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export const sql = postgres(databaseUrl, {
  max: 10,
  connect_timeout: 10,
});

export const db = drizzle(sql, { schema });

// sql is the underlying Postgres.js client. We keep it available so we can explicitly close its connections during shutdown.
// db is the Drizzle interface used for typed queries.
// schema lets Drizzle infer table and column types from your definitions.
// max: 10 limits this process to ten pooled connections as an initial local default.s