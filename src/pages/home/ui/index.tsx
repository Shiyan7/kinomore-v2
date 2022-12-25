import type { NextPage } from "next";
import { BaseLayout } from "shared/ui/layouts";
import { Hero } from "./hero";
import { NewFilms } from "./new-films";
import { ComedyFilms } from "./comedy-films";
import { ForFamily } from "./for-family";
import { Genres } from "./genres";

export const Home: NextPage = () => {
  return (
    <BaseLayout>
      <Hero />
      <Genres />
      <NewFilms />
      <ComedyFilms />
      <ForFamily />
    </BaseLayout>
  );
};
