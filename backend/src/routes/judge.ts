import express from "express";
import { validateAuth } from "../middleware/validateAuth";
import { judge } from "../controllers/judge";

const judgeRouter = express.Router();
judgeRouter.use(validateAuth);

judgeRouter.post("/playground", judge);

export default judgeRouter;
