import { HeartIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer
      className="w-full h-[40px]  text-black bg-gray-200
     flex items-center dark:bg-black absolute bottom-0 dark:text-white"
    >
      <div className="m-auto text-sm whitespace-nowrap flex w-fit">
        Made with <HeartIcon className="w-5 h-5 mx-2 text-red-500" /> by nguyen
        tu
      </div>
    </footer>
  );
};

export default Footer;
