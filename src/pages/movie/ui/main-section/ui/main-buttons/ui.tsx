import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { BookmarkIcon, PlayIcon2 } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import { useToggler } from 'shared/lib';
import { getMovieType } from './lib';
import styles from './styles.module.scss';

export const MainButtons = () => {
  const trailerModal = useToggler(pageModel.trailerModal);
  const playerModal = useToggler(pageModel.playerModal);
  const data = useStore(pageModel.$movie);

  return (
    <div className={styles.btns}>
      <Button
        startIcon={<PlayIcon2 />}
        onClick={playerModal.open}
        size="big"
        className={styles.btn}
        gradient
        variant="glass"
      >
        Смотреть {getMovieType(data?.type)}
      </Button>
      <Button onClick={trailerModal.open} size="big" className={styles.btn} variant="glass">
        Трейлер
      </Button>
      <Button size="big" className={styles.btn} variant="glass">
        <BookmarkIcon />
      </Button>
    </div>
  );
};
