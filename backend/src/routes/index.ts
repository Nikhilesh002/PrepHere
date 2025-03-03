import express from "express";
import userRouter from "./user";
import planRouter from "./plan";

const router = express.Router();

router.use("/user", userRouter);
router.use("/plan", planRouter);

export default router;
