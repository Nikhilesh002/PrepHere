import pg from "pg";

const { Pool } = pg;
export const pgPool = new Pool({
  connectionString: process.env.PG_JUDGE_DB_URL ?? "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
