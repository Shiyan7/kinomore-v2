import { useStore } from 'effector-react';
import { movieModel } from 'pages/movie';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import styles from './styles.module.scss';

export const SimilarMovies = () => {
  const data = useStore(movieModel.$movie);

  if (!data?.similarMovies?.length) return null;

  return (
    <Category containerClass={styles.container}>
      <Category.Title className={styles.title}>Похожее</Category.Title>
      <Category.Carousel items={data?.similarMovies} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
