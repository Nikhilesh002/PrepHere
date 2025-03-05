import { IQuestionare } from "../../models/questionare";
import { IQuestion } from "../../types/types";

const questions = require("../../data/extractedData.json");

export const makeQuestions = async (cnt: number, questionare: IQuestionare) => {
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
      question.role === questionare.role
    ) {
      filteredQueIdxs.add(idx);
    } else {
      remQueIdxs.add(idx);
    }
  });

  // for now randomly pick questions
  if (filteredQueIdxs.size <= cnt) {
    // directly add filtered qs
    for (let idx in filteredQueIdxs) {
      customQuestions.push(questions[idx]);
    }

    // compensate from rem qs
    return {
      queIdxs: [
        ...filteredQueIdxs,
        ...getRandIdxs(cnt - filteredQueIdxs.size, remQueIdxs, customQuestions),
      ],
      questions: customQuestions,
    };
  } else {
    return {
      queIdxs: getRandIdxs(cnt, filteredQueIdxs, customQuestions),
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
