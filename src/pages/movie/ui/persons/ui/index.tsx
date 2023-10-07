import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FreeMode } from 'swiper';
import { movieModel } from 'pages/movie';
import { CarouselMultiply } from 'shared/ui/carousel-multiply';
import { Title } from 'shared/ui/title';
import { PersonItem } from './person-item';
import styles from './styles.module.scss';

export const Persons = () => {
  const data = useStore(movieModel.$movie);

  if (!data?.persons?.length) return null;

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Title size="medium" className={styles.title}>
          Актёры и создатели
        </Title>
        <CarouselMultiply
          modules={[FreeMode]}
          className={styles.carousel}
          options={{ freeMode: true }}
          navigation={false}
          slideClassName={styles.slide}
          items={data?.persons}
          renderItem={(item) => <PersonItem item={item} />}
        />
      </div>
    </section>
  );
};
