import { useUnit } from 'effector-react';
import { homeModel } from 'pages/home';
import { Category } from 'widgets/category';
import { MovieItem } from 'entities/movie/item';
import { GenresEnum, SortEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const ForFamily = () => {
  const { familyMovies } = useUnit({ familyMovies: homeModel.$familyMovies });

  return (
    <Category>
      <Category.Title
        href={paths.catalog({ genre: GenresEnum.Family, sort: SortEnum.Year })}
      >
        Смотрим всей семьей
      </Category.Title>
      <Category.Carousel
        items={familyMovies?.docs}
        renderItem={(item) => <MovieItem item={item} />}
      />
    </Category>
  );
};
