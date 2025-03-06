import express from "express";
import { validateAuth } from "../middleware/validateAuth";
import { pgJudge } from "../controllers/judge";

const judgeRouter = express.Router();
judgeRouter.use(validateAuth);

judgeRouter.post("/pg", pgJudge);

export default judgeRouter;
