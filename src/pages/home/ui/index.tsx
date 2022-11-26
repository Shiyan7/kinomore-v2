import { Hero } from "./hero";
import { NewFilms } from "./new-films";
import { ComedyFilms } from "./comedy-films";

export const Home = () => {
  return (
    <>
      <Hero />
      <NewFilms />
      <ComedyFilms />
    </>
  );
};
