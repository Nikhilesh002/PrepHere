import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import colorMap from "@/assets/colorMapping.json";
import { makeFirstLetterUp } from "@/lib/formatFuncs";

function Questions() {
  const { slug } = useParams();

  const [plan, setPlan] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/plan/${slug}/questions`
      );
      console.log(res.data);
      setPlan(res.data);
    })();
  }, [slug]);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-8 mb-5">
        Your Plan: {slug}
      </h1>
      {/* all questions in this plan */}
      <div className="w-full px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {plan &&  plan.questions &&
          plan.questions.length !== 0 &&
          plan.questions.map((question, idx) => {
            return (
              <Card key={idx} className="shadow shadow-gray-600">
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Question {idx + 1}
                  </CardTitle>
                  <CardTitle className="tracking-wide text-md">
                    {question.text.substring(0, 200)}....
                  </CardTitle>
                  <CardDescription>{question.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex space-x-3 flex-wrap space-y-1">
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.difficulty[question.difficulty]}`}>{question.difficulty}</div>
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.category[question.category]}`}>{makeFirstLetterUp(question.category)}</div>
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.country[question.country]}`}>{question.country}</div>
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.ctc[question.ctc]}`}>{question.ctc}</div>
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.companyName}`}>{question.companyName}</div>
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.yoe[question.yoe]}`}>{question.yoe} YOE</div>
                  <div className={`px-2 py-0.5 text-black rounded-sm ${colorMap.role[question.role]}`}>{question.role}</div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Questions;
