"use client";
import clsx from "clsx";
import Link from "next/link";
import { ElementType, PropsWithChildren } from "react";
import { Title, type TitleProps } from "shared/ui/title";
import { CarouselMultiply, type CarouselProps } from "shared/ui/carousel-multiply";
import { ChevronIcon } from "shared/ui/icons";
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

const CategoryTitle = ({ children, href, ...props }: TitleProps<ElementType<Partial<HTMLAnchorElement>>>) => {
  return (
    <Title size="medium" className={styles.title} as={Link} href={href} {...props}>
      {children}
      <span className={styles.icon}>
        <ChevronIcon />
      </span>
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
