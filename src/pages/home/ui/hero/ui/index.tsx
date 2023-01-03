import { useUnit } from "effector-react";
import { pageModel } from "pages/home";
import { LIMIT } from "shared/config";
import { CarouselMultiply } from "shared/ui/carousel-multiply";
import { HeroSlide } from "./slide";
import styles from "./styles.module.scss";

export const Hero = () => {
  const data = useUnit(pageModel.$heroMovies);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CarouselMultiply
          options={{
            loop: true,
          }}
          className={styles.slider}
          slideClassName={styles.slide}
          items={data?.length ? data : [...Array(LIMIT)]}
          renderItem={(item) => <HeroSlide item={item} />}
        />
      </div>
    </section>
  );
};
