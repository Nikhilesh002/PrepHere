import { Request, Response } from "express";
import { getIdxsQues } from "../utils/questions/getIdxQuestions";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { idxs } = req.body;

    res.status(200).json({
      success: true,
      msg: "Questions fetched successfully",
      data: getIdxsQues(idxs),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
