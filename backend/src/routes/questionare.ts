import express from "express";
import { validateAuth } from "../middleware/validateAuth";
import {
  createQuestionare,
  getQuestionare,
  getQuestionares,
} from "../controllers/questionare";

const questionareRouter = express.Router();

// all are proteected
questionareRouter.use(validateAuth);

questionareRouter.get("/:id", getQuestionare);
questionareRouter.post("/", createQuestionare);
questionareRouter.get("/", getQuestionares);

export default questionareRouter;
