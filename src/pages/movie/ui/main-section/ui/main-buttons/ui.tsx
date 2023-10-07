import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { movieModel } from 'pages/movie';
import { favoritesModel } from 'features/favorites';
import { useToggler } from 'shared/lib';
import { Button } from 'shared/ui/button';
import { Icon } from 'shared/ui/icon';
import { getMovieType } from './lib';
import styles from './styles.module.scss';

export const MainButtons = () => {
  const { query } = useRouter();
  const data = useStore(movieModel.$movie);
  const trailerToggler = useToggler(movieModel.trailerToggler);
  const playerToggler = useToggler(movieModel.playerToggler);
  const toggleFavorite = useEvent(favoritesModel.toggleFavorite);
  const isFavorite = useStore(favoritesModel.$isFavorite);

  const movieId = Number(query.id);

  return (
    <div className={styles.btns}>
      <Button onClick={playerToggler.open} size="big" className={styles.btn} gradient variant="glass">
        Смотреть {getMovieType(data?.type)}
      </Button>
      <Button onClick={trailerToggler.open} size="big" className={styles.btn} variant="glass">
        Трейлер
      </Button>
      <Button
        onClick={() => toggleFavorite({ id: movieId })}
        size="big"
        className={clsx(styles.btn, isFavorite && styles.isFavorite)}
        variant="glass"
      >
        <Icon type="common" name="bookmark" />
      </Button>
    </div>
  );
};
