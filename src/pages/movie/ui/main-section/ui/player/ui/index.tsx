import { useRouter } from 'next/router';
import { Actions } from './actions';
import styles from './styles.module.scss';

export const Player = () => {
  const { query } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.player}>
          <iframe
            title="Плеер"
            src={`https://voidboost.net/embed/${query.id}?poster=1&poster_id=4&df=1`}
            allow="autoplay"
            className={styles.iframe}
            allowFullScreen
          />
        </div>
        <Actions />
      </div>
    </div>
  );
};
