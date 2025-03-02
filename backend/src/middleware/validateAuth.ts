import { verifyToken } from "../utils/jwt";

export const validateAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.auth_token;
  if (!verifyToken(token)) {
    return res.status(401).json({
      success: false,
      data: "Unauthorized",
    });
  }
  next();
};
