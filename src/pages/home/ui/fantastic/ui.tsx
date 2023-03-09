import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/home';
import { MovieItem } from 'entities/movie-item';
import { GenresEnum, SortEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const Fantastic = () => {
  const data = useStore(pageModel.$fantasticMovies);

  return (
    <Category>
      <Category.Title
        href={paths.catalog({ genre: GenresEnum.ScienceFiction, sort: SortEnum.Year, year: '2022-2023' })}>
        Фантастика
      </Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
