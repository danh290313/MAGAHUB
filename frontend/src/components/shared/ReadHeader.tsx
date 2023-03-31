import React from "react";
import { Chapter } from "~/types";

type Props = {
  chapter: Chapter;
};

const ReadHeader = ({ chapter }: Props) => {
  return (
    <div className="py-8 text-center">
      <h2 className="text-xl font-bold dark:text-white">
        {chapter?.currentChapter.title}
      </h2>
    </div>
  );
};

export default ReadHeader;
