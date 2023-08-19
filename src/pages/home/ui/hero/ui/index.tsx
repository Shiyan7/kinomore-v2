import { useState } from 'react';
import { CarouselMultiply } from 'shared/ui/carousel-multiply';
import { heroMovies } from '../config';
import { HeroSlide } from './slide';
import styles from './styles.module.scss';

export const Hero = () => {
  const [realIndex, setRealIndex] = useState<number>(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CarouselMultiply
          options={{
            loop: true,
          }}
          className={styles.slider}
          slideClassName={styles.slide}
          items={heroMovies}
          onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
          renderItem={(item, idx) => <HeroSlide isActiveSlide={realIndex === idx} item={item} />}
        />
      </div>
    </section>
  );
};
