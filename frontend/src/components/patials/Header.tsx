import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Tippy from "@tippyjs/react/headless";
import useScrollDirection from "~/hooks/useScrollDirection";
import classNames from "classnames";
import {
  useHeaderSearchStatus,
  useHeaderStatus,
  useSideBarStatus,
} from "~/atoms";
import { useMediaQuery } from "usehooks-ts";
import ThemeToggleBtn from "../features/ThemeToggleBtn";
import HeaderSearch from "../shared/HeaderSearch";
import ClientOnly from "../shared/ClientOnly";
type Props = {};

const Header = (props: Props) => {
  const [isOpenSidebarReading] = useSideBarStatus();
  const { data: session, status } = useSession();
  const scrollDirection = useScrollDirection();
  const [headerStatus, setHeaderStatus] = useHeaderStatus();
  const matchMobile = useMediaQuery("(max-width: 768px)");
  const [isSearchOpen] = useHeaderSearchStatus();
  useEffect(() => {
    if (!isSearchOpen)
      setHeaderStatus(scrollDirection === "up" ? "show" : "hide");
  }, [scrollDirection]);
  return (
    <ClientOnly>
      <header
        className={classNames(
          " backdrop-filter backdrop-blur-[20px] bg-slate-100/20 border-b-[1px]",
          "border-slate-700/20 z-50 fixed top-0 h-[var(--header-height)]  text-white bg-white dark:bg-slate-900/75",
          "dark:backdrop-blur-[20px]  transition duration-300  dark:border-gray-700",
          "sticky transition-all duration-100",
          headerStatus === "hide" ? "-top-[var(--header-height)]" : "top-0"
        )}
      >
        <div
          style={{
            height: "100%",
            width:
              isOpenSidebarReading && !matchMobile
                ? "calc(100% - var(--reading-sidebar-width))"
                : "100%",
          }}
        >
          <div
            className=" md:max-w-[900px] lg:max-w-[1200px]  flex h-full items-center px-2 ssm:px-4 
            transition-all duration-300 m-auto w-full"
          >
            <div className={classNames("flex w-full")}>
              {/* logo */}
              <div
                className="flex items-center tracking-[3px] whitespace-nowrap font-bold 
              text-sm md:text-3xl md:tracking-[7px] text-black dark:text-white"
              >
                <Link href={"/"}>
                  <h1>MANGA HUB</h1>
                </Link>
              </div>
              {/* left content */}
              <div className="ml-auto flex gap-2 md:gap-8 ">
                <HeaderSearch />

                <ThemeToggleBtn />
                <Tippy
                  placement="bottom-end"
                  interactive={true}
                  render={(attr) => (
                    <div
                      {...attr}
                      className=" py-2  bg-white rounded-sm text-black drop-shadow-lg"
                    >
                      <div className="flex flex-col ">
                        <Link
                          href="/history"
                          className="p-2 hover:bg-gray-200 hover:text-purple-500"
                        >
                          Lịch sử đọc
                        </Link>
                        <Link
                          href="/follows"
                          className="p-2 hover:bg-gray-200 hover:text-purple-500"
                        >
                          Truyện theo dõi
                        </Link>
                        <button
                          onClick={
                            session?.user ? () => signOut() : () => signIn()
                          }
                          className="border-t-[1px] border-gray-400 p-2 hover:bg-gray-200 hover:text-purple-500
                              text-start"
                        >
                          {session?.user ? "Đăng xuất" : "Đăng nhập"}
                        </button>
                      </div>
                    </div>
                  )}
                >
                  {session?.user ? (
                    <div
                      className="w-10 h-10 relative flex items-center cursor-pointer select-none flex-shrink-0 z-10"
                      // onClick={() => signOut()}
                    >
                      <Image
                        unoptimized
                        src={session?.user?.image as string}
                        alt=""
                        fill
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="button_t1 cursor-default flex-shrink-0">
                      <UserCircleIcon className="w-5 h-5" />
                    </div>
                  )}
                </Tippy>
              </div>
            </div>
          </div>
        </div>
      </header>
    </ClientOnly>
  );
};

export default Header;
