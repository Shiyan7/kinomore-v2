import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/home';
import { MovieItem } from 'entities/movie-item';
import { paths } from 'shared/routes';

export const ComedyFilms = () => {
  const data = useStore(pageModel.$comedyMovies);

  return (
    <Category>
      <Category.Title href={paths.comedyFilms}>Комедийные фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
