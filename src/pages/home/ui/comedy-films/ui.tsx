import { useUnit } from 'effector-react';
import { homeModel } from 'pages/home';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import { GenresEnum, SortEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const ComedyFilms = () => {
  const { comedyMovies } = useUnit({ comedyMovies: homeModel.$comedyMovies });

  return (
    <Category>
      <Category.Title
        href={paths.catalog({ genre: GenresEnum.Comedy, sort: SortEnum.Year })}
      >
        Комедийные фильмы
      </Category.Title>
      <Category.Carousel
        items={comedyMovies?.docs}
        renderItem={(item) => <MovieItem item={item} />}
      />
    </Category>
  );
};
