import { AnimatePresence, motion } from "framer-motion";
import { GoSearch } from "react-icons/go";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useMediaQuery } from "usehooks-ts";
import { useOnClickOutside } from "usehooks-ts";
import useDebounce from "~/hooks/useDebounce";
import { useHeaderSearchStatus } from "~/atoms";
import axios from "axios";
import { axiosClient } from "~/services/axiosClient";
import { ComicCard } from "~/types";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from "~/constants";
import { useRouter } from "next/router";
import Head from "./Head";
type Props = {};
interface SearchResult {
  comics: ComicCard[];
  mata: {
    totalPage: number;
  };
}
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
const HeaderSearch = (props: Props) => {
  const [isOpen, setOpen] = useHeaderSearchStatus();
  const matchMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  useDebounce(
    () => {
      if (!searchQuery.trim()) {
        return;
      }
      setLoading(true);
      (async () => {
        try {
          let { data }: { data: SearchResult } = await axiosClient.get(
            "/lhmanga/search",
            {
              params: {
                q: searchQuery,
              },
            }
          );

          if (data) {
            data.comics = data.comics.splice(0, 5);
            setSearchResult(data);
            setShowResult(true);
          }
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setSearchResult(null);
        }
      })();
    },
    [searchQuery],
    500
  );
  useEffect(() => {
    //prevent scrolling when modal is opened on mobile
    if (matchMobile) {
      if (isOpen) {
        document.body.style.overflowY = "hidden";
      } else document.body.style.overflowY = "scroll";
    }
  }, [isOpen]);
  useEffect(() => {
    if (!searchQuery.trim()) {
      setShowResult(false);
      setLoading(false);
      return;
    } else {
      setShowResult(true);
      setLoading(true);
    }
  }, [searchQuery]);
  const renderTippy = () =>
    isOpen && (
      <div
        // ref={refTippy}
        className={classNames(
          "bg-gray-400 text-black dark:bg-slate-900/75overflow-y-auto dark:text-white z-[9999] rounded-md",
          matchMobile ? " max-h-screen w-screen " : "w-[400px] max-h-[450px]"
        )}
      >
        {loading && <div className="text-center py-2">Đợi tí ...</div>}
        {showResult &&
          !loading &&
          searchResult?.comics.map((comic, index) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic.slug}`
                );
                setOpen(false);
              }}
              key={index}
              className="relative flex gap-3 h-[80px] p-2 group cursor-pointer"
            >
              <div className="aspect-w-3 aspcet-h-4 w-16 flex-shrink-0">
                <a>
                  <Image
                    src={comic.image as string}
                    alt=""
                    fill
                    className="absolute object-cover"
                  />
                </a>
              </div>
              <div>
                <h3 className="text-sm group-hover:text-blue-800 line-clamp-2">
                  {comic.name}
                </h3>
                <span className="text-sm group-hover:text-blue-800 line-clamp-2">
                  {comic.newChap}
                </span>
              </div>
            </div>
          ))}
        {searchQuery && !loading && showResult && searchResult != null ? (
          <button
            className="text-center h-10 cursor-pointer w-full hover:text-blue-500 border-t-[1px]"
            onClick={(e) => {
              // e.stopPropagation();
              e.preventDefault();
              router.push(`/search?q=${searchQuery}`);
              setOpen(false);
            }}
          >
            Xem tất cả
          </button>
        ) : (
          searchQuery &&
          !loading && (
            <div className="w-full p-2 text-center">
              Không tìm thấy.
              {"  "}
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/search?sort=new");
                }}
                className="text-blue-800 underline"
              >
                Tìm nâng cao
              </button>
            </div>
          )
        )}
      </div>
    );
  if (matchMobile)
    return (
      <div
        onClick={(e) => isOpen && setOpen(false)}
        className={classNames(
          isOpen && "fixed top-0 left-0 w-screen h-screen bg-gray-700/80 z-50"
        )}
      >
        <Head title="Manga hub" />
        <Tippy
          visible={isOpen}
          interactive={true}
          render={renderTippy}
          placement={"bottom"}
        >
          <motion.div
            // ref={ref}
            layout
            transition={spring}
            className={classNames(
              "text-black dark:text-white m-auto flex items-center gap-2  rounded-full",
              isOpen &&
                "px-2 fixed top-3 left-2 right-2  bg-accent !w-[96%] z-[999]"
            )}
          >
            {isOpen && (
              <input
                value={searchQuery}
                onChange={(e) => {
                  // setLoading(true);
                  // setShowResult(false);
                  setSearchQuery(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                placeholder="Search "
                className={classNames(
                  "w-[200px] text-white  p-2 rounded-md bg-transparent",
                  isOpen && "!w-full"
                )}
              />
            )}

            <button
              onClick={() => setOpen(!isOpen)}
              className={classNames(
                "hover:bg-gray-500/50 p-2 rounded-full ",
                isOpen ? "text-white" : "text-black dark:text-white"
              )}
            >
              <GoSearch className="w-5 h-5" />
            </button>
          </motion.div>
        </Tippy>
      </div>
    );
  return (
    <>
      <Head title="Manga hub" />
      <Tippy
        onClickOutside={() => setOpen(false)}
        // ref={ref}
        visible={isOpen}
        interactive={true}
        render={renderTippy}
        placement={"bottom-end"}
      >
        <motion.div
          // ref={ref}
          layout
          transition={spring}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          className={classNames(
            "text-black dark:text-white m-auto flex items-center gap-2  rounded-full",
            isOpen && "px-2 bg-gray-500/50"
          )}
        >
          {isOpen && (
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              // onBlur={(e) => {
              //   isOpen && setOpen(false);
              // }}
              placeholder="Search "
              className={classNames(
                "w-[200px] text-white  p-2 rounded-md bg-transparent",
                isOpen && "!w-full"
              )}
            />
          )}

          <button
            onClick={() => setOpen(!isOpen)}
            className={classNames(
              "hover:bg-gray-500/50 p-2 rounded-full ",
              isOpen ? "text-white" : "text-black dark:text-white"
            )}
          >
            <GoSearch className="w-5 h-5" />
          </button>
        </motion.div>
      </Tippy>
    </>
  );
};

export default HeaderSearch;
