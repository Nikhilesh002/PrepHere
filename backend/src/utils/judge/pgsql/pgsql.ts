import { QueryResult } from "pg";
import { logger } from "../../logger";
import { extractPgQueries } from "./extractQueries";
import pg from "pg";

const { Pool } = pg;
const pgPool = new Pool({
  connectionString: process.env.PG_JUDGE_DB_URL ?? "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const pgExecutor = async (code: string): Promise<string> => {
  const queries = extractPgQueries(code);
  console.log({ queries });

  if (queries.length > 50) {
    throw new Error("Cant execute more than 50 queries for now");
  }

  let client;

  try {
    client = await pgPool.connect();

    // begin txn
    await client.query("BEGIN");

    let resp = "";
    for (const query of queries) {
      if (!isQuerySafe(query)) {
        throw new Error("Query is not safe");
      }
      const result = await client.query(query);
      resp += "-> " + extractResponse(result, result.command);
    }

    // always rollback txn
    await client.query("ROLLBACK");

    // logger.info(resp);

    //  mongodb db

    return resp;
  } catch (e) {
    await client?.query("ROLLBACK");
    logger.error(e);
    return "Failed to connect psql or failed to execite query";
  } finally {
    client?.release();
  }
};

const extractResponse = (result: QueryResult, type: string) => {
  if (type === "SELECT") return getRows(result);
  if (type === "INSERT") return `Inserted ${result.rowCount} row(s)\n\n\n`;
  if (type === "UPDATE") return `Updated ${result.rowCount} row(s)\n\n\n`;
  if (type === "DELETE") return `Deleted ${result.rowCount} row(s)\n\n\n`;
  if (type === "CREATE") return "Created command executed\n\n\n";
  if (type === "ALTER") return "Alter command executed\n\n\n";
  if (type === "DROP") return JSON.stringify(result.rows, null, 2) + "\n\n\n";
};

const getRows = (result: QueryResult) => {
  if (result.rows.length === 0) {
    return "No rows returned";
  }

  let rowsStr = "Selected rows:\n\n";
  for (const field of result.fields) {
    rowsStr += field.name + "\t";
  }
  rowsStr += "\n\n";

  for (const row of result.rows) {
    for (const key in row) {
      rowsStr += (row[key] as string) + "\t";
    }
    rowsStr += "\n\n";
  }
  return rowsStr + "\n";
};

// check if query is safe
const isQuerySafe = (query: string): boolean => {
  // checks
  const lcQuery = query.toLowerCase();
  if (lcQuery.includes("grant") || lcQuery.includes("revoke")) return false;

  // SQLi
  return true;
};

// TODO: handle SQL injection
