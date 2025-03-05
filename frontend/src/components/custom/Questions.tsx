import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import colorMap from "@/assets/colorMapping.json";
import { makeFirstLetterUp } from "@/lib/formatFuncs";
import { IQuestion } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Questions({
  questions,
  queIdxs,
  slug,
}: {
  questions: IQuestion[];
  queIdxs: number[];
  slug: string;
}) {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (idx: number) => {
      if (!questions) return;
      if (queIdxs.length === 0) navigate(`/question/${idx}`);
      else navigate(`/question/${queIdxs[idx]}`);
    },
    [navigate, questions, queIdxs]
  );

  return (
    <div>
      {slug !== "" && (
        <h1 className="text-2xl text-center font-bold mt-8 mb-5">
          Your Plan: {slug}
        </h1>
      )}
      {/* all questions in this plan */}
      <div className="w-full px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {questions &&
          questions.length !== 0 &&
          questions.map((question: IQuestion, idx: number) => {
            return (
              <Card
                onClick={() => handleClick(idx)}
                key={idx}
                className="shadow shadow-gray-600"
              >
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
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${
                      colorMap.difficulty[
                        question.difficulty as keyof typeof colorMap.difficulty
                      ]
                    }`}
                  >
                    {question.difficulty}
                  </div>
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${
                      colorMap.category[
                        question.category as keyof typeof colorMap.category
                      ]
                    }`}
                  >
                    {makeFirstLetterUp(question.category)}
                  </div>
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${
                      colorMap.country[
                        question.country as keyof typeof colorMap.country
                      ]
                    }`}
                  >
                    {question.country}
                  </div>
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${
                      colorMap.ctc[question.ctc as keyof typeof colorMap.ctc]
                    }`}
                  >
                    {question.ctc}
                  </div>
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${colorMap.companyName}`}
                  >
                    {question.companyName}
                  </div>
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${
                      colorMap.yoe[question.yoe as keyof typeof colorMap.yoe]
                    }`}
                  >
                    {question.yoe} YOE
                  </div>
                  <div
                    className={`px-2 py-0.5 text-black rounded-sm ${
                      colorMap.role[question.role as keyof typeof colorMap.role]
                    }`}
                  >
                    {question.role}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
      // TODO
      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Questions;
