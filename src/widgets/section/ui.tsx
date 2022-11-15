"use client";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Title as UITitle, type TitleProps } from "shared/ui/title";
import { CarouselMultiply, type CarouselProps } from "shared/ui/carousel-multiply";
import type { SectionProps } from "./types";
import styles from "./styles.module.scss";

export const Section = ({ className, children }: PropsWithChildren<SectionProps>) => {
  return (
    <section className={clsx(styles.section, className)}>
      <div className={clsx("container", styles.container)}>{children}</div>
    </section>
  );
};

const Title = ({ children, ...props }: PropsWithChildren<TitleProps>) => {
  return (
    <UITitle className={styles.title} level="h2" {...props}>
      {children}
    </UITitle>
  );
};

function Carousel<T>({ ...props }: CarouselProps<T>) {
  return (
    <div className={styles.wrapper}>
      <CarouselMultiply className={styles.slider} slideClassName={styles.slide} {...props} />
    </div>
  );
}

Section.Title = Title;
Section.Carousel = Carousel;
