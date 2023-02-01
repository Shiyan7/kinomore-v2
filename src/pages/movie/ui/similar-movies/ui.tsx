import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/movie';
import { MovieItem } from 'entities/movie-item';
import styles from './styles.module.scss';

export const SimilarMovies = () => {
  const data = useStore(pageModel.$movie);

  if (!data?.similarMovies?.length) return null;

  console.log(data.similarMovies);

  return (
    <Category containerClass={styles.container}>
      <Category.Title className={styles.title}>Похожее кино</Category.Title>
      <Category.Carousel items={data?.similarMovies} renderItem={(item) => <MovieItem small item={item} />} />
    </Category>
  );
};
