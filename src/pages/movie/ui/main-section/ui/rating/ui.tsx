import clsx from 'clsx';
import { useStore } from 'effector-react';
import { pageModel, getMovieType } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { getRating } from 'shared/lib/get-rating';
import { getVotes } from './lib';
import styles from './styles.module.scss';

export const Rating = () => {
  const gradeModal = useToggler(pageModel.gradeModalToggler);
  const data = useStore(pageModel.$movie);

  return (
    <div className={styles.container}>
      <div className={styles.rating}>{getRating(data?.rating)}</div>
      <div className={styles.right}>
        <div className={styles.text}>
          <span className={styles.caption}>Рейтинг {getMovieType(data?.type)}а</span>
          <span className={styles.desc}>{getVotes(data?.votes)} оценок</span>
        </div>
        <button onClick={gradeModal.open} className={clsx('btn-reset', styles.btn)}>
          Оценить
        </button>
      </div>
    </div>
  );
};
