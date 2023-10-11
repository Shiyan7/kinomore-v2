import clsx from 'clsx';
import { useEvent, useGate, useStore } from 'effector-react';
import { favoritesModel } from 'features/favorites';
import { MovieItem } from 'entities/movie/item';
import { paths } from 'shared/routing';
import { Icon, Spinner, Title } from 'shared/ui';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import styles from './styles.module.scss';

const breadcrumbs = [
  { text: 'Профиль', href: paths.profile },
  { text: 'Избранное', href: '' },
];

export const FavoritesPage = () => {
  const data = useStore(favoritesModel.$allFavorites);
  const pending = useStore(favoritesModel.$pending);
  const removeFavoriteClicked = useEvent(favoritesModel.removeFavoriteClicked);

  useGate(favoritesModel.FavoritesGate);

  const Loader = (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );

  const Grid = (
    <div className={styles.grid}>
      {data?.map((movie) => (
        <MovieItem onFavorite={() => removeFavoriteClicked({ id: movie.id })} key={movie.id} item={movie} />
      ))}
    </div>
  );

  const EmptyMessage = (
    <div className={styles.empty}>
      <div className={styles.icon}>
        <Icon type="common" name="bookmark-slash" />
      </div>
      <span>Список избранного пуст :(</span>
    </div>
  );

  const Content = data?.length ? Grid : EmptyMessage;

  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
        <Title className={styles.title}>Избранное</Title>
        {pending ? Loader : Content}
      </div>
    </section>
  );
};
