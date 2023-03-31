import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Skeleton from "react-loading-skeleton";
import DetailsInfo from "~/components/shared/DetailsInfo";
import Head from "~/components/shared/Head";
import { axiosClient } from "~/services/axiosClient";
import { Comic, VistedComic } from "~/types";

import { useRouter } from "next/router";
import { useState } from "react";
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from "~/constants";
import { useTheme } from "~/context/themeContext";
import useFollow from "~/hooks/useFollow";
import { useReadLocalStorage } from "usehooks-ts";
type Props = {
  comic: Comic;
};
interface Params extends ParsedUrlQuery {
  slug: string;
}

const Details: NextPage<Props> = ({ comic }) => {
  const [hideSummary, setHideSummary] = useState(true);
  const router = useRouter();
  const [theme] = useTheme();
  const visitedChapters = (
    useReadLocalStorage("visited-comics") as VistedComic[]
  )?.find((_comic) => _comic?.slug === comic?.slug)?.chapterSlug;
  // @ts-ignore
  if (router.isFallback)
    return <div className="text-4xl pt-20">Loading...</div>;
  return (
    <>
      <Head
        title={`${comic ? comic?.name + " - " : ""}  Manga-hub`}
        description={`${comic?.summary}`}
      />
      <div className="flex flex-col w-[90%] max-w-[1300px] mx-auto justify-center items-center text-black dark:text-white ">
        <div className="mt-10 w-full ">
          {router.isFallback ? (
            <div className="w-[50%] mx-auto">
              <Skeleton
                // inline={true}
                baseColor={theme === "dark" ? "#202020" : ""}
                highlightColor="#444"
                className="!w-full my-2 h-[30px] overflow-hidden mx-auto"
              />
            </div>
          ) : (
            <h1 className="text-2xl w-full text-center uppercase md:text-3xl ">
              {comic?.name}
            </h1>
          )}

          {router.isFallback ? (
            <div className="w-[40%] mx-auto">
              <Skeleton
                baseColor={theme === "dark" ? "#202020" : ""}
                highlightColor="#444"
                className="!w-full my-2 h-[20px] overflow-hidden mx-auto"
              />
            </div>
          ) : (
            <div className=" m-auto text-center text-gray-500">{`[ Cập nhật lúc ${
              comic?.statisticValue && comic?.statisticValue[0].value
            } ]`}</div>
          )}

          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col items-center sm:items-start sm:grid sm:grid-cols-4 gap-[20px] mt-8">
              <div className="col-span-1 w-[200px] sm:w-full">
                {router.isFallback ? (
                  <div className="aspect-w-3 aspect-h-4 relative rounded-2xl">
                    {/* <Skeleton
                        // inline={true}
                        baseColor={theme === "dark" ? "#202020" : ""}
                        highlightColor="#444"
                        className="!w-full my-2 h-full overflow-hidden mx-auto"
                      /> */}
                    <Image src="/static/media/lazy_loading.gif" alt="" fill />
                  </div>
                ) : (
                  <figure className="aspect-w-3 aspect-h-5 relative rounded-2xl">
                    <Image
                      className="absolute inset-0 rounded-2xl object-cover object-center"
                      fill
                      alt="manga-thumbnail"
                      src={
                        // manga?.thumbnail
                        //   ? isExactMatch(manga.thumbnail, "res.cloudinary.com")
                        //     ? manga.thumbnail
                        //     : `${PROXY_SERVER}/proxy?url=${url}&src=${manga.thumbnail}`
                        //   : torriGate
                        comic?.image
                      }
                    />
                  </figure>
                )}
              </div>
              <div className="w-full sm:col-span-3 flex flex-col gap-4">
                <DetailsInfo
                  isLoading={router.isFallback}
                  manga={comic}
                  // chapters={chaptersInfo}
                />
              </div>
            </div>

            {/* tom tat */}
            <div className="relative">
              <div className="text-md font-bold">Tóm tắt</div>
              <div
                className={` md:pb-[40px] overflow-hidden ${
                  hideSummary ? "pb-10 " : ""
                }`}
              >
                <p
                  className={`text-lg md:text-xl   ${
                    hideSummary
                      ? "!max-h-[100px]  md:!max-h-[70px]  text-transparent bg-clip-text bg-gradient-to-b from-black to-white dark:from-white dark:to-slate-700 "
                      : ""
                  }`}
                >
                  {comic?.summary}
                </p>
              </div>

              <div
                className={`text-md font-semibold w-full cursor-pointer ${
                  hideSummary && "absolute top-0 h-full "
                }`}
                onClick={() => setHideSummary(!hideSummary)}
              >
                <span className={hideSummary ? "absolute bottom-0 " : ""}>
                  {hideSummary ? "Xem thêm" : "Ẩn đi"}
                </span>
              </div>
            </div>
            {/* danh sach chuong */}
            <div>
              <div className="flex flex-col gap-4">
                <h3 className="font-bold">Danh sách chương</h3>
                <div className=" ">
                  {comic?.chapters.map((chap, index) => (
                    <Link
                      href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${comic.slug}/${chap.slug}`}
                      className={`flex justify-between p-2  hover:bg-slate-400
                          dark:bg-transparent dark:hover:bg-slate-400 border-b-[1px] 
                           border-gray-400 dark:border-slate-500
                          ${
                            visitedChapters &&
                            visitedChapters.find(
                              (chapterSlug) => chapterSlug === chap.slug
                            ) &&
                            " text-gray-300 dark:text-slate-500"
                          } `}
                      key={chap.link}
                    >
                      <span className="truncate">{chap.title}</span>
                      <span>{chap.time}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </ClientOnly> */}
    </>
  );
};

export default Details;
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return { paths: [], fallback: "blocking" };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params as Params;
  try {
    const { data } = await axiosClient.get("/lhmanga/comic/" + slug);
    if (!data) return { notFound: true };
    return {
      props: {
        comic: data,
      },
      revalidate: 1 * 60 * 60,
    };
  } catch (err) {
    return { notFound: true };
  }
};
