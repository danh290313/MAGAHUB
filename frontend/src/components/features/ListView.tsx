import React, { memo } from "react";
import { Comic } from "~/types";
import CardWithAnimation from "~/components/shared/CardWithAnimation";
import { VistedComic } from "~/types";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
type Props = {
  comics: Comic[] | VistedComic[];
  viewType: number;
  isLoading: boolean;
};

const ListView = ({ comics, viewType, isLoading }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ transition: { duration: 500 } }}
        className={classNames(
          "grid",
          viewType === 0 && "grid-cols-1",
          viewType === 1 &&
            "grid-cols-1 ssm:grid-cols-1 sm:grid-cols-2 md:grid-cols-2",
          viewType === 2 &&
            "grid-cols-1 ssm:grid-cols-2 sm:grid-cols-4 md:grid-cols-6"
        )}
      >
        {comics.map((comic) => (
          <CardWithAnimation
            comic={comic}
            key={comic.slug}
            viewType={viewType}
            isLoading={isLoading}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(ListView);
