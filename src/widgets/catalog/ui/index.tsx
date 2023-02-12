/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import { useEffect } from 'react';
import { useEvent, useStore } from 'effector-react';
import { catalogModel } from 'widgets/catalog';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie-item';
import { useToggler } from 'shared/lib';
import { Title, FiltersIcon, Button } from 'shared/ui';
import { useElementOnScreen } from '../lib';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
}

export const Catalog = ({ title }: CatalogProps) => {
  const { open } = useToggler(filtersModel.filtersToggler);
  const [buttonRef, isVisible] = useElementOnScreen<HTMLButtonElement>({ rootMargin: '450px' });
  const loadMore = useEvent(catalogModel.loadMore);
  const hasMore = useStore(catalogModel.$hasMore);
  const pending = useStore(catalogModel.$pending);
  const params = useStore(filtersModel.$params);
  const data = useStore(catalogModel.$catalog);

  useEffect(() => {
    if (isVisible) {
      loadMore();
    }
  }, [isVisible]);

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
        {hasMore && (
          <Button
            ref={buttonRef}
            disabled
            skeletonLoading={pending}
            size="medium"
            className={styles.loadMore}
            variant="gray">
            Показать больше
          </Button>
        )}
      </div>
    </section>
  );
};
