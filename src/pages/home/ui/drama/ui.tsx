import { useUnit } from 'effector-react';
import { homeModel } from 'pages/home';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import { GenresEnum, SortEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const Drama = () => {
  const { dramaMovies } = useUnit({ dramaMovies: homeModel.$dramaMovies });

  return (
    <Category>
      <Category.Title
        href={paths.catalog({ genre: GenresEnum.Drama, sort: SortEnum.Year })}
      >
        Драма
      </Category.Title>
      <Category.Carousel
        items={dramaMovies?.docs}
        renderItem={(item) => <MovieItem item={item} />}
      />
    </Category>
  );
};
