import { Request, Response } from "express";
import { getIdxsQues } from "../utils/questions/getIdxQuestions";

// not used now
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { queIdxs } = req.body;

    res.status(200).json({
      success: true,
      msg: "Questions fetched successfully",
      data: getIdxsQues(queIdxs),
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
    res.status(200).json({
      success: true,
      msg: "Question fetched successfully",
      question: getIdxsQues([idx])[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
