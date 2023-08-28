import { CarouselMultiply } from 'shared/ui/carousel-multiply';
import { heroMovies } from '../config';
import { HeroSlide } from './slide';
import styles from './styles.module.scss';

export const Hero = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <CarouselMultiply
        options={{
          loop: true,
        }}
        className={styles.slider}
        slideClassName={styles.slide}
        items={heroMovies}
        renderItem={(item) => <HeroSlide item={item} />}
      />
    </div>
  </section>
);
