import { useEvent, useStore } from 'effector-react';
import { filtersModel } from 'features/filters';
import { Select, SortIcon } from 'shared/ui';
import { genres, rating, years, filters } from '../config';
import styles from './styles.module.scss';

export const Filters = () => {
  const optionSelected = useEvent(filtersModel.optionSelected);
  const query = useStore(filtersModel.$query);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Select
          value={query?.genre}
          onSelect={({ value }) => optionSelected({ queryName: 'genre', value })}
          options={genres}
          className={styles.select}
          defaultValue="Жанры"
        />
        <Select
          value={query?.rating}
          onSelect={({ value }) => optionSelected({ queryName: 'rating', value })}
          options={rating}
          className={styles.select}
          defaultValue="Рейтинг"
        />
        <Select
          value={query?.year}
          onSelect={({ value }) => optionSelected({ queryName: 'year', value })}
          options={years}
          className={styles.select}
          defaultValue="Годы выхода"
        />
      </div>
      <div className={styles.row}>
        <Select
          value={query?.sort}
          onSelect={({ value }) => optionSelected({ queryName: 'sort', value })}
          placement="bottom-end"
          options={filters}
          startIcon={<SortIcon />}
          className={styles.select}
          defaultValue="Рекомендуемые"
        />
      </div>
    </div>
  );
};
