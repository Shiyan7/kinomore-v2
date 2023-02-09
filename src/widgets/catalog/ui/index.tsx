import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroller';
import { useEvent, useStore } from 'effector-react';
import { catalogModel } from 'widgets/catalog';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie-item';
import { useToggler } from 'shared/lib';
import { Title, FiltersIcon, Button } from 'shared/ui';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
}

export const Catalog = ({ title }: CatalogProps) => {
  const { open } = useToggler(filtersModel.filtersToggler);
  const params = useStore(filtersModel.$params);
  const loadMore = useEvent(catalogModel.loadMore);
  const data = useStore(catalogModel.$catalog);
  const hasMore = useStore(catalogModel.$hasMore);
  const pending = useStore(catalogModel.getCatalogFx.pending);

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
        <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore}>
          <div className={styles.grid}>
            {data?.docs.map((item) => (
              <MovieItem key={item.id} item={item} />
            ))}
          </div>
        </InfiniteScroll>
        {hasMore && (
          <Button
            disabled={pending}
            skeletonLoading={pending}
            size="medium"
            onClick={loadMore}
            className={styles.loadMore}
            variant="gray">
            Показать больше
          </Button>
        )}
      </div>
    </section>
  );
};
