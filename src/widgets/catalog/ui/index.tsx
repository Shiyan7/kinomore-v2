import clsx from 'clsx';
import { useStore } from 'effector-react';
import { Filters, filtersModel } from 'features/filters';
import { MovieItem } from 'entities/movie/item';
import { useToggler } from 'shared/lib';
import { Title, Icon, Pagination } from 'shared/ui';
import { useRouter } from 'next/router';
import { catalogModel } from '../model';
import styles from './styles.module.scss';

interface CatalogProps {
  title: string;
}

export const Catalog = ({ title }: CatalogProps) => {
  const { query, push } = useRouter();
  const { open } = useToggler(filtersModel.toggler);
  const params = useStore(filtersModel.$params);
  const data = useStore(catalogModel.$data);

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
        <Pagination
          onChange={(page) => push({ query: { ...query, page } })}
          page={Number(query?.page) || 1}
          total={data?.pages}
        />
      </div>
    </section>
  );
};
