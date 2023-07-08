import clsx from 'clsx';
import { useState } from 'react';
import type { FactInMovie, FactInPerson } from 'shared/api';
import { Title } from 'shared/ui/title';
import styles from './styles.module.scss';

const MAX_FACTS = 5;

interface FactsProps {
  data: FactInMovie[] | FactInPerson[] | undefined;
  narrow?: boolean;
}

export const Facts = ({ data, narrow }: FactsProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!data || data?.length < 2) return null;

  const itemsToShow = isExpanded ? data : data?.slice(0, MAX_FACTS);

  return (
    <section className={styles.section}>
      <div className={clsx('container', narrow && 'container--narrow', styles.container)}>
        <Title size="medium" className={styles.title}>
          Знаете ли вы, что…
        </Title>
        <ul className={clsx('list-reset', styles.list)}>
          {itemsToShow?.map(({ value }) => (
            <li key={value} className={styles.item} dangerouslySetInnerHTML={{ __html: value ?? '' }} />
          ))}
        </ul>
        {data?.length > MAX_FACTS && (
          <button className={clsx('btn-reset', styles.btn)} onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? 'Скрыть' : 'Показать ещё'}
          </button>
        )}
      </div>
    </section>
  );
};
