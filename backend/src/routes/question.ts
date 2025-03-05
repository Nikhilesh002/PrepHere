import { Router } from "express";
// import { validateAuth } from "../middleware/validateAuth";
import { getAllQuestions, getQuestion } from "../controllers/question";

const questionRouter = Router();

questionRouter.get("/", getAllQuestions);
questionRouter.get("/:idx", getQuestion);

// questionRouter.use(validateAuth);

export default questionRouter;
