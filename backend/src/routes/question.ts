import { Router } from "express";
import { validateAuth } from "../middleware/validateAuth";
import { getQuestion } from "../controllers/question";

const questionRouter = Router();
questionRouter.use(validateAuth);

questionRouter.get("/:idx", getQuestion);

export default questionRouter;
