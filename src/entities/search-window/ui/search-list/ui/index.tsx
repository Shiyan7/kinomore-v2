import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { Title, Spinner, Button } from 'shared/ui';
import { SearchItem } from './search-item';
import styles from './styles.module.scss';

export const SearchList = () => {
  const { data, searchPending, loadPending, hasMore, loadMore } = useUnit({
    data: searchModel.$searchResult,
    searchPending: searchModel.$searchPending,
    loadPending: searchModel.$loadPending,
    hasMore: searchModel.$hasMore,
    loadMore: searchModel.loadMore,
  });

  const Loader = (
    <div className={styles.loader}>
      <Spinner strokeWidth={2} />
    </div>
  );

  const NoResultsMessage = (
    <>
      <Title className={styles.title} size="small">
        Ничего не нашлось
      </Title>
      <p className={styles.desc}>
        Может быть, вы ищете то, чего пока нет в каталоге
      </p>
    </>
  );

  const SearchList = (
    <div className={styles.content}>
      <ul className={clsx('list-reset', styles.list)}>
        {data.map((item) => {
          if (!item.poster) return null;

          return <SearchItem item={item} key={item.id} />;
        })}
      </ul>
      {hasMore ? (
        <Button
          className={styles.loadMore}
          onClick={loadMore}
          size="medium"
          skeletonLoading={loadPending}
          variant="gray"
        >
          Показать больше
        </Button>
      ) : null}
    </div>
  );

  if (!searchPending && !data.length) return NoResultsMessage;

  return searchPending ? Loader : SearchList;
};
