import express from "express";
import { validateAuth } from "../middleware/validateAuth";
import { createPlan, getPlan, getPlans } from "../controllers/plan";

const planRouter = express.Router();
planRouter.use(validateAuth);
planRouter.get("/:slug", getPlan);
planRouter.get("/", getPlans);
planRouter.post("/", createPlan);

export default planRouter;
