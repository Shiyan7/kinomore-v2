import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useState } from 'react';
import { personModel } from 'pages/person';
import { MovieItem } from 'entities/movie/item';
import { Button, Title } from 'shared/ui';
import styles from './styles.module.scss';

export const Filmography = () => {
  const [limit, setLimit] = useState<number>(15);
  const data = useStore(personModel.$person);

  if (!data?.movies) return null;

  const filteredMovies = data.movies.filter((item) => item.rating);

  const length = filteredMovies?.length;

  const hasMore = length > limit;

  const movies = filteredMovies?.slice(0, limit);

  return (
    <section className={styles.section}>
      <div className={clsx('container container--narrow', styles.container)}>
        <Title className={styles.title} size="medium">
          Фильмография ({length})
        </Title>
        <div className={styles.grid}>
          {movies?.map(({ rating, ...item }) => (
            <MovieItem item={item} key={item.id} rating={rating} small />
          ))}
        </div>
        {hasMore ? (
          <Button
            className={styles.btn}
            onClick={() => setLimit((prev) => prev + 30)}
            size="medium"
            variant="gray"
          >
            Показать больше
          </Button>
        ) : null}
      </div>
    </section>
  );
};
