import { axiosWithToken } from "@/lib/axiosWithToken";
import { useEffect, useState } from "react";

function Plans() {
  const [allPlans, setAllPlans] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/plan`
      );
      console.log(res);
      setAllPlans(res.data);
    })();
  }, []);

  return (
    <div>
      All plans of user
      {JSON.stringify(allPlans, null, 2)}
    </div>
  );
}

export default Plans;
