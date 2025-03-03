import { IQuestionareDoc, questionareModel } from "../models/questionare";
import { logger } from "../utils/logger";
import { Response, Request } from "express";
import { planModel } from "../models/plan";
import { makeQuestions } from "../utils/questions/makeQuestions";
import { getIdxQuestions } from "../utils/questions/getIdxQuestions";
import { makeRoadmap } from "../utils/plan/makeRoadmap";

export const createPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const questionare: IQuestionareDoc = req.body;
    const userId = req.userId;

    console.log(questionare);
    console.log(userId);

    questionare.userId = userId;
    questionare.planId = userId;

    // tried to just create object to get questionare._id, but not working
    // so now saving in db
    // -> no u can use updateOne 

    const newQuestionare = new questionareModel({
      ...questionare,
    });

    logger.info("Questionare created");

    // now create plan
    const newPlan = new planModel({
      userId,
      questionareId: newQuestionare._id,
      slug: questionare.slug,
      idxs: [],
    });

    newQuestionare.updateOne({ planId: newPlan._id });
    await newQuestionare.save();

    // make plan acc to questionare
    const createdRoadMap = await makeRoadmap(questionare);
    console.log(createdRoadMap);

    // make questions acc to questionare
    const { idxs, questions } = await makeQuestions(questionare);

    newPlan.idxs = idxs;
    newPlan.save();

    newQuestionare.planId = {};
    await newQuestionare.save();

    return res.status(201).json({
      success: true,
      msg: "Plan created successfully",
      data: newPlan,
      questions,
    });
  } catch (error) {
    logger.error("Error creating plan", error);
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

    if (!plan) {
      return res.status(404).json({
        success: false,
        msg: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Plan fetched successfully",
      data: plan,
      questions: getIdxQuestions(plan.idxs),
    });
  } catch (error) {
    logger.error("Error getting plan", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
