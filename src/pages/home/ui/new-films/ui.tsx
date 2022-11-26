"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { queryClient } from "shared/lib/query-client";
import { getNewFilms } from "./model";

export const NewFilms = () => {
  const { docs } = use(queryClient("new films", getNewFilms));

  return (
    <Category>
      <Category.Title>Новые фильмы</Category.Title>
      <Category.Carousel items={docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
