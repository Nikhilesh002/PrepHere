import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { makeFirstLetterUp } from "@/lib/formatFuncs";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import { BanIcon, Bookmark, Check } from "lucide-react";

function Plan() {
  const { slug } = useParams();

  const [plan, setPlan] = useState({
    roadmap: [[""]],
    createdAt: Date.now(),
    roadmapStatus: [[0]],
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/plan/${slug}`
      );
      console.log(res.data.data);
      // console.log(JSON.parse(res.data.data));
      // const tempArr = [[1,2,0],[0,0,0],[0,0,0],[0,2,0],[0,0,0],[0,0,0],[0,0,0]];
      setPlan({
        roadmap: res.data.data.roadmap,
        createdAt: res.data.data.createdAt,
        // roadmapStatus: tempArr,
        roadmapStatus: res.data.data.roadmapStatus,
      });

      // calculate progress
      let completedSteps = 0,
        totalSteps = 0;

      for (let i = 0; i < res.data.data.roadmapStatus.length; i++) {
        for (let j = 0; j < res.data.data.roadmapStatus[i].length; j++) {
          if (res.data.data.roadmapStatus[i][j] === 1) {
            completedSteps++;
          }
          totalSteps++;
        }
      }
      setProgress(Math.round((completedSteps / totalSteps) * 100));
    })();
  }, [slug]);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center space-x-8 my-3">
        <h1 className="text-2xl text-center font-bold">Your Plan: {slug}</h1>
        <Link to={`/plan/${slug}/questions`}>
          <Button className="font-bold ">Customised Questions</Button>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="w-4/5 mx-auto my-5">
        <div className="flex justify-between mb-1">
          <span className="text-xl font-semibold text-blue-700 dark:text-white">
            Progress
          </span>
          <span className="text-lg  font-semibold text-blue-700 dark:text-white">
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Separator />

      {/* plan details */}
      <div className="my-5">
        <div className="w-full px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* roadmap */}
          {plan &&
            plan.roadmap &&
            plan.roadmap.length !== 0 &&
            plan.roadmap.map((roadmap, idx1) => {
              return (
                <Card key={idx1} className="shadow shadow-gray-600">
                  <CardHeader>
                    <CardTitle className="text-blue-500 text-center">
                      Checkpoint {idx1 + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {roadmap.map((roadmapItem, idx2) => {
                        return (
                          <div
                            key={idx2}
                            className="flex justify-between  text-lg border px-3 py-1 shadow shadow-gray-700 hover:shadow-gray-500"
                          >
                            <p className="">{makeFirstLetterUp(roadmapItem)}</p>
                            {plan.roadmapStatus[idx1][idx2] === 0 ? (
                              <BanIcon className="text-red-400 w-10" />
                            ) : plan.roadmapStatus[idx1][idx2] === 1 ? (
                              <Check className="text-green-400 w-10" />
                            ) : (
                              <Bookmark className="text-orange-400 w-10" />
                            )}
                            {/* TODO notDone bookmark done    0 1 2 => update api */}
                            {/* 
                                2 approaches -> rwx  | attribute
                            */}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      <Separator />

      {/* all questions in this plan */}
      <div className="mt-8 flex justify-center items-center space-x-5">
        <p className="font-semibold">
          {dayjs(plan.createdAt).format("DD MMM YYYY")}
        </p>
      </div>
    </div>
  );
}

export default Plan;
