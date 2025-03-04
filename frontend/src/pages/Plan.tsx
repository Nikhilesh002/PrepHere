import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { makeFirstLetterUp } from "@/lib/formatFuncs";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";

function Plan() {
  const { slug } = useParams();

  const [plan, setPlan] = useState({
    roadmap: [[""]],
    createdAt: Date.now(),
    roadmapStatus: [[0]],
  });

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/plan/${slug}`
      );
      console.log(res.data.data);
      // console.log(JSON.parse(res.data.data));
      setPlan({
        roadmap: res.data.data.roadmap,
        createdAt: res.data.data.createdAt,
        roadmapStatus: res.data.data.roadmapStatus,
      });
    })();
  }, [slug]);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-8 mb-5">
        Your Plan: {slug}
      </h1>
      {/* TODO add progress bar */}
      {/* plan details */}
      <div className="mb-5">
        <div className="w-full px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* roadmap */}
          {plan.roadmap &&
            plan.roadmap[0][0].length !== 0 &&
            plan.roadmap.map((roadmap, idx1) => {
              return (
                <Card key={idx1} className="shadow shadow-gray-600">
                  <CardHeader>
                    <CardTitle className="text-blue-500 text-center">
                      Checkpoint {idx1 + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      {roadmap.map((roadmapItem, idx2) => {
                        return (
                          <div key={idx2} className="flex justify-between">
                            <p>{makeFirstLetterUp(roadmapItem)}</p>
                            <p>{plan.roadmapStatus[idx1][idx2]}</p>
                            {/* TODO notDone bookmark done    0 1 2 */}
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
        <Link to={`/plan/${slug}/questions`}>
          <Button>View Questions</Button>
        </Link>
      </div>
    </div>
  );
}

export default Plan;
