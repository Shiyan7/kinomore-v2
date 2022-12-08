"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { RoutesEnum } from "shared/config";
import { moviesApi } from "shared/api";
import { queryClient } from "shared/lib/query-client";

export const ComedyFilms = () => {
  const data = use(queryClient("comedy films", moviesApi.getComedy));

  return (
    <Category>
      <Category.Title href={RoutesEnum.ComedyFilms}>Комедийные фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
