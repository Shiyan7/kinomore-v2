import clsx from 'clsx';
import { useStore } from 'effector-react';
import { searchModel } from 'entities/search-window';
import { Tabs, type TabItem } from 'shared/ui/tabs';
import { Spinner } from 'shared/ui/spinner';
import { MovieItem } from './movie-item';
import { PersonItem } from './person-item';
import styles from './styles.module.scss';

export const SearchList = () => {
  const { movies, persons } = useStore(searchModel.$searchResult);
  const pending = useStore(searchModel.$pending);

  const Movies = (
    <ul className={clsx('list-reset', styles.list)}>
      {movies?.map((item) => (
        <MovieItem key={item.id} item={item} />
      ))}
    </ul>
  );

  const Persons = (
    <ul className={clsx('list-reset', styles.list)}>
      {persons?.map((person) => (
        <PersonItem key={person.id} person={person} />
      ))}
    </ul>
  );

  const tabs: TabItem[] = [
    { txt: 'Кино', content: Movies, condition: movies?.length },
    { txt: 'Персоны', content: Persons, condition: persons?.length },
  ];

  const Loader = (
    <div className={styles.loader}>
      <Spinner strokeWidth={2} />
    </div>
  );

  return pending ? Loader : <Tabs tabs={tabs} />;
};
