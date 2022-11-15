import { ReactNode } from "react";
import { SwiperOptions } from "swiper";

export interface CarouselProps<T> {
  items: Array<T>;
  renderItem: (item: T) => ReactNode;
  className?: string;
  slideClassName?: string;
  options?: SwiperOptions;
}
