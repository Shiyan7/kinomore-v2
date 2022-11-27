import type { SwiperOptions } from "swiper";

export const defaultSwiperOptions: SwiperOptions = {
  spaceBetween: 10,
  breakpoints: {
    769: {
      spaceBetween: 15,
    },
  },
  slidesPerView: "auto",
};
