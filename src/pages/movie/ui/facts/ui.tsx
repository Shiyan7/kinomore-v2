import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { Title } from 'shared/ui';
import styles from './styles.module.scss';

const MAX_FACTS = 7;

export const Facts = () => {
  const { facts } = useStore(pageModel.$movie)!;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if ((facts && !facts[0].value) || !facts?.length) return null;

  const itemsToShow = isExpanded ? facts : facts.slice(0, MAX_FACTS);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Title size="medium" className={styles.title}>
          Знаете ли вы, что…
        </Title>
        <ul className={clsx('list-reset', styles.list)}>
          {itemsToShow?.map((item, idx) => (
            <li key={idx} className={styles.item} dangerouslySetInnerHTML={{ __html: item.value }} />
          ))}
        </ul>
        {facts.length > MAX_FACTS && (
          <button className={clsx('btn-reset', styles.btn)} onClick={handleToggle}>
            {isExpanded ? 'Скрыть' : 'Показать ещё'}
          </button>
        )}
      </div>
    </section>
  );
};
