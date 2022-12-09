"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { RoutesEnum } from "shared/config";
import { moviesApi } from "shared/api";
import { queryClient } from "shared/lib/query-client";

export const ForFamily = () => {
  const data = use(queryClient("for family", moviesApi.forFamily));

  return (
    <Category>
      <Category.Title href={RoutesEnum.ForFamily}>Смотрим всей семьей</Category.Title>
      <Category.Carousel items={data?.docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
