"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { RoutesEnum } from "shared/config";
import { queryClient } from "shared/lib/query-client";
import { moviesApi } from "shared/api";

export const NewFilms = () => {
  const data = use(queryClient("new films", moviesApi.getNew));

  return (
    <Category>
      <Category.Title href={RoutesEnum.NewFilms}>Новые фильмы</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
