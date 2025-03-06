import { Request, Response } from "express";
import { getIdxsQues } from "../utils/questions/getIdxQuestions";

// not used now
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { queIdxs } = req.body;

    res.status(200).json({
      success: true,
      msg: "Questions fetched successfully",
      data: getIdxsQues(queIdxs, "all"),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getQuestion = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idx = +req.params.idx;
    const repo = req.params.repo;

    console.log({ idx, repo });
    console.log({ que: getIdxsQues([idx], repo)[0] });

    res.status(200).json({
      success: true,
      msg: "Question fetched successfully",
      question: getIdxsQues([idx], repo)[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getAllQuestions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    res.status(200).json({
      success: true,
      msg: "Questions fetched successfully",
      questions: require("../data/allQuestions.json"),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
