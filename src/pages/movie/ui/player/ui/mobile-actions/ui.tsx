import clsx from 'clsx';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { BookmarkIcon, PlayIcon, ShareIcon } from 'shared/ui';
import styles from './styles.module.scss';

export const MobileActions = () => {
  const { open } = useToggler(pageModel.trailerModalInstance);

  return (
    <div className={styles.btns}>
      <button onClick={open} className={clsx('btn-reset', styles.btn)}>
        <span className={styles.icon}>
          <PlayIcon />
        </span>
        <span>Трейлер</span>
      </button>
      <button className={clsx('btn-reset', styles.btn)}>
        <span className={styles.icon}>
          <BookmarkIcon />
        </span>
        <span>В избранное</span>
      </button>
      <button className={clsx('btn-reset', styles.btn)}>
        <span className={styles.icon}>
          <ShareIcon />
        </span>
        <span>Поделиться</span>
      </button>
    </div>
  );
};
