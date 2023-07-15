import clsx from 'clsx';
import Link from 'next/link';
import type { ElementType, PropsWithChildren } from 'react';
import { FreeMode, Navigation } from 'swiper';
import { CarouselMultiply, type CarouselMultiplyProps } from 'shared/ui/carousel-multiply';
import { Icon } from 'shared/ui/icon';
import { Spinner } from 'shared/ui/spinner';
import { Title, type TitleProps } from 'shared/ui/title';
import styles from './styles.module.scss';

interface CategoryProps extends PropsWithChildren {
  className?: string;
  containerClass?: string;
}

export const Category = ({ className, containerClass, children }: CategoryProps) => (
  <section className={clsx(styles.section, className)}>
    <div className={clsx('container', containerClass, styles.container)}>{children}</div>
  </section>
);

const CategoryTitle = ({ children, href, ...props }: TitleProps<ElementType<Partial<HTMLAnchorElement>>>) => (
  <Title size="medium" className={styles.title} as={href ? Link : 'h2'} href={href} {...props}>
    {children}
    {href && (
      <span className={styles.icon}>
        <Icon type="common" name="chevron" />
      </span>
    )}
  </Title>
);

function CategoryCarousel<T>({ items, slideClassName, ...props }: CarouselMultiplyProps<T>) {
  return (
    <div className={styles.wrapper}>
      {items ? (
        <CarouselMultiply
          modules={[FreeMode, Navigation]}
          freeMode={{ momentumBounceRatio: 0 }}
          prevBtnClass={styles.prevBtn}
          nextBtnClass={styles.nextBtn}
          className={styles.slider}
          slideClassName={clsx(styles.slide, slideClassName)}
          items={items}
          {...props}
        />
      ) : (
        <div className={styles.loader}>
          <Spinner strokeWidth={2} />
        </div>
      )}
    </div>
  );
}

Category.Title = CategoryTitle;
Category.Carousel = CategoryCarousel;
