import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, Bars4Icon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useEffect } from "react";
import { useHeaderStatus, useSideBarStatus } from "~/atoms";
import { Chapter } from "~/types";
import Teleport from "../shared/Teleport";

type Props = {
  loading: boolean;
  chapter: Chapter;
};

const Reader = ({ loading, chapter }: Props) => {
  const [_, setOpenSideBar] = useSideBarStatus();
  const [headerStatus] = useHeaderStatus();
  useEffect(() => {
    return () => {
      setOpenSideBar(false);
    };
  }, [chapter?.currentChapter.slug]);

  return (
    <div>
      {!loading && (
        <div
          className={classNames(
            "flex py-1 px-3 justify-between sticky top-0 left-0 right-0 bg-gray-600/50 trans-300  text-white",
            headerStatus === "show" && "!top-[var(--header-height)]"
          )}
        >
          <div className="max-w-full">
            <span className="line-clamp-1">{chapter?.name}</span>
            <span>{chapter?.currentChapter?.title}</span>
          </div>
          <button
            onClick={() => setOpenSideBar(true)}
            className="px-2.5 py-2 hover:bg-gray-400/50 rounded"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        </div>
      )}
      {loading
        ? "loading ..."
        : chapter?.pages?.map((image) => (
            <div key={image.id} className="mx-auto ">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt="image"
                className="mx-auto max-w-[100%] md:max-w-[90%]"
              />
            </div>
          ))}
    </div>
  );
};

export default Reader;
