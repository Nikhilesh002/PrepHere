import express from "express";
import userRouter from "./user";
import questionareRouter from "./questionare";

const router = express.Router();

router.use("/user", userRouter);
router.use("/questionare", questionareRouter);

export default router;
