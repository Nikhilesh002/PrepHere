import { IQuestion } from "../../types/types";

const questions = require("../../data/extractedData.json");

export const getIdxsQues = (queIdxs: number[]): IQuestion[] => {
  return queIdxs.map((idx) => questions[idx]);
};
