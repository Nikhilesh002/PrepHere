import { axiosWithToken } from "@/lib/axiosWithToken";
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function Plans() {
  const [allPlans, setAllPlans] = useState<any[]>();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/plan`
      );
      console.log(res);
      setAllPlans(res.data.data);
    })();
  }, []);

  const handleClick = useCallback(
    (slug: string) => {
      navigate(`/plan/${slug}`);
    },
    [navigate]
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl text-center font-bold mt-8 mb-5">Your Plans</h1>
      <div className="w-full px-10 sm:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ">
        {allPlans &&
          allPlans.length !== 0 &&
          allPlans?.map((plan, idx) => {
            return (
              <Card
                key={idx}
                onClick={() => handleClick(plan.slug)}
                className="w-full h-52 text-center shadow-sm shadow-gray-600"
              >
                <CardHeader>
                  <CardTitle>{plan.slug}</CardTitle>
                  <CardDescription>
                    {dayjs(plan.createdAt).format("DD-MMM-YYYY HH:mm")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{plan.roadmap.slice(0, 70)}</p>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Plans;
