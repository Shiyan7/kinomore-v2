import { useStore } from 'effector-react';
import { homeModel } from 'pages/home';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import { paths } from 'shared/routing';

export const NewFilms = () => {
  const data = useStore(homeModel.$newMovies);

  return (
    <Category>
      <Category.Title href={paths.catalog({ year: '2022-2023' })}>Новые фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
