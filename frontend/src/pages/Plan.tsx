import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { makeFirstLetterUp } from "@/lib/formatFuncs";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";

function Plan() {
  const { slug } = useParams();

  const [plan, setPlan] = useState({
    roadmap: [[""]],
    createdAt: Date.now(),
  });

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/plan/${slug}`
      );
      console.log(res.data.data);
      // console.log(JSON.parse(res.data.data));
      setPlan({
        roadmap: JSON.parse(res.data.data.roadmap),
        createdAt: res.data.data.createdAt,
      });
      // setPlan(res.data.data);
    })();
  }, [slug]);

  //   {
  //     "roadmap": "[[\"Relational Database Basics\",\"SQL Syntax Fundamentals\",\"Data Types & Constraints\",\"Database Normalization\",\"ACID Properties\"],[\"Single-table Operations\",\"Basic Joins (Inner/Left)\",\"Simple Aggregations\",\"ETL Pattern Introduction\",\"Incremental Loads\"],[\"Complex Joins (Right/Full/Cross)\",\"Subqueries\",\"CTE vs Temp Tables\",\"CDC Patterns\",\"Query Caching\"],[\"Window Functions\",\"Query Optimization Basics\",\"Indexing 101\",\"Cost-Based Optimization\"],[\"Execution Plan Analysis\",\"Partitioning Strategies\",\"ETL Pattern Implementation\",\"Bulk Operations\",\"Partition Pruning\"],[\"Advanced Indexing\",\"Query Profiling\",\"Cloud SQL Integration\",\"Star Schema Design\",\"Materialized Views\"],[\"Cost-Based Optimization\",\"Cloud SQL Best Practices\",\"Query Logging\",\"Database Maintenance\",\"Company-Specific Patterns\"]]",
  //     "createdAt": "2025-03-04T10:25:12.489Z"
  // }

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-8 mb-5">
        Your Plan: {slug}
      </h1>
      {/* plan details */}
      <div className="mb-5">
        <div className="w-full px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* roadmap */}
          {plan.roadmap &&
            plan.roadmap[0][0].length !== 0 &&
            plan.roadmap.map((roadmap, idx) => {
              return (
                <Card key={idx} className="shadow shadow-gray-600">
                  <CardHeader>
                    <CardTitle className="text-blue-500 text-center">
                      Checkpoint {idx + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      {roadmap.map((roadmapItem, idx) => {
                        return (
                          <div key={idx} className="flex justify-between">
                            <p>{makeFirstLetterUp(roadmapItem)}</p>
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
