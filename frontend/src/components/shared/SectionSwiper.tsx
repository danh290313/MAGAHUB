import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import React from "react";
import { Pagination, FreeMode, Autoplay, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ComicCard } from "~/types";
import SwiperCard from "./SwiperCard";
type Props = {
  mangaList: ComicCard[];
};

const swiperBreakPoints = {
  1: {
    slidesPerView: 2,
    spaceBetween: 2,
  },
  320: {
    slidesPerView: 3,
  },
  480: {
    slidesPerView: 4,
  },
  640: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  1300: {
    slidesPerView: 7,
  },
};
const SectionSwiper = ({ mangaList }: Props) => {
  return (
    <div>
      <Swiper
        lazy={true}
        className="!pb-[50px] md:!pb-[75px]"
        spaceBetween={8}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        mousewheel
        // slidesPerView={7}
        breakpoints={swiperBreakPoints}
        modules={[Pagination, Autoplay, Mousewheel, FreeMode]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {mangaList?.map((comic, idx) => (
          <SwiperSlide key={idx}>
            <SwiperCard comic={comic} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SectionSwiper;
