import { IQuestionare, questionareModel } from "../models/questionare";
import { logger } from "../utils/logger";
import { Response, Request } from "express";
import { planModel } from "../models/plan";
import { makeQuestions } from "../utils/questions/makeQuestions";
import { getIdxsQues } from "../utils/questions/getIdxQuestions";
import { makeRoadmap } from "../utils/plan/makeRoadmap";

export const createPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const questionare: any = req.body;
    const userId = req.userId;

    questionare.userId = userId;
    questionare.planId = null;

    // tried to just create object to get questionare._id, but not working
    // so now saving in db
    // -> no u can use updateOne
    // all wrong, mistook and used Schema.Types.ObjectId

    // now create questionare
    const newQuestionare = new questionareModel({
      ...(questionare as IQuestionare),
    });

    // now create plan
    const newPlan = new planModel({
      userId,
      questionareId: newQuestionare._id,
      slug: questionare.slug,
      idxs: [],
      roadmap: [[""]],
    });

    // store newPlan._id and save newQuestionare
    newQuestionare.planId = newPlan._id;
    await newQuestionare.save();

    // make plan acc to questionare
    const { roadmap, roadmapStatus } = await makeRoadmap(questionare);
    newPlan.roadmap = roadmap;
    newPlan.roadmapStatus = roadmapStatus;

    // make questions acc to questionare
    const { idxs, questions } = await makeQuestions(questionare);

    newPlan.idxs = idxs;
    await newPlan.save();

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
      .select("slug roadmap createdAt -_id");
    // .populate("questionareId")   // the key with ref, if all needed
    // .exec();

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

    const plan = await planModel.findOne({ slug }).select("roadmap createdAt -_id");

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
    });
  } catch (error) {
    logger.error("Error getting plan", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const getPlanQues = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { slug } = req.params;

    const plan = await planModel.findOne({ slug });

    if (!plan) {
      return res.status(404).json({
        success: false,
        msg: "Plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Plan's Questions fetched successfully",
      questions: getIdxsQues(plan.idxs),
    });
  } catch (error) {
    logger.error("Error getting plan's questions", error);
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
