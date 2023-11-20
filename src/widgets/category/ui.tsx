import clsx from 'clsx';
import Link from 'next/link';
import type { ElementType, PropsWithChildren } from 'react';
import { FreeMode, Navigation } from 'swiper';
import {
  CarouselMultiply,
  type CarouselMultiplyProps,
} from 'shared/ui/carousel-multiply';
import { Icon } from 'shared/ui/icon';
import { Spinner } from 'shared/ui/spinner';
import { Title, type TitleProps } from 'shared/ui/title';
import styles from './styles.module.scss';

interface CategoryProps extends PropsWithChildren {
  className?: string;
  containerClass?: string;
}

export const Category = ({
  className,
  containerClass,
  children,
}: CategoryProps) => (
  <section className={clsx(styles.section, className)}>
    <div className={clsx('container', containerClass, styles.container)}>
      {children}
    </div>
  </section>
);

const CategoryTitle = ({
  children,
  href,
  ...props
}: TitleProps<ElementType<Partial<HTMLAnchorElement>>>) => (
  <Title
    as={href ? Link : 'h2'}
    className={styles.title}
    href={href}
    size="medium"
    {...props}
  >
    {children}
    {href ? (
      <span className={styles.icon}>
        <Icon name="common/chevron" />
      </span>
    ) : null}
  </Title>
);

const CategoryCarousel = <T, _>({
  items,
  slideClassName,
  ...props
}: CarouselMultiplyProps<T>) => {
  return (
    <div className={styles.wrapper}>
      {items ? (
        <CarouselMultiply
          className={styles.slider}
          freeMode={{ momentumBounceRatio: 0 }}
          items={items}
          modules={[FreeMode, Navigation]}
          nextBtnClass={styles.nextBtn}
          prevBtnClass={styles.prevBtn}
          slideClassName={clsx(styles.slide, slideClassName)}
          {...props}
        />
      ) : (
        <div className={styles.loader}>
          <Spinner strokeWidth={2} />
        </div>
      )}
    </div>
  );
};

Category.Title = CategoryTitle;
Category.Carousel = CategoryCarousel;
