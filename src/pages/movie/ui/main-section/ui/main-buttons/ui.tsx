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
  const trailerToggler = useToggler(movieModel.trailerToggler);
  const playerToggler = useToggler(movieModel.playerToggler);
  const gradeToggler = useToggler(movieModel.gradeToggler);

  const movieId = Number(query.id);

  const items = [
    { children: `Смотреть ${getMovieType(data?.type)}`, handler: playerToggler.open, gradient: true },
    { children: 'Трейлер', handler: trailerToggler.open },
    {
      children: <Icon type="common" name="bookmark" />,
      className: isFavorite && styles.isFavorite,
      handler: () => toggleFavoriteClicked({ id: movieId }),
    },
    { children: <Icon type="common" name="star" />, handler: gradeToggler.open },
  ];

  return (
    <div className={styles.btns}>
      {items.map(({ children, handler, className, ...props }, idx) => (
        <Button
          key={idx}
          onClick={handler}
          size="big"
          className={clsx(styles.btn, className)}
          variant="glass"
          {...props}
        >
          {children}
        </Button>
      ))}
    </div>
  );
};
