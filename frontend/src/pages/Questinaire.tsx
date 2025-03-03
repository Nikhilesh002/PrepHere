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
import data from "../../public/analysis.json";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { axiosWithToken } from "@/lib/axiosWithToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

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
    };
  }, []);

  const [formData, setFormData] = useState(initialFormData);

  const makeFirstLetterUp = useCallback((str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  }, []);

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
      console.log(formData);

      if (!userData.user) {
        toast.error("Please login to continue");
        return;
      }

      if (hasEmptyValues(formData)) {
        toast.error("Please fill all the fields");
        return;
      }

      formData.slug = makeSlug(formData.slug); // it wii br in url

      // send to db
      const res = await axiosWithToken.post(
        `${import.meta.env.VITE_API_URL}/questionare`,
        formData
      );

      if (res.status === 201) {
        toast.success(res.data.msg);
        setFormData(initialFormData);

        // navigate to plan page
        navigate(`/plan/${formData.slug}`);
        return;
      }

      toast.error(res.data.msg);
    },
    [formData, makeSlug, hasEmptyValues, initialFormData, navigate, userData]
  );

  return (
    <div className="w-full h-screen pb-20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 rounded-2xl border shadow shadow-gray-400 px-10 py-8 space-y-4"
      >
        <h1 className="text-lg font-bold gap-1.5">
          Answer the following questions to cook you a Customised plan
        </h1>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Enter unique slug for this plan</Label>
          <Input
            id="name"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <h1 className="font-serif">Select all the options</h1>
        </div>

        {Object.entries(data).map(([key, values]) => {
          return (
            <div
              key={key}
              className="grid w-full max-w-sm items-center gap-1.5"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {makeFirstLetterUp(key) + ": "}
                    <span>
                      {formData[key as keyof typeof formData] ||
                        "Select an Option"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto ">
                  {values.map((value) => {
                    const upValue = makeFirstLetterUp(value);
                    return (
                      <DropdownMenuCheckboxItem
                        key={value}
                        checked={
                          formData[key as keyof typeof formData] === upValue
                        }
                        onCheckedChange={(e) =>
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

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="challenges">Main Challenges</Label>
          <Textarea
            value={formData.challenges}
            onChange={(e) =>
              setFormData({ ...formData, challenges: e.target.value })
            }
            id="challenges"
            placeholder="Briefly describe your main challenges you face when you prepare for SQL interviews"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {userData.user ? "Create Plan" : "Signin to Create Plan"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Questinaire;
