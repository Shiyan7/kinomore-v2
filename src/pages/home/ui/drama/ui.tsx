import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/home';
import { MovieItem } from 'entities/movie-item';
import { paths } from 'shared/routing';
import { GenresEnum, SortEnum } from 'shared/config';

export const Drama = () => {
  const data = useStore(pageModel.$dramaMovies);

  return (
    <Category>
      <Category.Title href={paths.catalog({ genre: GenresEnum.Drama, sort: SortEnum.Year })}>Драма</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
