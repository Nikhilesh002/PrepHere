import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "@/assets/analysis.json";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { axiosWithToken } from "@/lib/axiosWithToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { makeFirstLetterUp } from "@/lib/formatFuncs";
import { Slider } from "@/components/ui/slider";

function Questinaire() {
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const initialFormData = useMemo(() => {
    return {
      slug: "",
      difficulty: "",
      category: "",
      country: "",
      ctc: "",
      companyName: "",
      yoe: "",
      role: "",
      challenges: "",
      noOfWeeks: 3,
      noOfHoursPerWeek: 20,
      cnt: 25,
    };
  }, []);

  const myLabels = useMemo(() => {
    return {
      difficulty: "Difficulty",
      category: "Focus Areas",
      country: "Country",
      ctc: "Targeting CTC",
      companyName: "Company Name",
      yoe: "Years of Experience",
      role: "Role",
      challenges: "Challenges",
      noOfWeeks: "Study Commitment (Weeks)",
      noOfHoursPerWeek: "Study Commitment (Hours/Week)",
      cnt: "No of Questions",
    };
  }, []);

  const [formData, setFormData] = useState(initialFormData);

  const makeSlug = useCallback((str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }, []);

  const hasEmptyValues = useCallback((obj: any) => {
    return Object.values(obj).some((value) => value === "");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!userData.user) {
        toast.error("Please login to continue");
        return;
      }

      if (hasEmptyValues(formData)) {
        toast.error("Please fill all the fields");
        return;
      }

      formData.slug = makeSlug(formData.slug); // it wii br in url
      console.log(formData)

      // send to db
      const res = await axiosWithToken.post(
        `${import.meta.env.VITE_API_URL}/plan`,
        formData
      );

      if (res.status === 201) {
        toast.success(res.data.msg);
        setFormData(initialFormData);

        console.log(res.data);

        // navigate to plan page
        navigate(`/plan/${formData.slug}`);
        return;
      }

      toast.error(res.data.msg);
    },
    [
      formData,
      makeSlug,
      hasEmptyValues,
      initialFormData,
      navigate,
      userData.user,
    ]
  );

  return (
    <div className="w-full h-screen pb-20 flex flex-col justify-around items-center">
      <div className="w-full h-screen pb-20 flex flex-col justify-around items-center">
        <h1 className="text-xl font-bold gap-1.5 text-wrap text-center">
          Answer the following questions to cook you a Customised plan
        </h1>

        <div className="w-[400px] lg:w-[800px] rounded-2xl border shadow shadow-gray-400 px-10 py-8 space-y-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <h1 className="text-red-500">*Select all the options</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-x-7 gap-y-2 space-y-5 justify-center w-full">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="name">Enter unique slug for this plan</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
              </div>

              {Object.entries(data).map(([key, values]) => {
                return (
                  <div
                    key={key}
                    className="grid w-full max-w-sm items-center gap-1.5"
                  >
                    <label className="text-sm font-semibold">
                      {myLabels[key as keyof typeof myLabels]}
                      <span className="text-red-400">*</span>
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {formData[key as keyof typeof formData] ||
                            "Select an Option"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto ">
                        {values.map((value) => {
                          const upValue = makeFirstLetterUp(value);
                          return (
                            <DropdownMenuCheckboxItem
                              key={value}
                              checked={
                                formData[key as keyof typeof formData] ===
                                upValue
                              }
                              onCheckedChange={() =>
                                setFormData({
                                  ...formData,
                                  [key]: upValue,
                                })
                              }
                            >
                              {upValue}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap">
              <div className="w-1/2 pe-2">
                {/* no of questions */}
                <div className="w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="cnt">
                    No of Questions
                    <span className="text-red-400">*</span>
                  </Label>
                  <div className="flex justify-between mt-3">
                    <Slider
                      className="me-2"
                      id="cnt"
                      value={[formData.cnt]}
                      onValueChange={(x) =>
                        setFormData({ ...formData, cnt: x[0] })
                      }
                      defaultValue={[formData.cnt]}
                      max={150}
                      min={25}
                      step={5}
                    />
                    <p className="font-semibold text-lg">{formData.cnt}</p>
                  </div>
                </div>

                {/* no of weeks */}
                <div className="w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="noOfWeeks">
                    No of Weeks you want to prepare
                    <span className="text-red-400">*</span>
                  </Label>
                  <div className="flex justify-between mt-3">
                    <Slider
                      className="me-2"
                      id="noOfWeeks"
                      value={[formData.noOfWeeks]}
                      onValueChange={(x) =>
                        setFormData({ ...formData, noOfWeeks: x[0] })
                      }
                      defaultValue={[formData.noOfWeeks]}
                      max={15}
                      min={1}
                      step={1}
                    />
                    <p className="font-semibold text-lg">
                      {formData.noOfWeeks}
                    </p>
                  </div>
                </div>

                {/* no of hours a week */}
                <div className="w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="noOfHoursPerWeek">
                    No of hours you can spend a Weeks
                    <span className="text-red-400">*</span>
                  </Label>
                  <div className="flex justify-between mt-3">
                    <Slider
                      className=" me-2"
                      id="noOfHoursPerWeek"
                      value={[formData.noOfHoursPerWeek]}
                      onValueChange={(e) =>
                        setFormData({
                          ...formData,
                          noOfHoursPerWeek: e[0],
                        })
                      }
                      defaultValue={[formData.noOfHoursPerWeek]}
                      max={40}
                      min={8}
                      step={2}
                    />
                    <p className="font-semibold text-lg">
                      {formData.noOfHoursPerWeek}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 ps-2">
                <div className=" flex flex-col justify-center items-center gap-1.5">
                  <Label htmlFor="challenges">
                    Strengths and Weaknesses
                    <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    className="max-w-sm h-32"
                    rows={8}
                    maxLength={2000}
                    value={formData.challenges}
                    onChange={(e) =>
                      setFormData({ ...formData, challenges: e.target.value })
                    }
                    id="challenges"
                    placeholder="Briefly describe your strengthes and weaknesses you want to improve in this plan"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-5">
              <Button type="submit">
                {userData.user ? "Create Plan" : "Signin to Create Plan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Questinaire;
