import express from "express";
import { userSignIn, userSignOut, userSignUp } from "../controllers/user";
import { validateAuth } from "../middleware/validateAuth";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/signin", userSignIn);
userRouter.get("/signout", userSignOut);

userRouter.get("/", validateAuth, (req, res) => {
  res.send("User Router");
});

export default userRouter;
