import { IQuestionare } from "../../models/questionare";
import { askLlm } from "../ai/llm";
import { roadmapAIMessage } from "../ai/prompts/roadmap/roadmapAIMessage";
import { makeRoadmapUserPrompt } from "../ai/prompts/roadmap/roadmapUserPrompt";

export const makeRoadmap = async (questionare: IQuestionare) => {
  // ask AI to prepare a custom plan
  const prompt = makeRoadmapUserPrompt(questionare);
  const aiRes = await askLlm(prompt, roadmapAIMessage);

  return formatData(aiRes);
};

const formatData = (data: string) => {
  return data;
};
