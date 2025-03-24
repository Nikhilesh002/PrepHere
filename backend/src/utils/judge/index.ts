import { pgExecutor } from "./pgsql/pgsql";

export const executor = async (code: string, lang: string) => {
  if (lang === "pgsql") {
    return await pgExecutor(code);
  }

  return "not supported";
};
