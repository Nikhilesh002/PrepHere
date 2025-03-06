import postgres from "postgres";

const sql = postgres(process.env.PG_JUDGE_URL ?? ""); // will use psql environment variables

export default sql;
