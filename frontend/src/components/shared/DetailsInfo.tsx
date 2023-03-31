import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, memo, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from "~/constants";
import useNotification from "~/hooks/useNotification";
import { Comic } from "~/types";
// import { isExactMatch } from '~/utils/stringHandler';
// import torriGate from '/public/images/torri-gate.jpg';

import { BellIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import {
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";
import { useTheme } from "~/context/themeContext";
import useFollow from "~/hooks/useFollow";

interface DetailsInfoProps {
  manga: Comic;
  //   chapters?: Comic["chapters"];
  isLoading: boolean;
}

// const url = SOURCE_COLLECTIONS['NTC'];

function DetailsInfo({ manga, isLoading }: DetailsInfoProps) {
  const router = useRouter();
  const notification = useNotification();
  const follow = useFollow();
  const { data: session, status } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const lastChapSlug = manga?.chapters[0].slug;
  const firstChapSlug = manga?.chapters[manga.chapters.length - 1].slug;
  const [theme] = useTheme();
  //   console.log({ firstChapSlug, lastChapSlug });

  const handleTurnOnNotification = async () => {
    const response = await notification.subscribe(manga?.slug);
    switch (response) {
      case "permission_denied":
        toast.error("Cần cấp quyền thông báo!", {
          duration: 2000,
          style: { zIndex: 899 },
        });
        break;
      case "unsupported_browser":
        toast.error("Trình duyệt của bạn không hỗ trợ thông báo!", {
          duration: 2000,
          style: { zIndex: 899 },
        });
        break;
      case "success":
        toast.success("Bật thông báo thành công!", {
          duration: 2000,
          style: { zIndex: 899 },
        });
        setIsSubscribed(true);
        break;
      default:
        toast.error("Có gì đó sai sai! Thử lại sau nhé :<", {
          duration: 2000,
          style: { zIndex: 899 },
        });
    }
  };
  const handleTurnOffNotification = async () => {
    const response = await notification.unsubscribe(manga?.slug);
    switch (response) {
      case "success":
        toast.success("Tắt thông báo thành công!", {
          duration: 3000,
          style: { zIndex: 899 },
        });
        setIsSubscribed(false);
        break;
      case "error":
        toast.error("Có gì đó không đúng?, Vui lòng thử lại", {
          duration: 3000,
          style: { zIndex: 899 },
        });
        break;
    }
  };
  const handleFollow = async () => {
    if (status === "unauthenticated") {
      // router.push("/login");
      toast.error("Đăng nhập để lưu truyện");
      return;
    }
    if (isFollowed) {
      const res = await follow._delete(manga?.slug);
      if (res) {
        toast.success("Bỏ lưu thành công");
        setIsFollowed(!isFollowed);
      } else toast.error("Có gì đó không ổn, hãy thử lại sau!");
    } else {
      const res = await follow.add(manga?.slug);
      if (res) {
        toast.success("Lưu truyện thành công");
        setIsFollowed(!isFollowed);
      } else toast.error("Có gì đó không ổn, hãy thử lại sau!");
    }
  };
  useEffect(() => {
    if (manga?.slug) {
      (async function () {
        const res = await notification.info(manga?.slug);
        if (res === "subscribed") {
          setIsSubscribed(true);
        }
      })();
      follow.setReaded(manga.slug);
    }
    // @ts-ignore
    if (manga?.slug && session?.user?.id) {
      (async function () {
        // @ts-ignore
        const res = await follow.get(manga?.slug);
        if (res === "followed") {
          setIsFollowed(true);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email, manga?.slug]);

  const handleNotify = () => {
    if (status === "unauthenticated") {
      toast.error("Đăng nhập để bật thông báo");
      return;
    }
    isSubscribed ? handleTurnOffNotification() : handleTurnOnNotification();
  };
  return (
    <>
      <div className="text-black col-span-3 flex h-full w-full flex-col items-center overflow-x-hidden md:flex-row md:items-start  dark:text-white">
        <Toaster position="bottom-center" reverseOrder={false} />

        {/* manga desc*/}
        <div className="flex h-full w-full flex-col  p-2 md:min-h-[430px] lg:ml-4  ">
          <div className=" w-full space-y-4  md:ml-2 md:text-left lg:w-[80%]">
            {isLoading ? (
              <>
                <Skeleton
                  inline={true}
                  baseColor={theme === "dark" ? "#202020" : ""}
                  highlightColor="#444"
                  className="my-2 h-[30px] overflow-hidden"
                />
                <Skeleton
                  // inline={true}
                  baseColor={theme === "dark" ? "#202020" : ""}
                  highlightColor="#444"
                  className="my-2 max-w-[70%] md:min-h-[32px]"
                />
                <Skeleton
                  // inline={true}
                  baseColor={theme === "dark" ? "#202020" : ""}
                  highlightColor="#444"
                  className="my-2 max-w-[50%] md:min-h-[32px]"
                />

                <Skeleton
                  inline={true}
                  baseColor={theme === "dark" ? "#202020" : ""}
                  highlightColor="#444"
                  className="my-2 max-w-[25%] md:min-h-[32px]"
                />
              </>
            ) : (
              <>
                {manga?.otherName && (
                  <>
                    <span className="font-bold">Tên khác: </span>
                    {manga?.otherName?.map((v, idx) => (
                      <Fragment key={idx}>
                        <span>{v.label}</span>
                        {/* @ts-ignore */}
                        {idx !== manga.otherName?.length - 1 && " , "}
                      </Fragment>
                    ))}
                  </>
                )}

                {manga?.author && (
                  <div className="flex flex-wrap">
                    <span className="font-bold mr-2">Tác giả: </span>
                    {manga.author.map((v, idx) => (
                      <Fragment key={idx}>
                        <Link href={`/search?artist=${v.slug}`}>
                          <span className="cursor-pointer hover:text-red-500">
                            {v.label}
                          </span>
                        </Link>
                        {/* @ts-ignore */}
                        {idx !== manga.author?.length - 1 && " , "}
                      </Fragment>
                    ))}
                  </div>
                )}

                {manga?.genres && (
                  <div className="flex flex-wrap">
                    <span className="font-bold whitespace-nowrap">
                      Thể loại:{" "}
                    </span>
                    {manga.genres.map((v, idx) => (
                      <Link
                        key={idx}
                        href={`/browse?genre=${v.slug}` as string}
                        className="  w-fit h-fit text-center flex justify-start mb-2"
                      >
                        <span
                          className=" bg-slate-400/25 rounded-xl cursor-pointer hover:text-red-500 
                                    backdrop-blur-2xl whitespace-nowrap mx-1 px-2 md:text-lg"
                        >
                          {v.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                {manga?.status && (
                  <div className="flex gap-3">
                    <span className="font-bold">Trạng thái: </span>
                    {manga.status.map((v, idx) => (
                      <>
                        <Link href={`/browse?${v.slug}`} className="">
                          <span className="cursor-pointer hover:text-red-500">
                            {v.label}
                          </span>
                        </Link>
                        {idx !== (manga.status?.length as number) - 1 && " , "}
                      </>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 md:flex-col">
            {/* manga interrace  */}
            <div className="flex w-full flex-col sm:flex-row items-center  gap-6 md:my-0 md:flex-row md:items-start">
              {isLoading ? (
                <div className="flex flex-col ssm:flex-row w-full items-center justify-evenly">
                  <div className="w-[124px] h-[44px] my-2 rounded-2xl">
                    <Skeleton
                      baseColor={theme === "dark" ? "#202020" : ""}
                      highlightColor="#444"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="w-[124px] h-[44px] my-2 rounded-2xl">
                    <Skeleton
                      baseColor={theme === "dark" ? "#202020" : ""}
                      highlightColor="#444"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                manga?.chapters && (
                  <div className="flex flex-col ssm:flex-row justify-between items-center gap-5">
                    <Link
                      href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${manga.slug}/${lastChapSlug}`}
                    >
                      <button className="items-center border-2  px-2 py-2 hover:scale-105 rounded-xl border-black dark:border-white ">
                        Chap mới nhất
                      </button>
                    </Link>

                    <Link
                      href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${manga.slug}/${firstChapSlug}`}
                    >
                      <button className="items-center border-2 px-2 py-2 hover:scale-105 rounded-xl border-black dark:border-white ">
                        Đọc ngay
                      </button>
                    </Link>
                  </div>
                )
              )}

              <div className="flex w-fit gap-6">
                {!isLoading && (
                  <>
                    <button
                      onClick={handleFollow}
                      className="flex items-centers bg-hight-light p-2 rounded-xl transition-all "
                    >
                      {isFollowed ? (
                        <BookmarkIconSolid className="w-8 h-8 self-center " />
                      ) : (
                        <BookmarkIcon className="w-8 h-8 self-center " />
                      )}
                    </button>

                    <button
                      onClick={handleNotify}
                      className="absolute-center bg-hight-light p-2 rounded-xl transition-all hover:text-primary "
                    >
                      {isSubscribed ? (
                        <BellIconSolid className="animate__animated animate__faster animate__heartBeat h-8 w-8 text-red-500" />
                      ) : (
                        <BellIcon className="animate__animated animate__faster animate__heartBeat h-8 w-8" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(DetailsInfo);
