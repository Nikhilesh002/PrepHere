import { Request, Response } from "express";

export const pgJudge = async (req: Request, res: Response): Promise<any> => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      msg: "PG Judge",
      judgeRes: "Code is required",
    });
  }

  const codeLines = code.trim().replace(/\s+/g, " ").split(";");

  console.log({ code });

  return res.status(200).json({
    success: true,
    msg: "PG Judge",
    judgeRes: `Submitted code: ${code} \n Online judge is coming soon...`,
    });
};
