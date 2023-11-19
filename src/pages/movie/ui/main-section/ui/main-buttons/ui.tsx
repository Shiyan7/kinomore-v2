/* eslint-disable react/no-array-index-key */
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
  const toggleFavoriteClicked = useEvent(favoritesModel.toggleFavoriteClicked);
  const isFavorite = useStore(favoritesModel.$isFavorite);
  const isRated = useStore(movieModel.$isRated);
  const trailerToggler = useToggler(movieModel.trailerToggler);
  const playerToggler = useToggler(movieModel.playerToggler);
  const gradeToggler = useToggler(movieModel.gradeToggler);

  const movieId = Number(query.id);

  const items = [
    { children: `Смотреть ${getMovieType(data?.type)}`, handler: playerToggler.open, gradient: true },
    { children: 'Трейлер', handler: trailerToggler.open },
    {
      children: <Icon name="common/bookmark" />,
      activeCondition: isFavorite,
      handler: () => toggleFavoriteClicked({ id: movieId }),
    },
    { children: <Icon name="common/star" />, activeCondition: isRated, handler: gradeToggler.open },
  ];

  return (
    <div className={styles.btns}>
      {items.map(({ children, handler, activeCondition, gradient }, idx) => (
        <Button
          key={idx}
          onClick={handler}
          size="big"
          className={clsx(styles.btn, activeCondition && styles.isActive)}
          variant="glass"
          gradient={gradient}
        >
          {children}
        </Button>
      ))}
    </div>
  );
};
