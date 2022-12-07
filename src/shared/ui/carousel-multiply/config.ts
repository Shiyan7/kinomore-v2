import type { SwiperOptions } from "swiper";

export const defaultSwiperOptions: SwiperOptions = {
  slidesPerView: "auto",
  spaceBetween: 10,
  breakpoints: {
    769: {
      spaceBetween: 15,
    },
    1401: {
      spaceBetween: 18,
    },
  },
};
