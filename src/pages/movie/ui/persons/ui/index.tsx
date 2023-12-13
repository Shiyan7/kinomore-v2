import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { FreeMode } from 'swiper';
import { movieModel } from 'pages/movie';
import { CarouselMultiply } from 'shared/ui/carousel-multiply';
import { Title } from 'shared/ui/title';
import { PersonItem } from './person-item';
import styles from './styles.module.scss';

export const Persons = () => {
  const { movie } = useUnit({ movie: movieModel.$movie });

  if (!movie?.persons?.length) return null;

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Title className={styles.title} size="medium">
          Актёры и создатели
        </Title>
        <CarouselMultiply
          className={styles.carousel}
          items={movie?.persons}
          modules={[FreeMode]}
          navigation={false}
          options={{ freeMode: true }}
          renderItem={(item) => <PersonItem item={item} />}
          slideClassName={styles.slide}
        />
      </div>
    </section>
  );
};
