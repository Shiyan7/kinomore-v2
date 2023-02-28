import clsx from 'clsx';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib';
import { BookmarkIcon, PlayIcon, ShareIcon, StarIcon } from 'shared/ui/icons';
import styles from './styles.module.scss';

export const MobileActions = () => {
  const trailerModal = useToggler(pageModel.trailerModal);
  const shareModal = useToggler(pageModel.shareModal);

  const items = [
    { label: 'Трейлер', handler: trailerModal.open, icon: <PlayIcon /> },
    { label: 'В избранное', icon: <BookmarkIcon /> },
    { label: 'Оценить', icon: <StarIcon /> },
    { label: 'Поделится', handler: shareModal.open, icon: <ShareIcon /> },
  ];

  return (
    <div className={styles.root}>
      {items.map((item, idx) => {
        const { label, handler, icon } = item;

        return (
          <button onClick={handler} key={idx} className={clsx('btn-reset', styles.btn)}>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
