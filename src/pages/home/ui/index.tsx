import { Hero } from "./hero";
import { NewFilms } from "./new-films";
import { ComedyFilms } from "./comedy-films";
import { ForFamily } from "./for-family";

export const Home = () => {
  return (
    <>
      <Hero />
      <NewFilms />
      <ComedyFilms />
      <ForFamily />
    </>
  );
};
