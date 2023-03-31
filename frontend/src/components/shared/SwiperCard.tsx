import Image from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";
import { ComicCard } from "~/types";
import { MANGA_PATH_NAME, MANGA_PATH_DETAILS_NAME } from "~/constants";
import ImageWrapper from "./ImageWrapper";
import MyLink from "./MyLink";
type Props = {
  comic: ComicCard;
};

const SwiperCard = ({ comic }: Props) => {
  return (
    <>
      <div className="aspect-h-4 aspect-w-3 rounded-xl overflow-hidden  relative">
        <MyLink
          as={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic.slug}`}
          href={`/comic/details/${comic.slug}`}
          className="block absolute"
        >
          <ImageWrapper>
            <Image
              src={comic.image as string}
              blurDataURL="/static/media/lazy_loading.gif"
              placeholder="blur"
              alt=""
              fill
              className="absolute object-cover top-0 left-0 rounded-xl  object-center block hover:scale-110 transition duration-400"
            />
          </ImageWrapper>
          <div className="absolute bottom-1 left-1 md:top-3 md:left-3 backdrop-blur-2xl  bg-slate-400/25 w-fit h-fit text-center flex justify-center rounded-xl">
            <p className="flex items-center whitespace-nowrap text-sm px-2 py-1 max-w-[95px] truncate md:max-w-none">
              {comic.newChap}
            </p>
          </div>
        </MyLink>
      </div>
      <MyLink
        as={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic.slug}`}
        href={`/comic/details/${comic.slug}`}
        className="block bottom-0"
      >
        <h2 className="hover:text-red-400 absolute w-full truncate text-xs text-black md:text-lg max-w-[200px] dark:text-white">
          {comic.name}
        </h2>
      </MyLink>
    </>
  );
};

export default memo(SwiperCard);
