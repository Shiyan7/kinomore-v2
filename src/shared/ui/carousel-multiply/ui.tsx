"use client";
import "swiper/css";
import { ReactNode, useCallback, useRef } from "react";
import SwiperClass, { Navigation, SwiperOptions } from "swiper";
import clsx from "clsx";
import { SwiperSlide, Swiper } from "swiper/react";
import { SliderButton } from "./slider-button";
import { defaultSwiperOptions } from "./config";
import styles from "./styles.module.scss";

export interface CarouselProps<T> {
  items: Array<T>;
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
}: CarouselProps<T>) {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const swiperNavigation = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  };

  const onSwiper = (swiper: SwiperClass) => {
    setTimeout(() => {
      try {
        // @ts-ignore
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        // @ts-ignore
        swiper.params.navigation.nextEl = navigationNextRef.current;

        // Re-init navigation
        swiper.navigation?.destroy();
        swiper.navigation?.init();
        swiper.navigation?.update();
      } catch (e) {}
    });
  };

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
    [slideClassName, renderItem]
  );

  return (
    <Swiper
      modules={[Navigation]}
      navigation={swiperNavigation}
      onSwiper={onSwiper}
      className={clsx(styles.slider, className)}
      {...(options ?? defaultSwiperOptions)}>
      <SliderButton className={clsx(styles.prev, prevBtnClass)} dir="left" ref={navigationPrevRef} />
      <SliderButton className={clsx(styles.next, nextBtnClass)} dir="right" ref={navigationNextRef} />
      {renderItems(items)}
    </Swiper>
  );
}
