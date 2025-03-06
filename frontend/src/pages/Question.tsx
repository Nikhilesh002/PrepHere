import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have ShadCN UI installed
import { IQuestion } from "@/lib/types";
import Playground from "@/components/monaco/Playground";
import axios from "axios";

function Question() {
  const { idx } = useParams();

  const { repo } = useLocation().state || { repo: "all" };
  const [question, setQuestion] = useState<IQuestion>();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/question/${repo}/${idx}`
      );
      console.log(res.data);
      setQuestion(res.data.question);
    })();
  }, [idx, repo]);

  return (
    <div className="w-full h-screen flex justify-center ">
      <div className="w-1/2 px-5 pt-8 text-white overflow-y-auto">
        {question && (
          <Card className="max-w-3xl mx-auto shadow-lg rounded-lg ">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {question.companyName} - {question.role}
              </CardTitle>
              <div className="text-sm">
                {question.country} - {question.difficulty}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <p
                  className="text-lg bg-gray-900 p-5 rounded-md"
                  dangerouslySetInnerHTML={{
                    __html: question.text
                      .split("\n")
                      .join("<br/>")
                      .split("\t")
                      .join("&nbsp;&nbsp;&nbsp;&nbsp;"),
                    // .replaceAll("\n", "<br/>")
                    // .replaceAll("\t", " "),
                  }}
                ></p>

                <div className="space-y-2 w-1/2 px-5 py-4 rounded-md">
                  <p className="font-semibold">More Info: </p>
                  {question &&
                    Object.keys(question).map((key) => {
                      if (
                        key === "text" ||
                        key === "difficulty" ||
                        key === "country" ||
                        key === "role"
                      )
                        return null;
                      return (
                        <div
                          key={key}
                          className="rounded-md border px-4 py-3 text-sm"
                        >
                          <span className="font-medium">{key}</span>:{" "}
                          <span className="italic">
                            {question[key as keyof IQuestion]}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {repo === "sql" && (
        <div className="w-1/2">
          <Playground />
        </div>
      )}
    </div>
  );
}

export default Question;
