import { useStore } from "effector-react/scope";
import { Category } from "widgets/category";
import { pageModel } from "pages/home";
import { MovieItem } from "entities/movie-item";
import { RoutesEnum } from "shared/config";

export const NewFilms = () => {
  const data = useStore(pageModel.$newFilms);

  return (
    <Category>
      <Category.Title href={RoutesEnum.NewFilms}>Новые фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
