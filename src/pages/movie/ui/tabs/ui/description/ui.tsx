import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { movieModel } from 'pages/movie';
import styles from './styles.module.scss';

const MAX_WORDS = 30;

export const Description = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { movie } = useUnit({ movie: movieModel.$movie });
  const text = movie?.description ?? movie?.shortDescription ?? 'Без описания';
  const words = text?.split(' ');
  const shortText = words?.slice(0, MAX_WORDS).join(' ');

  return (
    <div className={styles.container}>
      <p className={styles.desc}>{isExpanded ? text : shortText}</p>
      {words?.length > MAX_WORDS && (
        <button
          className={clsx('btn-reset', styles.btn)}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Свернуть описание' : 'Подробное описание'}
        </button>
      )}
    </div>
  );
};
