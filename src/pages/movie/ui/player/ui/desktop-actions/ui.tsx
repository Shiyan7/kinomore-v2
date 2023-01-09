import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { BookmarkIcon, Button, PlayIcon, ShareIcon } from 'shared/ui';
import styles from './styles.module.scss';

export const DesktopActions = () => {
  const { open } = useToggler(pageModel.trailerModalInstance);

  return (
    <div className={styles.btns}>
      <Button onClick={open} variant="glass" className={styles.btn} startIcon={<PlayIcon />}>
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
