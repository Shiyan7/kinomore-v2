import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { movieModel } from 'pages/movie';
import { favoritesModel } from 'features/favorites';
import { useToggler } from 'shared/lib';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const MobileActions = () => {
  const { query } = useRouter();

  const shareToggler = useToggler(movieModel.shareToggler);
  const gradeToggler = useToggler(movieModel.gradeToggler);
  const trailerToggler = useToggler(movieModel.trailerToggler);

  const { rating, isRated, isFavorite, toggleFavorite } = useUnit({
    rating: movieModel.$rating,
    isRated: movieModel.$isRated,
    isFavorite: favoritesModel.$isFavorite,
    toggleFavorite: favoritesModel.toggleFavorite,
  });

  const movieId = Number(query.id);

  const items = [
    {
      label: 'Трейлер',
      handler: trailerToggler.open,
      icon: <Icon name="common/play" />,
    },
    {
      label: isFavorite ? 'Запомнен' : 'Запомнить',
      activeCondition: isFavorite,
      handler: () => toggleFavorite({ id: movieId }),
      icon: <Icon name="common/bookmark" />,
    },
    {
      label: isRated ? `Оценка ${rating}` : 'Оценить',
      activeCondition: isRated,
      handler: gradeToggler.open,
      icon: <Icon name="common/star" />,
    },
    {
      label: 'Поделится',
      handler: shareToggler.open,
      icon: <Icon name="common/share" />,
    },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ label, handler, icon, activeCondition }) => (
        <button
          className={clsx(
            'btn-reset',
            activeCondition && styles.isActive,
            styles.btn
          )}
          key={label}
          onClick={handler}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
};
