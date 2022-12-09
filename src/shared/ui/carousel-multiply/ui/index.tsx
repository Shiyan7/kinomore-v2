"use client";
import "swiper/css";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { Navigation, type SwiperOptions } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { SliderButton } from "./slider-button";
import styles from "./styles.module.scss";

export interface CarouselMultiplyProps<T> {
  items: Array<T> | undefined;
  prevBtnClass?: string;
  nextBtnClass?: string;
  renderItem: (item: T) => ReactNode;
  className?: string;
  slideClassName?: string;
  options?: SwiperOptions;
}

export function CarouselMultiply<T>({
  items,
  renderItem,
  className,
  slideClassName,
  options,
  prevBtnClass,
  nextBtnClass,
}: CarouselMultiplyProps<T>) {
  const renderItems = useCallback(
    (_items: typeof items) =>
      _items?.map((item, idx) => (
        <SwiperSlide style={{ marginRight: "var(--column-gap)" }} className={slideClassName} key={idx}>
          {renderItem(item)}
        </SwiperSlide>
      )),
    [slideClassName, renderItem]
  );

  const swiperOptions: SwiperOptions = {
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
    ...options,
  };

  return (
    <Swiper modules={[Navigation]} className={clsx(styles.slider, className)} {...swiperOptions}>
      <SliderButton className={clsx(styles.prev, prevBtnClass)} dir="left" />
      <SliderButton className={clsx(styles.next, nextBtnClass)} dir="right" />
      {renderItems(items)}
    </Swiper>
  );
}
