"use client";
import "swiper/css";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { Navigation, SwiperOptions } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { defaultSwiperOptions } from "../config";
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
        <SwiperSlide
          style={{ marginRight: options?.loop ? "calc(var(--column-gap) / 2)" : "var(--column-gap)" }}
          className={slideClassName}
          key={idx}>
          {renderItem(item)}
        </SwiperSlide>
      )),
    [slideClassName, options, renderItem]
  );

  return (
    <Swiper modules={[Navigation]} className={clsx(styles.slider, className)} {...(options ?? defaultSwiperOptions)}>
      <SliderButton className={clsx(styles.prev, prevBtnClass)} dir="left" />
      <SliderButton className={clsx(styles.next, nextBtnClass)} dir="right" />
      {renderItems(items)}
    </Swiper>
  );
}
