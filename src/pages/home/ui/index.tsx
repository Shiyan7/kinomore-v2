import type { NextPage } from 'next';
import { Hero } from './hero';
import { NewFilms } from './new-films';
import { ComedyFilms } from './comedy-films';
import { ForFamily } from './for-family';
import { Genres } from './genres';

export const HomePage: NextPage = () => {
  return (
    <>
      <Hero />
      <Genres />
      <ComedyFilms />
      <NewFilms />
      <ForFamily />
    </>
  );
};
