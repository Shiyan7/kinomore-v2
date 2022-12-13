import type { NextPage } from "next";
import { createEvent } from "effector";
import { Hero } from "./hero";
import { NewFilms } from "./new-films";
import { ComedyFilms } from "./comedy-films";
import { ForFamily } from "./for-family";

export const homePageStarted = createEvent();

export const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <NewFilms />
      <ComedyFilms />
      <ForFamily />
    </>
  );
};
