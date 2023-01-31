import clsx from 'clsx';
import { useState } from 'react';
import type { Fact } from 'shared/api';
import { Title } from 'shared/ui/title';
import styles from './styles.module.scss';

const MAX_FACTS = 5;

interface FactsProps {
  facts: Fact[] | undefined;
  className?: string;
}

export const Facts = ({ facts, className }: FactsProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!facts || facts?.length < 2) return null;

  const itemsToShow = isExpanded ? facts : facts?.slice(0, MAX_FACTS);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container, className)}>
        <Title size="medium" className={styles.title}>
          Знаете ли вы, что…
        </Title>
        <ul className={clsx('list-reset', styles.list)}>
          {itemsToShow?.map((item, idx) => (
            <li key={idx} className={styles.item} dangerouslySetInnerHTML={{ __html: item.value }} />
          ))}
        </ul>
        {facts?.length > MAX_FACTS && (
          <button className={clsx('btn-reset', styles.btn)} onClick={handleToggle}>
            {isExpanded ? 'Скрыть' : 'Показать ещё'}
          </button>
        )}
      </div>
    </section>
  );
};
