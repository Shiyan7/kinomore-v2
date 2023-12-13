/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { useUnit } from 'effector-react';
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

  const trailerToggler = useToggler(movieModel.trailerToggler);
  const playerToggler = useToggler(movieModel.playerToggler);
  const gradeToggler = useToggler(movieModel.gradeToggler);
  const shareToggler = useToggler(movieModel.shareToggler);

  const { movie, toggleFavorite, isFavorite, isRated } = useUnit({
    movie: movieModel.$movie,
    toggleFavorite: favoritesModel.toggleFavorite,
    isFavorite: favoritesModel.$isFavorite,
    isRated: movieModel.$isRated,
  });

  const movieId = Number(query.id);

  const items = [
    {
      children: `Смотреть ${getMovieType(movie?.type)}`,
      handler: playerToggler.open,
      gradient: true,
    },
    { children: 'Трейлер', handler: trailerToggler.open },
    {
      children: <Icon name="common/bookmark" />,
      activeCondition: isFavorite,
      handler: () => toggleFavorite({ id: movieId }),
    },
    {
      children: <Icon name="common/star" />,
      activeCondition: isRated,
      handler: gradeToggler.open,
    },
    {
      children: <Icon name="common/share" />,
      handler: shareToggler.open,
    },
  ];

  return (
    <div className={styles.btns}>
      {items.map(({ children, handler, activeCondition, gradient }, idx) => (
        <Button
          className={clsx(styles.btn, activeCondition && styles.isActive)}
          gradient={gradient}
          key={idx}
          onClick={handler}
          size="big"
          variant="glass"
        >
          {children}
        </Button>
      ))}
    </div>
  );
};
