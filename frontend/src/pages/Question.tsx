import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Question() {
  const { idx } = useParams();

  const [question, setQuestion] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/question/${idx}`
      );
      console.log(res.data);
      setQuestion(res.data.question);
    })();
  }, [idx]);

  return (
    <div className="w-full px-5 pt-8 ">
      {question && (
        <div className="">
          <div className="">{question.text}</div>
          <div className="">{question.summary}</div>
          <div className="">{question.category}</div>
          <div className="">{question.country}</div>
          <div className="">{question.ctc}</div>
          <div className="">{question.companyName}</div>
          <div className="">{question.yoe}</div>
          <div className="">{question.role}</div>
        </div>
      )}
    </div>
  );
}

export default Question;
