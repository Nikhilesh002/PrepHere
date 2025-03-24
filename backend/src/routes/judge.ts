import express from "express";
import { validateAuth } from "../middleware/validateAuth";
import { playground } from "../controllers/judge";

const judgeRouter = express.Router();
judgeRouter.use(validateAuth);

judgeRouter.post("/playground", playground);

export default judgeRouter;
