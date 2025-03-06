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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { nextPage, prevPage } from "@/redux/slices/currPageSlice";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

const QUES_PER_PAGE = 20;

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

  const currPage = useSelector((state: RootState) => state.currPage.pageNo);
  const dispatch = useDispatch();

  console.log(currPage);

  const handleClick = useCallback(
    (idx: number) => {
      if (!questions) return;
      if (slug === "")
        navigate(`/question/${(currPage - 1) * QUES_PER_PAGE + idx}`);
      else navigate(`/question/${queIdxs[idx]}`);
    },
    [navigate, questions, queIdxs, currPage, slug]
  );

  const handlePrevious = useCallback(() => {
    if (currPage === 1) return;
    dispatch(prevPage());
  }, [currPage, dispatch]);

  const handleNext = useCallback(() => {
    if (currPage >= questions.length / QUES_PER_PAGE) return;
    dispatch(nextPage());
  }, [currPage, questions.length, dispatch]);

  if (!questions || questions.length === 0) return <h1>Loading...</h1>;

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
          questions
            .slice((currPage - 1) * QUES_PER_PAGE, currPage * QUES_PER_PAGE)
            .map((question: IQuestion, idx: number) => {
              return (
                <Card
                  onClick={() => handleClick(idx)}
                  key={idx}
                  className="shadow shadow-gray-600 flex flex-col justify-evenly"
                >
                  <CardHeader>
                    <CardTitle className="text-blue-500">
                      Question {(currPage - 1) * QUES_PER_PAGE + idx + 1}
                    </CardTitle>
                    <CardTitle className="tracking-wide text-md">
                      {question.text.substring(0, 200)}....
                    </CardTitle>
                    <CardDescription>{question.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex space-x-3 flex-wrap space-y-1">
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${
                        colorMap.difficulty[
                          question.difficulty as keyof typeof colorMap.difficulty
                        ]
                      }`}
                    >
                      {question.difficulty}
                    </div>
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${
                        colorMap.category[
                          question.category as keyof typeof colorMap.category
                        ]
                      }`}
                    >
                      {makeFirstLetterUp(question.category)}
                    </div>
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${
                        colorMap.country[
                          question.country as keyof typeof colorMap.country
                        ]
                      }`}
                    >
                      {question.country}
                    </div>
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${
                        colorMap.ctc[question.ctc as keyof typeof colorMap.ctc]
                      }`}
                    >
                      {question.ctc}
                    </div>
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${colorMap.companyName}`}
                    >
                      {question.companyName}
                    </div>
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${
                        colorMap.yoe[question.yoe as keyof typeof colorMap.yoe]
                      }`}
                    >
                      {question.yoe} YOE
                    </div>
                    <div
                      className={`px-1 py-0.2 text-sm text-black rounded-sm ${
                        colorMap.role[
                          question.role as keyof typeof colorMap.role
                        ]
                      }`}
                    >
                      {question.role}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      <div className=" my-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePrevious} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Questions;
