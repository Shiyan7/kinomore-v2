import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { movieModel } from 'pages/movie';
import { favoritesModel } from 'features/favorites';
import { useToggler } from 'shared/lib';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const MobileActions = () => {
  const { query } = useRouter();
  const toggleFavoriteClicked = useEvent(favoritesModel.toggleFavoriteClicked);
  const isFavorite = useStore(favoritesModel.$isFavorite);
  const shareToggler = useToggler(movieModel.shareToggler);
  const gradeToggler = useToggler(movieModel.gradeToggler);
  const trailerToggler = useToggler(movieModel.trailerToggler);

  const movieId = Number(query.id);

  const items = [
    { label: 'Трейлер', handler: trailerToggler.open, icon: <Icon type="common" name="play" /> },
    {
      label: isFavorite ? 'Запомнен' : 'Запомнить',
      activeClass: isFavorite,
      handler: () => toggleFavoriteClicked({ id: movieId }),
      icon: <Icon type="common" name="bookmark" />,
    },
    { label: 'Оценить', handler: gradeToggler.open, icon: <Icon type="common" name="star" /> },
    { label: 'Поделится', handler: shareToggler.open, icon: <Icon type="common" name="share" /> },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ label, handler, icon, activeClass }) => (
        <button
          onClick={handler}
          key={label}
          className={clsx('btn-reset', activeClass && styles.activeClass, styles.btn)}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
};
