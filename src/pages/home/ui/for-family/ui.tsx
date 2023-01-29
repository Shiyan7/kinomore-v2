import { useStore } from 'effector-react';
import { Category } from 'widgets/category';
import { pageModel } from 'pages/home';
import { MovieItem } from 'entities/movie-item';
import { paths } from 'shared/routing';

export const ForFamily = () => {
  const data = useStore(pageModel.$forFamily);

  return (
    <Category>
      <Category.Title href={paths.forFamily}>Смотрим всей семьей</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
