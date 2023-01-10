import type { ElementType, PropsWithChildren } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { LIMIT } from 'shared/config';
import { Title, type TitleProps } from 'shared/ui/title';
import { CarouselMultiply, type CarouselMultiplyProps } from 'shared/ui/carousel-multiply';
import { ChevronIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

interface CategoryProps {
  className?: string;
  containerClass?: string;
}

export const Category = ({ className, containerClass, children }: PropsWithChildren<CategoryProps>) => {
  return (
    <section className={clsx(styles.section, className)}>
      <div className={clsx('container', containerClass, styles.container)}>{children}</div>
    </section>
  );
};

const CategoryTitle = ({ children, href, ...props }: TitleProps<ElementType<Partial<HTMLAnchorElement>>>) => {
  return (
    <Title size="medium" className={styles.title} as={href ? Link : 'h2'} href={href} {...props}>
      {children}
      {href && (
        <span className={styles.icon}>
          <ChevronIcon />
        </span>
      )}
    </Title>
  );
};

function CategoryCarousel<T>({ items, slideClassName, ...props }: CarouselMultiplyProps<T>) {
  return (
    <div className={styles.wrapper}>
      <CarouselMultiply
        prevBtnClass={styles.prevBtn}
        nextBtnClass={styles.nextBtn}
        className={styles.slider}
        slideClassName={clsx(styles.slide, slideClassName)}
        items={items ?? [...Array(LIMIT)]}
        {...props}
      />
    </div>
  );
}

Category.Title = CategoryTitle;
Category.Carousel = CategoryCarousel;
