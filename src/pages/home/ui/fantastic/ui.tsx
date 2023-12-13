import { useUnit } from 'effector-react';
import { homeModel } from 'pages/home';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import { GenresEnum, SortEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const Fantastic = () => {
  const { fantasticMovies } = useUnit({
    fantasticMovies: homeModel.$fantasticMovies,
  });

  return (
    <Category>
      <Category.Title
        href={paths.catalog({
          genre: GenresEnum.ScienceFiction,
          sort: SortEnum.Year,
          year: '2022-2023',
        })}
      >
        Фантастика
      </Category.Title>
      <Category.Carousel
        items={fantasticMovies?.docs}
        renderItem={(item) => <MovieItem item={item} />}
      />
    </Category>
  );
};
