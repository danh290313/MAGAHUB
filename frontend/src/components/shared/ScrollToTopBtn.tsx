import { ArrowUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState, useEffect, memo } from "react";
import useScrollDirection from "~/hooks/useScrollDirection";
const ScrollToTopBtn = () => {
  const scrollDR = useScrollDirection();
  const [visible, setVisible] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
		in place of 'smooth' */
    });
  };

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <button
      className={classNames(
        "p-2 md:p-4 rounded-full fixed bottom-20 right-5 border-2 bg-gray-600/60 text-white transition-all duration-300",
        visible && scrollDR === "up" ? false : "hidden"
      )}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="w-5 h-5 " />
    </button>
  );
};

export default memo(ScrollToTopBtn);
