import { removeBetween } from "../removeBetween";

// given string of code
// return array of queries
export const extractPgQueries = (code: string): string[] => {
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
