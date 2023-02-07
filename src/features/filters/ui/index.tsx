import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEvent } from 'effector-react';
import { filtersModel } from 'features/filters';
import { useLockedBody, useToggler } from 'shared/lib';
import { Button, CloseIcon, SortIcon, Title } from 'shared/ui';
import { genres, ratings, years, filters } from '../config';
import { Select } from './select';
import styles from './styles.module.scss';

export const Filters = () => {
  const { query } = useRouter();
  const { isOpen, close } = useToggler(filtersModel.filtersToggler);
  const optionSelected = useEvent(filtersModel.optionSelected);

  useLockedBody(isOpen);

  return (
    <div className={clsx(styles.root, isOpen && styles.isOpen)}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image priority className={styles.image} width={131} height={26} src="/logo.svg" alt="Kinomore" />
        </div>
        <button onClick={close} className={clsx('btn-reset', styles.close)}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Title size="medium">Фильтры</Title>
        </div>
        <div className={styles.filters}>
          <div className={styles.row}>
            <Select
              value={query?.genre}
              onSelect={({ value }) => optionSelected({ queryName: 'genre', value })}
              options={genres}
              className={styles.select}
              label="Жанры"
              defaultValue="Жанры"
            />
            <Select
              value={query?.rating}
              onSelect={({ value }) => optionSelected({ queryName: 'rating', value })}
              options={ratings}
              className={styles.select}
              label="Рейтинг"
              defaultValue="Рейтинг"
            />
            <Select
              value={query?.year}
              onSelect={({ value }) => optionSelected({ queryName: 'year', value })}
              options={years}
              className={styles.select}
              label="Годы выхода"
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
              label="Сортировка"
              defaultValue="Рекомендуемые"
            />
          </div>
        </div>
        <Button onClick={close} className={styles.btn} variant="primary">
          Показать результаты
        </Button>
      </div>
    </div>
  );
};
