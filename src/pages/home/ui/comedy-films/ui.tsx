"use client";
import { use } from "react";
import { Category } from "widgets/category";
import { MovieItem } from "entities/movie-item";
import { queryClient } from "shared/lib/query-client";
import { getComedyFilms } from "./model";

export const ComedyFilms = () => {
  const { docs } = use(queryClient("comedy films", getComedyFilms));

  return (
    <Category>
      <Category.Title>Комедийные фильмы</Category.Title>
      <Category.Carousel items={docs} renderItem={(item) => <MovieItem item={item} />} />
    </Category>
  );
};
