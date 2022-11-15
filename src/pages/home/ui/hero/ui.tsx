"use client";
import { use } from "react";
import { queryClient } from "shared/lib/query-client";
import { CarouselMultiply } from "shared/ui/carousel-multiply";
import { HeroSlide } from "./slide";
import { getHeroMovies } from "./model";
import styles from "./styles.module.scss";

export const Hero = () => {
  const data = use(queryClient("/movie", getHeroMovies));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CarouselMultiply
          options={{
            loop: true,
            slidesPerView: "auto",
          }}
          className={styles.slider}
          slideClassName={styles.slide}
          items={data}
          renderItem={(item) => <HeroSlide item={item} />}
        />
      </div>
    </section>
  );
};
