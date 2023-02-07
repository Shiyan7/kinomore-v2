import clsx from 'clsx';
import { useStore } from 'effector-react';
import { catalogModel } from 'widgets/catalog';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie-item';
import { useToggler } from 'shared/lib';
import { Title, FiltersIcon } from 'shared/ui';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
}

export const Catalog = ({ title }: CatalogProps) => {
  const { open } = useToggler(filtersModel.filtersToggler);
  const data = useStore(catalogModel.$catalog);
  const params = useStore(filtersModel.$params);

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.top}>
          <Title className={styles.title}>
            {title}
            {params && `: ${params}`}
          </Title>
          <button onClick={open} className={clsx('btn-reset', styles.btn)}>
            <FiltersIcon />
          </button>
        </div>
        <Filters />
        <div className={styles.grid}>
          {data?.docs.map((item) => (
            <MovieItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
