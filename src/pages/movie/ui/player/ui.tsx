import clsx from 'clsx';
import { useRouter } from 'next/router';
import { PlayIcon, Button, BookmarkIcon, ShareIcon } from 'shared/ui';
import styles from './styles.module.scss';

export const Player = () => {
  const { query } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <iframe
          title="Плеер"
          src={`https://voidboost.net/embed/${query.id}?poster=1&poster_id=4&df=1`}
          allow="autoplay"
          className={styles.iframe}
          allowFullScreen
        />
      </div>
      <div className={styles.btns}>
        <Button variant="glass" className={styles.btn} startIcon={<PlayIcon />}>
          Трейлер
        </Button>
        <Button variant="glass" className={styles.btn} aria-label="В избранное">
          <BookmarkIcon />
        </Button>
        <Button variant="glass" className={styles.btn} aria-label="Поделиться">
          <ShareIcon />
        </Button>
      </div>
      <div className={styles.mobileBtns}>
        <button className={clsx('btn-reset', styles.mobileBtn)}>
          <span className={styles.icon}>
            <PlayIcon />
          </span>
          <span>Трейлер</span>
        </button>
        <button className={clsx('btn-reset', styles.mobileBtn)}>
          <span className={styles.icon}>
            <BookmarkIcon />
          </span>
          <span>В избранное</span>
        </button>
        <button className={clsx('btn-reset', styles.mobileBtn)}>
          <span className={styles.icon}>
            <ShareIcon />
          </span>
          <span>Поделиться</span>
        </button>
      </div>
    </div>
  );
};
