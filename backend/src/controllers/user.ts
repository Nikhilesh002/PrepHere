import { IUserDoc, userModel } from "../models/user";
import { compareHash, createHash } from "../utils/bcryptjs";
import { logger } from "../utils/logger";
import { COOKIE_EXPIRY_DURATION, makeToken } from "../utils/jwt";
import { Response, Request } from "express";

export const userSignUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    logger.info("user signup");
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const hashedPassword = await createHash(password);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      plans: [],
      questionares: [],
    });

    // make token and send
    res.cookie("auth_token", makeToken(username, user._id), {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: COOKIE_EXPIRY_DURATION * 1000,
    });

    return res.status(201).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (error) {
    logger.error("Error creating user", error);
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

export const userSignIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const user = (await userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })) as IUserDoc | null;
    if (!user) {
      logger.error("User not found");
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    const isMatch = await compareHash(password, user.password);
    if (!isMatch) {
      logger.error("Invalid Password");
      return res.status(400).json({
        success: false,
        msg: "Invalid Password",
      });
    }

    // make token and send
    res.cookie("auth_token", makeToken(user.username, user.id));

    return res.status(200).json({
      success: true,
      msg: "User signed in successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error("Error signing in user", error);
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

export const userSignOut = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("User signed out");
  return res.clearCookie("auth_token").status(200).json({
    success: true,
    msg: "User signed out successfully",
  });
};
