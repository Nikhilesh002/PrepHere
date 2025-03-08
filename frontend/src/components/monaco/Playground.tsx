import * as monaco from "monaco-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageIdEnum } from "monaco-sql-languages";

/** import contribution file */
// import "monaco-sql-languages/esm/languages/mysql/mysql.contribution";
import "monaco-sql-languages/esm/languages/pgsql/pgsql.contribution";

/** import worker files */
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import PGSQLWorker from "monaco-sql-languages/esm/languages/pgsql/pgsql.worker?worker";
// import MySQLWorker from "monaco-sql-languages/esm/languages/mysql/mysql.worker?worker";

import { vsPlusTheme } from "monaco-sql-languages";
import { Button } from "../ui/button";
import { Bot, PlayIcon } from "lucide-react";
import { axiosWithToken } from "@/lib/axiosWithToken";
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";

/** define MonacoEnvironment.getWorker  */
(globalThis as any).MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === LanguageIdEnum.PG) {
      return new PGSQLWorker();
    }
    // if (label === LanguageIdEnum.MYSQL) {
    //   return new MySQLWorker();
    // }
    return new EditorWorker();
  },
};

const Playground = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const [lang, setLang] = useState<string>(LanguageIdEnum.PG);

  const [judgeRes, setJudgeRes] = useState<string>("Run a query to see result");
  const [aiTips, setAiTips] = useState<string>(`Ask AI`);

  monaco.editor.defineTheme("sql-dark", vsPlusTheme.darkThemeData);

  useEffect(() => {
    if (hostRef.current && !editorRef?.current) {
      editorRef.current = monaco.editor.create(hostRef.current, {
        language: lang,
        theme: "sql-dark",
      });
    }
  }, [lang]);

  useEffect(() => {
    const model = editorRef?.current?.getModel();
    if (model && model.getLanguageId() !== lang) {
      monaco.editor.setModelLanguage(model, lang);

      editorRef?.current?.setValue("-- Your SQL Query here");

      setTimeout(() => {
        console.log(
          "language changed, current is: ",
          editorRef?.current?.getModel()?.getLanguageId()
        );
      }, 200);
    }
  }, [lang]);

  const handleAI = useCallback(async () => {
    console.log(editorRef?.current?.getValue());
    const res = await axiosWithToken.post(
      `${import.meta.env.VITE_API_URL}/ai/pg`,
      {
        code: editorRef?.current?.getValue(),
        lang,
      }
    );

    console.log(res.data);
    setAiTips(res.data.judgeRes);
  }, []);

  const handleJudge = useCallback(async () => {
    try {
      toast.loading("Executing your queries...");
      console.log(editorRef?.current?.getValue());

      const res = await axiosWithToken.post(
        `${import.meta.env.VITE_API_URL}/judge/playground`,
        {
          code: editorRef?.current?.getValue(),
          lang,
        }
      );

      console.log(res.data);
      setJudgeRes(res.data.judgeRes);

      // wait 1s to render
      setTimeout(() => {
        toast.dismiss();
        toast.success(res.data.msg);
      }, 200);

      
    } catch (error) {
      toast.error("Judge failed");
      console.error(error);
    }
  }, []);

  return (
    <div className="w-full h-screen rounded-lg p-3  ">
      <div className="flex justify-between items-center text-base w-full ">
        <h2 className="font-semibold">PrepHere SQL Playground</h2>

        <div className="space-x-2 flex">
          <div className="">
            <select
              name="language"
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
              }}
              className="w-full h-full text-base"
            >
              {/* <option value={LanguageIdEnum.MYSQL}>
						{LanguageIdEnum.MYSQL.toLocaleUpperCase()}
					</option> */}
              <option value={LanguageIdEnum.PG}>
                {LanguageIdEnum.PG.toLocaleUpperCase()}
              </option>
            </select>
          </div>

          <Button onClick={handleAI}>
            <Bot />
          </Button>

          <Button onClick={handleJudge}>
            <PlayIcon />
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto">
        <div className="w-full h-[55vh] mt-3">
          <div ref={hostRef} className="w-full h-full" />
        </div>

        <Separator />

        <div className="mt-5 px-5 py-2 bg-gray-900 rounded-xl  min-h-20">
          <p className="font-semibold ">Judge Result:</p>
          <div className="w-full flex flex-col">
            {judgeRes.split("\n\n").map((str, idx) => {
              return (
                <pre className="" key={idx}>
                  {str}
                  <br />
                </pre>
              );
            })}
          </div>
        </div>

        <Separator />

        <div className="mt-5 px-5 py-2 bg-gray-900 rounded-xl  min-h-20">
          <p className="font-semibold ">Ask AI:</p>
          <pre>{aiTips}</pre>
        </div>
      </div>
    </div>
  );
};

export default Playground;
