import clsx from 'clsx';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { BookmarkIcon, PlayIcon, ShareIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const Actions = () => {
  const trailerModal = useToggler(pageModel.trailerModalToggler);
  const shareModal = useToggler(pageModel.shareModalToggler);

  return (
    <div className={styles.btns}>
      <button onClick={trailerModal.open} className={clsx('btn-reset', styles.btn)}>
        <i className={styles.icon}>
          <PlayIcon />
        </i>
        <span>Трейлер</span>
      </button>
      <button className={clsx('btn-reset', styles.btn)}>
        <i className={styles.icon}>
          <BookmarkIcon />
        </i>
        <span>В избранное</span>
      </button>
      <button onClick={shareModal.open} className={clsx('btn-reset', styles.btn)}>
        <i className={styles.icon}>
          <ShareIcon />
        </i>
        <span>Поделиться</span>
      </button>
    </div>
  );
};
