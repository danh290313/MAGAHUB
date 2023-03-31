import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ReactNode, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import Reader from "~/components/features/Reader";
import VerticalPanel from "~/components/features/VerticalPanel";
import ReadingLayout from "~/components/layout/ReadingLayout";
import Head from "~/components/shared/Head";
import ReadHeader from "~/components/shared/ReadHeader";
import Section from "~/components/shared/Section";
import Teleport from "~/components/shared/Teleport";
import ReadingContextProvider from "~/context/ReadingContext";
import useFollow from "~/hooks/useFollow";
import { axiosClient } from "~/services/axiosClient";
import { Chapter, ChapterDetails, PageInfo, VistedComic } from "~/types";
type Props = {
  data: Chapter;
};
interface Params extends ParsedUrlQuery {
  slug: string[];
}
// type Props = {};
// interface ReadPageProps {
//   pagesDetail: PageInfo;
//   chaptersDetail: ChapterDetails;
// }

const ReadPage = ({ data }: Props) => {
  // const { chapter, comicSlug, pages } = data;
  const follow = useFollow();
  const { isFallback } = useRouter();
  const [_, setReadingHistory] = useLocalStorage(
    "visited-comics",
    [] as VistedComic[]
  );

  useEffect(() => {
    if (!isFallback) {
      (async () => {
        try {
          await follow.setReaded(data?.comicSlug, data?.currentChapter?.slug);
        } catch (err) {
          console.log(err);
        }
      })();
      if (!isFallback) {
        setReadingHistory((prev) => {
          if (!prev.find((comic) => comic.slug === data?.comicSlug)) {
            prev.push({
              chapterSlug: [],
              name: data?.name,
              image: data?.image,
              // @ts-ignore
              slug: data?.comicSlug,
              genres: data?.genres,
              summary: data?.summary,
            });
          }
          //add new chapter slug to history
          const chapter = prev.find(
            (comic) => comic.slug === data?.comicSlug
          )?.chapterSlug;
          if (!chapter?.find((chap) => chap === data?.currentChapter?.slug)) {
            chapter?.push(data?.currentChapter?.slug);
          }
          return prev;
        });
      }
    }
  }, [isFallback, data]);
  return (
    <>
      {!isFallback && data && (
        <>
          <Head title={data?.currentChapter?.slug + " | " + data?.name} />
          <ReadHeader chapter={data} />
          <div className="dark:text-white">
            <Teleport selector="body">
              <VerticalPanel chapter={data} />
            </Teleport>
            <Reader loading={isFallback} chapter={data} />
          </div>
        </>
      )}
    </>
  );
};

export default ReadPage;
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return { paths: [], fallback: "blocking" };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const {
      slug: [mangaSlug, chapterSlug],
    } = context.params as Params;
    const { data } = await axiosClient.get(
      "/lhmanga/comic/" + mangaSlug + "/" + chapterSlug
    );
    if (!data)
      return {
        notFound: true,
      };
    else {
      return {
        props: { data },
        revalidate: 18000,
      };
    }
  } catch (err) {
    return { notFound: true };
  }
};
ReadPage.getLayout = (page: ReactNode) => <ReadingLayout>{page}</ReadingLayout>;
