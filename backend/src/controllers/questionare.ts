import { questionareModel } from "../models/questionare";
import { logger } from "../utils/logger";
import { Response, Request } from "express";

export const createQuestionare = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const questionare = req.body;

    await questionareModel.create(questionare);

    logger.info("Questionare created");

    return res.status(201).json({
      success: true,
      msg: "Questionare created successfully",
    });
  } catch (error) {
    logger.error("Error creating questionare", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getQuestionares = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const questionares = await questionareModel.find();
    return res.status(200).json({
      success: true,
      msg: "Questionares fetched successfully",
      questionares,
    });
  } catch (error) {
    logger.error("Error fetching questionares", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getQuestionare = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const questionare = await questionareModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "Questionare fetched successfully",
      questionare,
    });
  } catch (error) {
    logger.error("Error fetching questionare", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
