import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/home';
import { MovieItem } from 'entities/movie-item';
import { paths } from 'shared/routing';
import { GenresEnum } from 'shared/config';

export const Fantastic = () => {
  const data = useStore(pageModel.$fantasticMovies);

  return (
    <Category>
      <Category.Title href={paths.catalog({ genre: GenresEnum.Fantastika, year: '2022-2023', sort: 'year' })}>
        Фантастика
      </Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
