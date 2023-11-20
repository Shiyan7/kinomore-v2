import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { Title, Spinner, Button } from 'shared/ui';
import { SearchItem } from './search-item';
import styles from './styles.module.scss';

export const SearchList = () => {
  const data = useStore(searchModel.$searchResult);
  const searchPending = useStore(searchModel.$searchPending);
  const loadPending = useStore(searchModel.$loadPending);
  const hasMore = useStore(searchModel.$hasMore);
  const loadMore = useEvent(searchModel.loadMore);

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
        {data.map(
          (item) => item.poster && <SearchItem item={item} key={item.id} />
        )}
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
