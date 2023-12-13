import { useUnit } from 'effector-react';
import { movieModel } from 'pages/movie';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import styles from './styles.module.scss';

export const SimilarMovies = () => {
  const { movie } = useUnit({ movie: movieModel.$movie });

  if (!movie?.similarMovies?.length) return null;

  return (
    <Category containerClass={styles.container}>
      <Category.Title className={styles.title}>Похожее</Category.Title>
      <Category.Carousel
        items={movie?.similarMovies}
        renderItem={(item) => <MovieItem item={item} />}
      />
    </Category>
  );
};
