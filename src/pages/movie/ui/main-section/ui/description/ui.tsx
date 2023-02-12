import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import styles from './styles.module.scss';

const MAX_WORDS = 35;

export const Description = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const data = useStore(pageModel.$movie);
  const text = data?.description ?? data?.shortDescription ?? 'Без описания';
  const words = text?.split(' ');
  const shortText = words?.slice(0, MAX_WORDS).join(' ');

  return (
    <div className={styles.container}>
      <p className={styles.desc}>{isExpanded ? text : shortText}</p>
      {words?.length > MAX_WORDS && (
        <button className={clsx('btn-reset', styles.btn)} onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? 'Скрыть' : 'Показать ещё'}
        </button>
      )}
    </div>
  );
};
