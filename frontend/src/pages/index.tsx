import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Inter } from "@next/font/google";
import { FiFilter } from "react-icons/fi";
import { GetStaticProps } from "next";
import Link from "next/link";
import NewComics from "~/components/features/NewComics";

const inter = Inter({ subsets: ["latin"] });
import Head from "~/components/shared/Head";
import Section from "~/components/shared/Section";
import SectionSwiper from "~/components/shared/SectionSwiper";
import { MANGA_BROWSE_PAGE, MANGA_PATH_NAME } from "~/constants";
import { axiosClient } from "~/services/axiosClient";
import { INewComics, HotComic } from "~/types";
interface Props {
  hotComics: HotComic;
  newComics: INewComics;
}
export default function Home({ hotComics, newComics }: Props) {
  return (
    <>
      <Head />
      <Section title="Truyện nổi bật" link={`/${MANGA_BROWSE_PAGE}?sort=top`}>
        <SectionSwiper mangaList={hotComics.data} />
      </Section>
      <Section
        title="Truyện mới cập nhật"
        link={`/${MANGA_BROWSE_PAGE}?sort=update`}
        rightContent={
          <Link href={"/browse"}>
            <FiFilter className="w-8 h-8 text-red" />
          </Link>
        }
      >
        <NewComics comics={newComics} />
        <Link
          href="/browse?sort=update"
          className=" ml-auto mt-10 mr-10 p-3 rounded-md hover:text-white flex items-center gap-4 hover:bg-accent dark:text-white "
        >
          Xem thêm
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </Section>
    </>
  );
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [{ data: hotComics }, { data: newComics }] = await Promise.all([
      axiosClient.get("/lhmanga/hot-comic"),
      axiosClient.get("/lhmanga"),
    ]);
    return {
      props: { hotComics, newComics },
      revalidate: 3600,
    };
  } catch (error) {
    console.log({ loi: "loi load truyen ", error });
    return {
      notFound: true,
    };
  }
};
