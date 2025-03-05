import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlanQues } from "@/lib/types";
import Questions from "@/components/custom/Questions";

function PlanQuestions() {
  const { slug } = useParams();

  const [plan, setPlan] = useState<IPlanQues>();

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
    <Questions
      questions={plan?.questions ?? []}
      queIdxs={plan?.queIdxs ?? []}
      slug={slug ?? ""}
    />
  );
}

export default PlanQuestions;
