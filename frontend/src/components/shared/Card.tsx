import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MANGA_PATH_DETAILS_NAME,
  MANGA_PATH_NAME,
  MANGA_PATH_READ_NAME,
} from "~/constants";
import { ComicCard } from "~/types";
import ImageWrapper from "./ImageWrapper";
import MyLink from "./MyLink";

type Props = {};

const Card = ({ comic }: { comic: ComicCard }) => {
  const [fallback, setFallback] = useState<string | null>(null);
  const handleErrorImage = () => {
    setFallback("/static/media/404-image.jpg");
  };
  return (
    <div className="flex flex-col overflow-hidden dark:text-white">
      <div className="aspect-h-4 aspect-w-3  overflow-hidden rounded-lg">
        <MyLink
          as={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic.slug}`}
          href={`/comic/details/${comic.slug}`}
        >
          <ImageWrapper>
            <Image
              src={fallback || (comic.image as string)}
              alt=""
              fill
              placeholder="blur"
              blurDataURL="/static/media/lazy_loading.gif"
              className="absolute object-cover top-0 left-0  object-center block 
              hover:scale-110 transition duration-400"
              onError={handleErrorImage}
            />
          </ImageWrapper>
        </MyLink>
      </div>
      <MyLink
        as={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic.slug}`}
        href={`/comic/details/${comic.slug}`}
      >
        <h1
          className="text-sm line-clamp-3 hover:text-red-500 sm:text-md md:text-lg"
          title={comic.name}
        >
          {comic.name}
        </h1>
      </MyLink>
      <span className=" text-sm ">
        <Link
          as={`${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${comic.slug}/${comic.newChapSlug}`}
          href={"/comic/read/[...slug]"}
        >
          {comic.newChap}
        </Link>
      </span>
    </div>
  );
};

export default Card;
