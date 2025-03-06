import express from "express";
import userRouter from "./user";
import planRouter from "./plan";
import questionRouter from "./question";
import judgeRouter from "./judge";

const router = express.Router();

router.use("/user", userRouter);
router.use("/plan", planRouter);
router.use("/question", questionRouter);
router.use("/judge", judgeRouter);

export default router;
