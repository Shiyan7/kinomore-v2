import { CarouselMultiply } from 'shared/ui/carousel-multiply';
import { heroMovies } from '../config';
import { HeroSlide } from './slide';
import styles from './styles.module.scss';

export const Hero = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <CarouselMultiply
        className={styles.slider}
        items={heroMovies}
        options={{
          loop: true,
        }}
        renderItem={(item) => <HeroSlide item={item} />}
        slideClassName={styles.slide}
      />
    </div>
  </section>
);
