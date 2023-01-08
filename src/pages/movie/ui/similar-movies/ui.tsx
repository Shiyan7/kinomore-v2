import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/movie';
import { MovieItem } from 'entities/movie-item';
import styles from './styles.module.scss';

export const SimilarMovies = () => {
  const { similarMovies } = useStore(pageModel.$movie)!;

  return (
    <Category>
      <Category.Title className={styles.title}>Похожее кино</Category.Title>
      <Category.Carousel items={similarMovies} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
