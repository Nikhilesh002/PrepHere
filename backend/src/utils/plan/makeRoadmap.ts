import { IQuestionare } from "../../models/questionare";
import { askLlm } from "../ai/llm";
import { roadmapAIMessage } from "../ai/prompts/roadmap/roadmapAIMessage";
import { makeRoadmapUserPrompt } from "../ai/prompts/roadmap/roadmapUserPrompt";

export const makeRoadmap = async (
  questionare: IQuestionare
): Promise<{ roadmap: string[][]; roadmapStatus: number[][] }> => {
  // ask AI to prepare a custom plan
  const prompt = makeRoadmapUserPrompt(questionare);
  const aiRes = await askLlm(prompt, roadmapAIMessage);

  const roadmap = JSON.parse(aiRes);

  return {
    roadmap,
    roadmapStatus: makeRoadmapStatus(roadmap),
  };
};

const makeRoadmapStatus = (roadmap: string[][]): number[][] => {
  return roadmap.map((week) => {
    return week.map(() => 0);
  });
};
