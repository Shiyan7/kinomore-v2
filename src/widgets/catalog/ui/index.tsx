import clsx from 'clsx';
import { useStore } from 'effector-react';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie-item';
import type { Data, MovieCard } from 'shared/api';
import { Title } from 'shared/ui/title';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
  data: Data<MovieCard> | null;
}

export const Catalog = ({ title, data }: CatalogProps) => {
  const params = useStore(filtersModel.$params);

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Title className={styles.title}>
          {title}
          {params && `: ${params}`}
        </Title>
        <Filters />
        <div className={styles.grid}>
          {data?.docs.map((item) => (
            <MovieItem small key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
