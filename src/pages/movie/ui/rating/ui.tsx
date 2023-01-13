import clsx from 'clsx';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { getRating } from 'shared/lib/get-rating';
import { getVotes, getMovieType } from './lib';
import styles from './styles.module.scss';

export const Rating = () => {
  const data = useStore(pageModel.$movie);

  return (
    <div className={styles.container}>
      <div className={styles.rating}>{getRating(data?.rating)}</div>
      <div className={styles.right}>
        <div className={styles.text}>
          <span className={styles.caption}>Рейтинг {getMovieType(data?.type)}</span>
          <span className={styles.desc}>{getVotes(data?.votes)} оценок</span>
        </div>
        <button className={clsx('btn-reset', styles.btn)}>Оценить</button>
      </div>
    </div>
  );
};
