import { QueryResult } from "pg";
import { logger } from "../logger";
import { pgPool } from "./pgPool";

export const pgExecutor = async (code: string): Promise<string> => {
  const queries = extractPgQueries(code);

  console.log({ queries });
  if (queries.length > 15) {
    throw new Error("Cant execute more than 15 queries for now");
  }

  const client = await pgPool.connect();

  try {
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

    return resp;
  } catch (e) {
    await client.query("ROLLBACK");
    logger.error(e);
    return "Failed to execite query";
  } finally {
    client.release();
  }
};

// given string of code
// return array of queries
const extractPgQueries = (code: string): string[] => {
  const cleanedCode = removeBetween(
    removeBetween(code, "/*", "*/"),
    "--",
    "\n"
  );

  // now we hav only queries
  return cleanedCode
    .split(";") // split at ;
    .map((query) => query.trim()) // rem spaces
    .filter((query) => query !== "" && query !== ";"); // remove empty strs
};

const extractResponse = (result: QueryResult, type: string) => {
  if (type === "SELECT") {
    console.log({ result, fields: result.fields });
    return getRows(result);
  }
  if (type === "INSERT") return `Inserted ${result.rowCount} row(s)\n\n`;
  if (type === "UPDATE") return `Updated ${result.rowCount} row(s)\n\n`;
  if (type === "DELETE") return `Deleted ${result.rowCount} row(s)\n\n`;
  if (type === "CREATE") return "Created command executed\n\n";
  if (type === "ALTER") return "Alter command executed\n\n";
  if (type === "DROP") return JSON.stringify(result.rows, null, 2) + "\n\n";
  if (type === "GRANT") return JSON.stringify(result.rows, null, 2) + "\n\n";
  if (type === "REVOKE") return JSON.stringify(result.rows, null, 2) + "\n\n";
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
  return rowsStr;
};

const removeBetween = (code: string, start: string, end: string): string => {
  let prevFound = 0;
  let cleanedCode = code;

  while (prevFound < cleanedCode.length && cleanedCode.includes(start)) {
    const commentStartIdx = cleanedCode.indexOf(start, prevFound);
    let commentEndIdx = cleanedCode.indexOf(end, commentStartIdx) + end.length;
    if (commentEndIdx === end.length - 1) {
      commentEndIdx = cleanedCode.length;
    }

    prevFound = commentStartIdx;
    cleanedCode = cleanedCode.replace(
      cleanedCode.substring(commentStartIdx, commentEndIdx),
      ""
    );
  }

  return cleanedCode;
};

// check if query is safe
const isQuerySafe = (query: string): boolean => {
  // checks
  return true;
};

// TODO: handle SQL injection
