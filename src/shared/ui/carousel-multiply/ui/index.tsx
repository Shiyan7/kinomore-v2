/* eslint-disable react/no-array-index-key */
import 'swiper/css';
import clsx from 'clsx';
import { useCallback, type ReactNode } from 'react';
import { Navigation, type SwiperOptions } from 'swiper';
import type { SwiperProps } from 'swiper/react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useDomRefWithSetter } from '../lib';
import { SliderButton } from './slider-button';
import styles from './styles.module.scss';

export interface CarouselMultiplyProps<T> extends SwiperProps {
  items: T[] | undefined;
  prevBtnClass?: string;
  nextBtnClass?: string;
  renderItem: (item: T, idx: number) => ReactNode;
  className?: string;
  slideClassName?: string;
  containerOffsets?: boolean;
  options?: SwiperOptions;
}

export const CarouselMultiply = <T, _>({
  items,
  renderItem,
  className,
  slideClassName,
  navigation = true,
  options,
  modules,
  prevBtnClass,
  nextBtnClass,
  ...props
}: CarouselMultiplyProps<T>) => {
  const [nextEl, nextElRef] = useDomRefWithSetter<HTMLButtonElement>();
  const [prevEl, prevElRef] = useDomRefWithSetter<HTMLButtonElement>();

  const renderItems = useCallback(
    (_items: typeof items) =>
      _items?.map((item, idx) => (
        <SwiperSlide
          className={slideClassName}
          key={idx}
          style={{ marginRight: 'var(--column-gap)' }}
        >
          {renderItem(item, idx)}
        </SwiperSlide>
      )),
    [slideClassName, renderItem]
  );

  const swiperOptions: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 8,
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

  const DEFAULT_MODULES = [Navigation];

  return (
    <Swiper
      className={clsx(styles.slider, className)}
      modules={[...(modules ?? DEFAULT_MODULES)]}
      navigation={{
        prevEl,
        nextEl,
      }}
      {...swiperOptions}
      {...props}
    >
      {navigation ? (
        <>
          <SliderButton
            className={clsx(styles.prev, prevBtnClass)}
            ref={prevElRef}
          />
          <SliderButton
            className={clsx(styles.next, nextBtnClass)}
            ref={nextElRef}
          />
        </>
      ) : null}
      {renderItems(items)}
    </Swiper>
  );
};
