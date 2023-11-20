import clsx from 'clsx';
import Image from 'next/image';
import { useEvent } from 'effector-react';
import { useRouter } from 'next/router';
import { filtersModel } from 'features/filters';
import { useLockedBody, useToggler } from 'shared/lib';
import { Button, Title } from 'shared/ui';
import { Icon } from 'shared/ui/icon';
import { sort, filters } from '../config';
import { DrawerSelect } from './drawer-select';
import { Select } from './select';
import styles from './styles.module.scss';

export const Filters = () => {
  const { query } = useRouter();
  const { isOpen, close } = useToggler(filtersModel.toggler);
  const optionSelected = useEvent(filtersModel.optionSelected);
  const showResults = useEvent(filtersModel.showResults);
  const sendOption = useEvent(filtersModel.sendOption);

  useLockedBody(isOpen);

  /* добавить кнопку сбросить */

  return (
    <div className={clsx(styles.root, isOpen && styles.isOpen)}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            alt="Kinomore"
            className={styles.image}
            height={26}
            priority
            src="/logo.svg"
            width={131}
          />
        </div>
        <button className={clsx('btn-reset', styles.close)} onClick={close}>
          <Icon name="common/close" />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Title size="medium">Фильтры</Title>
        </div>
        <div className={styles.filters}>
          <div className={styles.row}>
            {filters.map(({ queryName, ...rest }) => (
              <Select
                className={styles.select}
                key={queryName}
                onSelect={({ value }) => optionSelected({ [queryName]: value })}
                value={query[queryName]}
                {...rest}
              />
            ))}
          </div>
          <div className={styles.row}>
            <Select
              className={styles.select}
              label="Рекомендуемые"
              onSelect={(option) => optionSelected({ sort: option.value })}
              options={sort}
              placement="bottom-end"
              startIcon={<Icon name="common/sort" />}
              value={query.sort}
            />
          </div>
        </div>
        <div className={styles.options}>
          <DrawerSelect
            label="Сортировка"
            onSelect={(option) => sendOption({ sort: option.value })}
            options={sort}
            value={query.sort}
          />
          {filters.map(({ queryName, ...rest }) => (
            <DrawerSelect
              key={queryName}
              onSelect={({ value }) => sendOption({ [queryName]: value })}
              value={query[queryName]}
              {...rest}
            />
          ))}
        </div>
        <Button className={styles.btn} onClick={showResults} variant="primary">
          Показать результаты
        </Button>
      </div>
    </div>
  );
};
