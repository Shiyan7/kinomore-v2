/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { catalogModel } from 'widgets/catalog';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie/item';
import { useToggler } from 'shared/lib';
import { Title, Icon, Button } from 'shared/ui';
import { useElementOnScreen } from '../lib';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
}

export const Catalog = ({ title }: CatalogProps) => {
  const [buttonRef, isVisible] = useElementOnScreen<HTMLButtonElement>({
    rootMargin: '450px',
  });
  const { open } = useToggler(filtersModel.toggler);
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
            {params ? `: ${params}` : null}
          </Title>
          <button className={clsx('btn-reset', styles.btn)} onClick={open}>
            <Icon name="common/filters" />
          </button>
        </div>
        <Filters />
        <div className={styles.grid}>
          {data?.docs?.map((item) => (
            <MovieItem item={item} key={item.id} />
          ))}
        </div>
        {hasMore ? (
          <Button
            className={styles.loadMore}
            disabled
            ref={buttonRef}
            size="medium"
            skeletonLoading={pending}
            variant="gray"
          >
            Показать больше
          </Button>
        ) : null}
      </div>
    </section>
  );
};
