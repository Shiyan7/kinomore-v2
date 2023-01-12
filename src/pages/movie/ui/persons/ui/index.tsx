import clsx from 'clsx';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { CarouselMultiply, Title } from 'shared/ui';
import { PersonItem } from './person-item';
import styles from './styles.module.scss';

export const Persons = () => {
  const data = useStore(pageModel.$movie);

  if (!data?.persons.length) return null;

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Title size="medium" className={styles.title}>
          Актёры и создатели
        </Title>
        <CarouselMultiply
          className={styles.carousel}
          navigation={false}
          slideClassName={styles.slide}
          items={data?.persons}
          renderItem={(item) => <PersonItem item={item} />}
        />
      </div>
    </section>
  );
};
