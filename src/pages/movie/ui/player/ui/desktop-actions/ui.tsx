import { BookmarkIcon, Button, PlayIcon, ShareIcon } from 'shared/ui';
import styles from './styles.module.scss';

export const DesktopActions = () => {
  return (
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
  );
};
