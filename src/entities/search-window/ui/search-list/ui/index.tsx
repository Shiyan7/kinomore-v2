import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { Title, Spinner } from 'shared/ui';
import { SearchItem } from './search-item';
import styles from './styles.module.scss';

export const SearchList = () => {
  const data = useStore(searchModel.$searchResult);
  const pending = useStore(searchModel.$pending);

  const NoResultsMessage = (
    <>
      <Title className={styles.title} size="small">
        Ничего не нашлось
      </Title>
      <p className={styles.desc}>Может быть, вы ищете то, чего пока нет в каталоге</p>
    </>
  );

  if (!pending && !data?.docs.length) return NoResultsMessage;

  const SearchList = (
    <ul className={clsx('list-reset', styles.list)}>
      {data?.docs?.map((item) => (
        <SearchItem key={item.id} item={item} />
      ))}
    </ul>
  );

  const Loader = (
    <div className={styles.loader}>
      <Spinner strokeWidth={2} />
    </div>
  );

  return pending ? Loader : SearchList;
};
