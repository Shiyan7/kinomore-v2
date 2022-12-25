"use client";
import { useStore } from "effector-react/scope";
import { Category } from "widgets/category";
import { pageModel } from "pages/home";
import { MovieItem } from "entities/movie-item";
import { RoutesEnum } from "shared/config";

export const ComedyFilms = () => {
  const data = useStore(pageModel.$comedyFilms);

  return (
    <Category>
      <Category.Title href={RoutesEnum.ComedyFilms}>Комедийные фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
