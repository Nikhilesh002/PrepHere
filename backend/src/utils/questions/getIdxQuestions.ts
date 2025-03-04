import { IQuestion } from "../../types/types";

const questions = require("../../data/extractedData.json");

export const getIdxsQues = (idxs: number[]): IQuestion[] => {
  return idxs.map((idx) => questions[idx]);
};
