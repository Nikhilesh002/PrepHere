import { pgExecutor } from "./pg";

export const executor = async (code: string, lang: string) => {
  if (lang === "pgsql") {
    return await pgExecutor(code);
  }

  return "not supported";
};
