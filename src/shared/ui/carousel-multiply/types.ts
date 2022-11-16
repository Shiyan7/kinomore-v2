import { ReactNode } from "react";
import { SwiperOptions } from "swiper";

export interface CarouselProps<T> {
  items: Array<T>;
  prevBtnClass?: string;
  nextBtnClass?: string;
  renderItem: (item: T) => ReactNode;
  className?: string;
  slideClassName?: string;
  options?: SwiperOptions;
}
