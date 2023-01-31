import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/person';
import { MovieItem } from 'entities/movie-item';
import { IMovieItem } from 'shared/api';
import { Button, Title } from 'shared/ui';
import styles from './styles.module.scss';

export const Filmography = () => {
  const [limit, setLimit] = useState<number>(15);
  const data = useStore(pageModel.$person);

  if (!data?.movies) return null;

  const movies = data?.movies.slice(0, limit);

  const handleShowMore = () => setLimit((prev) => prev + 15);

  return (
    <section className={styles.section}>
      <div className={clsx('container container--narrow', styles.container)}>
        <Title className={styles.title} size="medium">
          Фильмография
        </Title>
        <div className={styles.grid}>
          {movies?.map((item, idx) => {
            const movieItem: Partial<IMovieItem> = {
              ...item,
              rating: {
                kp: item.rating,
              },
            };

            return <MovieItem small key={idx} item={movieItem} />;
          })}
        </div>
        {data?.movies?.length > limit && (
          <Button size="medium" onClick={handleShowMore} className={styles.btn} variant="gray">
            Показать ещё
          </Button>
        )}
      </div>
    </section>
  );
};
