import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from "~/constants";
import { Chapter } from "~/types";

type Props = {
  chapter: Chapter;
};

const ChapterNav = ({ chapter }: Props) => {
  const currentChapIndex = chapter.allChapters.findIndex(
    (chap) => chap.slug === chapter.currentChapter.slug
  );
  const nextChap = chapter.allChapters[currentChapIndex - 1];
  const prevChap = chapter.allChapters[currentChapIndex + 1];
  const router = useRouter();
  const goToPrevChap = () => {
    if (prevChap?.slug)
      router.replace(chapter.comicSlug + "/" + prevChap?.slug);
    else
      router.push(
        `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${chapter.comicSlug}`
      );
  };

  const goToNextChap = () => {
    if (nextChap?.slug)
      router.replace(chapter.comicSlug + "/" + nextChap?.slug);
    else
      router.push(
        `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${chapter.comicSlug}`
      );
  };
  return (
    <div className="flex gap-2 w-full justify-between">
      <button
        className="bg-accent w-[15%] rounded-md disabled:cursor-not-allowed "
        onClick={goToPrevChap}
      >
        <ArrowLeftIcon className="w-5 h-5 mx-auto" />
      </button>
      <select
        className="bg-gray-400 p-4 text-white bg-accent w-[65%] rounded-md"
        onChange={(e) =>
          router.replace(chapter.comicSlug + "/" + e.target.value)
        }
        defaultValue={chapter.currentChapter.slug}
      >
        {chapter.allChapters.map((chap) => (
          <option key={chap.slug} value={chap.slug}>
            {/* <Link href={"/"} className="p-3 block"> */}
            {chap.title}
            {/* </Link> */}
          </option>
        ))}
      </select>
      <button
        className="bg-accent w-[15%] rounded-md disabled:cursor-not-allowed"
        onClick={goToNextChap}
      >
        <ArrowRightIcon className="w-5 h-5 mx-auto" />
      </button>
    </div>
  );
};

export default ChapterNav;
