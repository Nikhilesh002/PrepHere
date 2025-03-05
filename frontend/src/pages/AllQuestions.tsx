import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IQuestion } from "@/lib/types";
import Questions from "@/components/custom/Questions";
import axios from "axios";

function AllQuestions() {
  const { slug } = useParams();
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/question`);
      console.log(res.data);
      setQuestions(res.data.questions);
    })();
  }, [slug]);

  if (!questions || questions.length === 0) return <h1>Loading...</h1>;

  return <Questions questions={questions} queIdxs={[]} slug={slug ?? ""} />;
}

export default AllQuestions;
