"use client";
import { use } from "react";
import { queryClient } from "shared/lib/query-client";
import { MovieItem } from "entities/movie-item";
import { Section } from "widgets/section";
import { getNewMovies } from "./model";

export const New = () => {
  const { docs } = use(queryClient("new", getNewMovies));

  return (
    <Section>
      <Section.Title size="medium">Новые фильмы</Section.Title>
      <Section.Carousel items={docs} renderItem={(item) => <MovieItem item={item} />} />
    </Section>
  );
};
