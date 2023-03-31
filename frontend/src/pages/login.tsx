import React, { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import MainLayout from "~/components/layout/MainLayout";
import usePreviousRoute from "~/context/HistoryRouteContext";

type Props = {};

const LoginPage = (props: Props) => {
  const hsRouteCtx = usePreviousRoute();
  return (
    <div className="h-screen flex items-center bg-[url('/static/media/login-wallpaper.jpg')] bg-center">
      <div
        className="w-[300px] bg-white py-6 p-3 m-auto sm:w-[400px] text-center
         flex flex-col justify-center gap-10 rounded-lg
      "
      >
        <span className="text-xl md:text-4xl text-black dark:text-white font-primary uppercase tracking-[5px]">
          MANGA HUB
        </span>
        <div
          className="bg-white rounded-lg p-2 flex items-center justify-evenly cursor-pointer
         max-w-[400px] space-x-5 mx-auto transition duration-200 hover:scale-110 border-2"
          onClick={() =>
            signIn("google", {
              callbackUrl: hsRouteCtx?.url ? hsRouteCtx?.url : "/",
            })
          }
        >
          <FcGoogle className="w-6 h-6 " />
          <span className="text-lg">Đăng nhập với Google</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
LoginPage.getLayout = (page: ReactNode) => <>{page}</>;
