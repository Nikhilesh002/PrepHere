const questions = require("../../data/extractedData.json");

export const getIdxQuestions = async (idxs: number[]) => {
  return idxs.map((idx) => questions[idx]);
};
