import { IQuestion } from "../../types/types";

const sqlQuestions = require("../../data/sqlQuestions.json");
const allQuestions = require("../../data/allQuestions.json");

export const getIdxsQues = (queIdxs: number[], repo: string): IQuestion[] => {
  if(repo === "sql") return queIdxs.map((idx) => sqlQuestions[idx]);
  return queIdxs.map((idx) => allQuestions[idx]);
};
