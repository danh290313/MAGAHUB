import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MANGA_PATH_DETAILS_NAME,
  MANGA_PATH_NAME,
  MANGA_PATH_READ_NAME,
} from "~/constants";
import { INewComics } from "~/types";
import Card from "../shared/Card";
import ImageWrapper from "../shared/ImageWrapper";

const NewComics = ({ comics }: { comics: INewComics }) => {
  return (
    <div
      className="grid grid-cols-1 ssm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
      lg:grid-cols-6 gap-x-2 gap-y-6  overflow-hidden "
    >
      {comics.data.map((comic, key) => (
        <Card key={key} comic={comic} />
      ))}
    </div>
  );
};

export default NewComics;
