import jwt from "jsonwebtoken";
import { configs } from "../configs";
import mongoose from "mongoose";

export const makeToken = (
  username: string,
  userId: mongoose.Types.ObjectId
): string => {
  return jwt.sign(
    {
      username: username,
      userId: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      iat: Math.floor(Date.now() / 1000),
    },
    configs.jwtSecret
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, configs.jwtSecret);
  } catch (error) {
    return null;
  }
};
