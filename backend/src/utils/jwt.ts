import jwt from "jsonwebtoken";
import { configs } from "../configs";

export const makeToken = (username: string) => {
  return jwt.sign(
    {
      username: username,
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
