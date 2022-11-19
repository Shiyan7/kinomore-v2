"use client";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Title, type TitleProps } from "shared/ui/title";
import { CarouselMultiply, type CarouselProps } from "shared/ui/carousel-multiply";
import styles from "./styles.module.scss";

interface CategoryProps {
  className?: string;
}

export const Category = ({ className, children }: PropsWithChildren<CategoryProps>) => {
  return (
    <section className={clsx(styles.section, className)}>
      <div className={clsx("container", styles.container)}>{children}</div>
    </section>
  );
};

const CategoryTitle = ({ children, ...props }: PropsWithChildren<TitleProps>) => {
  return (
    <Title className={styles.title} level="h2" {...props}>
      {children}
    </Title>
  );
};

function CategoryCarousel<T>({ ...props }: CarouselProps<T>) {
  return (
    <div className={styles.wrapper}>
      <CarouselMultiply
        prevBtnClass={styles.prevBtn}
        nextBtnClass={styles.nextBtn}
        className={styles.slider}
        slideClassName={styles.slide}
        {...props}
      />
    </div>
  );
}

Category.Title = CategoryTitle;
Category.Carousel = CategoryCarousel;
