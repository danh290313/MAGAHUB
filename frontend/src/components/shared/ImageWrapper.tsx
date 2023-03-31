import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ImageWrapperProps {
  children: ReactNode;
  style?: string;
}

const variants: Variants = {
  initial: {
    opacity: 1,
  },

  animate: {
    opacity: 1,
    transition: { duration: 2 },
  },

  exit: {
    opacity: 0,
  },
};

export default function ImageWrapper({
  children,
  style = "",
}: ImageWrapperProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={`full-size relative overflow-hidden ${style}`}
        variants={variants}
        animate="animate"
        // exit="exit"
        initial="initial"
        transition={[0.83, 0, 0.17, 1]}
      >
        {children}
      </motion.div>
    </AnimatePresence>
    // <div
    //   className={`full-size relative overflow-hidden ${style} transition-all duration-700`}
    // >
    //   {children}
    // </div>
  );
}
