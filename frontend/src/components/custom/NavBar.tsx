import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Separator } from "@radix-ui/react-menubar";
import { ModeToggle } from "../ui/mode-toggle";
import { useSelector } from "react-redux";
import { logout } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { axiosWithToken } from "@/lib/axiosWithToken";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

const NavBar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user);
  // const [userData, setUserData] = React.useState<UserState["user"] | null>(
  //   useSelector((state: UserState) => state.user)
  // );

  const isActive = (path: string) =>
    location.pathname === path ? "bg-white text-black" : "bg-black text-white";

  const handleSignout = async () => {
    try {
      const res = await axiosWithToken.get(
        `${import.meta.env.VITE_API_URL}/user/signout`
      );

      if (res.status === 200) {
        toast.success(res.data.msg);
        dispatch(logout());
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Signout failed");
    }
  };

  return (
    <div className="w-full">
      <nav className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">PrepHere</h1>
        <Menubar className="shadow shadow-white">
          <Link className={`px-3 py-2 `} to="/">
            <MenubarMenu>
              <p
                className={`transition-colors duration-300 ease-in-out rounded px-3 py-0.5 ${isActive(
                  "/"
                )}`}
              >
                Home
              </p>
            </MenubarMenu>
          </Link>
          <Link className={`px-3 py-2 `} to="/questionaire">
            <MenubarMenu>
              <p
                className={`transition-colors duration-300 ease-in-out rounded px-3 py-0.5 ${isActive(
                  "/questionaire"
                )}`}
              >
                Create prep plan
              </p>
            </MenubarMenu>
          </Link>
          <Link className={`px-3 py-2 `} to="/plan">
            <MenubarMenu>
              <p
                className={`transition-colors duration-300 ease-in-out rounded px-3 py-0.5 ${isActive(
                  "/plan"
                )}`}
              >
                Your prep plans
              </p>
            </MenubarMenu>
          </Link>
          {userData.user ? (
            <Link className={`px-3 py-2 `} to="/" onClick={handleSignout}>
              <MenubarMenu>
                <p
                  className={`transition-colors duration-300 ease-in-out rounded px-3 py-0.5`}
                >
                  Signout
                </p>
              </MenubarMenu>
            </Link>
          ) : (
            <Link className={`px-3 py-2 `} to="/signin">
              <MenubarMenu>
                <p
                  className={`transition-colors duration-300 ease-in-out rounded px-3 py-0.5 ${isActive(
                    "/signin"
                  )}`}
                >
                  SignIn
                </p>
              </MenubarMenu>
            </Link>
          )}
          <ModeToggle />
        </Menubar>
        <div className=""></div>
      </nav>
      <Separator />
    </div>
  );
};

export default NavBar;
