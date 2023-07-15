import { useStore } from 'effector-react';
import { useState } from 'react';
import { pageModel } from 'pages/home';
import { CarouselMultiply } from 'shared/ui/carousel-multiply';
import { HeroSlide } from './slide';
import styles from './styles.module.scss';

export const Hero = () => {
  const [realIndex, setRealIndex] = useState<number>(0);
  const data = useStore(pageModel.$heroMovies);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CarouselMultiply
          options={{
            loop: true,
          }}
          className={styles.slider}
          slideClassName={styles.slide}
          items={data?.length ? data : [...Array(3)]}
          onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
          renderItem={(item, idx) => <HeroSlide isActiveSlide={realIndex === idx} item={item} />}
        />
      </div>
    </section>
  );
};
