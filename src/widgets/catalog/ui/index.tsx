import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie/item';
import { useToggler } from 'shared/lib';
import { Title, Icon, Pagination, usePageChange } from 'shared/ui';
import { useRouter } from 'next/router';
import { catalogModel } from '../model';
import { paramsToString } from '../lib';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
}

export const Catalog = ({ title }: CatalogProps) => {
  const { query } = useRouter();
  const { open } = useToggler(filtersModel.toggler);
  const { page, onChange } = usePageChange();
  const { data } = useUnit({ data: catalogModel.$data });
  const params = paramsToString([query.genre as string, query.year as string]);

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.top}>
          <Title className={styles.title}>
            {params ? `${title}: ` : title}
            {params}
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
        {data ? (
          <Pagination onChange={onChange} page={page} total={data.pages} />
        ) : null}
      </div>
    </section>
  );
};
