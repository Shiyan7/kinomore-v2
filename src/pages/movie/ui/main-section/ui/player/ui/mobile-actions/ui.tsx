import clsx from 'clsx';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { BookmarkIcon, PlayIcon, ShareIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const MobileActions = () => {
  const trailerModal = useToggler(pageModel.trailerModalToggler);
  const shareModal = useToggler(pageModel.shareModalToggler);

  return (
    <div className={styles.btns}>
      <button onClick={trailerModal.open} className={clsx('btn-reset', styles.btn)}>
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
      <button onClick={shareModal.open} className={clsx('btn-reset', styles.btn)}>
        <span className={styles.icon}>
          <ShareIcon />
        </span>
        <span>Поделиться</span>
      </button>
    </div>
  );
};
