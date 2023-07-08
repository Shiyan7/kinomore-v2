import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { pageModel } from 'pages/movie';
import { favoritesModel } from 'features/favorites';
import { useToggler } from 'shared/lib';
import { Button } from 'shared/ui/button';
import { Icon } from 'shared/ui/icon';
import { getMovieType } from './lib';
import styles from './styles.module.scss';

export const MainButtons = () => {
  const { query } = useRouter();
  const data = useStore(pageModel.$movie);
  const trailerToggler = useToggler(pageModel.trailerToggler);
  const playerToggler = useToggler(pageModel.playerToggler);
  const toggleFavorite = useEvent(favoritesModel.toggleFavorite);
  const isFavorite = useStore(favoritesModel.$isFavorite);

  return (
    <div className={styles.btns}>
      <Button onClick={playerToggler.open} size="big" className={styles.btn} gradient variant="glass">
        Смотреть {getMovieType(data?.type)}
      </Button>
      <Button onClick={trailerToggler.open} size="big" className={styles.btn} variant="glass">
        Трейлер
      </Button>
      <Button
        onClick={() => toggleFavorite({ id: query?.id as string })}
        size="big"
        className={clsx(styles.btn, isFavorite && styles.isFavorite)}
        variant="glass"
      >
        <Icon type="common" name="bookmark" />
      </Button>
    </div>
  );
};
