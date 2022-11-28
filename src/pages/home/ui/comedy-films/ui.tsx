"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { RoutesEnum } from "shared/config";
import { queryClient } from "shared/lib/query-client";
import { getComedyFilms } from "./model";

export const ComedyFilms = () => {
  const data = use(queryClient("comedy films", getComedyFilms));

  return (
    <Category>
      <Category.Title href={RoutesEnum.ComedyFilms}>Комедийные фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
