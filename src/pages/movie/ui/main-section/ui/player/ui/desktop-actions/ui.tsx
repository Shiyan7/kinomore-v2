import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { BookmarkIcon, PlayIcon, ShareIcon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import styles from './styles.module.scss';

export const DesktopActions = () => {
  const trailerModal = useToggler(pageModel.trailerModalToggler);
  const shareModal = useToggler(pageModel.shareModalToggler);

  return (
    <div className={styles.btns}>
      <Button onClick={trailerModal.open} variant="glass" size="medium" className={styles.btn} startIcon={<PlayIcon />}>
        Трейлер
      </Button>
      <Button variant="glass" size="medium" className={styles.btn} aria-label="В избранное">
        <BookmarkIcon />
      </Button>
      <Button onClick={shareModal.open} variant="glass" size="medium" className={styles.btn} aria-label="Поделиться">
        <ShareIcon />
      </Button>
    </div>
  );
};
