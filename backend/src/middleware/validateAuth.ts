import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: mongoose.Types.ObjectId;
    }
  }
}

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.cookies.auth_token;
  const payload = verifyToken(token);

  if (!payload || typeof payload === "string" || payload.userId === undefined) {
    return res.status(401).json({
      success: false,
      data: "Unauthorized",
    });
  }

  req.userId = payload.userId;
  next();
};
