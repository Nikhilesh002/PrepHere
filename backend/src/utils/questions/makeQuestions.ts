import { IQuestionare } from "../../models/questionare";
import { IQuestion } from "../../types/types";

const questions = require("../../data/extractedData.json");

export const makeQuestions = async (questionare: IQuestionare) => {
  const customQuestions: IQuestion[] = [];

  // for now using idx, as static data, but in fut u need to use some hashe set
  const filteredQueIdxs = new Set<number>();
  const remQueIdxs = new Set<number>();

  questions.forEach((question: IQuestion, idx: number) => {
    if (
      question.difficulty === questionare.difficulty &&
      question.category === questionare.category &&
      question.country === questionare.country &&
      question.ctc === questionare.ctc &&
      question.companyName === questionare.companyName &&
      question.yoe === questionare.yoe &&
      question.role === questionare.role
    ) {
      filteredQueIdxs.add(idx);
    } else {
      remQueIdxs.add(idx);
    }
  });

  // for now randomly pick questions
  if (filteredQueIdxs.size <= 25) {
    // directly add filtered qs
    for (let idx in filteredQueIdxs) {
      customQuestions.push(questions[idx]);
    }

    // compensate from rem qs
    return {
      idxs: [
        ...filteredQueIdxs,
        ...getRandIdxs(25 - filteredQueIdxs.size, remQueIdxs, customQuestions),
      ],
      questions: customQuestions,
    };
  } else {
    return {
      idxs: getRandIdxs(25, filteredQueIdxs, customQuestions),
      questions: customQuestions,
    };
  }
};

const getRandIdxs = (
  cnt: number,
  idxs: Set<number>,
  customQuestions: IQuestion[]
): number[] => {
  const randIdxs: Set<number> = new Set();

  while (randIdxs.size < cnt) {
    const randIdx = Math.floor(Math.random() * idxs.size);
    randIdxs.add(randIdx);
    customQuestions.push(questions[randIdx]);
  }

  return [...randIdxs];
};
