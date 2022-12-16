import type { NextPage } from "next";
import { createEvent } from "effector";
import { Hero } from "./hero";
import { NewFilms } from "./new-films";
import { ComedyFilms } from "./comedy-films";
import { ForFamily } from "./for-family";
import { Genres } from "./genres";

export const homePageStarted = createEvent();

export const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Genres />
      <NewFilms />
      <ComedyFilms />
      <ForFamily />
    </>
  );
};
