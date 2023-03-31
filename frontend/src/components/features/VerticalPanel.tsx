import { XMarkIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { memo, useRef, useState } from "react";
import { Chapter } from "~/types";
import { useSideBarStatus } from "~/atoms";
import classNames from "classnames";
import ChapterNav from "./ChapterNav";
import Link from "next/link";
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from "~/constants";
import { useOnClickOutside } from "usehooks-ts";
type Props = {
  chapter: Chapter;
};

const VerticalPanel = ({ chapter }: Props) => {
  const ref = useRef(null);
  const [isOpen, toggleSidebar] = useSideBarStatus();
  useOnClickOutside(ref, () => toggleSidebar(false));
  return (
    <aside
      ref={ref}
      className={classNames(
        "fixed top-0 right-0 h-screen bg-black z-[999] text-white transition-all duration-100",
        `${!isOpen && "-right-[var(--reading-sidebar-width)]"}`
      )}
    >
      <div className=" w-[312px] max-w-[100vw] p-4 flex flex-col gap-4">
        <button
          className="-mx-2 p-2 rounded-full hover:bg-gray-400/40 w-fit"
          onClick={() => toggleSidebar(false)}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="flex gap-4 ">
          <BookOpenIcon className="w-6 h-6 flex-shrink-0" />
          <Link
            href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${chapter?.comicSlug}`}
            className="text-red-500 font-bold font-primary text-lg truncate"
          >
            {chapter?.name}
          </Link>
        </div>
        <div className="flex gap-4 truncate">
          <DocumentIcon className="w-6 h-6 flex-shrink-0" />
          <h1>{chapter?.currentChapter.title}</h1>
        </div>
        <ChapterNav chapter={chapter} />
      </div>
    </aside>
  );
};

export default memo(VerticalPanel);
