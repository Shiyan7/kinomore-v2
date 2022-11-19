"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { queryClient } from "shared/lib/query-client";
import { getNewMovies } from "./model";

export const New = () => {
  const { docs } = use(queryClient("new", getNewMovies));

  return (
    <Category>
      <Category.Title size="medium">Новые фильмы</Category.Title>
      <Category.Carousel items={docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
