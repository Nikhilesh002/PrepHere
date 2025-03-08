import { Request, Response } from "express";
import { executor } from "../utils/judge";

export const judge = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code, lang } = req.body;

    // console.log({ code, lang });

    if (!code || !lang) {
      return res.status(400).json({
        success: false,
        judgeRes: "Code and language are required ",
      });
    }

    // if (code.length > 1000) {
    //   return res.status(400).json({
    //     success: false,
    //     judgeRes: "Code must be shorter than 1000 characters",
    //   });
    // }

    if (lang !== "pgsql") {
      return res.status(400).json({
        success: false,
        judgeRes: "Language not supported ",
      });
    }

    const cleanedCode = code.replace(/\n+/g, "\n").replaceAll(";\n", ";");
    const result = await executor(cleanedCode, lang);

    console.log({ result });

    return res.status(200).json({
      success: true,
      msg: "Query executed successfully",
      judgeRes: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
      judgeRes: "Something went wrong",
    });
  }
};
