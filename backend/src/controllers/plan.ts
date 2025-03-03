import mongoose from "mongoose";
import { questionareModel } from "../models/questionare";
import { logger } from "../utils/logger";
import { Response, Request } from "express";
import { planModel } from "../models/plan";

export const createPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const questionare = req.body;
    const userId = req.userId;

    await questionareModel.create({
      ...questionare,
      userId: userId as mongoose.Types.ObjectId,
    });

    logger.info("Questionare created");

    // now create plan
    const newPlan = new planModel();
    newPlan.questionare = questionare._id;

    //
    return res.status(201);
  } catch (error) {
    logger.error("Error creating questionare", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getPlans = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;

    const plans = await planModel
      .find({ userId: userId })
      .populate("questionare");

    return res.status(200).json({
      success: true,
      msg: "Plans fetched successfully",
      data: plans,
    });
  } catch (error) {
    logger.error("Error getting plans", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const { slug } = req.params;

    const plan = await planModel.findOne({ slug }).populate("questionare");

    return res.status(200).json({
      success: true,
      msg: "Plan fetched successfully",
      data: plan,
    });
  } catch (error) {
    logger.error("Error getting plan", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
